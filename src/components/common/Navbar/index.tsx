import Image from 'next/image'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Link from 'next/link'
import { routes } from '@/src/data/routes'
import { palette } from '@/styles/palette'
import MobileRoutesMenu from './MobileRoutesMenu'
import UserMenu from './UserMenu'

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ backgroundColor: palette.primary.dark, width: '100vw' }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href={'/'}>
              <Image
                src="/img/balls/poke.webp"
                width={50}
                height={50}
                alt="pokeball logo"
              />
            </Link>
          </Box>
          <Box sx={{ mr: 2 }}>
            <Link href={'/'}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: palette.primary.lightText,
                  textDecoration: 'none',
                }}
              >
                WITP
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: palette.primary.lightText }} />
            </IconButton>
            <MobileRoutesMenu
              anchorElNav={anchorElNav}
              handleClose={handleCloseNavMenu}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Image
              src="/img/balls/poke.webp"
              width={50}
              height={50}
              alt="pokeball logo"
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: palette.primary.lightText,
              textDecoration: 'none',
            }}
          >
            WITP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((route) => (
              <Link href={route.path} key={route.id}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: palette.primary.lightText,
                    display: 'block',
                  }}
                >
                  {route.name}
                </Button>
              </Link>
            ))}
          </Box>
          <UserMenu
            anchorElUser={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </Box>
  )
}
export default ResponsiveAppBar
