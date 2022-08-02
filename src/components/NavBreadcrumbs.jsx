import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Paper, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const NavBreadcrumbs = () => {
   const breadcrumbs = useBreadcrumbs();

   console.log('breadcrumbs', breadcrumbs);

   const getBreadcrumbsComponents = () => {
      let elements = [];
      breadcrumbs.map((breadcrumb) => {
         elements.push(
            <Link
               component={RouterLink}
               underline="hover"
               key={breadcrumb.key}
               color="inherit"
               to={breadcrumb.key}>
               {breadcrumb.key === '/' ? 'Home' : breadcrumb.key}
            </Link>
         );
      });
      return elements;
   };

   console.log('getBreadcrumbsComponents()', getBreadcrumbsComponents());

   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
               {getBreadcrumbsComponents()}
            </Breadcrumbs>
         </Paper>
      </Container>
   );
};
