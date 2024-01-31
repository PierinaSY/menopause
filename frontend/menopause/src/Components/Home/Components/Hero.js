import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function Hero(){
    return (
        <Paper
      sx={{
        position: 'relative',
        background: 'rgb(252,252,252)',
        background: 'linear-gradient(15deg, rgba(252,252,252,1) 0%, rgba(234,247,207,1) 63%, rgba(235,239,191,1) 100%)',
        width: '100vw', // Use full viewport width
        minHeight:'60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Box to create an overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(10, 0, 0, 0.1)', // Adjust the opacity as needed
        }}
      />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} md={6}>
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" color="inherit" paragraph>
                    Track, Understand, and Thrive
            </Typography>
            <Typography variant="h2" color="inherit" gutterBottom
                sx={{
                    paddingBlockEnd: 5,
                }}
            >
              Empowering Women Through Menopause
            </Typography>
            
            <Button color="primary" variant="contained" href="/signup" sx={{ mx: 1 }}>
              Start Today
            </Button>
            <Button color="secondary" variant="contained">
             Learn More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
              
    );
}

export default Hero;
