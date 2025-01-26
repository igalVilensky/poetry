<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50"
  >
    <!-- Hero Section -->
    <div class="relative h-[40vh] sm:h-[50vh] overflow-hidden">
      <!-- Dynamic Background Image -->
      <div
        v-if="authorBackground"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${authorBackground})` }"
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
                <button
                  @click="downloadTrack(track)"
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  <i class="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Audio Player -->
    <div
      v-if="currentTrack"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50"
    >
      <div class="container mx-auto px-4 py-3 md:py-4">
        <!-- Mobile Layout -->
        <div class="md:hidden">
          <div class="flex items-center justify-between mb-3">
            <div class="flex-1 min-w-0 mr-4">
              <h3 class="text-base font-medium text-slate-900 truncate">
                {{ currentTrack.title }}
              </h3>
            </div>
            <button
              @click="closePlayer"
              class="flex-shrink-0 text-slate-500 hover:text-slate-700"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <!-- Progress Bar -->
          <div
            class="w-full bg-slate-200 rounded-full h-1 mb-3 cursor-pointer"
            @click="seek"
            ref="progressBar"
          >
            <div
              class="bg-amber-500 h-1 rounded-full"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <!-- Controls -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button
                @click="togglePlay"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
              </button>
              <div class="flex flex-col text-xs">
                <span class="text-slate-600">{{
                  formatTime(currentTime)
                }}</span>
                <span class="text-slate-400">{{ formatTime(duration) }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <button
                @click="toggleMute"
                class="text-slate-500 hover:text-slate-700"
              >
                <i
                  :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"
                ></i>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                v-model="volume"
                @input="updateVolume"
                class="w-20 accent-amber-500"
              />
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden md:block">
          <div class="flex items-center gap-6">
            <!-- Track Info -->
            <div class="flex items-center flex-1 min-w-0">
              <div v-if="currentTrack.coverImage" class="w-12 h-12 mr-4">
                <img
                  :src="currentTrack.coverImage"
                  :alt="currentTrack.title"
                  class="w-full h-full object-cover rounded"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-slate-900 truncate">
                  {{ currentTrack.title }}
                </h3>
                <p class="text-sm text-slate-600 truncate">
                  {{ currentTrack.description }}
                </p>
              </div>
            </div>

            <!-- Player Controls -->
            <div class="flex-1 max-w-2xl">
              <div class="flex flex-col">
                <div class="flex items-center justify-center space-x-6 mb-2">
                  <button
                    @click="playPreviousTrack"
                    class="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <i class="fas fa-step-backward"></i>
                  </button>
                  <button
                    @click="togglePlay"
                    class="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                  >
                    <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                  </button>
                  <button
                    @click="playNextTrack"
                    class="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <i class="fas fa-step-forward"></i>
                  </button>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-sm text-slate-500">{{
                    formatTime(currentTime)
                  }}</span>
                  <div class="flex-1 relative">
                    <div
                      class="w-full bg-slate-200 rounded-full h-1 cursor-pointer"
                      @click="seek"
                      ref="progressBar"
                    >
                      <div
                        class="absolute top-0 left-0 h-1 bg-amber-500 rounded-full"
                        :style="{ width: `${progress}%` }"
                      ></div>
                    </div>
                  </div>
                  <span class="text-sm text-slate-500">{{
                    formatTime(duration)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Volume Controls -->
            <div class="flex items-center space-x-4">
              <button
                @click="toggleMute"
                class="text-slate-500 hover:text-slate-700"
              >
                <i
                  :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"
                ></i>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                v-model="volume"
                @input="updateVolume"
                class="w-24 accent-amber-500"
              />
              <button
                @click="closePlayer"
                class="ml-4 text-slate-500 hover:text-slate-700"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Hidden Audio Element -->
        <audio
          ref="audioPlayer"
          :src="currentTrackUrl"
          @timeupdate="onTimeUpdate"
          @loadedmetadata="onLoadedMetadata"
          @ended="onEnded"
        ></audio>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { fetchTracks } from "~/api/sanity/tracks";
import { useNuxtApp } from "#app";
import authorBackground from "../assets/images/background.jpg";

// State Management
const tracks = ref([]);
const currentTrack = ref(null);
const currentTrackUrl = ref("");
const heroImage = ref(null);
const audioPlayer = ref(null);
const progressBar = ref(null);
const isPlaying = ref(false);
const duration = ref(0);
const currentTime = ref(0);
const progress = ref(0);
const volume = ref(100);
const isMuted = ref(false);
const previousVolume = ref(100);
const currentTrackIndex = ref(-1);

const { $axios } = useNuxtApp();

// Fetch tracks on mount
onMounted(async () => {
  tracks.value = await fetchTracks();
  if (tracks.value.length > 0 && tracks.value[0].coverImage) {
    heroImage.value = tracks.value[0].coverImage;
  }
});

// Audio Control Functions
const playTrack = async (track) => {
  try {
    currentTrack.value = track;
    currentTrackIndex.value = tracks.value.findIndex(
      (t) => t._id === track._id
    );
    const fullUrl = `${$axios.defaults.baseURL}/stream-audio?trackId=${track.fileId}`;
    currentTrackUrl.value = fullUrl;

    nextTick(() => {
      if (audioPlayer.value) {
        audioPlayer.value.play();
        isPlaying.value = true;
      }
    });
  } catch (error) {
    console.error("Error fetching audio URL:", error);
  }
};

const playNextTrack = () => {
  if (currentTrackIndex.value < tracks.value.length - 1) {
    playTrack(tracks.value[currentTrackIndex.value + 1]);
  }
};

const playPreviousTrack = () => {
  if (currentTrackIndex.value > 0) {
    playTrack(tracks.value[currentTrackIndex.value - 1]);
  }
};

const togglePlay = () => {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause();
    } else {
      audioPlayer.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

const toggleMute = () => {
  if (audioPlayer.value) {
    if (isMuted.value) {
      audioPlayer.value.volume = previousVolume.value / 100;
      volume.value = previousVolume.value;
    } else {
      previousVolume.value = volume.value;
      audioPlayer.value.volume = 0;
      volume.value = 0;
    }
    isMuted.value = !isMuted.value;
  }
};

const updateVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value / 100;
    isMuted.value = volume.value === 0;
  }
};

const seek = (event) => {
  if (progressBar.value && audioPlayer.value) {
    const rect = progressBar.value.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    audioPlayer.value.currentTime = pos * duration.value;
  }
};

// Event Handlers
const onTimeUpdate = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
    progress.value = (currentTime.value / duration.value) * 100;
  }
};

const onLoadedMetadata = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration;
    audioPlayer.value.volume = volume.value / 100;
  }
};

const onEnded = () => {
  isPlaying.value = false;
  if (currentTrackIndex.value < tracks.value.length - 1) {
    playNextTrack();
  } else {
    currentTime.value = 0;
    progress.value = 0;
  }
};

const closePlayer = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
  }
  isPlaying.value = false;
  currentTrack.value = null;
  currentTrackUrl.value = "";
  currentTime.value = 0;
  progress.value = 0;
};

// Download function
const downloadTrack = (track) => {
  const downloadUrl = `${$axios.defaults.baseURL}/stream-audio?trackId=${track.fileId}&download=true`;
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", `${track.title}.mp3`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Format time helper
const formatTime = (time) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Cleanup
onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.src = "";
  }
});
</script>

<style scoped>
/* Custom styles for range inputs */
input[type="range"] {
  -webkit-appearance: none;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  background-image: linear-gradient(#f59e0b, #f59e0b);
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #f59e0b;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #f59e0b;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
  border: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-moz-range-track {
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #d97706;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #d97706;
}

/* Progress bar hover effect */
.progress-container {
  position: relative;
}

.progress-hover {
  position: absolute;
  top: -20px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  display: none;
}

.progress-container:hover .progress-hover {
  display: block;
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for track list */
.track-list::-webkit-scrollbar {
  width: 8px;
}

.track-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.track-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.track-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  input[type="range"] {
    height: 3px;
  }

  input[type="range"]::-webkit-slider-thumb {
    height: 10px;
    width: 10px;
  }

  input[type="range"]::-moz-range-thumb {
    height: 10px;
    width: 10px;
  }

  .audio-controls {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Animations for play/pause button */
@keyframes playPause {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.play-pause-btn {
  animation: playPause 0.2s ease-out;
}

/* Volume slider dynamic background */
input[type="range"].volume-slider {
  background-size: 70% 100%;
}

/* Active state for controls */
.control-button:active {
  transform: scale(0.95);
}
</style>
