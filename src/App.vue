<script setup lang="ts">
import ProductList from './components/ProductList.vue';
import AppHeader from './components/AppHeader.vue';
import Cart from './components/Cart.vue';
import { ref } from 'vue';

const showCart = ref(false)

</script>

<template>
  <AppHeader @toggle-cart="showCart = !showCart" />
  <main class="container">
    <Cart v-if="showCart" />
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

