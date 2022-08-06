import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from './../hooks/useCart';
import { CartProductList } from './../components/CartProductList';
import { Container } from '@mui/material';

function Cart() {
   const [cart, setCart] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { token, user } = useAuth();
   const { getCartForUser, removeProductFromCart } = useCart();

   const handleDelete = (productId) => {
      if (token) {
         setIsLoading(true);
         removeProductFromCart(token, { userId: user.uid, productId });
         getCartForUser(token, user.uid).then((data) => setCart(data));
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
            <CartProductList isLoading handleDelete={handleDelete} />
         </Container>
      );
   }

   if (cart?.Products?.length >= 0) {
      return (
         <Container maxWidth="xl">
            <CartProductList products={cart.Products} handleDelete={handleDelete} />
         </Container>
      );
   }
}

export default Cart;
