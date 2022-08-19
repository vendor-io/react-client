import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
   Box,
   Grid,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography,
   Link
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DoneIcon from '@mui/icons-material/Done';

import { useAuth } from 'hooks/useAuth';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'util/format-price';

export const ProductCard = (props) => {
   const { name, price, image, id } = props;
   const [isClicked, setIsClicked] = useState(false);
   const { token, user } = useAuth();
   const { addProductToCart } = useCart();

   const addProductCooldown = () => {
      setIsClicked(true);
      setTimeout(() => {
         setIsClicked(false);
      }, 3000);
      return () => clearTimeout();
   };

   const handleAddToCart = () => {
      if (token) {
         addProductToCart(token, { productId: id, userId: user.uid, amount: 1 }).then(() => {
            addProductCooldown();
         });
      }
   };

   return (
      <Card
         sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between'
         }}>
         <Box>
            <CardMedia component="img" alt={name} height="140" image={image} />
            <CardContent>
               <Link
                  gutterBottom
                  component={RouterLink}
                  sx={{ display: 'block' }}
                  to={`/products/${id}`}
                  variant="h5">
                  {name}
               </Link>
            </CardContent>
         </Box>
         <CardActions sx={{ pb: 2, px: 2 }}>
            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
               <Grid item>
                  <Typography variant="button" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                     ${formatPrice(price)}
                  </Typography>
               </Grid>
               <Grid item>
                  {isClicked ? (
                     <Button disabled color="success" startIcon={<DoneIcon />} variant="contained">
                        Added!
                     </Button>
                  ) : (
                     <Button
                        onClick={handleAddToCart}
                        startIcon={<ShoppingCartIcon />}
                        variant="contained">
                        Add to cart
                     </Button>
                  )}
               </Grid>
            </Grid>
         </CardActions>
      </Card>
   );
};
