import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from './../firebase'

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const SignInFunc = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPass)
      .then((useCredential) => {
        console.log(useCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>LogIn To Your Account</h2>
      <form onSubmit={SignInFunc}>
        <input
          type="text"
          placeholder="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="User Password"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
