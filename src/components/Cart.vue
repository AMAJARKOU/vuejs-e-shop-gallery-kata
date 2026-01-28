<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()
</script>

<template>
    <section class="cart">
        <h2>Your Cart</h2>

        <p v-if="cart.items.length === 0">
            Your cart is empty
        </p>

        <ul v-else>
            <li v-for="item in cart.items" :key="item.product.id" class="cart-item">
                <div class="info">
                    <strong>{{ item.product.title }}</strong>
                    <span>{{ item.product.price }} €</span>
                </div>

                <div class="actions">
                    <button class="qty-btn" @click="cart.decreaseQuantity(item.product.id)"
                        :disabled="item.quantity === 1">
                        -
                    </button>

                    <span class="qty">{{ item.quantity }}</span>

                    <button class="qty-btn" @click="cart.increaseQuantity(item.product.id)">
                        +
                    </button>

                    <button class="remove-btn" @click="cart.removeFromCart(item.product.id)">
                        x
                    </button>
                </div>

            </li>
        </ul>

        <div v-if="cart.items.length" class="total">
            Total: <strong>{{ cart.totalPrice.toFixed(2) }} €</strong>
        </div>
    </section>
</template>

<style scoped>
.cart {
    margin-bottom: 3rem;
    padding-top: 2rem;
    border-bottom: 1px solid #eaeaea;
}

ul {
    list-style: none;
    padding: 0;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.9rem;
}

.actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.qty {
    min-width: 20px;
    text-align: center;
}

.qty-btn,
.remove-btn {
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
}

.remove-btn {
    margin-left: 0.5rem;
}

.total {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
}

@media (max-width: 600px) {
    .cart-item {
        flex-direction: column;
        align-items: stretch;
    }

    .actions {
        justify-content: center;
        margin-top: 0.5rem;
    }

    .info {
        text-align: center;
    }
}
</style>
