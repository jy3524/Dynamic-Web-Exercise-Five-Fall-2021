import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import './App.css';
// Page Imports
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import firebaseConfig from "./components/FirebaseConfig"

function App() {
  // Track if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  // Check to see if there is any loading...
  const [loading, setLoading] = useState(true);
  // Store user information in state
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);

  // Initialize Firebase
  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true)
  }, []);

  // Check to see if User is logged in
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in,
          setUserInformation(user);
          setLoggedIn(true);
        } else {
          // User is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
      });
      setLoading(false)
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  if (loading) return null;

  return (
    <>
      <Header logout={logout} loggedIn={loggedIn} />
      <Router>
        <Routes>
          <Route path="/user/:id" element={loggedIn ? <UserProfile userInformation={userInformation}/> : <Navigate to="/" />} />
          <Route path="/create" element={!loggedIn ? (<CreateUser setLoggedIn={setLoggedIn} setUserInformation={setUserInformation} />) : (<Navigate to={`/user/${userInformation.uid}`} />)} />
          <Route path="/" element={!loggedIn ? (<Login setLoggedIn={setLoggedIn} setUserInformation={setUserInformation}/>) : (<Navigate to={`/user/${userInformation.uid}`} />)} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
