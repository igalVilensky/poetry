<template>
  <div class="min-h-screen bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-gray-950 dark:text-stone-100">
    <main class="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 md:py-14">
      <header class="mb-10 text-center">
        <p class="mb-3 text-sm uppercase text-amber-700 dark:text-amber-300">
          Поэтическая игра
        </p>
        <h1 class="font-serif text-4xl leading-tight text-stone-950 dark:text-white md:text-6xl">
          Чуткое чтение
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-300 md:text-lg">
          Прислушайтесь к строкам и выберите настроение, которое звучит в них сильнее всего.
        </p>
        <div v-if="!gameOver" class="mt-7 flex flex-col items-center gap-3">
          <p class="text-sm text-stone-500 dark:text-stone-400">
            Строка {{ currentRound }} из {{ maxRounds }}
          </p>
          <div class="flex gap-2" aria-hidden="true">
            <span v-for="round in maxRounds" :key="round" class="h-1.5 w-10 rounded-full transition-colors"
              :class="round <= currentRound ? 'bg-amber-600 dark:bg-amber-300' : 'bg-stone-200 dark:bg-stone-800'"></span>
          </div>
        </div>
      </header>

      <section
        class="mx-auto w-full max-w-4xl rounded-2xl border border-stone-200 bg-white/75 p-6 shadow-xl shadow-stone-200/50 dark:border-stone-800 dark:bg-gray-900/70 dark:shadow-black/20 md:p-10">
        <div v-if="isPageLoading" class="flex min-h-[360px] flex-col items-center justify-center text-center">
          <div class="h-10 w-10 rounded-full border-2 border-stone-300 border-t-amber-600 dark:border-stone-700 dark:border-t-amber-300"></div>
          <p class="mt-5 text-stone-600 dark:text-stone-300">
            {{ postsLoading ? "Загружаем стихотворения..." : "Подбираем строку..." }}
          </p>
        </div>

        <div v-else-if="gameOver" class="mx-auto max-w-2xl py-8 text-center">
          <p class="mb-4 text-sm uppercase text-amber-700 dark:text-amber-300">
            Игра завершена
          </p>
          <h2 class="font-serif text-4xl text-stone-950 dark:text-white md:text-5xl">
            {{ score }} из 100
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-300">
            {{ finalMessage }}
          </p>

          <div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" @click="restartGame"
              class="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-50">
              Сыграть ещё раз
            </button>
            <nuxt-link v-if="lastRoundSource?.sourceSlug" :to="`/poems/${lastRoundSource.sourceSlug}`"
              class="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-500 hover:text-stone-950 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-white">
              Открыть стихотворение
            </nuxt-link>
          </div>
        </div>

        <div v-else-if="currentGameRound" class="mx-auto max-w-3xl">
          <p v-if="aiError" class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-100">
            {{ aiError }}
          </p>

          <blockquote
            class="whitespace-pre-line border-y border-stone-200 py-8 text-center font-serif text-2xl italic leading-10 text-stone-900 dark:border-stone-800 dark:text-stone-100 md:text-3xl md:leading-[3.2rem]">
            {{ currentGameRound.excerpt }}
          </blockquote>

          <div class="mt-8">
            <h2 class="text-center font-serif text-2xl text-stone-950 dark:text-white">
              {{ currentGameRound.question }}
            </h2>
            <div class="mt-7 grid gap-3 sm:grid-cols-2">
              <button v-for="option in currentGameRound.options" :key="option" type="button" @click="selectMood(option)"
                class="rounded-xl border p-5 text-left font-medium transition-colors disabled:cursor-default"
                :disabled="!!selectedMood"
                :class="getOptionClass(option)">
                {{ option }}
              </button>
            </div>
          </div>

          <div v-if="feedback" class="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-gray-950/70">
            <p class="font-serif text-xl text-stone-950 dark:text-white">
              {{ feedback.message }}
            </p>
            <p class="mt-4 text-sm uppercase text-amber-700 dark:text-amber-300">
              Почему?
            </p>
            <p class="mt-2 leading-7 text-stone-600 dark:text-stone-300">
              {{ feedback.explanation }}
            </p>
            <p v-if="!feedback.isCorrect" class="mt-3 text-sm text-stone-500 dark:text-stone-400">
              Ближе всего: {{ currentGameRound.correctMood }}
            </p>
            <button type="button" @click="goToNextRound"
              class="mt-6 inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-50">
              {{ currentRound < maxRounds ? "Следующая строка" : "Завершить игру" }}
            </button>
          </div>
        </div>

        <div v-else class="mx-auto flex min-h-[320px] max-w-xl flex-col items-center justify-center text-center">
          <p class="font-serif text-3xl text-stone-950 dark:text-white">
            Пока не удалось подобрать строки
          </p>
          <p class="mt-4 leading-7 text-stone-600 dark:text-stone-300">
            Когда в коллекции появятся стихотворения с текстом, игра откроется здесь.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { fetchPosts } from "~/api/sanity/posts";

