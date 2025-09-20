import { useDroppable } from "@dnd-kit/core";
import type { Task, Column } from "./types";

export default function DroppableColumn({
  columnId,
  background,
  title,
  tasks,
  children,
}: {
  readonly columnId: Column;
  readonly background: string;
  readonly title: string;
  readonly tasks: Task[];
  readonly children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-white rounded-xl overflow-hidden transition-all h-full ${
        isOver ? "ring-2 ring-brand-azure bg-brand-azure/5" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-0 px-4 py-3 flex items-center justify-between ${background}`}
       >
        <h3 className="text-sm font-semibold text-gray-800">
          {title}{" "}
          <span className="ml-1 text-xs text-gray-600 font-normal">
            ({tasks.length})
          </span>
        </h3>
      </div>

      {/* Scrollable list with spacing between cards */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto overscroll-contain">
        {children}
        {tasks.length === 0 && (
          <div className="text-xs text-gray-400 italic">Drop tasks here</div>
        )}
      </div>
    </div>
  );
}
