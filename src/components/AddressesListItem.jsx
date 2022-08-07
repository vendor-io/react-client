import { useState } from 'react';

import {
   ListItemButton,
   ListItem,
   ListItemIcon,
   ListItemText,
   Collapse,
   List,
   Divider
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';

export const AddressesListItem = (props) => {
   const { address, isLast } = props;

   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen((prevState) => !prevState);
   };

   return (
      <>
         <ListItemButton onClick={handleClick} sx={{ py: 2 }}>
            <ListItemIcon>
               <HomeIcon />
            </ListItemIcon>
            <ListItemText
               primary={`${address.firstName} ${address.lastName}, ${address.street} ${address.houseNumber}`}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         {!isLast && <Divider />}
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
               <ListItem sx={{ pl: 4, pt: 3 }}>
                  <ListItemIcon>
                     <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${address.firstName} ${address.lastName}`} />
               </ListItem>

               <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon>
                     <PhoneAndroidIcon />
                  </ListItemIcon>
                  <ListItemText primary={address.phoneNumber} />
               </ListItem>

               <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon>
                     <PlaceIcon />
                  </ListItemIcon>
                  <ListItemText>
                     {address.street} {address.houseNumber}
                     <br />
                     {address.postalCode}, {address.city}
                     <br />
                     {address.country}
                  </ListItemText>
               </ListItem>
            </List>
         </Collapse>
      </>
   );
};
