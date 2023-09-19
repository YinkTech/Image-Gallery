import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { isSignInWithEmailLink, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthDetails = () => {
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
      })
      .catch((error) => console.log(error));
  };
  console.log(isSignInWithEmailLink)

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>{" "}
          <button onClick={userSignOut}> Sign Out </button>{" "}
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};
