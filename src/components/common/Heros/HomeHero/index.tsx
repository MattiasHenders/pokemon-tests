import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

const HomeHero = () => (
  <Box
    sx={{
      mt: { xs: 2, md: 4 },
      mb: { xs: 2, md: 6 },
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        height: { xs: 49, sm: 90, md: 132 },
        width: { xs: 298, sm: 550, md: 807 },
      }}
    >
      <Image
        priority
        src={'/img/homehero.png'}
        alt={'Pokémon Logo'}
        layout="fill"
      />
    </Box>
  </Box>
)

export default HomeHero
