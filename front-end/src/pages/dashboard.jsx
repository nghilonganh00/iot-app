import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Droplet, Sun, Thermometer } from "lucide-react";

import LightRemoteBox from "../components/lightRemoteBox";
import FanRemoteBox from "../components/fanRemoteBox";
import AirConditionerRemoteBox from "../components/airConditionerRemoteBox";
import FilterTimeDropdown from "../components/filterDropdown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [datasensors, setDataSensors] = useState({
    temperature: 36,
    light: 800,
    humidity: 20,
  });

  const data = {
    labels: ["10:00:01", "10:00:02", "10:00:03", "10:00:04", "10:00:05"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [24, 26, 22, 23, 25],
        borderColor: "rgb(255, 69, 58)",
        backgroundColor: "rgba(255, 69, 58, 0.2)",
        yAxisID: "y-axis-1",
      },
      {
        label: "Light (lux)",
        data: [450, 480, 430, 440, 460],
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.2)",
        yAxisID: "y-axis-2",
      },
      {
        label: "Humidity (%)",
        data: [60, 55, 65, 62, 58],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Environmental Data Over Time",
      },
    },
    scales: {
      "y-axis-1": {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Temperature (°C) / Humidity (%)",
        },
      },
      "y-axis-2": {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Light (lux)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const interpolateColor = (value, min, max, colorStart, colorEnd) => {
    const ratio = (value - min) / (max - min);
    const r1 = parseInt(colorStart.slice(1, 3), 16);
    const g1 = parseInt(colorStart.slice(3, 5), 16);
    const b1 = parseInt(colorStart.slice(5, 7), 16);
    const r2 = parseInt(colorEnd.slice(1, 3), 16);
    const g2 = parseInt(colorEnd.slice(3, 5), 16);
    const b2 = parseInt(colorEnd.slice(5, 7), 16);

    const r = Math.round(r1 + ratio * (r2 - r1));
    const g = Math.round(g1 + ratio * (g2 - g1));
    const b = Math.round(b1 + ratio * (b2 - b1));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const getBackgroundColor = (value, type) => {
    if (type === "temperature") {
      return interpolateColor(value, 0, 50, "#FFB6B6", "#FF6F6F"); // From light red to dark red
    } else if (type === "light") {
      return interpolateColor(value, 0, 1000, "#d3d3d3", "#f8c20a"); // From light gray to yellow
    } else if (type === "humidity") {
      return interpolateColor(value, 0, 100, "#a2c2eb", "#36A2EB"); // From light blue to dark blue
    }
    return "#e0e0e0"; // Default color
  };

  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div
            className="bg-[#FF6F6F] h-32 rounded-xl shadow-sm flex items-center justify-between px-4"
            style={{
              background: getBackgroundColor(
                datasensors.temperature,
                "temperature"
              ),
            }}
          >
            <div className="pb-7">
              <div className="text-lg mb-1 font-medium text-white">
                Temperature
              </div>
              <div className="px-2 text-5xl font-bold text-white flex items-start">
                <span className="text-5xl">{datasensors.temperature}</span>
                <span className="text-3xl">°C</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl">
              <Thermometer className="text-[#FF6F6F] size-7" />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div
            className="bg-[#f8c20a] h-32 rounded-xl shadow-sm flex items-center justify-between px-4"
            style={{
              backgroundColor: getBackgroundColor(datasensors.light, "light"),
            }}
          >
            <div className="pb-7">
              <div className="text-lg mb-1 font-medium text-white">Light</div>
              <div className="px-2 text-5xl font-bold text-white flex items-start">
                <span className="text-5xl">{datasensors.light}</span>
                <span className="text-2xl ml-1">lux</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl">
              <Sun className="text-[#f8c20a] size-7" />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div
            className="bg-[#36A2EB] h-32 rounded-xl shadow-sm flex items-center justify-between px-4"
            style={{
              backgroundColor: getBackgroundColor(
                datasensors.humidity,
                "humidity"
              ),
            }}
          >
            <div className="pb-7">
              <div className="text-lg mb-1 font-medium text-white">
                Humidity
              </div>
              <div className="px-2 text-5xl font-bold text-white flex items-start">
                <span className="text-5xl">{datasensors.humidity}</span>
                <span className="text-2xl ml-1">%</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl">
              <Droplet className="text-[#36A2EB] size-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-5 mt-4">
        <div className="flex-1 bg-white h-[480px] rounded-xl shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div className="mb-4 font-semibold text-lg text-gray-800">
              Environment Data
            </div>
          </div>

          <Line data={data} options={options} />
        </div>
        <div className="w-64 space-y-4">
          <AirConditionerRemoteBox />
          <FanRemoteBox />
          <LightRemoteBox />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
