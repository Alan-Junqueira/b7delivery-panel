'use client'

import { api } from '@/libs/api'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'

const ForgotConfirmPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [info, setInfo] = useState('')
  const [formError, setFormError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setFormError('Preencha a senha')
      return
    }

    if (password !== confirmPassword) {
      setFormError('As senhas não batem')
      return
    }

    setFormError('')
    setInfo('')
    setLoginLoading(true)

    const tempToken = '123'

    const result = await api.redefinePassword(password, tempToken)
    setLoginLoading(false)

    if (result.error) {
      setFormError(result.error)
    } else {
      setInfo('Senha redefinida, agora você pode fazer o login')

      setConfirmPassword('')
      setPassword('')
    }
  }
  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: 'center', mt: 2, color: '#555' }}
      >
        Olá **USUÁRIO** defina sua nova senha abaixo
      </Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleLogin}>
        <TextField
          label="Digite sua nova senha"
          type="password"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loginLoading}
        />
        <TextField
          label="Confirme sua nova senha"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          disabled={loginLoading}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loginLoading}
        >
          {loginLoading ? 'Carregando...' : 'Definir nova senha'}
        </Button>
        {formError && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {formError}
          </Alert>
        )}
        {info && (
          <Alert variant="filled" severity="success" sx={{ mt: 3 }}>
            {info}
          </Alert>
        )}
      </Box>
    </>
  )
}

export default ForgotConfirmPage
