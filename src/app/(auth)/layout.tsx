import React from "react";
import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* ✅ Background image layer */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/bg-auth.jpg"
                    alt="Background"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* ✅ Overlay gradient & top glow */}
            <div aria-hidden className="absolute inset-0 -z-10">
                {/* Top soft light & radial gradient glow */}
                <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6)_0%,transparent_70%)]" />

                {/* Subtle grid overlay */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                        <path d="M0 40 H1440" />
                        <path d="M0 80 H1440" />
                        <path d="M0 120 H1440" />
                        <path d="M0 160 H1440" />
                        <path d="M0 200 H1440" />
                        <path d="M0 240 H1440" />
                        <path d="M0 280 H1440" />
                    </g>
                </svg>

                {/* Light neutral overlay to improve contrast for glass card */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
            </div>

            {/* ✅ Main content (glass login form sits here and blurs background) */}
            <main className="relative min-h-screen flex items-center justify-center px-6 py-14">
                <div className="relative w-full max-w-2xl z-10">
                    {children}
                </div>
            </main>

            {/* ✅ Footer (sharp and not blurred) */}
            <footer className="absolute bottom-8 left-0 right-0 text-center text-sm text-neutral-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">
                <div className="inline-flex gap-6 items-center bg-white/40 backdrop-blur-xl rounded-full px-6 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                    <span className="hover:text-primary transition-colors cursor-pointer">
                        Terms
                    </span>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                        Privacy
                    </span>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                        Docs
                    </span>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                        Help
                    </span>
                </div>
            </footer>
        </div>
    );
}
