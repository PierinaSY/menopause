import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MetricTable from './MetricTable.js';

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

  const columm_name = ['id', 'duration', 'date', 'notes', 'symptom_id__id', 'symptom_id__name'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recorded_symptoms/', {
          params: { user_id: props.userData.user_data.id },
        }, axiosConfig);
        
        setTableData(response.data);
        console.log('This is the data', response.data);
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
        height: '100vh',
        gap: '1rem',
      }}
    >
        <Typography variant="h4" gutterBottom>
          Lets see some reports
        </Typography>
        <Stack spacing={2} sx={{ width: '100%', textAlign: 'center' }}>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' },}}
          noValidate autoComplete="off">
          </Box>
          <MetricTable columns = {columm_name} data={tableData} />             
          </Stack>
      </Box>
      );
}

    