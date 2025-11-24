<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div
        class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        <!-- Hero Section with Parallax Effect -->
        <div class="relative h-[60vh] sm:h-[50vh] overflow-hidden">
          <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${backgroundImage})` }">
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-amber-900/90"></div>

          <!-- Animated patterns -->
          <div class="absolute inset-0">
            <div class="absolute inset-0 opacity-30 animate-pulse">
              <div class="h-full w-full bg-[radial-gradient(circle_500px_at_50%_50%,rgba(253,224,71,0.1),transparent)]">
              </div>
            </div>
          </div>

          <div class="relative h-full container mx-auto px-6 flex flex-col justify-center items-center">
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-serif mb-8 leading-tight text-white text-center">
              Это <span class="text-amber-300">твое время</span>
            </h1>
            <p class="text-amber-100 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-center font-light">
              Над морской синевой - небес шелка.<br />
              Солнце жаркие письма землянам шлет.<br />
              От Истока безмолвной любви река<br />
              день и ночь напролет все течет и течет ...
            </p>
          </div>
        </div>

        <!-- Featured Poems Section -->
        <section class="py-20 relative overflow-hidden">
          <div class="container mx-auto px-6 relative z-10">
            <div class="flex items-center justify-center mb-16">
              <div class="text-center">
                <h2 class="text-4xl font-serif mb-4 text-slate-900 dark:text-white">
                  Новые стихи
                </h2>
                <div class="w-24 h-1 bg-amber-300 mx-auto rounded-full"></div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article v-for="newPoem in newPoems" :key="newPoem._id"
                class="group bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div class="mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-400 dark:to-amber-500 rounded-2xl flex items-center justify-center mx-auto transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <i class="fas fa-feather-alt text-amber-800 dark:text-amber-900 text-2xl"></i>
                  </div>
                </div>

                <h3
                  class="text-2xl font-serif text-slate-800 dark:text-white mb-4 text-center group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {{ newPoem.title }}
                </h3>
                <p class="text-slate-600 dark:text-gray-300 mb-6 text-justify line-clamp-4 font-light">
                  {{
                    newPoem.body &&
                      newPoem.body[0] &&
                      newPoem.body[0].children[0].text
                      ? newPoem.body[0].children[0].text.slice(0, 100) + "..."
                      : "No excerpt available"
                  }}
                </p>

                <div class="flex justify-center">
                  <nuxt-link :to="`/poems/${newPoem.slug.current}`"
                    class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Читать полностью
                  </nuxt-link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Main Content Section -->
        <div class="container mx-auto px-6 py-16">
          <div class="flex flex-col lg:flex-row gap-12">
            <!-- Years Navigation -->
            <aside class="lg:w-80 flex-shrink-0">
              <div class="sticky top-8 space-y-6">
                <!-- Total Poems Counter -->
                <div
                  class="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 transition-colors duration-300">
                  <h2 class="text-2xl font-serif mb-2 text-slate-900 dark:text-white flex items-center">
                    <span class="w-2 h-8 bg-amber-400 rounded-r-full mr-4"></span>
                    Архив
                  </h2>
                  <div class="text-slate-600 dark:text-gray-300">
                    Всего стихотворений:
                    <span class="font-medium text-slate-900 dark:text-white">{{
                      totalPoemCount
                    }}</span>
                  </div>
                </div>

                <!-- Year Selection -->
                <div
                  class="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6 transition-colors duration-300">
                  <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-4">
                    Выберите год
                  </h3>

                  <!-- Desktop: Custom Select UI -->
                  <div class="hidden sm:block relative year-dropdown">
                    <button @click.stop="toggleDropdown"
                      class="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-left flex items-center justify-between hover:border-amber-400 dark:hover:border-amber-500 transition-colors">
                      <span class="font-medium text-slate-900 dark:text-white">
                        {{ selectedYear === "all" ? "Все годы" : selectedYear }}
                      </span>
                      <i class="fas fa-chevron-down text-slate-400 dark:text-gray-400 transition-transform duration-200"
                        :class="{ 'rotate-180': isYearDropdownOpen }"></i>
                    </button>

                    <!-- Dropdown Menu -->
                    <Transition enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                      <div v-show="isYearDropdownOpen"
                        class="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg shadow-lg py-2 max-h-64 overflow-y-auto">
                        <button @click="selectYear('all')"
                          class="w-full px-4 py-2 text-left hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors"
                          :class="{
                            'bg-amber-50 dark:bg-gray-600 text-amber-700 dark:text-amber-400':
                              selectedYear === 'all',
                          }">
                          <div class="flex items-center justify-between">
                            <span class="text-slate-900 dark:text-white">Все годы</span>
                            <span class="text-sm text-slate-500 dark:text-gray-400">{{
                              totalPoemCount
                            }}</span>
                          </div>
                        </button>

                        <div v-for="year in years" :key="year.value">
                          <button @click="selectYear(year.value)"
                            class="w-full px-4 py-2 text-left hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors"
                            :class="{
                              'bg-amber-50 dark:bg-gray-600 text-amber-700 dark:text-amber-400':
                                selectedYear === year.value,
                            }">
                            <div class="flex items-center justify-between">
                              <span class="text-slate-900 dark:text-white">{{ year.value }}</span>
                              <span class="text-sm text-slate-500 dark:text-gray-400">{{
                                year.count
                              }}</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>

                  <!-- Mobile: Native Select -->
                  <div class="sm:hidden">
                    <select v-model="selectedYear"
                      class="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white appearance-none">
                      <option value="all">
                        Все годы ({{ totalPoemCount }})
                      </option>
                      <option v-for="year in years" :key="year.value" :value="year.value">
                        {{ year.value }} ({{ year.count }})
                      </option>
                    </select>
                  </div>

                  <!-- Quick Stats -->
                  <div class="mt-6 space-y-3">
                    <div class="flex items-center justify-between text-sm text-slate-600 dark:text-gray-300">
                      <span>Самый ранний год:</span>
                      <span class="font-medium text-slate-900 dark:text-white">{{
                        earliestYear
                      }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm text-slate-600 dark:text-gray-300">
                      <span>Последний год:</span>
                      <span class="font-medium text-slate-900 dark:text-white">{{
                        latestYear
                      }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm text-slate-600 dark:text-gray-300">
                      <span>Стихов в этом году:</span>
                      <span class="font-medium text-slate-900 dark:text-white">{{
                        currentYearPoemCount
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <!-- Poems Grid with Pagination -->
            <main class="flex-1 max-w-4xl">
              <!-- Search Bar -->
              <div class="mb-8">
                <div class="relative">
                  <input v-model="searchQuery" type="text" placeholder="Поиск стихотворений..."
                    class="w-full px-6 py-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors duration-300" />
                  <i
                    class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400"></i>
                </div>
              </div>
              <div v-if="paginatedPoems?.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <article v-for="poem in paginatedPoems" :key="poem._id"
                  class="group bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                      <span :class="getCategoryClass(poem.category)"
                        class="px-4 py-1.5 text-sm font-medium rounded-full">
                        {{ poem.category }}
                      </span>
                      <p class="text-sm text-slate-500 dark:text-gray-400">
                        {{
                          new Date(poem.publishedAt).toLocaleDateString(
                            "ru-RU",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        }}
                      </p>
                    </div>

                    <h2
                      class="text-2xl font-serif text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {{ poem.title }}
                    </h2>

                    <p class="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mb-6 font-light line-clamp-4">
                      {{
                        poem.body &&
                          poem.body[0] &&
                          poem.body[0].children[0].text
                          ? poem.body[0].children[0].text.slice(0, 100) + "..."
                          : "No content available"
                      }}
                    </p>

                    <div class="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-gray-700">
                      <div class="flex items-center space-x-6 text-slate-500 dark:text-gray-400">
                        <span
                          class="flex items-center group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          <i class="far fa-eye mr-2"></i>
                          {{ poem.views || 0 }}
                        </span>
                        <span
                          class="flex items-center group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          <i class="far fa-heart mr-2"></i>
                          {{ poem.likes || 0 }}
                        </span>
                      </div>

                      <nuxt-link :to="`/poems/${poem.slug.current}`"
                        class="inline-flex items-center px-6 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 hover:bg-amber-500 hover:text-white font-medium transition-all duration-300">
                        Читать
                        <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                      </nuxt-link>
                    </div>
                  </div>
                </article>
              </div>

              <!-- Pagination Controls -->
              <div v-if="paginatedPoems?.length" class="mt-12">
                <!-- Mobile Pagination -->
                <div class="flex flex-col space-y-4 sm:hidden">
                  <div class="flex justify-center text-sm text-slate-600 dark:text-gray-400">
                    Страница {{ currentPage }} из {{ totalPages }}
                  </div>
                  <div class="flex justify-between">
                    <button @click="currentPage--" :disabled="currentPage === 1"
                      class="px-3 py-2 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors text-sm">
                      <i class="fas fa-chevron-left mr-1"></i>
                      Пред.
                    </button>

                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                      class="px-3 py-2 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors text-sm">
                      След.
                      <i class="fas fa-chevron-right ml-1"></i>
                    </button>
                  </div>
                </div>

                <!-- Desktop Pagination -->
                <div class="hidden sm:flex justify-center items-center space-x-4">
                  <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-4 py-2 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors">
                    <i class="fas fa-chevron-left mr-2"></i>
                    Предыдущая
                  </button>

                  <div class="flex items-center space-x-2">
                    <template v-for="pageNum in totalPages" :key="pageNum">
                      <button v-if="shouldShowPage(pageNum)" @click="currentPage = pageNum"
                        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" :class="[
                          currentPage === pageNum
                            ? 'bg-amber-500 text-white'
                            : 'bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-600',
                        ]">
                        {{ pageNum }}
                      </button>
                      <span v-else-if="shouldShowEllipsis(pageNum)" class="px-2 text-slate-400 dark:text-gray-500">
                        ...
                      </span>
                    </template>
                  </div>

                  <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-4 py-2 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors">
                    Следующая
                    <i class="fas fa-chevron-right ml-2"></i>
                  </button>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else
                class="text-center py-24 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-md transition-colors duration-300">
                <div class="text-6xl mb-6 animate-bounce">📝</div>
                <h3 class="text-2xl font-serif text-slate-900 dark:text-white mb-3">
                  Стихотворения не найдены
                </h3>
                <p class="text-slate-500 dark:text-gray-400 text-lg">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import backgroundImage from "../assets/images/background.jpg";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";

// Fetch posts from Sanity
const { data: posts, loading, error } = fetchPosts();

// Get projectId and dataset from the Sanity client config
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

// SEO: Page title and meta
useHead({
  title: 'Все стихотворения - Солнечные сказки',
  meta: [
    {
      name: 'description',
      content: 'Полная коллекция стихотворений Керен Виленской. Исследуйте поэзию по годам и категориям.'
    }
  ]
});


// Search and filter parameters
const searchQuery = ref("");
const selectedYear = ref("all");
const currentPage = ref(1);
const itemsPerPage = 10;

// Computed for years based on the publishedAt date of posts
const years = computed(() => {
  const yearCounts = {};
  posts.value?.forEach((post) => {
    const year = new Date(post.publishedAt).getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  return Object.entries(yearCounts)
    .map(([year, count]) => ({
      value: parseInt(year),
      count,
    }))
    .sort((a, b) => b.value - a.value);
});

const totalPoemCount = computed(() => posts.value?.length);

// Computed for filtering poems based on search and year
const filteredPoems = computed(() => {
  return posts.value?.filter((post) => {
    const matchesSearch = searchQuery.value
      ? post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (post.body &&
        post.body[0] &&
        post.body[0].children[0].text &&
        post.body[0].children[0].text
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()))
      : true;

    const matchesYear =
      selectedYear.value === "all" ||
      new Date(post.publishedAt).getFullYear() === selectedYear.value;

    return matchesSearch && matchesYear;
  });
});

// Computed for pagination
const totalPages = computed(() => {
  return Math.ceil((filteredPoems.value?.length || 0) / itemsPerPage);
});

const paginatedPoems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredPoems.value?.slice(startIndex, endIndex);
});

// Helper functions for pagination display
const shouldShowPage = (pageNum) => {
  // Always show first and last pages
  if (pageNum === 1 || pageNum === totalPages.value) return true;
  // Show pages around current page
  if (Math.abs(currentPage.value - pageNum) <= 2) return true;
  return false;
};

const shouldShowEllipsis = (pageNum) => {
  // Show ellipsis between gaps of pages
  if (pageNum === 1 || pageNum === totalPages.value) return false;
  if (Math.abs(currentPage.value - pageNum) === 3) return true;
  return false;
};

// Watch for changes in filters to reset pagination
watch([searchQuery, selectedYear], () => {
  currentPage.value = 1;
});

// New poems for the 'Новые стихи' section
const newPoems = computed(() => {
  return posts.value
    ?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);
});

// Category styling helper
const getCategoryClass = (category) => {
  const classes = {
    Лирика: "bg-pink-100 text-pink-800",
    Философия: "bg-blue-100 text-blue-800",
    Природа: "bg-green-100 text-green-800",
    Любовь: "bg-red-100 text-red-800",
    Жизнь: "bg-purple-100 text-purple-800",
  };
  return classes[category] || "bg-gray-100 text-gray-800";
};

// Handle potential errors in the API response
watch(error, (newError) => {
  if (newError) {
    console.error("Error fetching posts:", newError);
    // You can add error handling UI here if needed
  }
});

// Reset to first page when posts data changes
watch(
  () => posts.value,
  () => {
    currentPage.value = 1;
  }
);

// Ensure current page stays within bounds when total pages changes
watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = Math.max(1, newTotalPages);
  }
});

// Add these to your existing script setup
const isYearDropdownOpen = ref(false);

// Toggle dropdown
const toggleDropdown = () => {
  isYearDropdownOpen.value = !isYearDropdownOpen.value;
};

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".year-dropdown")) {
      isYearDropdownOpen.value = false;
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("click", (e) => {
    if (!e.target.closest(".year-dropdown")) {
      isYearDropdownOpen.value = false;
    }
  });
});

// Helper function for year selection
const selectYear = (year) => {
  selectedYear.value = year;
  isYearDropdownOpen.value = false;
};

// Computed properties for year stats
const earliestYear = computed(() => {
  const years =
    posts.value?.map((post) => new Date(post.publishedAt).getFullYear()) || [];
  return years.length ? Math.min(...years) : "-";
});

const latestYear = computed(() => {
  const years =
    posts.value?.map((post) => new Date(post.publishedAt).getFullYear()) || [];
  return years.length ? Math.max(...years) : "-";
});

const currentYearPoemCount = computed(() => {
  if (selectedYear.value === "all") return totalPoemCount.value;
  return years.value.find((y) => y.value === selectedYear.value)?.count || 0;
});
</script>
