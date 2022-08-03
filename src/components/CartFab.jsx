import { Link as RouterLink } from 'react-router-dom';
import { Tooltip, Fab, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const CartFab = () => {
   return (
      <Box
         sx={{
            position: 'fixed',
            zIndex: 9999,
            bottom: '30px',
            right: '25px'
         }}>
         <Tooltip title="View cart" arrow placement="top-start">
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
         </Tooltip>
      </Box>
   );
};
