import { Grid, Container, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { ProductCard } from './../components/ProductCard';

function AllProducts() {
   const [isLoading, setIsLoading] = useState(true);
   const [products, setProducts] = useState([]);

   const getAllProducts = async () => {
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/products`, {
         method: 'GET',

         mode: 'cors',
         cache: 'no-cache'
      })
         .then((response) => response.json())
         .then((data) => setProducts(data));
   };

   useEffect(() => {
      getAllProducts();
      setIsLoading(false);
      console.log(products);
   }, []);

   if (isLoading) {
      return <div>Loading...</div>;
   }
   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={5}>
               {products.map((product) => {
                  return (
                     <Grid item xs={3} key={product.id}>
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
