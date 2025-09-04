// "use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";


const TESTIMONIALS = [
  {
    quote:
      "Veltrix helped our engineering team cut cycle time by 28% while increasing release confidence.",
    author: "Priya Nair",
    role: "Engineering Manager",
    company: "Orbit Systems",
    tags: ["Engineering"],
  },
  {
    quote:
      "The roadmap alignment across squads went from chaos to clarity. Planning is finally predictable.",
    author: "Daniel Reyes",
    role: "Head of Product",
    company: "Northwind",
    tags: ["Product"],
  },
  {
    quote:
      "We standardized handoffs and reduced operational overhead significantly within two sprints.",
    author: "Amelia Wong",
    role: "Director of Operations",
    company: "Kite Logistics",
    tags: ["Operations"],
  },
  {
    quote:
      "As an agency, visibility into client projects and SLAs has never been clearer—our CSAT is up 15%.",
    author: "Leo Martins",
    role: "Agency Partner",
    company: "Nova Creative",
    tags: ["Agencies"],
  },
  {
    quote:
      "Feature delivery improved sprint-over-sprint. The realtime boards keep everyone focused on outcomes.",
    author: "Sara Ibrahim",
    role: "Staff Engineer",
    company: "Horizon Health",
    tags: ["Engineering", "Product"],
  },
  {
    quote:
      "Capacity planning finally matches reality. We forecast, commit, and deliver without fire drills.",
    author: "Mateo Rossi",
    role: "Operations Lead",
    company: "Atlas Retail",
    tags: ["Operations", "Product"],
  },
  {
    quote:
      "Client onboarding times dropped by 35%. Templates + automations are a game changer for agencies.",
    author: "Hannah Lee",
    role: "Program Director",
    company: "Brightside Studio",
    tags: ["Agencies", "Operations"],
  },
  {
    quote:
      "Our product rituals have leveled up—clear priorities, zero stale work, faster feedback loops.",
    author: "Jon Park",
    role: "Senior PM",
    company: "Vector Labs",
    tags: ["Product"],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_BG = [
  "bg-brand-teal",
  "bg-brand-azure",
  "bg-brand-purple",
] as const;

export default function Testimonials() {
  return (
    <section className="min-h-screen w-full bg-neutral-light flex flex-col justify-center items-center gap-7 py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-10 md:px-16 lg:px-24">
      <div className="space-y-6 lg:w-[90%]">
        <div className="w-full flex flex-col gap-10 lg:gap-5 mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Testimonials</h2>
          <p className=" text-xl sm:text-2xl text-neutral-gray leading-relaxed max-w-2xl">
            Simple, modern, and professional feedback from teams using Veltrix.
          </p>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 animate-testimonials-scroll"
          style={{
            width: "200%",
          }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <article
              key={idx}
              className="flex-shrink-0 w-[18rem] xs:w-[19.5rem] sm:w-[22rem] md:w-[24rem] lg:w-[26rem] xl:w-[28rem]"
            >
              <div className="h-full bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-neutral-gray/10 flex flex-col justify-between min-h-[17rem] xs:min-h-[17.5rem] sm:min-h-[18rem] md:min-h-[19rem] lg:min-h-[20rem]">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-brand-teal mb-3">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span className="text-xs xs:text-sm font-semibold">
                      {t.tags.join(" · ")}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-neutral-dark leading-relaxed line-clamp-5">
                    “{t.quote}”
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white font-bold ${
                      AVATAR_BG[idx % AVATAR_BG.length]
                    }`}
                    aria-hidden
                  >
                    {getInitials(t.author)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-dark">
                      {t.author}
                    </span>
                    <span className="text-sm text-neutral-gray">
                      {t.role} · {t.company}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="startFor w-11/12 sm:w-5/6 md:w-4/5 max-w-5xl flex flex-col justify-center items-center rounded bg-brand-teal px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 shadow-card">
        <h2 className="text-center text-neutral-light text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed">Your team&#39;s productivity partner No credit card required. Start building today!</h2>
      </div>
    </section>
  );
}
