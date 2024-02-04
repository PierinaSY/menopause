import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function BarChart2({ data }) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Mood by Date',
          },
        },
    };

    const labels = data.map((item) => item.date);

    const chartData = {
        labels,
        datasets: [
            {
              label: 'Mood',
              backgroundColor: 'rgba(235,239,191, 0.6)',
              borderColor: 'rgba(217,227,112,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(235,239,191,1)',
              hoverBorderColor: 'rgba(217,227,112,1)',
              data: data.map((item) => item.mood),
            },
        ],
      };

  return <Bar options={options} data={chartData} />;
}
export default BarChart2;
