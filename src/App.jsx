import { useState, useEffect, useContext } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";

import { FirebaseContext, RegStudentsContext, AuthContext } from './store/Context';

import HomePage from './pages/Home'
import Footer from './components/Footer';
import RegListPage from './pages/Registration';
import RegisterForm from './components/RegisterForm';
import CheckinPage from './pages/Checkin';
import LoginPage from './pages/Login';
import Account from './components/Account';


function App() {
  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const { setRegStudents } = useContext(RegStudentsContext)

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)

    })

    // firebase.firestore().collection('teenspace23_registered_students').get().then((snapshot) => {
    //   const allRegStudents = snapshot.docs.map((regStudent) => {
    //     return {
    //       ...regStudent.data(),
    //       id: regStudent.id
    //     }
    //   })
    //   console.log(allRegStudents);
    //   setRegStudents(allRegStudents);
    // });

    fetch('https://script.google.com/macros/s/AKfycbzXspfj1-Ixhm8RW6va0tU_0uCbUMAw0TNgG3Y7WKKP19unOhnOpnmuAEKrdEC6gYU/exec')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      setRegStudents(data);
    })
    .catch(error => console.error('Error:', error));

  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {user && <>
          <Route path="/regList" element={<RegListPage />} />
          <Route path="/regForm" element={<RegisterForm />} />
        </>}
        <Route path="/checkInList" element={<CheckinPage />} />
        {user ? <Route path="/admin" element={<RegListPage />} /> : <Route path="/admin" element={<LoginPage />} />}
      </Routes>
      <Footer />

    </>
  )
}

export default App
