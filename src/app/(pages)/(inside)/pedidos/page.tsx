'use client'

import { Order } from '@/@types/Order'
import { OrderStatus } from '@/@types/OrderStatus'
import { OrderItem } from '@/components/OrderItem'
import { api } from '@/libs/api'
import { dateFormat } from '@/utils/date-format'
import { Refresh, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function PedidosPage() {
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [printOrder, setPrintOrder] = useState<Order | null>(null)

  const getOrders = async () => {
    setSearchInput('')

    setIsLoading(true)
    const orderList: Order[] = await api.getOrders()
    setOrders(orderList)
    setIsLoading(false)
  }

  const handleSearchKey = (e: any) => {
    const event = e as KeyboardEvent
    if (
      event.code.toLowerCase() === 'enter' ||
      event.code.toLowerCase() === 'numpadenter'
    ) {
      console.log('clicou')
      if (searchInput !== '') {
        const newOrders: Order[] = []

        for (const i in orders) {
          if (orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i])
          }
        }

        setFilteredOrders(newOrders)
      } else {
        setFilteredOrders(orders)
      }
    }
  }

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus)
    getOrders()
  }

  const handlePrint = (order: Order) => {
    setPrintOrder(order)
  }

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    setSearchInput('')
    setFilteredOrders(orders)
  }, [orders])

  useEffect(() => {
    printOrder && window.print()
  }, [printOrder])

  return (
    <>
      <Box sx={{ my: 3, displayPrint: 'none' }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItens: 'center' }}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ color: '#555', mr: 2 }}
            >
              Pedidos
            </Typography>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Button
                sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}
                size="small"
                onClick={getOrders}
              >
                <Refresh />
                <Typography
                  component="div"
                  sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}
                >
                  Atualizar
                </Typography>
              </Button>
            )}
          </Box>
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKey}
            placeholder="Pesquise um pedido"
            variant="standard"
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
          {isLoading && (
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
            </>
          )}
          {!isLoading &&
            filteredOrders.map((order) => (
              <Grid item xs={1} key={order.id}>
                <OrderItem
                  orderDelivery={order}
                  onChangeStatus={handleChangeStatus}
                  onPrint={handlePrint}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'none', displayPrint: 'block' }}>
        {printOrder && (
          <>
            <Typography component="h5" variant="h5">
              Pedido
            </Typography>
            <Box>ID: #{printOrder.id}</Box>
            <Box>Data do pedido: {dateFormat(printOrder.orderDate)}</Box>
            <Box>Cliente: {printOrder.userName}</Box>

            <Typography component="h5" variant="h5">
              Pagamento
            </Typography>
            <Box>
              Tipo de Pagamento: #
              {printOrder.paymentMethod === 'card' ? 'Cartão' : 'Dinheiro'}
            </Box>
            <Box>Subtotal: R$: {printOrder.subtotal.toFixed(2)}</Box>
            <Box>Entrega: R$: {printOrder.shippingPrice.toFixed(2)}</Box>
            {printOrder.cupomDiscount && (
              <Box>Desconto: -R$ {printOrder.cupomDiscount.toFixed(2)}</Box>
            )}
            <Box>Total: R$: {printOrder.total.toFixed(2)}</Box>

            <Typography component="h5" variant="h5">
              Endereço
            </Typography>
            <Box>Rua: {printOrder.shippingAddress.street}</Box>
            <Box>Número: {printOrder.shippingAddress.number}</Box>
            <Box>Complemento: {printOrder.shippingAddress.complement}</Box>
            <Box>Cep: {printOrder.shippingAddress.cep}</Box>
            <Box>Bairro: {printOrder.shippingAddress.district}</Box>
            <Box>Cidade: {printOrder.shippingAddress.city}</Box>
            <Box>Estado: {printOrder.shippingAddress.state}</Box>

            <Typography component="h5" variant="h5">
              Items
            </Typography>
            {printOrder.products.map((productItem, index) => (
              <Box key={`${productItem.product.id}${index}`}>
                {productItem.quantity}x {productItem.product.productName}
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  )
}
