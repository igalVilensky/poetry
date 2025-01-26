<template>
  <footer
    class="bg-gradient-to-b from-gray-900 to-gray-900/95 text-white border-t border-amber-800/20"
  >
    <div class="container mx-auto px-6 py-12">
      <!-- Decorative Separator -->
      <div class="flex items-center justify-center mb-12">
        <div class="h-px w-16 bg-amber-500/30"></div>
        <i class="fas fa-feather-alt mx-4 text-amber-500/50"></i>
        <div class="h-px w-16 bg-amber-500/30"></div>
      </div>

      <!-- Footer top section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- About Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-serif font-medium text-amber-400">О нас</h3>
          <p class="text-gray-300 leading-relaxed">
            Добро пожаловать на сайт Солнечные сказки — место, где поэзия
            оживает и вдохновляет на новые идеи.
          </p>
          <!-- Newsletter Signup -->
          <div class="pt-4">
            <h4 class="text-sm font-medium text-amber-400 mb-2">
              Подпишитесь на нашу рассылку
            </h4>
            <div class="flex">
              <input
                type="email"
                placeholder="Ваш email..."
                class="bg-gray-800/50 text-sm rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              />
              <button
                class="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 rounded-r-lg transition-colors duration-300 cursor-pointer"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-serif font-medium text-amber-400">
            Навигация
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group cursor-pointer"
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
          <h3 class="text-xl font-serif font-medium text-amber-400">
            Новые стихи
          </h3>
          <ul class="space-y-3">
            <li v-for="poem in recentPoems" :key="poem.id">
              <NuxtLink
                :to="`/poems/${poem.slug.current}`"
                class="group cursor-pointer"
              >
                <p
                  class="text-gray-300 group-hover:text-amber-400 transition-colors duration-300"
                >
                  {{ poem.title }}
                </p>
                <p class="text-sm text-gray-400">
                  {{ poem.date }}
                </p>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Social Section -->
        <div class="space-y-4">
          <h3 class="text-xl font-serif font-medium text-amber-400">
            Контакты
          </h3>
          <div class="space-y-2 text-gray-300">
            <p class="flex items-center">
              <i class="fas fa-envelope w-5 text-amber-500/50"></i>
              <a
                href="mailto:belaveda.keren@gmail.com"
                class="ml-2 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
              >
                belaveda.keren@gmail.com
              </a>
            </p>
            <!-- <p class="flex items-center">
              <i class="fas fa-phone w-5 text-amber-500/50"></i>
              <a
                href="tel:+1234567890"
                class="ml-2 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
              >
                +1 (234) 567-890
              </a>
            </p> -->
          </div>

          <!-- Social Media Links -->
          <div class="pt-4">
            <h4 class="text-sm font-medium text-amber-400 mb-3">
              Следите за нами
            </h4>
            <div class="flex space-x-4">
              <a
                v-for="social in socialLinks"
                :key="social.platform"
                :href="social.url"
                :aria-label="social.platform"
                class="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-amber-500/20 text-gray-300 hover:text-amber-400 transition-all duration-300 cursor-pointer"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-8 border-t border-gray-800">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} Солнечные сказки. Все права
            защищены.
          </p>
          <!-- Bottom Links -->
          <div class="flex space-x-6 text-sm">
            <NuxtLink
              to="/privacy"
              class="text-gray-400 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
            >
              Конфиденциальность
            </NuxtLink>
            <NuxtLink
              to="/terms"
              class="text-gray-400 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
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
  { text: "Автор", href: "/author" },
];

const socialLinks = [
  { platform: "Facebook", icon: "fab fa-facebook-f", url: "#" },
  { platform: "Twitter", icon: "fab fa-twitter", url: "#" },
  { platform: "Instagram", icon: "fab fa-instagram", url: "#" },
  { platform: "Telegram", icon: "fab fa-telegram", url: "#" },
];
</script>
