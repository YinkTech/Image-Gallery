import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import { onAuthStateChanged } from "firebase/auth";
import App from "./App";
import { Route, Routes } from "react-router-dom";
import SignIn from "../components/SignIn";
import Signup from "../components/Signup";
import PagenotFound from "../components/PagenotFound";

const SwitchRoute = () => {
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

  return (
    <>
      <Routes>
        {authUser ? (
          <Route path="/home" element={<App />} />
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<SignIn />} exact />
          </>
        )}
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
};

export default SwitchRoute;
