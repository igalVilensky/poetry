<template>
  <div class="min-h-screen">
    <!-- Hero Section with Dynamic Parallax -->
    <header
      class="relative h-[50vh] sm:h-[40vh] overflow-hidden"
      @mousemove="handleParallax"
      ref="heroSection"
    >
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center transform transition-transform duration-200"
        :style="{
          backgroundImage: `url(${backgroundImage})`,
          transform: `scale(1.1) translate(${parallaxX}px, ${parallaxY}px)`,
        }"
      ></div>
      <!-- Overlay Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-amber-900/90"
      ></div>

      <!-- Decorative Elements -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 mix-blend-overlay opacity-40">
          <div
            class="h-full w-full bg-[radial-gradient(circle_600px_at_50%_50%,rgba(251,191,36,0.1),transparent)]"
          ></div>
        </div>
        <div class="absolute inset-0 mix-blend-multiply">
          <div
            class="h-full w-full bg-gradient-to-b from-transparent to-slate-900/20"
          ></div>
        </div>
      </div>

      <!-- Content -->
      <div
        class="relative container mx-auto px-6 h-full flex flex-col justify-center"
      >
        <nuxt-link
          to="/poems"
          class="group inline-flex items-center text-amber-100 mb-8 hover:text-amber-200 transition-all w-fit"
        >
          <div class="flex items-center space-x-2 relative">
            <i
              class="fas fa-arrow-left transition-transform group-hover:-translate-x-1"
            ></i>
            <span class="text-sm font-medium">Вернуться к списку</span>
          </div>
        </nuxt-link>

        <div class="space-y-6">
          <h1
            class="text-5xl md:text-6xl font-serif text-white leading-tight max-w-4xl"
            :class="{ 'opacity-0 translate-y-4': !post }"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            {{ post?.title }}
          </h1>

          <!-- Author Name -->
          <div
            class="text-xl text-amber-100 font-medium"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, delay: 100 }"
          >
            {{ post?.author }}
          </div>

          <div
            class="flex flex-wrap items-center gap-4 text-amber-100"
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, delay: 200 }"
          >
            <span class="flex items-center space-x-2">
              <i class="far fa-calendar"></i>
              <time :datetime="post?.publishedAt">
                {{ formatDate(post?.publishedAt) }}
              </time>
            </span>
            <div
              v-if="post?.category"
              class="px-4 py-1.5 text-sm font-medium rounded-full bg-amber-500/20 text-amber-100 backdrop-blur-sm"
            >
              {{ post.category }}
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div
        class="absolute bottom-0 left-0 h-1 bg-amber-500/30 backdrop-blur-sm"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-16">
      <div class="max-w-3xl mx-auto">
        <div v-if="post?.image" class="mb-8">
          <img
            :src="urlFor(post?.image)?.width(300).height(150).url()"
            :alt="post?.title || 'Poem Image'"
            class="w-full rounded-lg shadow-lg"
          />
        </div>
        <!-- Actions Bar -->
        <div
          class="flex items-center justify-between mb-12 border-b border-slate-200"
        >
          <!-- Reading Time -->
          <div class="text-slate-500 text-sm">
            <i class="far fa-clock mr-2"></i>
            {{ post.readtime }} чтения
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2">
            <button
              class="p-2.5 rounded-full hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-all relative"
              :class="{ 'bg-amber-50': isBookmarked }"
              @click="toggleBookmark"
            >
              <i
                class="far fa-bookmark"
                :class="{ 'fas fa-bookmark text-amber-600': isBookmarked }"
              ></i>
            </button>

            <div class="relative">
              <button
                class="p-2.5 rounded-full hover:bg-amber-50 text-slate-600 hover:text-amber-600 transition-all"
                @click="toggleShare"
              >
                <i class="fas fa-share-alt"></i>
              </button>

              <!-- Share Menu -->
              <div
                v-if="isShareOpen"
                v-click-outside="closeShare"
                class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10"
                :initial="{ opacity: 0, scale: 0.95 }"
                :enter="{ opacity: 1, scale: 1 }"
              >
                <button
                  v-for="platform in sharePlatforms"
                  :key="platform.name"
                  @click="shareOn(platform.name)"
                  class="w-full px-4 py-2 text-left hover:bg-amber-50 text-slate-700 hover:text-amber-600 transition-colors flex items-center space-x-3"
                >
                  <i :class="platform.icon"></i>
                  <span>{{ platform.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Poem Content -->
        <article class="prose prose-lg prose-slate mx-auto">
          <div
            v-if="post?.body"
            v-for="(block, index) in post.body"
            :key="index"
            class="whitespace-pre-wrap font-serif"
            v-html="formatPoem(block.children[0].text)"
          ></div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import backgroundImage from "~/assets/images/background.jpg";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Props & Data
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const { params } = useRoute();
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, params);
const { projectId, dataset } = useSanity().client.config();

// State
const heroSection = ref<HTMLElement | null>(null);
const isShareOpen = ref(false);
const isBookmarked = ref(false);
const readingProgress = ref(0);
const parallaxX = ref(0);
const parallaxY = ref(0);

// Share platforms configuration
const sharePlatforms = [
  { name: "twitter", label: "Twitter", icon: "fab fa-twitter" },
  { name: "facebook", label: "Facebook", icon: "fab fa-facebook" },
  { name: "telegram", label: "Telegram", icon: "fab fa-telegram" },
  { name: "copy", label: "Копировать ссылку", icon: "far fa-copy" },
];

// Methods
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const handleParallax = (e: MouseEvent) => {
  if (!heroSection.value) return;
  const { width, height } = heroSection.value.getBoundingClientRect();
  const offsetX = (e.clientX / width - 0.5) * 20;
  const offsetY = (e.clientY / height - 0.5) * 20;

  parallaxX.value = offsetX;
  parallaxY.value = offsetY;
};

const toggleShare = () => {
  isShareOpen.value = !isShareOpen.value;
};

const closeShare = () => {
  isShareOpen.value = false;
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
};

const shareOn = (platform: string) => {
  const url = window.location.href;
  const title = post.value?.title;

  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
  };

  if (platform === "copy") {
    navigator.clipboard.writeText(url);
    // You might want to add a toast notification here
    return;
  }

  window.open(shareUrls[platform], "_blank");
};

const formatPoem = (text: string) => {
  return text
    .split("\n\n")
    .map(
      (stanza) => `<div class="mb-8">${stanza.split("\n").join("<br>")}</div>`
    )
    .join("");
};

// Scroll handling
const handleScroll = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;

  readingProgress.value = (scrolled / documentHeight) * 100;
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.prose {
  @apply text-slate-700 text-lg;
}

.prose div {
  @apply leading-relaxed;
}

.prose h2 {
  @apply text-2xl sm:text-3xl font-semibold text-gray-800 mt-8 mb-4;
}

.prose h3 {
  @apply text-2xl font-medium text-gray-800 mt-6 mb-3;
}

.prose p {
  @apply text-lg mb-4 leading-relaxed;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose li {
  @apply mb-2;
}

.prose a {
  @apply text-amber-600 hover:text-amber-700 underline;
}

.prose img {
  @apply rounded-lg my-6;
}

.prose blockquote {
  @apply border-l-4 border-amber-500 pl-4 py-1 my-6 text-gray-600 italic;
}

.prose blockquote p {
  @apply italic mb-0;
}

.prose code {
  @apply bg-gray-100 rounded px-1;
}

.prose pre {
  @apply bg-gray-800 text-white p-4 rounded-lg my-6 overflow-x-auto;
}

/* Add spacing between multi-level lists */
.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
  @apply mt-2 ml-6;
}
</style>
