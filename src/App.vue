<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  padding: 0 2rem;
}
</style>

