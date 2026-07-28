import React from "react";
import Home from "./pages/Home";
import {useEffect} from "react";
import { getCurrentUser } from "./fetures/getcurrentuser.js";


function App() {
  useEffect(() => {
    const getuser=async()=>{
      await getCurrentUser();
    }
    getuser();
  }, []);
  
  return (
    <>
      <Home />
    </> 
  )
}
export default App