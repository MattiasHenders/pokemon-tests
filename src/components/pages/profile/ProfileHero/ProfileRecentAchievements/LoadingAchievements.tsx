import { palette } from '@/styles/palette'
import { alpha, Box, CircularProgress, Paper, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

export default () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: 150,
          height: 150,
          border: `2px dashed ${alpha(palette.background.light, 0.3)}`,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          size={42}
          sx={{ color: alpha(palette.primary.lightText, 0.5) }}
        />
      </Paper>
    </Box>
  )
}
