import type { Product } from '../../domain/product/Product'
import type { ProductRepository } from '../../domain/product/ProductRepository'

export class FakeStoreProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products')

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()

    // We only extract fields needed by the Kata app 
    
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }))
  }
}
