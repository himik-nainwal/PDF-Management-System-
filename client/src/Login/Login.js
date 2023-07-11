import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPModal from "./OTP";
import axios from 'axios';
import * as url from "../URL";
function Login() {
    const [email, setEmail] = useState("");
    const [name , setName] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const handleChangeConfirmPassword = (e) => {
        setConfPass(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePass = (e) => {
        setPassword(e.target.value);
    };
    const handlename=(e)=>{
        setName(e.target.value);
    }

    const switchMode = (e) => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            if (password !== confPass) {
                toast.error("Passwords do not match!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return;
            } else {
                const response = await axios.post(url.API_URL+'auth/signup',{
                    name,
                    email,
                    password
                });
                if(response.data.success){
                    setOpenModal(true);
                    toast.success("Signup Done! OTP Sent!");
                    
                }
                else {
                   toast.error(response.data.message);
                  }
            }
        } else {
            const response = await axios.post(url.API_URL+'auth/login',{
                email,
                password
            });
            if(response.data.success){
                toast.success("Login Successful");
                const token = response.data.token;
                window.localStorage.setItem("token",token);
                // window.location.href="/dashboard";
                // window.location.reload();
                window.location.replace("/dashboard");

            }
            else {
                toast.error(response.data.message);
               }
            
        }
    };

    const forgotPass = (e) => {
        window.location.href = "/forgotpass";
    };

    return (
        <div className="bg-bitter-sweet flex flex-col justify-center items-center w-screen h-screen font-poppins">
            {openModal && <OTPModal email={email} status={openModal} />}
            <div className="p-10 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow-2xl w-full rounded-lg divide-y divide-gray-200 border-grey">
                    <h1 className="text-3xl flex justify-center p-4">Login</h1>
                    <form className="p-5" onSubmit={handleSubmit}>
                    {isSignup && (
                            <>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                    Full Name 
                                </label>
                                <input
                                    type="text"
                                    onChange={handlename}
                                    value={name}
                                    className="border shadow-xl rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                />
                            </>
                        )}
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            className="border shadow-xl rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">
                            Password
                        </label>
                        <input
                            type="password"
                            className="border shadow-xl rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={handleChangePass}
                            value={password}
                        />
                        {isSignup && (
                            <>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    onChange={handleChangeConfirmPassword}
                                    value={confPass}
                                    className="border shadow-xl rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                />
                            </>
                        )}
                        <button
                            type="submit"
                            className="transition shadow-xl duration-200 bg-bitter-sweet hover:scale-110 duration-700 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            {isSignup ? (
                                <span className="inline-block mr-2">Sign Up</span>
                            ) : (
                                <span className="inline-block mr-2">Login</span>
                            )}
                            {/* Add icon */}
                        </button>
                    </form>
                    <div className="py-5">
                        {!isSignup && (
                            <>
                                <div className="text-center whitespace-nowrap">
                                    <button
                                        className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-bg-stone-700"
                                        onClick={forgotPass}
                                    >
                                        <span className="inline-block ml-1">Forgot Password</span>
                                    </button>
                                </div>
                            </>
                        )}
                        <div className="text-center whitespace-nowrap">
                            <button
                                className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-bg-stone-700"
                                onClick={switchMode}
                            >
                                <span className="inline-block ml-1">
                                    {isSignup
                                        ? "Already have an account? Sign In"
                                        : "Don't have an account? Sign Up"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
