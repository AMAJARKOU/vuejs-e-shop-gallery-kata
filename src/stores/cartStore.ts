import { defineStore } from 'pinia'
import type { Product } from '../domain/product/Product'
import type { CartItem } from '../domain/cart/CartItem'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
    }),

    getters: {
        totalItems: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),

        totalPrice: (state) =>
            state.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ),
    },

    actions: {
        addToCart(product: Product) {
            console.log('____ addToCart');

            const existing = this.items.find(
                (item) => item.product.id === product.id
            )

            if (existing) {
                existing.quantity++
            } else {
                this.items.push({ product, quantity: 1 })
            }
        },

        removeFromCart(productId: number) {
            this.items = this.items.filter(
                (item) => item.product.id !== productId
            )
        },

        updateQuantity(productId: number, quantity: number) {
            const item = this.items.find(
                (item) => item.product.id === productId
            )
            if (!item) return

            if (quantity <= 0) {
                this.removeFromCart(productId)
            } else {
                item.quantity = quantity
            }
        },

        increaseQuantity(productId: number) {
            const item = this.items.find(i => i.product.id === productId)
            if (!item) return

            item.quantity++
        },

        decreaseQuantity(productId: number) {
            const item = this.items.find(i => i.product.id === productId)
            if (!item) return

            if (item.quantity > 1) {
                item.quantity--
            }
        },


        clearCart() {
            this.items = []
        },
    },
})
