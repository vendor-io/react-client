import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
   Box,
   Container,
   Grid,
   Paper,
   Typography,
   InputLabel,
   Select,
   MenuItem,
   FormControl,
   Button
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { formatPrice } from 'util/format-price';

import { useAddress } from 'hooks/useAddress';
import { useAuth } from 'hooks/useAuth';
import { useCart } from 'hooks/useCart';
import { usePayment } from 'hooks/usePayment';

import { ThemeContext } from 'context/theme-context';
import { PaymentContext } from 'context/payment-context';

import { CartProductList } from 'components/CartProductList';

function Checkout() {
   const [cart, setCart] = useState({});
   const [address, setAddress] = useState(null);
   const [addresses, setAddresses] = useState([]);
   const [transactionLoading, setTransactionLoading] = useState(false);

   const { darkMode } = useContext(ThemeContext);
   const { paymentPayload, setPaymentPayload } = useContext(PaymentContext);

   const { getAddressesForUser } = useAddress();
   const { token, user } = useAuth();
   const { getCartForUser } = useCart();
   const { postPaymentIntent } = usePayment();

   const stripe = useStripe();
   const elements = useElements();

   const handleAddressChange = (e) => {
      setAddress(e.target.value);
   };

   const handleStartTransaction = () => {
      setTransactionLoading(true);
      postPaymentIntent(token, {
         amount: cart?.totalPrice,
         source: 'pm_card_mastercard',
         receiptMail: user?.email
      }).then((data) => setPaymentPayload(data));
   };

   const handleSubmitOrder = async (e) => {
      e.preventDefault();
      setTransactionLoading(true);

      const orderRequest = {
         userId: user.uid,
         addressId: address,
         productsInOrder: cart?.products,
         totalPrice: cart?.totalPrice
      };

      sessionStorage.setItem('orderRequest', JSON.stringify(orderRequest));

      if (!stripe || !elements) {
         return;
      }

      const result = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${import.meta.env.VITE_DOMAIN}/checkout/success`
         }
      });
      if (result.error) {
         setTransactionLoading(false);
      } else {
         // eslint-disable-next-line no-console
         console.log('Success!');
      }
   };

   useEffect(() => {
      if (token) {
         getAddressesForUser(token, user.uid).then((data) => {
            setAddresses(data);
            setAddress(data ? data[0]?.id : null);
         });
         getCartForUser(token, user.uid).then((data) => setCart(data));
      }
   }, [token, getAddressesForUser, getCartForUser, user?.uid]);

   useEffect(() => {
      if (addresses) {
         setAddress(addresses[0]?.id);
      }
   }, [addresses]);

   useEffect(() => {
      if (paymentPayload?.clientSecret !== null) {
         setTransactionLoading(false);
      }

      return () => setTransactionLoading(false);
   }, [paymentPayload]);

   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
               Checkout
            </Typography>
            <Grid container columnSpacing={3} sx={{ mb: 2 }}>
               <Grid item xs={10}>
                  <FormControl fullWidth>
                     <InputLabel id="checkout-address-select-label">Address</InputLabel>
                     <Select
                        labelId="checkout-address-select-label"
                        id="checkout-address-select"
                        value={address || ''}
                        label="Address"
                        required
                        onChange={handleAddressChange}
                        disabled={addresses?.length === 1}>
                        {addresses.map((addressItem) => {
                           return (
                              <MenuItem key={addressItem.id} value={addressItem.id}>
                                 {`${addressItem.firstName} ${addressItem.lastName}, ${addressItem.street} ${addressItem.houseNumber}, ${addressItem.phoneNumber}`}
                              </MenuItem>
                           );
                        })}
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={2} sx={{ alignItems: 'center', display: 'flex' }}>
                  <Button
                     color="success"
                     variant="contained"
                     fullWidth
                     component={RouterLink}
                     endIcon={<AddIcon />}
                     to="/addresses/new"
                     size="large">
                     Add new
                  </Button>
               </Grid>
            </Grid>
            {!cart?.products && <CartProductList isLoading />}
            {cart?.products && <CartProductList products={cart.products} dense />}
            <Box component="form" onSubmit={handleSubmitOrder}>
               <Box sx={{ py: 1 }}>
                  <PaymentElement theme={darkMode ? 'night' : 'flat'} />
               </Box>
               <Grid
                  container
                  columnSpacing={3}
                  sx={{ mt: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                  <Grid item xs={5}>
                     {paymentPayload.clientSecret === null && (
                        <Button
                           disabled={!address}
                           type="button"
                           color="warning"
                           variant="contained"
                           fullWidth
                           endIcon={<CreditCardIcon />}
                           onClick={handleStartTransaction}
                           size="large"
                           sx={{ py: 2 }}>
                           Checkout
                        </Button>
                     )}
                     {paymentPayload.clientSecret !== null && transactionLoading && (
                        <LoadingButton
                           disabled
                           loading
                           loadingPosition="end"
                           variant="contained"
                           fullWidth
                           size="large"
                           sx={{ py: 2 }}>
                           Loading...
                        </LoadingButton>
                     )}
                     {paymentPayload.clientSecret !== null && !transactionLoading && (
                        <Button
                           disabled={
                              !stripe ||
                              cart?.products?.length === 0 ||
                              typeof address === 'undefined'
                           }
                           color="success"
                           variant="contained"
                           fullWidth
                           endIcon={<ShoppingCartCheckoutIcon />}
                           type="submit"
                           size="large"
                           sx={{ py: 2 }}>
                           Submit order
                        </Button>
                     )}
                  </Grid>
                  <Grid item xs={3}>
                     <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
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
                              {cart?.totalPrice && (
                                 <Typography variant="subtitle2" sx={{ fontSize: '1.25rem' }}>
                                    ${formatPrice(cart?.totalPrice)}
                                 </Typography>
                              )}
                           </Grid>
                        </Grid>
                     </Paper>
                  </Grid>
               </Grid>
            </Box>
         </Paper>
      </Container>
   );
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const withElements = (Component) => () => {
   const { paymentPayload } = useContext(PaymentContext);
   return (
      <Elements stripe={stripePromise} options={paymentPayload}>
         <Component />
      </Elements>
   );
};

export default withElements(Checkout);
