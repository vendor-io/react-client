import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import NotFound from './../pages/404';

export const routes = [
   {
      path: '/',
      name: 'Home',
      component: <Home />
   },
   {
      path: '/products',
      subroutes: [
         {
            path: '/',
            name: 'All products',
            component: <AllProducts />
         },
         {
            path: ':pid',
            name: 'Product Page',
            component: <ProductPage />
         },
         {
            path: 'new',
            name: 'Add new Product',
            component: <AddNewProduct />
         }
      ]
   },
   {
      path: '*',
      name: '404 Not Found',
      component: <NotFound />
   }
];
