import { Task } from "./types";
import * as Avatar from "@radix-ui/react-avatar";
import { ChatBubbleOvalLeftEllipsisIcon, TagIcon } from "@heroicons/react/24/solid";

type Props = {
  readonly task: Task;
  readonly onClick: () => void;
};

export default function TaskCard({ task, onClick }: Props) {
  const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-transform duration-150 hover:scale-[1.01] focus:outline-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-brand-azure">
              {task.title}
            </h4>
            {task.tag && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-azure/10 text-brand-azure">
                <TagIcon className="h-3 w-3" /> {task.tag}
              </span>
            )}
          </div>
          {task.description && (
            <p className="mt-1 text-xs text-gray-600 line-clamp-2">
              {task.description}
            </p>
          )}
          <p className="mt-1 text-[11px] text-gray-400">Created {task.createdAt}</p>
        </div>
        <span
          className={`flex-shrink-0 px-2 py-0.5 rounded-md text-xs font-medium capitalize ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        {/* Members */}
        <div className="flex -space-x-2">
          {task.assignedTo.map((name, i) => (
            <Avatar.Root
              key={i}
              className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[11px] font-semibold text-gray-700 shadow-sm"
              title={name}
            >
              <Avatar.Fallback delayMs={600}>
                {name.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
          ))}
        </div>

        {/* Comments */}
        <div className="flex items-center text-xs text-gray-500 gap-1">
          <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4 text-gray-400" />
          {task.comments ?? 0}
        </div>
      </div>
    </button>
  );
}
