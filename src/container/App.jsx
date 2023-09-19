import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import { isSignInWithEmailLink, onAuthStateChanged, signOut } from "firebase/auth";

import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
  
const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);




const navigate = useNavigate()
  const [authUser, setAuthUser] = useState("");
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out Successfully");
        navigate('/')
      })
      .catch((error) => console.log(error));
  };


  console.log(isSignInWithEmailLink)
  return (
    <div>
      {authUser ? (
        <>
      <h1>hello world</h1>
          <p>{`Signed In as ${authUser.email}`}</p>{" "}
          <button onClick={userSignOut}> Sign Out </button>{" "}
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}

export default App;
