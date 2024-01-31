import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import recommendations from './recommendations.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Feature2() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <Item>
            <Typography gutterBottom variant="h5" component="div">
            Get Recommendations
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Personalized recommendations tailored to your symptoms to help alleviate discomfort.
            </Typography>
        </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <Box
                sx={{
                    position: 'relative',
                    color: '#fff',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${recommendations})`,
                    minHeight: '400px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}