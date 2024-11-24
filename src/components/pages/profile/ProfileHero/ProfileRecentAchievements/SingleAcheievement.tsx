import { Schema } from '@/amplify/data/resource'
import { palette } from '@/styles/palette'
import { alpha, Box, LinearProgress, Paper, Typography } from '@mui/material'

export default ({
  acheivement,
}: {
  acheivement: Schema['UserAcheivements']['type']
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: 150,
          height: 150,
          border: `2px solid ${palette.background.light}`,
          backgroundColor: alpha(palette.background.light, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: palette.primary.lightText,
            textAlign: 'center',
          }}
        >
          {acheivement.name}
          {/* This is all TODO */}
        </Typography>
      </Paper>
    </Box>
  )
}
