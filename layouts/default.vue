<template>
  <div class="flex flex-col min-h-screen">
    <!-- TopBar -->
    <TopMenu />

    <!-- Page Content (Main Content) -->
    <main>
      <NuxtPage class="flex-grow" />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import TopMenu from "@/components/TopMenu.vue";
import Footer from "@/components/Footer.vue";
</script>
