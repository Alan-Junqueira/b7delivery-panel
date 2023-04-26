'use client'

import { Header } from '@/components/partials/Header'
import { Container } from '@mui/material'
import { ReactNode } from 'react'

export default function InsideLayout({ children }: { children: ReactNode }) {
  return (
    <Container component="section" maxWidth="lg">
      <Header />
      {children}
    </Container>
  )
}
