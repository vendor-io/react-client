import AddNewProduct from '../pages/AddNewProduct';
import AllProducts from '../pages/AllProducts';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Register from '../pages/Register';
import AllCategories from '../pages/AllCategories';
import AddNewNewCategory from '../pages/AddNewCategory';
import AllCategoryProducts from '../pages/AllCategoryProducts';
import Cart from '../pages/Cart';
import Addresses from '../pages/Addresses';
import AddNewAddress from '../pages/AddNewAddress';
import Checkout from '../pages/Checkout';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import Order from '../pages/Order';
import Orders from '../pages/Orders';
import AssignSuperuser from '../pages/AssignSuperuser';

export const routes = [
   {
      id: 'path:/home',
      path: '/',
      name: 'Home',
      breadcrumb: 'Home',
      component: <Home />
   },
   {
      id: 'path:/login',
      path: '/login',
      name: 'Login',
      component: <Login />,
      notLoggedIn: true
   },
   {
      id: 'path:/logout',
      path: '/logout',
      name: 'Logout',
      component: <Logout />
   },
   {
      id: 'path:/register',
      path: '/register',
      name: 'Register',
      component: <Register />,
      notLoggedIn: true
   },
   {
      id: 'path:/products',
      path: '/products',
      breadcrumb: 'Products',
      subroutes: [
         {
            id: 'path:/products:index',
            path: '/',
            name: 'All products',
            breadcrumb: 'All products',
            component: <AllProducts />
         },
         {
            id: 'path:/products/:pid',
            path: ':pid',
            name: 'Product Page',
            breadcrumb: 'Product',
            component: <ProductPage />
         },
         {
            id: 'path:/products/new',
            path: 'new',
            name: 'Add new Product',
            breadcrumb: 'Add new product',
            component: <AddNewProduct />
         }
      ]
   },
   {
      id: 'path:/categories',
      path: '/categories',
      breadcrumb: 'Categories',
      subroutes: [
         {
            id: 'path:/categories:index',
            path: '/',
            name: 'All categories',
            breadcrumb: 'All categories',
            component: <AllCategories />
         },
         {
            id: 'path:/categories/:slug',
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
      id: 'path:/addresses',
      path: '/addresses',
      breadcrumb: 'Addresses',
      subroutes: [
         {
            id: 'path:/adresses:index',
            path: '/',
            name: 'Your addresses',
            breadcrumb: 'Your addresses',
            component: <Addresses />
         },
         {
            id: 'path:/adressess/new',
            path: 'new',
            name: 'Add new address',
            breadcrumb: 'Add new address',
            component: <AddNewAddress />
         }
      ]
   },
   {
      id: 'path:/cart',
      path: '/cart',
      name: 'Cart',
      breadcrumb: 'Cart',
      component: <Cart />
   },
   {
      id: 'path:/checkout',
      path: '/checkout',
      breadcrumb: 'Checkout',
      subroutes: [
         {
            id: 'path:/checkout:index',
            path: '/',
            name: 'Checkout',
            breadcrumb: 'Checkout',
            component: <Checkout />
         },
         {
            id: 'path:/checkout/success',
            path: 'success',
            name: 'Successful checkout',
            breadcrumb: 'Successful checkout',
            component: <CheckoutSuccess />
         }
      ]
   },
   {
      id: 'path:/orders',
      path: '/orders',
      breadcrumb: 'Orders',
      subroutes: [
         {
            id: 'path:/orders:index',
            path: '/',
            name: 'All orders',
            breadcrumb: 'All orders',
            component: <Orders />
         },
         {
            id: 'path:/orders/:oid',
            path: ':oid',
            name: 'Order',
            breadcrumb: 'Order',
            component: <Order />
         }
      ]
   },
   {
      id: 'path:/utilites',
      path: '/utilities',
      breadcrumb: 'Utilities',
      subroutes: [
         {
            id: 'path:/utilities/assign-superuser',
            path: 'assign-superuser',
            name: 'Assign Superuser',
            breadcrumb: 'Assign Superuser',
            component: <AssignSuperuser />
         }
      ]
   }
];
