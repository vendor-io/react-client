import { useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useAddress } from 'hooks/useAddress';

import { AddressesList } from 'components/AddressesList';

function Addresses() {
   const [isLoading, setIsLoading] = useState(true);
   const [addresses, setAddresses] = useState([]);

   const { token, user } = useAuth();
   const { getAddressesForUser } = useAddress();

   useEffect(() => {
      if (token) {
         getAddressesForUser(token, user.uid).then((data) => {
            setAddresses(data);
            setIsLoading(false);
         });
      }
   }, [token, getAddressesForUser, user?.uid]);

   if (isLoading) {
      return <AddressesList isSkeleton />;
   }

   if (!isLoading) {
      return <AddressesList addresses={addresses} />;
   }
}

export default Addresses;
