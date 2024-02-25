import * as React from 'react';
import { FormattedMessage } from "react-intl";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import symptom from './symptoms.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Feature1() {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      py: 5,
     }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs>
          <Item>
            <Box
                sx={{
                    position: 'relative',
                    color: '#fff',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${symptom})`,
                    minHeight: '400px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography gutterBottom variant="h5" component="div">
              <FormattedMessage id="home.feature1.title" defaultMessage="Track your symptoms" />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <FormattedMessage id="home.feature1.description" 
              defaultMessage="Log your symptoms daily with detailed information to track changes over time." />
            </Typography>
        </Item>
        </Grid>
      </Grid>
    </Box>
  );
}