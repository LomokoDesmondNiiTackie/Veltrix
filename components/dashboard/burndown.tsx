"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

export default function BurndownOrProgress() {
  const burndownData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Ideal Burndown",
        data: [50, 42, 35, 28, 20, 12, 0],
        borderColor: "#94a3b8",
        borderDash: [6, 6],
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Actual Burndown",
        data: [50, 47, 43, 38, 33, 27, 16],
        borderColor: "#10b981",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#10b981",
        fill: true,
      },
    ],
  };

  const burndownOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Sprint Burndown Chart",
        font: { size: 20, weight: 700 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#111827cf" },
        title: {
          display: true,
          text: "Remaining Tasks",
          font: { size: 15, weight: "bold" as const },
        },
        grid: { display: false },
      },
      x: {
        title: {
          display: true,
          text: "Sprint Days",
          font: { size: 15, weight: "bold" as const },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full lg:w-3/5 mx-auto bg-white shadow-soft rounded-2xl p-4">
      <div className="relative h-[300px] sm:h-[400px] md:h-[280px] lg:h-[320px]">
        <Line data={burndownData} options={burndownOptions} />
      </div>
    </div>
  );
}
