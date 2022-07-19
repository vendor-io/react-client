import styled from 'styled-components';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { routes } from './routes/routes';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const AppContainer = styled.main`
   width: 100%;
   min-height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
`;

let routesHandler = (
   <Switch>
      {routes.map((route) => (
         <Route path={route.path} exact key={route.path}>
            {route.component}
         </Route>
      ))}
   </Switch>
);

function App() {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <BrowserRouter>
            {routesHandler}
            <ul>
               {routes.map((route, index) => (
                  <li key={index}>
                     <Link to={route.path}>{route.name}</Link>
                  </li>
               ))}
            </ul>
         </BrowserRouter>
      </ThemeProvider>
   );
}

export default App;
