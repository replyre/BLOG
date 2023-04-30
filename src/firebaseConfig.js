import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJ-bBbUPsqMshhZVVrykxpqTKg9lRhfaA",

  authDomain: "blogapp-d9f9b.firebaseapp.com",

  projectId: "blogapp-d9f9b",

  storageBucket: "blogapp-d9f9b.appspot.com",

  messagingSenderId: "522991894304",

  appId: "1:522991894304:web:0f8964fae6db8bc5362145",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const Gprovider = new GoogleAuthProvider();
