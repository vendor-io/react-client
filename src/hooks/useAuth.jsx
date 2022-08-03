import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export function useAuth() {
   const [authState, setAuthState] = useState({
      isSignedIn: false,
      pending: true,
      user: null
   });
   const [token, setToken] = useState(null);

   const auth = getAuth();

   useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
         setAuthState({ ...authState, user, pending: false, isSignedIn: !!user });
         user.getIdToken().then((data) => {
            setToken(data), sessionStorage.setItem('Auth Token', data);
         });
      });
      if (authState.user) {
         authState.user.getIdToken().then((data) => {
            setAuthState({ ...authState, token: data });
         });
      }
      return () => unregisterAuthObserver();
   }, []);

   return { auth, token, ...authState };
}
