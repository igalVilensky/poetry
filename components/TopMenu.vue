<template>
  <header
    class="bg-gradient-to-b from-gray-900 to-gray-900/95 text-white border-b border-amber-800/20 shadow-lg"
  >
    <div class="container mx-auto flex items-center justify-between py-4 px-6">
      <!-- Logo -->
      <div class="text-2xl font-serif">
        <NuxtLink
          to="/"
          class="hover:text-amber-400 transition-colors duration-300 relative group"
        >
          Солнечные сказки
          <span
            class="absolute -bottom-1 left-0 w-full h-px bg-amber-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          ></span>
        </NuxtLink>
      </div>

      <!-- Hamburger Icon (Mobile) -->
      <button
        class="block md:hidden text-xl hover:text-amber-400 transition-colors duration-300"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
      >
        <i class="fas" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>

      <!-- Navigation Links -->
      <nav
        class="absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900/95 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent p-4 md:p-0 md:flex space-y-4 md:space-y-0 md:space-x-6 z-50 transform transition-all duration-300 ease-in-out shadow-lg md:shadow-none"
        :class="[
          menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-5 pointer-events-none',
          'md:opacity-100 md:translate-y-0 md:pointer-events-auto',
        ]"
      >
        <!-- Links -->
        <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          :to="link.href"
          class="text-lg hover:text-amber-400 block md:inline transition-colors duration-300 relative group"
          exact-active-class="text-amber-400"
        >
          {{ link.text }}
          <span
            class="absolute -bottom-1 left-0 w-full h-px bg-amber-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 hidden md:block"
            :class="{ 'scale-x-100': $route.path === link.href }"
          ></span>
        </NuxtLink>

        <!-- Search Bar for Mobile -->
        <div class="block md:hidden">
          <div
            class="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2 focus-within:ring-1 focus-within:ring-amber-500/50 transition duration-300"
          >
            <i class="fas fa-search text-gray-400"></i>
            <input
              type="text"
              placeholder="Поиск..."
              class="w-full bg-transparent placeholder-gray-400 focus:outline-none text-white"
            />
          </div>
        </div>
      </nav>

      <!-- Search Bar for Desktop -->
      <div
        class="hidden md:flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2 focus-within:ring-1 focus-within:ring-amber-500/50 transition duration-300"
      >
        <i class="fas fa-search text-gray-400"></i>
        <input
          type="text"
          placeholder="Поиск..."
          class="bg-transparent placeholder-gray-400 focus:outline-none text-white w-48 md:w-64 transition-all duration-300"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);
const links = [
  { text: "Главная", href: "/" },
  { text: "Стихи", href: "/poems" },
  { text: "Автор", href: "/author" },
  { text: "О нас", href: "/about" },
  { text: "Контакты", href: "/contact" },
];

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
