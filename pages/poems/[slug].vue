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

    <!-- Enhanced Main Content -->
    <main class="container mx-auto px-6 py-16">
      <div class="max-w-3xl mx-auto">
        <!-- Poem Content Section -->
        <article class="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <div class="prose prose-lg prose-slate mx-auto">
            <div
              v-if="post?.body"
              v-for="(block, index) in post.body"
              :key="index"
              class="whitespace-pre-wrap font-serif"
              v-html="formatPoem(block.children[0].text)"
            ></div>
          </div>
        </article>

        <!-- Engagement Section -->
        <div class="bg-white rounded-2xl shadow-sm p-6 mb-12">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button
                class="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-amber-50 transition-colors"
                :class="{ 'text-amber-600': isLiked }"
                @click="toggleLike"
              >
                <i class="far fa-heart" :class="{ fas: isLiked }"></i>
                <span>{{ likeCount }}</span>
              </button>
              <button
                class="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-amber-50 transition-colors"
              >
                <i class="far fa-comment"></i>
                <span>{{ comments.length }}</span>
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <button
                class="p-2.5 rounded-full hover:bg-amber-50 transition-colors"
                @click="toggleBookmark"
                :class="{ 'text-amber-600': isBookmarked }"
              >
                <i class="far fa-bookmark" :class="{ fas: isBookmarked }"></i>
              </button>

              <!-- Share Button and Dropdown Container -->
              <div class="relative">
                <button
                  class="p-2.5 rounded-full hover:bg-amber-50 transition-colors"
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
        </div>

        <!-- Comments Section -->
        <div class="bg-white rounded-2xl shadow-sm p-6">
          <h3 class="text-xl font-semibold text-slate-900 mb-6">Комментарии</h3>

          <!-- New Comment Form -->
          <div class="mb-8">
            <div class="flex items-start space-x-4">
              <img
                :src="currentUser?.avatar || '/api/placeholder/40/40'"
                alt="User Avatar"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <textarea
                  v-model="newComment"
                  placeholder="Поделитесь своими мыслями..."
                  class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  rows="3"
                ></textarea>
                <div class="mt-3 flex justify-end">
                  <button
                    @click="submitComment"
                    class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    :disabled="!newComment.trim()"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-6">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="flex space-x-4"
            >
              <img
                :src="comment.avatar || '/api/placeholder/40/40'"
                alt="Comment Avatar"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex-1">
                <div class="bg-slate-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-slate-900">
                      {{ comment.author }}
                    </h4>
                    <span class="text-sm text-slate-500">{{
                      formatCommentDate(comment.date)
                    }}</span>
                  </div>
                  <p class="text-slate-700">{{ comment.content }}</p>
                  <div class="mt-3 flex items-center space-x-4">
                    <button
                      @click="toggleCommentLike(comment.id)"
                      class="text-sm text-slate-500 hover:text-amber-600 transition-colors"
                      :class="{ 'text-amber-600': comment.isLiked }"
                    >
                      <i
                        class="far fa-heart"
                        :class="{ fas: comment.isLiked }"
                      ></i>
                      <span class="ml-1">{{ comment.likes }}</span>
                    </button>
                    <button
                      @click="replyToComment(comment.id)"
                      class="text-sm text-slate-500 hover:text-amber-600 transition-colors"
                    >
                      <i class="fas fa-reply"></i>
                      <span class="ml-1">Ответить</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import { useRoute } from "vue-router";
import { useNuxtApp } from "#app";

const { $axios } = useNuxtApp();
const route = useRoute();
const slug = route.params.slug; // Get the poem's slug from the route

// Props & Data
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug,
});
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

// New state for comments
interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface User {
  name: string;
  avatar?: string;
}

const comments = ref<Comment[]>([]);
const newComment = ref("");
const isLiked = ref(false);
const likeCount = ref(0);
const currentUser = ref<User | null>(null);

// Methods
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatCommentDate = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid Date";

  return parsedDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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

// Fetch likes from the backend
const fetchLikes = async () => {
  try {
    const response = await $axios.get(`/api/likes/${slug}`);
    isLiked.value = response.data.isLiked;
    likeCount.value = response.data.count;
  } catch (error) {
    console.error("Failed to fetch likes:", error);
  }
};

// Toggle like
const toggleLike = async () => {
  try {
    const response = await $axios.post(`/api/likes/${slug}/toggle`);
    isLiked.value = response.data.isLiked;
    likeCount.value = response.data.count;
  } catch (error) {
    console.error("Failed to toggle like:", error);
  }
};

// Fetch comments from the backend
const fetchComments = async () => {
  try {
    const response = await $axios.get(`/api/comments/${slug}`);
    comments.value = response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};

// Submit a new comment
const submitComment = async () => {
  const trimmedComment = newComment.value.trim();
  if (!trimmedComment) return;

  try {
    const response = await $axios.post(`/api/comments/${slug}`, {
      author: currentUser.value?.name || "Гость",
      avatar: currentUser.value?.avatar,
      content: trimmedComment,
    });

    // Add the new comment to the list
    comments.value.unshift(response.data);
    newComment.value = "";
  } catch (error) {
    console.error("Failed to submit comment:", error);
  }
};

// Like a comment
const toggleCommentLike = async (commentId: number) => {
  try {
    const response = await $axios.post(
      `/api/comments/${slug}/${commentId}/like`
    );
    const updatedComment = response.data;

    // Update the comment in the list
    const index = comments.value.findIndex((c) => c.id === commentId);
    if (index !== -1) {
      comments.value[index] = updatedComment;
    }
  } catch (error) {
    console.error("Failed to like comment:", error);
  }
};

const replyToComment = (commentId: number) => {
  console.log("Reply to comment:", commentId);
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

  // Simulate fetching user data
  currentUser.value = {
    name: "Гость",
    avatar: "/api/placeholder/40/40",
  };

  // Fetch initial data
  fetchLikes();
  fetchComments();
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
/* Add smooth transitions for interactive elements */

/* Add hover effects for comment interactions */
.hover-effect {
  @apply hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200;
}
</style>
