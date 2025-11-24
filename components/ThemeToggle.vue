<template>
  <button
    @click="toggleTheme"
    class="relative p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden group"
    :class="theme === 'dark' ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-600'"
    aria-label="Toggle Theme"
  >
    <!-- Candle (Light Mode) -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-all duration-500 transform"
      :class="theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M12.75 3.038c.46.33.75.87.75 1.462 0 .913-.737 1.65-1.65 1.65-.913 0-1.65-.737-1.65-1.65 0-.592.29-1.132.75-1.462.46-.33 1.05-.538 1.65-.538.6 0 1.19.208 1.65.538zM12 7.5a4.5 4.5 0 00-4.5 4.5v7.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V12A4.5 4.5 0 0012 7.5z"
          clip-rule="evenodd"
        />
        <path
          d="M12 1.5a.75.75 0 01.75.75c0 .26-.135.49-.34.626a2.25 2.25 0 00-1.57 2.064.75.75 0 01-1.5 0 3.75 3.75 0 012.66-3.44A.75.75 0 0112 1.5z"
          class="text-orange-500 animate-pulse"
        />
      </svg>
    </div>

    <!-- Lantern (Dark Mode) -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-all duration-500 transform"
      :class="theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25a.75.75 0 01.75.75v.89l1.44 1.44h2.06a.75.75 0 01.6.3l2.25 3a.75.75 0 010 .9l-2.25 3a.75.75 0 01-.6.3h-7.5a.75.75 0 01-.6-.3l-2.25-3a.75.75 0 010-.9l2.25-3a.75.75 0 01.6-.3h2.06l1.44-1.44V3a.75.75 0 01.75-.75zM9.69 6.75l-1.125 1.5h6.87l-1.125-1.5h-4.62zM12 16.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z"
          clip-rule="evenodd"
        />
        <path
          d="M12 12a3 3 0 100 6 3 3 0 000-6z"
          class="text-yellow-200 animate-pulse"
        />
      </svg>
    </div>
    
    <!-- Invisible placeholder to set size -->
    <div class="w-6 h-6 opacity-0"></div>
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme();
</script>
