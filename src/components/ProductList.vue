<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Product } from '../domain/product/Product'
import { FakeStoreProductRepository } from '../infrastructure/product/FakeStoreProductRepository'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref(false)

const repository = new FakeStoreProductRepository()

onMounted(async () => {
  try {
    products.value = await repository.getAll()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>Products</h2>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Failed to load products.</p>

    <div v-else class="product-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.title" />
        </div>

        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p class="price">{{ product.price }} €</p>
        </div>

        <button>Add to Cart</button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

/* fixer la zone image */
.product-image {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.product-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-info {
  flex-grow: 1;
}

.product-card h3 {
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
}

/* limiter le titre à 2 lignes */
.product-card h3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  font-weight: bold;
  margin: 0 0 1rem;
}

</style>
