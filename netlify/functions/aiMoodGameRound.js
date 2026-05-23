const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(body),
});

const parseRequestBody = (event) => {
  if (!event.body) return {};

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  return JSON.parse(rawBody);
};

const normalizeText = (value) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[«»"“”„]/g, "")
    .trim()
    .toLowerCase();

const parseModelJson = (content) => {
  const text = String(content || "").trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw error;
    }

    return JSON.parse(text.slice(start, end + 1));
  }
};

const validateRound = (round, sourceText) => {
  const options = Array.isArray(round.options) ? round.options : [];
  const normalizedExcerpt = normalizeText(round.excerpt);
  const normalizedSource = normalizeText(sourceText);

  if (
    typeof round.excerpt !== "string" ||
    typeof round.question !== "string" ||
    typeof round.correctMood !== "string" ||
    typeof round.explanation !== "string" ||
    typeof round.sourceTitle !== "string" ||
    typeof round.sourceSlug !== "string" ||
    options.length !== 4 ||
    options.some((option) => typeof option !== "string" || !option.trim()) ||
    !options.includes(round.correctMood) ||
    !normalizedExcerpt ||
    !normalizedSource.includes(normalizedExcerpt)
  ) {
    throw new Error("Invalid AI mood round");
  }

  return {
    excerpt: round.excerpt.trim(),
    question: "Какое настроение звучит в этих строках?",
    correctMood: round.correctMood.trim(),
    options: options.map((option) => option.trim()),
    explanation: round.explanation.trim(),
    sourceTitle: round.sourceTitle.trim(),
    sourceSlug: round.sourceSlug.trim(),
  };
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    return jsonResponse(500, { error: "GROQ_API_KEY is not configured" });
  }

  let payload;

  try {
    payload = parseRequestBody(event);
  } catch (error) {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const slug = typeof payload.slug === "string" ? payload.slug.trim() : "";
  const text = typeof payload.text === "string" ? payload.text.trim() : "";

  if (!title || !slug || text.length < 30) {
    return jsonResponse(400, { error: "title, slug, and text are required" });
  }

  const limitedText = text.slice(0, 12000);

  const systemPrompt = `Ты создаёшь один раунд литературной игры на русском языке.

На основе предоставленного стихотворения выбери реальный короткий фрагмент — 1–3 строки — и задай вопрос о настроении этого фрагмента.

Правила:
- Используй только предоставленный текст стихотворения.
- Не выдумывай строки.
- Не переписывай строки.
- Не имитируй автора.
- Не делай выводов о биографии автора.
- Не говори “автор хотел сказать”.
- Не используй личные сведения.
- Вопрос всегда: “Какое настроение звучит в этих строках?”
- Создай 4 варианта настроения.
- Один вариант должен быть наиболее подходящим.
- Объяснение должно быть мягким и уважительным.
- Верни только валидный JSON без markdown.

Формат:
{
  "excerpt": "реальный фрагмент из стихотворения",
  "question": "Какое настроение звучит в этих строках?",
  "correctMood": "одно настроение из options",
  "options": ["вариант1", "вариант2", "вариант3", "вариант4"],
  "explanation": "короткое объяснение",
  "sourceTitle": "название стихотворения",
  "sourceSlug": "slug"
}`;

  const userPrompt = JSON.stringify({
    title,
    slug,
    text: limitedText,
  });

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.45,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!groqResponse.ok) {
      return jsonResponse(502, { error: "Groq request failed" });
    }

    const groqPayload = await groqResponse.json();
    const content = groqPayload?.choices?.[0]?.message?.content;
    const round = validateRound(parseModelJson(content), limitedText);

    return jsonResponse(200, round);
  } catch (error) {
    console.error("AI mood game round failed:", error);
    return jsonResponse(502, { error: "Unable to create AI mood round" });
  }
};
