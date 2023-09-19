import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from './../firebase'


const Signup = () => {

  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewPass, setUserNewPass] = useState("");

  const signUpFunc = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userNewEmail, userNewPass)
      .then((useCredential) => {
        console.log(useCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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

        <button className="btns" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
