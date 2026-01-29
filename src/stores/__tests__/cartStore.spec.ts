import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cartStore'

describe('cartStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('starts with an empty cart', () => {
        const cart = useCartStore()

        expect(cart.items.length).toBe(0)
        expect(cart.totalItems).toBe(0)
        expect(cart.totalPrice).toBe(0)
    })

    it('adds a product to the cart', () => {
        const cart = useCartStore()

        const product = {
            id: 1,
            title: 'Test product',
            price: 50,
        } as any

        cart.addToCart(product)

        expect(cart.items.length).toBe(1)
        expect(cart.totalItems).toBe(1)
        expect(cart.totalPrice).toBe(50)
    })

    it('increases quantity when adding same product twice', () => {
        const cart = useCartStore()

        const product = {
            id: 1,
            title: 'Test product',
            price: 50,
        } as any

        cart.addToCart(product)
        cart.addToCart(product)

        expect(cart.items[0].quantity).toBe(2)
        expect(cart.totalItems).toBe(2)
    })

    it('does not apply discount when total is below threshold', () => {
        const cart = useCartStore()

        const product = {
            id: 1,
            title: 'Cheap product',
            price: 999,
        } as any

        cart.addToCart(product)

        expect(cart.hasDiscount).toBe(false)
        expect(cart.discountAmount).toBe(0)
        expect(cart.totalWithDiscount).toBe(999)
    })

    it('applies 10% discount when total reaches 1000 €', () => {
        const cart = useCartStore()

        const product = {
            id: 1,
            title: 'Very expensive product',
            price: 1000,
        } as any

        cart.addToCart(product)

        expect(cart.totalPrice).toBe(1000)
        expect(cart.hasDiscount).toBe(true)
        expect(cart.discountAmount).toBe(100)
        expect(cart.totalWithDiscount).toBe(900)
    })
})
