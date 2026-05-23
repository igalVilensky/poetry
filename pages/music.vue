<template>
  <div>
    <div v-if="!isListeningRoom"
      class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <!-- Hero Section -->
      <div class="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <!-- Dynamic Background Image -->
        <div v-if="authorBackground" class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${authorBackground})` }"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/70 to-amber-900/50"></div>

        <div class="relative h-full container mx-auto px-6 flex flex-col items-center justify-center gap-6">
          <h1 class="text-4xl md:text-6xl font-serif text-white text-center">
            Музыкальная коллекция
          </h1>
          <button type="button" @click="toggleListeningRoom"
            class="inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Войти в комнату звучания" title="Войти в комнату звучания">
            <i class="fas fa-headphones-alt"></i>
            <span>Войти в комнату звучания</span>
          </button>
        </div>
      </div>

      <!-- Music List Section -->
      <section class="py-16 md:py-24">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-12 text-center">
            Все треки
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="track in tracks" :key="track._id"
              class="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <!-- Track Cover Image -->
              <div v-if="track.coverImage" class="h-48 overflow-hidden">
                <img :src="track.coverImage" :alt="track.title" class="w-full h-full object-cover" />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-serif text-slate-900 dark:text-white mb-3">
                  {{ track.title }}
                </h3>
                <p class="text-slate-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {{ track.description }}
                </p>
                <div class="flex gap-4">
                  <button @click="playTrack(track)"
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                    aria-label="Воспроизвести трек" title="Воспроизвести">
                    <i class="fas fa-play"></i>
                  </button>
                  <button @click="downloadTrack(track)"
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Скачать трек" title="Скачать">
                    <i class="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Enhanced Audio Player -->
      <div v-if="currentTrack"
        class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 shadow-lg z-50 transition-colors duration-300">
        <div class="container mx-auto px-4 py-3 md:py-4">
          <!-- Mobile Layout -->
          <div class="md:hidden">
            <div class="flex items-center justify-between mb-3">
              <div class="flex-1 min-w-0 mr-4">
                <h3 class="text-base font-medium text-slate-900 dark:text-white truncate">
                  {{ currentTrack.title }}
                </h3>
              </div>
              <button @click="closePlayer"
                class="flex-shrink-0 text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200"
                aria-label="Закрыть плеер" title="Закрыть">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <!-- Progress Bar -->
            <div class="w-full bg-slate-200 rounded-full h-1 mb-3 cursor-pointer" @click="seek" ref="progressBar">
              <div class="bg-amber-500 h-1 rounded-full" :style="{ width: `${progress}%` }"></div>
            </div>
            <!-- Controls -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <button @click="togglePlay"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                  :aria-label="isPlaying ? 'Поставить на паузу' : 'Воспроизвести'"
                  :title="isPlaying ? 'Пауза' : 'Воспроизвести'">
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
                <button @click="toggleMute" class="text-slate-500 hover:text-slate-700"
                  :aria-label="isMuted ? 'Включить звук' : 'Выключить звук'"
                  :title="isMuted ? 'Включить звук' : 'Выключить звук'">
                  <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
                </button>
                <input type="range" min="0" max="100" v-model="volume" @input="updateVolume"
                  class="w-20 accent-amber-500" aria-label="Громкость" />
              </div>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="hidden md:block">
            <div class="flex items-center gap-6">
              <!-- Track Info -->
              <div class="flex items-center flex-1 min-w-0">
                <div v-if="currentTrack.coverImage" class="w-12 h-12 mr-4">
                  <img :src="currentTrack.coverImage" :alt="currentTrack.title"
                    class="w-full h-full object-cover rounded" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-medium text-slate-900 dark:text-white truncate">
                    {{ currentTrack.title }}
                  </h3>
                  <p class="text-sm text-slate-600 dark:text-gray-300 truncate">
                    {{ currentTrack.description }}
                  </p>
                </div>
              </div>

              <!-- Player Controls -->
              <div class="flex-1 max-w-2xl">
                <div class="flex flex-col">
                  <div class="flex items-center justify-center space-x-6 mb-2">
                    <button @click="playPreviousTrack" class="text-slate-500 hover:text-slate-700 dark:hover:text-gray-200 transition-colors"
                      aria-label="Предыдущий трек" title="Предыдущий трек">
                      <i class="fas fa-step-backward"></i>
                    </button>
                    <button @click="togglePlay"
                      class="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                      :aria-label="isPlaying ? 'Поставить на паузу' : 'Воспроизвести'"
                      :title="isPlaying ? 'Пауза' : 'Воспроизвести'">
                      <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                    </button>
                    <button @click="playNextTrack" class="text-slate-500 hover:text-slate-700 dark:hover:text-gray-200 transition-colors"
                      aria-label="Следующий трек" title="Следующий трек">
                      <i class="fas fa-step-forward"></i>
                    </button>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="text-sm text-slate-500 dark:text-gray-400">{{
                      formatTime(currentTime)
                    }}</span>
                    <div class="flex-1 relative">
                      <div class="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-1 cursor-pointer" @click="seek" ref="progressBar">
                        <div class="absolute top-0 left-0 h-1 bg-amber-500 rounded-full"
                          :style="{ width: `${progress}%` }"></div>
                      </div>
                    </div>
                    <span class="text-sm text-slate-500 dark:text-gray-400">{{
                      formatTime(duration)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Volume Controls -->
              <div class="flex items-center space-x-4">
                <button @click="toggleMute" class="text-slate-500 hover:text-slate-700 dark:hover:text-gray-200"
                  :aria-label="isMuted ? 'Включить звук' : 'Выключить звук'"
                  :title="isMuted ? 'Включить звук' : 'Выключить звук'">
                  <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
                </button>
                <input type="range" min="0" max="100" v-model="volume" @input="updateVolume"
                  class="w-24 accent-amber-500" aria-label="Громкость" />
                <button @click="closePlayer" class="ml-4 text-slate-500 hover:text-slate-700 dark:hover:text-gray-200"
                  aria-label="Закрыть плеер" title="Закрыть">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="relative min-h-screen overflow-hidden bg-slate-100 text-slate-950 dark:bg-[#120f0d] dark:text-stone-100">
      <div v-if="currentTrack && currentTrack.coverImage"
        class="absolute inset-0 scale-110 bg-cover bg-center opacity-20 blur-2xl dark:opacity-25"
        :style="{ backgroundImage: `url(${currentTrack.coverImage})` }"></div>
      <div class="absolute inset-0 bg-slate-100/92 dark:bg-[#120f0d]/92"></div>

      <div class="relative z-10 min-h-screen">
        <header class="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-6">
          <button type="button" @click="toggleListeningRoom"
            class="inline-flex items-center gap-3 text-sm text-slate-700 transition-colors hover:text-slate-950 dark:text-stone-300 dark:hover:text-stone-50"
            aria-label="Вернуться к музыкальной коллекции" title="Музыкальная коллекция">
            <i class="fas fa-arrow-left"></i>
            <span>Музыкальная коллекция</span>
          </button>
          <button type="button" @click="toggleListeningRoom"
            class="inline-flex items-center gap-3 rounded-full border border-slate-900/15 bg-white/60 px-5 py-3 text-sm font-medium text-slate-900 backdrop-blur-sm transition-colors hover:bg-white/85 dark:border-amber-100/25 dark:bg-stone-100/5 dark:text-stone-100 dark:hover:bg-stone-100/10"
            aria-label="Выйти из комнаты звучания" title="Выйти из комнаты звучания">
            <i class="fas fa-door-open"></i>
            <span>Выйти из комнаты звучания</span>
          </button>
        </header>

        <main class="container mx-auto px-6 pb-16 pt-6 md:pt-10">
          <section v-if="currentTrack"
            class="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(280px,420px)_1fr]">
            <div class="mx-auto w-full max-w-sm">
              <div v-if="currentTrack.coverImage"
                class="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/70 p-3 shadow-2xl shadow-slate-900/15 dark:border-amber-100/20 dark:bg-stone-900/60 dark:shadow-black/40">
                <img :src="currentTrack.coverImage" :alt="currentTrack.title"
                  class="aspect-square w-full rounded-xl object-cover" />
              </div>
              <div v-else
                class="flex aspect-square w-full items-center justify-center rounded-2xl border border-slate-900/10 bg-white/70 shadow-2xl shadow-slate-900/15 dark:border-amber-100/20 dark:bg-stone-900/60 dark:shadow-black/30">
                <div class="flex h-28 w-28 items-center justify-center rounded-full border border-slate-900/15 text-4xl text-slate-700 dark:border-amber-100/25 dark:text-amber-100/70">
                  <i class="fas fa-music"></i>
                </div>
              </div>
            </div>

            <div class="max-w-2xl">
              <p class="mb-4 text-sm uppercase text-amber-700 dark:text-amber-100/60">
                Комната звучания
              </p>
              <h1 class="mb-5 font-serif text-4xl leading-tight text-slate-950 dark:text-stone-50 md:text-6xl">
                {{ currentTrack.title }}
              </h1>
              <p class="mb-10 text-base leading-8 text-slate-700 dark:text-stone-300 md:text-lg">
                {{ currentTrack.description }}
              </p>

              <div class="mb-8 flex items-center gap-5">
                <button type="button" @click="playPreviousTrack"
                  class="flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/15 text-slate-700 transition-colors hover:border-slate-900/35 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 dark:border-amber-100/20 dark:text-stone-300 dark:hover:border-amber-100/40 dark:hover:text-stone-50"
                  :disabled="currentTrackIndex <= 0" aria-label="Предыдущий трек" title="Предыдущий трек">
                  <i class="fas fa-step-backward"></i>
                </button>
                <button type="button" @click="togglePlay"
                  class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-xl text-stone-50 shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-800 dark:bg-amber-100 dark:text-stone-950 dark:shadow-black/20 dark:hover:bg-amber-50"
                  :aria-label="isPlaying ? 'Поставить на паузу' : 'Воспроизвести'"
                  :title="isPlaying ? 'Пауза' : 'Воспроизвести'">
                  <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                </button>
                <button type="button" @click="playNextTrack"
                  class="flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/15 text-slate-700 transition-colors hover:border-slate-900/35 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40 dark:border-amber-100/20 dark:text-stone-300 dark:hover:border-amber-100/40 dark:hover:text-stone-50"
                  :disabled="currentTrackIndex >= tracks.length - 1" aria-label="Следующий трек" title="Следующий трек">
                  <i class="fas fa-step-forward"></i>
                </button>
              </div>

              <div class="mb-8">
                <div class="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-stone-400">
                  <span>{{ formatTime(currentTime) }}</span>
                  <span>{{ formatTime(duration) }}</span>
                </div>
                <div class="h-2 cursor-pointer rounded-full bg-slate-300 dark:bg-stone-700/70" @click="seek" ref="progressBar"
                  aria-label="Перемотка трека" title="Перемотка">
                  <div class="h-2 rounded-full bg-slate-950 transition-[width] dark:bg-amber-100" :style="{ width: `${progress}%` }"></div>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-5">
                <div class="flex items-center gap-3 rounded-full border border-slate-900/10 bg-white/65 px-4 py-3 dark:border-amber-100/15 dark:bg-stone-900/40">
                  <button type="button" @click="toggleMute"
                    class="text-slate-700 transition-colors hover:text-slate-950 dark:text-stone-300 dark:hover:text-stone-50"
                    :aria-label="isMuted ? 'Включить звук' : 'Выключить звук'"
                    :title="isMuted ? 'Включить звук' : 'Выключить звук'">
                    <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
                  </button>
                  <input type="range" min="0" max="100" v-model="volume" @input="updateVolume"
                    class="w-28 accent-slate-950 dark:accent-amber-100" aria-label="Громкость" />
                </div>
                <button type="button" @click="downloadTrack(currentTrack)"
                  class="inline-flex items-center gap-3 rounded-full border border-slate-900/10 bg-white/45 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-900/30 hover:text-slate-950 dark:border-amber-100/15 dark:bg-transparent dark:text-stone-300 dark:hover:border-amber-100/35 dark:hover:text-stone-50"
                  aria-label="Скачать трек" title="Скачать трек">
                  <i class="fas fa-download"></i>
                  <span>Скачать</span>
                </button>
              </div>
            </div>
          </section>

          <section v-else class="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center text-center">
            <div class="rounded-2xl border border-slate-900/10 bg-white/65 px-8 py-10 dark:border-amber-100/15 dark:bg-stone-900/45">
              <p class="font-serif text-3xl text-slate-950 dark:text-stone-100">Комната звучания</p>
              <p class="mt-4 text-slate-600 dark:text-stone-400">Треки появятся здесь, когда коллекция будет готова.</p>
            </div>
          </section>

          <section v-if="listeningRoomTracks.length > 0" class="mx-auto mt-14 max-w-6xl border-t border-slate-900/10 pt-8 dark:border-amber-100/15">
            <div class="mb-5 flex items-center justify-between gap-4">
              <h2 class="font-serif text-2xl text-slate-950 dark:text-stone-100">Другие треки</h2>
            </div>
            <div class="grid gap-3 md:grid-cols-2">
              <button v-for="track in listeningRoomTracks" :key="track._id" type="button" @click="playTrack(track)"
                class="group flex items-center gap-4 rounded-xl border p-3 text-left transition-colors"
                :class="currentTrack && track._id === currentTrack._id
                  ? 'border-slate-900/25 bg-white/80 text-slate-950 dark:border-amber-100/35 dark:bg-amber-100/10 dark:text-stone-50'
                  : 'border-slate-900/10 bg-white/50 text-slate-700 hover:border-slate-900/25 hover:bg-white/80 dark:border-amber-100/10 dark:bg-stone-900/35 dark:text-stone-300 dark:hover:border-amber-100/25 dark:hover:bg-stone-900/55'">
                <span class="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-200 dark:bg-stone-800">
                  <img v-if="track.coverImage" :src="track.coverImage" :alt="track.title"
                    class="h-full w-full object-cover" />
                  <i v-else class="fas fa-music text-slate-600 dark:text-amber-100/60"></i>
                </span>
                <span class="min-w-0">
                  <span class="block truncate font-serif text-lg">{{ track.title }}</span>
                  <span class="mt-1 block truncate text-sm text-slate-500 dark:text-stone-400">{{ track.description }}</span>
                </span>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>

    <audio v-if="currentTrack" ref="audioPlayer" class="hidden" :src="currentTrackUrl" preload="metadata"
      @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @ended="onEnded"></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from "vue";
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
const isListeningRoom = ref(false);

const { $axios } = useNuxtApp();
const LISTENING_ROOM_STORAGE_KEY = "poetryMusicListeningRoom";
const listeningRoomTracks = computed(() =>
  tracks.value.filter(
    (track) => !currentTrack.value || track._id !== currentTrack.value._id
  )
);

// SEO: Page title and meta
useHead({
  title: 'Музыкальная коллекция - Солнечные сказки',
  meta: [
    {
      name: 'description',
      content: 'Слушайте музыкальные композиции Керен Виленской. Коллекция авторской музыки и песен.'
    }
  ]
});


const selectTrack = (track) => {
  if (!track) return;

  const fullUrl = `${$axios.defaults.baseURL}/stream-audio?trackId=${track.fileId}`;

  currentTime.value = 0;
  duration.value = 0;
  progress.value = 0;
  currentTrackUrl.value = fullUrl;
  currentTrackIndex.value = tracks.value.findIndex((t) => t._id === track._id);
  currentTrack.value = track;
};

const prepareListeningRoomTrack = () => {
  if (!currentTrack.value && tracks.value.length > 0) {
    selectTrack(tracks.value[0]);
  }
};

const saveListeningRoomPreference = () => {
  if (!process.client) return;

  try {
    localStorage.setItem(
      LISTENING_ROOM_STORAGE_KEY,
      isListeningRoom.value ? "true" : "false"
    );
  } catch (error) {
    console.warn("Unable to save listening room preference:", error);
  }
};

const restoreListeningRoomPreference = () => {
  if (!process.client) return;

  try {
    isListeningRoom.value =
      localStorage.getItem(LISTENING_ROOM_STORAGE_KEY) === "true";
  } catch (error) {
    console.warn("Unable to restore listening room preference:", error);
  }
};

const toggleListeningRoom = () => {
  isListeningRoom.value = !isListeningRoom.value;

  if (isListeningRoom.value) {
    prepareListeningRoomTrack();
  }

  saveListeningRoomPreference();
};

// Fetch tracks on mount
onMounted(async () => {
  restoreListeningRoomPreference();

  tracks.value = await fetchTracks();
  if (tracks.value.length > 0 && tracks.value[0].coverImage) {
    heroImage.value = tracks.value[0].coverImage;
  }

  if (isListeningRoom.value) {
    prepareListeningRoomTrack();
  }
});

// Audio Control Functions
const playTrack = async (track) => {
  try {
    selectTrack(track);

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
  const progressElement = event.currentTarget || progressBar.value;

  if (progressElement && audioPlayer.value && duration.value) {
    const rect = progressElement.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    audioPlayer.value.currentTime = pos * duration.value;
  }
};

// Event Handlers
const onTimeUpdate = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
    progress.value = duration.value
      ? (currentTime.value / duration.value) * 100
      : 0;
  }
};

const onLoadedMetadata = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration || 0;
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
  duration.value = 0;
  progress.value = 0;
  currentTrackIndex.value = -1;
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
