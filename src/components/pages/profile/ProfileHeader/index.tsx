import { useAuthenticator } from '@aws-amplify/ui-react'
import { Box, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { palette } from '@/styles/palette'

export default () => {
  const { user } = useAuthenticator()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        mb: 5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PersonIcon sx={{ mr: 1, color: palette.primary.lightText }} />
        <Typography sx={{ color: palette.primary.lightText, fontSize: 14 }}>
          Welcome, {user.username}
        </Typography>
      </Box>
    </Box>
  )
}
