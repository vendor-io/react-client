import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import NotFound from './../pages/404';
import Login from '../pages/Login';
import Register from './../pages/Register';

export const routes = [
   {
      path: '/',
      name: 'Home',
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
   }
];
