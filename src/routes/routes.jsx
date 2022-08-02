import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from './../pages/Register';

export const routes = [
   {
      path: '/',
      name: 'Home',
      breadcrumb: 'Home',
      component: <Home />
   },
   {
      path: '/login',
      name: 'Login',
      component: <Login />,
      notLoggedIn: true
   },
   {
      path: '/register',
      name: 'Register',
      component: <Register />,
      notLoggedIn: true
   },
   {
      path: '/products',
      breadcrumb: 'Products',
      subroutes: [
         {
            path: '/',
            name: 'All products',
            breadcrumb: 'All products',
            component: <AllProducts />
         },
         {
            path: ':pid',
            name: 'Product Page',
            breadcrumb: 'Product',
            component: <ProductPage />
         },
         {
            path: 'new',
            name: 'Add new Product',
            breadcrumb: 'Add new product',
            component: <AddNewProduct />
         }
      ]
   }
];
