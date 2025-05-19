<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6"
  >
    <div class="relative container mx-auto max-w-4xl">
      <!-- Hero Section -->
      <div class="relative h-[40vh] rounded-2xl overflow-hidden mb-12">
        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-amber-900/90"
        ></div>
        <div class="absolute inset-0 opacity-20 animate-pulse">
          <div
            class="h-full w-full bg-[radial-gradient(circle_500px_at_50%_50%,rgba(253,224,71,0.1),transparent)]"
          ></div>
        </div>
        <div
          class="relative h-full flex flex-col justify-center items-center text-center"
        >
          <h1 class="text-5xl font-serif text-white mb-4">
            <i class="fas fa-fire text-amber-300 mr-2"></i> Огонь Лирики
          </h1>
          <p class="text-amber-100 text-lg font-light max-w-xl">
            Разожги строки! Угадай слова и взорви сцену.
          </p>
          <!-- Game progress indicator -->
          <div class="mt-6 flex items-center">
            <div class="flex space-x-2">
              <div
                v-for="i in 5"
                :key="i"
                class="w-3 h-3 rounded-full"
                :class="currentRound > i ? 'bg-amber-300' : 'bg-slate-600/50'"
              ></div>
            </div>
            <span class="ml-3 text-amber-100 text-sm"
              >{{ currentRound > 5 ? 5 : currentRound }}/5</span
            >
          </div>
        </div>
      </div>

      <!-- Game Section -->
      <section
        class="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg"
      >
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-300 border-t-amber-600"
          ></div>
          <p class="mt-4 text-slate-600">Загрузка...</p>
        </div>

        <!-- Game Over Screen -->
        <div v-else-if="gameOver" class="text-center py-8">
          <div class="mb-6">
            <i class="fas fa-trophy text-amber-500 text-6xl mb-4"></i>
            <h2 class="text-3xl font-serif text-slate-800 mb-2">
              {{ gameWon ? "Победа!" : "Игра окончена!" }}
            </h2>
            <p class="text-lg text-slate-600 mb-6">
              {{
                gameWon
                  ? "Ты настоящий мастер лирики!"
                  : "Не переживай, в следующий раз повезёт больше."
              }}
            </p>
            <p class="text-xl font-medium">
              Итоговый счёт: <span class="text-amber-600">{{ score }}</span>
            </p>
          </div>

          <div class="mt-8">
            <button
              @click="resetGame"
              class="px-6 py-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 font-medium transition-all transform hover:scale-105"
            >
              Играть снова
            </button>

            <div v-if="unlockedPost" class="mt-6">
              <p class="text-slate-700 mb-4">Ты разблокировал стихотворение!</p>
              <nuxt-link
                :to="`/poems/${unlockedPost.slug.current}`"
                class="inline-block px-6 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-900 font-medium transition-all"
              >
                <i class="fas fa-book-open mr-2"></i> Читать полностью
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- Active Game -->
        <div v-else-if="currentLyric">
          <div class="mb-4 flex justify-between text-slate-600">
            <p class="flex items-center">
              <i class="fas fa-stopwatch text-amber-500 mr-2"></i>
              <span
                class="font-medium"
                :class="timer <= 3 ? 'text-red-500' : ''"
                >{{ timer }} сек</span
              >
            </p>
            <p class="flex items-center">
              <i class="fas fa-star text-amber-500 mr-2"></i>
              <span class="font-medium">{{ score }}</span>
            </p>
          </div>

          <div class="py-6 border-t border-b border-slate-100 mb-6">
            <p
              class="text-2xl font-serif text-slate-800 mb-6 text-center italic"
            >
              "{{ currentLyric.line }}"
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                v-for="option in currentLyric.options"
                :key="option.text"
                @click="checkAnswer(option.text)"
                class="flex items-center justify-center px-4 py-3 rounded-lg bg-amber-100 hover:bg-amber-200 text-slate-800 font-medium transition-all duration-300 transform hover:scale-105"
                :class="{ 'animate-pulse': timer < 3 }"
              >
                <i :class="option.icon" class="mr-2"></i>
                {{ option.text }}
              </button>
            </div>
          </div>

          <div
            v-if="feedback"
            class="flex items-center justify-center mb-6 p-3 rounded-lg"
            :class="feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'"
          >
            <div
              :class="
                feedback.isCorrect
                  ? 'text-green-600 animate-inferno'
                  : 'text-red-600'
              "
              class="flex items-center text-lg"
            >
              <i :class="feedback.icon" class="mr-2"></i>
              {{ feedback.message }}
            </div>
          </div>

          <audio
            v-if="audioSrc"
            :src="audioSrc"
            ref="audioPlayer"
            class="hidden"
          ></audio>
        </div>

        <div v-else class="text-center py-8 text-red-600">
          <i class="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p>
            Ошибка: Не удалось загрузить строки. Попробуйте обновить страницу.
          </p>
        </div>
      </section>

      <!-- Game Rules Section -->
      <section class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h3 class="text-lg font-medium text-slate-800 mb-2">Как играть:</h3>
        <ul class="text-slate-600 text-sm">
          <li class="flex items-start mb-1">
            <i class="fas fa-check-circle text-amber-500 mt-1 mr-2"></i>
            <span>Угадай пропущенное слово в поэтической строке</span>
          </li>
          <li class="flex items-start mb-1">
            <i class="fas fa-check-circle text-amber-500 mt-1 mr-2"></i>
            <span>На каждый ответ даётся 10 секунд</span>
          </li>
          <li class="flex items-start">
            <i class="fas fa-check-circle text-amber-500 mt-1 mr-2"></i>
            <span
              >Пройди 5 раундов, чтобы разблокировать полное стихотворение</span
            >
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { useSanity } from "#imports";

