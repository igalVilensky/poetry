<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="poem in posts" :key="poem._id">{{ poem }}</li>
      </ul>
    </div>
  </div>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50"
  >
    <!-- Hero Section with Parallax Effect -->
    <div class="relative h-[60vh] sm:h-[50vh] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-amber-900/90"
      ></div>

      <!-- Animated patterns -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 opacity-30 animate-pulse">
          <div
            class="h-full w-full bg-[radial-gradient(circle_500px_at_50%_50%,rgba(253,224,71,0.1),transparent)]"
          ></div>
        </div>
      </div>

      <div
        class="relative h-full container mx-auto px-6 flex flex-col justify-center items-center"
      >
        <h1
          class="text-5xl sm:text-6xl md:text-7xl font-serif mb-8 leading-tight text-white text-center"
        >
          Коллекция <span class="text-amber-300">поэзии</span>
        </h1>
        <p
          class="text-amber-100 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-center font-light"
        >
          Исследуйте мир поэзии через времена, где каждое стихотворение — это
          окно в новую реальность.
        </p>
      </div>
    </div>

    <!-- Featured Poems Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="flex items-center justify-center mb-16">
          <div class="text-center">
            <h2 class="text-4xl font-serif mb-4 text-slate-900">Новые стихи</h2>
            <div class="w-24 h-1 bg-amber-300 mx-auto rounded-full"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="newPoem in newPoems"
            :key="newPoem.id"
            class="group bg-white rounded-2xl border border-slate-200 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div class="mb-6">
              <div
                class="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl flex items-center justify-center mx-auto transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"
              >
                <i class="fas fa-feather-alt text-amber-800 text-2xl"></i>
              </div>
            </div>

            <h3
              class="text-2xl font-serif text-slate-800 mb-4 text-center group-hover:text-amber-700 transition-colors"
            >
              {{ newPoem.title }}
            </h3>
            <p class="text-slate-600 mb-6 text-justify line-clamp-4 font-light">
              {{ newPoem.excerpt }}
            </p>

            <div class="flex justify-center">
              <nuxt-link
                :to="`/poems/${newPoem.id}`"
                class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
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
          <div class="sticky top-8">
            <h2
              class="text-2xl font-serif mb-6 text-slate-900 flex items-center"
            >
              <span class="w-2 h-8 bg-amber-400 rounded-r-full mr-4"></span>
              Архив по годам
            </h2>
            <nav class="space-y-2">
              <button
                class="w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300"
                :class="[
                  selectedYear === 'all'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200',
                ]"
                @click="selectedYear = 'all'"
              >
                <span class="font-serif">Все произведения</span>
                <span
                  class="text-sm px-3 py-1 rounded-full"
                  :class="[
                    selectedYear === 'all'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600',
                  ]"
                >
                  {{ totalPoemCount }}
                </span>
              </button>

              <button
                v-for="year in years"
                :key="year.value"
                class="w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300"
                :class="[
                  selectedYear === year.value
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200',
                ]"
                @click="selectedYear = year.value"
              >
                <span class="font-serif">{{ year.value }}</span>
                <span
                  class="text-sm px-3 py-1 rounded-full"
                  :class="[
                    selectedYear === year.value
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600',
                  ]"
                >
                  {{ year.count }}
                </span>
              </button>
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
              class="group bg-white rounded-xl border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <span
                    :class="getCategoryClass(poem.category)"
                    class="px-4 py-1.5 text-sm font-medium rounded-full"
                  >
                    {{ poem.category }}
                  </span>
                  <p class="text-sm text-slate-500">{{ poem.date }}</p>
                </div>

                <h2
                  class="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors"
                >
                  {{ poem.title }}
                </h2>

                <p
                  class="text-slate-600 text-lg leading-relaxed mb-6 font-light line-clamp-4"
                >
                  {{ poem.excerpt }}
                </p>

                <div
                  class="flex items-center justify-between pt-6 border-t border-slate-200"
                >
                  <div class="flex items-center space-x-6 text-slate-500">
                    <span
                      class="flex items-center group-hover:text-amber-600 transition-colors"
                    >
                      <i class="far fa-eye mr-2"></i>
                      {{ poem.views }}
                    </span>
                    <span
                      class="flex items-center group-hover:text-amber-600 transition-colors"
                    >
                      <i class="far fa-heart mr-2"></i>
                      {{ poem.likes }}
                    </span>
                  </div>

                  <nuxt-link
                    :to="`/poems/${poem.id}`"
                    class="inline-flex items-center px-6 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-amber-500 hover:text-white font-medium transition-all duration-300"
                  >
                    Читать
                    <i
                      class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"
                    ></i>
                  </nuxt-link>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="text-center py-24 bg-white rounded-xl border border-slate-200 shadow-md"
          >
            <div class="text-6xl mb-6 animate-bounce">📝</div>
            <h3 class="text-2xl font-serif text-slate-900 mb-3">
              Стихотворения не найдены
            </h3>
            <p class="text-slate-500 text-lg">
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
import backgroundImage from "../assets/images/background.jpg";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
// Fetch posts from Sanity
const { data: posts, loading, error } = fetchPosts();

