import React, { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Box } from '@mui/material'
import QuestionDisplay from '@/src/components/pages/home/QuestionDisplay'
import FormInputs from '@/src/components/pages/home/FormInputs'
import HomeHero from '@/src/components/common/Heros/HomeHero'
import { useQuestionStore } from '@/src/stores/question'
import GuessDisplay from '@/src/components/pages/home/PokemonDisplay/GuessDisplay'
import AnswerDisplay from '@/src/components/pages/home/PokemonDisplay/AnswerDisplay'
import PokemonSelector from '@/src/components/common/PokemonSelector'
import type { Schema } from '@/amplify/data/resource'
import { getValidPokemonQuestions } from '@/services/getPokemonQuestion'

interface HomePageProps {
  pokemonQuestions: Schema['DailyTest']['type']
}

const HomePage: NextPage<HomePageProps> = ({ pokemonQuestions }) => {
  const { setPokemonQuestions, setCurrentQuestion } = useQuestionStore()

  useEffect(() => {
    setPokemonQuestions(pokemonQuestions)
    if (pokemonQuestions?.easyQuestion)
      setCurrentQuestion(pokemonQuestions?.easyQuestion)
  }, [pokemonQuestions, setCurrentQuestion])

  return (
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
  )
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
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

export default HomePage
