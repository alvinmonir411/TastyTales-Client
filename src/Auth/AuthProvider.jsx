import React, { useEffect } from "react";
import { createContext, useState } from "react";
export const AuthContext = createContext();
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'
import { auth } from './../Firebase.init';
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  // for google login
  const provider = new GoogleAuthProvider();
  const handlegooglelogin = () => {
    return signInWithPopup(auth, provider);
  };

  // handle logot
  const logout = () => {
    return signOut(auth);
  };

  //  manage user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName
        console.log(name)
        setuser(user)
      }
    })


  },[user])

  const UserInfo = { setuser, user, handlegooglelogin, logout };
  return (
    <AuthContext.Provider value={UserInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
