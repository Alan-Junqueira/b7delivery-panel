'use client'

import { api } from '@/libs/api'
import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'

const ForgotPage = () => {
  const [emailField, setEmailField] = useState('')
  const [info, setInfo] = useState('')
  const [formError, setFormError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!emailField) {
      setFormError('Preencha o seu e-mail')
      return
    }

    setFormError('')
    setInfo('')
    setLoginLoading(true)

    const result = await api.forgotPassword(emailField)
    setLoginLoading(false)

    if (result.error) {
      setFormError(result.error)
    } else {
      setInfo('Enviamos um e-mail para recuperação da sua senha')
    }
  }
  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: 'center', mt: 2, color: '#555' }}
      >
        Deseja recuperar sua senha?
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loginLoading}
        >
          {loginLoading ? 'Carregando...' : 'Recuperar senha'}
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

export default ForgotPage
