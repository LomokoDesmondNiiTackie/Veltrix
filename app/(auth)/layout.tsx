import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f5]">
      {children}
    </div>
  );
}
