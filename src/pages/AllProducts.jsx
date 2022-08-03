import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProduct } from '../hooks/useProduct';

import { Grid, Container, Paper } from '@mui/material';
import { ProductCard } from './../components/ProductCard';

function AllProducts() {
   const [isLoading, setIsLoading] = useState(true);
   const [products, setProducts] = useState([]);

   const { token } = useAuth();
   const { getAllProducts } = useProduct();

   useEffect(() => {
      if (token) {
         getAllProducts(token).then((data) => setProducts(data));
         setIsLoading(false);
      }
   }, [token]);

   if (isLoading) {
      return <div>Loading...</div>;
   }

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
}

export default AllProducts;
