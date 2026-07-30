// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

// import { auth, googleProvider } from "../utils/firebase.js";
// import api from "../utils/axios.js";
// import { getCurrentUser } from "../fetures/getcurrentuser.js";
// import { setUserData } from "../redux/userSlice.js"; // <-- change path if needed

// const Home = () => {
//   const dispatch = useDispatch();

//   // If your slice has initialState = { user: null }
//   const userData = useSelector((state) => state.user.user);

//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [error, setError] = useState("");

//   const loginToBackend = async (token) => {
//     const { data } = await api.post(
//       "/api/auth/login",
//       { token },
//       {
//         withCredentials: true,
//       }
//     );

//     return data;
//   };

//   const handleGoogleLogin = async () => {
//     setIsLoggingIn(true);
//     setError("");

//     try {
//       // Google Login
//       const result = await signInWithPopup(auth, googleProvider);

//       const token = await result.user.getIdToken();

//       console.log("Firebase login successful");

//       // Backend Login
//       const loginResponse = await loginToBackend(token);

//       console.log("Backend Login:", loginResponse);

//       // Fetch Current User
//       try {
//         console.log("1. Before getCurrentUser");
//       const currentUser = await getCurrentUser();
//       console.log("Current User:", currentUser);
//       dispatch(setUserData(currentUser));
//       console.log("User data saved to Redux:", currentUser);
//       }catch (error) {
//         console.error("Error fetching current user after backend login:", error);
//       }


//     } catch (err) {
//       console.error("Login Error:", err);

//       if (err.response) {
//         console.error("Status:", err.response.status);
//         console.error("Response:", err.response.data);
//       }

//       setError("Login failed.");
//     } finally {
//       setIsLoggingIn(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gray-100">
//       {userData ? (
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">
//             Welcome {userData.name}
//           </h1>

//           <p>{userData.email}</p>

//           {userData.avatar && (
//             <img
//               src={userData.avatar}
//               alt="avatar"
//               className="w-20 h-20 rounded-full mx-auto mt-4"
//             />
//           )}
//         </div>
//       ) : (
//         <div className="text-center">
//           <button
//             onClick={handleGoogleLogin}
//             disabled={isLoggingIn}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             <FcGoogle size={22} />
//             {isLoggingIn ? "Signing In..." : "Continue with Google"}
//           </button>

