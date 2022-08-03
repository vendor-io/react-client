import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProduct } from '../hooks/useProduct';

import { ProductList } from './../components/ProductList';

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

   return <ProductList products={products} />;
}

export default AllProducts;
