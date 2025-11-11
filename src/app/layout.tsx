import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const manropeSans = Manrope({
    variable: "--font-manrope-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Housify — Smart Space & Apartment Rentals",
    description:
        "Housify is a modern rental platform that connects tenants and landlords with simplicity. Discover, book, and manage apartments, rooms, penthouses, and more — secure online payments, complaint management, and real-time updates.",
    icons: {
        icon: "/logo.png",
        shortcut: "/favicon.png",
        apple: "/logo.png",
    },
    openGraph: {
        title: "Housify — Smart Space & Apartment Rentals",
        description:
            "Find and manage rental spaces effortlessly. Housify simplifies renting for tenants and landlords.",
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
        description: "Explore and rent premium apartments and spaces effortlessly with Housify.",
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
                className={`${manropeSans.variable} ${geistMono.variable} antialiased`}
            >
                <Toaster position="top-right" richColors />
                {children}
            </body>
        </html>
    );
}
