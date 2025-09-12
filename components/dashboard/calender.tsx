"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '@/components/dashboard/calender.css'
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Priority = "high" | "medium" | "low";
type Status = "todo" | "inprogress" | "done";

type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  date: string; // normalized date key (Date.prototype.toDateString())
  status: Status;
};

const dateKey = (d: Date) => d.toDateString();

export default function CalendarPage() {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample data -- replace with API/localStorage in production
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(today.getDate() + 2);

  const initialTodos: Todo[] = [
    {
      id: "t-1",
      title: "Design review: Board components",
      description: "Evaluate card density & interactions",
      priority: "high",
      completed: false,
      date: dateKey(today),
      status: "inprogress",
    },
    {
      id: "t-2",
      title: "Sprint planning",
      description: "Define priorities for next sprint",
      priority: "medium",
      completed: false,
      date: dateKey(today),
      status: "todo",
    },
    {
      id: "t-3",
      title: "Release: v1.8.0",
      description: "Deploy release to staging, run smoke tests",
      priority: "high",
      completed: false,
      date: dateKey(tomorrow),
      status: "todo",
    },
    {
      id: "t-4",
      title: "Backlog grooming",
      description: "Refine top 10 tickets",
      priority: "low",
      completed: true,
      date: dateKey(dayAfter),
      status: "done",
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleDateClick(next: Value) {
    if (next instanceof Date) {
      setValue(next);
      setSelectedDate(next);
    } else if (Array.isArray(next)) {
      // range selection (not used here) — set to first day
      setValue(next);
      setSelectedDate(next[0]);
    }
  }

  function closeTodoPopup() {
    setSelectedDate(null);
  }

  function getTodosForDate(d: Date) {
    const key = dateKey(d);
    return todos.filter((t) => t.date === key);
  }

  function getPriorityColor(priority: Priority) {
    switch (priority) {
      case "high":
        return "#ef4444"; // red
      case "medium":
        return "#f59e0b"; // amber
      case "low":
        return "#10b981"; // green
      default:
        return "#6b7280"; // gray
    }
  }

  // Basic action: toggle completion
  function toggleComplete(todoId: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId ? { ...t, completed: !t.completed, status: !t.completed ? "done" : "todo" } : t
      )
    );
  }

  // Move status (simple left/right move)
  function moveStatus(todoId: string, direction: "left" | "right") {
    const order: Status[] = ["todo", "inprogress", "done"];
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== todoId) return t;
        const idx = order.indexOf(t.status);
        const nextIdx = Math.max(0, Math.min(order.length - 1, idx + (direction === "right" ? 1 : -1)));
        return { ...t, status: order[nextIdx], completed: order[nextIdx] === "done" ? true : t.completed };
      })
    );
  }

  // Move card to a provided status
  function setStatus(todoId: string, status: Status) {
    setTodos((prev) => prev.map((t) => (t.id === todoId ? { ...t, status, completed: status === "done" ? true : t.completed } : t)));
  }

  // UI: Kanban columns ordering
  const columns: { key: Status; title: string }[] = [
    { key: "todo", title: "To Do" },
    { key: "inprogress", title: "In Progress" },
    { key: "done", title: "Done" },
  ];

  return (
    <div className="relative w-full h-full rounded-xl bg-neutral-light shadow-soft overflow-hidden">
      

      <Calendar
        onChange={handleDateClick}
        value={value}
        showNeighboringMonth={true}
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(locale, date) => ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dayTodos = getTodosForDate(date);
            if (dayTodos.length === 0) return null;
            return (
              <div aria-hidden className="tile-content">
                {/* small preview cards */}
                <div className="tile-mini-cards">
                  {dayTodos.slice(0, 3).map((t) => (
                    <div key={t.id} className="tile-mini-card" title={t.title}>
                      <div className="mini-dot" style={{ backgroundColor: getPriorityColor(t.priority) }} />
                      <div className="mini-title">{t.title}</div>
                    </div>
                  ))}
                  {dayTodos.length > 3 && <div className="tile-more-badge">+{dayTodos.length - 3}</div>}
                </div>
              </div>
            );
          }
          return null;
        }}
        tileClassName={() => "calendar-tile"}
      />

      {/* Todo Popup (Kanban modal) */}
      {selectedDate && (
        <dialog className="kanban-backdrop" aria-modal="true">
          <div className="kanban-modal">
            <div className="kanban-header">
              <div>
                <div style={{ fontSize: 14, color: "#0f172a", fontWeight: 800 }}>
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{getTodosForDate(selectedDate).length} items</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button className="btn" onClick={() => { setSelectedDate(null); }}>
                  Close
                </button>
              </div>
            </div>

            <div className="kanban-body">
              {columns.map((col) => {
                const grouped = getTodosForDate(selectedDate).filter((t) => t.status === col.key);
                return (
                  <div key={col.key} className="kanban-column" aria-label={col.title}>
                    <h4>
                      {col.title} <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12 }}>· {grouped.length}</span>
                    </h4>

                    {grouped.length === 0 && <div style={{ color: "#94a3b8", fontSize: 13 }}>No cards</div>}

                    {grouped.map((t) => (
                      <div key={t.id} className="kanban-card">
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <div className="card-title">{t.title}</div>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <div className="priority-chip" style={{ background: `${getPriorityColor(t.priority)}22`, color: getPriorityColor(t.priority) }}>
                              {t.priority}
                            </div>
                          </div>
                        </div>
                        {t.description && <div style={{ color: "#64748b", fontSize: 13 }}>{t.description}</div>}
                        <div className="card-meta" style={{ justifyContent: "space-between" }}>
                          <div style={{ color: t.completed ? "#10b981" : "#64748b", fontWeight: 700, fontSize: 12 }}>
                            {t.completed ? "Completed" : t.status === "inprogress" ? "In progress" : "Pending"}
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            {col.key !== "todo" && (
                              <button className="btn" title="Move left" onClick={() => moveStatus(t.id, "left")}>
                                ←
                              </button>
                            )}
                            {col.key !== "done" && (
                              <button className="btn" title="Move right" onClick={() => moveStatus(t.id, "right")}>
                                →
                              </button>
                            )}
                            <button className="btn" title="Toggle complete" onClick={() => toggleComplete(t.id)}>
                              {t.completed ? "Undo" : "Done"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
