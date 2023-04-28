import { Order } from '@/@types/Order'
import { Box, BoxProps } from '@mui/material'
import React from 'react'

interface IOrderItem extends BoxProps {
  order: Order
}

export const OrderItem = ({ order, ...props }: IOrderItem) => {
  // const { } = order
  return (
    <>
      <Box {...props}>...</Box>
    </>
  )
}
