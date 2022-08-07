import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Box, Button } from '@mui/material';
import { CartProduct } from './CartProduct';
import { CartProductSkeleton } from './CartProductSkeleton';

export const CartProductList = (props) => {
   const { products, isLoading, dense, handleDelete, handleAmountChange } = props;

   if (isLoading && !products) {
      return (
         <Grid container>
            {Array.from({ length: 4 }).map((_item, index) => {
               return (
                  <Grid item key={index} xs={12}>
                     <CartProductSkeleton dense={dense} odd={index % 2 === 0 ? false : true} />
                  </Grid>
               );
            })}
         </Grid>
      );
   }

   if (products && products?.length === 0) {
      return (
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
      );
   }

   return (
      <Grid container>
         {products.map((product, index) => {
            return (
               <Grid item xs={12} key={product.id}>
                  <CartProduct
                     key={product.id}
                     id={product.id}
                     name={product.name}
                     category={{ name: product.categoryName, slug: product.categorySlug }}
                     image={product.mainImage}
                     price={product.price}
                     totalPrice={product.totalPrice}
                     amount={product.amount}
                     odd={index % 2 === 0 ? false : true}
                     dense={dense}
                     handleDelete={handleDelete}
                     handleAmountChange={handleAmountChange}
                  />
               </Grid>
            );
         })}
      </Grid>
   );
};
