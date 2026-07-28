// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvWkwOQdV6IxT-m9jRr3iBsY3lb1TdoTY",
  authDomain: "chat-e1583.firebaseapp.com",
  projectId: "chat-e1583",
  storageBucket: "chat-e1583.firebasestorage.app",
  messagingSenderId: "569329878083",
  appId: "1:569329878083:web:c9d0681e6c5536518900f6",
  measurementId: "G-YB817Z49LW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();