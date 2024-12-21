import { getAllValidPokemon } from '@/services/getAllValidPokemon'
import { palette } from '@/styles/palette'
import { Box, LinearProgress, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(outputs)
const client = generateClient<Schema>()

export default () => {
  const { user } = useAuthenticator()
  const MAX_POKEMON = getAllValidPokemon().length
  const [pokemonCaught, setPokemonCaught] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchUserAcheivements = async () => {
      try {
        const { data: userStats, errors } = await client.models.UserStats.get({
          id: user.userId,
        })

        if (errors) {
          throw new Error(errors[0].message)
        }

        setPokemonCaught(userStats?.pokemonCaught?.length || 0)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAcheivements()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: 1,
        width: '100%',
        m: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: 1,
        }}
      >
        <Typography variant="body1" sx={{ color: palette.primary.lightText }}>
          Pokemon Caught:
        </Typography>
        <Typography variant="body1" sx={{ color: palette.primary.lightText }}>
          {isLoading ? '...' : pokemonCaught} / {MAX_POKEMON}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={(pokemonCaught / MAX_POKEMON) * 100}
        sx={{
          width: '100%',
          backgroundColor: palette.poke.blue,
          '& .MuiLinearProgress-bar': {
            backgroundColor: palette.poke.yellow,
          },
        }}
      />
    </Box>
  )
}
