import * as React from "react";
import { FormattedMessage } from "react-intl";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );

      if (response.status === 201) {
        // Successful signup, handle accordingly
        console.log("User created successfully!");
        // // Log in the user after signup
        const loginResponse = await axios.post(
          "http://127.0.0.1:8000/api/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (loginResponse.status === 200) {
          // Successful login
          console.log("User logged in successfully!", loginResponse.data);
          const userData = formData.data;
          sessionStorage.setItem('user', JSON.stringify(userData));
          // Redirect to '/meno' and pass form data
          navigate("/meno");
        } else {
          // Handle login failure
          console.error("Failed to log in after signup");
        }
      } else {
        // Handle other response status codes or errors
        console.error("Failed to create user");
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "90vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random?women)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                marginTop: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AppRegistrationIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                <FormattedMessage id="signup.title" defaultMessage="Sign up" />
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="first_name"
                      label={<FormattedMessage id="signup.firstName" defaultMessage="First Name" />}
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="last_name"
                      label={<FormattedMessage id="signup.lastName" defaultMessage="Last Name" />}
                      name="last_name"
                      autoComplete="family-name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label={<FormattedMessage id="signup.email" defaultMessage="Email" />}
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label={<FormattedMessage id="signup.password" defaultMessage="Password" />}
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label={<FormattedMessage
                          id="signup.checkboxLabel"
                          defaultMessage="I want to receive inspiration, marketing promotions and updates via email."
                        />
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <FormattedMessage id="signup.signupButton" defaultMessage="Sign Up" />
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      {<FormattedMessage id="signup.signin" defaultMessage="Already have an account? Sign in" />}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Footer />
    </div>
  );
};

export default Signup;
