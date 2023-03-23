import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApLXGxmFQp8OIEl25P_AuUiLCqDx9ig8c",
  authDomain: "fir-auth-6ff58.firebaseapp.com",
  projectId: "fir-auth-6ff58",
  storageBucket: "fir-auth-6ff58.appspot.com",
  messagingSenderId: "14739608009",
  appId: "1:14739608009:web:6a0d19a8e74a51434cd818"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db};