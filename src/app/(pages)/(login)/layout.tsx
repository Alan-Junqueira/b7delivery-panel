'use client'

import { Box, Container, Typography } from '@mui/material'
import { ReactNode } from 'react'

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h3" variant="h3">
          B7 Delivery
        </Typography>
        <Typography component="h5" variant="h5">
          Painel do estabelecimento
        </Typography>
        {children}
      </Box>
    </Container>
  )
}

export default LoginLayout
