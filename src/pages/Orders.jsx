import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';

import { Container, Paper } from '@mui/material';
import { OrderList } from './../components/OrderList';

function Orders() {
   const [orders, setOrders] = useState([]);

   const { token, user } = useAuth();

   const { getOrdersForUser } = useOrder();

   useEffect(() => {
      if (token) {
         getOrdersForUser(token, user.uid).then((data) => setOrders(data));
      }
   }, [token]);

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
