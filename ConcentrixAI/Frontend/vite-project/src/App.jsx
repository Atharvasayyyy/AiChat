import React from "react";
import Home from "./pages/Home";
import {useEffect} from "react";
import { getCurrentUser } from "./fetures/getcurrentuser.js";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const getuser=async()=>{
      try {
        const data = await getCurrentUser();
        dispatch(setUserData(data));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    getuser();
  }, [dispatch]);
  
  return (
    <>
      <Home />
    </> 
  )
}
export default App