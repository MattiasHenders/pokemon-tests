import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Container } from '@mui/material'
import HomeHero from '@/src/components/common/Heros/HomeHero'
import Roadmap from '@/src/components/features/roadmap/Roadmap'

interface RoadmapPageProps {}

const RoadmapPage: NextPage<RoadmapPageProps> = () => {
  return (
    <Container
      sx={{
        my: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <HomeHero />
      <Roadmap />
      {/* <SocialLinks /> */}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<
  RoadmapPageProps
> = async () => {
  return {
    props: {},
  }
}

export default RoadmapPage
