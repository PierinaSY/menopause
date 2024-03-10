import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MetricTable from '../AppComponents/MetricTable';
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

function Reports(){

    const [reportData, setReportData] = useState(null);

    const columm_name = ['id','date', 'file'];

    useEffect(() => {
        const getUserReport = async (userId) => {
        try {
            const reportResponse = await axios.get(`http://127.0.0.1:8000/api/user_reports/${userId}`);
            setReportData(reportResponse.data);

        } catch (error) {
            console.error("Error retrieving profile data:", error);
        }
        };

        getUserReport(userData.user_data.id);
    }, [userData.user_data.id]);
    
    return(
        <div className="view_profile">
            <ResponsiveAppNavbar />
            <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Box sx={{ bgcolor: '#FAF9F6', width: '100%', maxWidth: '1000px', p: 3, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
                <Avatar src="/broken-image.jpg" sx={{ width: 100, height: 100, margin: 'auto' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                {userData.user_data.first_name} {userData.user_data.last_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {userData.user_data.email}
                </Typography>
                <MetricTable id="reportstable" columns={columm_name} data={reportData}/>
            </Box>
            </Container>
            <AppFooter />
        </div>
    );
}

export default Reports;