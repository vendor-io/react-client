import { Container, Paper, Grid } from '@mui/material';
import { ProductCard } from './ProductCard';

export const ProductList = (props) => {
   const { products } = props;

   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={5}>
               {products.map((product) => {
                  return (
                     <Grid item xs={3} key={product.ID}>
                        <ProductCard
                           name={product.Name}
                           price={product.Price}
                           image={product.MainImage}
                           id={product.ID}
                        />
                     </Grid>
                  );
               })}
            </Grid>
         </Paper>
      </Container>
   );
};
