import { Order } from '@/@types/Order'
import { OrderStatus } from '@/@types/OrderStatus'
import { Box, BoxProps, Button, Typography } from '@mui/material'
import React from 'react'

interface IOrderItem extends BoxProps {
  order: Order
}

export const OrderItem = ({ order, ...props }: IOrderItem) => {
  const {
    id,
    orderDate,
    paymentMethod,
    products,
    shippingAddress,
    shippingPrice,
    status,
    subtotal,
    total,
    userId,
    cashAdvanceValue,
    cupom,
    cupomDiscount,
    userName,
  } = order

  const getStatusBackground = (status: OrderStatus) => {
    const statuses = {
      preparing: '#2787BA',
      sent: '#27BA3A',
      delivered: '#999999',
    }

    return statuses[status]
  }
  return (
    <>
      <Box
        {...props}
        sx={{
          border: '1px solid #eee',
          color: '#FFF',
          borderRadius: 2,
          overflow: 'hidden',
          ...props.sx,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            backgroundColor: getStatusBackground(status),
          }}
        >
          <Box>
            <Typography component="p">{orderDate}</Typography>
            <Typography component="p">{userName}</Typography>
            <Button size="small" sx={{ color: '#FFF', p: 0 }}>
              Imprimir
            </Button>
          </Box>
          <Box>
            <Typography component="p" sx={{ fontSize: 24 }}>
              #{id}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
