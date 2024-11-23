import Link from 'next/link'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { Box, Typography } from '@mui/material'
import { palette } from '@/styles/palette'

export default () => {
  const { toForgotPassword } = useAuthenticator()

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography
        variant="body1"
        onClick={toForgotPassword}
        sx={{ cursor: 'pointer', color: palette.primary.dark }}
      >
        Reset your password
      </Typography>
    </Box>
  )
}
