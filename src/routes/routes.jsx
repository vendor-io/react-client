import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Register from './../pages/Register';
import AllCategories from '../pages/AllCategories';
import AddNewNewCategory from '../pages/AddNewCategory';
import AllCategoryProducts from '../pages/AllCategoryProducts';
import Cart from '../pages/Cart';
import Addresses from '../pages/Addresses';
import AddNewAddress from '../pages/AddNewAddress';
import Checkout from './../pages/Checkout';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import Order from './../pages/Order';
import Orders from '../pages/Orders';

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
      path: '/logout',
      name: 'Logout',
      component: <Logout />
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
   },
   {
      path: '/categories',
      breadcrumb: 'Categories',
      subroutes: [
         {
            path: '/',
            name: 'All categories',
            breadcrumb: 'All categories',
            component: <AllCategories />
         },
         {
            path: ':slug',
            name: 'All category products',
            breadcrumb: 'All category products',
            component: <AllCategoryProducts />
         },
         {
            path: 'new',
            name: 'Add new Category',
            breadcrumb: 'Add new category',
            component: <AddNewNewCategory />
         }
      ]
   },
   {
      path: '/addresses',
      breadcrumb: 'Addresses',
      subroutes: [
         {
            path: '/',
            name: 'Your addresses',
            breadcrumb: 'Your addresses',
            component: <Addresses />
         },
         {
            path: 'new',
            name: 'Add new address',
            breadcrumb: 'Add new address',
            component: <AddNewAddress />
         }
      ]
   },
   {
      path: '/cart',
      name: 'Cart',
      breadcrumb: 'Cart',
      component: <Cart />
   },
   {
      path: '/checkout',
      breadcrumb: 'Checkout',
      subroutes: [
         {
            path: '/',
            name: 'Checkout',
            breadcrumb: 'Checkout',
            component: <Checkout />
         },
         {
            path: 'success',
            name: 'Successful checkout',
            breadcrumb: 'Successful checkout',
            component: <CheckoutSuccess />
         }
      ]
   },
   {
      path: '/orders',
      breadcrumb: 'Orders',
      subroutes: [
         {
            path: '/',
            name: 'All orders',
            breadcrumb: 'All orders',
            component: <Orders />
         },
         {
            path: ':oid',
            name: 'Order',
            breadcrumb: 'Order',
            component: <Order />
         }
      ]
   }
];
