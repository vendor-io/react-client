import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useAuth } from 'hooks/useAuth';
import { useCart } from 'hooks/useCart';
import { usePayment } from 'hooks/usePayment';
import { PaymentContext } from 'context/payment-context';
import { CartProductList } from 'components/CartProductList';
import { formatPrice } from 'util/format-price';

function Cart() {
   const [cart, setCart] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { setPaymentPayload } = useContext(PaymentContext);
   const navigate = useNavigate();

   const { token, user } = useAuth();
   const { getCartForUser, removeProductFromCart, changeAmountOfProductInCart } = useCart();
   const { postPaymentIntent } = usePayment();

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

   const handleCheckout = async () => {
      await postPaymentIntent(token, {
         amount: cart?.totalPrice,
         source: 'pm_card_mastercard',
         receiptMail: user?.email
      }).then((data) => setPaymentPayload(data));

      navigate('/checkout');
   };

   useEffect(() => {
      if (token) {
         getCartForUser(token, user.uid).then((data) => setCart(data));
         setIsLoading(false);
      }
   }, [token, getCartForUser, user?.uid]);

   if (isLoading) {
      return (
         <Container maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
               <CartProductList isLoading handleDelete={handleDelete} />
            </Paper>
         </Container>
      );
   }

   if (cart?.products?.length >= 0 || !cart?.products) {
      return (
         <Container maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
               <CartProductList
                  products={cart?.products}
                  handleDelete={handleDelete}
                  handleAmountChange={handleAmountChange}
               />
               {cart?.products?.length > 0 && (
                  <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
                     <Grid item xs={3}>
                        <Paper variant="outlined" sx={{ mt: 1, p: { xs: 1, md: 2 } }}>
                           <Button
                              variant="contained"
                              color="success"
                              sx={{ p: 2 }}
                              size="large"
                              onClick={handleCheckout}
                              endIcon={<ArrowForwardIosIcon />}
                              fullWidth>
                              Complete order
                           </Button>
                        </Paper>
                     </Grid>
                     <Grid item xs={3}>
                        <Paper variant="outlined" sx={{ mt: 1, p: { xs: 1, md: 2 } }}>
                           <Grid
                              container
                              sx={{
                                 justifyContent: 'space-between',
                                 alignItems: 'center'
                              }}>
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
                  </Grid>
               )}
            </Paper>
         </Container>
      );
   }
}

export default Cart;
