// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEHvY7F90VDJAxGYpU0cjqVizNfZmejRA",
  authDomain: "autenticacao-administrativa.firebaseapp.com",
  projectId: "autenticacao-administrativa",
  storageBucket: "autenticacao-administrativa.firebasestorage.app",
  messagingSenderId: "724706435418",
  appId: "1:724706435418:web:cc90055d710060cf381363"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);