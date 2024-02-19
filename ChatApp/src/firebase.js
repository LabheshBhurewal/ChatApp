// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI8cpABQ4_UfwGyvQ_Ux0WBbei2fRTRFo",
  authDomain: "chat-160fd.firebaseapp.com",
  projectId: "chat-160fd",
  storageBucket: "chat-160fd.appspot.com",
  messagingSenderId: "685869581589",
  appId: "1:685869581589:web:d58130e6838d941398551c",
  measurementId: "G-WF4YMQQ5TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db =getFirestore();