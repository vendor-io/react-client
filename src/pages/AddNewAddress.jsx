import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material';

import { Spinner } from 'components/Spinner';
import { useAuth } from 'hooks/useAuth';
import { useAddress } from 'hooks/useAddress';

function AddNewAddress() {
   const [isLoading, setIsLoading] = useState(true);

   const { register, handleSubmit } = useForm();

   const navigate = useNavigate();

   const { token, user } = useAuth();
   const { addNewAddress } = useAddress();

   useEffect(() => {
      if (token) {
         setIsLoading(false);
      }
   }, [token]);

   const onSubmit = (data) => {
      const submitData = { userId: user.uid, ...data };
      addNewAddress(token, submitData);
      navigate('/addresses');
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
               Add new address
            </Typography>
            <Grid
               container
               spacing={3}
               component="form"
               noValidate
               onSubmit={handleSubmit(onSubmit)}
               sx={{ justifyContent: 'center' }}>
               <Grid item xs={6} sx={{ mt: 1 }}>
                  <TextField
                     id="firstName"
                     name="firstName"
                     label="First Name"
                     fullWidth
                     autoFocus
                     autoComplete="given-name"
                     variant="outlined"
                     {...register('firstName', { required: true })}
                  />
               </Grid>
               <Grid item xs={6}>
                  <TextField
                     id="lastName"
                     name="lastName"
                     label="Last name"
                     fullWidth
                     autoComplete="family-name"
                     variant="outlined"
                     {...register('lastName', { required: true })}
                  />
               </Grid>
               <Grid item xs={9}>
                  <TextField
                     id="street"
                     name="street"
                     label="Street"
                     fullWidth
                     autoComplete="address-line1"
                     variant="outlined"
                     {...register('street', { required: true })}
                  />
               </Grid>
               <Grid item xs={3}>
                  <TextField
                     id="houseNumber"
                     name="houseNumber"
                     label="Number"
                     fullWidth
                     autoComplete="address-line2"
                     variant="outlined"
                     {...register('houseNumber', { required: true })}
                  />
               </Grid>
               <Grid item xs={3}>
                  <TextField
                     id="postalCode"
                     name="postalCode"
                     label="Postal Code"
                     fullWidth
                     autoComplete="postal-code"
                     variant="outlined"
                     {...register('postalCode', { required: true })}
                  />
               </Grid>
               <Grid item xs={5}>
                  <TextField
                     id="city"
                     name="city"
                     label="City"
                     fullWidth
                     autoComplete="address-level2"
                     variant="outlined"
                     {...register('city', { required: true })}
                  />
               </Grid>
               <Grid item xs={4}>
                  <TextField
                     id="country"
                     name="country"
                     label="Country"
                     fullWidth
                     autoComplete="country-name"
                     variant="outlined"
                     {...register('country', { required: true })}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     id="phoneNumber"
                     name="phoneNumber"
                     label="Phone number"
                     fullWidth
                     autoComplete="tel"
                     variant="outlined"
                     {...register('phoneNumber', { required: true })}
                  />
               </Grid>
               <Grid item xs={10}>
                  <Button sx={{ py: 2 }} size="large" variant="contained" fullWidth type="submit">
                     Submit
                  </Button>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default AddNewAddress;
