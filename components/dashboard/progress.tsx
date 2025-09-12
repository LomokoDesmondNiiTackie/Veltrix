"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement,Tooltip,Legend,)

export default function Progress() {

  // Example data — replace with real sprint data
  const totalTasks = 50;
  const completedTasks = 34;
  const progressPct = Math.round((completedTasks / totalTasks) * 100);

  const progressData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ["#10b981", "#e5e7eb"],
        borderColor: '#f8fafc',
        borderWidth: 10,
        borderRadius: 10,
      },
    ],
  };

  const progressOptions = {
    cutout: "60%",
    radius: "100%",
    responsive: true,
    maintainAspectRatio: false,
    hover: { mode: undefined },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      title: {
        display: true,
        text: "Sprint Progress",
        font: { size: 18, weight: "bold" as const }, // 👈 fix
      },
    },
  };



  return (
    <div className="w-2/5 max-w-2xl p-6 bg-white shadow-lg rounded-xl hidden lg:block">
      <div className="h-full w-full p-4 bg-slate-50 rounded-lg">
          <div className="relative h-full w-full flex justify-center items-center">
            <Doughnut data={progressData} options={progressOptions} />
            <div className="absolute text-center">
              <p className="text-2xl font-bold text-slate-800">
                {progressPct}%
              </p>
              <p className="text-sm text-slate-500">Complete</p>
            </div>
          </div>
      </div>
    </div>
  );
}
