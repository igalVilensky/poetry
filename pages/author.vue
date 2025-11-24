<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Author Hero Section with Floating Words -->
    <div class="relative h-[60vh] sm:h-[50vh] overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${authorBackground})` }"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/70 to-amber-900/50"></div>

      <!-- Floating Poetry Words -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(word, index) in floatingWords" :key="index"
          class="absolute text-white/5 dark:text-white/3 font-serif text-4xl md:text-6xl floating-word" :style="{
            left: word.x + '%',
            top: word.y + '%',
            animationDelay: word.delay + 's',
            animationDuration: word.duration + 's'
          }">
          {{ word.text }}
        </div>
      </div>

      <div class="relative h-full container mx-auto px-6">
        <div class="h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-16">
          <!-- Author Image with Breathing Glow -->
          <div
            class="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl breathing-glow">
            <img :src="authorImage" alt="Керен Виленская"
              class="w-full h-full object-cover object-[center_20%] author-image" />
          </div>

          <div class="text-center md:text-left">
            <!-- Typewriter Effect for Quote -->
            <p class="text-amber-200 text-xl md:text-2xl font-light mb-6 min-h-[2em]">
              <span>{{ displayedText }}</span>
              <span v-if="!isTypingComplete" class="typing-cursor">|</span>
            </p>
            <div class="flex gap-4 justify-center md:justify-start">
              <a href="#"
                class="text-white hover:text-amber-300 transition-colors transform hover:scale-110 duration-300"
                v-for="social in socialLinks" :key="social.name">
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
          <h2 class="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-8 text-center">
            Об авторе
          </h2>
          <div class="prose prose-lg md:prose-xl max-w-none">
            <p class="text-slate-700 dark:text-gray-300 leading-relaxed text-justify">
              {{ authorBio }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Author Stats with Ink Spread Effect -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in authorStats" :key="stat.label"
            class="stat-card text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-700 border border-amber-100 dark:border-gray-600 transition-colors duration-300 relative overflow-hidden group cursor-pointer">
            <!-- Ink Spread Effect -->
            <div class="ink-spread"></div>

            <div class="relative z-10">
              <div class="text-3xl md:text-4xl font-serif text-amber-700 dark:text-amber-400 mb-2">
                {{ stat.value }}
              </div>
              <div class="text-slate-600 dark:text-gray-300">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Works with Staggered Fade-In -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-12 text-center">
          Избранные произведения
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article v-for="(work, index) in latestWorks" :key="work.id" ref="workCards"
            class="work-card bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            :style="{ animationDelay: (index * 150) + 'ms' }">
            <div class="p-6">
              <h3 class="text-2xl font-serif text-slate-800 dark:text-white mb-3 leading-tight font-medium">
                {{ work.title }}
              </h3>
              <p class="text-slate-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                {{ work.excerpt }}
              </p>
              <div class="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-gray-700">
                <span class="text-sm text-slate-500 dark:text-gray-400">
                  <i class="fas fa-calendar-alt mr-2"></i>
                  {{ work.date }}
                </span>
                <nuxt-link :to="work.link"
                  class="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium">
                  Читать <i class="fas fa-arrow-right ml-1"></i>
                </nuxt-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section
      class="py-16 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-8">
            Связаться со мной
          </h2>
          <p class="text-slate-600 dark:text-gray-300 mb-8">
            Для сотрудничества или творческих предложений, пожалуйста, свяжитесь
            со мной:
          </p>
          <a href="mailto:belaveda.keren@gmail.com"
            class="inline-flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <i class="far fa-envelope mr-2"></i>
            Написать письмо
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import authorBackground from "../assets/images/background.jpg";
import authorImage from "../assets/images/avatar2.jpeg";

// SEO: Page title and meta
useHead({
  title: 'Об авторе - Керен Виленская',
  meta: [
    {
      name: 'description',
      content: 'Керен Виленская - музыкант, режиссер и поэтесса. Узнайте больше о жизни и творчестве автора.'
    }
  ]
});

// Typewriter Effect
const authorQuote = "Музыкант • Режиссер • Поэтесса";
const displayedText = ref('');
const isTypingComplete = ref(false);

onMounted(() => {
  let index = 0;
  const typeSpeed = 80;

  const typeWriter = () => {
    if (index < authorQuote.length) {
      displayedText.value += authorQuote[index];
      index++;
      setTimeout(typeWriter, typeSpeed);
    } else {
      isTypingComplete.value = true;
    }
  };

  setTimeout(typeWriter, 500); // Start after small delay
});

// Floating Poetry Words
const floatingWords = ref([
  { text: 'любовь', x: 10, y: 20, delay: 0, duration: 20 },
  { text: 'душа', x: 70, y: 30, delay: 2, duration: 25 },
  { text: 'свет', x: 30, y: 60, delay: 4, duration: 22 },
  { text: 'мечта', x: 80, y: 70, delay: 1, duration: 23 },
  { text: 'поэзия', x: 50, y: 40, delay: 3, duration: 24 },
  { text: 'сердце', x: 20, y: 80, delay: 5, duration: 21 },
]);

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
/* Floating Words Animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }

  25% {
    transform: translateY(-30px) translateX(15px) rotate(2deg);
  }

  50% {
    transform: translateY(-20px) translateX(-10px) rotate(-1deg);
  }

  75% {
    transform: translateY(-40px) translateX(5px) rotate(1deg);
  }
}

.floating-word {
  animation: float linear infinite;
}

/* Typewriter Cursor */
@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.typing-cursor {
  animation: blink 1s infinite;
  color: rgb(251, 191, 36);
}

/* Breathing Glow */
@keyframes breathe {

  0%,
  100% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2);
  }

  50% {
    box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3);
  }
}

.breathing-glow {
  animation: breathe 4s ease-in-out infinite;
}

/* Ink Spread Effect */
.stat-card {
  position: relative;
}

.ink-spread {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out;
  pointer-events: none;
}

.stat-card:hover .ink-spread {
  width: 300px;
  height: 300px;
}

/* Staggered Fade-In for Works */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.work-card {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Enhanced Author Image */
.author-image {
  filter: brightness(110%) contrast(110%) saturate(100%) hue-rotate(5deg) drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.author-image:hover {
  transform: scale(1.05);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {

  .floating-word,
  .breathing-glow,
  .work-card {
    animation: none;
  }

  .typing-cursor {
    animation: none;
    opacity: 0;
  }

  .stat-card:hover .ink-spread {
    transition: none;
  }
}
</style>
