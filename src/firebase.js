// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBzpncJqKWFb4pkZHyCoHlEAe6oBOM4xWs",
    authDomain: "calander-app-6c31a.firebaseapp.com",
    projectId: "calander-app-6c31a",
    storageBucket: "calander-app-6c31a.firebasestorage.app",
    messagingSenderId: "330922836587",
    appId: "1:330922836587:web:dfb24633b39f0f92f2a72e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
