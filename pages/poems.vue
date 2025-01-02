<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50"
  >
    <!-- Hero Section with Background -->
    <div
      class="relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-amber-800"
    >
      <!-- Optional subtle texture overlay -->
      <div
        class="absolute inset-0 opacity-50 bg-[linear-gradient(30deg,rgba(255,255,255,0.1)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.1)_87.5%,rgba(255,255,255,0.1)_0)] bg-[length:8px_8px]"
      ></div>

      <div class="relative container mx-auto px-6 py-12 sm:py-24 text-center">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 leading-tight text-white"
        >
          Коллекция поэзии
        </h1>
        <p class="text-amber-100 max-w-2xl mx-auto sm:text-lg leading-relaxed">
          Исследуйте мир поэзии через времена, где каждое стихотворение — это
          окно в новую реальность.
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-16">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Years Navigation -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="sticky top-8">
            <h2 class="text-xl font-serif mb-6 text-gray-900">
              Архив по годам
            </h2>
            <nav
              class="space-y-1 bg-white/80 backdrop-blur-lg rounded-xl border border-amber-200 shadow-md overflow-hidden"
            >
              <button
                class="w-full flex items-center justify-between px-6 py-4 transition-all hover:bg-amber-100 hover:shadow-lg"
                :class="[
                  selectedYear === 'all'
                    ? 'bg-amber-200 text-amber-900 font-medium'
                    : 'text-gray-700',
                ]"
                @click="selectedYear = 'all'"
              >
                <span class="font-serif">Все произведения</span>
                <span class="text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  {{ totalPoemCount }}
                </span>
              </button>

              <div v-for="year in years" :key="year.value">
                <button
                  class="w-full flex items-center justify-between px-6 py-4 transition-all border-t border-amber-50 hover:bg-amber-100 hover:shadow-lg"
                  :class="[
                    selectedYear === year.value
                      ? 'bg-amber-200 text-amber-900 font-medium'
                      : 'text-gray-700',
                  ]"
                  @click="selectedYear = year.value"
                >
                  <span class="font-serif">{{ year.value }}</span>
                  <span
                    class="text-sm bg-white px-3 py-1 rounded-full shadow-sm"
                  >
                    {{ year.count }}
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <!-- Poems Grid -->
        <main class="flex-1 max-w-4xl">
          <div
            v-if="filteredPoems.length"
            class="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <article
              v-for="poem in filteredPoems"
              :key="poem.id"
              class="group bg-white rounded-xl border border-amber-200 hover:shadow-xl transition-all duration-300 hover:bg-amber-50"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <span
                    :class="getCategoryClass(poem.category)"
                    class="px-4 py-1.5 text-sm font-medium rounded-full"
                  >
                    {{ poem.category }}
                  </span>
                  <p class="text-sm text-gray-500">{{ poem.date }}</p>
                </div>

                <h2
                  class="text-2xl font-serif text-gray-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors"
                >
                  {{ poem.title }}
                </h2>

                <p
                  class="text-gray-600 text-lg leading-relaxed mb-6 font-serif line-clamp-4"
                >
                  {{ poem.excerpt }}
                </p>

                <div
                  class="flex items-center justify-between pt-6 border-t border-amber-200"
                >
                  <div class="flex items-center space-x-4 text-gray-500">
                    <span class="flex items-center">
                      <i class="far fa-eye mr-2"></i>
                      {{ poem.views }}
                    </span>
                    <span class="flex items-center">
                      <i class="far fa-heart mr-2"></i>
                      {{ poem.likes }}
                    </span>
                  </div>

                  <nuxt-link
                    :to="`/poems/${poem.id}`"
                    class="inline-flex items-center px-6 py-2 rounded-lg bg-amber-200 text-amber-900 hover:bg-amber-300 font-medium transition-all"
                  >
                    Читать
                    <i class="fas fa-arrow-right ml-2"></i>
                  </nuxt-link>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="text-center py-24 bg-white/80 backdrop-blur-lg rounded-xl border border-amber-200 shadow-md"
          >
            <div class="text-6xl mb-6">📝</div>
            <h3 class="text-2xl font-serif text-gray-900 mb-3">
              Стихотворения не найдены
            </h3>
            <p class="text-gray-500 text-lg">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample data - replace with your actual data
const poems = ref([
  {
    id: 1,
    title: "Летний закат",
    date: "15 июня 2023",
    category: "Пейзажная лирика",
    excerpt: "В лучах заката тает день, и небо красками играет...",
    views: 245,
    likes: 23,
    year: 2024,
  },
  {
    id: 2,
    title: "Зимний сон",
    date: "3 декабря 2023",
    category: "Философская лирика",
    excerpt:
      "Под белым покрывалом спит земля, в молчании храня свои секреты...",
    views: 189,
    likes: 15,
    year: 2023,
  },
  {
    id: 3,
    title: "Морской бриз",
    date: "22 июля 2022",
    category: "Романтическая поэзия",
    excerpt: "Соленый ветер треплет паруса, и чайки реют над волнами...",
    views: 302,
    likes: 45,
    year: 2022,
  },
  {
    id: 3,
    title: "Морской бриз",
    date: "28 июля 2022",
    category: "Романтическая поэзия",
    excerpt: "Соленый ветер треплет паруса, и чайки реют над волнами...",
    views: 372,
    likes: 45,
    year: 2021,
  },
]);

const searchQuery = ref("");
const selectedYear = ref("all");

const years = computed(() => {
  const yearCounts = poems.value.reduce((acc, poem) => {
    acc[poem.year] = (acc[poem.year] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(yearCounts)
    .map(([year, count]) => ({
      value: parseInt(year),
      count,
    }))
    .sort((a, b) => b.value - a.value);
});

const totalPoemCount = computed(() => poems.value.length);

const filteredPoems = computed(() => {
  return poems.value.filter((poem) => {
    const matchesSearch = searchQuery.value
      ? poem.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        poem.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;

    const matchesYear =
      selectedYear.value === "all" || poem.year === selectedYear.value;

    return matchesSearch && matchesYear;
  });
});

const getCategoryClass = (category) => {
  const classes = {
    "Пейзажная лирика": "bg-green-100 text-green-800",
    "Философская лирика": "bg-blue-100 text-blue-800",
    "Романтическая поэзия": "bg-pink-100 text-pink-800",
  };
  return classes[category] || "bg-gray-100 text-gray-800";
};
</script>
