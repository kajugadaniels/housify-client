import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Housify — Smart Space & Apartment Rentals",
    description:
        "Housify is a modern rental platform that connects tenants and landlords with simplicity. Discover, book, and manage apartments, rooms, penthouses, and more — all in one professional dashboard with secure online payments, complaint management, and real-time updates.",
    icons: {
        icon: "/logo.png",
        shortcut: "/favicon.ico",
        apple: "/logo.png",
    },
    openGraph: {
        title: "Housify — Smart Space & Apartment Rentals",
        description:
            "Find the perfect space for living or business. Housify simplifies renting and management for both tenants and landlords.",
        url: "https://housify.app",
        siteName: "Housify",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "Housify Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Housify — Smart Space & Apartment Rentals",
        description:
            "Explore and rent premium apartments and spaces effortlessly with Housify.",
        images: ["/logo.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${dmSans.variable} antialiased bg-background text-foreground`}
            >
                {children}
            </body>
        </html>
    );
}