const { data: posts, loading } = fetchPosts();

const maxRounds = 5;
const currentRound = ref(1);
const score = ref(0);
const currentGameRound = ref(null);
const selectedMood = ref("");
const feedback = ref(null);
const isRoundLoading = ref(false);
const gameOver = ref(false);
const lastRoundSource = ref(null);
const aiError = ref("");
const hasStarted = ref(false);
const isClientReady = ref(false);

const postsLoading = computed(() => Boolean(loading?.value));
const isPageLoading = computed(
  () => !isClientReady.value || postsLoading.value || isRoundLoading.value
);
const playablePosts = computed(() =>
  (posts.value || []).filter((post) => extractPlainText(post.body).length > 30)
);
const finalMessage = computed(() => {
  if (score.value >= 80) return "Вы очень тонко слышите настроение строк.";
  if (score.value >= 40) return "Вы внимательно читаете и чувствуете оттенки.";
  return "Поэзия всегда оставляет место для другого прочтения.";
});

useHead({
  title: "Чуткое чтение - Поэтическая игра",
  meta: [
    {
      name: "description",
      content:
        "Спокойная литературная игра: прочитайте короткий фрагмент стихотворения и выберите настроение, которое звучит в нём сильнее всего.",
    },
  ],
});

const extractPlainText = (body) => {
  if (!body) return "";

  const readNode = (node) => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(readNode).filter(Boolean).join("\n");
    if (typeof node.text === "string") return node.text;
    if (Array.isArray(node.children)) return node.children.map(readNode).filter(Boolean).join("");
    return "";
  };

  return readNode(body)
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const getPostSlug = (post) => {
  if (!post?.slug) return "";
  if (typeof post.slug === "string") return post.slug;
  return post.slug.current || "";
};

const pickRandomPost = () => {
  if (!playablePosts.value.length) return null;
  return playablePosts.value[Math.floor(Math.random() * playablePosts.value.length)];
};

const getFallbackExcerpt = (text) => {
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 10);

  if (!lines.length) return text.slice(0, 180).trim();

  const start = Math.floor(Math.random() * lines.length);
  return lines.slice(start, start + 2).join("\n");
};

const buildFallbackRound = (post) => {
  const sourceTitle = post?.title || "Стихотворение";
  const sourceSlug = getPostSlug(post);
  const text = extractPlainText(post?.body);

  return {
    excerpt: getFallbackExcerpt(text),
    question: "Какое настроение звучит в этих строках?",
    correctMood: "Покой",
    options: ["Светлая грусть", "Покой", "Надежда", "Тревога"],
    explanation:
      "Этот раунд создан без AI. Попробуйте выбрать настроение, которое вам ближе.",
    sourceTitle,
    sourceSlug,
  };
};

const fetchAiRound = async (post) => {
  const response = await fetch("/.netlify/functions/aiMoodGameRound", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: post.title || "Стихотворение",
      slug: getPostSlug(post),
      text: extractPlainText(post.body),
    }),
  });

  if (!response.ok) {
    throw new Error("AI endpoint unavailable");
  }

  return response.json();
};

