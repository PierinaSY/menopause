import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Stats() {
  return (
    <Box sx={{ 
        flexGrow: 1,
        py: 15,
    }}
        >
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>
            <Typography component="div" variant="h3">
                +40
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                Recorded Symptoms
            </Typography>
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Typography component="div" variant="h3">
                +20
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                Personalized Recommendations
            </Typography>
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Typography component="div" variant="h3">
                +100
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                Registered Women
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}