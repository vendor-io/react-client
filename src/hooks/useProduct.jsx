import { useState } from 'react';

export const useProduct = () => {
   const [response, setResponse] = useState(null);

   const getProductById = async (token, id) => {
      let product;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/products/${id}`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (product = data));

      return product;
   };

   const getAllProducts = async (token) => {
      let products;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/products`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (products = data));

      return products;
   };

   const addNewProduct = async (data, token, uid) => {
      if (Object.values(data).every((item) => typeof item !== 'undefined')) {
         const productData = new FormData();

         // eslint-disable-next-line no-restricted-syntax
         for (const key in data) {
            if (key === 'productImages') {
               Array.from(data.productImages).forEach((image) => {
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

   const getProductsFromCategory = async (token, slug) => {
      let products;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/products/category/${slug}`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (products = data));

      return products;
   };

   return { getProductById, getAllProducts, addNewProduct, getProductsFromCategory, response };
};
