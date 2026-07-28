import React from 'react'
import axios from "axios";
import api from "./utils/axios.js";
import { auth, googleProvider } from './utils/firebase.js';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function App() {
  const handellogin = async (token) => {
    try {
      const {data} = await api.post("/auth/login", {
        token,
      });
      console.log(data.data);

    } catch (error) {
      console.error("Login failed:", error);
          console.log(error);
    console.log(error.response);
    console.log(error.response?.data);
    console.log(error.message);
      console.log(" err is in these handellogin part in the app.jsx file");
    }
  };

  const googlelogin = async () => {
    try {
    const result = await signInWithPopup(auth, googleProvider);

    const token = await result.user.getIdToken();

    console.log(token);

    await handellogin(token);

    console.log("Login successful");
    } catch (error) {
      console.error("Google login failed:", error);
      console.log(" err is in these google login in the app.jsx file");
    }
  };

  return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={googlelogin}
      >
        Continue With Google
      </button>
    </div>
  );
}
  

export default App