import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Container } from '@mui/material'
import HomeHero from '@/src/components/common/Heros/HomeHero'
import ContactDetails from '@/src/components/pages/contact/ContactDetails'

interface ContactPageProps {}

const ContactPage: NextPage<ContactPageProps> = () => {
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
      <ContactDetails />
    </Container>
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
