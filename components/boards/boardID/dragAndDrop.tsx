'use client';

import { DndContext, closestCorners, DragEndEvent, DragOverlay, UniqueIdentifier, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState, useCallback } from 'react';

import DroppableColumn from './droppable';
import DraggableTask from './draggable';
import OverlayTask from './overLayTask';
import TaskModal from "./taskModal";
import type { Task, Column } from "./types";

// Sample tasks including richer attributes
const initialTasks: Record<Column, Task[]> = {
  todo: [
    {id: '1', title: 'Design login page', description: 'Email/password with validation', priority: 'high', createdAt: '2025-09-10', assignedBy: 'Alice', assignedTo: ['Bob','Carol'], comments: 3},
    {id: '2', title: 'Write API docs', description: 'Auth endpoints, errors, samples', priority: 'medium', createdAt: '2025-09-11', assignedBy: 'Alice', assignedTo: ['Alice'], comments: 1},
    {id: '3', title: 'Design dashboard', description: 'KPI cards and charts', priority: 'high', createdAt: '2025-09-10', assignedBy: 'Bob', assignedTo: ['Bob'], comments: 2},
    {id: '4', title: 'Create wireframes', description: 'Key screens: Home, Board, Task', priority: 'medium', createdAt: '2025-09-11', assignedBy: 'Carol', assignedTo: ['Alice','Carol'], comments: 0},
    {id: '5', title: 'Design user profile', description: 'Avatar, preferences, teams', priority: 'high', createdAt: '2025-09-10', assignedBy: 'Alice', assignedTo: ['Carol'], comments: 4},
    {id: '6', title: 'Refactor API calls', description: 'SWR/React Query integration', priority: 'medium', createdAt: '2025-09-11', assignedBy: 'Bob', assignedTo: ['Bob','Alice'], comments: 5},
    {id: '7', title: 'Set up analytics', description: 'Events for task flows', priority: 'high', createdAt: '2025-09-10', assignedBy: 'Carol', assignedTo: ['Alice'], comments: 0},
    {id: '8', title: 'Write onboarding docs', description: 'Getting started guide', priority: 'medium', createdAt: '2025-09-11', assignedBy: 'Alice', assignedTo: ['Bob'], comments: 2},
  ],
  inprogress: [
    {id: '17', title: 'Build drag & drop', description: 'Dnd-kit integration', priority: 'high', createdAt: '2025-09-12', assignedBy: 'Alice', assignedTo: ['Alice','Bob'], comments: 6},
  ],
  review: [
    {id: '18', title: 'Fix navbar bug', description: 'Alignment issue on mobile', priority: 'low', createdAt: '2025-09-13', assignedBy: 'Carol', assignedTo: ['Carol'], comments: 1},
  ],
  done: [
    {id: '19', title: 'Set up CI/CD pipeline', description: 'Basic GitHub Actions', priority: 'medium', createdAt: '2025-09-14', assignedBy: 'Bob', assignedTo: ['Alice','Bob','Carol'], comments: 9},
  ],
};

// Members available to assign (demo)

// Columns
const columns: { id: Column; title: string; background: string }[] = [
  { id: 'todo', title: 'Todo', background: 'bg-neutral-gray' },
  { id: 'inprogress', title: 'In Progress', background: 'bg-yellow-400' },
  { id: 'review', title: 'Review', background: 'bg-brand-teal' },
  { id: 'done', title: 'Done', background: 'bg-green-400' },
];

