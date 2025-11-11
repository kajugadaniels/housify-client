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
          px-4 sm:px-4 md:px-4 lg:px-4 xl:px-4
          py-4 sm:py-4 md:py-4
          overflow-y-auto
          scroll-smooth
          scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb-rounded-full
        "
            >
                <div className="mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Fixed bottom navbar (does not move) */}
            <LandlordNavbar />
        </div>
    );
}
