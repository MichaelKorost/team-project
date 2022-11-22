import React, { useEffect, useState } from 'react';
import './profileForm.css';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import {
  collection,
  db,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from '../../firebase/firebaseConfig';

export default function ProfileForm() {
  // ----------start states
  const [userProfile, setUserProfile] = useState({});
  const [firstNameErrMsg, setFirstNameErrMsg] = useState(
    'First name should be more than 1 character'
  );
  const [FirstNameValid, SetFirstNameValid] = useState(false);
  const [lastNameErrMsg, setLastNameErrMsg] = useState(
    'Last name should be more than 1 character'
  );
  const [lastNameValid, SetLastNameValid] = useState(false);
  const [user, setUser] = useState({});
  // const [users, setUsers] = useState([]);

  // ----------end states

  // ----------start form and inputs handling
  const handleSubmit = (e) => {
    console.log(userProfile);
    updateProfile();
  };

  const firstNameInputHandle = (e) => {
    isFirstNameValid(e.target.value);
    setUserProfile({ ...userProfile, firstName: e.target.value.toLowerCase() });
    console.log(userProfile);
  };
  const lastNameInputHandle = (e) => {
    isLastNameValid(e.target.value);
    setUserProfile({ ...userProfile, lastName: e.target.value.toLowerCase() });
    console.log(userProfile);
  };
  const dateInputHandle = (date) => {
    setUserProfile({ ...userProfile, date: date.format('YYYY-MM-DD') });
    console.log(userProfile);
  };
  const selectInputHandle = (e) => {
    setUserProfile({ ...userProfile, bloodType: e.target.value });
    console.log(userProfile);
  };

  const isFirstNameValid = (str) => {
    if (!str) {
      setFirstNameErrMsg('First name should be more than 1 character');
      return SetFirstNameValid(false);
    }
    if (String(str).includes(' ')) {
      setFirstNameErrMsg('First name should not include spaces');
      return SetFirstNameValid(false);
    }
    if (!/^[a-zA-Z]+$/.test(str)) {
      setFirstNameErrMsg('First name should not include numbers and symbols');
      return SetFirstNameValid(false);
    }
    setFirstNameErrMsg('');
    return SetFirstNameValid(true);
  };

  const isLastNameValid = (str) => {
    if (!str) {
      setLastNameErrMsg('Last name should be more than 1 character');
      return SetLastNameValid(false);
    }
    if (String(str).includes(' ')) {
      setLastNameErrMsg('Last name should not include spaces');
      return SetLastNameValid(false);
    }
    if (!/^[a-zA-Z]+$/.test(str)) {
      setLastNameErrMsg(
        'Last name should not include numbers and symbols or spaces'
      );
      return SetLastNameValid(false);
    }
    setLastNameErrMsg('');
    return SetLastNameValid(true);
  };

  // ----------end form and inputs handling

  // ---------start firestore shenanigans

  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const updateProfile = async () => {
    if (user) {
      const docRef = doc(db, 'users', user[0].id);
      await updateDoc(docRef, { ...userProfile });
      console.log(docRef);
    }
  };
  //our data to pass into firestore is in the form output
  // and that is - > userProfile
  // ---------end firestore shenanigans

  //---------todo---------
  //1. checking it with firestore  also works with updating specific inputs!
  // style, look on the web or do it with michael
  // taking everything into a modal which opens with the form

  return (
    // <FormControl>
    // onSubmit={(e) => handleSubmit(e)}
    <form className='profile-form'>
      <TextField
        // id='outlined-required'
        onChange={(e) => firstNameInputHandle(e)}
        label='First Name'
        helperText={firstNameErrMsg ? firstNameErrMsg : ''}
        error={!FirstNameValid}
      />
      <TextField
        // id='outlined-required'
        onChange={(e) => lastNameInputHandle(e)}
        label='Last Name'
        helperText={lastNameErrMsg ? lastNameErrMsg : ''}
        error={!lastNameValid}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={userProfile.date ? 'Date Chosen' : 'Choose A Date'}
          inputFormat='MM/DD/YYYY'
          value={userProfile.date ? userProfile.date : ''}
          onChange={(date) => dateInputHandle(date)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Select
        required
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={userProfile.bloodType ? userProfile.bloodType : ''}
        label='Blood Type'
        error={!userProfile.bloodType}
        onChange={(e) => selectInputHandle(e)}>
        <MenuItem value={'A-'}>A-</MenuItem>
        <MenuItem value={'B-'}>B-</MenuItem>
        <MenuItem value={'AB'}>AB</MenuItem>
      </Select>

      <Button
        variant='contained'
        // type='submit'
        onClick={handleSubmit}
        disabled={
          !(
            userProfile.firstName &&
            userProfile.lastName &&
            userProfile.date &&
            userProfile.bloodType &&
            !firstNameErrMsg &&
            !lastNameErrMsg
          )
        }>
        submit
      </Button>

      {/* <Button
        onClick={() => {
          updateUser();
        }}></Button> */}
    </form>
    // </FormControl>
  );
}
