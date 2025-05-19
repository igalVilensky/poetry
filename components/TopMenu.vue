<template>
  <header
    class="bg-gradient-to-b from-gray-900 to-gray-900/95 text-white border-b border-amber-800/20 shadow-lg"
  >
    <div class="container mx-auto flex items-center justify-between py-4 px-6">
      <!-- Logo -->
      <div class="text-2xl font-serif">
        <NuxtLink
          to="/"
          class="hover:text-amber-400 transition-colors duration-300 relative group"
        >
          Солнечные сказки
          <span
            class="absolute -bottom-1 left-0 w-full h-px bg-amber-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          ></span>
        </NuxtLink>
      </div>

      <!-- Hamburger Icon (Mobile) -->
      <button
        class="block md:hidden text-xl hover:text-amber-400 transition-colors duration-300"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
      >
        <i class="fas" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>

      <!-- Navigation Links -->
      <nav
        :class="[
          'absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900/95 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent p-4 md:p-0 md:flex space-y-4 md:space-y-0 md:space-x-6 z-50 transform transition-all duration-300 ease-in-out shadow-lg md:shadow-none',
          menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-5 pointer-events-none',
          'md:opacity-100 md:translate-y-0 md:pointer-events-auto',
        ]"
      >
        <!-- Links -->
        <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          :to="link.href"
          class="text-lg hover:text-amber-400 block md:inline transition-colors duration-300 relative group"
          exact-active-class="text-amber-400"
          @click="closeMenu"
        >
          {{ link.text }}
          <span
            :class="[
              'absolute -bottom-1 left-0 w-full h-px bg-amber-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 hidden md:block',
              { 'scale-x-100': $route.path === link.href },
            ]"
          ></span>
        </NuxtLink>

        <!-- Search Bar for Mobile -->
        <div class="block md:hidden">
          <div
            class="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2 focus-within:ring-1 focus-within:ring-amber-500/50 transition duration-300"
            :class="{ 'ring-1 ring-amber-500/50': searchQuery }"
          >
            <i class="fas fa-search text-gray-400"></i>
            <input
              type="text"
              placeholder="Поиск..."
              class="w-full bg-transparent placeholder-gray-400 focus:outline-none text-white"
              v-model="searchQuery"
              @input="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              aria-label="Clear search"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <!-- Mobile Search Results -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="searchQuery && searchResults.length === 0"
              class="mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 p-4 text-center"
            >
              <i class="fas fa-search text-amber-400 text-2xl mb-2"></i>
              <p class="text-gray-400 max-w-full">
                Ничего не найдено по запросу "<span
                  class="font-medium text-amber-400 truncate inline-block max-w-[80%]"
                  >{{ searchQuery }}</span
                >"
              </p>
              <p class="text-sm text-gray-500 mt-1">
                Попробуйте изменить запрос.
              </p>
            </div>
            <div
              v-else-if="searchResults.length > 0"
              class="mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50"
            >
              <div class="max-h-64 overflow-y-auto">
                <NuxtLink
                  v-for="poem in searchResults"
                  :key="poem.id"
                  :to="`/poems/${poem.slug.current}`"
                  @click="handleResultClick"
                  class="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors duration-300 group"
                >
                  <div class="flex-1">
                    <div
                      class="font-medium group-hover:text-amber-400 transition-colors duration-300"
                    >
                      {{ poem.title }}
                    </div>
                    <div
                      v-if="poem.excerpt"
                      class="text-sm text-gray-400 mt-1 line-clamp-1"
                    >
                      {{ poem.excerpt }}
                    </div>
                  </div>
                  <i
                    class="fas fa-chevron-right text-gray-400 group-hover:text-amber-400 transition-colors duration-300"
                  ></i>
                </NuxtLink>
              </div>
              <div
                class="px-4 py-2 border-t border-gray-700/50 text-sm text-gray-400"
              >
                {{ searchResults.length }} результат(ов)
              </div>
            </div>
          </transition>
        </div>
      </nav>

      <!-- Desktop Search Bar -->
      <div class="hidden md:flex items-center relative">
        <div
          class="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2 focus-within:ring-1 focus-within:ring-amber-500/50 transition duration-300"
          :class="{ 'ring-1 ring-amber-500/50': searchQuery }"
          style="width: 16rem"
        >
          <i class="fas fa-search text-gray-400"></i>
          <input
            type="text"
            placeholder="Поиск..."
            class="bg-transparent placeholder-gray-400 focus:outline-none text-white w-full"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="text-gray-400 hover:text-amber-400 transition-colors duration-300"
            aria-label="Clear search"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <!-- Desktop Search Results -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="searchQuery && searchResults.length === 0"
            class="absolute top-full left-0 w-full mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg z-50 border border-gray-700/50 p-4 text-center"
          >
            <i class="fas fa-search text-amber-400 text-2xl mb-2"></i>
            <p class="text-gray-400 max-w-full">
              Ничего не найдено по запросу "<span
                class="font-medium text-amber-400 truncate inline-block max-w-[80%]"
                >{{ searchQuery }}</span
              >"
            </p>
            <p class="text-sm text-gray-500 mt-1">
              Попробуйте изменить запрос.
            </p>
          </div>
          <div
            v-else-if="searchResults.length > 0"
            class="absolute top-full left-0 w-full mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg z-50 border border-gray-700/50"
          >
            <div class="max-h-64 overflow-y-auto">
              <NuxtLink
                v-for="poem in searchResults"
                :key="poem.id"
                :to="`/poems/${poem.slug.current}`"
                @click="handleResultClick"
                class="flex items-center px-4 py-3 hover:bg-gray-700/50 transition-colors duration-300 group"
              >
                <div class="flex-1">
                  <div
                    class="font-medium group-hover:text-amber-400 transition-colors duration-300"
                  >
                    {{ poem.title }}
                  </div>
                  <div
                    v-if="poem.excerpt"
                    class="text-sm text-gray-400 mt-1 line-clamp-1"
                  >
                    {{ poem.excerpt }}
                  </div>
                </div>
                <i
                  class="fas fa-chevron-right text-gray-400 group-hover:text-amber-400 transition-colors duration-300"
                ></i>
              </NuxtLink>
            </div>
            <div
              class="px-4 py-2 border-t border-gray-700/50 text-sm text-gray-400"
            >
              {{ searchResults.length }} результат(ов)
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { fetchPosts } from "~/api/sanity/posts";

