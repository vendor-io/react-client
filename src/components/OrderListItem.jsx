import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';

import { ListItemButton, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { formatPrice } from './../util/format-price';

export const OrderListItem = (props) => {
   const { id, createdAt, totalPrice, orderStatus, isLast } = props;
   return (
      <>
         <ListItemButton component={RouterLink} to={`/orders/${id}`} sx={{ py: 3 }}>
            <ListItemIcon>
               <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText>
               Order nr <strong>{id}</strong>
               <br />${formatPrice(totalPrice)}
            </ListItemText>
            <ListItemText>{format(new Date(createdAt), 'd MMMM yyyy')}</ListItemText>
            <Chip label={orderStatus} />
         </ListItemButton>
         {!isLast && <Divider />}
      </>
   );
};
