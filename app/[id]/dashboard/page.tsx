import CalendarPage from "@/components/dashboard/calender";
import UpcomingDeadlines from "@/components/dashboard/deadLinesList";
import BurndownOrProgress from "@/components/dashboard/burndown";
import SummaryCard from "@/components/dashboard/summaryCard";
import { QueueListIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Progress from "@/components/dashboard/progress";
import RecentActivity from "@/components/dashboard/recentActivity";
import PinnedBoards from "@/components/dashboard/pinnedBoard";

export default function DashboardHomePage() {
  return (
    <section className="w-full h-screen flex flex-col lg:grid grid-cols-5 grid-rows-6 auto-rows-fr p-2 lg:p-8 gap-4 overflow-y-auto lg:overflow-hidden ">
      <div className="summaryCard col-span-5 lg:col-span-4 row-start-1 row-end-2 grid grid-cols-3 gap-5 h-full">
        <SummaryCard title="Total Task" value="90" icon={QueueListIcon} iconColor="text-brand-teal" textColor="text-[#0f766d]" backgroundColor="bg-[#f0fdfc]" borderColor="border-[#2dd4c5]" />
        <SummaryCard title="Completed" value="75" icon={CheckBadgeIcon} iconColor="text-success" textColor="text-[#15803c]" backgroundColor="bg-[#f0fdf5]" borderColor="border-[#4ade80]" />
        <SummaryCard title="Overdue" value="5" icon={ExclamationTriangleIcon} iconColor="text-danger" textColor="text-[#b91c1c]" backgroundColor="bg-[#fef2f2]" borderColor="border-[#f87171]" />
      </div>
      <div className="activityFeed col-span-3 lg:col-span-4 row-start-2 row-end-7 h-full w-87 md:w-full flex flex-col gap-2">
        <UpcomingDeadlines todos={[
          {
            id: '1',
            title: 'Finish project report',
            description: 'Complete the final report for the XYZ project.',
            date: '2025-12-11',
            priority: 'high',
            completed: false,
            status: 'inprogress',
          },
          {
            id: '2',
            title: 'Team meeting',
            description: 'Discuss project milestones and next steps.',
            date: '2025-11-12',
            priority: 'medium',
            completed: false,
            status: 'done',
          },
          {
            id: '3',
            title: 'Code review',
            description: 'Review code for the new feature implementation.',
            date: '2025-12-11',
            priority: 'low',
            completed: false,
            status: 'todo',
          },
          {
            id: '4',
            title: 'Code review',
            description: 'Review code for the new feature implementation.',
            date: '2025-12-11',
            priority: 'low',
            completed: false,
            status: 'todo',
          },
          {
            id: '5',
            title: 'Code review',
            description: 'Review code for the new feature implementation.',
            date: '2025-12-11',
            priority: 'low',
            completed: false,
            status: 'todo',
          }
          ]} /> 
          <div className="health min-h-1/2 w-87 md:w-full flex flex-col lg:flex-row gap-2 overflow-y-auto lg:overflow-hidden">
            <BurndownOrProgress />
            <Progress/>
          </div>
      </div>
      <div className="timeLine col-span-2 row-start-2 lg:row-start-1 row-end-4 lg:row-end-3 hidden lg:block">
        <CalendarPage />
      </div>
      <div className="timeLine col-span-2 lg:col-span-1 row-start-4 lg:row-start-3 row-end-7 lg:row-end-7 h-full w-87 md:w-full flex flex-col flex-1 gap-2">
        <div className="pinnedBoards h-3/5 w-full flex flex-col">
          <PinnedBoards />
        </div>
        <div className="recentActivities h-2/5 w-full flex flex-col">
          <RecentActivity />
        </div>
      </div>
    </section>
  );
}
