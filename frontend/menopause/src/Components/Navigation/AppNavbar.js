import * as React from 'react';
import { FormattedMessage } from "react-intl";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const userData = JSON.parse(sessionStorage.getItem('user'));


const settings = [
  { text: <FormattedMessage id="navApp.item1" defaultMessage="Profile" />, route: '/profile' },
  { text: <FormattedMessage id="navApp.item2" defaultMessage="Dashboard" />, route: '/patterns' },
  { text: <FormattedMessage id="navApp.item3" defaultMessage="Reports" />, route: '/reports' },
  { text: <FormattedMessage id="navApp.item4" defaultMessage="Sign out" />, route: '/' }, // Redirect to home after sign-out
];

function ResponsiveAppNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const history = useNavigate();


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

  const handleSignOut = async () => {
    try {
      // Call the Django logout endpoint
      await axios.post("http://127.0.0.1:8000/api/logout");

      // Clear user data from local storage (or session storage)
      sessionStorage.removeItem('user');

      // Redirect to the home page
      history('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      // Close the user menu
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar sx={{ backgroundColor: '#474973'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>         
            <IconButton edge="start" color="inherit" aria-label="menu" href="/meno">
                    <img src={logo} alt="Logo" height="50" />
            </IconButton>
            </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" sx={{ mr: 2 }}
            component={Link} to="/track">
              <FormattedMessage id="navApp.add" defaultMessage="Add Symptom" /></Button>
            <span></span>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={() => (setting.text.props.id === 'navApp.item4' ? handleSignOut() : handleCloseUserMenu())}>
                  <Link to={setting.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">{setting.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppNavbar;