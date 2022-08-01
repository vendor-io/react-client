import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';

export const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home
   },
   {
      path: '/products/new',
      name: 'Add new Product',
      component: AddNewProduct
   },
   {
      path: '/products/all',
      name: 'All products',
      component: AllProducts
   },
   {
      path: '/products/:pid',
      name: 'Product Page',
      component: ProductPage
   }
];
