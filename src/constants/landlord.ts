import {
    Home,
    Building2,
    Users,
    CreditCard,
    BarChart3,
    UserCircle,
    Settings,
    LogOut,
} from "lucide-react";

export const LANDLORD_NAV_LINKS = [
    {
        name: "Dashboard",
        href: "/landlord/dashboard",
        icon: Home,
    },
    {
        name: "Apartments",
        href: "/landlord/apartments",
        icon: Building2,
    },
    {
        name: "Tenants",
        href: "/landlord/tenants",
        icon: Users,
    },
    {
        name: "Payments",
        href: "/landlord/payments",
        icon: CreditCard,
    },
    {
        name: "Reports",
        href: "/landlord/reports",
        icon: BarChart3,
    },
];

export const LANDLORD_PROFILE_DROPDOWN = [
    {
        name: "Edit Profile",
        href: "/landlord/profile/edit",
        icon: UserCircle,
    },
    {
        name: "Settings",
        href: "/landlord/settings",
        icon: Settings,
    },
    {
        name: "Logout",
        href: "/sign-in",
        icon: LogOut,
        isLogout: true,
    },
];
