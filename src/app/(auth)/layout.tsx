// src/app/(auth)/page.tsx
import React from "react";
import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div className="min-h-screen w-full relative bg-linear-to-b from-[#f7f8fa] via-[#f9fafb] to-[#eceef1]">
            {/* Soft top glow and grid lines */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-64 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(250,235,120,0.25)_0%,transparent_50%)] opacity-90" />
                    <svg
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 1440 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g stroke="rgba(0,0,0,0.05)" strokeWidth="1">
                            <path d="M0 20 H1440" />
                            <path d="M0 40 H1440" />
                            <path d="M0 60 H1440" />
                            <path d="M0 100 H1440" />
                        </g>
                    </svg>
                </div>
            </div>

            <main className="min-h-screen flex items-center justify-center px-6 py-14">
                <div className="w-full max-w-2xl">{children}</div>
            </main>

            <footer className="absolute bottom-8 left-0 right-0 text-center text-sm text-neutral-500">
                <div className="inline-flex gap-6 items-center">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Docs</span>
                    <span>Help</span>
                </div>
            </footer>
        </div>
    );
}
