import { Box, Container, Paper } from '@mui/material';

export const MainContainer = (props) => {
   const { children, maxWidth = 'xl', sx } = props;
   return (
      <Box
         sx={{
            backgroundColor: (theme) =>
               theme.palette.mode === 'light' ? theme.palette.grey[50] : '',
            flexGrow: 1,
            height: '100vh',
            py: { xs: 3, md: 6 }
         }}>
         <Container component="main" maxWidth={maxWidth} sx={{ mb: 4, ...sx }}>
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
               {children}
            </Paper>
         </Container>
      </Box>
   );
};
