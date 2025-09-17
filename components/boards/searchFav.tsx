'use client'
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Data = [
  {
    id: '1',
    title: 'Finish project report',
    description: 'Complete the final report for the XYZ project.',
    date: '2025-12-11',
    priority: 'high',
    completed: false,
    status: 'inprogress',
  },
  {
    id: '2',
    title: 'Team meeting',
    description: 'Discuss project milestones and next steps.',
    date: '2025-11-12',
    priority: 'medium',
    completed: false,
    status: 'done',
  },
  {
    id: '3',
    title: 'Code review',
    description: 'Review code for the new feature implementation.',
    date: '2025-12-11',
    priority: 'low',
    completed: false,
    status: 'todo',
  },
  {
    id: '4',
    title: 'Code review',
    description: 'Review code for the new feature implementation.',
    date: '2025-12-11',
    priority: 'low',
    completed: false,
    status: 'todo',
  },
  {
    id: '5',
    title: 'Code review',
    description: 'Review code for the new feature implementation.',
    date: '2025-12-11',
    priority: 'low',
    completed: false,
    status: 'todo',
  }
];

export default function SearchFav() {
  const [query, setQuery] = useState('');

  const filterItems = Data.filter((data) =>
    data['title'].toLowerCase().includes(query.toLowerCase())
  );

  console.log(filterItems);

  return (
    <div className="searchContainer w-full flex items-center gap-4 px-6 py-3">
      {/* Favorite button */}
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 transition"
      >
        <HeartIcon className="h-5 w-5" />
        Favorite
      </button>

      {/* Search box */}
      <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-inner focus-within:ring-2 focus-within:ring-teal-500 transition">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={query}
          placeholder="Search tasks..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
