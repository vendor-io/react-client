import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from './../hooks/useProduct';
import { useAuth } from './../hooks/useAuth';

import { ProductList } from './../components/ProductList';
import { ProductListSkeleton } from './../components/ProductListSkeleton';

function AllCategoryProducts() {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const { slug } = useParams();
   const { token } = useAuth();
   const { getProductsFromCategory } = useProduct();

   useEffect(() => {
      if (token) {
         getProductsFromCategory(token, slug).then((data) => setProducts(data));
         setIsLoading(false);
      }
   }, [token, slug]);

   if (isLoading) {
      return <ProductListSkeleton />;
   }

   return <ProductList products={products} />;
}

export default AllCategoryProducts;
