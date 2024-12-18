import { Box, Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { Authenticator } from '@aws-amplify/ui-react'
import AuthenticatorComponents from '@/src/components/common/Authenticator'
import ProfileHeader from '@/src/components/pages/profile/index/ProfileHeader'
import ProfileHero from '@/src/components/pages/profile/index/ProfileHero'
import ProfileTable from '@/src/components/pages/profile/index/ProfileTable'

const ProfilePage: NextPage = () => {
  return (
    <Authenticator components={AuthenticatorComponents}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
        }}
      >
        <ProfileHeader />
        <ProfileHero />
        <ProfileTable />
      </Container>
    </Authenticator>
  )
}

export default ProfilePage
