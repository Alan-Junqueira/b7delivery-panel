import { Order } from '@/@types/Order'
import { OrderStatus } from '@/@types/OrderStatus'
import { dateFormat } from '@/utils/date-format'
import { BorderBottom } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React from 'react'

interface IOrderItem extends BoxProps {
  orderDelivery: Order
  onChangeStatus: (id: number, newStatus: OrderStatus) => void
  onPrint: (order: Order) => void
}

export const OrderItem = ({
  orderDelivery,
  onChangeStatus,
  onPrint,
  ...props
}: IOrderItem) => {
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
  } = orderDelivery

  const getStatusBackground = (status: OrderStatus) => {
    const statuses = {
      preparing: '#2787BA',
      sent: '#27BA3A',
      delivered: '#999999',
    }

    return statuses[status]
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    onChangeStatus(id, event.target.value as OrderStatus)
  }

  const handlePrint = () => {
    onPrint(orderDelivery)
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
            <Typography component="p">{dateFormat(orderDate)}</Typography>
            <Typography component="p">{userName}</Typography>
            <Button
              size="small"
              sx={{ color: '#FFF', p: 0 }}
              onClick={handlePrint}
            >
              Imprimir
            </Button>
          </Box>
          <Box>
            <Typography component="p" sx={{ fontSize: 24 }}>
              #{id}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: '#EEE', p: 1 }}>
          <Select
            variant="standard"
            value={status}
            fullWidth
            onChange={handleStatusChange}
          >
            <MenuItem value="preparing">Preparando</MenuItem>
            <MenuItem value="sent">Enviado</MenuItem>
            <MenuItem value="delivered">Entregue</MenuItem>
          </Select>
        </Box>
        <Box sx={{ p: 1, backgroundColor: '#FFF' }}>
          {products.map((productItem, index) => (
            <Typography
              sx={{
                p: 1,
                color: '#000',
                fontWeight: 'bold',
                borderBottom: '1px solid #CCC',
              }}
              component="p"
              key={index}
            >{`${productItem.quantity}x ${productItem.product.productName}`}</Typography>
          ))}
        </Box>
      </Box>
    </>
  )
}
