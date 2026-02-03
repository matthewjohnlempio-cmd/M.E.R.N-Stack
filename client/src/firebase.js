// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNWc7F4a-obPQeYaoGpdEgF8U4quBS3UQ",
  authDomain: "mern-firebase-backup.firebaseapp.com",
  databaseURL: "https://mern-firebase-backup-default-rtdb.firebaseio.com",
  projectId: "mern-firebase-backup",
  storageBucket: "mern-firebase-backup.firebasestorage.app",
  messagingSenderId: "760898768995",
  appId: "1:760898768995:web:bbb94fa2c2c9faa0e0e856",
  measurementId: "G-V76BJGP6GT"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const realtimeDb = getDatabase(app);
