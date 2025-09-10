import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/solid";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DashNav() {
  return (
    <nav className="h-16 w-full bg-neutral-light flex items-center justify-end px-4 sm:px-6 md:px-8 shadow-soft">
      <div className="navLeft flex items-center gap-3 lg:gap-7">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="notification h-10 w-10 flex justify-center items-center rounded-full bg-[#f1eeee] relative focus:outline-none"
              aria-label="Notifications"
            >
              <BellIcon className="h-8 w-8 text-neutral-dark/80" />
              <span className="sr-only">Notifications</span>
              <span className="badge h-5 w-5 rounded-full flex justify-center items-center text-neutral-light absolute top-0 right-0 bg-danger text-xs font-bold">
                3
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-xl shadow-lg p-2 border border-neutral-200 z-50 transition-all duration-200 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95 origin-top-right"
              sideOffset={8}
              align="end"
            >
              <DropdownMenu.Label className="px-2 py-1 text-xs text-neutral-gray font-semibold">
                Notifications
              </DropdownMenu.Label>
              <DropdownMenu.Separator className="my-1 h-px bg-neutral-100" />
              <DropdownMenu.Item asChild>
                <Link
                  href="/id/inbox"
                  className="px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer text-sm text-neutral-dark block"
                >
                  New comment on your board
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/id/inbox"
                  className="px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer text-sm text-neutral-dark block"
                >
                  Task Design UI marked as done
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/id/inbox"
                  className="px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer text-sm text-neutral-dark block"
                >
                  You were added to Frontend Team
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-neutral-100" />
              <DropdownMenu.Item asChild>
                <Link
                  href="/id/inbox"
                  className="px-3 py-2 rounded-lg hover:bg-neutral-100 cursor-pointer text-xs text-brand-teal font-semibold block"
                >
                  View all notifications
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <div className="profile flex items-center gap-2">
          <Avatar.Root className="h-10 w-10 flex rounded-full bg-brand-teal items-center justify-center">
            <Avatar.Image className="h-full w-full object-cover rounded-full" />
            <Avatar.Fallback className="h-full w-full flex justify-center items-center font-bold text-neutral-light" delayMs={600}>
              JD
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="detail w-40 hidden lg:block">
            <div className="name font-bold">Lomoko Desmond</div>
            <div className="role text-sm text-neutral-gray">Frontend Developer</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
