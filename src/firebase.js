// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-BbRrUhR_eu2210FpmZFtltscYmn8P_Q",
  authDomain: "image-gallery46246.firebaseapp.com",
  projectId: "image-gallery46246",
  storageBucket: "image-gallery46246.appspot.com",
  messagingSenderId: "875701345621",
  appId: "1:875701345621:web:50017fa87811d0603ee3dc",
  measurementId: "G-KK0HMNJMRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Initialize Firebase Authentication and get a reference to the service
