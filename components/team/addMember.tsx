'use client'

import { useState } from "react"

export default function AddMemberToTeam() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Engineer",
    "UI/UX Designer",
    "Graphic Designer",
    "Project Manager",
    "QA Engineer",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, role });
    setOpen(false);
    setEmail("");
    setRole("");
  };

  return (
    <div className="addContainer h-20 p-3 flex justify-end gap-4 ">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="h-full w-52 bg-brand-teal flex justify-center items-center gap-2 px-4 py-2 rounded-lg shadow-md text-white font-semibold hover:shadow-lg hover:bg-indigo-700 transition"
      >
        + Add Member
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
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Add Member to Team
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email input */}
              <div>
                <label htmlFor="member-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Member Email
                </label>
                <input
                  id="member-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Role selector */}
              <div>
                <label htmlFor="member-role" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Role
                </label>
                <select
                  id="member-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Add Member
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
