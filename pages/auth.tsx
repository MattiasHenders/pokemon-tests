import { NextPage } from 'next'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import AuthenticatorComponents from '@/src/components/common/Authenticator'
import { useRouter } from 'next/router'

const ProfilePage: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthenticator()

  if (user) {
    router.push('/')
  }

  return <Authenticator components={AuthenticatorComponents} />
}

export default ProfilePage
