import { useEffect } from "react";
import SignIn from "../components/SignIn";
import Signup from "../components/Signup";
import { AuthDetails } from "../components/auth/AuthDetails";
import logon from "./../assets/images/logon.png";
import bglog from "./../assets/images/bglog.gif";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

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
          className="p-5 w-full h-full lg:p-0 flex flex-col items-center justify-center"
          style={{
            flex: "1",
            background: `url(${bglog})`,
            backgroundColor: "#af4c52",
          }}
        >
          <div
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom" 
          className=" md:h-96 p-1 md:w-96 w-80 "
          >

          <h1
            className="text-[#3c1f3a] lg:hidden mb-20 font-extrabold text-[35px]"
            style={{ textShadow: "2px 2px #361c32;" }}
          >
            Image Gallery
          </h1>
          <div>

          <Signup />
          </div>
          </div>
          <div className="hidden">
            <SignIn />
          <AuthDetails />
          <span className="underline">forgot Password</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
