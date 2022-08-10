import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Typography, Box, Skeleton } from '@mui/material';
import { format } from 'date-fns';

import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';
import { BreadcrumbsContext } from '../context/breadcrumbs-context';
import { formatPrice } from '../util/format-price';

import { CartProductList } from '../components/CartProductList';

function Order() {
   const [order, setOrder] = useState({});
   const [products, setProducts] = useState([]);
   const { setCurrentBreadcrumb } = useContext(BreadcrumbsContext);
   const { oid } = useParams();
   const navigate = useNavigate();

   const { token, user } = useAuth();
   const { getOrderForUserById } = useOrder();

   setCurrentBreadcrumb(`Order ${oid}`);

   useEffect(() => {
      if (token) {
         getOrderForUserById(token, oid).then((data) => setOrder(data));
      }
   }, [token, getOrderForUserById, oid]);

   useEffect(() => {
      if (order?.uid !== user?.uid) {
         navigate('/orders');
      }
   }, [order, navigate, user?.uid]);

   useEffect(() => {
      if (order?.productsInOrder?.length > 0) {
         const productsArr = [];
         order.productsInOrder.forEach((product) => {
            const tempProduct = {
               ...product.product,
               amount: product.amount,
               totalPrice: product.amount * product.product.price
            };

            productsArr.push(tempProduct);
         });

         setProducts(productsArr);
      }
   }, [order]);

   return (
      <Container>
         <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
            <Grid container spacing={3} sx={{ justifyContent: 'space-between', mb: 2 }}>
               <Grid item xs={2}>
                  <Box sx={{ p: 2 }}>
                     <Typography variant="h6">
                        Order <strong>{oid}</strong>
                     </Typography>
                     {!order?.createdAt && <Skeleton variant="text" width={120} height={30} />}
                     {order?.createdAt && (
                        <Typography variant="overline">
                           {format(new Date(order?.createdAt), 'd MMMM yyyy')}
                        </Typography>
                     )}
                  </Box>
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
                        <Grid item>
                           {!order?.totalPrice && <Skeleton height={70} width={90} />}
                           {order?.totalPrice && (
                              <Typography variant="subtitle2" sx={{ fontSize: '1.25rem' }}>
                                 ${formatPrice(order?.totalPrice)}
                              </Typography>
                           )}
                        </Grid>
                     </Grid>
                  </Paper>
               </Grid>
            </Grid>
            {!products.length > 0 && <CartProductList isLoading />}
            {products && <CartProductList products={products} dense />}
         </Paper>
      </Container>
   );
}

export default Order;
