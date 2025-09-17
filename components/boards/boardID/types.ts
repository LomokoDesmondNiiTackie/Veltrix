// types.ts
export type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: "low" | "medium" | "high";
  assignedBy: string;
  assignedTo: string[];
  comments: number; // count for quick badges
  commentsList?: Comment[]; // optional detailed list
  tag?: string;
};

export type Column = "todo" | "inprogress" | "review" | "done";
