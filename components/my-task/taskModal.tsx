import { Task } from "./types";

type Props = {
  readonly task: Task;
  readonly onClose: () => void;
  readonly onAddComment: (taskId: string, text: string) => void;
  readonly currentUser?: string;
};

export default function TaskModal({
  task,
  onClose,
  onAddComment,
  currentUser = "You",
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            {task.title}
            <span className="inline-flex items-center rounded-full bg-brand-azure/10 px-3 py-0.5 text-xs font-medium text-brand-azure">
              {task.priority}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-6">
          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {task.description}
          </p>

          {/* Details */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Created</dt>
              <dd className="text-gray-900">{task.createdAt}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Assigned by</dt>
              <dd className="text-gray-900">{task.assignedBy}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Assigned to</dt>
              <dd className="text-gray-900">{task.assignedTo.join(", ")}</dd>
            </div>
          </dl>

          {/* Comments */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Comments ({task.comments ?? 0})
            </h3>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
              {(task.commentsList ?? []).map((c) => (
                <div
                  key={c.id}
                  className="flex gap-3 items-start border border-gray-100 rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold">
                    {c.author[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>{c.author}</span>
                      <span>{c.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-800">{c.text}</p>
                  </div>
                </div>
              ))}
              {(!task.commentsList || task.commentsList.length === 0) && (
                <div className="text-sm text-gray-500 italic text-center py-4">
                  No comments yet. Be the first to start the conversation.
                </div>
              )}
            </div>
          </section>

          {/* Add comment */}
          {task.assignedTo.includes(currentUser) && (
            <form
              className="flex gap-3 items-start"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const textarea = form.elements.namedItem(
                  "comment"
                ) as HTMLTextAreaElement;
                const text = textarea.value.trim();
                if (!text) return;
                onAddComment(task.id, text);
                textarea.value = "";
              }}
            >
              <textarea
                name="comment"
                placeholder="Write your comment..."
                className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-azure focus:ring-2 focus:ring-brand-azure/30"
                rows={2}
              />
              <button
                type="submit"
                className="rounded-md bg-brand-azure px-4 py-2 text-sm font-medium text-white hover:bg-brand-azure-dark focus:outline-none focus:ring-2 focus:ring-brand-azure focus:ring-offset-1"
              >
                Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
