import { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useOrder } from 'hooks/useOrder';

import { CartContext } from 'context/cart-context';

import { Container, Paper, Grid, Typography, Skeleton, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CheckoutSuccess() {
   const [isRequestConsumed, setIsRequestConsumed] = useState(false);
   const [request, setRequest] = useState({});
   const [response, setResponse] = useState({});

   const { setCartItemsAmount } = useContext(CartContext);

   const { token } = useAuth();
   const { createOrder } = useOrder();

   useEffect(() => {
      if (token && request && !isRequestConsumed) {
         createOrder(token, request).then((data) => setResponse(data));

         setIsRequestConsumed(true);
         sessionStorage.removeItem('orderRequest');

         setCartItemsAmount(0);
         localStorage.setItem('cartItemsAmount', 0);
      }
   }, [token]);

   useEffect(() => {
      setRequest(JSON.parse(sessionStorage.getItem('orderRequest')));
   }, []);

   console.log('response', response);

   if (!response || !response.id) {
      return (
         <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                  <Grid
                     item
                     xs={12}
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '1rem'
                     }}>
                     <Skeleton variant="circular" width={110} height={110} />
                     <Skeleton variant="text" height={50} width={150} />
                  </Grid>
                  <Grid
                     item
                     xs={8}
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                     }}>
                     <Skeleton variant="text" width={220} />
                     <Skeleton variant="text" width={80} />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                     <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                        <Grid item xs={4}>
                           <Skeleton width="100%" height={100} />
                        </Grid>
                        <Grid item xs={4}>
                           <Skeleton width="100%" height={100} />
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            </Paper>
         </Container>
      );
   }

   return (
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
               <Grid
                  item
                  xs={12}
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     flexDirection: 'column',
                     gap: '1rem'
                  }}>
                  <CheckCircleIcon sx={{ fontSize: '8rem' }} color="success" />
                  <Typography fontSize={36}>Success!</Typography>
               </Grid>
               <Grid item xs={8}>
                  <Typography textAlign="center" gutterBottom>
                     Your order has been placed successfully.
                  </Typography>
                  <Typography textAlign="center" gutterBottom>
                     Order ID: <strong>{response.id}</strong>
                  </Typography>
               </Grid>
               <Grid item xs={12} sx={{ mt: 3 }}>
                  <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                     <Grid item xs={4}>
                        <Button
                           component={RouterLink}
                           to={`/orders/${response?.id}`}
                           fullWidth
                           sx={{ py: 2 }}
                           variant="contained">
                           View your order
                        </Button>
                     </Grid>
                     <Grid item xs={4}>
                        <Button
                           component={RouterLink}
                           to="/orders"
                           fullWidth
                           sx={{ py: 2 }}
                           variant="outlined">
                           Browse your orders
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default CheckoutSuccess;
