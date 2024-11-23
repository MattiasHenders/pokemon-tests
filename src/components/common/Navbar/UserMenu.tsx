import { palette } from '@/styles/palette'
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  alpha,
  Icon,
} from '@mui/material'
import GuestIcon from '@mui/icons-material/Person'
import UserIcon from '@mui/icons-material/HowToReg'
import LoginIcon from '@mui/icons-material/Login'
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuthenticator } from '@aws-amplify/ui-react'

interface UserMenuProps {
  anchorElUser: null | HTMLElement
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}

export default ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}: UserMenuProps) => {
  const { signOut, user } = useAuthenticator()

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="user icon"
            sx={{ backgroundColor: palette.primary.light }}
          >
            {user ? (
              <UserIcon sx={{ color: palette.primary.dark }} />
            ) : (
              <GuestIcon sx={{ color: palette.primary.dark }} />
            )}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: '45px',
          '& .MuiMenu-list': {
            padding: 0,
            borderRadius: 0,
            border: 'none',
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user && (
          <Link href={'/profile'}>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                backgroundColor: palette.primary.light,
                '&:hover': {
                  backgroundColor: alpha(palette.primary.light, 0.8),
                },
              }}
            >
              <Icon
                sx={{ mr: 2, color: palette.primary.dark }}
                color="primary"
                component={UserIcon}
              />
              <Typography
                sx={{
                  textAlign: 'center',
                  color: palette.primary.darkText,
                }}
              >
                Account Details
              </Typography>
            </MenuItem>
          </Link>
        )}
        {!user && (
          <Link href={'/auth'}>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                backgroundColor: palette.primary.light,
                '&:hover': {
                  backgroundColor: alpha(palette.primary.light, 0.8),
                },
              }}
            >
              <Icon
                sx={{ mr: 2, color: palette.primary.dark }}
                color="primary"
                component={LoginIcon}
              />
              <Typography
                sx={{
                  textAlign: 'center',
                  color: palette.primary.darkText,
                }}
              >
                Login/Signup
              </Typography>
            </MenuItem>
          </Link>
        )}
        {user && (
          <MenuItem
            onClick={signOut}
            sx={{
              backgroundColor: palette.primary.light,
              '&:hover': {
                backgroundColor: alpha(palette.primary.light, 0.8),
              },
            }}
          >
            <Icon
              sx={{ mr: 2, color: palette.primary.dark }}
              color="primary"
              component={LogoutIcon}
            />
            <Typography
              sx={{
                textAlign: 'center',
                color: palette.primary.darkText,
              }}
            >
              Logout
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}
