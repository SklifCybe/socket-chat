import { createTheme } from '@mui/material';

const secondary = {
  main: '#2C6DFF',
  light: '#F2F1F2',
};

export const darkTheme = createTheme({
  palette: {
    secondary,
    mode: 'dark',
  },
});

export const lightTheme = createTheme({
  palette: {
    secondary,
    mode: 'light',
  },
});