const { data: posts, loading } = fetchPosts();
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

// Game state
const score = ref(0);
const timer = ref(10);
const maxRounds = 5;
const currentRound = ref(1);
const feedback = ref(null);
const currentLyric = ref(null);
const audioSrc = ref(null);
const unlockedPost = ref(null);
const lives = ref(3);
const gameOver = ref(false);
const gameWon = ref(false);
let interval = null;

// Local storage
const loadGameState = () => {
  const saved = localStorage.getItem("lyricInferno");
  if (saved) {
    const {
      score: savedScore,
      currentRound: savedRound,
      lives: savedLives,
    } = JSON.parse(saved);
    score.value = savedScore || 0;
    currentRound.value = savedRound || 1;
    lives.value = savedLives || 3;
  }
};

const saveGameState = () => {
  localStorage.setItem(
    "lyricInferno",
    JSON.stringify({
      score: score.value,
      currentRound: currentRound.value,
      lives: lives.value,
    })
  );
};

// Reset game
const resetGame = () => {
  score.value = 0;
  currentRound.value = 1;
  lives.value = 3;
  gameOver.value = false;
  gameWon.value = false;
  unlockedPost.value = null;
  feedback.value = null;
  timer.value = 10;

  // Clear storage
  localStorage.removeItem("lyricInferno");

  // Generate new round
  currentLyric.value = generateGameRound(posts.value);

  // Start timer
  startTimer();
};

// Dynamic word selection
const generateGameRound = (posts) => {
  if (!posts || !posts.length) {
    console.error("No posts available");
    return null;
  }

  // Try up to 5 posts to find a valid lyric
  for (let i = 0; i < 5; i++) {
    const post = posts[Math.floor(Math.random() * posts.length)];

    // Find a block with text
    const lyricBlock = post.body?.find(
      (block) =>
        block._type === "block" &&
        block.children?.length &&
        block.children[0]?.text
    );
    if (!lyricBlock) {
      continue;
    }

    // Clean and limit to first line
    let lyric = lyricBlock.children[0].text.replace(/[.,!?;—]/g, ""); // Remove punctuation
    lyric = lyric.split(" ").slice(0, 10).join(" ");

    // Find Cyrillic words
    const words = lyric.match(/[\u0400-\u04FF]{3,}/g) || [];
    if (!words.length) {
      continue;
    }

    const targetWord = words[Math.floor(Math.random() * words.length)];
    const line = lyric.replace(targetWord, "___");

    // Create better distractors
    const distractors = [
      targetWord.slice(0, -1) + (targetWord.slice(-1) === "а" ? "у" : "ы"), // Similar word
      ["солнце", "тостер", "ветер", "время", "космос", "город", "кошка"][
        Math.floor(Math.random() * 7)
      ], // Common word
      ["сердце", "искра", "пламя", "душа", "волна", "страсть"][
        Math.floor(Math.random() * 6)
      ], // Poetic word
    ];

    // Better icons
    const icons = [
      "fas fa-check-circle",
      "fas fa-feather-alt",
      "fas fa-star",
      "fas fa-heart",
    ];

    // Shuffle icons
    const shuffledIcons = [...icons].sort(() => Math.random() - 0.5);

    const options = [
      { text: targetWord, icon: `${shuffledIcons[0]} text-amber-500` },
      ...distractors.map((text, index) => ({
        text,
        icon: `${shuffledIcons[index + 1]} text-${
          index === 0 ? "yellow" : index === 1 ? "blue" : "amber"
        }-500`,
      })),
    ].sort(() => Math.random() - 0.5); // Shuffle

    return { line, correct: targetWord, options, post };
  }

  console.error("Failed to find valid lyric after 5 tries");
  return null;
};