const router = useRouter();
const menuOpen = ref(false);
const searchQuery = ref("");
const searchResults = ref([]);
let searchTimeout = null;

const links = [
  { text: "Главная", href: "/" },
  { text: "Стихи", href: "/poems" },
  { text: "Музыка", href: "/music" },
  { text: "Автор", href: "/author" },
  { text: "Игра", href: "/poem-game" },
];

// Toggle menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Close menu
const closeMenu = () => {
  menuOpen.value = false;
};

// Handle clicks outside the menu
const handleClickOutside = (event) => {
  const menu = document.querySelector("nav"); // Select the menu element
  const hamburger = document.querySelector(
    "button[aria-label='Toggle navigation menu']"
  ); // Select the hamburger button

  if (
    menu &&
    !menu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeMenu();
  }
};

// Add event listener for clicks outside the menu
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Remove event listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleSearch = () => {
  clearTimeout(searchTimeout);

  if (searchQuery.value.length > 2) {
    searchTimeout = setTimeout(async () => {
      const { data: posts } = await fetchPosts();
      searchResults.value = posts.value
        .filter((post) =>
          post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 results
    }, 300); // Debounce search
  } else {
    searchResults.value = [];
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = [];
};

const handleResultClick = () => {
  clearSearch();
  closeMenu(); // Close the menu when a search result is clicked
};

// Clear search when route changes
watch(
  () => router.currentRoute.value,
  () => {
    clearSearch();
  }
);
</script>

<style scoped>
/* Custom scrollbar for results */
.max-h-64 {
  scrollbar-width: thin;
  scrollbar-color: rgba(251, 191, 36, 0.5) rgba(31, 41, 55, 0.5);
}

.max-h-64::-webkit-scrollbar {
  width: 6px;
}

.max-h-64::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 3px;
}

.max-h-64::-webkit-scrollbar-thumb {
  background-color: rgba(251, 191, 36, 0.5);
  border-radius: 3px;
}
</style>
