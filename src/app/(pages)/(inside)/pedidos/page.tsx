'use client'

import { Order } from '@/@types/Order'
import { OrderItem } from '@/components/OrderItem'
import { api } from '@/libs/api'
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

  const getOrders = async () => {
    setSearchInput('')

    setIsLoading(true)
    const orderList: Order[] = await api.getOrders()
    setOrders(orderList)
    setIsLoading(false)
  }

  const handleSearchInput = () => { }

  const handleSearchKey = () => { }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItens: 'center' }}>
          <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>
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
          onChange={handleSearchInput}
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
          orders.map((order) => (
            <Grid item xs={1} key={order.id}>
              <OrderItem order={order} />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
