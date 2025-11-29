<template>
  <footer
    class="bg-slate-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-900/95 text-slate-900 dark:text-white border-t border-amber-500/10 dark:border-amber-800/20 transition-colors duration-300"
  >
    <div class="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Decorative Separator -->
      <div class="flex items-center justify-center mb-8 sm:mb-12">
        <div class="h-px w-12 sm:w-16 bg-amber-500/30"></div>
        <i
          class="fas fa-feather-alt mx-3 sm:mx-4 text-amber-600/50 dark:text-amber-500/50 text-sm sm:text-base"
        ></i>
        <div class="h-px w-12 sm:w-16 bg-amber-500/30"></div>
      </div>

      <!-- Footer top section -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12"
      >
        <!-- About Section -->
        <div class="space-y-4 lg:col-span-2 xl:col-span-1">
          <h3
            class="text-lg sm:text-xl font-serif font-medium text-amber-600 dark:text-amber-400"
          >
            О нас
          </h3>
          <p
            class="text-slate-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base"
          >
            Добро пожаловать на сайт Солнечные сказки — место, где поэзия
            оживает и вдохновляет на новые идеи.
          </p>
          <!-- Newsletter Signup -->
          <div class="pt-4">
            <h4
              class="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2"
            >
              Подпишитесь на нашу рассылку
            </h4>
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Ваш email..."
                class="bg-white dark:bg-gray-800/50 text-slate-900 dark:text-white text-sm rounded-lg sm:rounded-l-lg sm:rounded-r-none px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-500/50 border border-slate-200 dark:border-transparent"
              />
              <button
                class="bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors duration-300 cursor-pointer border border-amber-500/20 dark:border-transparent sm:border-l-0"
              >
                <i class="fas fa-paper-plane"></i>
                <span class="sm:hidden ml-2">Подписаться</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div class="space-y-4">
          <h3
            class="text-lg sm:text-xl font-serif font-medium text-amber-600 dark:text-amber-400"
          >
            Навигация
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="text-slate-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 flex items-center group cursor-pointer text-sm sm:text-base"
              >
                <span
                  class="w-1.5 h-1.5 bg-amber-500/50 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"
                ></span>
                {{ link.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Recent Poems Section -->
        <div class="space-y-4">
          <h3
            class="text-lg sm:text-xl font-serif font-medium text-amber-600 dark:text-amber-400"
          >
            Новые стихи
          </h3>
          <ul class="space-y-3">
            <li v-for="poem in recentPoems" :key="poem.id">
              <NuxtLink
                :to="`/poems/${poem.slug.current}`"
                class="group cursor-pointer"
              >
                <p
                  class="text-slate-600 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base line-clamp-1"
                >
                  {{ poem.title }}
                </p>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                  {{ poem.date }}
                </p>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Social Section -->
        <div class="space-y-4">
          <h3
            class="text-lg sm:text-xl font-serif font-medium text-amber-600 dark:text-amber-400"
          >
            Контакты
          </h3>
          <div class="space-y-2 text-slate-600 dark:text-gray-300">
            <p class="flex items-center text-sm sm:text-base">
              <i
                class="fas fa-envelope w-5 text-amber-600/50 dark:text-amber-500/50"
              ></i>
              <a
                href="mailto:belaveda.keren@gmail.com"
                class="ml-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 cursor-pointer break-all"
              >
                belaveda.keren@gmail.com
              </a>
            </p>
          </div>

          <!-- Social Media Links -->
          <div class="pt-4">
            <h4
              class="text-sm font-medium text-amber-600 dark:text-amber-400 mb-3"
            >
              Следите за нами
            </h4>
            <div class="flex flex-wrap gap-2 sm:gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.platform"
                :href="social.url"
                :aria-label="social.platform"
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-800/50 flex items-center justify-center hover:bg-amber-500/20 text-slate-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 cursor-pointer border border-slate-200 dark:border-transparent text-sm sm:text-base"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-6 sm:pt-8 border-t border-slate-200 dark:border-gray-800">
        <div
          class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left"
        >
          <p class="text-slate-500 dark:text-gray-400 text-xs sm:text-sm">
            &copy; {{ new Date().getFullYear() }} Солнечные сказки. Все права
            защищены.
          </p>
          <!-- Bottom Links -->
          <div class="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <NuxtLink
              to="/privacy"
              class="text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 cursor-pointer"
            >
              Конфиденциальность
            </NuxtLink>
            <NuxtLink
              to="/terms"
              class="text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 cursor-pointer"
            >
              Условия использования
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { usePoems } from "~/composables/usePoems";

// Use the shared state
const { recentPoems } = usePoems();

const quickLinks = [
  { text: "Главная", href: "/" },
  { text: "Стихи", href: "/poems" },
  { text: "Музыка", href: "/music" },
];

const socialLinks = [
  { platform: "Facebook", icon: "fab fa-facebook-f", url: "#" },
  { platform: "Twitter", icon: "fab fa-twitter", url: "#" },
  { platform: "Instagram", icon: "fab fa-instagram", url: "#" },
  { platform: "Telegram", icon: "fab fa-telegram", url: "#" },
];
</script>
