import LandlordNavbar from "@/components/shared/landloard/Navbar";
import React from "react";
import type { ReactNode } from "react";

export default function LandlordLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div>
            <LandlordNavbar />
            {children}
        </div>
    );
}
