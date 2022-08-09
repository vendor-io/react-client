import { Container, Paper, Typography } from '@mui/material';

function Home() {
   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
               Home {'(todo)'}
            </Typography>
         </Paper>
      </Container>
   );
}

export default Home;
