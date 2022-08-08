import { List } from '@mui/material';
import { OrderListItem } from './OrderListItem';
export const OrderList = (props) => {
   const { orders } = props;
   return (
      <List>
         {orders.map((order, index) => {
            console.log('order', order);
            return (
               <OrderListItem
                  key={order.id}
                  id={order.id}
                  createdAt={order.createdAt}
                  orderStatus={order.orderStatus}
                  totalPrice={order.totalPrice}
                  isLast={index === orders.length - 1 && orders.length !== 1}
               />
            );
         })}
      </List>
   );
};
