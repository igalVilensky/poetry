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

const ROUND_TYPES = [
  {
    type: "mood",
    label: "Настроение",
    question: "Какое настроение ближе всего к этому фрагменту?",
  },
  {
    type: "theme",
    label: "Тема",
    question: "О чём этот фрагмент прежде всего?",
  },
  {
    type: "main_word",
    label: "Главное слово",
    question: "Какое слово лучше всего передаёт центр этого фрагмента?",
  },
  {
    type: "missing_word",
    label: "Пропущенное слово",
    question: "Какое слово было в оригинальной строке?",
  },
];

const SMALL_FUNCTION_WORDS = new Set([
  "без",
  "бы",
  "был",
  "была",
  "были",
  "быть",
  "вам",
  "вас",
  "все",
  "для",
  "его",
  "ему",
  "еще",
  "ещё",
  "или",
  "как",
  "мне",
  "мой",
  "моя",
  "мои",
  "над",
  "нас",
  "нее",
  "неё",
  "нет",
  "них",
  "она",
  "они",
  "оно",
  "при",
  "про",
  "сам",
  "себя",
  "так",
  "там",
  "тебя",
  "тем",
  "тех",
  "тою",
  "уже",
  "что",
  "это",
]);

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

const pickRoundType = (avoidRoundTypes = []) => {
  const avoidedTypes = new Set(avoidRoundTypes);
  const availableRoundTypes = ROUND_TYPES.filter(
    (roundType) => !avoidedTypes.has(roundType.type)
  );
  const roundTypes = availableRoundTypes.length ? availableRoundTypes : ROUND_TYPES;

  return roundTypes[Math.floor(Math.random() * roundTypes.length)];
};

const countExcerptLines = (excerpt) =>
  String(excerpt || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean).length;

const isOneRussianWord = (value, minLetters = 1) => {
  const word = String(value || "").trim();
  const lettersOnly = word.replace(/-/g, "");

  return /^[А-Яа-яЁё-]+$/.test(word) && lettersOnly.length >= minLetters;
};

const hasForbiddenExplanation = (value) => {
  const text = normalizeText(value);

  return [
    "автор хотел",
    "автор хотела",
    "поэт хотел",
    "поэт хотела",
    "поэтесса хотела",
    "личная жизнь",
    "личной жизни",
    "биография",
    "семья автора",
    "возраст автора",
    "здоровье автора",
    "место проживания автора",
  ].some((phrase) => text.includes(phrase));
};

