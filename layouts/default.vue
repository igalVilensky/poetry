<template>
  <div class="flex flex-col min-h-screen">
    <!-- Fixed TopMenu -->
    <TopMenu />

    <!-- Page Content (Main Content) with padding for fixed header -->
    <main class="flex-1 pt-[72px]">
      <NuxtPage />
    </main>

    <!-- Footer - mt-auto ensures it sticks to bottom on short pages -->
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import TopMenu from "@/components/TopMenu.vue";
import Footer from "@/components/Footer.vue";
</script>
