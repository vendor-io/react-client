import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Paper, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { routes } from '../routes/routes';

export const NavBreadcrumbs = () => {
   const breadcrumbs = useBreadcrumbs();

   const getAllRoutes = () => {
      const allRoutes = [];
      routes.map((route) => {
         if (route.subroutes) {
            route.subroutes.map((subRoute) => {
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
      console.log('allRoutes', allRoutes);

      let elements = [];
      breadcrumbs.map((breadcrumb) => {
         const route = allRoutes.find((element) => {
            return element.path === breadcrumb.key;
         });
         console.log(route?.name);
         elements.push(
            <Link
               component={RouterLink}
               underline="hover"
               key={breadcrumb.key}
               color="inherit"
               to={breadcrumb.key}>
               {route?.name ? route.name : breadcrumb.key}
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
