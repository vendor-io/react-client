import { Container, Paper, CircularProgress } from '@mui/material';

export const Spinner = (props) => {
   const { variant } = props;
   return (
      <Container component="main" maxWidth={variant ? variant : 'sm'} sx={{ mb: 4 }}>
         <Paper
            variant="outlined"
            sx={{
               my: { xs: 3, md: 6 },
               p: { xs: 2, md: 3 },
               display: 'flex',
               justifyContent: 'center',
               height: '500px'
            }}>
            <CircularProgress size={150} />
         </Paper>
      </Container>
   );
};
