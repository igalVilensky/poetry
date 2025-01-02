<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50"
  >
    <!-- Hero Section with Background -->
    <div
      class="relative overflow-hidden bg-gradient-to-r from-slate-700 via-slate-800 to-amber-800"
    >
      <!-- Optional subtle texture overlay -->
      <div
        class="absolute inset-0 opacity-50 bg-[linear-gradient(30deg,rgba(253,224,71,0.1)_12%,transparent_12.5%,transparent_87%,rgba(253,224,71,0.1)_87.5%,rgba(253,224,71,0.1)_0)] bg-[length:8px_8px]"
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

    <!-- Новые стихи Section -->
    <section class="py-16 bg-slate-100 relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <h2 class="text-4xl font-serif text-center mb-12 text-slate-900">
          Новые стихи
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="newPoem in newPoems"
            :key="newPoem.id"
            class="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div class="mb-4">
              <div
                class="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mx-auto"
              >
                <i class="fas fa-feather-alt text-amber-800 text-xl"></i>
              </div>
            </div>

            <h3 class="text-2xl font-serif text-amber-700 mb-6 text-center">
              {{ newPoem.title }}
            </h3>
            <p class="text-gray-700 mb-6 text-justify lg:line-clamp-none">
              {{ newPoem.excerpt }}
            </p>

            <div class="flex justify-center">
              <nuxt-link
                :to="`/poems/${newPoem.id}`"
                class="px-6 py-3 rounded-full bg-amber-300 text-slate-900 font-medium hover:bg-amber-400 transition-colors duration-300"
              >
                Читать полностью
              </nuxt-link>
            </div>
          </article>
        </div>
      </div>

      <!-- Background visual effect -->
      <div
        class="absolute inset-0 bg-[radial-gradient(rgba(253,224,71,0.2)_15%,transparent_16%)] bg-[length:15px_15px] opacity-25"
      ></div>
    </section>

    <div class="container mx-auto px-6 py-16">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Years Navigation -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="sticky top-8">
            <h2 class="text-xl font-serif mb-6 text-slate-900">
              Архив по годам
            </h2>
            <nav
              class="space-y-1 bg-white/80 backdrop-blur-lg rounded-xl border border-slate-200 shadow-md overflow-hidden"
            >
              <button
                class="w-full flex items-center justify-between px-6 py-4 transition-all hover:bg-amber-100 hover:shadow-lg"
                :class="[
                  selectedYear === 'all'
                    ? 'bg-amber-200 text-slate-900 font-medium'
                    : 'text-slate-600',
                ]"
                @click="selectedYear = 'all'"
              >
                <span class="font-serif">Все произведения</span>
                <span
                  class="text-sm bg-slate-100 px-3 py-1 rounded-full shadow-sm"
                >
                  {{ totalPoemCount }}
                </span>
              </button>

              <div v-for="year in years" :key="year.value">
                <button
                  class="w-full flex items-center justify-between px-6 py-4 transition-all border-t border-slate-100 hover:bg-amber-100 hover:shadow-lg"
                  :class="[
                    selectedYear === year.value
                      ? 'bg-amber-200 text-slate-900 font-medium'
                      : 'text-slate-600',
                  ]"
                  @click="selectedYear = year.value"
                >
                  <span class="font-serif">{{ year.value }}</span>
                  <span
                    class="text-sm bg-slate-100 px-3 py-1 rounded-full shadow-sm"
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
              class="group bg-white rounded-xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:bg-amber-50"
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
                  class="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors"
                >
                  {{ poem.title }}
                </h2>

                <p
                  class="text-slate-600 text-lg leading-relaxed mb-6 font-serif line-clamp-4"
                >
                  {{ poem.excerpt }}
                </p>

                <div
                  class="flex items-center justify-between pt-6 border-t border-slate-200"
                >
                  <div class="flex items-center space-x-4 text-slate-500">
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
                    class="inline-flex items-center px-6 py-2 rounded-lg bg-amber-200 text-slate-900 hover:text-amber-200 hover:bg-slate-700 font-medium transition-all"
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
            class="text-center py-24 bg-white/80 backdrop-blur-lg rounded-xl border border-slate-200 shadow-md"
          >
            <div class="text-6xl mb-6">📝</div>
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
  };
  return classes[category] || "bg-gray-100 text-gray-800";
};
</script>
