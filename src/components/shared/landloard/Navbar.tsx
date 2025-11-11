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

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("housify_landlord");
        router.push("/sign-in");
    };

    return (
        <div
            className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        w-[90%] sm:w-[60%] lg:w-[40%]
        bg-white/60 backdrop-blur-xl
        border border-white/40
        shadow-[0_4px_30px_rgba(0,0,0,0.05)]
        rounded-full
        z-50 flex items-center justify-between
        px-3 sm:px-5 py-2 sm:py-3
        transition-all duration-300
      "
        >
            {/* Logo only (no text) */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
                <Image src="/logo.png" alt="Housify Logo" width={28} height={28} priority />
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex items-center justify-center gap-3 flex-1">
                {LANDLORD_NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.href;

                    return (
                        <button
                            key={item.name}
                            onClick={() => router.push(item.href)}
                            className={cn(
                                "group flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-neutral-600 hover:text-primary hover:bg-primary/10"
                            )}
                        >
                            <Icon
                                size={20}
                                strokeWidth={1.8}
                                className={isActive ? "text-white" : "text-neutral-600 group-hover:text-primary"}
                            />
                            <span
                                className={cn(
                                    "hidden md:inline font-medium",
                                    isActive ? "text-white" : "text-neutral-700"
                                )}
                            >
                                {item.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Mobile Menu (Sheet Trigger) */}
            <div className="flex sm:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-neutral-100 transition">
                            <Menu size={22} className="text-neutral-700" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="
              bg-white/60 backdrop-blur-2xl border-t border-white/40
              shadow-[0_-8px_30px_rgba(0,0,0,0.1)] rounded-t-2xl
              transition-all duration-300
            "
                    >
                        {/* Accessible Header */}
                        <SheetHeader>
                            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                        </SheetHeader>

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <Image src="/logo.png" alt="Logo" width={28} height={28} />
                            </div>
                            <SheetClose asChild>
                                <button className="p-2 rounded-md hover:bg-neutral-100 transition">
                                    <X size={20} />
                                </button>
                            </SheetClose>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pb-6">
                            {LANDLORD_NAV_LINKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            router.push(item.href);
                                            setIsSheetOpen(false);
                                        }}
                                        className="flex flex-col items-center justify-center gap-1 text-sm text-neutral-700 hover:text-primary transition"
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
                    className="flex flex-col sm:flex-row items-center sm:gap-2 px-3 py-2 rounded-full transition-all hover:bg-primary/10"
                >
                    {landlord?.avatar ? (
                        <Image
                            src={landlord.avatar}
                            width={28}
                            height={28}
                            alt="Avatar"
                            className="rounded-full"
                        />
                    ) : (
                        <UserCircle className="text-primary" size={24} />
                    )}
                    <span className="hidden sm:inline text-sm font-medium text-neutral-700">
                        {landlord?.name?.split(" ")[0] || "Profile"}
                    </span>
                </button>

                {isDropdownOpen && (
                    <div
                        className="
              absolute bottom-14 right-0 w-48
              bg-white/60 backdrop-blur-xl border border-white/30
              shadow-[0_8px_25px_rgba(0,0,0,0.08)]
              rounded-xl py-2 z-50
            "
                    >
                        {LANDLORD_PROFILE_DROPDOWN.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() =>
                                        item.isLogout ? handleLogout() : router.push(item.href)
                                    }
                                    className={cn(
                                        "flex items-center gap-2 w-full px-4 py-2 text-sm transition",
                                        item.isLogout
                                            ? "text-red-600 hover:bg-red-50"
                                            : "text-neutral-700 hover:bg-primary/10"
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
