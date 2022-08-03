import { useState } from 'react';
export const useProduct = () => {
   const [response, setResponse] = useState(null);

   const addNewProduct = async (data) => {
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

         await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/products`, {
            method: 'POST',
            mode: 'cors',
            body: productData
         })
            .then((res) => res.json())
            .then((data) => setResponse(data));
      }
   };

   return { addNewProduct, response };
};
