<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-6">
      <!-- Footer top section (links and info) -->
      <div class="flex flex-wrap justify-between mb-8">
        <!-- About Section -->
        <div class="w-full md:w-1/3 mb-6">
          <h3 class="text-xl font-bold mb-4">О нас</h3>
          <p class="text-gray-400">
            Добро пожаловать на сайт Солнечные сказки — место, где поэзия
            оживает и вдохновляет на новые идеи.
          </p>
        </div>

        <!-- Quick Links Section -->
        <div class="w-full md:w-1/3 mb-6">
          <h3 class="text-xl font-bold mb-4">Быстрые ссылки</h3>
          <ul class="space-y-2">
            <li>
              <a href="/" class="text-gray-400 hover:text-yellow-500"
                >Главная</a
              >
            </li>
            <li>
              <a href="/poems" class="text-gray-400 hover:text-yellow-500"
                >Стихи</a
              >
            </li>
            <li>
              <a href="/author" class="text-gray-400 hover:text-yellow-500"
                >Автор</a
              >
            </li>
            <li>
              <a href="/about" class="text-gray-400 hover:text-yellow-500"
                >О нас</a
              >
            </li>
            <li>
              <a href="/contact" class="text-gray-400 hover:text-yellow-500"
                >Контакты</a
              >
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div class="w-full md:w-1/3 mb-6">
          <h3 class="text-xl font-bold mb-4">Следите за нами</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-yellow-500">
              <i class="fab fa-facebook-f"></i>
              <!-- Example icon -->
            </a>
            <a href="#" class="text-gray-400 hover:text-yellow-500">
              <i class="fab fa-twitter"></i>
              <!-- Example icon -->
            </a>
            <a href="#" class="text-gray-400 hover:text-yellow-500">
              <i class="fab fa-instagram"></i>
              <!-- Example icon -->
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Section (Copyright) -->
      <div class="text-center text-gray-400">
        <p>&copy; 2024 Солнечные сказки. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// You can add any required JavaScript here if needed, for example, for social media icons.
</script>
