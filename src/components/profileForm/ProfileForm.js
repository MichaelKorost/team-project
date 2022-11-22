import React, { useState } from 'react';
import './profileForm.css';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';

export default function ProfileForm() {
  const [userProfile, setUserProfile] = useState({});

  const [firstNameErrMsg, setFirstNameErrMsg] = useState(
    'First name should be more than 1 character'
  );
  const [FirstNameValid, SetFirstNameValid] = useState(false);
  const [lastNameErrMsg, setLastNameErrMsg] = useState(
    'Last name should be more than 1 character'
  );
  const [lastNameValid, SetLastNameValid] = useState(false);

  const handleSubmit = (e) => {
    console.log(userProfile);
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
    </form>
    // </FormControl>
  );
}