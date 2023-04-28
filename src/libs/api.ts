import { Order } from '@/@types/Order'
import { OrderStatus } from '@/@types/OrderStatus'
import { Product } from '@/@types/Product'

const TEMP_PRODUCT: Product = {
  id: 999,
  image:
    'https://img.freepik.com/fotos-gratis/hamburguer-duplo-isolado-no-fundo-branco-hamburguer-fresco-fast-food-com-carne-e-queijo-creme_90220-1192.jpg',
  category: {
    id: 99,
    name: 'Hamburger',
  },
  productName: 'Burgão Boladão',
  price: 35.5,
  description: 'Um burgão boladão muito legal',
}

export const api = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ error: string; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== 'suporte@b7web.com.br') {
          resolve({
            error: 'E-mail e/ou senha não batem',
          })
        } else {
          resolve({
            error: '',
            token: '123',
          })
        }
      }, 1000)
    })
  },
  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: '' })
      }, 1000)
    })
  },
  redefinePassword: async (
    password: string,
    token: string,
  ): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: '' })
      }, 1000)
    })
  },
  getOrders: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders: Order[] = []
        const statuses: OrderStatus[] = ['preparing', 'delivered', 'sent']

        for (let i = 0; i < 6; i++) {
          orders.push({
            id: parseInt('12' + i),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            orderDate: '2023-01-03 18:30',
            userId: '1',
            userName: 'Pedro',
            shippingAddress: {
              id: 99,
              cep: '9999999',
              street: 'Rua do Sol',
              number: '1200',
              district: 'Boa Viagem',
              city: 'São Paulo',
              state: 'SP',
              complement: 'aaaa',
            },
            shippingPrice: 12,
            paymentMethod: 'card',
            cashAdvanceValue: 0,
            cupom: 'BLA',
            cupomDiscount: 2,
            products: [
              { quantity: 2, product: TEMP_PRODUCT },
              {
                quantity: 3,
                product: {
                  ...TEMP_PRODUCT,
                  id: 123,
                  productName: 'Burger Vegetariano',
                },
              },
            ],
            subtotal: 99,
            total: 120,
          })
        }

        resolve(orders)
      }, 1000)
    })
  },
}
