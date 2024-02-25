import * as React from 'react';
import { FormattedMessage } from "react-intl";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from './logo.svg';
import { Link } from 'react-router-dom';


const pages = [
                <FormattedMessage id="nav.item1" defaultMessage="Product" />, 
                <FormattedMessage id="nav.item2" defaultMessage="Pricing" />, 
                <FormattedMessage id="nav.item3" defaultMessage="Blog" />
              ];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#474973'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/">
                    <img src={logo} alt="Logo" height="50" />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, py: 5, }}>
            <Button variant="contained" sx={{ mr: 2 }}
            component={Link} to="/signin">
              <FormattedMessage id="nav.loginButton" defaultMessage="Login" />
            </Button>
            <span></span>
            <Button variant="outlined"
            component={Link} to="/signup">
              <FormattedMessage id="nav.signupButton" defaultMessage="Sign up" />
            </Button>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;