const normalizeRound = (round, post) => {
  const sourceTitle = round?.sourceTitle || post?.title || "Стихотворение";
  const sourceSlug = round?.sourceSlug || getPostSlug(post);
  const options = Array.isArray(round?.options) ? round.options.filter(Boolean).slice(0, 4) : [];

  if (
    !round?.excerpt ||
    !round?.correctMood ||
    options.length !== 4 ||
    !options.includes(round.correctMood)
  ) {
    throw new Error("Invalid round data");
  }

  return {
    excerpt: round.excerpt,
    question: round.question || "Какое настроение звучит в этих строках?",
    correctMood: round.correctMood,
    options,
    explanation: round.explanation || "В этих строках особенно чувствуется это настроение.",
    sourceTitle,
    sourceSlug,
  };
};

const loadRound = async () => {
  const post = pickRandomPost();

  currentGameRound.value = null;
  selectedMood.value = "";
  feedback.value = null;
  aiError.value = "";

  if (!post) {
    isRoundLoading.value = false;
    return;
  }

  isRoundLoading.value = true;

  try {
    currentGameRound.value = normalizeRound(await fetchAiRound(post), post);
  } catch (error) {
    console.warn("Using local mood-game fallback:", error);
    currentGameRound.value = buildFallbackRound(post);
    aiError.value = "Этот раунд создан без AI: попробуйте выбрать настроение, которое вам ближе.";
  } finally {
    lastRoundSource.value = {
      sourceTitle: currentGameRound.value?.sourceTitle || post.title,
      sourceSlug: currentGameRound.value?.sourceSlug || getPostSlug(post),
    };
    isRoundLoading.value = false;
  }
};

const startGame = async () => {
  score.value = 0;
  currentRound.value = 1;
  gameOver.value = false;
  lastRoundSource.value = null;
  await loadRound();
};

const restartGame = async () => {
  await startGame();
};

const selectMood = (mood) => {
  if (!currentGameRound.value || selectedMood.value) return;

  selectedMood.value = mood;
  const isCorrect = mood === currentGameRound.value.correctMood;

  if (isCorrect) {
    score.value += 20;
  }

  feedback.value = {
    isCorrect,
    message: isCorrect
      ? "Да, это настроение здесь звучит особенно сильно."
      : "Интересный выбор. Но в этих строках сильнее звучит другое настроение.",
    explanation: currentGameRound.value.explanation,
  };
};

const goToNextRound = async () => {
  if (currentRound.value < maxRounds) {
    currentRound.value += 1;
    await loadRound();
    return;
  }

  gameOver.value = true;
};

const getOptionClass = (option) => {
  if (!selectedMood.value) {
    return "border-stone-200 bg-white text-stone-800 hover:border-amber-300 hover:bg-amber-50 dark:border-stone-800 dark:bg-gray-950/70 dark:text-stone-100 dark:hover:border-amber-500/70 dark:hover:bg-amber-950/20";
  }

  if (option === currentGameRound.value?.correctMood) {
    return "border-amber-400 bg-amber-50 text-stone-950 dark:border-amber-300 dark:bg-amber-950/30 dark:text-stone-50";
  }

  if (option === selectedMood.value) {
    return "border-stone-300 bg-stone-100 text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400";
  }

  return "border-stone-200 bg-white/60 text-stone-500 dark:border-stone-800 dark:bg-gray-950/40 dark:text-stone-500";
};

watch(
  playablePosts,
  async (availablePosts) => {
    if (!isClientReady.value || hasStarted.value || !availablePosts.length) return;

    hasStarted.value = true;
    await startGame();
  },
  { immediate: true }
);

onMounted(async () => {
  isClientReady.value = true;

  if (!hasStarted.value && playablePosts.value.length) {
    hasStarted.value = true;
    await startGame();
  }
});
</script>
