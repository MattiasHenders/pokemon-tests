import { routes } from '@/src/data/routes'
import { palette } from '@/styles/palette'
import { Menu, MenuItem, alpha, Typography } from '@mui/material'
import Link from 'next/link'

interface MobileRoutesMenuProps {
  anchorElNav: null | HTMLElement
  handleClose: () => void
}
export default ({ anchorElNav, handleClose }: MobileRoutesMenuProps) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleClose}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiMenu-list': {
          padding: 0,
          borderRadius: 0,
          border: 'none',
        },
      }}
    >
      {routes.map((route) => (
        <Link href={route.path} key={route.id}>
          <MenuItem
            onClick={handleClose}
            sx={{
              backgroundColor: palette.primary.light,
              '&:hover': {
                backgroundColor: alpha(palette.primary.light, 0.8),
              },
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: palette.primary.darkText,
              }}
            >
              {route.name}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </Menu>
  )
}
