import { Grid } from '@mui/material';
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
      <Grid container>
         {products.map((product) => {
            return (
               <Grid item key={product.id}>
                  <ProductCard
                     name={product.Name}
                     price={product.Price}
                     image={product.MainImage}
                  />
               </Grid>
            );
         })}
      </Grid>
   );
}

export default AllProducts;
