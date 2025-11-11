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

    // Optional: subtle 3D tilt effect on hover for large screens
    useEffect(() => {
        const navbar = document.querySelector(".navbar-3d");
        if (!navbar) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = navbar.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (y / rect.height) * -4;
            const rotateY = (x / rect.width) * 4;
            (navbar as HTMLElement).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const resetTilt = () => {
            (navbar as HTMLElement).style.transform = `rotateX(0deg) rotateY(0deg)`;
        };

        navbar.addEventListener("mousemove", handleMouseMove);
        navbar.addEventListener("mouseleave", resetTilt);

        return () => {
            navbar.removeEventListener("mousemove", handleMouseMove);
            navbar.removeEventListener("mouseleave", resetTilt);
        };
    }, []);


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
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between",
                "w-[90%] sm:w-auto lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[45%]",
                "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10",
                "shadow-[0_4px_30px_rgba(0,0,0,0.08)] rounded-full px-3 sm:px-5 py-2 sm:py-3 transition-all duration-300",
                "lg:hover:scale-[1.01] lg:hover:shadow-[0_10px_40px_rgba(83,118,246,0.15)] lg:transition-transform lg:duration-500 lg:ease-out",
                "lg:[transform-style:preserve-3d] lg:[perspective:1000px] lg:hover:[transform:rotateX(1deg)_rotateY(-1deg)]"
            )}
            style={{
                maxWidth: "900px",
            }}
        >
            {/* Logo */}
            <div className="hidden sm:flex items-center gap-2 pl-2 shrink-0 mr-4 group">
                <Image
                    src="/logo.png"
                    alt="Housify Logo"
                    width={28}
                    height={28}
                    loading="lazy"
                    className="transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110"
                />
            </div>

            {/* Nav Links */}
            <div
                className="
          hidden sm:flex items-center justify-start gap-3 flex-1 overflow-x-auto
          scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-thumb-rounded-full
          hover:scrollbar-thumb-neutral-400 scroll-smooth
        "
            >
                {LANDLORD_NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.href;

                    return (
                        <button
                            key={item.name}
                            onClick={() => router.push(item.href)}
                            className={cn(
                                "group flex items-center gap-2 px-3 py-2 rounded-full transition-all text-xs whitespace-nowrap",
                                "hover:translate-y-[-1px] hover:shadow-[0_2px_10px_rgba(83,118,246,0.15)]",
                                isActive
                                    ? "bg-primary text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                                    : "text-neutral-600 hover:text-primary hover:bg-primary/10"
                            )}
                        >
                            <Icon
                                size={14}
                                strokeWidth={1.8}
                                className={isActive ? "text-white" : "text-neutral-600 group-hover:text-primary"}
                            />
                            <span
                                className={cn(
                                    "hidden md:inline font-medium",
                                    isActive ? "text-white" : "text-neutral-700 dark:text-neutral-300"
                                )}
                            >
                                {item.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Mobile Sheet */}
            <div className="flex sm:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            <Menu size={22} className="text-neutral-700 dark:text-neutral-200" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="
              bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl
              shadow-[0_-8px_30px_rgba(0,0,0,0.1)] rounded-t-2xl
              border-t border-white/40 dark:border-white/10
              transition-all duration-300
            "
                    >
                        <SheetHeader>
                            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                        </SheetHeader>

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <Image src="/logo.png" alt="Logo" width={28} height={28} />
                            </div>
                            <SheetClose asChild>
                                <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
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
                                        className="flex flex-col items-center justify-center gap-1 text-sm text-neutral-700 dark:text-neutral-200 hover:text-primary transition"
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
            <div className="relative shrink-0" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen((p) => !p)}
                    className="flex flex-col sm:flex-row items-center sm:gap-2 px-3 py-2 rounded-full transition-all hover:bg-primary/10 dark:hover:bg-primary/20 ml-3"
                >
                    {landlord?.avatar ? (
                        <Image
                            src={landlord.avatar}
                            width={28}
                            height={28}
                            alt="Avatar"
                            className="rounded-full border border-white/40 shadow-[0_0_10px_rgba(83,118,246,0.3)]"
                        />
                    ) : (
                        <UserCircle className="text-primary" size={22} />
                    )}
                    <span className="hidden sm:inline text-xs font-medium text-neutral-700 dark:text-neutral-200">
                        {landlord?.name?.split(" ")[0] || "Profile"}
                    </span>
                </button>

                {isDropdownOpen && (
                    <div
                        className="
              absolute bottom-14 right-0 w-48 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl
              border border-white/30 dark:border-white/10
              shadow-[0_8px_25px_rgba(0,0,0,0.08)] rounded-xl py-2 z-50
              animate-fade-in-up
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
                                            ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-sm"
                                            : "text-neutral-700 dark:text-neutral-200 hover:bg-primary/10 rounded-sm"
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
