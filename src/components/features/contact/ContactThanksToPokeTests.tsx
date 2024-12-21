import { palette } from '@/styles/palette'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: palette.primary.lightText,
          textAlign: 'center',
          fontSize: { xs: 22, sm: 26, md: 28 },
        }}
      >
        Thanks to Pokémon Tests
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: palette.primary.lightText, textAlign: 'center' }}
      >
        The idea for this came from the following instagram account:{' '}
        <Link
          color="inherit"
          href="https://www.instagram.com/pokemon.tests/"
          target="_blank"
        >
          <Box component="span" sx={{ color: palette.primary.lightText }}>
            @pokemon.tests
          </Box>
        </Link>
      </Typography>
    </Box>
  )
}
