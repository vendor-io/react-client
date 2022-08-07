export function useAddress() {
   const getAddressesForUser = async (token, userId) => {
      let addresses;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/addresses/${userId}`, {
         method: 'GET',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (addresses = data));

      return addresses;
   };

   const addNewAddress = async (token, requestBody) => {
      let address;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/addresses/new`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json; charset=UTF-8'
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (address = data));

      return address;
   };

   return { getAddressesForUser, addNewAddress };
}
