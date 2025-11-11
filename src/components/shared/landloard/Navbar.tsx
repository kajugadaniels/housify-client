"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    Home,
    Building2,
    Users,
    CreditCard,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/landlord/dashboard", icon: Home },
    { name: "Apartments", href: "/landlord/apartments", icon: Building2 },
    { name: "Tenants", href: "/landlord/tenants", icon: Users },
    { name: "Payments", href: "/landlord/payments", icon: CreditCard },
    { name: "Analytics", href: "/landlord/analytics", icon: BarChart3 },
];

const LandlordNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [active, setActive] = useState<string>("");
    const [landlordName, setLandlordName] = useState<string>("");

    useEffect(() => {
        setActive(pathname);
        const storedLandlord = localStorage.getItem("housify_landlord");
        if (storedLandlord) {
            const landlord = JSON.parse(storedLandlord);
            setLandlordName(landlord?.name || "Landlord");
        }
    }, [pathname]);

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
            {navItems.map((item) => {
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
        </div>
    );
};

export default LandlordNavbar;
