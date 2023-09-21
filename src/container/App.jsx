import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/images/user.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Control from "../components/Control";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();
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
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="main-cont">
      {authUser ? (
        <>
          <div>
            <header className="flex justify-between items-center p-3">
              <div className="flex items-center ">
                <img src={logo} alt={logo} className="logo" style={{ width: "50px" }} />
                {/* {authUser.email} */}
              </div>
              <div>
                <button className="btnss" onClick={userSignOut}>
                  {" "}
                  Sign Out{" "}
                </button>
              </div>
            </header>
          </div>
          <Control />
        </>
      ) : (
        <p>No Image Available please Sign-in or Sign-Up</p>
      )}
    </div>
  );
};

export default App;
