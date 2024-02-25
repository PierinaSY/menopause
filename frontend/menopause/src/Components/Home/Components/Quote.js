import * as React from 'react';
import { FormattedMessage } from "react-intl";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import annaImage from './anna.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Quote() {
  return (
    <Box sx={{ 
        flexGrow: 1,
        py: 10,
        mx: 10,
    }}
        >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs>
          <Item sx={{ alignContent: 'center', justifyItems: 'center',}}>
            <Box>
                <StarIcon sx={{ fontSize: 40 }} />
                <StarIcon sx={{ fontSize: 40 }} />
                <StarIcon sx={{ fontSize: 40 }} />
                <StarIcon sx={{ fontSize: 40 }} />
                <StarIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box sx={{ px: 20}}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <FormattedMessage id="home.quote" 
                  defaultMessage="Using this app has been a game-changer for me during my menopause journey. 
                  The ability to track my symptoms, receive tailored recommendations, and visualize 
                  trends has empowered me to better manage this phase of life. I highly recommend it 
                  to every woman navigating menopause—it's a must-have companion!" />
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Avatar src={annaImage} />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}