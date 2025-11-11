import LandlordNavbar from "@/components/shared/landloard/Navbar";
import React from "react";
import type { ReactNode } from "react";

export default function LandlordLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div
      className="
        relative min-h-screen
        bg-[#f9fafb] text-neutral-800
        flex flex-col
        overflow-x-hidden
      "
    >
      {/* Page Content Wrapper */}
      <main
        className="
          flex-1 w-full
          px-4 sm:px-6 lg:px-8
          pt-10 pb-32
          max-w-7xl mx-auto
          transition-all duration-300
        "
      >
        {children}
      </main>

      {/* Floating Glassy Navbar */}
      <LandlordNavbar />

      {/* Soft background gradient for depth */}
      <div
        aria-hidden
        className="
          pointer-events-none fixed inset-0
          bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.6)_0%,transparent_80%)]
          z-[0]
        "
      />
    </div>
  );
}
