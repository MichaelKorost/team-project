import React, { useContext, useEffect, useState } from "react";
import "./profileForm.css";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormHelperText, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {
  collection,
  db,
  doc,
  getDocs,
  updateDoc,
} from "../../firebase/firebaseConfig";
import { AuthContext } from "../../AuthContext";

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
  // const [user, setUser] = useState({}); //removed
  //  ----------date states
  const [isMinAge, setIsMinAge] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);

  const { user } = useContext(AuthContext);

  // ----------end states

  // ----------start form and inputs handling
  const handleSubmit = (e) => {
    console.log(userProfile);
    updateProfile();
    cancelHandler();
    // no need to clear after submitting,
    //showing the current profile
  };

  const cancelHandler = () => {
    onCloseModal();
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

  const phoneNumberInputHandler = (e) => {
    setUserProfile({ ...userProfile, phoneNumber: e.target.value });
    console.log(userProfile);
  };
  const dateInputHandle = (date, e) => {
    if (!date) return;
    const minAge = Date.parse(new Date("January 1, 2004"));
    const pickedDate = Date.parse(date.format("YYYY-MM-DD"));
    setDateValue(date);
    if (pickedDate < minAge) {
      setUserProfile({ ...userProfile, dob: date.format("YYYY-MM-DD") });
      console.log(userProfile);
      setIsMinAge(true);
      return;
    }
    setIsMinAge(false);
  };
  const selectInputHandle = (e) => {
    setUserProfile({ ...userProfile, bloodType: e.target.value });
    console.log(userProfile);
  };
  const selectHmoHandler = (e) => {
    setUserProfile({ ...userProfile, hmo: e.target.value });
    console.log(userProfile);
  };

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
    if (String(str).includes(" ")) {
      setLastNameErrMsg("Last name should not include spaces");
      return SetLastNameValid(false);
    }
    if (!/^[a-zA-Z]+$/.test(str)) {
      setLastNameErrMsg(
        "Last name should not include numbers and symbols or spaces"
      );
      return SetLastNameValid(false);
    }
    setLastNameErrMsg("");
    return SetLastNameValid(true);
  };

  // ----------end form and inputs handling

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
  useEffect(() => {
    console.log(user.uid);
  }, []);

  const updateProfile = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { ...userProfile });
      console.log(docRef);
    }
  };

  //our data to pass into firestore is in the form output
  // and that is - > userProfile
  // ---------end firestore shenanigans

  //---------todo---------
  //1. checking it with firestore ----> works.  also works with updating specific inputs!
  // style, look on the web or do it with michael
  // having it update the profile of the current user and not just the first doc in firestore...
  // taking everything into a modal which opens with the form

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
      <TextField
        className="form__phone"
        type={"number"}
        onChange={(e) => phoneNumberInputHandler(e)}
        label="Phone number"
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
      {/* <input type='date' min={'2004-01-01'} /> */}
      {/* the select is at diff height because the others have
       helper texet tried adding to it also
        using formControl but it didn't help */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Blood Type</InputLabel>
        <Select
          value={userProfile.bloodType ? userProfile.bloodType : ""}
          label="Blood Type"
          error={!userProfile.bloodType}
          onChange={(e) => selectInputHandle(e)}
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
              isMinAge
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