// Start timer
const startTimer = () => {
  clearInterval(interval);
  timer.value = 10;

  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      handleTimeout();
    }
  }, 1000);
};

// Handle timeout
const handleTimeout = () => {
  clearInterval(interval);
  lives.value--;

  feedback.value = {
    message:
      "Время вышло! " +
      (lives.value > 0 ? "Осталось жизней: " + lives.value : "Игра окончена!"),
    isCorrect: false,
    icon: "fas fa-clock text-red-500",
  };

  saveGameState();

  if (lives.value <= 0) {
    endGame(false);
  } else {
    setTimeout(() => {
      feedback.value = null;
      startTimer();
    }, 2000);
  }
};

// Check answer
function checkAnswer(selected) {
  if (timer.value === 0 || gameOver.value) return;
  clearInterval(interval);

  if (selected === currentLyric.value.correct) {
    // Correct answer
    feedback.value = {
      message: ["Огонь! Ты зажёг!", "Великолепно!", "Точно в цель!"][
        Math.floor(Math.random() * 3)
      ],
      isCorrect: true,
      icon: "fas fa-fire text-amber-500",
    };

    // Calculate score based on time left
    const timeBonus = timer.value * 2;
    score.value += 25 + timeBonus;

    // Play audio if available
    if (currentLyric.value.post.audio) {
      audioSrc.value = urlFor(currentLyric.value.post.audio).url();
      nextTick(() => {
        const audio = document.querySelector("audio");
        if (audio) audio.play();
      });
    }

    currentRound.value++;

    // Check if game is won
    if (currentRound.value > maxRounds) {
      unlockedPost.value = currentLyric.value.post;
      endGame(true);
    } else {
      // Continue to next round
      setTimeout(() => {
        audioSrc.value = null;
        feedback.value = null;
        currentLyric.value = generateGameRound(posts.value);
        startTimer();
      }, 2000);
    }
  } else {
    // Wrong answer
    lives.value--;

    feedback.value = {
      message:
        lives.value > 0
          ? `Неверно! "${selected}" не подходит. Осталось жизней: ${lives.value}`
          : "Неверно! Игра окончена!",
      isCorrect: false,
      icon: "fas fa-times-circle",
    };

    if (lives.value <= 0) {
      endGame(false);
    } else {
      // Continue with same question
      setTimeout(() => {
        feedback.value = null;
        startTimer();
      }, 2000);
    }
  }

  saveGameState();
}

// End game
const endGame = (won) => {
  clearInterval(interval);
  gameOver.value = true;
  gameWon.value = won;

  if (won) {
    // Generate confetti or special effect for winners
    const extraBonus = lives.value * 50; // Bonus for remaining lives
    score.value += extraBonus;
  }

  saveGameState();
};

// Initialize game
watch(
  posts,
  (newPosts) => {
    if (newPosts && newPosts.length) {
      currentLyric.value = generateGameRound(newPosts);
      if (!gameOver.value) {
        startTimer();
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  loadGameState();

  // Check if resuming a winning game
  if (currentRound.value > maxRounds) {
    if (posts.value && posts.value.length) {
      // Find a post to unlock
      const randomPost =
        posts.value[Math.floor(Math.random() * posts.value.length)];
      unlockedPost.value = randomPost;
      endGame(true);
    }
  } else if (!gameOver.value) {
    startTimer();
  }
});

onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
@keyframes inferno {
  0% {
    transform: scale(1);
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    transform: scale(1.4);
    opacity: 0.8;
    filter: brightness(1.5);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    filter: brightness(1);
  }
}
.animate-inferno {
  animation: inferno 0.6s ease-out;
}
</style>
