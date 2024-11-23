import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { Authenticator } from '@aws-amplify/ui-react'
import AuthenticatorComponents from '@/src/components/common/Authenticator'

const ProfilePage: NextPage = () => {
  return (
    <Authenticator components={AuthenticatorComponents}>
      {({ user }) => (
        <Box>
          <Typography variant="h1">Profile</Typography>
          <Typography variant="h4">{user?.username}</Typography>
        </Box>
      )}
    </Authenticator>
  )
}

export default ProfilePage
