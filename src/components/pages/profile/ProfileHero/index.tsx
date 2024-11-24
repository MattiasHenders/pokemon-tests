import { alpha, Box, Divider, useMediaQuery, useTheme } from '@mui/material'
import { palette } from '@/styles/palette'
import ProfileAvatar from './ProfileAvatar'
import ProfileStats from './ProfileStats'
import ProfileRecentAchievements from './ProfileRecentAchievements'

export default () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('sm'))
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        backgroundColor: alpha(palette.primary.dark, 0.1),
        borderRadius: 4,
        p: 3,
      }}
    >
      <Box
        sx={{
          flex: { xs: '', sm: '0 0 30%', md: '0 0 20%' },
        }}
      >
        <ProfileAvatar />
      </Box>
      <Divider
        orientation={matchMobileView ? 'horizontal' : 'vertical'}
        variant="middle"
        flexItem
        sx={{
          backgroundColor: palette.primary.lightText,
          mt: { xs: 2, sm: 0 },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flex: { xs: '0 0 70%', sm: '0 0 70%', md: '0 0 80%' },
        }}
      >
        <ProfileStats />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundColor: palette.primary.lightText,
          }}
        />
        <ProfileRecentAchievements />
      </Box>
    </Box>
  )
}
