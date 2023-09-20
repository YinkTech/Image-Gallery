import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import logon from "./../assets/images/logon.png";
import bglog from "./../assets/images/bglog.gif";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewPass, setUserNewPass] = useState("");

  const errorMessage = (input) => {
    const errorDiv = document.getElementById("error-message")
    errorDiv.classList.add('error');
    errorDiv.textContent = input;
  };

  const signUpFunc = (e) => {
    e.preventDefault();

      createUserWithEmailAndPassword(auth, userNewEmail, userNewPass)
        .then((useCredential) => {
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.message);
          // return errorMessage("Email already in use ");
          return errorMessage(`${error.message}`);
        });
  };

  return (
    <div>
      <div className="text-white flex h-full fixed w-full">
        <div
          className=" hidden lg:flex  flex-col items-center justify-center"
          style={{
            flex: "1",
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
          className=" w-full h-full flex flex-col items-center justify-center"
          style={{
            flex: "1",
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
            <div id="error-message"></div>
          

            <div>
              <form onSubmit={signUpFunc}>
                <input
                  type="text"
                  placeholder="User Email"
                  className="w-full mb-14"
                  value={userNewEmail}
                  onChange={(e) => setUserNewEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={userNewPass}
                  className="w-full mb-14"
                  onChange={(e) => setUserNewPass(e.target.value)}
                />

                <button className="btns" type="submit">
                  Sign Up
                </button>

                <Link
                  to="/"
                  className=" my-8 block text-[#fdbac2] underline"
                >
                  I'm already a member
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
