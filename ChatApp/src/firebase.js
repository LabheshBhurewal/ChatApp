// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXXLOkvx69JAe6XUGVuskvwjDnhvlNqXA",
  authDomain: "chatting-a9e67.firebaseapp.com",
  projectId: "chatting-a9e67",
  storageBucket: "chatting-a9e67.appspot.com",
  messagingSenderId: "844955992520",
  appId: "1:844955992520:web:bfa5af4f170871db92c0fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db =getFirestore();