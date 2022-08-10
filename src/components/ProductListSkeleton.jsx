import {
   Container,
   Grid,
   Paper,
   Card,
   Button,
   CardActions,
   CardContent,
   Skeleton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const ProductListSkeleton = () => {
   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={5}>
               {Array.from({ length: 8 }).map((_item, index) => {
                  return (
                     // eslint-disable-next-line react/no-array-index-key
                     <Grid item xs={3} key={index}>
                        <Card>
                           <Skeleton variant="rectangular" height={140} />
                           <CardContent>
                              <Skeleton variant="text" height={40} width="90%" />
                              <Skeleton variant="text" height={20} width="50px" />
                           </CardContent>
                           <CardActions>
                              <Grid
                                 container
                                 sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                                 <Grid item>
                                    <Button startIcon={<ShoppingCartIcon />} variant="contained">
                                       Add to cart
                                    </Button>
                                 </Grid>
                              </Grid>
                           </CardActions>
                        </Card>
                     </Grid>
                  );
               })}
            </Grid>
         </Paper>
      </Container>
   );
};
