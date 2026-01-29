import { defineStore } from 'pinia'
import type { Product } from '../domain/product/Product'
import type { CartItem } from '../domain/cart/CartItem'

const DISCOUNT_THRESHOLD = 1000
const DISCOUNT_RATE = 0.1
const CART_STORAGE_KEY = 'e-shop-cart'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]') as CartItem[],
    }),

    getters: {
        totalItems: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),

        totalPrice: (state) =>
            state.items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ),

        hasDiscount(): boolean {
            return this.totalPrice >= DISCOUNT_THRESHOLD
        },

        discountAmount(): number {
            return this.hasDiscount ? this.totalPrice * DISCOUNT_RATE : 0
        },

        totalWithDiscount(): number {
            return this.totalPrice - this.discountAmount
        },
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
            
            this.persistCart()
        },

        removeFromCart(productId: number) {
            this.items = this.items.filter(
                (item) => item.product.id !== productId
            )

            this.persistCart()
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
                this.persistCart()
            }
        },

        increaseQuantity(productId: number) {
            const item = this.items.find(i => i.product.id === productId)
            if (!item) return

            item.quantity++
            this.persistCart()
        },

        decreaseQuantity(productId: number) {
            const item = this.items.find(i => i.product.id === productId)
            if (!item) return

            if (item.quantity > 1) {
                item.quantity--
                this.persistCart()
            }
        },

        clearCart() {
            this.items = []
            this.persistCart()
        },

        persistCart() {
            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(this.items)
            )
        },
    },
})