//           {error && (
//             <p className="text-red-500 mt-3">{error}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";

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

  const revealRefs = useRef([]);

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
        const currentUser = await getCurrentUser();
        console.log("Current User:", currentUser);
        dispatch(setUserData(currentUser));
        console.log("User data saved to Redux:", currentUser);
      } catch (error) {
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

  // Scroll-reveal animation for elements with the .wolvix-reveal class
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("wolvix-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const nodes = document.querySelectorAll(".wolvix-reveal");
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] text-[#e2e2e2] font-sans overflow-x-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0A0A0A]/70">
        <div className="flex justify-between items-center w-full px-6 py-2 max-w-[1440px] mx-auto h-20">
          <div className="text-2xl font-extrabold tracking-tighter text-[#e2e2e2]">
            Wolvix
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="text-[#ccc3d8] font-medium hover:text-[#d2bbff] transition-colors duration-300"
              href="#"
            >
              Docs
            </a>
            <a
              className="text-[#ccc3d8] font-medium hover:text-[#d2bbff] transition-colors duration-300"
              href="#"
            >
              GitHub
            </a>
            <button
              onClick={handleGoogleLogin}
              // <FcGoogle size={22} />
              disabled={isLoggingIn}
              className="bg-[#7c3aed] text-[#ede0ff] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] disabled:opacity-50"
            >
              {isLoggingIn ? "Signing In..." : "Sign In"}
            </button>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-[#e2e2e2]">
              menu
            </span>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-6 overflow-hidden">
          <div
            className="wolvix-violet-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{
              filter: "blur(120px)",
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
            }}
          />

          <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
            <div className="mb-8 px-4 py-1.5 rounded-full border border-[#d2bbff]/20 bg-[#d2bbff]/5 backdrop-blur-md">
              <span className="text-xs font-semibold text-[#d2bbff] tracking-widest uppercase">
                AI Agents. Your Data. Your Rules.
              </span>
            </div>

            <h1 className="text-[40px] md:text-[96px] text-[#e2e2e2] mb-8 leading-[0.9] tracking-tighter font-extrabold">
              Your AI. Your Data. <br className="hidden md:block" />{" "}
              <span className="text-[#d2bbff]">Your Control.</span>
            </h1>

            <p className="text-lg text-[#ccc3d8] max-w-[640px] mb-12">
              Wolvix lets you run multiple AI agents on any model, connect
              your own database, and stay in full control — pay only for
              what you use.
            </p>

            {userData ? (
              <div className="mt-10 w-full max-w-md rounded-[24px] border border-[#d2bbff]/20 bg-[#1A1A1A]/80 p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-4">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="avatar"
                      className="h-14 w-14 rounded-full border border-[#d2bbff]/30"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d2bbff] text-lg font-bold text-[#3f008e]">
                      {userData.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-[#e2e2e2]">
                      Welcome {userData.name || "there"}
                    </h2>
                    <p className="text-sm text-[#ccc3d8]">{userData.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col items-center">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="group relative flex items-center gap-3 bg-[#7c3aed] text-white px-8 py-5 rounded-[20px] text-xl font-bold transition-all duration-500 overflow-hidden disabled:opacity-50 hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center bg-white rounded-full w-7 h-7 text-sm">
                    <FcGoogle size={22} />
                  </span>
                  <span className="relative">
                    {isLoggingIn ? "Signing In..." : "Continue with Google"}
                  </span>
                </button>

                {error && (
                  <p className="mt-4 text-sm text-red-500">{error}</p>
                )}
              </div>
            )}

            <p className="mt-6 text-xs text-[#958da1] uppercase tracking-tighter">
              No subscription required • Secure Auth
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 px-6 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Multiple Agents */}
            <div className="wolvix-reveal md:col-span-7 bg-[#1A1A1A] border-t border-white/5 shadow-[0_40px_40px_-20px_rgba(0,0,0,0.6)] p-12 rounded-[20px] flex flex-col justify-end min-h-[400px] transition-shadow duration-300 hover:shadow-[0_40px_60px_-20px_rgba(124,58,237,0.15)]">
              <span className="material-symbols-outlined text-[#d2bbff] text-5xl mb-6">
                dynamic_feed
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#e2e2e2] mb-4">
                Not one agent. A team of them.
              </h3>
              <p className="text-base text-[#ccc3d8] max-w-md">
                Spin up multiple AI agents that work together or
                independently — each one focused on a different task,
                running in parallel.
              </p>
            </div>

            {/* Multiple Models */}
            <div className="wolvix-reveal md:col-span-5 bg-[#1A1A1A] border-t border-white/5 shadow-[0_40px_40px_-20px_rgba(0,0,0,0.6)] p-12 rounded-[20px] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_40px_60px_-20px_rgba(124,58,237,0.15)]">
              <div className="flex flex-wrap gap-3">
                {["GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3"].map(
                  (model) => (
                    <span
                      key={model}
                      className="px-4 py-2 bg-[#1e2020] rounded-full text-xs font-semibold"
                    >
                      {model}
                    </span>
                  )
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#e2e2e2] mb-4">
                  Every model. One platform.
                </h3>
                <p className="text-base text-[#ccc3d8]">
                  Switch between the best models for each task without
                  juggling tools.
                </p>
              </div>
            </div>

            {/* BYODB flagship */}
            <div className="wolvix-reveal md:col-span-12 bg-[#1A1A1A] border-t border-white/5 shadow-[0_40px_40px_-20px_rgba(0,0,0,0.6)] p-12 md:p-20 rounded-[20px] relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_40px_60px_-20px_rgba(124,58,237,0.15)]">
              <div className="relative z-10 md:w-1/2">
                <div className="inline-block mb-6 px-4 py-1 bg-[#d2bbff] text-[#3f008e] rounded-full text-xs font-semibold uppercase">
                  The core of Wolvix
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#e2e2e2] mb-8 leading-tight">
                  Your database. Not ours.
                </h2>
                <p className="text-lg text-[#ccc3d8] mb-10">
                  Connect your own database directly to Wolvix. Your agents
                  work with your real data, live — nothing is copied,
                  stored, or held hostage on our servers.
                </p>
                <div className="flex items-center gap-4 text-[#d2bbff] font-bold">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    security
                  </span>
                  <span className="text-base">End-to-End Encryption</span>
                </div>
              </div>
            </div>

            {/* API Keys */}
            <div className="wolvix-reveal md:col-span-4 bg-[#1A1A1A] border-t border-white/5 shadow-[0_40px_40px_-20px_rgba(0,0,0,0.6)] p-10 rounded-[20px] text-center transition-shadow duration-300 hover:shadow-[0_40px_60px_-20px_rgba(124,58,237,0.15)]">
              <span className="material-symbols-outlined text-4xl mb-4 text-[#ccc3d8]">
                key
              </span>
              <h3 className="text-2xl font-bold text-[#e2e2e2] mb-3">
                Use your own API keys.
              </h3>
              <p className="text-base text-[#ccc3d8]">
                No lock-in, no markup on models you already pay for.
              </p>
            </div>

            {/* Pricing */}
            <div className="wolvix-reveal md:col-span-4 bg-[#1A1A1A] border-t border-white/5 border-[#d2bbff]/20 shadow-[0_40px_40px_-20px_rgba(0,0,0,0.6)] p-10 rounded-[20px] text-center transition-shadow duration-300 hover:shadow-[0_40px_60px_-20px_rgba(124,58,237,0.15)]">
              <div className="text-4xl font-extrabold text-[#d2bbff] mb-2">
                ₹1 = 1
              </div>
              <h3 className="text-2xl font-bold text-[#e2e2e2] mb-3">
                Simple Pricing
              </h3>
              <p className="text-base text-[#ccc3d8]">
                Pay only for what you use. Referral credits included.
              </p>
            </div>

            {/* Data Ownership */}
            <div className="wolvix-reveal md:col-span-4 bg-[#1A1A1A] border-t border-white/5 shadow-[0_40px_40px_-20px_rgba(0,0,0,0.6)] p-10 rounded-[20px] text-center transition-shadow duration-300 hover:shadow-[0_40px_60px_-20px_rgba(124,58,237,0.15)]">
              <span className="material-symbols-outlined text-4xl mb-4 text-[#d2bbff]">
                analytics
              </span>
              <h3 className="text-2xl font-bold text-[#e2e2e2] mb-3">
                Full Data Access
              </h3>
              <p className="text-base text-[#ccc3d8]">
                Export, disconnect, or delete anytime. You own the flow.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 -z-10"
            style={{
              filter: "blur(120px)",
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
            }}
          />
          <div className="wolvix-reveal max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-extrabold text-[#e2e2e2] mb-12 tracking-tighter leading-tight">
              Build with your own data, your own models,{" "}
              <span className="text-[#d2bbff]">your own rules.</span>
            </h2>
            <div className="flex flex-col items-center">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="group flex items-center gap-3 bg-[#7c3aed] text-white px-10 py-6 rounded-[20px] text-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]"
              >
                <span className="flex items-center justify-center bg-white rounded-full w-7 h-7 text-sm">
                  <FcGoogle size={22} />
                </span>
                <span>
                  {isLoggingIn ? "Signing In..." : "Continue with Google"}
                </span>
              </button>

              <div className="mt-12 flex justify-center gap-16 items-center opacity-40">
                <div className="text-xs uppercase tracking-widest">
                  Scalable
                </div>
                <div className="text-xs uppercase tracking-widest">
                  Private
                </div>
                <div className="text-xs uppercase tracking-widest">
                  Developer-First
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#121414] py-32 w-full">
        <div className="flex flex-col items-center gap-5 text-center px-6 w-full max-w-[1440px] mx-auto">
          <div className="text-2xl font-bold text-[#e2e2e2]">Wolvix</div>
          <div className="flex gap-8 my-8">
            <a
              className="text-[#ccc3d8] hover:text-[#d2bbff] transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-[#ccc3d8] hover:text-[#d2bbff] transition-colors"
              href="#"
            >
              GitHub
            </a>
            <a
              className="text-[#ccc3d8] hover:text-[#d2bbff] transition-colors"
              href="#"
            >
              Contact
            </a>
          </div>
          <p className="text-base text-[#ccc3d8] opacity-80">
            © 2024 Wolvix. Your AI. Your Data. Your Control.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[#d2bbff] opacity-60">
            <div className="w-2 h-2 rounded-full bg-[#d2bbff] relative">
              <div className="absolute inset-0 rounded-full bg-[#d2bbff] animate-ping" />
            </div>
            <span className="text-xs uppercase tracking-widest font-semibold">
              Systems Operational
            </span>
          </div>
        </div>
      </footer>
      {/* Reveal animation styles (scoped to this component) */}
      <style>{`
        .wolvix-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .wolvix-reveal.wolvix-active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Home;