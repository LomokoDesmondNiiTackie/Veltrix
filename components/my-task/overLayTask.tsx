import type { Task } from "./types";


export default function OverlayTask({task}: {readonly task: Task}) {
  const priorityColors: Record<Task['priority'], string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-lg text-sm font-medium text-gray-700 cursor-grabbing scale-105 opacity-90">
      <div className="flex items-center justify-between">
        <span>{task.title}</span>
        <span
          className={`ml-2 px-2 py-0.5 rounded-md text-xs font-semibold ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-1">Created {task.createdAt}</p>
    </div>
  );
}