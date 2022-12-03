import React, { useContext, useEffect, useState } from "react";
import "./profileForm.css";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Autocomplete,
  Button,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { db, doc, updateDoc } from "../../firebase/firebaseConfig";
import { AuthContext } from "../../AuthContext";
import cities from "./cities.json";

export default function ProfileForm({ onCloseModal }) {
  // ----------start states
  const [userProfile, setUserProfile] = useState({});

  const [firstNameErrMsg, setFirstNameErrMsg] = useState(
    "First name should be more than 1 character"
  );
  const [FirstNameValid, SetFirstNameValid] = useState(false);
  const [lastNameErrMsg, setLastNameErrMsg] = useState(
    "Last name should be more than 1 character"
  );
  const [lastNameValid, SetLastNameValid] = useState(false);

  const [LocationValid, setLocationValid] = useState(false);
  const [locationErrMsg, setLocationErrMsg] = useState(
    "Location should be more than 1 character"
  );
  const [locationCity, setLocationCity] = useState("");
  const [locationCityValid, setLocationCityValid] = useState(false);
  const [locationCityErrMsg, setLocationCityErrMsg] = useState(
    "Please select a city from the list"
  );
  const [locationStreet, setLocationStreet] = useState("");
  const [locationStreetValid, setLocationStreetValid] = useState(false);
  const [locationStreetErrMsg, setLocationStreetErrMsg] = useState(
    "Street address should be more than 1 character long"
  );
  const [locationFull, setLocationFull] = useState({
    city: null,
    street: null,
  });
  // const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [phoneNumberErrMsg, setPhoneNumberErrMsg] = useState(
    "Phone number should be at least 9 digits"
  );
  //  ----------date states
  const [isMinAge, setIsMinAge] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  //  ----------date states

  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // ----------end states

  const handleSubmit = (e) => {
    // console.log(userProfile);
    updateProfile();
    cancelHandler();
  };

  const cancelHandler = () => {
    onCloseModal();
  };
  // ----------start inputs handling

  const firstNameInputHandle = (e) => {
    isFirstNameValid(e.target.value);
    setUserProfile({ ...userProfile, firstName: e.target.value.toLowerCase() });
    // console.log(userProfile);
  };
  const lastNameInputHandle = (e) => {
    isLastNameValid(e.target.value);
    setUserProfile({ ...userProfile, lastName: e.target.value.toLowerCase() });
    // console.log(userProfile);
  };

  const locationInputHandler = (e) => {
    isLocationValid(e.target.value);
    setUserProfile({ ...userProfile, location: e.target.value.toLowerCase() });
    // console.log(userProfile);
  };

  const locationCityInputHandler = (e, newValue) => {
    const value = newValue;
    setLocationFull({ ...locationFull, city: value });
    isLocationCityValid(value);
    setUserProfile({ ...userProfile, location: evaluateFullLocation() });
  };

  const locationStreetInputHandler = (e) => {
    const value = e.target.value;
    setLocationFull({ ...locationFull, street: value });
    isLocationStreetValid(value);
    setUserProfile({ ...userProfile, location: evaluateFullLocation() });
  };

  const phoneNumberInputHandler = (e) => {
    // kinda worked but replaced value takes up length for one time->doesnt work
    // const res = e.target.value.replace(/\D/g, '');
    // setPhoneNumberValue(res);
    isPhoneNumberValid(e.target.value);
    setUserProfile({ ...userProfile, phoneNumber: e.target.value });
    // console.log(userProfile);
  };

  const dateInputHandle = (date, e) => {
    if (!date) return;
    const minAge = Date.parse(new Date("January 1, 2004"));
    const pickedDate = Date.parse(date.format("YYYY-MM-DD"));
    setDateValue(date);
    if (pickedDate < minAge) {
      setUserProfile({ ...userProfile, dob: date.format("YYYY-MM-DD") });
      // console.log(userProfile);
      setIsMinAge(true);
      return;
    }
    setIsMinAge(false);
  };
  const selectBloodTypeHandler = (e) => {
    setUserProfile({ ...userProfile, bloodType: e.target.value });
    // console.log(userProfile);
  };
  const selectHmoHandler = (e) => {
    setUserProfile({ ...userProfile, hmo: e.target.value });
    // console.log(userProfile);
  };

  // ---------- end inputs handling

  // ---------start validations

  const isFirstNameValid = (str) => {
    if (!str) {
      setFirstNameErrMsg("First name should be more than 1 character");
      return SetFirstNameValid(false);
    }
    if (String(str).includes(" ")) {
      setFirstNameErrMsg("First name should not include spaces");
      return SetFirstNameValid(false);
    }
    if (!/^[a-zA-Z]+$/.test(str)) {
      setFirstNameErrMsg("First name should not include numbers and symbols");
      return SetFirstNameValid(false);
    }
    setFirstNameErrMsg("");
    return SetFirstNameValid(true);
  };

  const isLastNameValid = (str) => {
    if (!str) {
      setLastNameErrMsg("Last name should be more than 1 character");
      return SetLastNameValid(false);
    }
    // if (String(str).includes(' ')) {
    //   setLastNameErrMsg('Last name should not include spaces');
    //   return SetLastNameValid(false);
    // } some last names include spaces....
    if (!/^[a-zA-Z]+$/.test(str)) {
      setLastNameErrMsg(
        "Last name should not include numbers and symbols or spaces"
      );
      return SetLastNameValid(false);
    }
    setLastNameErrMsg("");
    return SetLastNameValid(true);
  };

  const isLocationValid = (str) => {
    if (!str || str.length < 2) {
      setLocationErrMsg("Location should be more than 1 character ");
      return setLocationValid(false);
    }
    if (/[^A-Za-z0-9]+/g.test(str)) {
      setLocationErrMsg("Location shouldn't include symbols");
      return setLocationValid(false);
    }
    setLocationErrMsg("");
    return setLocationValid(true);
  };

  const evaluateFullLocation = () =>
    [locationFull.street, locationFull.city, "Israel"].join(", ");

  const isLocationCityValid = (str) => {
    // console.log("isLocationCityValid", { str }, { locationFull });
    // a fixed list so can only be a string (or null if the user presses x), so no need to do a fancy check here
    const isValid = !!str;
    setLocationCityValid(isValid);
    setLocationCityErrMsg(
      isValid ? "" : "Street address should be more than 1 character long"
    );
  };

  const isLocationStreetValid = (str) => {
    // console.log("isLocationStreetValid", { str }, { locationFull });
    str = str.trim();
    if (!str || str.length < 2) {
      setLocationStreetErrMsg(
        /[^A-Za-z0-9 ]/g.test(str)
          ? "Location shouldn't include symbols"
          : "Street address should be more than 1 character "
      );
      setLocationStreetValid(false);
    } else {
      setLocationStreetErrMsg("");
      setLocationStreetValid(true);
    }
  };

  const isPhoneNumberValid = (str) => {
    if (!/^[0-9]*$/.test(str)) {
      setPhoneNumberErrMsg("digits only");
      return setPhoneNumberValid(false);
    }
    if (!str || str.length !== 9) {
      setPhoneNumberErrMsg("Phone number length should be 9 digits");
      return setPhoneNumberValid(false);
    }
    setPhoneNumberErrMsg("");
    setPhoneNumberValid(true);
  };
  // ---------end validations

  // ---------start firestore shenanigans

  // the whole user collection is not needed -michael

  // const usersCollectionRef = collection(db, "users");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     console.log(data);
  //     setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getUsers();
  // }, []);

  // user.uid came from authContext
  // useEffect(() => {
  //   console.log(user.uid);
  // }, []);

  const updateProfile = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { ...userProfile });
      // console.log(docRef);
    }
  };

  //our data to pass into firestore is in the form output
  // and that is - > userProfile
  // ---------end firestore shenanigans

  //---------todo---------
  // user location to update\work with map component

  return (
    <form className="profile-form">
      <TextField
        onChange={(e) => firstNameInputHandle(e)}
        label="First Name"
        helperText={firstNameErrMsg ? firstNameErrMsg : ""}
        error={!FirstNameValid}
      />
      <TextField
        onChange={(e) => lastNameInputHandle(e)}
        label="Last Name"
        helperText={lastNameErrMsg ? lastNameErrMsg : ""}
        error={!lastNameValid}
      />
      {/* <TextField
        onChange={(e) => locationInputHandler(e)}
        label='Location'
        helperText={locationErrMsg}
        error={!LocationValid}
      /> */}
      <Autocomplete
        options={cities}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            helperText={locationCityErrMsg ? locationCityErrMsg : ""}
            error={!locationCityValid}
          />
        )}
        onChange={(e, newValue) => locationCityInputHandler(e, newValue)}
      />
      <TextField
        onChange={(e) => locationStreetInputHandler(e)}
        label="Street address"
        helperText={locationStreetErrMsg}
        error={!locationStreetValid}
      />
      <TextField
        className="form__phone"
        onChange={(e) => phoneNumberInputHandler(e)}
        label="Phone number"
        // value={phoneNumberValue}
        helperText={phoneNumberErrMsg}
        error={!phoneNumberValid}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={userProfile.dob ? "I was born at" : "Date of birth"}
          inputFormat="MM/DD/YYYY"
          value={dateValue}
          onChange={(date) => dateInputHandle(date)}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          renderInput={(params) => (
            <TextField
              {...params}
              onFocus={(e) => {
                e.target.blur();
                return setOpen(true);
              }}
              error={!isMinAge}
              helperText={
                !isMinAge ? "Minimun Age Should Be 18 Years Old" : "dd/mm/yyyy"
              }
            />
          )}
        />
      </LocalizationProvider>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Blood Type</InputLabel>
        <Select
          value={userProfile.bloodType ? userProfile.bloodType : ""}
          label="Blood Type"
          error={!userProfile.bloodType}
          onChange={(e) => selectBloodTypeHandler(e)}
        >
          <MenuItem value={"A+"}>A+</MenuItem>
          <MenuItem value={"A-"}>A-</MenuItem>
          <MenuItem value={"B+"}>B+</MenuItem>
          <MenuItem value={"B-"}>B-</MenuItem>
          <MenuItem value={"AB+"}>AB+</MenuItem>
          <MenuItem value={"AB-"}>AB-</MenuItem>
          <MenuItem value={"O+"}>O+</MenuItem>
          <MenuItem value={"O-"}>O-</MenuItem>
        </Select>
        <FormHelperText> </FormHelperText>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Health Maintenance Organization</InputLabel>
        <Select
          value={userProfile.hmo ? userProfile.hmo : ""}
          label="Health Maintenance Organization"
          error={!userProfile.hmo}
          onChange={(e) => selectHmoHandler(e)}
        >
          <MenuItem value={"clalit"}>Clalit</MenuItem>
          <MenuItem value={"maccabi"}>Maccabi</MenuItem>
          <MenuItem value={"leumit"}>Leumit</MenuItem>
          <MenuItem value={"meuhedet"}>Meuhedet</MenuItem>
        </Select>
        <FormHelperText> </FormHelperText>
      </FormControl>

      <div className="edit__actions">
        <Button
          className="edit__button"
          variant="text"
          onClick={handleSubmit}
          disabled={
            !(
              userProfile.firstName &&
              userProfile.lastName &&
              userProfile.dob &&
              userProfile.bloodType &&
              !firstNameErrMsg &&
              !lastNameErrMsg &&
              isMinAge &&
              phoneNumberValid &&
              locationCityValid &&
              locationStreetValid
            )
          }
        >
          save
        </Button>
        <Button className="edit__button" variant="text" onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
