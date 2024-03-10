import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";


const userData = JSON.parse(sessionStorage.getItem('user'));


const csrfTokenMatch = document.cookie.match(/csrftoken=(\w+)/);
const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

const axiosConfig = {
  headers: {
    'X-CSRFToken': csrfToken,
  },
};

function ViewProfile(){

    const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getUserProfile = async (userId) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_profile_id/${userId}`);
        const profileId = response.data.profile_id;
        console.log(response.data.profile_id)

        // Fetch the complete profile object using the retrieved profile_id
        const profileResponse = await axios.get(`http://127.0.0.1:8000/api/profile/${profileId}`);
        setProfileData(profileResponse.data);
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      }
    };

    getUserProfile(userData.user_data.id);
  }, [userData.user_data.id]);
   
    return(
        <div className="view_profile">
            <ResponsiveAppNavbar />
            <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Box sx={{ bgcolor: '#FAF9F6', width: '100%', maxWidth: '400px', p: 3, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
                <Avatar src="/broken-image.jpg" sx={{ width: 100, height: 100, margin: 'auto' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                {userData.user_data.first_name} {userData.user_data.last_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {userData.user_data.email}
                </Typography>
                <Typography variant="body">
                {userData.user_data.date_joined}
                </Typography>
                <Typography variant="body2">
                Fecha de Nacimiento: {profileData && profileData.birthdate}
                </Typography>
                <Typography variant="body2">
                Fecha de último período menstrual: {profileData && profileData.last_period}
                </Typography>
                <Typography variant="body2">
                Menopausia: {profileData && profileData.menopause}
                </Typography>
                <Typography variant="body2">
                Tratamientos actuales: {profileData && profileData.current_treatments}
                </Typography>
            </Box>
            </Container>
            <AppFooter />
        </div>
    );
}

export default ViewProfile;