import { useState } from "react";
import "./TimeInput.css";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimeInput({ onTimeSelect }) {
  const [value, setValue] = useState(dayjs().set("hour", 24).set("minute", 0));
  const [open, setOpen] = useState(false);

  const changeTimeHandler = (newValue) => {
    onTimeSelect(newValue.$d);
    setValue(newValue.$d);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          renderInput={(params) => (
            <TextField
              {...params}
              onFocus={(e) => {
                e.target.blur();
                setOpen(true);
              }}
            />
          )}
          value={value}
          label="Pick a time"
          onChange={changeTimeHandler}
          minTime={dayjs().set("hour", 8)}
          maxTime={dayjs().set("hour", 12)}
          minutesStep={10}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          //   shouldDisableTime={(timeValue, clockType) => {
          //     if (clockType === "minutes" && timeValue % 10) {
          //       return true;
          //     }

          //     return false;
          //   }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
