export default function PinnedBoards() {
  const boards = [
    {
      id: 1,
      title: "Marketing Campaign",
      description: "Q4 social media strategy",
      color: "bg-pink-500",
    },
    {
      id: 2,
      title: "Product Roadmap",
      description: "Upcoming feature pipeline",
      color: "bg-indigo-500",
    },
    {
      id: 3,
      title: "Design System",
      description: "UI components & guidelines",
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="pinnedBoards h-full w-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-soft overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800 tracking-tight">
          Pinned Boards
        </h2>
      </div>

      {/* Board list */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <ul className="space-y-3">
          {boards.map((board) => (
            <li
              key={board.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:shadow-sm hover:bg-gray-50 transition"
            >
              {/* Color block */}
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold ${board.color}`}
              >
                {board.title.charAt(0)}
              </div>

              {/* Board info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {board.title}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {board.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
