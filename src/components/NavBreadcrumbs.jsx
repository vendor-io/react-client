import { useContext } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Paper, Breadcrumbs, Link, Skeleton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { BreadcrumbsContext } from '../context/breadcrumbs-context';
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

   const routeNameResolver = (route) => {
      if (route?.name) {
         return route.name;
      }
      if (currentBreadcrumb) {
         return currentBreadcrumb;
      }
      return <Skeleton variant="text" width={150} />;
   };

   const getBreadcrumbsComponents = () => {
      const allRoutes = getAllRoutes();

      const elements = [];
      breadcrumbs.forEach((breadcrumb) => {
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
               {routeNameResolver(route)}
            </Link>
         );
      });
      return elements;
   };

   if (breadcrumbs[0].location.pathname !== '/') {
      return (
         <Container component="main" maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, mb: 1, p: { xs: 2, md: 3 } }}>
               <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb">
                  {getBreadcrumbsComponents()}
               </Breadcrumbs>
            </Paper>
         </Container>
      );
   }
   return null;
};
