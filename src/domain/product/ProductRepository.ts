import type { Product } from './Product'

/**
 * Repository contract for getting products
 */

export interface ProductRepository {
  getAll(): Promise<Product[]>
}
