import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Quicksand, Roboto, Arial',
    fontWeightBold: 700,
  },
});

export default theme;
