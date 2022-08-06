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
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../util/format-price';

export const ProductCard = (props) => {
   const { name, price, image, id } = props;

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
                  <Button startIcon={<ShoppingCartIcon />} variant="contained">
                     Add to cart
                  </Button>
               </Grid>
            </Grid>
         </CardActions>
      </Card>
   );
};
