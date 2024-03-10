import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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


export default function Base(props) {
  const [symptoms, setSymptoms] = useState([]);
  const [severity, setSeverity] = useState([]);
  const [formData, setFormData] = useState({
    symptom_id: "",
    severity: "",
    starting_date: dayjs(),
  });

  const [success, setSuccess] = useState(false);

  const userId = props.user_id

  const getUserProfileId = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get_profile_id/${userId}`);
      console.log(response.data.profile_id)
      return response.data.profile_id;
    } catch (error) {
      console.error('Error retrieving profile ID:', error);
      throw error;
    }
  };


  useEffect(() => {
    // Fetch symptoms and severity levels from Django backend using Axios
    const fetchData = async () => {
      try {
        const [symptomsResponse, severityResponse] = await Promise.all([
          axiosInstance.get("http://127.0.0.1:8000/api/get_symptoms/"),
          axiosInstance.get("http://127.0.0.1:8000/api/get_severity_levels/"),
        ]);

        setSymptoms(symptomsResponse.data);
        setSeverity(severityResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log({props})
    const formattedStartingDate = dayjs(formData.starting_date).format("YYYY-MM-DD");


    try {
      const profileId = await getUserProfileId(userId);
      // Send data to Django backend to create a new record in Track_Symptom model
      await axiosInstance.post("http://127.0.0.1:8000/api/base_symptoms/7", {
        profile_id: profileId,
        ...formData,
        starting_date: formattedStartingDate,
      });

      console.log("Base Symptom added successfully");

      setSuccess(true);

      // Reset the form
      setFormData({
        symptom_id: "",
        severity: "",
        starting_date: dayjs(),
      });
    } catch (error) {
      console.error("Error adding base symptom:", error);
      setSuccess(false);

    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        alignItems: "center",
        height: "100vh",
        gap: "1rem",
        paddingLeft: "2rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        <FormattedMessage id="base.title" defaultMessage="Now, let's record your more common symptoms" />
      </Typography>
      <Typography variant="p" gutterBottom>
        <FormattedMessage id="base.subtitle" 
        defaultMessage=
        "The goal of the Menopause app is to let you track your symptoms on a daily basis. However, we are aware that your symptoms most likely didn't start today, so we suggest your record your most common symptoms up until this point to have a base as a reference" />
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
            <TextField
              id="outlined-select-symptom-native"
              name="symptom_id"
              select
              label={<FormattedMessage id="base.symptom" defaultMessage="Choose a symptom" />}
              SelectProps={{
                native: true,
              }}
              value={formData.symptom_id}
              onChange={handleInputChange}
              required
            >
              {symptoms.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
            <TextField
              id="outlined-select-severity-native"
              name="severity"
              select
              label={<FormattedMessage id="base.severity" defaultMessage="How bad is it?" />}
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              value={formData.severity}
              onChange={handleInputChange}
            >
              {severity.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[1]}
                </option>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={<FormattedMessage id="base.date" defaultMessage="When did it started?" />}
                value={formData.starting_date}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </div>
          <Button type="submit" variant="contained">
            <FormattedMessage id="base.submit" defaultMessage="Add Base Symptom" />
          </Button>
        </Box>
      </Stack>
      {success && (
            <div>
               <Alert severity="success">
                <FormattedMessage id="base.alert" defaultMessage="Your base symptom was successfully recorded" />
               </Alert>
            </div>
       )}
    </Box>
  );
}
