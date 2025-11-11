import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import useAuthStore from "@/lib/store/useAuthStore";

/**
 * AuthButtons
 * Handles authenticated and unauthenticated states:
 * - If not authenticated: show Sign In & Sign Up CTA
 * - If authenticated: show user avatar with menu (profile, sign out)
 *
 * Reusable and small so it can be used anywhere.
 */
const AuthButtons: React.FC = () => {
    const { isAuthenticated, user, signOut } = useAuthStore();

    const handleSignOut = () => {
        signOut();
        toast.success("Signed out successfully");
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/auth/signin">
                    <a>
                        <Button variant="ghost" className="px-4 py-2">
                            Sign in
                        </Button>
                    </a>
                </Link>

                <Link href="/auth/signup">
                    <a>
                        <Button className="px-4 py-2">Sign up</Button>
                    </a>
                </Link>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    aria-label="Open user menu"
                    className="flex items-center gap-2 focus:outline-none"
                >
                    <Avatar>
                        <img src={user?.avatar || "/avatar-placeholder.png"} alt={user?.name ?? "User avatar"} />
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <a>Profile</a>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <a>Dashboard</a>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={handleSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AuthButtons;
