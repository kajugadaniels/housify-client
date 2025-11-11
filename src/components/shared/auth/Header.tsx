import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "../Logo";
import AuthButtons from "./AuthButtons";
import useAuthStore from "@/lib/store/useAuthStore";

/**
 * AuthHeader
 * - Left: Logo (link to home)
 * - Right: Sign in / Sign up buttons (or user menu when authenticated)
 * - Responsive and accessible
 */
const AuthHeader: React.FC = () => {
    const { loading } = useAuthStore();

    return (
        <div className="bg-white/60 backdrop-blur border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/" aria-label="Housify home">
                            <a className="flex items-center gap-3">
                                <Logo className="h-9 w-auto" />
                            </a>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        {loading ? (
                            // show skeleton for loading states (keeps UI stable)
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
