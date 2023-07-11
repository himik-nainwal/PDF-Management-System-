// firebaseConfig.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCIHdg2Kedz9nmacY5x-2XcgILwTaba8js",
  authDomain: "spotdraft-60c8d.firebaseapp.com",
  projectId: "spotdraft-60c8d",
  storageBucket: "spotdraft-60c8d.appspot.com",
  messagingSenderId: "751550919085",
  appId: "1:751550919085:web:a0c0d0a19ea5b22df4b124",
  measurementId: "G-D9PWNPMW71"
  // Your Firebase project configuration
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();


// const firebaseConfig = {
//     apiKey: "AIzaSyCIHdg2Kedz9nmacY5x-2XcgILwTaba8js",
//   authDomain: "spotdraft-60c8d.firebaseapp.com",
//   projectId: "spotdraft-60c8d",
//   storageBucket: "spotdraft-60c8d.appspot.com",
//   messagingSenderId: "751550919085",
//   appId: "1:751550919085:web:a0c0d0a19ea5b22df4b124",
//   measurementId: "G-D9PWNPMW71"
//   // Your Firebase project configuration
// };

// firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storage();
