import { useAuthenticator } from '@aws-amplify/ui-react'
import { Box, LinearProgress } from '@mui/material'

export default () => {
  const { user } = useAuthenticator()

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        m: 3,
      }}
    >
      <LinearProgress variant="determinate" value={50} />
    </Box>
  )
}
