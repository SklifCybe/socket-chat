import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    allVariants: {
      color: '#fff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'yellow',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'yellow',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#ff0',
          color: '#000',
          '&:hover': {
            background: '#ff4',
          },
        },
      },
    },
  },
  palette: {
    background: {
      default: '#222',
    },
  },
});
