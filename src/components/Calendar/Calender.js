import "./Calendar.css";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

// const getRandomNumber = (min, max) => {
//   return Math.round(Math.random() * (max - min) + min);
// };

export default function Calendar({ onCalenderSelect }) {
  const [value, setValue] = useState(dayjs(new Date()));
  //   const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const changeDateHandler = (newValue) => {
    onCalenderSelect(newValue.$d);
    setValue(newValue.$d);
  };

  //getting tomorrow's date
  const today = new Date();
  let tomorrow = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="portrait"
        minDate={dayjs(tomorrow.setDate(today.getDate() + 1))}
        openTo="day"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={changeDateHandler}
        renderInput={(params) => <TextField {...params} />}
        // renderDay={(day, _value, DayComponentProps) => {
        //   const isSelected =
        //     !DayComponentProps.outsideCurrentMonth &&
        //     highlightedDays.indexOf(day.date()) >= 0;

        //   return (
        //     <Badge
        //       key={day.toString()}
        //       overlap="circular"
        //       badgeContent={isSelected ? <DoneIcon /> : undefined}
        //     >
        //       <PickersDay {...DayComponentProps} />
        //     </Badge>
        //   );
        // }}
      />
    </LocalizationProvider>
  );
}