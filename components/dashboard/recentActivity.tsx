export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "Alice Johnson",
      action: "completed task",
      task: "Design landing page",
      time: "2h ago",
    },
    {
      id: 2,
      user: "Michael Lee",
      action: "commented on",
      task: "API integration",
      time: "5h ago",
    },
    {
      id: 3,
      user: "Sophia Davis",
      action: "created task",
      task: "Update documentation",
      time: "1d ago",
    },
  ];

  return (
    <div className="recentActivities h-full w-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-soft overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800 tracking-tight">
          Recent Activities
        </h2>
        
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <ul className="space-y-4">
          {activities.map((a) => (
            <li key={a.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                {a.user.charAt(0) }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{a.user}</span> {a.action}{" "}
                  <span className="font-medium text-gray-900">{a.task}</span>
                </p>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
