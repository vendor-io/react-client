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

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const token = sessionStorage.getItem('Auth Token');

let routesHandler;
if (token) {
   routesHandler = (
      <Routes>
         {routes.map((route, index) => {
            if (route.subroutes) {
               return (
                  <Route path={route.path} key={index}>
                     {route.subroutes.map((subRoute, index) => {
                        if (subRoute.path === '/') {
                           return <Route index element={subRoute.component} key={index} />;
                        } else {
                           return (
                              <Route
                                 path={subRoute.path}
                                 element={subRoute.component}
                                 key={index}
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
         <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
   );
} else {
   routesHandler = (
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
   );
}

initializeApp(firebaseConfig);

function App() {
   const { isSignedIn } = useAuth();
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         {isSignedIn && <Navbar />}
         {routesHandler}
      </ThemeProvider>
   );
}

export default App;