// Utility functions (make sure User and Comment types are defined)
function createComment(author: string, text: string) {
  return {
    id: Math.random().toString(36).slice(2, 8),
    author,
    text,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

function updateSelectedTask(prev: Task | null, newComment: { id: string; author: string; text: string; createdAt: string }): Task | null {
  if (!prev) return prev;
  return {
    ...prev,
    comments: (prev.comments ?? 0) + 1,
    commentsList: [...(prev.commentsList ?? []), newComment],
  };
}

function updateTask(
  task: Task,
  taskId: string,
  newComment: { id: string; author: string; text: string; createdAt: string }
): Task {
  if (task.id !== taskId) return task;
  return {
    ...task,
    comments: (task.comments ?? 0) + 1,
    commentsList: [...(task.commentsList ?? []), newComment],
  };
}

function updateColumnTasks(
  tasks: Task[],
  taskId: string,
  newComment: { id: string; author: string; text: string; createdAt: string }
): Task[] {
  return tasks.map((t) => updateTask(t, taskId, newComment));
}

function updateBoard(
  prev: Record<Column, Task[]>,
  taskId: string,
  newComment: { id: string; author: string; text: string; createdAt: string }
): Record<Column, Task[]> {
  const updated: Record<Column, Task[]> = { ...prev };
  (Object.keys(updated) as Column[]).forEach((col) => {
    updated[col] = updateColumnTasks(updated[col], taskId, newComment);
  });
  return updated;
}

// Main Component
export default function DragAndDrop() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const currentUser = 'You';

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } }),
  );

  const [adding, setAdding] = useState<Partial<Record<Column, boolean>>>({});
  const [drafts, setDrafts] = useState<Partial<Record<Column, { title: string; description: string; priority: Task['priority']; assignees: string[] }>>>({});

  const findContainer = useCallback((id: UniqueIdentifier): Column | undefined => {
    return (Object.keys(tasks) as Column[]).find((key) =>
      tasks[key].some((task) => task.id === id),
    );
  }, [tasks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = over.id as Column;

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      const task = tasks[activeContainer].find((t) => t.id === active.id);
      if (!task) return;

      setTasks((prev) => {
        const newActive = prev[activeContainer].filter((t) => t.id !== active.id);
        const newOver = [...prev[overContainer], task];

        return {
          ...prev,
          [activeContainer]: newActive,
          [overContainer]: newOver,
        };
      });
    }

    setActiveTask(null);
  }, [tasks, findContainer]);

  return (
    <section className="relative w-full h-full overflow-hidden" aria-label="File drop area" onDragOver={(e) => e.preventDefault()}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(event) => {
          const container = findContainer(event.active.id);
          if (!container) return;
          const task = tasks[container].find((t) => t.id === event.active.id);
          if (task) setActiveTask(task);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
      >
        {/* Grid with constrained height */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 h-full overflow-x-auto pb-2">
          {columns.map((col) => (
            <DroppableColumn
              key={col.id}
              columnId={col.id}
              background={col.background}
              title={col.title}
              tasks={tasks[col.id]}
              onAddTask={() => {
                setAdding((prev) => ({ ...prev, [col.id]: true }));
                setDrafts((prev) => ({
                  ...prev,
                  [col.id]: prev[col.id] ?? { title: '', description: '', priority: 'medium', assignees: [currentUser] },
                }));
              }}
              adding={!!adding[col.id]}
              draft={drafts[col.id]}
              onChangeDraft={(patch) =>
                setDrafts((prev) => ({
                  ...prev,
                  [col.id]: { ...(prev[col.id] ?? { title: '', description: '', priority: 'medium' }), ...patch },
                }))
              }
              onSubmitDraft={() => {
                const d = drafts[col.id] ?? { title: '', description: '', priority: 'medium' as Task['priority'], assignees: [currentUser] };
                if (!d.title.trim()) return;
                const id = Math.random().toString(36).slice(2, 8);
                const newTask: Task = {
                  id,
                  title: d.title.trim(),
                  description: d.description.trim(),
                  priority: d.priority,
                  createdAt: new Date().toISOString().slice(0, 10),
                  assignedBy: currentUser,
                  assignedTo: d.assignees && d.assignees.length > 0 ? d.assignees : [currentUser],
                  comments: 0,
                  commentsList: [],
                };
                setTasks((prev) => ({ ...prev, [col.id]: [newTask, ...prev[col.id]] }));
                setAdding((prev) => ({ ...prev, [col.id]: false }));
                setDrafts((prev) => ({
                  ...prev,
                  [col.id]: { title: '', description: '', priority: 'medium', assignees: [currentUser] },
                }));
              }}
              onCancelAdd={() => {
                setAdding((prev) => ({ ...prev, [col.id]: false }));
              }}
            >
              {tasks[col.id].map((task) => (
                <DraggableTask key={task.id} task={task} onClick={() => setSelectedTask(task)} />
              ))}
            </DroppableColumn>
          ))}
        </div>

        <DragOverlay>{activeTask ? <OverlayTask task={activeTask} /> : null}</DragOverlay>
      </DndContext>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          currentUser={currentUser}
          onAddComment={(taskId, text) => {
            const newComment = createComment(currentUser, text);
            setTasks((prev) => updateBoard(prev, taskId, newComment));
            setSelectedTask((prev) => updateSelectedTask(prev, newComment));
          }}
        />
      )}
    </section>
  );
}
