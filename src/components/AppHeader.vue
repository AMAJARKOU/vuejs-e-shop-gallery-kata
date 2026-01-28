<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()
const emit = defineEmits(['toggle-cart'])

</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1>E-Shop Gallery</h1>

      <button class="cart-button" @click="emit('toggle-cart')">
        Cart ({{ cart.totalItems }})
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 2rem;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-button {
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    text-align: center;
  }

  h1 {
    font-size: 1.8rem;
  }

  .cart-button {
    width: 100%;
    max-width: 200px;
  }
}
</style>

