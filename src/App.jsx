import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { routes } from './routes/routes';
import { AuthContext } from './context/auth-context';

import Dev from './pages/Dev';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

let routesHandler = (
   <Switch>
      {routes.map((route, index) => (
         <Route path={route.path} exact key={index} component={route.component} />
      ))}
      {import.meta.env.DEV && <Route path="/dev" exact component={Dev} />}
      <Redirect to="/" />
   </Switch>
);

console.log(routesHandler);
let token = 'token';

function App() {
   return (
      <AuthContext.Provider
         value={{ isLoggedIn: !!token, login: () => {}, logout: () => {}, userId: '123' }}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>{routesHandler}</Router>
         </ThemeProvider>
      </AuthContext.Provider>
   );
}

export default App;
