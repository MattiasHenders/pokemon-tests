import { useAuthenticator } from '@aws-amplify/ui-react'
import { alpha, Box, Divider } from '@mui/material'
import { palette } from '@/styles/palette'
import ProfileAvatar from './ProfileAvatar'
import ProfileStats from './ProfileStats'

export default () => {
  const { user } = useAuthenticator()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        backgroundColor: alpha(palette.primary.dark, 0.1),
        borderRadius: 4,
      }}
    >
      <ProfileAvatar />
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ backgroundColor: palette.primary.lightText }}
      />
      <ProfileStats />
    </Box>
  )
}
