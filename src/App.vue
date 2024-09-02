<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

import logo from '@/assets/images/Soft Finding Logo.png'

const route = useRoute();

function getLinkClass(routeName) {
  const baseClasses = "font-poppins text-md font-medium hover:text-blue-600";
  const activeClasses = "text-blue-600";

  return route.name === routeName ? `${baseClasses} ${activeClasses}` : baseClasses;
}
</script>

<template>
  <header class="border-b py-3">

    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        <div class="w-28">
          <RouterLink to="/">
            <img :src="logo" alt="Soft Finding">
          </RouterLink>
        </div>
        <nav class="flex items-center gap-8">
          <RouterLink :to="{ name: 'home' }" :class="getLinkClass('home')">Home</RouterLink>
          <RouterLink :to="{ name: 'add' }" :class="getLinkClass('add')">Add new</RouterLink>
          <RouterLink :to="{ name: 'blog' }" :class="getLinkClass('blog')">Blog Page</RouterLink>
        </nav>
      </div>
    </div>

  </header>

  <main class="my-4">
    <div class="container mx-auto px-6">
      <RouterView />
    </div>
  </main>
</template>
