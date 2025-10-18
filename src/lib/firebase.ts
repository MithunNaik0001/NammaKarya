// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'dotenv/config'

// Your web app's Firebase configuration
// The config is populated with environment variables from your hosting provider.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
// Check if Firebase has already been initialized
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("Firebase initialization error", e);
  }
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
