import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import bglog from "./../assets/images/bglog.gif";
import AOS from "aos";
import "aos/dist/aos.css";

const PagenotFound = () => {
  useEffect(() => {
    AOS.init();
  }, []);
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
  const navigate = useNavigate();
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out Successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="fixed  h-full w-full flex flex-col justify-center items-center"
      style={{
        background: `url(${bglog})`,
        backgroundColor: "#3d1f3a",
      }}>
    <div
    data-aos="fade-down"
    data-aos-anchor-placement="top-bottom"
      className="h-full w-full text-center flex flex-col justify-center items-center"
    >
      <h1
        className="text-[#a64850] font-extrabold md:text-[70px] text-[35px]"
        style={{ textShadow: "2px 2px #361c32;" }}
      >
        Not Found
      </h1>
      <div className="w-full" style={{ border: "2px solid #fdbac2" }}></div>
      <p className="my-8 text-white">
        {" "}
        The page you're looking for was not found.{" "}
      </p>
      <div>
        {authUser ? (
          <div className="flex flex-col md:flex-row">
            <Link className="btns my-4 md:m-0" to="/home">
              Return Home
            </Link>
            <button className="btns mx-3" onClick={userSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <Link to="/" className="btns">
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div></div>
  );
};

export default PagenotFound;
