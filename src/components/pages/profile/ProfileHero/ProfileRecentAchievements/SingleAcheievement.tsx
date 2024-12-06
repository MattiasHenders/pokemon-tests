import { Schema } from '@/amplify/data/resource'
import { palette } from '@/styles/palette'
import {
  alpha,
  Box,
  Icon,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'

import allAcheivements from '@/src/data/achievements/index'

export default ({
  acheivement,
}: {
  acheivement: Schema['UserAcheivements']['type']
}) => {
  const localAcheivement = allAcheivements.find(
    (a) => a.id === acheivement.acheivementId
  )

  if (!localAcheivement) {
    return null
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Tooltip
        title={
          <Box sx={{ textAlign: 'center', p: 1 }}>
            <Typography variant="body2">
              {localAcheivement.description}
            </Typography>
          </Box>
        }
        placement="bottom"
      >
        <Paper
          elevation={3}
          sx={{
            p: 1,
            rowGap: 2,
            display: 'flex',
            flexDirection: 'column',
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
              fontSize: { xs: 14, sm: 16, md: 18 },
            }}
          >
            {localAcheivement.name}
          </Typography>
          <Icon
            sx={{
              color: localAcheivement.image.color,
              fontSize: localAcheivement.image.size,
            }}
            component={localAcheivement.image.src}
          />
          <LinearProgress
            variant="determinate"
            sx={{
              width: '100%',
              mt: 2,
            }}
            value={
              ((acheivement.progress || 0) / (acheivement.total || 1)) * 100
            }
          />
        </Paper>
      </Tooltip>
    </Box>
  )
}
