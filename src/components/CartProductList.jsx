import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Box, Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { CartProductSkeleton } from 'components/CartProductSkeleton';
import { CartProduct } from 'components/CartProduct';

export const CartProductList = (props) => {
   const { products, isLoading, dense, handleDelete, handleAmountChange } = props;

   if (isLoading && !products) {
      return (
         <Grid container>
            {Array.from({ length: 4 }).map((_item, index) => {
               return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid item key={index} xs={12}>
                     {/* eslint-disable-next-line react/no-array-index-key */}
                     <CartProductSkeleton dense={dense} odd={index % 2 !== 0} />
                  </Grid>
               );
            })}
         </Grid>
      );
   }

   if (!products || products?.length === 0) {
      return (
         <Grid>
            <Typography textAlign="center" variant="h5" gutterBottom>
               Currently there are no products in your cart. 😔
            </Typography>
            <Typography textAlign="center" variant="h5" gutterBottom>
               Maybe consider adding some?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
               <Button
                  component={RouterLink}
                  to="/products"
                  variant="contained"
                  size="large"
                  endIcon={<ShoppingBagIcon />}
                  sx={{ mt: 2, py: 2, px: 8 }}>
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
                     odd={index % 2 !== 0}
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
