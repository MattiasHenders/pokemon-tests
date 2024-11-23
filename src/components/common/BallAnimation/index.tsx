import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

interface BallAnimationProps {
  ballType: BallType
  animation: BallAnimationType
  size?: 'xs' | 'sm' | 'md' | 'lg'
  repeat?: boolean
  animationState: AnimationState
}

const STILL_FRAME = 3

export enum AnimationState {
  PLAYING = 0,
  DONE = 1,
  WAITING = 2,
}

export enum BallType {
  Poke = 0,
  Great = 1,
  Ultra = 2,
  Master = 3,
  Premier = 4,
  Cherish = 5,
  Luxury = 6,
  Nest = 7,
  Net = 8,
  Dive = 9,
  Repeat = 10,
  Timer = 11,
  Safari = 12,
  Quick = 13,
  Dusk = 14,
  Heal = 15,
  UltraBeast = 16,
}

export enum BallAnimationType {
  Throw = 0,
  Wiggle = 1,
  Break = 2,
  Catch = 3,
}

const BallAnimation: React.FC<BallAnimationProps> = ({
  ballType,
  animation,
  size = 'md',
  repeat = false,
  animationState,
}) => {
  const [frame, setFrame] = useState(STILL_FRAME) // Keep track of the current frame
  const [isPlaying, setIsPlaying] = useState(false)
  const [fade, setFade] = useState(false)

  // Define the base tile size for each `size` option
  const sizeMap = {
    xs: 100,
    sm: 140,
    md: 180,
    lg: 192, // unused for now
  }
  const tileSize = sizeMap[size]

  // Dimensions of the sprite sheet
  const originalTileSize = 64 // base tile size in the sprite sheet
  const sheetWidth = 1792
  const sheetHeight = 2048

  // Scale the sprite sheet to match the selected `size`
  const scaledSheetWidth = (sheetWidth / originalTileSize) * tileSize
  const scaledSheetHeight = (sheetHeight / originalTileSize) * tileSize

  // Define the animations
  const animations = [
    { startRow: 0, rows: 15 }, // First 15 rows
    { startRow: 15, rows: 5 }, // Next 5 rows
    { startRow: 20, rows: 7 }, // Next 7 rows
    { startRow: 27, rows: 5 }, // Final 5 rows
  ]

  const animationSpeeds = [85, 140, 80, 80]

  // Get the start row and number of rows for the chosen animation
  const { startRow, rows: animationRows } = animations[animation]
  const totalFrames = animationRows

  // Logic to handle animation state change
  useEffect(() => {
    switch (animationState) {
      case AnimationState.PLAYING:
        setIsPlaying(true)
        setFrame(0) // Reset frame when animation starts
        setFade(false)
        break
      case AnimationState.DONE:
        setIsPlaying(false)
        // setFrame(STILL_FRAME) // Set frame to last row when animation is done
        break
      case AnimationState.WAITING:
        setIsPlaying(false)
        setFade(false)
        setFrame(STILL_FRAME) // Reset frame if waiting
        break
      default:
        break
    }
  }, [animationState])

  // Update frame index at an interval for animation
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setFrame((prev) => {
        // If repeat is false and we've reached the last frame, reset animation
        if (!repeat && prev + 1 === totalFrames) {
          setIsPlaying(false) // Stop the interval
          setFade(true) // Start fade effect
          return totalFrames - 1 // Stay on the last frame
        }
        return (prev + 1) % totalFrames
      })
    }, animationSpeeds[animation]) // Adjust interval as needed for speed

    return () => clearInterval(interval)
  }, [isPlaying, totalFrames, repeat])

  // Calculate the background position for the current frame in the specified column
  const currentRow = startRow + frame
  const backgroundPositionX = -ballType * tileSize
  const backgroundPositionY = -currentRow * tileSize

  return (
    <Box
      sx={{
        width: tileSize,
        height: tileSize,
        overflow: 'hidden',
        backgroundImage: `url('/img/balls/sheet.png')`, // Assuming the file is in the public directory
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        backgroundSize: `${scaledSheetWidth}px ${scaledSheetHeight}px`,
        opacity: fade ? 0 : 1, // Fade out after animation completes
        transition: 'opacity .25s ease', // Smooth fade transition
      }}
    />
  )
}

export default BallAnimation
