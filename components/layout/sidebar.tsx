'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  UsersIcon,
  InboxStackIcon,
  Cog6ToothIcon,
  MoonIcon,
  ArrowLeftCircleIcon
} from "@heroicons/react/24/solid";

const links = [
  { href: "/id/dashboard", label: "Dashboard", icon: Squares2X2Icon },
  { href: "/id/boards", label: "Boards", icon: ClipboardDocumentListIcon },
  { href: "/id/my-task", label: "My Tasks", icon: RectangleStackIcon },
  { href: "/id/team", label: "Team", icon: UsersIcon },
  { href: "/id/inbox", label: "Inbox", icon: InboxStackIcon },
  { href: "/id/settings", label: "Settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar h-full w-[10%] md:w-[7%] lg:w-[20%] bg-neutral-light flex flex-col justify-center items-center gap-20 lg:gap-25  py-20 shadow-soft">
      <div className="logo text-neutral-dark/80 lg:text-5xl font-extrabold hidden lg:block ">
        Veltrix<span className="text-danger">.</span>
      </div>
      <div className="logo text-neutral-dark/80 text-3xl lg:text-5xl font-extrabold lg:hidden">
        V<span className="text-danger">.</span>
      </div>
      <div className="tabLine w-full lg:w-auto flex flex-col items-center lg:items-start mb-20 gap-6">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={` lg:w-40 flex items-center px-1 md:px-2 lg:px-4 py-2 rounded-lg hover:bg-brand-teal/20 transition-colors ${
                isActive ? "bg-brand-teal/10" : ""
              }`}
            >
              <Icon
                className={`h-6 lg:w-6 transition-colors ${
                  isActive
                    ? "text-neutral-dark/80"
                    : "text-neutral-dark/50 hover:text-primary"
                }`}
              />
              <span
                className={`ml-2 font-bold transition-colors hidden lg:block ${
                  isActive
                    ? "text-neutral-dark/80"
                    : "text-neutral-dark/50 active:text-neutral-dark"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mode flex flex-col justify-center items-center gap-6">
        <Link href={"/login"} className="lg:w-40 flex items-center px-4 py-2 rounded-lg hover:bg-brand-teal/20 transition-colors">
            <ArrowLeftCircleIcon className="h-6 w-6 text-neutral-dark/50 hover:text-primary transition-colors" />
            <span className="ml-2 text-neutral-dark/50 font-bold transition-colors hidden lg:block">Logout</span>
        </Link>
        <button className="h-10 lg:w-40 px-4 flex items-center rounded-full hover:bg-neutral-gray transition-colors">
            <MoonIcon className="h-6 w-6 text-neutral-dark hover:text-neutral-dark/50 hover:text-primary transition-colors" />
            <span className="ml-2 text-neutral-dark/50 font-bold transition-colors hidden lg:block">Dark Mode</span>
        </button>
      </div>
    </aside>
  );
}