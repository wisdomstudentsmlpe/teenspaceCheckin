// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKtm_MnkodajjUfamfkYHrBICi0c0UJPI",
  authDomain: "wisdom-students-mlpe.firebaseapp.com",
  projectId: "wisdom-students-mlpe",
  storageBucket: "wisdom-students-mlpe.appspot.com",
  messagingSenderId: "880331812533",
  appId: "1:880331812533:web:d56c1d3c2b6afec7c218fc",
  measurementId: "G-V51T3DETJX"
};

export default firebase.initializeApp(firebaseConfig)