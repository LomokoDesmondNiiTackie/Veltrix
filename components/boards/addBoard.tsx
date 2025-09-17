'use client'

import { useState } from "react"

export default function AddBoard() {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("bg-pink-500");

  // Match the exact board colors you already use
  const colors = [
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-red-500",
  ];

  return (
    <div className="addContainer h-20 p-3 flex gap-4">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={`h-full w-44 ${selectedColor} flex justify-center items-center gap-2 px-4 py-2 rounded-lg shadow-md text-white font-semibold hover:shadow-lg hover:opacity-90 transition`}
      >
        + Create Board
      </button>

      {/* Modal */}
      {open && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm z-50">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>

            {/* Header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Board
            </h3>

            {/* Form */}
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Board Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Board Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Color selector */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Board Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-md border-2 transition ${color} ${
                        selectedColor === color
                          ? "border-gray-900 scale-110"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full ${selectedColor} text-white font-semibold py-2 rounded-md hover:opacity-90 transition`}
              >
                Add Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
