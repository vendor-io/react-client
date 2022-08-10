import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCategory } from '../hooks/useCategory';
import { useAuth } from '../hooks/useAuth';
import { BreadcrumbsContext } from '../context/breadcrumbs-context';

import { ProductList } from '../components/ProductList';
import { ProductListSkeleton } from '../components/ProductListSkeleton';

function AllCategoryProducts() {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const { setCurrentBreadcrumb } = useContext(BreadcrumbsContext);

   const { slug } = useParams();
   const { token } = useAuth();
   const { getProductsFromCategory } = useProduct();
   const { getCategoryBySlug } = useCategory();

   useEffect(() => {
      if (token) {
         getProductsFromCategory(token, slug).then((data) => setProducts(data));
         getCategoryBySlug(token, slug).then((data) => setCurrentBreadcrumb(data?.name));

         setIsLoading(false);
      }
      return () => setCurrentBreadcrumb(null);
   }, [token, slug, getCategoryBySlug, setCurrentBreadcrumb, getProductsFromCategory]);

   if (isLoading) {
      return <ProductListSkeleton />;
   }

   return <ProductList products={products} />;
}

export default AllCategoryProducts;
