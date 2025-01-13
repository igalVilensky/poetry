<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50"
  >
    <!-- Hero Section -->
    <div class="relative h-[40vh] sm:h-[50vh] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://via.placeholder.com/1920x1080')"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/70 to-amber-900/50"
      ></div>

      <div
        class="relative h-full container mx-auto px-6 flex items-center justify-center"
      >
        <h1 class="text-4xl md:text-6xl font-serif text-white text-center">
          Музыкальная коллекция
        </h1>
      </div>
    </div>

    <!-- Music List Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6">
        <h2
          class="text-3xl md:text-4xl font-serif text-slate-900 mb-12 text-center"
        >
          Все треки
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(track, index) in tracks"
            :key="index"
            class="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div class="p-6">
              <h3 class="text-xl font-serif text-slate-900 mb-3">
                {{ track.title }}
              </h3>
              <p class="text-slate-600 mb-4 line-clamp-3">
                {{ track.description }}
              </p>
              <div class="flex gap-4">
                <button
                  @click="playTrack(track)"
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                >
                  <i class="fas fa-play"></i>
                </button>
                <a
                  :href="track.url"
                  download
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  <i class="fas fa-download"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Audio Player -->
    <div
      v-if="currentTrack"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg"
    >
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-serif text-slate-900">
              {{ currentTrack.title }}
            </h3>
            <p class="text-slate-600">{{ currentTrack.description }}</p>
          </div>
          <audio controls class="w-full max-w-md">
            <source :src="currentTrack.url" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Sample Music Data
const tracks = ref([
  {
    title: "Замри!",
    description: "Энергичный трек с глубоким смыслом.",
    url: "https://poetry-backend-mongo.onrender.com/stream-audio",
  },
  {
    title: "Осенний вальс",
    description: "Нежный и меланхоличный трек.",
    url: "https://poetry-backend-mongo.onrender.com/stream-audio",
  },
  {
    title: "Городские огни",
    description: "Динамичный трек о жизни в большом городе.",
    url: "https://poetry-backend-mongo.onrender.com/stream-audio",
  },
]);

// Current Track
const currentTrack = ref(null);

// Play Track Function
const playTrack = (track) => {
  currentTrack.value = track;
};
</script>

<style scoped>
/* Custom styles for the audio player */
audio {
  outline: none;
}
</style>
