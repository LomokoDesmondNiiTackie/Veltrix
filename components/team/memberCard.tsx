'use client'

import * as Avatar from "@radix-ui/react-avatar"
import { useState } from "react"

type TeamMember = {
  id: number
  name: string
  email: string
  role: string
  avatarUrl?: string
}

export default function MemberCard() {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Frontend Developer", avatarUrl: "https://i.pravatar.cc/150?img=32" },
    { id: 2, name: "Brian Smith", email: "brian@company.com", role: "Backend Developer", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    { id: 3, name: "Clara Roberts", email: "clara@company.com", role: "Graphic Designer", avatarUrl: "https://i.pravatar.cc/150?img=45" },
    { id: 4, name: "Daniel Lee", email: "daniel@company.com", role: "Project Manager", avatarUrl: "https://i.pravatar.cc/150?img=24" },
    { id: 5, name: "Ella Martinez", email: "ella@company.com", role: "UI/UX Designer", avatarUrl: "https://i.pravatar.cc/150?img=36" },
    { id: 6, name: "Frank Wilson", email: "frank@company.com", role: "Fullstack Engineer", avatarUrl: "https://i.pravatar.cc/150?img=16" },
    { id: 7, name: "Grace Kim", email: "grace@company.com", role: "QA Engineer", avatarUrl: "https://i.pravatar.cc/150?img=22" },
    { id: 8, name: "Henry Adams", email: "henry@company.com", role: "Backend Developer", avatarUrl: "https://i.pravatar.cc/150?img=49" },
    { id: 9, name: "Ivy Zhang", email: "ivy@company.com", role: "Frontend Developer", avatarUrl: "https://i.pravatar.cc/150?img=28" },
    { id: 10, name: "Jack Thompson", email: "jack@company.com", role: "Project Manager", avatarUrl: "https://i.pravatar.cc/150?img=14" },
    { id: 11, name: "Karen White", email: "karen@company.com", role: "UI/UX Designer", avatarUrl: "https://i.pravatar.cc/150?img=41" },
    { id: 12, name: "Leo Fernandez", email: "leo@company.com", role: "Fullstack Engineer", avatarUrl: "https://i.pravatar.cc/150?img=19" },
  ])

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Engineer",
    "UI/UX Designer",
    "Graphic Designer",
    "Project Manager",
    "QA Engineer",
  ]

  const handleRoleChange = (id: number, newRole: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    )
  }

  return (
    <div className="p-8 h-full w-full">
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-scroll">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-neutral-light rounded-xl shadow-soft hover:shadow-card transition p-6 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <Avatar.Root className="w-20 h-20 rounded-full overflow-hidden mb-4">
              <Avatar.Image
                src={member.avatarUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback
                className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-lg font-semibold"
                delayMs={600}
              >
                {member.name.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>

            {/* Info */}
            <h2 className="text-lg font-semibold text-gray-900">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500 mb-3">{member.email}</p>

            {/* Role selector */}
            <select
              value={member.role}
              onChange={(e) => handleRoleChange(member.id, e.target.value)}
              className="mt-auto w-full px-3 py-2 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
