import React, { useState } from "react";
import axios from "axios" ;

import * as url from "../URL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OTPModal = ({email}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [otp, setOtp] = useState("");
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(url.API_URL+'auth/verifyOTP', { email,otp });
          if (response.data.success) {
            const token = response.data.token;
            toast.success('OTP verification successful');
            console.log('Token:', token);
            window.location.href = "/dashboard";
        } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <>
            {isOpen && (
                <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-alabaster opacity-75"></div>
                    </div>
                    <div
                        className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Enter OTP you have received on email
                                </h3>
                                <form onSubmit={handleOtpSubmit}>
                                    <input
                                        type="text "
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                    />
                                    <button
                                        type="submit"
                                        className="transition duration-200 bg-bitter-sweet hover:scale-105 duration-700 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                    // onClick={handleOtpSubmit}
                                    >
                                        <span className="inline-block mr-2">Verify OTP</span>
                                        {/* add icon */}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OTPModal;