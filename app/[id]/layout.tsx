import React, { PropsWithChildren } from "react";
import DashNav from "@/components/layout/dashNav";
import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen h-full w-full flex gap-1 shadow-soft">
      <Sidebar/>
      <main className="w-full flex flex-col overflow-hidden">
        <DashNav />
        {children}
      </main>
    </div>
  );
}
