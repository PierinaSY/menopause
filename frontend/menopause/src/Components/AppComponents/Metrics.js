import * as React from 'react';
import { FormattedMessage } from "react-intl";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';  
import MetricTable from './MetricTable.js';
import BarChart from './MetricBar.js';
import DoughnutChart from './MetricDonut.js';
import BarChart2 from './MetricBar2.js';

import { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';


import jsPDF from 'jspdf';

const csrfTokenMatch = document.cookie.match(/csrftoken=(\w+)/);
const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

const axiosInstance = axios.create({
  headers: {
    'X-CSRFToken': csrfToken,
  },
});

export default function Metrics(props) {

  const [tableData, setTableData] = useState({});
  const [barData, setBarData] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [bar2Data, setBar2Data] = useState([]);

  const columm_name = ['date', 'symptom_id__name', 'duration', 'notes'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recorded_symptoms/', {
          params: { user_id: props.userData.user_data.id },
        }, axiosInstance);

        const barResponse = await axios.get('http://127.0.0.1:8000/api/count_symptoms_date/', {
           params: { user_id: props.userData.user_data.id },
        }, axiosInstance);

        const donutResponse = await axios.get('http://127.0.0.1:8000/api/count_symptoms/', {
           params: { user_id: props.userData.user_data.id },
        }, axiosInstance);

        const bar2Response = await axios.get('http://127.0.0.1:8000/api/mood_date/', {
           params: { user_id: props.userData.user_data.id },
        }, axiosInstance);
        
        setBarData(barResponse.data);
        setTableData(response.data);
        setDonutData(donutResponse.data);
        setBar2Data(bar2Response.data);

        console.log('This is the data', response.data);
        console.log('This is the data', barResponse.data);
        console.log('This is the data', donutResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.userData.user_data.id]);

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();

    const today = new Date();
    const month = today.getMonth() + 1
    const formattedDate = today.getDate() + "-" + month + "-" + today.getFullYear();

    const formatDate = today.toISOString().split('T')[0]; // YYYY-MM-DD


    const file_title = "Reporte de Síntomas" + " - " + today
    const file_subtitle = props.userData.user_data.first_name + " " + props.userData.user_data.last_name;
    const file_footer = "Este reporte ha sido generado por Menopause App " + today.getFullYear();

    const file_name = 
    "symptoms_report_" + props.userData.user_data.first_name + "_" + formattedDate + ".pdf";

    // Add content to the PDF
    pdf.setFont("helvetica");
    pdf.setFontSize(12);
    pdf.text(file_title, 20, 10);
    pdf.text(file_subtitle, 20, 20);

    // Capture image using html2canvas
    const componentContainer = document.getElementById('metricsContainer');
    const canvas = await html2canvas(componentContainer);
    const imgData = canvas.toDataURL('image/png');

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 20, 30, 160, 130); 

    pdf.setFontSize(8);
    pdf.text(file_footer, 20, 280);

    // Save the PDF
    pdf.save(file_name);

    // Save the PDF in a variable
    const pdfBlob = pdf.output('blob');

    const formData = new FormData();
    formData.append('file', pdfBlob, file_name);
    formData.append('user_id', props.userData.user_data.id);
    formData.append('date',formatDate);
    

    // Send the PDF file and user_id to the backend
    try {
      await axiosInstance.post('http://127.0.0.1:8000/api/report/830582d9-bfb5-495f-8bc4-9999993593a1', formData);

      console.log('Report added successfully');

    } catch (error) {

      console.error('Error adding report:', error);
    }

  };


  return (
    <Box
      id="metricsContainer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        gap: '1rem',
        padding: '20px', 
      }}
    >
      <Typography variant="h4" gutterBottom>
        <FormattedMessage id="metrics.welcome" defaultMessage="Let's see some reports" />
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <BarChart data={barData} />
            <BarChart2 data={bar2Data} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DoughnutChart data={donutData} />
          </Grid>
        </Grid>
        <Grid item xs={12} justifyContent="center" container spacing={2} marginTop={4}>
          <Typography variant='h6'>
            <FormattedMessage id="metrics.table" defaultMessage="Review all the symptoms you have registered" />
          </Typography>
          <MetricTable id="symptomtable" columns={columm_name} data={tableData}/>
        </Grid>
        
      </Grid>
      <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
        <FormattedMessage id="metrics.export" defaultMessage="Export to PDF" />
      </Button>
    </Box>
  );
}