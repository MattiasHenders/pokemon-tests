import { Container } from '@mui/material'
import { NextPage } from 'next'
import { Authenticator } from '@aws-amplify/ui-react'
import AuthenticatorComponents from '@/src/components/common/Authenticator'
import AcheivementsDisplay from '@/src/components/pages/profile/achievements/AcheivementsDisplay'
import AchievementsHeader from '@/src/components/pages/profile/achievements/AchievementsHeader'

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
        <AchievementsHeader />
        <AcheivementsDisplay />
      </Container>
    </Authenticator>
  )
}

export default ProfilePage
