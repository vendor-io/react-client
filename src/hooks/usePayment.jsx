export function usePayment() {
   const postCharge = async (token, requestBody) => {
      let response;

      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/payment/charge`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (response = data));

      return response;
   };

   const postPaymentIntent = async (token, requestBody) => {
      let response;

      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/payment/intent`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (response = data));

      return response;
   };

   return { postCharge, postPaymentIntent };
}
