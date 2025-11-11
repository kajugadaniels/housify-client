import LandlordNavbar from "@/components/shared/landloard/Navbar";
import React from "react";
import type { ReactNode } from "react";

export default function LandlordLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div
            className="
        relative min-h-screen w-full
        bg-white
        flex flex-col
        overflow-x-hidden
      "
        >
            {/* Main scrollable content area */}
            <main
                className="
          flex-1 w-full
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
          py-8 sm:py-10 md:py-12
          overflow-y-auto
          scroll-smooth
          scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb-rounded-full
        "
            >
                <div className="min-w-xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Fixed bottom navbar (does not move) */}
            <LandlordNavbar />
        </div>
    );
}
