import React from "react";
import Image from "next/image";

/**
 * Logo component
 * - Uses next/image for optimized delivery
 * - Keeps visual identity in a single place for easy updates
 *
 * Usage: <Logo className="h-8 w-auto" />
 */
const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Image src="/logo.png" alt="Housify logo" width={36} height={36} />
            <span className="font-semibold text-lg tracking-tight">Housify</span>
        </div>
    );
};

export default Logo;
