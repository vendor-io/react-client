import {
   Box,
   Container,
   Paper,
   Grid,
   Skeleton,
   Typography,
   Stack,
   Divider,
   Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const ProductPageSkeleton = () => {
   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={5}>
               <Grid item xs={6}>
                  <Stack spacing={2}>
                     <Skeleton variant="rectangular" height={600} />
                     <Grid container columnSpacing={2} sx={{ transform: 'translateX(-16px)' }}>
                        <Grid xs={4} item>
                           <Skeleton variant="rectangular" height={200} />
                        </Grid>
                        <Grid xs={4} item>
                           <Skeleton variant="rectangular" height={200} />
                        </Grid>
                        <Grid xs={4} item>
                           <Skeleton variant="rectangular" height={200} />
                        </Grid>
                     </Grid>
                  </Stack>
               </Grid>
               <Grid item xs={6}>
                  <div style={{ marginBottom: '15px' }}>
                     <Skeleton variant="rectangular" height={50} />
                  </div>
                  <Grid container spacing={2}>
                     <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="overline">Category</Typography>
                     </Grid>
                     <Grid item xs={12} md={10}>
                        <Skeleton variant="text" width="40%" height={30} />
                     </Grid>
                     <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="overline">EAN</Typography>
                     </Grid>
                     <Grid item xs={12} md={10}>
                        <Skeleton variant="text" width="25%" height={30} />
                     </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Button
                     startIcon={<ShoppingCartIcon />}
                     fullWidth
                     variant="contained"
                     sx={{ mb: 2, py: 2 }}>
                     Add to cart
                  </Button>
                  <Typography variant="overline" sx={{ display: 'block' }}>
                     Description
                  </Typography>
                  <Skeleton variant="text" width="20%" height={40} />
                  <Skeleton variant="text" width="70%" height={30} />
                  <Skeleton variant="text" width="74%" height={30} />
                  <Skeleton variant="text" width="60%" height={30} />
                  <Box sx={{ height: '50px' }} />
                  <Skeleton variant="text" width="27%" height={40} />
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="65%" height={30} />
                  <Skeleton variant="text" width="80%" height={30} />
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
};
