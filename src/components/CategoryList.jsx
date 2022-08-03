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
   console.log(categories);
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
                        key={category.ID}
                        component={RouterLink}
                        to={`/categories/${category.Slug}`}>
                        <ListItemIcon>
                           <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={category.Name} secondary={category.Description} />
                        <Chip sx={{ ml: 3 }} label={category.ItemsAmount} />
                     </ListItemButton>
                  );
               })}
            </List>
         </Paper>
      </Container>
   );
};
