import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import logon from "./../assets/images/logon.png";
import bglog from "./../assets/images/bglog.gif";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const errorCodeToMessage = {
    "auth/user-not-found": "User not found. Please check your email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests":
      "the number of requests exceeds the maximum allowed.",
    "auth/email-already-exists":
      "The provided email is already in use by an existing user.",
    "auth/invalid-email": "Incorrect Email. Please try again.",
    "auth/invalid-password": "Incorrect Password. Please try again.",
    "auth/invalid-login-credentials":
      "Incorrect Email and password. Please try again.",
  };

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
        localStorage.setItem("user", response.data);
      })
      .catch((error) => {
        console.error(error);
        const message = errorCodeToMessage[error.code] || "An error occurred.";

        setErrorMessage(message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(userEmail, userPass);
  };

  return (
    <div>
      <div className="text-white flex h-full fixed w-full">
        <div
          className="flex-1 hidden lg:flex  flex-col items-center justify-center"
          style={{
            backgroundImage: "linear-gradient( #381d39 ,#57293f)",
          }}
        >
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            className="flex flex-col items-center justify-center"
          >
            <img src={logon} className="" alt={logon} />
            <h1
              className="text-[#a64850] font-extrabold text-[70px]"
              style={{ textShadow: "2px 2px #361c32;" }}
            >
              Image Gallery
            </h1>
          </div>
        </div>
        <div
          className="md:flex-1 w-full h-full flex flex-col items-center justify-center"
          style={{
            background: `url(${bglog})`,
            backgroundColor: "#af4c52",
          }}
        >
          <div
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            className="p-5 text-center md:px-10 lg:px-20 w-full "
          >
            <h1
              className="text-[#3c1f3a] lg:hidden mb-20 font-extrabold text-[35px]"
              style={{ textShadow: "2px 2px #361c32;" }}
            >
              Image Gallery
            </h1>

            <h4 className=" text-start">Sign In</h4>
            <div
              id="error-message"
              className="flex justify-center items-center p-4 mb-4 text-white-800 rounded-lg "
              role="alert"
            >
              {errorMessage}
            </div>

            <div>
              <form onSubmit={handleSignIn}>
                <input
                  type="text"
                  placeholder="User Email"
                  value={userEmail}
                  className="input w-full mb-14"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className=" input w-full mb-14"
                  value={userPass}
                  onChange={(e) => setUserPass(e.target.value)}
                />
                <div className="flex justify-around items-center">
                  <button className="btns" type="submit">
                    Sign In
                  </button>
                  <Link to="/signup" className="btns">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
