<script setup lang="ts">
import ProductList from './components/ProductList.vue';
import AppHeader from './components/AppHeader.vue';

</script>

<template>
  <AppHeader />
  <main class="container">
    <ProductList />
  </main>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>

