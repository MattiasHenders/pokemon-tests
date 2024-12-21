import { Box, Typography } from '@mui/material'
import { palette } from '@/styles/palette'

export default () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center ',
        width: '100%',
        mb: 5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ color: palette.primary.lightText, fontSize: 22 }}>
          User Achievements
        </Typography>
      </Box>
    </Box>
  )
}
