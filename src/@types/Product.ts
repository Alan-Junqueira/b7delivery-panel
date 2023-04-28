import { Category } from './Category'

export interface Product {
  id: number
  image: string
  category: Category
  productName: string
  price: number
  description?: string
}