const validateRound = (round, { sourceText, title, slug, expectedRound }) => {
  const rawOptions = Array.isArray(round.options) ? round.options : [];
  const options = rawOptions.map((option) =>
    typeof option === "string" ? option.trim() : ""
  );
  const excerpt = typeof round.excerpt === "string" ? round.excerpt.trim() : "";
  const question = typeof round.question === "string" ? round.question.trim() : "";
  const correctAnswer =
    typeof round.correctAnswer === "string" ? round.correctAnswer.trim() : "";
  const explanation =
    typeof round.explanation === "string" ? round.explanation.trim() : "";
  const normalizedExcerpt = normalizeText(round.excerpt);
  const normalizedSource = normalizeText(sourceText);
  const lineCount = countExcerptLines(excerpt);

  if (
    round.roundType !== expectedRound.type ||
    round.roundLabel !== expectedRound.label ||
    !excerpt ||
    !question ||
    !correctAnswer ||
    !explanation ||
    typeof round.sourceTitle !== "string" ||
    typeof round.sourceSlug !== "string" ||
    rawOptions.some((option) => typeof option !== "string") ||
    options.length !== 4 ||
    options.some((option) => !option.trim()) ||
    new Set(options).size !== 4 ||
    !options.includes(correctAnswer) ||
    hasForbiddenExplanation(question) ||
    hasForbiddenExplanation(explanation)
  ) {
    throw new Error("Invalid AI poem game round");
  }

  if (expectedRound.type === "missing_word") {
    const blanks = excerpt.match(/___/g) || [];
    const reconstructedExcerpt = excerpt.replace("___", correctAnswer);
    const normalizedReconstructedExcerpt = normalizeText(reconstructedExcerpt);

    if (
      lineCount !== 1 ||
      blanks.length !== 1 ||
      !isOneRussianWord(correctAnswer, 3) ||
      SMALL_FUNCTION_WORDS.has(correctAnswer.toLowerCase()) ||
      options.some((option) => !isOneRussianWord(option, 3)) ||
      !normalizedReconstructedExcerpt ||
      !normalizedSource.includes(normalizedReconstructedExcerpt)
    ) {
      throw new Error("Invalid AI missing-word round");
    }
  } else {
    if (
      lineCount < 1 ||
      lineCount > 3 ||
      !normalizedExcerpt ||
      !normalizedSource.includes(normalizedExcerpt)
    ) {
      throw new Error("Invalid AI excerpt");
    }

    if (
      expectedRound.type === "main_word" &&
      options.some((option) => !isOneRussianWord(option, 2))
    ) {
      throw new Error("Invalid AI main-word options");
    }
  }

  return {
    roundType: expectedRound.type,
    roundLabel: expectedRound.label,
    excerpt,
    question,
    correctAnswer,
    options,
    explanation,
    sourceTitle: title,
    sourceSlug: slug,
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
  const avoidRoundTypes = Array.isArray(payload.avoidRoundTypes)
    ? payload.avoidRoundTypes.filter((type) => typeof type === "string")
    : [];

  if (!title || !slug || text.length < 30) {
    return jsonResponse(400, { error: "title, slug, and text are required" });
  }

  const limitedText = text.slice(0, 12000);
  const expectedRound = pickRoundType(avoidRoundTypes);

  const systemPrompt = `Ты создаёшь один раунд литературной игры “Чуткое чтение” на русском языке.

Выбранный тип раунда:
- roundType: "${expectedRound.type}"
- roundLabel: "${expectedRound.label}"
- question: "${expectedRound.question}"

Правила:
- Используй только предоставленный текст стихотворения.
- Не выдумывай строки.
- Не переписывай строки.
- Не имитируй автора.
- Не делай выводов о биографии автора или частных фактах.
- Не говори “автор хотел сказать”.
- Не упоминай частную жизнь, возраст, семью, здоровье или место проживания автора.
- Сосредоточься только на предоставленном тексте.
- Создай ровно 4 варианта ответа.
- correctAnswer обязательно должен быть одним из options.
- Объяснение должно быть мягким и уважительным.
- Верни только валидный JSON без markdown.
- Не оборачивай JSON в markdown.

Правила для типов раундов:

Mood round:
- roundType: "mood"
- roundLabel: "Настроение"
- Используй реальный фрагмент, 1–3 строки.
- Вопрос: “Какое настроение ближе всего к этому фрагменту?”
- Options — короткие фразы настроения.
- Примеры options: “Светлая грусть”, “Покой”, “Надежда”, “Тревога”, “Нежность”, “Одиночество”, “Тихая радость”, “Мечтательность”.

Theme round:
- roundType: "theme"
- roundLabel: "Тема"
- Используй реальный фрагмент, 1–3 строки.
- Вопрос: “О чём этот фрагмент прежде всего?”
- Options — короткие слова или фразы темы.
- Примеры options: “Память”, “Ожидание”, “Прощание”, “Дом”, “Любовь”, “Время”, “Надежда”, “Тишина”.

Main word round:
- roundType: "main_word"
- roundLabel: "Главное слово"
- Используй реальный фрагмент, 1–3 строки.
- Вопрос: “Какое слово лучше всего передаёт центр этого фрагмента?”
- correctAnswer может быть словом из фрагмента или очень ясным понятием из фрагмента.
- Options — ответы из одного слова.
- Примеры options: “Свет”, “Тишина”, “Дорога”, “Сердце”, “Ветер”, “Память”.

Missing word round:
- roundType: "missing_word"
- roundLabel: "Пропущенное слово"
- Выбери одну реальную строку из стихотворения.
- Замени одно значимое слово на ___.
- correctAnswer — исходное удалённое слово.
- excerpt обязательно содержит ___.
- Options — русские ответы из одного слова.
- Неверные варианты должны быть правдоподобными и поэтическими, но не абсурдными.
- Не удаляй маленькие служебные слова вроде “и”, “в”, “на”, “но”.
- Пропущенное слово должно быть не короче 3 букв.

Формат:
{
  "roundType": "${expectedRound.type}",
  "roundLabel": "${expectedRound.label}",
  "excerpt": "реальный фрагмент из стихотворения или строка с ___",
  "question": "${expectedRound.question}",
  "correctAnswer": "один вариант из options",
  "options": ["вариант1", "вариант2", "вариант3", "вариант4"],
  "explanation": "короткое объяснение",
  "sourceTitle": "название стихотворения",
  "sourceSlug": "slug"
}`;

  const userPrompt = JSON.stringify({
    title,
    slug,
    roundType: expectedRound.type,
    roundLabel: expectedRound.label,
    question: expectedRound.question,
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
    const round = validateRound(parseModelJson(content), {
      sourceText: limitedText,
      title,
      slug,
      expectedRound,
    });

    return jsonResponse(200, round);
  } catch (error) {
    console.error("AI poem game round failed:", error);
    return jsonResponse(502, { error: "Unable to create AI poem game round" });
  }
};
