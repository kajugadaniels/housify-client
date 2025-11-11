import {
    Home,
    Building2,
    Users,
    CreditCard,
    BarChart3,
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
        name: "Analytics",
        href: "/landlord/analytics",
        icon: BarChart3,
    },
];
