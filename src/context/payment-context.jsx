import { createContext } from 'react';

export const PaymentContext = createContext({
   paymentPayload: {
      clientSecret: null
   }
});
