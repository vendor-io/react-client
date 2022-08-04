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
               <Typography variant="button" color="text.secondary" textAlign="right">
                  {formatPrice(price)} $
               </Typography>
            </CardContent>
         </Box>
         <CardActions sx={{ pb: 2, pr: 1 }}>
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
