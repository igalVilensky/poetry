<template>
  <header class="bg-gray-900 text-white shadow-md">
    <div class="container mx-auto flex items-center justify-between py-4 px-6">
      <!-- Logo -->
      <div class="text-2xl font-bold">
        <a href="/" class="hover:text-yellow-500">Солнечные сказки</a>
      </div>

      <!-- Navigation Links -->
      <nav class="hidden md:flex space-x-6">
        <a href="/" class="text-lg hover:text-yellow-500">Главная</a>
        <!-- Home -->
        <a href="/poems" class="text-lg hover:text-yellow-500">Стихи</a>
        <!-- Poems -->
        <a href="/author" class="text-lg hover:text-yellow-500">Автор</a>
        <!-- Author (singular) -->
        <a href="/about" class="text-lg hover:text-yellow-500">О нас</a>
        <!-- About -->
        <a href="/contact" class="text-lg hover:text-yellow-500">Контакты</a>
        <!-- Contact -->
      </nav>

      <!-- Action Button -->
      <div>
        <a
          href="/subscribe"
          class="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400"
        >
          Подписаться
        </a>
      </div>
    </div>
  </header>
</template>

<script setup></script>
