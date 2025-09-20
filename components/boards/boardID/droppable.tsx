import { useDroppable } from "@dnd-kit/core";
import type { Task, Column } from "./types";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function DroppableColumn({
  columnId,
  background,
  title,
  tasks,
  children,
  onAddTask,
  adding,
  draft,
  onChangeDraft,
  onSubmitDraft,
  onCancelAdd,
}: {
  readonly columnId: Column;
  readonly background: string;
  readonly title: string;
  readonly tasks: Task[];
  readonly children: React.ReactNode;
  readonly onAddTask: () => void;
  readonly adding: boolean;
  readonly draft:
    | {
        title: string;
        description: string;
        priority: Task["priority"];
        assignees: string[];
      }
    | undefined;
  readonly onChangeDraft: (
    patch: Partial<{
      title: string;
      description: string;
      priority: Task["priority"];
      assignees: string[];
    }>
  ) => void;
  readonly onSubmitDraft: () => void;
  readonly onCancelAdd: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });
  const availableMembers = ["You", "Alice", "Bob", "Carol"] as const;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl transition-all ${
        isOver ? "ring-2 ring-brand-azure bg-brand-azure/5" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-0 px-4 py-3 flex items-center justify-between rounded-sm ${background}`}
       >
        <h3 className="text-sm font-semibold text-gray-800">
          {title}{" "}
          <span className="ml-1 text-xs text-gray-500 font-normal">
            ({tasks.length})
          </span>
        </h3>
        <button
          onClick={onAddTask}
          className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-100"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Add task
        </button>
      </div>

      {/* Scrollable task list */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {/* Inline add form */}
        {adding && (
          <form
            className="space-y-3 bg-white border border-gray-200 rounded-lg p-4 shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitDraft();
            }}
          >
            <input
              value={draft?.title ?? ""}
              onChange={(e) => onChangeDraft({ title: e.target.value })}
              placeholder="Task title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-azure"
              required
            />
            <textarea
              value={draft?.description ?? ""}
              onChange={(e) => onChangeDraft({ description: e.target.value })}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-azure"
              rows={3}
            />

            {/* Priority and assignees */}
            <div className="space-y-3">
              <select
                value={draft?.priority ?? "medium"}
                onChange={(e) =>
                  onChangeDraft({
                    priority: e.target.value as Task["priority"],
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-azure"
              >
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
              </select>

              {/* Assignees */}
              <div className="flex flex-wrap gap-2">
                {availableMembers.map((m) => {
                  const selected = (draft?.assignees ?? []).includes(m);
                  return (
                    <label
                      key={m}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium cursor-pointer transition ${
                        selected
                          ? "bg-brand-azure text-white border-brand-azure"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selected}
                        onChange={(e) => {
                          const arr = new Set(draft?.assignees ?? []);
                          if (e.target.checked) arr.add(m);
                          else arr.delete(m);
                          onChangeDraft({ assignees: Array.from(arr) });
                        }}
                      />
                      {m}
                    </label>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onCancelAdd}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-brand-azure px-4 py-2 text-sm font-medium text-white hover:bg-brand-azure-dark focus:ring-2 focus:ring-brand-azure/50"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        )}

        {children}

        {tasks.length === 0 && !adding && (
          <div className="text-xs text-gray-400 italic text-center py-6">
            No tasks here. Drag & drop or create a new one.
          </div>
        )}
      </div>
    </div>
  );
}
