import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import { auth, googleProvider } from "../utils/firebase.js";
import api from "../utils/axios.js";
import { getCurrentUser } from "../fetures/getcurrentuser.js";
import { setUserData } from "../redux/userSlice.js"; // <-- change path if needed

const Home = () => {
  const dispatch = useDispatch();

  // If your slice has initialState = { user: null }
  const userData = useSelector((state) => state.user.user);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const loginToBackend = async (token) => {
    const { data } = await api.post(
      "/api/auth/login",
      { token },
      {
        withCredentials: true,
      }
    );

    return data;
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError("");

    try {
      // Google Login
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      console.log("Firebase login successful");

      // Backend Login
      const loginResponse = await loginToBackend(token);

      console.log("Backend Login:", loginResponse);

      // Fetch Current User
      try {
        console.log("1. Before getCurrentUser");
      const currentUser = await getCurrentUser();
      console.log("Current User:", currentUser);
      dispatch(setUserData(currentUser));
      console.log("User data saved to Redux:", currentUser);
      }catch (error) {
        console.error("Error fetching current user after backend login:", error);
      }


    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }

      setError("Login failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {userData ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Welcome {userData.name}
          </h1>

          <p>{userData.email}</p>

          {userData.avatar && (
            <img
              src={userData.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto mt-4"
            />
          )}
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <FcGoogle size={22} />
            {isLoggingIn ? "Signing In..." : "Continue with Google"}
          </button>

          {error && (
            <p className="text-red-500 mt-3">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;