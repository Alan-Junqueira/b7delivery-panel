'use client'

import { api } from '@/libs/api'
import {
  Alert,
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

const LoginPage = () => {
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')
  const [formError, setFormError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!emailField || !passwordField) {
      setFormError('Preencha e-mail e senha')
      return
    }

    setFormError('')
    setLoginLoading(true)

    const result = await api.login(emailField, passwordField)
    setLoginLoading(false)

    if (result.error) {
      setFormError(result.error)
    }
  }
  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: 'center', mt: 2, color: '#555' }}
      >
        Digite seus dados para entrar no painel administrativo do
        estabelecimento e gerenciar produtos/pedidos
      </Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleLogin}>
        <TextField
          label="Digite seu e-mail"
          name="email"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setEmailField(e.target.value)}
          value={emailField}
          disabled={loginLoading}
        />
        <TextField
          label="Digite sua senha"
          name="password"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField(e.target.value)}
          value={passwordField}
          disabled={loginLoading}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loginLoading}
        >
          {loginLoading ? 'Carregando...' : 'Entrar'}
        </Button>
        {formError && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {formError}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <MuiLink href="/login/forgot" variant="body2" component={Link}>
            Esqueceu sua senha?
          </MuiLink>
        </Box>
      </Box>
    </>
  )
}

export default LoginPage
