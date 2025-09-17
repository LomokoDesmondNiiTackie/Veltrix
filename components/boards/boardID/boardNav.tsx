'use client'

import Link from "next/link";
import { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import {ArrowLeftIcon,GlobeAltIcon,LockClosedIcon} from "@heroicons/react/24/solid";

type Props = {
  readonly boardId: string;
};

export default function BoardNav({ boardId }: Props) {
  const [isPublic, setIsPublic] = useState(true);

  // Example member list (could be fetched based on boardId)
  const members = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Bob", avatar: "" }, // no avatar → fallback
    { id: 3, name: "Carol", avatar: "https://i.pravatar.cc/40?img=3" },
  ];

  return (
    <div className="boardNavContainer w-full h-full px-4 border-b border-gray-200 flex items-center justify-between">
      {/* Back button */}
      <Link
        href={`/id/boards`}
        className="flex items-center text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
      </Link>

      {/* Board title */}
      <div className="text-xl font-bold text-neutral-dark/80 truncate">
        {decodeURIComponent(boardId)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Members */}
        <div className="flex items-center -space-x-2">
          {members.map((member) => (
            <Avatar.Root
              key={member.id}
              className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200"
              title={member.name}
            >
              <Avatar.Image
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback
                className="flex items-center justify-center w-full h-full text-xs font-medium text-gray-600 bg-gray-100"
                delayMs={600}
              >
                {member.name.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
          ))}
          <button
            className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 border border-gray-300 text-gray-600 text-xs font-medium hover:bg-gray-200 transition"
            title="Add member"
          >
            +
          </button>
        </div>

        {/* Public/Private toggle */}
        <button
          onClick={() => setIsPublic((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition"
          title={isPublic ? "Set board to private" : "Set board to public"}
        >
          {isPublic ? (
            <GlobeAltIcon className="h-4 w-4 text-green-600" />
          ) : (
            <LockClosedIcon className="h-4 w-4 text-red-600" />
          )}
          {isPublic ? "Public" : "Private"}
        </button>
      </div>
    </div>
  );
}
