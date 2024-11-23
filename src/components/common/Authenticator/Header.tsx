import Image from 'next/image'
import { Box } from '@mui/material'

export default () => {
  return (
    <Box
      sx={{
        mt: 3,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image alt="logo" src="/img/balls/poke.webp" width={50} height={50} />
    </Box>
  )
}
