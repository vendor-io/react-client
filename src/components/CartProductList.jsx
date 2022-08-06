import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { CartProduct } from './CartProduct';
import { CartProductSkeleton } from './CartProductSkeleton';

export const CartProductList = (props) => {
   const { products, isLoading, handleDelete } = props;

   if (isLoading && !products) {
      return (
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
            <Grid>
               {Array.from({ length: 4 }).map((item, index) => {
                  return (
                     <Grid item key={index} xs={12}>
                        <CartProductSkeleton odd={index % 2 === 0 ? false : true} />
                     </Grid>
                  );
               })}
            </Grid>
         </Paper>
      );
   }

   if (products && products?.length === 0) {
      return (
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
            <Grid>
               <Typography textAlign="center" variant="h5" gutterBottom>
                  Currently there are no products in your cart. 😔
               </Typography>
               <Typography textAlign="center" variant="h5" gutterBottom>
                  Maybe consider adding some?
               </Typography>
               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
                  <Button component={RouterLink} to="/products" variant="contained" size="large">
                     Go to Products
                  </Button>
               </Box>
            </Grid>
         </Paper>
      );
   }

   return (
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
         <Grid>
            {products.map((product, index) => {
               return (
                  <Grid item xs={12}>
                     <CartProduct
                        key={product.ID}
                        id={product.ID}
                        name={product.Name}
                        category={product.CategoryID}
                        image={product.MainImage}
                        price={product.Price}
                        odd={index % 2 === 0 ? false : true}
                        handleDelete={handleDelete}
                     />
                  </Grid>
               );
            })}
         </Grid>
      </Paper>
   );
};
