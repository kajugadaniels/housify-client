"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LANDLORD_NAV_LINKS, LANDLORD_PROFILE_DROPDOWN } from "@/constants/landlord";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, UserCircle } from "lucide-react";
import Image from "next/image";

const LandlordNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [active, setActive] = useState<string>("");
    const [landlord, setLandlord] = useState<{ name?: string; email?: string; avatar?: string }>({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setActive(pathname);
        const storedLandlord = localStorage.getItem("housify_landlord");
        if (storedLandlord) {
            setLandlord(JSON.parse(storedLandlord));
        }
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("housify_landlord");
        router.push("/sign-in");
    };

    return (
        <div
            className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-between",
                "w-[92%] sm:w-auto max-w-[900px]",
                "bg-white/10 dark:bg-[#121113]/60 backdrop-blur-3xl",
                "border border-white/20 dark:border-neutral-800",
                "rounded-full z-50 px-4 sm:px-6 py-3 sm:py-3.5",
                "shadow-[inset_1px_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.15)]",
                "hover:shadow-[inset_2px_2px_3px_rgba(255,255,255,0.15),0_6px_25px_rgba(0,0,0,0.2)]",
                "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            )}
            style={{
                transform: "translateX(-50%) translateY(0)",
            }}
        >
            {/* Logo */}
            <div className="hidden sm:flex items-center gap-2 pl-2 shrink-0 mr-4">
                <Image
                    src="/logo.png"
                    alt="Housify Logo"
                    width={32}
                    height={32}
                    loading="lazy"
                    className="drop-shadow-[0_2px_6px_rgba(83,118,246,0.4)]"
                />
            </div>

            {/* Links */}
            <div className="hidden sm:flex items-center gap-3 flex-1 justify-center">
                {LANDLORD_NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.href;
                    return (
                        <button
                            key={item.name}
                            onClick={() => router.push(item.href)}
                            className={cn(
                                "group flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium",
                                "transition-all duration-200 backdrop-blur-md",
                                isActive
                                    ? "bg-gradient-to-r from-primary to-blue-500 text-white shadow-[0_2px_8px_rgba(83,118,246,0.4)] scale-105"
                                    : "bg-white/5 text-neutral-300 hover:text-primary hover:bg-primary/10 hover:scale-105"
                            )}
                        >
                            <Icon size={16} className={isActive ? "text-white" : "text-neutral-400 group-hover:text-primary"} />
                            <span className="hidden md:inline">{item.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* Mobile Sheet */}
            <div className="flex sm:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-white/10 transition">
                            <Menu size={22} className="text-neutral-200" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="bg-white/10 dark:bg-[#121113]/70 backdrop-blur-3xl border-t border-white/20 rounded-t-3xl shadow-[0_-6px_25px_rgba(0,0,0,0.25)]"
                    >
                        <SheetHeader>
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        </SheetHeader>

                        <div className="flex justify-between items-center mb-6">
                            <Image src="/logo.png" alt="Logo" width={32} height={32} />
                            <SheetClose asChild>
                                <button className="p-2 rounded-full hover:bg-white/10">
                                    <X size={20} />
                                </button>
                            </SheetClose>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pb-4">
                            {LANDLORD_NAV_LINKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            router.push(item.href);
                                            setIsSheetOpen(false);
                                        }}
                                        className="flex flex-col items-center justify-center gap-1 text-xs sm:text-sm text-neutral-200 hover:text-primary transition-transform hover:scale-105"
                                    >
                                        <Icon size={22} />
                                        {item.name}
                                    </button>
                                );
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen((p) => !p)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full transition-all hover:bg-white/10 hover:scale-105"
                >
                    {landlord?.avatar ? (
                        <Image src={landlord.avatar} width={22} height={22} alt="Avatar" className="rounded-full" />
                    ) : (
                        <UserCircle className="text-primary" size={20} />
                    )}
                    <span className="hidden sm:inline text-xs font-medium text-neutral-300">
                        {landlord?.name?.split(" ")[0] || "Profile"}
                    </span>
                </button>

                {isDropdownOpen && (
                    <div
                        className="absolute bottom-14 right-0 w-52 bg-white/10 dark:bg-[#1b1b1b]/80 backdrop-blur-2xl border border-white/20 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.3)] py-2 z-50"
                    >
                        {LANDLORD_PROFILE_DROPDOWN.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => (item.isLogout ? handleLogout() : router.push(item.href))}
                                    className={cn(
                                        "flex items-center gap-2 w-full px-4 py-2 text-sm transition-all",
                                        item.isLogout
                                            ? "text-red-400 hover:bg-red-500/10"
                                            : "text-neutral-300 hover:text-primary hover:bg-primary/10"
                                    )}
                                >
                                    <Icon size={16} />
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandlordNavbar;
