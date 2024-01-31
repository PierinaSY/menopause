import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";


const userData = JSON.parse(sessionStorage.getItem('user'));


export default function Add(props) {
  const [symptoms, setSymptoms] = useState([]);
  const [severity, setSeverity] = useState([]);
  const [mood, setMood] = useState([]);
  const [formData, setFormData] = useState({
    symptom_id: "",
    severity: "",
    mood: "",
    duration: "",
    date: dayjs(),
    notes: "",
  });

  useEffect(() => {
    // Fetch symptoms, severity levels, and mood levels from Django backend using Axios
    const fetchData = async () => {
      try {
        const [symptomsResponse, severityResponse, moodResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/get_symptoms/"),
          axios.get("http://127.0.0.1:8000/api/get_severity_levels/"),
          axios.get("http://127.0.0.1:8000/api/get_mood_levels/"),
        ]);

        setSymptoms(symptomsResponse.data);
        setSeverity(severityResponse.data);
        setMood(moodResponse.data);
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
    const formattedDate = dayjs(formData.date).format("YYYY-MM-DD");


    try {
      // Send data to Django backend to create a new record in Track_Symptom model
      await axios.post("http://127.0.0.1:8000/api/track_symptom/d48b9a8d-6902-47af-88f7-7562eab0a3fb", {
        user_id: props.user_id,
        ...formData,
        date: formattedDate,
      });

      // Optionally, you can reset the form or perform other actions upon success
      console.log("Symptom added successfully");
      // Reset the form
      setFormData({
        symptom_id: "",
        severity: "",
        mood: "",
        duration: "",
        date: dayjs(),
        notes: "",
      });
    } catch (error) {
      console.error("Error adding symptom:", error);
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
        Track your symptoms
      </Typography>
      <Typography variant="h4" gutterBottom>
        What are you feeling today?
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
              label="Choose a symptom"
              SelectProps={{
                native: true,
              }}
              value={formData.symptom_id}
              onChange={handleInputChange}
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
              label="How bad is it?"
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
            <TextField
              id="outlined-select-mood-native"
              name="mood"
              select
              label="How are you feeling because of it?"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              value={formData.mood}
              onChange={handleInputChange}
            >
              {mood.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[1]}
                </option>
              ))}
            </TextField>
            <TextField
              id="outlined-number"
              name="duration"
              label="How long does this symptom last?"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.duration}
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Just to make sure, choose when did you feel this"
                value={formData.date}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-multiline-static"
              name="notes"
              label="Any notes you want to add?"
              multiline
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" variant="contained">
            Add Symptom
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
