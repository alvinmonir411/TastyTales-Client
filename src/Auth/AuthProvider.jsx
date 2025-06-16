import React, { useEffect } from "react";
import { createContext, useState } from "react";
export const AuthContext = createContext();
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import { auth } from './../Firebase.init';
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);



  // for google login
  const provider = new GoogleAuthProvider();
  const handlegooglelogin = () => {
    return signInWithPopup(auth, provider);
  };
  // login with emailpassword
  const handleloginwitheamil = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  const handlelogin = (email,password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle logot
  const logout = () => {
    return signOut(auth);
  };

  //  manage user
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setuser(currentUser);
   });

return () => unsubscribe();
  },[])

  const UserInfo = { setuser,handleloginwitheamil, user,handlelogin, handlegooglelogin, logout };
  return (
    <AuthContext.Provider value={UserInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
