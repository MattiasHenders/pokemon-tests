import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Box } from '@mui/material'
import QuestionDisplay from '@/src/components/pages/home/QuestionDisplay'
import FormInputs from '@/src/components/pages/home/FormInputs'
import HomeHero from '@/src/components/common/Heros/HomeHero'
import GuessDisplay from '@/src/components/pages/home/PokemonDisplay/GuessDisplay'
import AnswerDisplay from '@/src/components/pages/home/PokemonDisplay/AnswerDisplay'
import PokemonSelector from '@/src/components/common/PokemonSelector'
import type { Schema } from '@/amplify/data/resource'
import { getValidPokemonQuestions } from '@/services/getPokemonQuestion'
import { GameType } from '@/src/stores/game'
import GameManager from '@/src/components/common/GameManager'
import GameTypeDisplay from '@/src/components/pages/home/GameTypeDisplay'

interface UnlimitedPageProps {
  pokemonQuestions: Schema['DailyTest']['type']
}

const UnlimitedPage: NextPage<UnlimitedPageProps> = ({ pokemonQuestions }) => {
  return (
    <GameManager
      pokemonQuestions={pokemonQuestions}
      gameType={GameType.UNLIMITED}
    >
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <HomeHero />
        <GameTypeDisplay />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <GuessDisplay />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <QuestionDisplay />
            <Box
              sx={{
                justifyContent: 'space-around',
                alignItems: 'center',
                display: { xs: 'flex', md: 'none' },
                minWidth: { xs: 300, sm: 400 },
              }}
            >
              <GuessDisplay />
              <AnswerDisplay />
            </Box>
            <PokemonSelector />
            <FormInputs />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <AnswerDisplay />
          </Box>
        </Box>
      </Box>
    </GameManager>
  )
}

export const getServerSideProps: GetServerSideProps<
  UnlimitedPageProps
> = async () => {
  const rawPokemonQuestions = await getValidPokemonQuestions()

  const pokemonQuestion: Schema['DailyTest']['type'] = {
    id: 'unlimited',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    easyQuestion: rawPokemonQuestions.easy,
    mediumQuestion: rawPokemonQuestions.medium,
    hardQuestion: rawPokemonQuestions.hard,
    impossibleQuestion: rawPokemonQuestions.impossible,
  }

  if (!pokemonQuestion) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pokemonQuestions: pokemonQuestion,
    },
  }
}

export default UnlimitedPage
