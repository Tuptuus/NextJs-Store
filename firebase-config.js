import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAWD8egvVLV5kJcrR7n1xybiDXl4Ml9WY",
  authDomain: "nextstore-b00c9.firebaseapp.com",
  projectId: "nextstore-b00c9",
  storageBucket: "nextstore-b00c9.appspot.com",
  messagingSenderId: "199287688548",
  appId: "1:199287688548:web:76460e351b40bed94d3e71",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
