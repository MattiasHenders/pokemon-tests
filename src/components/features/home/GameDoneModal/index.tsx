import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { palette } from '@/styles/palette'
import { useGameTypeStore } from '@/src/stores/game'
import { useAuthenticator } from '@aws-amplify/ui-react'
import Image from 'next/image'
import StyledButton from '@/src/components/common/StyledButton'
import { useRouter } from 'next/router'
import Countdown from './Countdown'

export default () => {
  const { gameOverModalOpen, setGameOverModalOpen } = useGameTypeStore()
  const { user } = useAuthenticator()
  const router = useRouter()
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={gameOverModalOpen}
        onClose={() => setGameOverModalOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={gameOverModalOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 300, sm: 400, md: 500 },
              backgroundColor: palette.primary.light,
              boxShadow: 24,
              borderRadius: 4,
              p: 4,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: palette.primary.darkText,
                textAlign: 'center',
                fontSize: { xs: 20, sm: 24, md: 28 },
              }}
            >
              Game Over
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{
                color: palette.primary.darkText,
                textAlign: 'center',
              }}
            >
              Thank you for playing today&apos;s game! Continue your streak
              tomorrow!
            </Typography>
            <Countdown />
            {user ? (
              <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                <StyledButton
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/profile')}
                >
                  View your stats!
                </StyledButton>
              </Box>
            ) : (
              <>
                <Typography sx={{ mb: 2, color: palette.primary.darkText }}>
                  Want to save your scores, get acheivements, and more?
                </Typography>
                <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                  <StyledButton
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/auth')}
                  >
                    Click here to sign up!
                  </StyledButton>
                </Box>
              </>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                position: 'relative',
                width: '100%',
                // height: 259,
                aspectRatio: 500 / 259,
              }}
            >
              <Image
                src="/img/misc/team.gif"
                alt="team gif"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
