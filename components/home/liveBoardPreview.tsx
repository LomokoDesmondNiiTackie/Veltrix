"use client";

import { useMemo, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

// Types
type Task = { id: string; title: string; description?: string };

type ColumnKey = "backlog" | "inprogress" | "done";

const COLUMN_LABELS: Record<ColumnKey, string> = {
  backlog: "Backlog",
  inprogress: "In Progress",
  done: "Done",
};

export default function LiveBoardPreview() {
  const [columns, setColumns] = useState<Record<ColumnKey, Task[]>>({
    backlog: [
      { id: "t1", title: "Design wireframes" },
      { id: "t2", title: "Set up authentication" },
    ],
    inprogress: [
      { id: "t3", title: "Implement Kanban board" },
      { id: "t4", title: "Real-time updates" },
    ],
    done: [{ id: "t5", title: "Project kickoff" }],
  });

  const [newTitle, setNewTitle] = useState("");
  const [newColumn, setNewColumn] = useState<ColumnKey>("backlog");

  const allTaskIds = useMemo(() =>
    new Set(Object.values(columns).flat().map((t) => t.id)),
  [columns]);

  function handleAddTask() {
    const title = newTitle.trim();
    if (!title) return;
    const idBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 16) || "task";
    let id = idBase;
    let n = 1;
    while (allTaskIds.has(id)) {
      id = `${idBase}-${n++}`;
    }
    setColumns((prev) => ({
      ...prev,
      [newColumn]: [{ id, title }, ...prev[newColumn]],
    }));
    setNewTitle("");
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>, task: Task, from: ColumnKey) {
    e.dataTransfer.setData("text/task", JSON.stringify({ id: task.id, from }));
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>, to: ColumnKey) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/task");
    if (!raw) return;
    try {
      const { id, from } = JSON.parse(raw) as { id: string; from: ColumnKey };
      if (!id || !from) return;
      if (from === to) return;
      setColumns((prev) => {
        const moving = prev[from].find((t) => t.id === id);
        if (!moving) return prev;
        return {
          ...prev,
          [from]: prev[from].filter((t) => t.id !== id),
          [to]: [moving, ...prev[to]],
        };
      });
    } catch {}
  }

  return (
    <section className="w-full flex flex-col items-center py-16 sm:py-20 md:py-24 px-4 sm:px-10 md:px-16 lg:px-24">
      <div className="w-full max-w-7xl">
        <div className="mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl font-bold">Live Board Preview</h2>
          <p className="mt-2 text-neutral-gray text-base md:text-lg">Drag tasks between columns or add a new one below.</p>
        </div>

        {/* Add Task */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add a task title..."
              className="w-full bg-white border border-neutral-gray/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-azure shadow-soft"
            />
            <select
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value as ColumnKey)}
              className="bg-white border border-neutral-gray/30 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-brand-azure"
            >
              <option value="backlog">Backlog</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button
            onClick={handleAddTask}
            className="btn btn-primary flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-inner-glow"
            aria-label="Add task"
          >
            <PlusIcon className="h-5 w-5" />
            Add Task
          </button>
        </div>

        {/* Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {(Object.keys(COLUMN_LABELS) as ColumnKey[]).map((colKey) => (
            <div
              key={colKey}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, colKey)}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-gray/20 p-3 sm:p-4 md:p-5 shadow-card min-h-[22rem] md:min-h-[26rem]"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-dark">{COLUMN_LABELS[colKey]}</h3>
                <span className="text-xs md:text-sm text-neutral-gray bg-neutral-light px-2 py-1 rounded-full">
                  {columns[colKey].length}
                </span>
              </div>

              <div className="space-y-3 md:space-y-4">
                {columns[colKey].map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task, colKey)}
                    className="group cursor-grab active:cursor-grabbing select-none bg-white border border-neutral-gray/20 rounded-xl p-4 shadow-soft hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-neutral-dark pr-2">{task.title}</p>
                      <span className="text-[10px] uppercase tracking-wide text-brand-teal/80">Drag</span>
                    </div>
                    {task.description && (
                      <p className="mt-1 text-sm text-neutral-gray">{task.description}</p>
                    )}
                  </div>
                ))}

                {columns[colKey].length === 0 && (
                  <div className="text-sm text-neutral-gray text-center py-6 border border-dashed border-neutral-gray/30 rounded-xl">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
