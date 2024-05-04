// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA50rdu7jHARISbiM4XwXV5VZvRqN-LQI",
  authDomain: "labhuchat.firebaseapp.com",
  projectId: "labhuchat",
  storageBucket: "labhuchat.appspot.com",
  messagingSenderId: "706470158109",
  appId: "1:706470158109:web:f4580b75b73d33cb3b8bf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, storage, db};