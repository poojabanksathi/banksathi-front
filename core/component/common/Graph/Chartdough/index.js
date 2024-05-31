import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Principal Amount', 'Interest Amount',],
  datasets: [
    {
      label: '# of Votes',
      data: [19, 5],
      backgroundColor: [
        '#A882DD',
        '#844FCF',
      ],

      borderWidth: 0,
    },
  ],
};

export default function Chartdough() {
  return <Doughnut data={data} />;
}
