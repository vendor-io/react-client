import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';

export const routes = [
   {
      path: '/products/new',
      name: 'Add new Product',
      component: <AddNewProduct />
   },
   {
      path: '/products/all',
      name: 'All products',
      component: <AllProducts />
   }
];