// Get projectId and dataset from the Sanity client config
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

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
    id: 4,
    title: "Морской бриз",
    date: "28 июля 2022",
    category: "Романтическая поэзия",
    excerpt: "Соленый ветер треплет паруса, и чайки реют над волнами...",
    views: 372,
    likes: 45,
    year: 2021,
  },
  {
    id: 5,
    title: "Весенний рассвет",
    date: "10 марта 2024",
    category: "Пейзажная лирика",
    excerpt: "Рассвет встаёт над лугами, пробуждая от сна всю природу...",
    views: 120,
    likes: 30,
    year: 2024,
  },
  {
    id: 6,
    title: "Осенние думы",
    date: "25 сентября 2023",
    category: "Философская лирика",
    excerpt: "Листья падают тихо, как мысли в моей голове...",
    views: 210,
    likes: 27,
    year: 2023,
  },
  {
    id: 7,
    title: "Лунный путь",
    date: "14 февраля 2022",
    category: "Романтическая поэзия",
    excerpt: "Луна ведёт меня по тропе, где каждый шаг - это любовь...",
    views: 350,
    likes: 60,
    year: 2022,
  },
  {
    id: 8,
    title: "Город ночью",
    date: "5 ноября 2021",
    category: "Городская лирика",
    excerpt: "Ночь освещает город, и каждый свет - это мечта...",
    views: 400,
    likes: 48,
    year: 2021,
  },
  {
    id: 9,
    title: "Дождь воспоминаний",
    date: "8 августа 2020",
    category: "Ностальгическая поэзия",
    excerpt: "Капли дождя стучат по окну, будто воспоминания о прошлом...",
    views: 320,
    likes: 35,
    year: 2020,
  },
  {
    id: 10,
    title: "Путь сквозь туман",
    date: "2 января 2025",
    category: "Метафорическая лирика",
    excerpt: "В тумане каждый шаг - вопрос, а каждый ответ - новый рассвет...",
    views: 90,
    likes: 18,
    year: 2025,
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

// New poems for the 'Новые стихи' section
const newPoems = computed(() => {
  return poems.value
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
    .slice(0, 3); // Take the first 4 (which are now the most recent)
});

const getCategoryClass = (category) => {
  const classes = {
    "Пейзажная лирика": "bg-green-100 text-green-800",
    "Философская лирика": "bg-blue-100 text-blue-800",
    "Романтическая поэзия": "bg-pink-100 text-pink-800",
    "Городская лирика": "bg-purple-100 text-purple-800",
    "Ностальгическая поэзия": "bg-yellow-100 text-yellow-800",
    "Метафорическая лирика": "bg-indigo-100 text-indigo-800",
  };
  return classes[category] || "bg-gray-100 text-gray-800";
};
</script>
