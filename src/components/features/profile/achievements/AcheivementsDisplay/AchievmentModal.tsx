import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Schema } from '@/amplify/data/resource'
import { Paper, alpha, Icon, LinearProgress, darken } from '@mui/material'
import { Achievement } from '@/src/data/achievements'
import { getTrophyColor, palette } from '@/styles/palette'

interface AcheivementModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  acheivement: Schema['UserAcheivements']['type']
  localAcheivement: Achievement
}

export default ({
  isOpen,
  setIsOpen,
  acheivement,
  localAcheivement,
}: AcheivementModalProps) => {
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              width: 275,
              height: 275,
              backgroundColor: darken(
                getTrophyColor(localAcheivement.image.color),
                0.6
              ),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: getTrophyColor(localAcheivement.image.color),
                  textAlign: 'center',
                  fontSize: 22,
                  mb: 1,
                }}
              >
                {localAcheivement.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: getTrophyColor(localAcheivement.image.color),
                  textAlign: 'center',
                  fontSize: 18,
                }}
              >
                {localAcheivement.description}
              </Typography>
            </Box>
            <Icon
              sx={{
                color: getTrophyColor(localAcheivement.image.color),
                fontSize: localAcheivement.image.size + 50,
              }}
              component={localAcheivement.image.src}
            />
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="body1"
                sx={{
                  color: getTrophyColor(localAcheivement.image.color),
                  textAlign: 'center',
                  fontSize: 18,
                }}
              >
                {acheivement.progress} / {acheivement.total}
              </Typography>
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
                    backgroundColor: getTrophyColor(
                      localAcheivement.image.color
                    ),
                  },
                }}
                value={
                  ((acheivement.progress || 0) / (acheivement.total || 1)) * 100
                }
              />
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  )
}
