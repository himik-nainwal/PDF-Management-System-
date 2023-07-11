import React, { useState, useEffect, useRef } from "react";
import { Types } from "mongoose";
import * as url from "../URL"; 
import CardList from "../CardList/CardList";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [uID, setuID] = useState(localStorage.getItem("user"));
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    // Fetch the list of files from Firebase Storage
    const storageRef = firebase.storage().ref();
    storageRef
      .listAll()
      .then((result) => {
        const filePromises = result.items.map((item) => {
          return item.getDownloadURL();
        });

        Promise.all(filePromises)
          .then((downloadURLs) => {
            const fileList = result.items.map((item, index) => {
              return {
                name: item.name,
                url: downloadURLs[index],
                uploadedBy: item.name.split("_")[0],
              };
            });

            setFiles(fileList);
          })
          .catch((error) => {
            console.error("Error fetching download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [selectedFile]);

  const handleUpload = async () => {
    if (selectedFile) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`${uID}_${selectedFile.name}`);
      try {
        const uploadTaskSnapshot = await fileRef.put(selectedFile);
        console.log('File uploaded successfully!');
        toast.success('File uploaded successfully!');
  
        // Save file details in MongoDB
        const response = await axios.post(url.API_URL + 'files/uploadFile', {
          fileName: selectedFile.name,
          filePath: uploadTaskSnapshot.ref.fullPath,
          uploadedBy: localStorage.getItem("user")
        });
        console.log("aaaaa",response);
        if (response.status === 201) {
          console.log('File details saved in MongoDB');
        } else {
          toast.error('Error saving file details in MongoDB');
        }
  
        setSelectedFile(null);
      } catch (error) {
        console.log('Error uploading file:', error);
        toast.error('Error uploading file!');
      }
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="bg-blue-200 h-screen w-full">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="text-black font-poppins text-3xl flex justify-center p-8">
        Dashboard
      </div>
      <div className="fixed top-0 right-0 p-4">
      <button
        className="bg-blue-500 hover:bg-sky-blue-400 text-white font-semibold py-2 px-4 rounded transition duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
      <div className="bg-alabaster flex text-black font-poppins">
        <div className="flex-1 pr-3 border-r border-gray-300">
          <div className="h-full p-8 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">My Files</h2>
            {files.length > 0 ? (
              <CardList data={files} uID={uID} />
            ) : (
              <p>No files uploaded yet.</p>
            )}
            <div className="fixed bottom-4 left-4 z-10">
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {/* <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload</button> */}
               <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        {selectedFile ? selectedFile.name : "Select File"}
      </button>
      {selectedFile && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 ml-4 rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
            </div>
          </div>
        </div>

        <div className="flex-1 pl-3">
          <div className="h-full p-8 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Shared Files</h2>
            {/* <CardList data={pdfs.data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
