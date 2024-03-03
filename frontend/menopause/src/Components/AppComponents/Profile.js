import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";

const csrfTokenMatch = document.cookie.match(/csrftoken=(\w+)/);
const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;


const axiosInstance = axios.create({
  headers: {
    'X-CSRFToken': csrfToken,
  },
});

const userData = JSON.parse(sessionStorage.getItem('user'));


const options_boo = [
    {
      value: true,
      label: 'Si',
    },
    {
      value: false,
      label: 'No',
    },
    
];

export default function Profile(props) {
  const [formData, setFormData] = useState({
    birthdate: dayjs(),
    menopause: false,
    last_period: dayjs(),
    daily_reminders: false,
    current_treatments: "",
  });

  const [success, setSuccess] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = name === 'menopause' || name === 'daily_reminders' ? value === 'true' : value;

    setFormData({ ...formData, [name]: parsedValue });

  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log({props})
    const formattedBirthDate = dayjs(formData.birthdate).format("YYYY-MM-DD");
    const formattedLastPeriod = dayjs(formData.last_period).format("YYYY-MM-DD");

    try {
      // Send data to Django backend to create a new record in Profile model
      await axiosInstance.post("http://127.0.0.1:8000/api/profile/008bf635-659a-4671-b620-8a28a5d762c6", {
        user_id: props.user_id,
        ...formData,
        birthdate: formattedBirthDate,
        last_period:formattedLastPeriod,
      });

      console.log("Profile added successfully");
      setSuccess(true);
  
    } catch (error) {
      console.error("Error adding profile:", error);
      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "1rem",
      }}
    >
      <Typography variant="h2" gutterBottom>
        <FormattedMessage id="profile.title" defaultMessage="Let's get to know you a bit better" />
      </Typography>
      <Typography variant="h4" gutterBottom>
        <FormattedMessage id="profile.subtitle" defaultMessage="Please complete your profile" />
      </Typography>
      <Stack spacing={2} sx={{ width: "50%", textAlign: "center" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={<FormattedMessage id="profile.birthdate" defaultMessage="When is your birth date?" />}
                    value={formData.birthdate}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
            <TextField
                id="outlined-select-menopause"
                select label={<FormattedMessage id="add.menopause" defaultMessage="Are you menopausal?" />}
                value={formData.menopause}
                onChange={handleInputChange}
                required
            >
                {options_boo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={<FormattedMessage id="profile.last_period" defaultMessage="When was your last period?" />}
                    value={formData.last_period}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
            <TextField
                id="outlined-select-daily-reminders"
                select label={<FormattedMessage id="profile.daily_reminders" defaultMessage="Do you want us to send you daily reminders to log your symptoms?" />}
                value={formData.daily_reminders}
                onChange={handleInputChange}
                required
            >
                {options_boo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
              id="outlined-multiline-static"
              name="current_treatments"
              label={<FormattedMessage id="profile.treatments" defaultMessage="Are you currently following any treatment? If so, please list all of them" />}
              multiline
              rows={4}
              value={formData.current_treatments}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" variant="contained">
            <FormattedMessage id="profile.submit" defaultMessage="Save Profile" />
          </Button>
        </Box>
      </Stack>
      {success && (
            <div>
               <Alert severity="success">
                <FormattedMessage id="profile.alert" defaultMessage="Your profile was successfully recorded" />
               </Alert>
            </div>
       )}
    </Box>
  );
}
