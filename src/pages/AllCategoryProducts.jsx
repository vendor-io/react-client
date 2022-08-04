import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from './../hooks/useProduct';
import { useAuth } from './../hooks/useAuth';
import { BreadcrumbsContext } from './../context/breadcrumbs-context';

import { ProductList } from './../components/ProductList';
import { ProductListSkeleton } from './../components/ProductListSkeleton';

function AllCategoryProducts() {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const { setCurrentBreadcrumb } = useContext(BreadcrumbsContext);

   const { slug } = useParams();
   const { token } = useAuth();
   const { getProductsFromCategory } = useProduct();

   useEffect(() => {
      if (token) {
         getProductsFromCategory(token, slug).then((data) => setProducts(data));

         let formattedSlug = slug;
         formattedSlug = formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1);
         formattedSlug = formattedSlug.replace('-', ' ');
         setCurrentBreadcrumb(formattedSlug);

         setIsLoading(false);
      }
      return () => setCurrentBreadcrumb(null);
   }, [token, slug]);

   if (isLoading) {
      return <ProductListSkeleton />;
   }

   return <ProductList products={products} />;
}

export default AllCategoryProducts;
