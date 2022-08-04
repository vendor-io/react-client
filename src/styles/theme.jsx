import { createTheme } from '@mui/material';

export const theme = createTheme({
   palette: {
      type: 'light',
      primary: {
         main: '#ef9a9a'
      },
      secondary: {
         main: '#ffe082'
      }
   },
   overrides: {
      MuiButton: {
         root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px'
         }
      }
   }
});
export const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         main: '#ef9a9a'
      },
      secondary: {
         main: '#ffe082'
      }
   },
   overrides: {
      MuiButton: {
         root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px'
         }
      }
   }
});
