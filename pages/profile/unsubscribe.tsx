import { Container } from '@mui/material'
import { NextPage } from 'next'
import { Authenticator } from '@aws-amplify/ui-react'
import AuthenticatorComponents from '@/src/components/common/Authenticator'
import UnsubscribeCTA from '@/src/components/features/profile/unsubscribe/UnsubscribeCTA'

const UnsubscribePage: NextPage = () => {
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
        <UnsubscribeCTA />
      </Container>
    </Authenticator>
  )
}

export default UnsubscribePage
