import React from "react";
import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="min-h-screen w-full relative bg-linear-to-b from-[#0b0d12] via-[#0b0d12] to-[#020202]">
            {/* Top subtle radial/linear glow + subtle grid lines */}
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-64 pointer-events-none overflow-hidden"
            >
                <div className="absolute inset-0 -z-10">
                    <div
                        className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(92,92,117,0.12)_0%,transparent_45%)] opacity-90"
                        style={{ mixBlendMode: "screen" }}
                    />
                    {/* faint horizon lines grid */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 1440 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <defs>
                            <linearGradient id="g" x1="0" x2="1">
                                <stop offset="0" stopColor="#111827" stopOpacity="0.02" />
                                <stop offset="1" stopColor="#111827" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <rect width="1440" height="200" fill="url(#g)" />
                        <g stroke="rgba(255,255,255,0.02)" strokeWidth="1">
                            {/* horizontal faint lines */}
                            <path d="M0 20 H1440" />
                            <path d="M0 40 H1440" />
                            <path d="M0 60 H1440" />
                            <path d="M0 100 H1440" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Centered content container */}
            <main className="min-h-screen flex items-center justify-center px-6 py-14">
                <div className="w-full max-w-2xl">{children}</div>
            </main>

            {/* Footer small links */}
            <footer className="absolute bottom-8 left-0 right-0 text-center text-sm text-neutral-400">
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
