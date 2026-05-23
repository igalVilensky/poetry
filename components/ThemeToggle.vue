<template>
  <button
    @click="toggleTheme"
    class="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
    :class="theme === 'dark'
      ? 'border-slate-600 bg-slate-800 text-stone-400 shadow-none hover:border-stone-500 hover:text-stone-200'
      : 'border-amber-200 bg-amber-50 text-amber-700 shadow-sm shadow-amber-200/70 hover:border-amber-300 hover:bg-amber-100'"
    :aria-label="theme === 'dark' ? 'Зажечь лампу' : 'Приглушить свет'"
    :title="theme === 'dark' ? 'Зажечь лампу' : 'Приглушить свет'"
  >
    <span
      aria-hidden="true"
      class="absolute inset-1 rounded-full bg-amber-300/45 blur-md transition-all duration-300"
      :class="theme === 'light' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'"
    ></span>

    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      class="relative h-6 w-6 transition-all duration-300"
      :class="theme === 'light' ? 'scale-100 drop-shadow-sm' : 'scale-95'"
    >
      <path
        d="M18 10h16l4 10H14l4-10Z"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linejoin="round"
        class="transition-colors duration-300"
        :class="theme === 'light' ? 'fill-amber-200/80' : 'fill-slate-700/80'"
      />
      <path
        d="M25 20v12"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path
        d="M18 38h14"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path
        d="M21 38c.5-3.2 1.8-5.6 4-5.6s3.5 2.4 4 5.6"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.5 23.5h13"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        class="transition-opacity duration-300"
        :class="theme === 'light' ? 'opacity-80' : 'opacity-35'"
      />
      <path
        d="M17 24l-3 6M33 24l3 6"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        class="transition-opacity duration-300"
        :class="theme === 'light' ? 'opacity-50' : 'opacity-0'"
      />
      <path
        d="M20 25h10"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        class="transition-colors duration-300"
        :class="theme === 'light' ? 'text-amber-300 opacity-90' : 'text-slate-600 opacity-35'"
      />
    </svg>

    <span class="sr-only">
      {{ theme === 'dark' ? 'Зажечь лампу' : 'Приглушить свет' }}
    </span>
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme();
</script>
