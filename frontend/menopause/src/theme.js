import { createTheme } from '@mui/material/styles';
import { roboto } from '@fontsource/roboto';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#EAF7C7', 
    },
    secondary: {
      main: '#474973', 
    },
  },
});

export default theme;