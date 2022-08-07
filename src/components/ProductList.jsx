import { Container, Paper, Grid, Typography } from '@mui/material';
import { ProductCard } from './ProductCard';

export const ProductList = (props) => {
   const { products } = props;

   if (products.length === 0) {
      return (
         <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Typography variant="h4" textAlign="center">
                  Currently there are no products. 😩
               </Typography>
            </Paper>
         </Container>
      );
   }

   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={5}>
               {products.map((product) => {
                  return (
                     <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard
                           name={product.name}
                           price={product.price}
                           image={product.mainImage}
                           id={product.id}
                        />
                     </Grid>
                  );
               })}
            </Grid>
         </Paper>
      </Container>
   );
};
