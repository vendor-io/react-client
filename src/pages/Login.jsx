import { Paper, Container } from '@mui/material';

import { LoginForm } from './../components/LoginForm';

const Login = () => {
   return (
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <LoginForm />
         </Paper>
      </Container>
   );
};

export default Login;
