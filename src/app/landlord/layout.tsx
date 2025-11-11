import React from "react";
import type { ReactNode } from "react";

export default function LandlordLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div>
            Landlord Layout
            {children}
        </div>
    );
}
