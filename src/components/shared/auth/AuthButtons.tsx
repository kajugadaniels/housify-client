import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

/**
 * AuthButtons
 * - Shows only Sign In & Sign Up buttons for now
 * - No backend or state management dependencies
 */
const AuthButtons: React.FC = () => {
    return (
        <div className="flex items-center gap-2">
            <Link href="/auth/signin">
                <Button variant="ghost" className="px-4 py-2">
                    Sign in
                </Button>
            </Link>

            <Link href="/auth/signup">
                <Button className="px-4 py-2">Sign up</Button>
            </Link>
        </div>
    );
};

export default AuthButtons;
