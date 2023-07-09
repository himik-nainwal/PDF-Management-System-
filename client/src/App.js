import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login/Login';
import ForgotPass from './Login/Forgotpassword';
import OTP from './Login/OTP';
import Dashboard from './Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchUserDetails(token) {
      try {
        const response = await axios.post('/api/user/details', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      window.location.pathname !=="/otp" && 
      window.location.pathname !=="/forgotpass") 
      window.location.href ="/";
  }, []);
  console.log("This is ",user);
  return (
    <>
    <Routes>
    {!localStorage.getItem("token") && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="forgotpass" element ={<ForgotPass />} />
          </>
        )}
        <Route path="/dashboard " element={<Dashboard/>}/>
        <Route
									path='*'
									element={
										<h1 className='flex justify-center font-bold text-slate-800'>
											404 Page not Available
										</h1>
									}
								/>

    </Routes>
    </>
  );
}

export default App;
