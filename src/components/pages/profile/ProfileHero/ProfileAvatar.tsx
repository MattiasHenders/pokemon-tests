import { useAuthenticator } from '@aws-amplify/ui-react'
import { Avatar, Box } from '@mui/material'
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { useEffect, useState } from 'react'

export default () => {
  const { user } = useAuthenticator()
  const [userAttributes, setUserAttributes] = useState<
    FetchUserAttributesOutput | undefined
  >(undefined)

  useEffect(() => {
    const getUserAttributes = async () => {
      const attributes = await fetchUserAttributes()
      setUserAttributes(attributes)
    }

    getUserAttributes()
  }, [])

  function stringToColor(string: string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name[0].toUpperCase() + name[1].toLowerCase(),
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        m: 3,
      }}
    >
      <Avatar
        {...stringAvatar(userAttributes?.email ?? user.username)}
        sx={{ width: 72, height: 72 }}
      />
    </Box>
  )
}
