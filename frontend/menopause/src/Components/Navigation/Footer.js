import * as React from 'react';
import { FormattedMessage } from "react-intl";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import logo from './logo.svg';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ alignItems: 'center',}}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Menopause - PierinaSY
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        backgroundColor: '#474973',
        color: 'white',
        minHeight: '15vh',
        py: '3em', 
      }}
    >
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src={logo} alt="Logo" height="40" />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">
              <FormattedMessage id="footer.tagline" defaultMessage="Empowering Women Through Menopause – Track, Understand, and Thrive" /> 
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item>
                <FacebookIcon />
              </Grid>
              <Grid item>
                <TwitterIcon />
              </Grid>
              <Grid item>
                <LinkedInIcon />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
