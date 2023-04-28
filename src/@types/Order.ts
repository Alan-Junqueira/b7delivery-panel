import { OrderStatus } from './OrderStatus'
import { CartItem } from './CartItem'
import { Address } from './Address'

export interface Order {
  id: number
  status: OrderStatus
  orderDate: string
  userId: string
  userName?: string
  shippingAddress: Address
  shippingPrice: number
  paymentMethod: 'card' | 'money'
  cashAdvanceValue?: number
  cupom?: string
  cupomDiscount?: number
  products: CartItem[]
  subtotal: number
  total: number
}
