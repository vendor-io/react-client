import { useState, useEffect } from 'react';
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup,
   FacebookAuthProvider,
   GithubAuthProvider,
   TwitterAuthProvider
} from 'firebase/auth';

export function useAuth() {
   const [authState, setAuthState] = useState({
      isSignedIn: false,
      pending: true,
      user: null,
      isSuperUser: false
   });
   const [token, setToken] = useState(null);
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(null);

   const auth = getAuth();

   useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
         setAuthState({ ...authState, user, pending: false, isSignedIn: !!user });
         if (user) {
            user.getIdToken().then((data) => {
               setToken(data);
            });
         }
      });
      if (authState.user) {
         authState.user.getIdToken().then((data) => {
            setAuthState({ ...authState, token: data });
         });
      }
      return () => unregisterAuthObserver();
   }, [auth, authState]);

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
   }, [authState, token]);

   const createUser = async (data) => {
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/common/user/new`, {
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

   const signInWithGoogle = async () => {
      let googleRes;
      const googleProvider = new GoogleAuthProvider();

      await signInWithPopup(auth, googleProvider).then((res) => (googleRes = res));

      createUser({ email: googleRes?.user?.email, uid: googleRes?.user?.uid });
   };

   const signInWithFacebook = async () => {
      let facebookRes;
      const facebookProvider = new FacebookAuthProvider();

      await signInWithPopup(auth, facebookProvider).then((res) => (facebookRes = res));

      createUser({ email: facebookRes?.user?.email, uid: facebookRes?.user?.uid });
   };

   const signInWithGithub = async () => {
      let githubRes;
      const githubProvider = new GithubAuthProvider();

      await signInWithPopup(auth, githubProvider).then((res) => (githubRes = res));

      createUser({ email: githubRes?.user?.email, uid: githubRes?.user?.uid });
   };

   const signInWithTwitter = async () => {
      let twitterRes;
      const twitterProvider = new TwitterAuthProvider();

      await signInWithPopup(auth, twitterProvider).then((res) => (twitterRes = res));

      createUser({ email: twitterRes?.user?.email, uid: twitterRes?.user?.uid });
   };

   const assignSuperuser = async () => {
      if (authState?.user?.uid && token) {
         await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/common/superuser/assign/${authState.user.uid}`,
            {
               method: 'POST',
               mode: 'cors',
               headers: {
                  Authorization: `Bearer ${token}`
               }
            }
         )
            .then((res) => res.json())
            .then((resData) => setResponse(resData));
      }
      setError('User is not logged in OR token has been revoked.');
   };

   return {
      auth,
      token,
      ...authState,
      logout,
      createUser,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      assignSuperuser,
      response,
      error
   };
}
