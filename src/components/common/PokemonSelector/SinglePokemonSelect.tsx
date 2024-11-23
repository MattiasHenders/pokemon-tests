import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'
import { Species } from '@pkmn/dex'

import { Sprites } from '@pkmn/img'
import { palette } from '@/styles/palette'

type SinglePokemonSelectProps = {
  pokemon: Species
}

const SinglePokemonSelect = ({ pokemon }: SinglePokemonSelectProps) => {
  const { url } = Sprites.getPokemon(pokemon.name, {
    gen: 'gen5',
  })

  return (
    <Box
      key={pokemon.name}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Image unoptimized src={url} width={70} height={70} alt={pokemon.name} />
      {pokemon.name}
    </Box>
  )
}

export default SinglePokemonSelect
