<script setup>
import StudentLists from '../components/StudentLists.vue'
</script>

<template>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
    <div class="col-span-8">
      <StudentLists />
    </div>
    <div class="col-span-4">
      Side bar
    </div>
  </div>
  
</template>
