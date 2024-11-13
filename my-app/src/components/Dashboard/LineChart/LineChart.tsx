'use client';
import { getSubscribersRows } from '@/actions/StatisticActions';
import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { IStatistic } from '@/types/database_interface';

interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}

const LineChart = () => {
  const [chartData, setChartData] = useState<LineChartData | null>(null);
  

  useEffect(() => {

    //fetch and transform our data to plot
    const fetchData = async () => {
      try {

        //get our subscriber rows from supabase
        const res = await getSubscribersRows();

        if(res.success) {

          //get the data if 200 ok
          const serverData: IStatistic[] = res.data;

          //create array of labels where each created_at value is mapped to formatted date
          const labels: string[] = serverData.map((item) => {
            const date = new Date(item.created_at);
            return date.toLocaleDateString(); // Format date as desired
          });

          //create array of data, with being array of subscriber counts (y-axis)
          const data: number[] = serverData.map((item) => item.count);

          //create linechart object with our data parameters
          const chartData: LineChartData = {
            labels,
            datasets: [
              {
                label: 'Subscribers',
                data,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4
              },
            ],
          };

          setChartData(chartData);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    ////

    console.log('wwwww Chart Data:',  chartData);
    ///

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <Line data={chartData} options={{plugins:{title:{display:true,text:'Subscriber Leads Over Time'}}}} />
  );
};

export default LineChart;