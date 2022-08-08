export function useOrder() {
   const getOrderForUserById = async (token, orderId) => {
      let order;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/orders/${orderId}`, {
         method: 'GET',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (order = data));

      return order;
   };

   const getOrdersForUser = async (token, userId) => {
      let orders;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/orders/user/${userId}`, {
         method: 'GET',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (orders = data));

      return orders;
   };

   const createOrder = async (token, requestBody) => {
      let order;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/orders/new`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json;charset=UTF-8'
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (order = data));

      return order;
   };

   return { getOrderForUserById, getOrdersForUser, createOrder };
}
