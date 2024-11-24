import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useInputStore } from '@/src/stores/input'
import { Sprites } from '@pkmn/img'
import BallAnimation, {
  BallType,
  BallAnimationType,
  AnimationState,
} from '@/src/components/common/BallAnimation'
import { useQuestionStore } from '@/src/stores/question'

export default () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('sm'))
  const matchTabletView = useMediaQuery(breakpoints.down('md'))
  const { selectedPokemon, setSelectedPokemon } = useInputStore()
  const { currentQuestion } = useQuestionStore()
  const [currentSprite, setCurrentSprite] = useState<string | undefined>(
    undefined
  )
  const [zoomIn, setZoomIn] = useState(false)
  const [currentPokeball, setCurrentPokeball] = useState<BallType>(
    BallType.Poke
  )
  const [animationState, setAnimationState] = useState<AnimationState>(
    AnimationState.WAITING
  )

  useEffect(() => {
    if (selectedPokemon) {
      const { url: guessURL } = Sprites.getPokemon(
        selectedPokemon.name ?? 'Missingno.',
        {
          gen: 'gen3',
        }
      )

      // Reset animations and play again
      setCurrentSprite(undefined) // Temporarily clear the sprite
      setAnimationState(AnimationState.WAITING) // Set to WAITING state initially
      setZoomIn(false)
      setCurrentSprite(guessURL)
      setAnimationState(AnimationState.PLAYING) // Start the animation

      // Start zoom-in after Pokéball animation
      setTimeout(() => {
        setZoomIn(true)
      }, 250) // Pokéball animation duration
    } else {
      setCurrentSprite(undefined)
    }
  }, [selectedPokemon])

  useEffect(() => {
    switch (currentQuestion?.difficulty) {
      case 'easy':
        setCurrentPokeball(BallType.Poke)
        break
      case 'medium':
        setCurrentPokeball(BallType.Great)
        break
      case 'hard':
        setCurrentPokeball(BallType.Ultra)
        break
      case 'impossible':
        setCurrentPokeball(BallType.Master)
        break
      default:
        setCurrentPokeball(BallType.Poke) // Default ball type
    }
  }, [currentQuestion?.difficulty])

  useEffect(() => {
    // Reset animations when difficulty changes
    setCurrentSprite(undefined)
    setAnimationState(AnimationState.WAITING) // Set to WAITING state initially
    setZoomIn(false)

    // Delay to reset animations
    if (selectedPokemon) {
      const { url: guessURL } = Sprites.getPokemon(
        selectedPokemon.name ?? 'Missingno.',
        {
          gen: 'gen3',
        }
      )
      setCurrentSprite(guessURL)
      setAnimationState(AnimationState.PLAYING) // Start the animation

      // Start zoom-in after Pokéball animation
      setTimeout(() => {
        setZoomIn(true)
      }, 250)
    }
  }, [currentQuestion?.difficulty, selectedPokemon])

  const getImageSize = () => {
    if (matchMobileView) {
      return 100
    }
    if (matchTabletView) {
      return 140
    }
    return 180
  }

  const getAnimationSize = () => {
    if (matchMobileView) {
      return 'xs'
    }
    if (matchTabletView) {
      return 'sm'
    }
    return 'md'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 2,
        mr: { xs: 1, md: 5 },
        position: 'relative',
        width: getImageSize(),
        height: getImageSize(),
      }}
    >
      {currentSprite && (
        <Image
          unoptimized
          src={currentSprite}
          width={getImageSize()}
          height={getImageSize()}
          alt={selectedPokemon?.name || ''}
          style={{
            position: 'relative',
            zIndex: 2,
            transform: zoomIn ? 'scale(1)' : 'scale(0)', // Start at scale 0, zoom to scale 1
            animation: zoomIn ? 'zoomIn 0.75s ease-in-out forwards' : undefined, // Apply animation conditionally
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <BallAnimation
          ballType={currentPokeball}
          animation={BallAnimationType.Throw}
          size={getAnimationSize()}
          animationState={animationState} // Pass the animationState here
        />
      </Box>

      {/* Add keyframes for zoom-in animation */}
      <style jsx global>{`
        @keyframes zoomIn {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  )
}
