import type { Product } from '../product/Product'

export interface CartItem {
  product: Product
  quantity: number
}
