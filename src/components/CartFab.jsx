import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip, Fab, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const CartFab = () => {
   const [cartItemsAmount, setCartItemsAmount] = useState(0);

   useEffect(() => {
      if (localStorage.getItem('cartItemsAmount')) {
         setCartItemsAmount(parseInt(localStorage.getItem('cartItemsAmount')));
      }
   }, [localStorage]);

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
