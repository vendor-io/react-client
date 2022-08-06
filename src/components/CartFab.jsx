import { useEffect, useContext } from 'react';
import { CartContext } from '../context/cart-context';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip, Fab, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const CartFab = () => {
   const { cartItemsAmount, setCartItemsAmount } = useContext(CartContext);
   const { getCartForUser } = useCart();
   const { token, user } = useAuth();

   useEffect(() => {
      if (localStorage.getItem('cartItemsAmount')) {
         setCartItemsAmount(parseInt(localStorage.getItem('cartItemsAmount')));
      } else {
         let cartData;
         getCartForUser(token, user.uid).then((data) => (cartData = data?.products));

         if (cartData.length > 0) {
            setCartItemsAmount(cartData.length);
            localStorage.setItem('cartItemsAmount', cartData.length);
         } else {
            setCartItemsAmount(0);
            localStorage.setItem('cartItemsAmount', 0);
         }
      }
   }, []);

   return (
      <Box
         sx={{
            position: 'fixed',
            zIndex: 9999,
            bottom: '30px',
            right: '25px'
         }}>
         <Tooltip title="View cart" arrow placement="top-start">
            <Badge
               badgeContent={cartItemsAmount}
               color="secondary"
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
               }}>
               <Fab
                  component={RouterLink}
                  color="primary"
                  aria-label="add"
                  to="/cart"
                  sx={{
                     '&:hover': {
                        color: '#000'
                     }
                  }}>
                  <ShoppingCartIcon />
               </Fab>
            </Badge>
         </Tooltip>
      </Box>
   );
};
