"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LANDLORD_NAV_LINKS } from "@/constants/landlord";
import { cn } from "@/lib/utils";
import { Settings, LogOut, UserCircle } from "lucide-react";
import Image from "next/image";

const LandlordNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [active, setActive] = useState<string>("");
    const [landlord, setLandlord] = useState<{ name?: string; email?: string; avatar?: string }>({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setActive(pathname);
        const storedLandlord = localStorage.getItem("housify_landlord");
        if (storedLandlord) {
            setLandlord(JSON.parse(storedLandlord));
        }
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Logout
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
            {/* Navigation Links */}
            {LANDLORD_NAV_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.href;

                return (
                    <button
                        key={item.name}
                        onClick={() => router.push(item.href)}
                        className={cn(
                            "group flex flex-col sm:flex-row items-center sm:gap-2 px-3 py-2 rounded-full transition-all",
                            isActive
                                ? "bg-primary text-white"
                                : "text-neutral-600 hover:text-primary hover:bg-primary/10"
                        )}
                    >
                        <Icon
                            size={20}
                            strokeWidth={1.8}
                            className={cn(
                                "transition-all duration-300",
                                isActive ? "text-white" : "text-neutral-600 group-hover:text-primary"
                            )}
                        />
                        <span
                            className={cn(
                                "hidden sm:inline text-sm font-medium transition-all",
                                isActive ? "text-white" : "text-neutral-700"
                            )}
                        >
                            {item.name}
                        </span>
                    </button>
                );
            })}

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
              rounded-xl py-2 z-50 animate-in slide-in-from-bottom-2
            "
                    >
                        <button
                            onClick={() => router.push("/landlord/profile/edit")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-primary/10 transition"
                        >
                            <UserCircle size={16} /> Edit Profile
                        </button>
                        <button
                            onClick={() => router.push("/landlord/settings")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-primary/10 transition"
                        >
                            <Settings size={16} /> Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandlordNavbar;
