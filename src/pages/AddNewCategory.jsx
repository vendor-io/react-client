import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCategory } from '../hooks/useCategory';

import { Container, Paper, Typography, Grid, TextField, Button } from '@mui/material';
import { Spinner } from '../components/Spinner';

function AddNewCategory() {
   const [isLoading, setIsLoading] = useState(true);

   const { register, handleSubmit } = useForm();

   const navigate = useNavigate();

   const { token, user } = useAuth();
   const { addNewCategory } = useCategory();

   useEffect(() => {
      if (token) {
         setIsLoading(false);
      }
   }, [token]);

   const onSubmit = (data) => {
      addNewCategory(token, user.uid, data);
      navigate('/categories');
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
               Add new address
            </Typography>
            <Grid
               container
               spacing={3}
               component="form"
               noValidate
               onSubmit={handleSubmit(onSubmit)}>
               <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                     required
                     id="categoryName"
                     name="categoryName"
                     label="Category name"
                     fullWidth
                     autoFocus
                     autoComplete="category"
                     variant="standard"
                     {...register('name', { required: true })}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     id="categoryDescription"
                     name="categoryDescription"
                     label="Description"
                     fullWidth
                     multiline
                     rows={3}
                     maxRows={5}
                     autoComplete="description"
                     variant="outlined"
                     {...register('description', { required: true })}
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button sx={{}} variant="contained" type="submit">
                     Submit
                  </Button>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default AddNewCategory;
