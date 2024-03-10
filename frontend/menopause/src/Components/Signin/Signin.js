import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";


axios.defaults.xsrfCookieName = 'csrftoken'; 
axios.defaults.xsrfHeaderName = 'X-Csrftoken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Signin = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/api/login", {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "es-Sp", 
          "X-CSRFToken": axios.defaults.xsrfCookieName,
        },
      }
      );
      

      if (response.status === 200) {
        // Successfully logged in
        setCurrentUser(true);
        handleNavigation(formData.email);
        console.log("User logged in successfully!", response.data);
        const userData = response.data;
        sessionStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Handle login failure
        console.error("Failed to log in");
        return false;
      }
    } catch (error) {
      // Handle network error or other issues
      console.error("Error logging in:", error);
      return false;
    }
  };

  const handleNavigation = (email) => {
    navigate('/meno', { state: { email } });
  };

  return (
    <div>
      <Navbar />
        <Grid container component="main" sx={{ height: "90vh" }}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7}
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
          <Grid item xs={12} sm={8} md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 20,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOpenOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                <FormattedMessage id="signin.title" defaultMessage="Sign in" /> 
              </Typography>
              <Box component="form" noValidate onSubmit={submitLogin} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={<FormattedMessage id="signin.email" defaultMessage="Email" />}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={<FormattedMessage id="signin.password" defaultMessage="Password" />}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={<FormattedMessage id="signin.remember" defaultMessage="Remember me" />}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <FormattedMessage id="signin.button" defaultMessage="Sign in" />
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2"> <FormattedMessage id="signin.reset" defaultMessage="Forgot password?" /></Link>
                  </Grid>
                </Grid>
            </Box>
        </Box>
        </Grid>
        </Grid>
      <Footer />
    </div>
  );
};

export default Signin;
