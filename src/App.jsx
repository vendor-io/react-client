import { useState } from 'react';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { routes } from './routes/routes';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/config';
import { useAuth } from './hooks/useAuth';

import { Routes, Route, Navigate } from 'react-router-dom';
import Dev from './pages/Dev';
import Login from './pages/Login';
import Register from './pages/Register';

import { Navbar } from './components/Navbar';
import { CartFab } from './components/CartFab';
import { NavBreadcrumbs } from './components/NavBreadcrumbs';
import { BreadcrumbsContext } from './context/breadcrumbs-context';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

initializeApp(firebaseConfig);

function App() {
   const [currentBreadcrumb, setCurrentBreadcrumb] = useState(null);
   const { isSignedIn, token } = useAuth();

   let routesHandler;
   if (token) {
      routesHandler = (
         <Routes>
            {routes.map((route, index) => {
               if (route.subroutes) {
                  return (
                     <Route path={route.path} key={index}>
                        {route.subroutes.map((subRoute, subIndex) => {
                           if (subRoute.path === '/') {
                              return <Route index element={subRoute.component} key={subIndex} />;
                           } else {
                              return (
                                 <Route
                                    path={subRoute.path}
                                    element={subRoute.component}
                                    key={subIndex}
                                 />
                              );
                           }
                        })}
                     </Route>
                  );
               } else if (!route.notLoggedIn) {
                  return <Route path={route.path} element={route.component} key={index} />;
               }
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
      <BreadcrumbsContext.Provider value={{ currentBreadcrumb, setCurrentBreadcrumb }}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {isSignedIn && <Navbar />}
            {isSignedIn && <NavBreadcrumbs />}
            {isSignedIn && <CartFab />}
            {routesHandler}
         </ThemeProvider>
      </BreadcrumbsContext.Provider>
   );
}

export default App;
