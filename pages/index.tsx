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
import {
  reqResBasedClient,
  runWithAmplifyServerContext,
} from '@/utils/amplifyServerUtils'

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
  const { data, errors } = await runWithAmplifyServerContext({
    nextServerContext: null,
    operation: async (contextSpec) => {
      return await reqResBasedClient.models.DailyTest.list(contextSpec, {
        filter: {
          createdAt: {
            beginsWith: new Date().toISOString().split('T')[0],
          },
        },
      })
    },
  })

  if (errors || !data || data.length === 0) {
    return {
      notFound: true,
    }
  }

  const pokemonQuestions = data[0]

  return {
    props: {
      pokemonQuestions,
    },
  }
}

export default HomePage
