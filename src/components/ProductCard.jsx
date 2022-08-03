import {
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
import { Link as RouterLink } from 'react-router-dom';

export const ProductCard = (props) => {
   const { name, price, image, id } = props;

   const formatPrice = (value) => {
      const stringPrice = value.toString();
      if (stringPrice.length === 1) {
         return `0.0${stringPrice}`;
      } else if (stringPrice.length === 2) {
         return `0.${stringPrice.substring(stringPrice.length - 2, stringPrice.length)}`;
      }
      return `${stringPrice.substring(0, stringPrice.length - 2)}.${stringPrice.substring(
         stringPrice.length - 2,
         stringPrice.length
      )}`;
   };
   return (
      <Card>
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
            <Typography variant="button" color="text.secondary" textAlign="right">
               {formatPrice(price)} $
            </Typography>
         </CardContent>
         <CardActions>
            <Grid container sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
               <Grid item>
                  <Button startIcon={<ShoppingCartIcon />} variant="contained">
                     Add to cart
                  </Button>
               </Grid>
            </Grid>
         </CardActions>
      </Card>
   );
};
