import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as URL from "./URL";
import axios from 'axios';
import Login from './Login/Login';
import ForgotPass from './Login/Forgotpassword';
import Dashboard from './Dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken]=useState(null);
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    async function fetchUserDetails() {
      try {
        const response = await axios.post(URL.API_URL+'data/dataofusers', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log("aaaaa",response);
        if (response.data.success) {
          const userDetails = response.data.user;
          setUser(userDetails);
        } else {
          console.log(response.data.message);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
    if (token) {
      fetchUserDetails(token);
    } else if (
      window.location.pathname !=="/" && 
      window.location.pathname !=="/forgotpass") {
      window.location.href ="/";
    console.log("aaaaa")}
  }, [token]);
  console.log("This is ",user);
  return (
    <>
    <Routes>
    {!localStorage.getItem("token") && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="forgotpass" element ={<ForgotPass />} />
          </>
        )}
       {user && (<>
       <Route path="/dashboard" element={<Dashboard/>}/>
       </>
       )}
        <Route
									path='*'
									element={
										<h1 className='flex justify-center font-bold text-slate-800'>
											404 Page not Available
										</h1>
									}
								/>

    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
