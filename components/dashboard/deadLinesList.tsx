"use client";
import { useMemo } from "react";

type Priority = "high" | "medium" | "low";
type Status = "todo" | "inprogress" | "done";

type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  date: string; // Date.prototype.toDateString()
  status: Status;
};

type Props = {
  readonly todos: Todo[];
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "#ef4444"; // red
    case "medium":
      return "#f59e0b"; // amber
    case "low":
      return "#10b981"; // green
    default:
      return "#6b7280";
  }
};

export default function UpcomingDeadlines({ todos }: Props) {

  // sort by soonest deadline
  const upcoming = useMemo(() => {
    const today = new Date();
    return todos
      .filter((t) => !t.completed)
      .map((t) => ({
        ...t,
        due: new Date(t.date),
      }))
      .filter((t) => t.due >= today)
      .sort((a, b) => a.due.getTime() - b.due.getTime())
      .slice(0, 6);
  }, [todos]);


  

  return (
    <div className="w-full min-h-1/2 rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden  ">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
        <h2 className="text-lg font-bold text-neutral-dark/80 tracking-tight">
          Upcoming Deadlines
        </h2>
        <span className="text-xs text-gray-500 font-medium">
          {upcoming.length} items
        </span>
      </div>

      {upcoming.length === 0 ? (
        <div className="px-6 py-10 text-center text-gray-400 text-sm">
          🎉 No upcoming deadlines
        </div>
      ) : (
        <div className=" max-h-70 overflow-y-auto px-4 py-2">
          <ul className=" divide-y divide-gray-100 flex-1 overflow-y-auto">
            {upcoming.map((t) => (
              <li
                key={t.id}
                className="h-24 flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Priority dot */}
                <div
                  className="w-5 h-full bg-amber-800 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: getPriorityColor(t.priority) }}
                />

                {/* Task info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-gray truncate">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="text-xs text-gray-500 truncate">
                      {t.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>
                      {t.due.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span
                      className={`font-medium ${
                        (() => {
                          if (t.priority === "high") return "text-red-600";
                          if (t.priority === "medium") return "text-amber-600";
                          if (t.priority === "low") return "text-green-600";
                          return "text-gray-600"; // fallback
                        })()
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    (() => {
                      if (t.status === "todo") return "bg-gray-100 text-gray-700";
                      if (t.status === "inprogress") return "bg-blue-100 text-blue-700";
                      if (t.status === "done") return "bg-green-100 text-green-700";
                      return "bg-gray-200 text-gray-500"; // fallback
                    })()
                  }`}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
