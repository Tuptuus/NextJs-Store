import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextstore-b00c9.firebaseapp.com",
  projectId: "nextstore-b00c9",
  storageBucket: "nextstore-b00c9.appspot.com",
  messagingSenderId: "199287688548",
  appId: "1:199287688548:web:76460e351b40bed94d3e71",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
