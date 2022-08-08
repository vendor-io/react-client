import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AddressesListItem } from './AddressesListItem';

import {
   Container,
   Paper,
   Grid,
   Typography,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Skeleton,
   Divider,
   Button,
   Box
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

export const AddressesList = (props) => {
   const { addresses, isSkeleton } = props;

   if (isSkeleton) {
      return (
         <Container component="main" maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
               <List>
                  {Array.from({ length: 3 }).map((_item, index) => (
                     <React.Fragment key={index}>
                        <ListItem key={index} sx={{ py: 2 }}>
                           <ListItemIcon>
                              <HomeIcon />
                           </ListItemIcon>
                           <ListItemText>
                              <Skeleton variant="text" height={30} width={200} />
                           </ListItemText>
                           <ExpandMore />
                        </ListItem>
                        <Divider />
                     </React.Fragment>
                  ))}
               </List>
            </Paper>
         </Container>
      );
   }
   if (addresses?.length === 0)
      return (
         <Container component="main" maxWidth="xl">
            <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
               <Grid>
                  <Typography textAlign="center" variant="h5" gutterBottom>
                     Currently you don't have any address. 🧐
                  </Typography>
                  <Typography textAlign="center" variant="h5" gutterBottom>
                     Maybe it's time to add one?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 1 }}>
                     <Button
                        component={RouterLink}
                        to="/addresses/new"
                        variant="contained"
                        size="large">
                        Add new address
                     </Button>
                  </Box>
               </Grid>
            </Paper>
         </Container>
      );

   return (
      <Container component="main" maxWidth="xl">
         <Paper variant="outlined" sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1, md: 2 } }}>
            <List>
               {addresses.map((address, index) => {
                  return (
                     <AddressesListItem
                        key={address.id}
                        address={address}
                        isLast={index === addresses.length - 1 && addresses.length !== 1}
                     />
                  );
               })}
            </List>
         </Paper>
         <Grid container>
            <Grid item xs={3}>
               <Paper variant="outlined" sx={{ mt: 1, p: { xs: 1, md: 2 } }}>
                  <Button
                     color="success"
                     variant="contained"
                     fullWidth
                     component={RouterLink}
                     startIcon={<AddIcon />}
                     to="/addresses/new"
                     size="large">
                     Add new
                  </Button>
               </Paper>
            </Grid>
         </Grid>
      </Container>
   );
};
