
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhw_SGnrGE5H1t-tLHAabP04BYoWnop68",
  authDomain: "officalmastergit-0171166-a7f57.firebaseapp.com",
  projectId: "officalmastergit-0171166-a7f57",
  storageBucket: "officalmastergit-0171166-a7f57.firebasestorage.app",
  messagingSenderId: "702660646743",
  appId: "1:702660646743:web:9f95c74bebc76e9cc31012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
