import { Link as RouterLink } from 'react-router-dom';
import {
   Container,
   Paper,
   Typography,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Chip
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

export const CategoryList = (props) => {
   const { categories } = props;

   if (categories.length === 0) {
      return (
         <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               <Typography component="h4" variant="h4" align="center">
                  Currently there are no categories {':('}
               </Typography>
            </Paper>
         </Container>
      );
   }

   return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
               All categories
            </Typography>
            <List>
               {categories.map((category) => {
                  return (
                     <ListItemButton
                        key={category.id}
                        component={RouterLink}
                        to={`/categories/${category.slug}`}>
                        <ListItemIcon>
                           <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={category.name} secondary={category.description} />
                        <Chip sx={{ ml: 3 }} label={category.itemsAmount} />
                     </ListItemButton>
                  );
               })}
            </List>
         </Paper>
      </Container>
   );
};
