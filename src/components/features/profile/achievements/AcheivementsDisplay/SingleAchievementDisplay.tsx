import { Schema } from '@/amplify/data/resource'
import { getTrophyColor, palette } from '@/styles/palette'
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
import { useState } from 'react'
import AchievmentModal from './AchievmentModal'

export default ({
  acheivement,
  isOnAchievementScreen,
}: {
  acheivement: Schema['UserAcheivements']['type']
  isOnAchievementScreen?: boolean
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const localAcheivement = allAcheivements.find(
    (a) => a.id === acheivement.acheivementId
  )

  if (!localAcheivement) {
    return null
  }

  const handleClickOnAcheivementPage = () => {
    if (isOnAchievementScreen) {
      setIsModalOpen(true)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Tooltip
        disableHoverListener={isOnAchievementScreen}
        title={
          <Box
            sx={{
              textAlign: 'center',
              p: 1,
            }}
          >
            <Typography variant="body2">
              {localAcheivement.description}
            </Typography>
          </Box>
        }
        placement="bottom"
      >
        <Paper
          elevation={3}
          onClick={handleClickOnAcheivementPage}
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            width: 150,
            height: 150,
            border: `2px solid ${getTrophyColor(localAcheivement.image.color)}`,
            backgroundColor: alpha(
              getTrophyColor(localAcheivement.image.color),
              0.1
            ),
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: !isOnAchievementScreen || acheivement.completed ? 1 : 0.15,
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: getTrophyColor(localAcheivement.image.color),
              textAlign: 'center',
              fontSize: { xs: 14, sm: 16, md: 18 },
            }}
          >
            {localAcheivement.name}
          </Typography>
          <Icon
            sx={{
              color: getTrophyColor(localAcheivement.image.color),
              fontSize: localAcheivement.image.size,
            }}
            component={localAcheivement.image.src}
          />
          <LinearProgress
            variant="determinate"
            sx={{
              width: '100%',
              mt: 2,
              mb: 1,
              backgroundColor: alpha(
                getTrophyColor(localAcheivement.image.color),
                0.3
              ),
              '& .MuiLinearProgress-bar': {
                backgroundColor: getTrophyColor(localAcheivement.image.color),
              },
            }}
            value={
              ((acheivement.progress || 0) / (acheivement.total || 1)) * 100
            }
          />
        </Paper>
      </Tooltip>
      <AchievmentModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        acheivement={acheivement}
        localAcheivement={localAcheivement}
      />
    </Box>
  )
}
