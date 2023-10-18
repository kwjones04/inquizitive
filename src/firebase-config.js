// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjRpD7f8aJbKzrVYwPvGeT8R2h12VeXZQ",
  authDomain: "inquizitive-ca8ee.firebaseapp.com",
  projectId: "inquizitive-ca8ee",
  storageBucket: "inquizitive-ca8ee.appspot.com",
  messagingSenderId: "205683888160",
  appId: "1:205683888160:web:9472c0a815a49a5276ec45",
  measurementId: "G-J2GTCGL7W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Firebase connections
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();