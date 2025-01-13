<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50"
  >
    <!-- Hero Section -->
    <div class="relative h-[40vh] sm:h-[50vh] overflow-hidden">
      <!-- Dynamic Background Image -->
      <div
        v-if="heroImage"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${heroImage})` }"
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
            v-for="track in tracks"
            :key="track._id"
            class="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <!-- Track Cover Image -->
            <div v-if="track.coverImage" class="h-48 overflow-hidden">
              <img
                :src="track.coverImage"
                :alt="track.title"
                class="w-full h-full object-cover"
              />
            </div>
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
                  :href="`https://drive.google.com/uc?export=download&id=${track.trackId}`"
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
            <source :src="currentTrackUrl" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchTracks } from "~/api/sanity/tracks";
import { useNuxtApp } from "#app"; // Import useNuxtApp

// Fetch Tracks from Sanity
const tracks = ref([]);
const currentTrack = ref(null);
const currentTrackUrl = ref(""); // Add this line
const heroImage = ref(null); // For the hero section background image

const { $axios } = useNuxtApp();

onMounted(async () => {
  tracks.value = await fetchTracks();
  // Set the hero image to the first track's cover image (if it exists)
  if (tracks.value.length > 0 && tracks.value[0].coverImage) {
    heroImage.value = tracks.value[0].coverImage;
  }
});

const playTrack = async (track) => {
  try {
    // Set the current track
    currentTrack.value = track;
    // Construct the full URL using the Axios baseURL
    const fullUrl = `${$axios.defaults.baseURL}/stream-audio?trackId=${track.fileId}`;
    currentTrackUrl.value = fullUrl; // Set the currentTrackUrl to the full URL
  } catch (error) {
    console.error("Error fetching audio URL:", error);
  }
};
</script>

<style scoped>
/* Custom styles for the audio player */
audio {
  outline: none;
}
</style>
