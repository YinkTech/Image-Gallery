import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/images/user.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Control from "../components/Control";
import backseat from "./../assets/images/loadingg.gif";

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
            <header
              style={{ background: `url(${backseat})`, backgroundPosition: 'bottom' }}
              className="flex justify-between py-5 pt-0 h-20  items-center p-3"
            >
              <div className="flex items-center bg-white rounded-full justify-center ">
                <img
                  src={logo}
                  alt={logo}
                  className="logo"
                  style={{ width: "50px" }}
                />
              </div>
              <h1 className="text-center text-2xl md:text-4xl text-[#fff] font-bold">
                Art Gallery
              </h1>
              <div>
                <button className="btnss p-1 md:p-3 md:px-5 " onClick={userSignOut}>
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
