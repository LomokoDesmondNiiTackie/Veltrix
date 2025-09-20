import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import TaskCard from "./taskCard";
import type { Task } from "./types";



export default function DraggableTask({task, onClick}: {readonly task: Task; readonly onClick: () => void}) {
  const {attributes, listeners, setNodeRef, transform, isDragging} =
    useDraggable({id: task.id});

  const style = {
    transform: CSS.Translate.toString(transform),
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
}