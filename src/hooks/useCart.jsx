import { useContext } from 'react';
import { toast } from 'react-toastify';

import { ThemeContext } from '../context/theme-context';
import { CartContext } from '../context/cart-context';

export function useCart() {
   const { darkMode } = useContext(ThemeContext);
   const { setCartItemsAmount } = useContext(CartContext);

   const getCartForUser = async (token, userId) => {
      let cart;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/cart/${userId}`, {
         method: 'GET',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (cart = data));

      localStorage.setItem('cartItemsAmount', cart?.products?.length ? cart.products.length : 0);

      return cart;
   };

   const addProductToCart = async (token, requestBody) => {
      let cart;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/cart/add`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json;charset=UTF-8'
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (cart = data));

      toast.success("You've successfully added product to cart!", {
         position: 'bottom-left',
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: darkMode ? 'dark' : 'light'
      });

      localStorage.setItem('cartItemsAmount', cart?.products?.length ? cart.products.length : 0);
      setCartItemsAmount(cart?.products?.length ? cart.products.length : 0);

      return cart;
   };

   const removeProductFromCart = async (token, requestBody) => {
      let cart;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/cart/remove`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json;charset=UTF-8'
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (cart = data));

      localStorage.setItem('cartItemsAmount', cart?.products?.length ? cart.products.length : 0);
      setCartItemsAmount(cart?.products?.length ? cart.products.length : 0);

      return cart;
   };

   const changeAmountOfProductInCart = async (token, requestBody) => {
      let cart;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/cart/change`, {
         method: 'POST',
         mode: 'cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json;charset=UTF-8'
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (cart = data));

      localStorage.setItem('cartItemsAmount', cart?.products?.length ? cart.products.length : 0);
      setCartItemsAmount(cart?.products?.length ? cart.products.length : 0);

      return cart;
   };

   return { getCartForUser, addProductToCart, removeProductFromCart, changeAmountOfProductInCart };
}
