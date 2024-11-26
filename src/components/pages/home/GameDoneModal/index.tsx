import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { palette } from '@/styles/palette'
import Link from 'next/link'
import { useGameTypeStore } from '@/src/stores/game'
import { useAuthenticator } from '@aws-amplify/ui-react'

export default () => {
  const { gameOverModalOpen, setGameOverModalOpen } = useGameTypeStore()
  const { user } = useAuthenticator()
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
              sx={{ color: palette.primary.darkText }}
            >
              Game Over
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, color: palette.primary.darkText }}
            >
              Thank you so much for playing!
            </Typography>
            {user ? (
              <Box sx={{ my: 2 }}>
                <Link color={palette.primary.lightText} href={'/profile'}>
                  Click here to view your stats and achievements!
                </Link>
              </Box>
            ) : (
              <>
                <Typography sx={{ mb: 2, color: palette.primary.darkText }}>
                  Want to save your scores, get acheivements, and more?
                </Typography>
                <Link color={palette.primary.lightText} href={'/auth'}>
                  Click here to sign up or login!
                </Link>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
