'use client'

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/solid";

type Data = {
  id: number;
  title: string;
  description: string;
  color: string;
};

const initialData: Data[] = [
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
  {
    id: 4,
    title: "Customer Feedback",
    description: "User reviews & insights",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    title: "Sales Funnel",
    description: "Lead generation process",
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "Content Calendar",
    description: "Blog & social schedule",
    color: "bg-red-500",
  },
];

export default function Board() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [pinned, setPinned] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const togglePinned = (id: number) => {
    setPinned((prev) =>
      prev.includes(id) ? prev.filter((pin) => pin !== id) : [...prev, id]
    );
  };

  // Pinned boards appear first
  const sortedBoards = [
    ...initialData.filter((b) => pinned.includes(b.id)),
    ...initialData.filter((b) => !pinned.includes(b.id)),
  ];

  return (
    <div className="boardContainer h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sortedBoards.map((data) => (
        <div
          key={data.id}
          className={`group relative rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
        >
          {/* Color background */}
          <div
            className={`absolute inset-0 ${data.color} opacity-80 group-hover:opacity-100 transition-opacity`}
          />

          {/* Card content */}
          <div className="relative p-6 bg-white/80 backdrop-blur-sm h-full flex flex-col justify-between rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {data.title}
                </h3>
                <p className="text-sm text-gray-600">{data.description}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => togglePinned(data.id)}
                  className="text-gray-500 hover:text-gray-800 transition"
                  title="Pin board"
                >
                  <BookmarkIcon
                    className={`h-5 w-5 ${
                      pinned.includes(data.id) ? "text-yellow-500" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => toggleFavorite(data.id)}
                  className="text-gray-500 hover:text-gray-800 transition"
                  title="Add to favorites"
                >
                  <HeartIcon
                    className={`h-5 w-5 ${
                      favorites.includes(data.id) ? "text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <Link href={`/id/boards/${data.title}`}>
                <button className="px-3 py-1 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors">
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
