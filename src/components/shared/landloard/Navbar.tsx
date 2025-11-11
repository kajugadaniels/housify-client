"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Bell,
    Search,
    UserCircle2,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
    { name: "Overview", href: "/landlord/dashboard" },
    { name: "Apartments", href: "/landlord/apartments" },
    { name: "Tenants", href: "/landlord/tenants" },
    { name: "Payments", href: "/landlord/payments" },
    { name: "Analytics", href: "/landlord/analytics" },
];

const LandlordNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [landlordName, setLandlordName] = useState<string>("");

    useEffect(() => {
        const storedLandlord = localStorage.getItem("housify_landlord");
        if (storedLandlord) {
            const landlord = JSON.parse(storedLandlord);
            setLandlordName(landlord?.name || "Landlord");
        }
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/70 border-b border-neutral-200/60",
                "shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
            )}
        >
            <div className="flex items-center justify-between px-6 lg:px-10 py-4">
                {/* Left Section */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Housify"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                    <span className="text-xl font-semibold text-neutral-800">
                        Housify
                    </span>
                </div>

                {/* Center Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium text-neutral-600 hover:text-primary transition",
                                "relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Search Icon */}
                    <button className="p-2 rounded-full hover:bg-neutral-100 transition">
                        <Search className="text-neutral-600" size={20} />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 rounded-full hover:bg-neutral-100 transition">
                        <Bell className="text-neutral-600" size={20} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
                    </button>

                    {/* User */}
                    <div className="hidden md:flex items-center gap-2 pl-3 border-l border-neutral-200">
                        <UserCircle2 className="text-primary" size={26} />
                        <div className="text-sm font-medium text-neutral-700 leading-tight">
                            <p>{landlordName || "Landlord"}</p>
                            <p className="text-xs text-neutral-400">Landlord</p>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-neutral-100 transition"
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    >
                        {isMobileMenuOpen ? (
                            <X size={22} className="text-neutral-700" />
                        ) : (
                            <Menu size={22} className="text-neutral-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-neutral-200 bg-white/70 backdrop-blur-xl">
                    <nav className="flex flex-col items-start gap-3 px-6 py-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-medium text-neutral-700 hover:text-primary transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-neutral-200 w-full">
                            <UserCircle2 className="text-primary" size={26} />
                            <div>
                                <p className="font-medium text-neutral-700">{landlordName}</p>
                                <p className="text-xs text-neutral-500">Landlord</p>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default LandlordNavbar;
