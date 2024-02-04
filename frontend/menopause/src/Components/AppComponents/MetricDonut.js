import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate random rgba color
const getRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.5)`;
};

export function DoughnutChart({ data }) {

    const labels = data.map((item) => item.symptom_id__name);

    const autoColors = labels.map(() => getRandomColor());

    const donutData = {
        labels,
        datasets: [
            {
              label: 'Symptom Count',
              backgroundColor: autoColors,
              borderColor: autoColors,
              borderWidth: 1,
              data: data.map((item) => item.symptom_count),
            },
        ],
      };

  return <Doughnut data={donutData} />;
}

export default DoughnutChart;
