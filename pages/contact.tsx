import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Box, Divider } from '@mui/material'
import HomeHero from '@/src/components/common/Heros/HomeHero'
import ContactCreator from '@/src/components/pages/contact/ContactCreator'
import ContactThanksToPokeTests from '@/src/components/pages/contact/ContactThanksToPokeTests'
import { palette } from '@/styles/palette'

interface ContactPageProps {}

const ContactPage: NextPage<ContactPageProps> = () => {
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
      <ContactCreator />
      <Divider
        sx={{
          my: 5,
          width: '90%',
          backgroundColor: palette.primary.lightText,
        }}
      />
      <ContactThanksToPokeTests />
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<
  ContactPageProps
> = async () => {
  return {
    props: {},
  }
}

export default ContactPage
