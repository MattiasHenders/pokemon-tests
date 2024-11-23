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
      <Typography variant="h4" sx={{ color: palette.primary.lightText }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ color: palette.primary.lightText }}>
        The idea for this came from the following instagram account:{' '}
        <Link
          color="inherit"
          href="https://www.instagram.com/pokemon.tests/"
          target="_blank"
        >
          @pokemon.tests
        </Link>
      </Typography>
    </Box>
  )
}
