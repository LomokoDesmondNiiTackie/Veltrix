"use client";

import { useEffect, useState } from "react";

function useColumns() {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    function updateCols() {
      if (window.innerWidth >= 1536) setCols(16); // 2xl
      else if (window.innerWidth >= 1280) setCols(14); // xl
      else if (window.innerWidth >= 1024) setCols(12); // lg
      else if (window.innerWidth >= 768) setCols(6);  // md
      else setCols(4); // sm and below
    }
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}

export default function ResponsiveGrid() {
  const cols = useColumns();

  return (
    <div
      className={`absolute grid h-full w-full
        ${cols === 16 ? "grid-cols-16 px-10 gap-10" : ""}
        ${cols === 14 ? "grid-cols-14 px-8 gap-8" : ""}
        ${cols === 12 ? "grid-cols-12 px-8 gap-8" : ""}
        ${cols === 6 ? "grid-cols-6 px-8 gap-8" : ""}
        ${cols === 4 ? "grid-cols-4 px-4 gap-4" : ""}`}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="h-full w-full bg-neutral-gray/25"></div>
      ))}
    </div>
  );
}
