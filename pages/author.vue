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
            class="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl"
          >
            <img
              :src="authorImage"
              alt="Керен Виленская"
              class="w-full h-full object-cover object-[center_20%] author-image"
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
            Об авторе
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
          Избранные произведения
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            v-for="work in latestWorks"
            :key="work.id"
            class="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div class="p-6">
              <h3
                class="text-2xl font-serif text-slate-800 mb-3 leading-tight font-medium"
              >
                {{ work.title }}
              </h3>
              <p
                class="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed"
              >
                {{ work.excerpt }}
              </p>
              <div
                class="flex justify-between items-center pt-4 border-t border-slate-100"
              >
                <span class="text-sm text-slate-500">
                  <i class="fas fa-calendar-alt mr-2"></i>
                  {{ work.date }}
                </span>
                <nuxt-link
                  :to="work.link"
                  class="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Читать <i class="fas fa-arrow-right ml-1"></i>
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
            href="mailto:belaveda.keren@gmail.com"
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
import authorImage from "../assets/images/avatar2.jpeg";

// Author Bio
const authorBio =
  'Керен Виленски родилась в России в семье военного. Музыкант. Режиссер массовых праздников. Начала писать стихи в школе. В середине 70-х была участником театрального клуба "Суббота" Переехала в Беларусь. Работала режиссером театра "Исход". С 1996 года живет в Израиле, где продолжает свою творческую деятельность. Мама пятерых сыновей. "Мои стихи — это отражение моего внутреннего мира и жизненного опыта. Искусство всегда было и остается для меня способом делиться своим видением и эмоциями с окружающим миром."';

// Social Media Links
const socialLinks = [
  { name: "Facebook", icon: "fab fa-facebook" },
  { name: "Twitter", icon: "fab fa-twitter" },
  { name: "Instagram", icon: "fab fa-instagram" },
  { name: "Telegram", icon: "fab fa-telegram" },
];

// Author Statistics
const authorStats = [
  { label: "Стихотворений", value: "800+" },
  { label: "Сборников", value: "5" },
  { label: "Премий", value: "3" },
  { label: "Лет творчества", value: "50" },
];

// Latest Works
const latestWorks = [
  {
    id: 1,
    title: "Белый плат",
    excerpt:
      "В конце концов — к началу всех начал, к причалу, где младенец закричал впервые...",
    date: "28 сентября 2016",
    link: "/poems/beli%20plat",
  },
  {
    id: 2,
    title: "Сотис",
    excerpt:
      "О тайном, которое явным не станет, о парусе белом над морем летящем...",
    date: "28 сентября 2016",
    link: "/poems/sotis",
  },
  {
    id: 3,
    title: "Раз, два, три…",
    excerpt:
      "Создатель всех времен, мой голос слаб, и все, что вижу я — несовершенно...",
    date: "30 сентября 2016",
    link: "/poems/razdvatri",
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
<style scoped>
.author-image {
  filter: brightness(110%) contrast(110%) saturate(100%) hue-rotate(5deg)
    drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
}
</style>
