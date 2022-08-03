import { useContext } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { BreadcrumbsContext } from '../context/breadcrumbs-context';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Paper, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { routes } from '../routes/routes';

export const NavBreadcrumbs = () => {
   const breadcrumbs = useBreadcrumbs();
   const { currentBreadcrumb } = useContext(BreadcrumbsContext);

   const getAllRoutes = () => {
      const allRoutes = [];
      routes.forEach((route) => {
         if (route.subroutes) {
            route.subroutes.forEach((subRoute) => {
               allRoutes.push({
                  path: subRoute.path === '/' ? route.path : `${route.path}/${subRoute.path}`,
                  name: subRoute.breadcrumb
               });
            });
         }
         allRoutes.push({
            path: route.path,
            name: route.breadcrumb
         });
      });
      return allRoutes;
   };

   const getBreadcrumbsComponents = () => {
      const allRoutes = getAllRoutes();

      let elements = [];
      breadcrumbs.map((breadcrumb) => {
         const route = allRoutes.find((element) => {
            return element.path === breadcrumb.key;
         });
         elements.push(
            <Link
               component={RouterLink}
               underline="hover"
               key={breadcrumb.key}
               color="inherit"
               to={breadcrumb.key}>
               {route?.name ? route.name : currentBreadcrumb}
            </Link>
         );
      });
      return elements;
   };

   if (breadcrumbs[0].location.pathname !== '/') {
      return (
         <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb">
                  {getBreadcrumbsComponents()}
               </Breadcrumbs>
            </Paper>
         </Container>
      );
   }
};
