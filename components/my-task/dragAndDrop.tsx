'use client';

import { DndContext, closestCorners, DragEndEvent, DragOverlay, UniqueIdentifier, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState, useCallback } from 'react';

import DroppableColumn from './droppable';
import DraggableTask from './draggable';
import OverlayTask from './overLayTask';
import TaskModal from "./taskModal";
import type { Task, Column } from "./types";

const initialTasks: Record<Column, Task[]> = {
  todo: [
    {
      id: "2",
      title: "Write API docs",
      description: "Auth endpoints, errors, samples",
      priority: "medium",
      createdAt: "2025-09-11",
      assignedBy: "Alice",
      assignedTo: ["Alice"],
      comments: 1,
    },
    {
      id: "4",
      title: "Create wireframes",
      description: "Key screens: Home, Board, Task",
      priority: "medium",
      createdAt: "2025-09-11",
      assignedBy: "Carol",
      assignedTo: ["Alice", "Carol"],
      comments: 0,
    },
    {
      id: "6",
      title: "Refactor API calls",
      description: "SWR/React Query integration",
      priority: "medium",
      createdAt: "2025-09-11",
      assignedBy: "Bob",
      assignedTo: ["Bob", "Alice"],
      comments: 5,
    },
    {
      id: "7",
      title: "Set up analytics",
      description: "Events for task flows",
      priority: "high",
      createdAt: "2025-09-10",
      assignedBy: "Carol",
      assignedTo: ["Alice"],
      comments: 0,
    },
    {
      id: "9",
      title: "Build notification center",
      description: "In-app alerts & email setup",
      priority: "high",
      createdAt: "2025-09-15",
      assignedBy: "Bob",
      assignedTo: ["Alice"],
      comments: 3,
    },
    {
      id: "10",
      title: "Improve accessibility",
      description: "ARIA roles & keyboard nav",
      priority: "medium",
      createdAt: "2025-09-16",
      assignedBy: "Carol",
      assignedTo: ["Alice", "Bob"],
      comments: 2,
    },
  ],
  inprogress: [
    {
      id: "17",
      title: "Build drag & drop",
      description: "Dnd-kit integration",
      priority: "high",
      createdAt: "2025-09-12",
      assignedBy: "Alice",
      assignedTo: ["Alice", "Bob"],
      comments: 6,
    },
    {
      id: "20",
      title: "Migrate state to Redux",
      description: "Centralized store with slices",
      priority: "medium",
      createdAt: "2025-09-13",
      assignedBy: "Bob",
      assignedTo: ["Alice"],
      comments: 1,
    },
    {
      id: "21",
      title: "Integrate payments",
      description: "Stripe subscriptions & webhooks",
      priority: "high",
      createdAt: "2025-09-14",
      assignedBy: "Carol",
      assignedTo: ["Alice", "Carol"],
      comments: 4,
    },
  ],
  review: [
    {
      id: "22",
      title: "Polish landing page",
      description: "Animations & responsive tweaks",
      priority: "low",
      createdAt: "2025-09-14",
      assignedBy: "Bob",
      assignedTo: ["Alice"],
      comments: 0,
    },
    {
      id: "23",
      title: "Refine error states",
      description: "Empty states & fallback UI",
      priority: "medium",
      createdAt: "2025-09-15",
      assignedBy: "Carol",
      assignedTo: ["Alice", "Bob"],
      comments: 2,
    },
  ],
  done: [
    {
      id: "19",
      title: "Set up CI/CD pipeline",
      description: "Basic GitHub Actions",
      priority: "medium",
      createdAt: "2025-09-14",
      assignedBy: "Bob",
      assignedTo: ["Alice", "Bob", "Carol"],
      comments: 9,
    },
    {
      id: "24",
      title: "Launch beta program",
      description: "Invite first 50 users",
      priority: "high",
      createdAt: "2025-09-12",
      assignedBy: "Alice",
      assignedTo: ["Alice"],
      comments: 7,
    },
    {
      id: "25",
      title: "Configure test coverage",
      description: "Set up Jest & coverage reports",
      priority: "medium",
      createdAt: "2025-09-13",
      assignedBy: "Bob",
      assignedTo: ["Alice"],
      comments: 3,
    },
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
    <section className="relative w-full h-full  overflow-hidden" aria-label="File drop area" onDragOver={(e) => e.preventDefault()}>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 h-full overflow-x-auto pb-2">
          {columns.map((col) => (
            <DroppableColumn
              key={col.id}
              columnId={col.id}
              background={col.background}
              title={col.title}
              tasks={tasks[col.id]}
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
