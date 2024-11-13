'use client';
import { getSubscribersRows } from '@/actions/StatisticActions';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { IStatistic } from '@/types/database_interface';

// Define colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface PieChartData {
  name: string;
  value: number;
}

const PieChartComponent = () => {
  const [chartData, setChartData] = useState<PieChartData[]>([]);

  useEffect(() => {
    // Fetch and transform our data to plot
    const fetchData = async () => {
      try {
        // Get our subscriber rows from Supabase
        const res = await getSubscribersRows();

        if (res.success) {
          // Get the data if 200 OK
          const serverData: IStatistic[] = res.data;

          // Create a dictionary to count subscribers per month
          const monthCounts: Record<string, number> = {};

          // Aggregate data by month
          serverData.forEach((item) => {
            // Get the month name from created_at (format as 'Month')
            const month = new Date(item.created_at).toLocaleString('default', { month: 'long' });

            // Add the subscriber count to the corresponding month
            if (monthCounts[month]) {
              monthCounts[month] += item.count;
            } else {
              monthCounts[month] = item.count;
            }
          });

          // Convert the monthCounts object to an array for the pie chart
          const chartData = Object.entries(monthCounts).map(([name, value]) => ({
            name,
            value,
          }));

          setChartData(chartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Subscriber Distribution by Month</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
