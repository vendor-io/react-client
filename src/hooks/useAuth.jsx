import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export function useAuth() {
   const [authState, setAuthState] = useState({
      isSignedIn: false,
      pending: true,
      user: null,
      isSuperUser: false
   });
   const [token, setToken] = useState(null);
   const [response, setResponse] = useState(null);

   const auth = getAuth();

   useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
         setAuthState({ ...authState, user, pending: false, isSignedIn: !!user });
         user.getIdToken().then((data) => {
            setToken(data);
         });
      });
      if (authState.user) {
         authState.user.getIdToken().then((data) => {
            setAuthState({ ...authState, token: data });
         });
      }
      return () => unregisterAuthObserver();
   }, []);

   useEffect(() => {
      if (authState.user && token) {
         const checkIfUserIsSuperUser = async () => {
            await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/su/${authState.user.uid}`, {
               method: 'GET',
               mode: 'cors',
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
               .then((res) => res.json())
               .then((resData) =>
                  resData === 'true' ? setAuthState({ ...authState, isSuperUser: true }) : null
               );
         };

         checkIfUserIsSuperUser();
      }
   }, [authState.user, token]);

   const createUser = async (data) => {
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/user/new`, {
         method: 'POST',
         mode: 'cors',
         headers: new Headers({ 'content-type': 'application/json' }),
         body: JSON.stringify(data)
      })
         .then((res) => res.json())
         .then((resData) => setResponse(resData));
   };

   const logout = () => {
      const logoutUser = auth.signOut(() => {
         setAuthState({
            isSignedIn: false,
            pending: true,
            user: null
         });
         setToken(null);
      });
      return () => logoutUser();
   };

   return { auth, token, ...authState, logout, createUser, response };
}
