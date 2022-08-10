import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import {
   Avatar,
   Button,
   TextField,
   FormControlLabel,
   Checkbox,
   Link,
   Box,
   Grid,
   Typography,
   Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();

   const navigate = useNavigate();

   const { signInWithGoogle, signInWithFacebook, signInWithGithub, signInWithTwitter } = useAuth();

   const onSubmit = async (data) => {
      console.log(data);

      const authentication = getAuth();

      await signInWithEmailAndPassword(authentication, data.email, data.password);
      onAuthStateChanged(navigate('/products'));
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
            <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
            Sign in
         </Typography>
         <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
               autoFocus
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
            <FormControlLabel
               control={<Checkbox value="remember" color="primary" />}
               label="Remember me"
            />
            <Grid container columnSpacing={2} sx={{ my: 3 }}>
               <Grid item xs={3}>
                  <Button
                     variant="contained"
                     color="google"
                     fullWidth
                     size="large"
                     onClick={signInWithGoogle}
                     sx={{ py: 2 }}>
                     <GoogleIcon sx={{ fontSize: '2rem' }} />
                  </Button>
               </Grid>
               <Grid item xs={3}>
                  <Button
                     variant="contained"
                     color="facebook"
                     fullWidth
                     size="large"
                     onClick={signInWithFacebook}
                     sx={{ py: 2 }}>
                     <FacebookIcon sx={{ fontSize: '2rem' }} />
                  </Button>
               </Grid>
               <Grid item xs={3}>
                  <Button
                     variant="contained"
                     color="github"
                     fullWidth
                     size="large"
                     onClick={signInWithGithub}
                     sx={{ py: 2 }}>
                     <GitHubIcon sx={{ fontSize: '2rem' }} />
                  </Button>
               </Grid>
               <Grid item xs={3}>
                  <Button
                     variant="contained"
                     color="twitter"
                     fullWidth
                     size="large"
                     onClick={signInWithTwitter}
                     sx={{ py: 2 }}>
                     <TwitterIcon sx={{ fontSize: '2rem', color: 'white' }} />
                  </Button>
               </Grid>
            </Grid>
            <Grid
               container
               sx={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  columnGap: '16px'
               }}>
               <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2, px: 5 }}>
                  Sign in
               </Button>
            </Grid>
            <Grid container>
               <Grid item xs>
                  <Link component={RouterLink} to="/dev" variant="body2">
                     Forgot password?
                  </Link>
               </Grid>
               <Grid item>
                  Don&apos;t have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="body2">
                     Sign Up
                  </Link>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};
