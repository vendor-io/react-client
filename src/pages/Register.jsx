import { Paper, Container } from '@mui/material';

import { RegisterForm } from 'components/RegisterForm';

const Register = () => {
   return (
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <RegisterForm />
         </Paper>
      </Container>
   );
};

export default Register;
