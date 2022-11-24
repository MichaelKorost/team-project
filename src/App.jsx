import { FormatTextdirectionLToRSharp } from '@mui/icons-material';
import { getDialogUtilityClass } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { getProfile, setProfile, queryProfiles } from './firebase';
import { AuthContext } from './AuthContext';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

import ProfileForm from './components/profileForm/ProfileForm';
// import LoginForm from './components/LoginForm';

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      // const collectionRef = collection(db, "profiles");
      // // setDoc can be awaited but returns undefined anyway
      // setDoc(doc(collectionRef, user.uid), {
      //     name: "Max Payne",
      //     born: new Date("March 31, 2008"),
      //     blood: "O-",
      //     address: "fizzbuzz 69",
      //     kupat_holim: "Masterschool"
      // });
    }
  }, [user]);

  useEffect(() => {
    queryProfiles('kupat_holim', '==', 'Masterschool').then((data) => {
      console.warn('@@@@@@@@@@ data', data);
    });
  }, []);

  return (
    <div className='App'>
      <Navbar />
      {/* <LoginForm /> */}
      <ProfileForm />

      {/* <button onClick={e => getProfile(user).then(data => {console.warn(data);})}>click to get</button>
      <button onClick={e => setProfile(user, {fiz: "buzz"}).then(data => {console.warn("getProfile response:", data);})}>click to set</button> */}
      {/* 
        <button onClick={e => getProfile(user).then(data => console.warn(data))}>click to get</button> 
        <button onClick={e => setProfile(user, {lorem: "ipsum", dolor: "sit"}).then(data => console.warn("SET", data))}>SET</button>  */}
    </div>
  );
}

export default App;
