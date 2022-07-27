import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ProductCard = (props) => {
   const { name, price, image, id } = props;

   const formatPrice = () => {
      const stringPrice = price.toString();
      return `${stringPrice.substring(0, stringPrice.length - 2)}.${stringPrice.substring(
         stringPrice.length - 2,
         stringPrice.length
      )}`;
   };
   return (
      <Card sx={{ maxWidth: 345 }}>
         <CardMedia component="img" alt={name} height="140" image={image} />
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="right">
               {formatPrice()} $
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small">Add to cart</Button>
            <Button size="small">Learn More</Button>
         </CardActions>
      </Card>
   );
};
