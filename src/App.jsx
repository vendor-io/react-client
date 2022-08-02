import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { routes } from './routes/routes';
import { AuthContext } from './context/auth-context';

import Dev from './pages/Dev';
import { Routes, Route } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let routesHandler = (
   <Routes>
      {routes.map((route, index) => {
         console.log(route);
         if (route.subroutes) {
            return (
               <Route path={route.path} key={index}>
                  {route.subroutes.map((subRoute, index) => {
                     console.log(subRoute);
                     if (subRoute.path === '/') {
                        return <Route index element={subRoute.component} key={index} />;
                     } else {
                        return (
                           <Route path={subRoute.path} element={subRoute.component} key={index} />
                        );
                     }
                  })}
               </Route>
            );
         } else {
            return <Route path={route.path} element={route.component} key={index} />;
         }
      })}
      {import.meta.env.DEV && <Route path="/dev" element={<Dev />} />}
   </Routes>
);

console.log(routesHandler);
let token = 'token';

function App() {
   return (
      <AuthContext.Provider
         value={{ isLoggedIn: !!token, login: () => {}, logout: () => {}, userId: '123' }}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {routesHandler}
         </ThemeProvider>
      </AuthContext.Provider>
   );
}

export default App;
