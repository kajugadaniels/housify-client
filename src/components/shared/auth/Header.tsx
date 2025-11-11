import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "@/components/shared/Logo";
import AuthButtons from "./AuthButtons";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * AuthHeader
 * - Left: Logo (link to home)
 * - Right: Sign in / Sign up buttons
 * - Includes skeleton loader simulation (mimics loading states)
 */
const AuthHeader: React.FC = () => {
    const [loading, setLoading] = useState(true);

    // Simulate small loading delay (you can remove this later)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white/60 backdrop-blur border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/" aria-label="Housify home">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Logo className="h-9 w-auto" />
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-9 w-24 rounded" />
                                <Skeleton className="h-9 w-24 rounded" />
                            </div>
                        ) : (
                            <AuthButtons />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthHeader;
