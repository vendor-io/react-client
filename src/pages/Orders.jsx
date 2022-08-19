import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { useAuth } from 'hooks/useAuth';
import { useOrder } from 'hooks/useOrder';

import { OrderList } from 'components/OrderList';

function Orders() {
   const [orders, setOrders] = useState([]);

   const { token, user } = useAuth();

   const { getOrdersForUser } = useOrder();

   useEffect(() => {
      if (token) {
         getOrdersForUser(token, user.uid).then((data) => setOrders(data));
      }
   }, [token, getOrdersForUser, user?.uid]);

   if (orders || orders?.length === 0) {
      return (
         <Container component="main" maxWidth="md">
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Grid
                  container
                  sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  rowSpacing={2}>
                  <Grid item>
                     <Typography component="p" variant="h5" align="center">
                        Currently you have not placed any order. 🥱
                     </Typography>
                  </Grid>
                  <Grid item>
                     <Typography component="p" variant="h5" align="center">
                        Maybe it&apos;s time to place one?
                     </Typography>
                  </Grid>
                  <Grid item>
                     <Button
                        component={RouterLink}
                        to="/cart"
                        sx={{ mt: 2, py: 2, px: 8 }}
                        size="large"
                        variant="contained"
                        endIcon={<ShoppingCartCheckoutIcon />}>
                        Go to your cart
                     </Button>
                  </Grid>
               </Grid>
            </Paper>
         </Container>
      );
   }

   return (
      orders && (
         <Container component="main" maxWidth="xl">
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <OrderList orders={orders} />
            </Paper>
         </Container>
      )
   );
}

export default Orders;
