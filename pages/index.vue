<template>
  <main class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
    <!-- Hero Section -->
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
          Солнечные <span class="text-amber-300">сказки</span>
        </h1>
        <p
          class="text-amber-100 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-center font-light"
        >
          Погрузитесь в мир поэзии, где каждое слово — это луч света, освещающий
          глубины души
        </p>
        <a
          href="/poems"
          class="mt-8 inline-flex items-center px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-all duration-300 group"
        >
          Начать чтение
          <i
            class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"
          ></i>
        </a>
      </div>
    </div>

    <!-- Featured Poems Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-center mb-12">
          <div class="h-px w-12 bg-amber-500/30"></div>
          <h2 class="text-3xl font-serif text-gray-900 px-4">
            Избранные стихи
          </h2>
          <div class="h-px w-12 bg-amber-500/30"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="poem in featuredPoems" :key="poem.id" class="group">
            <article
              class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <p class="text-sm text-amber-600 mb-2">{{ poem.category }}</p>
              <h3
                class="text-xl font-serif text-gray-900 mb-3 group-hover:text-amber-600 transition-colors"
              >
                {{ poem.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ poem.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ poem.date }}</span>
                <a
                  :href="`/poems/${poem.slug.current}`"
                  class="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Читать полностью
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="container mx-auto px-6 text-center">
        <i class="fas fa-quote-left text-4xl text-amber-500/50 mb-6"></i>
        <blockquote
          class="text-2xl md:text-3xl font-serif mb-6 max-w-3xl mx-auto"
        >
          "Поэзия — это живопись, которую слышат, а живопись — это поэзия,
          которую видят."
        </blockquote>
        <cite class="text-gray-400">— Леонардо да Винчи</cite>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-serif text-center text-gray-900 mb-12">
          Категории
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            v-for="category in categories"
            :key="category.id"
            :href="category.url"
            class="group relative h-48 rounded-lg overflow-hidden"
          >
            <!-- Category background -->
            <div
              class="absolute inset-0 bg-gray-900 opacity-60 group-hover:opacity-70 transition-opacity"
            ></div>

            <!-- Category content -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <i :class="['text-3xl mb-3 text-amber-400', category.icon]"></i>
              <h3 class="text-xl font-serif text-white mb-2">
                {{ category.name }}
              </h3>
              <p class="text-sm text-gray-300">
                {{ category.count }} стихотворений
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-serif text-center text-gray-900 mb-12">
          Блог о поэзии
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article v-for="post in blogPosts" :key="post.id" class="group">
            <a href="#" class="block">
              <div
                class="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden bg-gray-200"
              >
                <img
                  src="https://media.newyorker.com/photos/5b968681dbd07a5060baef83/master/w_2560%2Cc_limit/NBA-Poetry-2018.jpg"
                  :alt="post.title"
                  class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3
                class="text-xl font-serif text-gray-900 mb-2 group-hover:text-amber-600 transition-colors"
              >
                {{ post.title }}
              </h3>
              <p class="text-gray-600 mb-3">{{ post.excerpt }}</p>
              <div class="flex items-center text-sm text-gray-500">
                <i class="far fa-calendar-alt mr-2"></i>
                {{ post.date }}
              </div>
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-gray-900">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-serif text-white mb-4">
          Оставайтесь вдохновленными
        </h2>
        <p class="text-gray-400 mb-8 max-w-2xl mx-auto">
          Подпишитесь на нашу рассылку, чтобы получать новые стихи, литературные
          новости и приглашения на поэтические вечера
        </p>
        <form class="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Ваш email..."
            class="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
          <button
            class="px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-r-lg transition-colors duration-300"
          >
            Подписаться
          </button>
        </form>
      </div>
    </section>
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <!-- Section Header -->
        <div class="flex items-center justify-center mb-16">
          <div class="h-px w-12 bg-amber-500/30"></div>
          <h2 class="text-3xl font-serif text-gray-900 px-4">
            Отзывы читателей
          </h2>
          <div class="h-px w-12 bg-amber-500/30"></div>
        </div>

        <!-- Testimonials Slider -->
        <div class="relative max-w-4xl mx-auto">
          <!-- Navigation Buttons -->
          <button
            @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 p-3 text-amber-600 hover:text-amber-700 transition-colors z-10"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
            :disabled="currentIndex === 0"
          >
            <i class="fas fa-chevron-left text-2xl"></i>
          </button>

          <button
            @click="nextSlide"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 p-3 text-amber-600 hover:text-amber-700 transition-colors z-10"
            :class="{
              'opacity-50 cursor-not-allowed':
                currentIndex === testimonials.length - 1,
            }"
            :disabled="currentIndex === testimonials.length - 1"
          >
            <i class="fas fa-chevron-right text-2xl"></i>
          </button>

          <!-- Testimonials -->
          <div class="overflow-hidden">
            <TransitionGroup tag="div" name="slide" class="relative">
              <div
                v-for="(testimonial, index) in testimonials"
                :key="testimonial.id"
                v-show="currentIndex === index"
                class="flex flex-col items-center text-center px-6"
              >
                <blockquote
                  class="text-xl md:text-2xl text-gray-800 mb-6 font-serif italic"
                >
                  "{{ testimonial.quote }}"
                </blockquote>
                <cite class="not-italic font-medium text-gray-900">
                  {{ testimonial.name }}
                </cite>
              </div>
            </TransitionGroup>
          </div>

          <!-- Dots Navigation -->
          <div class="flex justify-center space-x-2 mt-8">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="currentIndex = index"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300"
              :class="
                currentIndex === index
                  ? 'bg-amber-500 w-6'
                  : 'bg-amber-200 hover:bg-amber-300'
              "
            >
              <span class="sr-only">Testimonial {{ index + 1 }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import backgroundImage from "../assets/images/background.jpg";
import { fetchPosts } from "~/api/sanity/posts";

// Fetch posts from Sanity
const { data: posts } = fetchPosts();

const currentIndex = ref(0);

// Last 3 Poems
const featuredPoems = computed(() => {
  if (!Array.isArray(posts.value)) {
    console.warn("posts.value is not an array:", posts.value);
    return []; // or return some default value or loading state indicator
  }
  return posts.value
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) // Sort by publishedAt in descending order
    .slice(0, 3) // Take the first 3 (which are now the most recent)
    .map((post) => ({
      id: post._id,
      title: post.title,
      slug: post.slug,
      category: post.category || "Нет категории", // Default category if none provided
      excerpt:
        post.body && post.body[0] && post.body[0].children[0].text
          ? post.body[0].children[0].text.slice(0, 100) + "..."
          : "No excerpt available",
      date: new Date(post.publishedAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));
});

// Categories - This is a placeholder since we typically need to fetch categories separately or derive from posts
const categories = computed(() => {
  const uniqueCategories = [
    ...new Set(posts.value?.map((post) => post.category).filter((c) => c)),
  ];
  return uniqueCategories.map((category, index) => ({
    id: index + 1,
    name: category,
    count: posts.value.filter((p) => p.category === category).length,
    icon: `fas fa-${["tree", "brain", "heart", "city"][index % 4]}`, // Assigning icons randomly for demonstration
    url: `#${category.toLowerCase().replace(/\s+/g, "-")}`,
  }));
});

const blogPosts = [
  {
    id: 1,
    title: "Как написать свое первое стихотворение",
    excerpt: "Советы начинающим поэтам и основы стихосложения...",
    date: "14 января 2024",
  },
  {
    id: 2,
    title: "История русской поэзии",
    excerpt: "Путешествие через века русской литературы...",
    date: "11 января 2024",
  },
  {
    id: 3,
    title: "Современная поэзия в цифровую эпоху",
    excerpt: "Как технологии влияют на развитие поэзии...",
    date: "8 января 2024",
  },
];

const testimonials = ref([
  {
    id: 1,
    quote:
      "Прекрасно ваше повествование в стихотворной форме и народном стиле. Прочитала с удовольствием и хочется продолжения. С уважением и сердечным теплом,",
    name: "Галина Лычковская",
  },
  {
    id: 2,
    quote:
      "Эти стихи, Керен, действительно, подлинные и значимые. В них - много всего. И берут звуками, всякой герменевтикой, не говоря о мастерстве., с каким они сделаны, собраны, поставлены.",
    name: "Прокофьев Владимир ",
  },
  {
    id: 3,
    quote: "Ты как всегда Прекрасна во всех своих Творениях... ВеликоЛепна!",
    name: "Волар Будха",
  },
  {
    id: 4,
    quote:
      "Читаешь Ваше стихотворение и ощущаешь, как оно рождалось... как образ цеплялся за образ, метафора за метафору. В едином потоке ритма. С уважением,",
    name: "Алексеева Татьяна",
  },
  {
    id: 5,
    quote:
      "Мне понравилось. По моему это настоящие стихи. Поэзия тут присутствует. С уважением, Геннадий.",
    name: "Геннадий Иваныч",
  },
  {
    id: 6,
    quote:
      "Фантастические строчки...наверное за такую чуткость, ни один Шарик, не посмеет на вас рявкнуть.Такое поэтическое проникновение в мысли и настроение, наверняка понравится...и не только собачьей душе! Спасибо!",
    name: "Александр Хижий",
  },
  {
    id: 7,
    quote:
      "Очень понравились Ваши стихи. С удовольствием прочитала. Удачи во всем и всегда буду рада видеть на своей страничке.",
    name: "Любовь П",
  },
]);

const nextSlide = () => {
  if (currentIndex.value < testimonials.value.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>
