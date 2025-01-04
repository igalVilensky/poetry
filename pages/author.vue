<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50"
  >
    <!-- Author Hero Section -->
    <div class="relative h-[60vh] sm:h-[50vh] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${authorBackground})` }"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/70 to-amber-900/50"
      ></div>

      <div class="relative h-full container mx-auto px-6">
        <div
          class="h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-16"
        >
          <div
            class="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl"
          >
            <img
              :src="authorImage"
              alt="Керен Виленская"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="text-center md:text-left">
            <p class="text-amber-200 text-xl md:text-2xl font-light mb-6">
              Музыкант • Режиссер • Поэтесса
            </p>
            <div class="flex gap-4 justify-center md:justify-start">
              <a
                href="#"
                class="text-white hover:text-amber-300 transition-colors"
                v-for="social in socialLinks"
                :key="social.name"
              >
                <i :class="social.icon" class="text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Author Bio Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-3xl md:text-4xl font-serif text-slate-900 mb-8 text-center"
          >
            Биография
          </h2>
          <div class="prose prose-lg md:prose-xl max-w-none">
            <p class="text-slate-700 leading-relaxed">
              {{ authorBio }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Author Stats -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in authorStats"
            :key="stat.label"
            class="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100"
          >
            <div class="text-3xl md:text-4xl font-serif text-amber-700 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-slate-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Works -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6">
        <h2
          class="text-3xl md:text-4xl font-serif text-slate-900 mb-12 text-center"
        >
          Последние произведения
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            v-for="work in latestWorks"
            :key="work.id"
            class="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div class="p-6">
              <div class="mb-4">
                <span
                  :class="getCategoryClass(work.category)"
                  class="px-4 py-1.5 text-sm font-medium rounded-full"
                >
                  {{ work.category }}
                </span>
              </div>
              <h3 class="text-xl font-serif text-slate-900 mb-3">
                {{ work.title }}
              </h3>
              <p class="text-slate-600 mb-4 line-clamp-3">{{ work.excerpt }}</p>
              <div
                class="flex justify-between items-center pt-4 border-t border-slate-100"
              >
                <span class="text-sm text-slate-500">{{ work.date }}</span>
                <nuxt-link
                  :to="`/poems/${work.id}`"
                  class="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Читать →
                </nuxt-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-gradient-to-br from-amber-50 to-white">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif text-slate-900 mb-8">
            Связаться со мной
          </h2>
          <p class="text-slate-600 mb-8">
            Для сотрудничества или творческих предложений, пожалуйста, свяжитесь
            со мной:
          </p>
          <a
            href="mailto:author@example.com"
            class="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <i class="far fa-envelope mr-2"></i>
            Написать письмо
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import authorBackground from "../assets/images/background.jpg";
import authorImage from "../assets/images/avatar.jpg";

// Author Bio
// Author Bio - Updated for Keren Vilenskaya
const authorBio = `Керен Виленская - современная поэтесса и писательница, родившаяся в Санкт-Петербурге. Её творческий путь начался в раннем возрасте, когда она впервые открыла для себя мир поэзии через произведения классиков русской литературы. Окончив филологический факультет СПбГУ, она посвятила свою жизнь литературному творчеству.

За последние 15 лет она опубликовала более 500 стихотворений, 5 поэтических сборников и получила несколько престижных литературных премий. Её работы переведены на английский, французский и немецкий языки. В своём творчестве Керен исследует темы природы, любви, философии бытия и место человека в современном мире.`;

// Social Media Links
const socialLinks = [
  { name: "Facebook", icon: "fab fa-facebook" },
  { name: "Twitter", icon: "fab fa-twitter" },
  { name: "Instagram", icon: "fab fa-instagram" },
  { name: "Telegram", icon: "fab fa-telegram" },
];

// Author Statistics
const authorStats = [
  { label: "Стихотворений", value: "500+" },
  { label: "Сборников", value: "5" },
  { label: "Премий", value: "3" },
  { label: "Лет творчества", value: "15" },
];

// Latest Works
const latestWorks = [
  {
    id: 1,
    title: "Весенний рассвет",
    category: "Пейзажная лирика",
    excerpt: "Рассвет встаёт над лугами, пробуждая от сна всю природу...",
    date: "10 марта 2024",
  },
  {
    id: 2,
    title: "Философия тишины",
    category: "Философская лирика",
    excerpt: "В безмолвии ночи рождаются самые глубокие мысли...",
    date: "5 марта 2024",
  },
  {
    id: 3,
    title: "Городской романс",
    category: "Романтическая поэзия",
    excerpt: "Улицы города хранят истории тысячи встреч...",
    date: "1 марта 2024",
  },
];

// Category styling function
const getCategoryClass = (category) => {
  const classes = {
    "Пейзажная лирика": "bg-green-100 text-green-800",
    "Философская лирика": "bg-blue-100 text-blue-800",
    "Романтическая поэзия": "bg-pink-100 text-pink-800",
  };
  return classes[category] || "bg-gray-100 text-gray-800";
};
</script>
