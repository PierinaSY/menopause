import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';  
import MetricTable from './MetricTable.js';
import BarChart from './MetricBar.js';
import DoughnutChart from './MetricDonut.js';

import { useState, useEffect } from "react";
import axios from "axios";

const csrfTokenMatch = document.cookie.match(/csrftoken=(\w+)/);
const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

const axiosConfig = {
  headers: {
    'X-CSRFToken': csrfToken,
  },
};

export default function Metrics(props) {

  const [tableData, setTableData] = useState({});
  const [barData, setBarData] = useState([]);
  const [donutData, setDonutData] = useState([]);

  const columm_name = ['date', 'symptom_id__name', 'duration', 'notes'];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recorded_symptoms/', {
          params: { user_id: props.userData.user_data.id },
        }, axiosConfig);

        const barResponse = await axios.get('http://127.0.0.1:8000/api/count_symptoms_date/', {
           params: { user_id: props.userData.user_data.id },
        }, axiosConfig);

        const donutResponse = await axios.get('http://127.0.0.1:8000/api/count_symptoms/', {
           params: { user_id: props.userData.user_data.id },
        }, axiosConfig);
        
        setBarData(barResponse.data);
        setTableData(response.data);
        setDonutData(donutResponse.data);
        console.log('This is the data', response.data);
        console.log('This is the data', barResponse.data);
        console.log('This is the data', donutResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.userData.user_data.id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Change from height to minHeight
        gap: '1rem',
        padding: '20px', // Add padding to create space around the content
      }}
    >
      <Typography variant="h4" gutterBottom>
        Let's see some reports
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <BarChart data={barData} />
            <BarChart data={barData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DoughnutChart data={donutData} />
          </Grid>
        </Grid>
        <Grid item xs={12} justifyContent="center" container spacing={2} marginTop={4}>
          <Typography variant='h6'>Review all the symptoms you have registered</Typography>
          <MetricTable columns={columm_name} data={tableData}/>
        </Grid>
      </Grid>
    </Box>
  );
}