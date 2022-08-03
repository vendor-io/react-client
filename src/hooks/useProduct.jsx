import { useState } from 'react';
export const useProduct = () => {
   const [response, setResponse] = useState(null);

   const addNewProduct = async (data, token, uid) => {
      if (Object.values(data).every((item) => typeof item !== 'undefined')) {
         const productData = new FormData();

         for (const key in data) {
            if (key === 'productImages') {
               Array.from(data.productImages).map((image) => {
                  productData.append('productImages', image, image.name);
               });
            } else {
               productData.append(key, data[key]);
            }
         }

         await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/su/products`, {
            method: 'POST',
            mode: 'cors',
            body: productData,
            headers: {
               Authorization: `Bearer ${token}`,
               UID: uid
            }
         })
            .then((res) => res.json())
            .then((resData) => setResponse(resData));
      }
   };

   return { addNewProduct, response };
};
