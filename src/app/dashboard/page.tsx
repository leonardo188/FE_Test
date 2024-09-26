"use client"

import { mdiCalendar } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  }

  const dataLalin = {
    labels: ['BCA', 'BRI', 'BNI', 'DKI', 'Nobu', 'Mandiri', 'Mega', 'Flo'],
    datasets: [
      {
        label: 'Jumlah Lalin',
        data: [25, 20, 50, 100, 30, 78, 44, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataLalin2 = {
    labels: ['Gerbang 1', 'Gerbang 2', 'Gerbang 3', 'Gerbang 4', 'Gerbang 5'],
    datasets: [
      {
        label: 'Jumlah Lalin2',
        data: [26, 50, 40, 75, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const data = {
    labels: ['Shift 1', 'Shift 2', 'Shift 3'],
    datasets: [
      {
        label: 'Total Lalin',
        data: [300, 100, 150],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="flex p-4 bg-gray-200 min-h-full">
      <div className="flex flex-col bg-white text-black w-full p-4">
        <div className="font-bold">Dashboard</div>

        <div className="flex flex-row mt-4 items-center">
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 pl-10 pr-10" // Add padding for the icon
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Icon path={mdiCalendar} size={1} color="gray" />
            </div>
          </div>
          <button type="submit" 
            className={`ml-4 text-white font-bold p-2 rounded bg-gray-800 hover:bg-gray-700 transition duration-200`}>
              Filter
          </button>
        </div>

        <div className="flex flex-row justify-between items-center mt-4">
          <div className="w-1/2">
            <Bar data={dataLalin} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Jumlah Lalin' } } }} />
          </div>
          <div className="w-1/3">
            <Doughnut data={data} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Total Lalin' } } }} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mt-4">
          <div className="w-1/2">
            <Bar data={dataLalin2} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Jumlah Lalin 2' } } }} />
          </div>
          <div className="w-1/3">
            <Doughnut data={data} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Total Lalin 2' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}
