import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { Avatar, Button, TextField, Link, Box, Grid, Typography, Alert } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

export const RegisterForm = () => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm();

   const navigate = useNavigate();

   const onSubmit = async (data) => {
      console.log(data);

      const authentication = getAuth();

      await createUserWithEmailAndPassword(authentication, data.email, data.password).then(
         (response) => {
            navigate('/products');
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
         }
      );
   };

   return (
      <Box
         sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
         }}>
         <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <KeyIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            Sign up
         </Typography>
         <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
               margin="normal"
               autoFocus
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
               {...register('email', {
                  required: true,
                  minLength: 5,
                  maxLength: 30
               })}
            />
            {errors.email && (
               <Alert severity="error">
                  This field is required, must contain 5-30 characters and be a valid email address.
               </Alert>
            )}
            <TextField
               margin="normal"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               autoComplete="current-password"
               {...register('password', {
                  required: true,
                  minLength: 10
               })}
            />
            {errors.password && (
               <Alert severity="error">
                  This field is required and must contain at least 10 characters.
               </Alert>
            )}
            <Grid
               container
               sx={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  columnGap: '16px'
               }}>
               <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2, px: 5 }}>
                  Register
               </Button>
            </Grid>
            <Grid container>
               <Grid item xs>
                  <Link component={RouterLink} to="/dev" variant="body2">
                     Forgot password?
                  </Link>
               </Grid>
               <Grid item>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="body2">
                     Sign In
                  </Link>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};
