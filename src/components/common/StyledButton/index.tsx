import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ButtonProps } from '@mui/material/Button'
import { palette } from '@/styles/palette'

interface BaseButtonProps
  extends Pick<ButtonProps, 'onClick' | 'type' | 'startIcon' | 'endIcon'> {
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'default' | 'primary' | 'secondary' | 'dark' | 'light'
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  disableHoverEffect?: boolean
  pulse?: 'true' | 'false'
}
interface StyledButtonRootProps extends BaseButtonProps {
  theme?: Theme
}

const StyledButtonRoot = styled('button', {
  shouldForwardProp: (prop) =>
    prop !== 'variant' &&
    prop !== 'color' &&
    prop !== 'size' &&
    prop !== 'disableHoverEffect',
})<StyledButtonRootProps>(
  ({ theme, color, variant, size, disableHoverEffect, pulse, disabled }) => ({
    cursor: 'pointer',
    minWidth: 40,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: 1,
    borderRadius: Number(theme.shape.borderRadius) * 8,
    disabled,
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
    transform: 'unset',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
    verticalAlign: 'middle',
    outline: 'none !important',
    transition: theme.transitions.create(['transform']),

    // hover
    '&:hover': {
      ...(!disableHoverEffect && {
        transform: 'translateY(-3px)',
      }),
    },

    '& svg': {
      fontSize: 20,
    },

    // sizes and variants
    ...(size === 'small' &&
      variant === 'outlined' && {
        padding: '4px 10px',
      }),
    ...(size === 'medium' &&
      variant === 'outlined' && {
        padding: '6px 14px',
      }),
    ...(size === 'large' &&
      variant === 'outlined' && {
        padding: '10px 18px',
        fontSize: 15,
      }),
    ...(size === 'xlarge' &&
      variant === 'outlined' && {
        padding: '14px 22px',
        fontSize: 22,
      }),

    ...(size === 'small' &&
      variant !== 'outlined' && {
        padding: '6px 12px',
      }),
    ...(size === 'medium' &&
      variant !== 'outlined' && {
        padding: '8px 16px',
      }),
    ...(size === 'large' &&
      variant !== 'outlined' && {
        padding: '12px 20px',
        fontSize: 15,
      }),
    ...(size === 'xlarge' &&
      variant !== 'outlined' && {
        padding: '14px 22px',
        fontSize: 22,
      }),

    // variants
    ...(variant !== 'contained' && {
      backgroundColor: 'transparent',
      boxShadow: 'none !important',
    }),

    ...(pulse && {
      animation: 'pulse-animation 2s infinite',
    }),

    // colors & varians
    ...(color === 'default' &&
      variant === 'contained' && {
        backgroundColor: palette.primary.main,
        color: palette.primary.darkText,
      }),
    ...(color === 'primary' &&
      variant === 'contained' && {
        backgroundColor: palette.primary.main,
        color: palette.primary.lightText,
        boxShadow: '0 6px 22px 0 rgb(18 124 113 / 12%)',
      }),
    ...(color === 'secondary' &&
      variant === 'contained' && {
        backgroundColor: palette.secondary.main,
        color: palette.primary.darkText,
      }),
    ...(color === 'dark' &&
      variant === 'contained' && {
        backgroundColor: palette.primary.dark,
        color: palette.primary.lightText,
      }),
    ...(color === 'light' &&
      variant === 'contained' && {
        backgroundColor: palette.primary.light,
        color: palette.primary.darkText,
      }),

    ...(color === 'primary' &&
      variant === 'outlined' && {
        border: `2px solid ${palette.primary.main}`,
        color: palette.primary.main,
      }),
    ...(color === 'secondary' &&
      variant === 'outlined' && {
        border: `2px solid ${palette.secondary.main}`,
        color: palette.secondary.main,
      }),
    ...(color === 'dark' &&
      variant === 'outlined' && {
        border: `2px solid ${palette.primary.dark}`,
        color: palette.primary.dark,
      }),
    ...(color === 'light' &&
      variant === 'outlined' && {
        border: `2px solid ${palette.primary.light}`,
        color: palette.primary.light,
      }),

    ...(color === 'primary' &&
      variant === 'text' && {
        color: palette.primary.main,
      }),
    ...(color === 'secondary' &&
      variant === 'text' && {
        color: palette.secondary.main,
      }),
    ...(color === 'dark' &&
      variant === 'text' && {
        color: palette.primary.darkText,
      }),
    ...(color === 'light' &&
      variant === 'text' && {
        color: palette.primary.lightText,
      }),
  })
)

interface Props extends BaseButtonProps {
  children: ReactNode
  disabled?: boolean
}

const StyledButton: FC<Props> = (props: Props) => {
  const { children, onClick, disableHoverEffect, startIcon, endIcon, ...rest } =
    props
  return (
    <StyledButtonRoot
      onClick={onClick}
      disableHoverEffect={disableHoverEffect}
      disabled={props.disabled}
      {...rest}
    >
      {startIcon && (
        <Box component="span" sx={{ display: 'inherit', mr: 1, ml: -0.5 }}>
          {startIcon}
        </Box>
      )}
      <Box component="span">{children}</Box>
      {endIcon && (
        <Box component="span" sx={{ display: 'inherit', ml: 1, mr: -0.5 }}>
          {endIcon}
        </Box>
      )}
    </StyledButtonRoot>
  )
}

StyledButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
  size: 'medium',
  disableHoverEffect: false,
}

export default StyledButton
