import { createTheme } from '@mui/material/styles';
import { roboto } from '@fontsource/roboto';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#EAF7C7', // Your primary color
    },
    secondary: {
      main: '#474973', // Your secondary color
    },
  },
});

export default theme;