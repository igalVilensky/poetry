<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

    <!-- Hero Section with Dynamic Parallax -->
    <header class="relative h-[50vh] sm:h-[40vh] overflow-hidden" @mousemove="handleParallax" ref="heroSection">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center transform transition-transform duration-200" :style="{
        backgroundImage: `url(${backgroundImage})`,
        transform: `scale(1.1) translate(${parallaxX}px, ${parallaxY}px)`,
      }"></div>
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-amber-900/90"></div>

      <!-- Content -->
      <div class="relative container mx-auto px-6 h-full flex flex-col justify-center">
        <nuxt-link to="/poems"
          class="group inline-flex items-center text-amber-100 mb-8 hover:text-amber-200 transition-all w-fit">
          <div class="flex items-center space-x-2 relative">
            <i class="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
            <span class="text-sm font-medium">Вернуться к списку</span>
          </div>
        </nuxt-link>

        <div class="space-y-6">
          <h1 class="text-5xl md:text-6xl font-serif text-white leading-tight max-w-4xl"
            :class="{ 'opacity-0 translate-y-4': !post }" :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }">
            {{ post?.title }}
          </h1>

          <!-- Author Name -->
          <div class="text-xl text-amber-100 font-medium" :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, delay: 100 }">
            {{ post?.author }}
          </div>

          <div class="flex flex-wrap items-center gap-4 text-amber-100" :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, delay: 200 }">
            <span class="flex items-center space-x-2">
              <i class="far fa-calendar"></i>
              <time :datetime="post?.publishedAt">
                {{ formatDate(post?.publishedAt) }}
              </time>
            </span>
            <div v-if="post?.category"
              class="px-4 py-1.5 text-sm font-medium rounded-full bg-amber-500/20 text-amber-100 backdrop-blur-sm">
              {{ post.category }}
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="absolute bottom-0 left-0 h-1 bg-amber-500/30 backdrop-blur-sm"
        :style="{ width: `${readingProgress}%` }"></div>
    </header>

    <!-- Enhanced Main Content -->
    <main class="container mx-auto px-6 py-16">
      <div class="max-w-3xl mx-auto">
        <!-- Poem Content Section -->
        <article
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 p-8 mb-12 transition-all duration-300 hover:shadow-2xl">
          <div class="prose prose-lg prose-slate dark:prose-invert mx-auto">
            <div v-if="post?.body" v-for="(block, index) in post.body" :key="index"
              class="whitespace-pre-wrap font-serif text-slate-700 dark:text-gray-100"
              v-html="formatPoem(block.children[0].text)"></div>
          </div>
        </article>

        <!-- Engagement Section -->
        <div
          class="rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 p-6 mb-12 bg-white dark:bg-gray-800 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <!-- Like Button -->
              <button
                class="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-white hover:bg-amber-200 hover:text-amber-600 dark:hover:bg-amber-300 dark:hover:text-black"
                @click="toggleLike">
                <i class="far fa-heart" :class="{ fas: isLiked }"></i>
                <span>{{ likeCount }}</span>
              </button>

              <!-- Comment Button -->
              <button
                class="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-white hover:bg-amber-200 hover:text-amber-600 dark:hover:bg-amber-300 dark:hover:text-black">
                <i class="far fa-comment"></i>
                <span>{{ comments.length }}</span>
              </button>
            </div>

            <div class="flex items-center space-x-2">
              <!-- Bookmark Button -->
              <button
                class="p-2.5 rounded-full transition-colors focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-white hover:bg-amber-200 hover:text-amber-600 dark:hover:bg-amber-300 dark:hover:text-black"
                @click="toggleBookmark">
                <i class="far fa-bookmark" :class="{ fas: isBookmarked }"></i>
              </button>

              <!-- Share Button -->
              <div class="relative">
                <button
                  class="p-2.5 rounded-full transition-colors focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-white hover:bg-amber-200 hover:text-amber-600 dark:hover:bg-amber-300 dark:hover:text-black"
                  @click="toggleShare">
                  <i class="fas fa-share-alt"></i>
                </button>

                <div v-if="isShareOpen" v-click-outside="closeShare"
                  class="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 z-10 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600">
                  <button v-for="platform in sharePlatforms" :key="platform.name" @click="shareOn(platform.name)"
                    class="w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors text-slate-700 dark:text-white hover:bg-amber-200 hover:text-amber-600 dark:hover:bg-amber-300 dark:hover:text-black">
                    <i :class="platform.icon"></i>
                    <span>{{ platform.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200 dark:border-gray-700 p-6 transition-all duration-300">
          <h3 class="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
            Комментарии
          </h3>

          <!-- New Comment Form -->
          <div class="mb-8">
            <div class="flex items-start space-x-4">
              <img
                src="https://banner2.cleanpng.com/20190702/tl/kisspng-computer-icons-portable-network-graphics-avatar-tr-clip-directory-professional-transparent-amp-png-1713882914216.webp"
                alt="User Avatar" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <textarea v-model="newComment" placeholder="Поделитесь своими мыслями..."
                  class="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-colors duration-300"
                  rows="3"></textarea>
                <div class="mt-3 flex justify-end">
                  <button @click="submitComment"
                    class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 transition-colors"
                    :disabled="!newComment.trim()">
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-6">
            <div v-for="comment in comments" :key="comment.id" class="flex space-x-4">
              <img
                src="https://banner2.cleanpng.com/20190702/tl/kisspng-computer-icons-portable-network-graphics-avatar-tr-clip-directory-professional-transparent-amp-png-1713882914216.webp"
                alt="Comment Avatar" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="bg-slate-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-slate-900 dark:text-white">
                      {{ comment.author }}
                    </h4>
                    <span class="text-sm text-slate-500 dark:text-gray-400">{{
                      formatCommentDate(comment.date)
                      }}</span>
                  </div>
                  <p class="text-slate-700 dark:text-gray-300">{{ comment.content }}</p>
                  <div class="mt-3 flex items-center space-x-4">
                    <button @click="toggleCommentLike(comment.id)"
                      class="text-sm text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 focus:ring-2 focus:ring-amber-500 transition-colors"
                      :class="{ 'text-amber-600 dark:text-amber-400': comment.isLiked }">
                      <i class="far fa-heart" :class="{ fas: comment.isLiked }"></i>
                      <span class="ml-1">{{ comment.likes }}</span>
                    </button>
                    <button @click="replyToComment(comment.id)"
                      class="text-sm text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 focus:ring-2 focus:ring-amber-500 transition-colors">
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
import { v4 as uuidv4 } from "uuid"; // For generating session IDs

const { $axios } = useNuxtApp();
const route = useRoute();
const slug = route.params.slug; // Get the poem's slug from the route

// Props & Data
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
  slug,
});
const { projectId, dataset } = useSanity().client.config();

