import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSUJseqXkEAc6H7NVmuNLHSHaGS3_hXsU",
  authDomain: "chat-react-e9473.firebaseapp.com",
  projectId: "chat-react-e9473",
  storageBucket: "chat-react-e9473.firebasestorage.app",
  messagingSenderId: "775369915823",
  appId: "1:775369915823:web:e51945d00078da0c06435a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
