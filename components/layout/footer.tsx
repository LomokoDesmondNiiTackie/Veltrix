import Link from "next/link";

export default function Footer() {
  const socials = [
    { href: "#", label: "Twitter" },
    { href: "#", label: "GitHub" },
    { href: "#", label: "LinkedIn" },
    { href: "#", label: "Discord" },
    { href: "#", label: "YouTube" },
  ];

  return (
    <footer className="w-full bg-neutral-dark text-neutral-light px-4 sm:px-10 md:px-16 lg:px-24 pt-10 pb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
        <div className="md:col-span-2">
          <div className="font-bold text-2xl md:text-3xl">Veltrix<span className="text-danger">.</span></div>
          <p className="mt-3 text-neutral-gray max-w-xl">
            Organize tasks, align teams, and drive progress with Veltrix — your real-time kanban operating system.
          </p>
        </div>
        <nav className="text-neutral-light flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-brand-teal font-medium"
            >
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-sm text-neutral-gray">
        <span>© {new Date().getFullYear()} Veltrix. All rights reserved.</span>
        <span className="mt-2 md:mt-0">Built with care for clarity, flow, and execution.</span>
      </div>
    </footer>
  );
}