// SEO: Dynamic page title based on poem
useHead({
  title: post.value?.title ? `${post.value.title} - Солнечные сказки` : 'Стихотворение - Солнечные сказки',
  meta: [
    {
      name: 'description',
      content: post.value?.body?.[0]?.children?.[0]?.text
        ? post.value.body[0].children[0].text.slice(0, 155) + '...'
        : 'Читайте стихотворение Керен Виленской'
    }
  ]
});


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
  id: string; // Change to string to match MongoDB ObjectId
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
const sessionId = ref<string>(""); // Initialize sessionId as an empty string

// Generate or retrieve sessionId (client-side only)
onMounted(() => {
  if (process.client) {
    sessionId.value = localStorage.getItem("sessionId") || uuidv4();
    localStorage.setItem("sessionId", sessionId.value);
  }

  // Simulate fetching user data
  currentUser.value = {
    name: "Гость",
    avatar: "/api/placeholder/40/40",
  };

  // Fetch initial data
  fetchLikes();
  fetchComments();

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
});

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
    const response = await $axios.get(`/api/likes/${slug}`, {
      params: { sessionId: sessionId.value },
    });
    isLiked.value = response.data.isLiked;
    likeCount.value = response.data.count;
  } catch (error) {
    console.error("Failed to fetch likes:", error);
  }
};

// Fetch comments
const fetchComments = async () => {
  try {
    const response = await $axios.get(`/api/comments/${slug}`); // Pass slug
    comments.value = response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};

// Toggle like
const toggleLike = async () => {
  try {
    const response = await $axios.post(`/api/likes/${slug}/toggle`, {
      // Pass slug
      sessionId: sessionId.value,
    });
    isLiked.value = response.data.isLiked;
    likeCount.value = response.data.count;
  } catch (error) {
    console.error("Failed to toggle like:", error);
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
const toggleCommentLike = async (commentId: string) => {
  try {
    const response = await $axios.post(
      `/api/comments/${slug}/${commentId}/like`,
      { sessionId: sessionId.value }
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

const replyToComment = (commentId: string) => {
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
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Prose styling with dark mode support */
.prose {
  color: rgb(51 65 85);
  font-size: 1.125rem;
  line-height: 1.75rem;
}

:global(.dark) .prose {
  color: rgb(229 231 235);
}

.prose div {
  line-height: 1.625;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(31 41 55);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:global(.dark) .prose h2 {
  color: rgb(229 231 235);
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(31 41 55);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

:global(.dark) .prose h3 {
  color: rgb(229 231 235);
}

.prose p {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  line-height: 1.625;
}

.prose ul {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
}

.prose ol {
  list-style-type: decimal;
  list-style-position: inside;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose a {
  color: rgb(217 119 6);
  text-decoration: underline;
}

.prose a:hover {
  color: rgb(180 83 9);
}

.prose img {
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.prose blockquote {
  border-left: 4px solid rgb(245 158 11);
  padding-left: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgb(75 85 99);
  font-style: italic;
}

:global(.dark) .prose blockquote {
  color: rgb(156 163 175);
}

.prose blockquote p {
  font-style: italic;
  margin-bottom: 0;
}

.prose code {
  background-color: rgb(243 244 246);
  border-radius: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

:global(.dark) .prose code {
  background-color: rgb(55 65 81);
}

.prose pre {
  background-color: rgb(31 41 55);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

/* Add spacing between multi-level lists */
.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
  margin-top: 0.5rem;
  margin-left: 1.5rem;
}

/* Add hover effects for comment interactions */
.hover-effect {
  transition: background-color 200ms, color 200ms;
}

.hover-effect:hover {
  background-color: rgb(254 252 232);
  color: rgb(217 119 6);
}
</style>
