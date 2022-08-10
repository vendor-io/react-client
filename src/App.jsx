import { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/config';
import { useAuth } from './hooks/useAuth';

import Dev from './pages/Dev';
import Login from './pages/Login';
import Register from './pages/Register';
import { routes } from './routes/routes';
import { theme, darkTheme } from './styles/theme';

import { Navbar } from './components/Navbar';
import { CartFab } from './components/CartFab';
import { ScrollToTopFab } from './components/ScrollToTopFab';
import { NavBreadcrumbs } from './components/NavBreadcrumbs';

import { BreadcrumbsContext } from './context/breadcrumbs-context';
import { ThemeContext } from './context/theme-context';
import { CartContext } from './context/cart-context';
import { PaymentContext } from './context/payment-context';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

initializeApp(firebaseConfig);

function App() {
   const [currentBreadcrumb, setCurrentBreadcrumb] = useState(null);
   const [cartItemsAmount, setCartItemsAmount] = useState(0);
   const [paymentPayload, setPaymentPayload] = useState({
      clientSecret: null
   });
   const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

   const { isSignedIn, token } = useAuth();

   const breadcrumbMemo = useMemo(
      () => ({ currentBreadcrumb, setCurrentBreadcrumb }),
      [currentBreadcrumb]
   );
   const cartMemo = useMemo(() => ({ cartItemsAmount, setCartItemsAmount }), [cartItemsAmount]);
   const paymentMemo = useMemo(() => ({ paymentPayload, setPaymentPayload }), [paymentPayload]);
   const darkModeMemo = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);

   let routesHandler;

   if (token) {
      routesHandler = (
         <Routes>
            {routes.map((route) => {
               if (route.subroutes) {
                  return (
                     <Route path={route.path} key={route.id}>
                        {route.subroutes.map((subRoute) => {
                           if (subRoute.path === '/') {
                              return <Route index element={subRoute.component} key={route.id} />;
                           }
                           return (
                              <Route
                                 path={subRoute.path}
                                 element={subRoute.component}
                                 key={route.id}
                              />
                           );
                        })}
                     </Route>
                  );
               } else if (!route.notLoggedIn) {
                  return <Route path={route.path} element={route.component} key={route.id} />;
               }
               return null;
            })}
            {import.meta.env.DEV && <Route path="/dev" element={<Dev />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      );
   } else {
      routesHandler = (
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      );
   }

   return (
      <BreadcrumbsContext.Provider value={breadcrumbMemo}>
         <CartContext.Provider value={cartMemo}>
            <PaymentContext.Provider value={paymentMemo}>
               <ThemeContext.Provider value={darkModeMemo}>
                  <ThemeProvider theme={darkMode ? darkTheme : theme}>
                     <CssBaseline />
                     <Navbar isSignedIn={isSignedIn} />
                     {isSignedIn && <NavBreadcrumbs />}
                     {isSignedIn && <CartFab />}
                     <ScrollToTopFab />
                     {routesHandler}
                     <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                     />
                     {/* </Elements> */}
                  </ThemeProvider>
               </ThemeContext.Provider>
            </PaymentContext.Provider>
         </CartContext.Provider>
      </BreadcrumbsContext.Provider>
   );
}

export default App;
