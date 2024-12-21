import { Box, Typography } from '@mui/material'
import { palette } from '@/styles/palette'
import { GameType, useGameTypeStore } from '@/src/stores/game'

export default () => {
  const { gameType } = useGameTypeStore()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: { xs: -1, md: -4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          WebkitTextStroke: `1.5px ${
            gameType === GameType.DAILY_PUZZLE
              ? palette.secondary.light
              : palette.error.dark
          }`,
          color:
            gameType === GameType.DAILY_PUZZLE
              ? palette.secondary.main
              : palette.error.main,
        }}
      >
        {gameType === GameType.DAILY_PUZZLE ? 'Daily Puzzle' : 'UNLIMITED'}
      </Typography>
    </Box>
  )
}
