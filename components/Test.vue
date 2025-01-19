<template>
  <div class="poetry-wheel relative overflow-hidden">
    <div
      class="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 p-8 shadow-xl"
    >
      <!-- Side Decorations (Desktop Only) -->
      <div class="hidden md:block">
        <div
          class="absolute left-0 top-0 h-full w-32 pointer-events-none side-decoration left-decoration"
        >
          <template v-for="n in 10" :key="`left-${n}`">
            <i
              :class="`fas fa-${
                sideIcons[n % sideIcons.length]
              } absolute text-amber-${n % 2 ? '400' : '300'} text-2xl`"
              :style="{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatSide ${
                  2 + Math.random() * 2
                }s ease-in-out infinite`,
              }"
            >
            </i>
          </template>
        </div>
        <div
          class="absolute right-0 top-0 h-full w-32 pointer-events-none side-decoration right-decoration"
        >
          <template v-for="n in 10" :key="`right-${n}`">
            <i
              :class="`fas fa-${
                sideIcons[n % sideIcons.length]
              } absolute text-amber-${n % 2 ? '400' : '300'} text-2xl`"
              :style="{
                right: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatSide ${
                  2 + Math.random() * 2
                }s ease-in-out infinite`,
              }"
            >
            </i>
          </template>
        </div>
      </div>

      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-serif text-amber-900 mb-3 font-medium">
          <i class="fas fa-book-open mr-2"></i>Колесо поэзии
        </h2>
        <p class="text-amber-700 text-lg">
          Погрузитесь в мир поэзии одним движением
        </p>
      </div>

      <!-- Interactive Area -->
      <div class="relative">
        <!-- Spinning Wheel -->
        <div
          v-show="isSpinning"
          class="wheel-container"
          :class="{ 'animate-fade-out': isRevealingPoem }"
        >
          <div class="poetry-circle" @click="!isSpinning && spinWheel()">
            <div v-for="n in 12" :key="n" class="circle-segment">
              <i
                :class="`fas fa-${
                  mainIcons[n % mainIcons.length]
                } text-amber-500`"
              ></i>
            </div>
          </div>
          <div class="flying-words">
            <span
              v-for="(word, idx) in animationWords"
              :key="idx"
              class="flying-word"
              :style="{
                animationDelay: `${idx * 0.15}s`,
                left: `${(idx % 3) * 40}%`,
              }"
            >
              {{ word }}
              <i
                :class="`fas fa-${wordIcons[idx % wordIcons.length]} ml-2`"
              ></i>
            </span>
          </div>
        </div>

        <!-- Poem Reveal Animation -->
        <Transition
          enter-active-class="transition duration-700 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div v-if="revealedPoem && !isSpinning" class="poem-container">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-inner"
            >
              <h3 class="text-2xl font-serif text-amber-900 mb-4">
                {{ revealedPoem.title }}
              </h3>
              <p
                class="text-slate-700 text-lg leading-relaxed line-clamp-4 mb-6"
              >
                {{ revealedPoem.body[0].children[0].text }}
              </p>
              <nuxt-link
                :to="`/poems/${revealedPoem.slug.current}`"
                class="inline-flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                <span>Читать полностью</span>
                <i class="fas fa-arrow-right ml-2"></i>
              </nuxt-link>
            </div>
          </div>
        </Transition>

        <!-- Main Action Button -->
        <div class="text-center mt-8">
          <button
            @click="spinWheel"
            :disabled="isSpinning"
            class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <span
              class="absolute inset-0 w-full h-full rounded-full bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100"
            ></span>
            <i class="fas fa-magic mr-2"></i>
            <span>{{
              isSpinning
                ? "Раскрываем магию поэзии..."
                : "Раскрыть стихотворение"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  poems: {
    type: Array,
    required: true,
  },
});

const isSpinning = ref(false);
const isRevealingPoem = ref(false);
const revealedPoem = ref(null);
const pullProgress = ref(0);

// Enhanced animation content
const mainIcons = [
  "feather-alt",
  "book",
  "scroll",
  "pen-fancy",
  "pen-nib",
  "bookmark",
  "star",
  "heart",
  "moon",
  "sun",
  "music",
  "coffee",
];

const sideIcons = [
  "feather",
  "star",
  "heart",
  "moon",
  "sun",
  "music",
  "coffee",
  "pen",
  "book",
  "scroll",
  "cloud",
  "sparkles",
];

const wordIcons = [
  "heart",
  "star",
  "moon",
  "sun",
  "music",
  "feather",
  "book",
  "pen-fancy",
  "scroll",
  "coffee",
  "cloud",
];

const animationWords = [
  "Любовь",
  "Мечта",
  "Вдохновение",
  "Судьба",
  "Время",
  "Душа",
  "Счастье",
  "Поэзия",
  "Гармония",
  "Красота",
  "Творчество",
  "Муза",
  "Надежда",
  "Радость",
  "Страсть",
  "Мысль",
  "Чувство",
  "Полет",
];

// Pull ribbon interaction
const startPull = () => {
  pullProgress.value = 0;
};

const updatePull = (event) => {
  if (event.buttons === 1) {
    pullProgress.value += 1;
    if (pullProgress.value >= 50) {
      // Threshold for activation
      spinWheel();
    }
  }
};

const endPull = () => {
  pullProgress.value = 0;
};

const cancelPull = () => {
  pullProgress.value = 0;
};

const spinWheel = async () => {
  if (isSpinning.value) return;

  // Reset and start animation
  isSpinning.value = true;
  revealedPoem.value = null;
  isRevealingPoem.value = false;

  // Extended animation duration
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // Prepare for reveal
  isRevealingPoem.value = true;
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Reveal the poem
  const randomIndex = Math.floor(Math.random() * props.poems.length);
  revealedPoem.value = props.poems[randomIndex];
  isSpinning.value = false;
};
</script>

<style scoped>
.poetry-wheel {
  min-height: 400px;
}

.wheel-container {
  @apply absolute inset-0 flex items-center justify-center;
}

.poetry-circle {
  @apply relative w-48 h-48 cursor-pointer transform hover:scale-105 transition-transform;
  animation: rotate 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.circle-segment {
  @apply absolute w-full h-full flex items-center justify-center text-2xl;
  transform-origin: center;
}

.circle-segment {
  @apply absolute w-full h-full flex items-center justify-center text-2xl;
  transform-origin: center;
}

/* Generate segments dynamically */
.circle-segment:nth-child(1) {
  transform: rotate(0deg);
}
.circle-segment:nth-child(2) {
  transform: rotate(30deg);
}
.circle-segment:nth-child(3) {
  transform: rotate(60deg);
}
.circle-segment:nth-child(4) {
  transform: rotate(90deg);
}
.circle-segment:nth-child(5) {
  transform: rotate(120deg);
}
.circle-segment:nth-child(6) {
  transform: rotate(150deg);
}
.circle-segment:nth-child(7) {
  transform: rotate(180deg);
}
.circle-segment:nth-child(8) {
  transform: rotate(210deg);
}
.circle-segment:nth-child(9) {
  transform: rotate(240deg);
}
.circle-segment:nth-child(10) {
  transform: rotate(270deg);
}
.circle-segment:nth-child(11) {
  transform: rotate(300deg);
}
.circle-segment:nth-child(12) {
  transform: rotate(330deg);
}

.flying-words {
  @apply absolute inset-0 overflow-hidden;
}

.flying-word {
  @apply absolute text-amber-700 opacity-0 text-lg font-serif;
  animation: flyWord 3s ease-out infinite;
}

.animate-fade-out {
  animation: fadeOut 0.4s forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes flyWord {
  0% {
    top: 100%;
    opacity: 0;
    transform: translateX(0) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translateX(20px) scale(1);
  }
  100% {
    top: -20%;
    opacity: 0;
    transform: translateX(40px) scale(0.5);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

@keyframes floatSide {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}
</style>
