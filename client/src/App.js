import './App.css';

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as URL from "./URL";
import axios from 'axios';
import Login from './Login/Login';
import ForgotPass from './Login/Forgotpassword';
import Dashboard from './Dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './Spinner.css'; // Import the spinner CSS file

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));

    async function fetchUserDetails() {
      try {
        setLoading(true);
        const response = await axios.post(URL.API_URL + 'data/dataofusers', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("aaaaa", response);
        if (response.data.success) {
          const userDetails = response.data.user;
          window.localStorage.setItem('user',JSON.stringify(response.data.user._id))
          setUser(userDetails);
        } else {
          console.log(response.data.message);
          setUser(null);
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        setUser(null);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchUserDetails();
    } else {
      setUser(null);
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      {loading ? (
        // Show spinner while loading
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        // Show routes
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="forgotpass" element={<ForgotPass />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route
            path='*'
            element={<Navigate to="/" replace />}
          />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
