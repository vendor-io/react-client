import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from './../hooks/useCart';
import { CartProductList } from './../components/CartProductList';
import { formatPrice } from './../util/format-price';

import { Container, Paper, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Cart() {
   const [cart, setCart] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { token, user } = useAuth();
   const { getCartForUser, removeProductFromCart, changeAmountOfProductInCart } = useCart();

   const handleDelete = (productId) => {
      if (token) {
         setIsLoading(true);
         removeProductFromCart(token, { userId: user.uid, productId }).then((data) =>
            setCart(data)
         );
         setIsLoading(false);
      }
   };

   const handleAmountChange = (productId, amount) => {
      if (token) {
         setIsLoading(true);
         changeAmountOfProductInCart(token, { userId: user.uid, productId, amount }).then((data) =>
            setCart(data)
         );
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (token) {
         getCartForUser(token, user.uid).then((data) => setCart(data));
         setIsLoading(false);
      }
   }, [token]);

   useEffect(() => {
      console.log(cart);
   }, [cart]);

   if (isLoading) {
      return (
         <Container maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
               <CartProductList isLoading handleDelete={handleDelete} />
            </Paper>
         </Container>
      );
   }

   if (cart?.products?.length >= 0) {
      return (
         <Container maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
               <CartProductList
                  products={cart.products}
                  handleDelete={handleDelete}
                  handleAmountChange={handleAmountChange}
               />
               {cart?.products?.length > 0 && (
                  <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
                     <Grid item xs={3}>
                        <Paper variant="outlined" sx={{ mt: 1, p: { xs: 1, md: 2 } }}>
                           <Grid
                              container
                              sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                              <Grid item>
                                 <Typography variant="caption" sx={{ fontSize: '1.5rem' }}>
                                    Total
                                 </Typography>
                              </Grid>
                              <Grid>
                                 <Typography variant="subtitle2" sx={{ fontSize: '1.25rem' }}>
                                    ${formatPrice(cart.totalPrice)}
                                 </Typography>
                              </Grid>
                           </Grid>
                        </Paper>
                     </Grid>
                     <Grid item xs={3}>
                        <Paper variant="outlined" sx={{ mt: 1, p: { xs: 1, md: 2 } }}>
                           <Button
                              variant="contained"
                              color="success"
                              sx={{ p: 2 }}
                              size="large"
                              component={RouterLink}
                              to="/checkout"
                              endIcon={<ArrowForwardIosIcon />}
                              fullWidth>
                              Complete order
                           </Button>
                        </Paper>
                     </Grid>
                  </Grid>
               )}
            </Paper>
         </Container>
      );
   }
}

export default Cart;
