import { Order } from '@/@types/Order'

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
  getOrders: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders: Order[] = []

        resolve(orders)
      }, 1000)
    })
  },
}
