"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import * as React from "react";
import {
    CheckCircle2,
    XCircle,
    Lock,
    Eye,
    EyeOff,
    KeyRound,
} from "lucide-react";

export default function SetPassword() {
    const [loading, setLoading] = React.useState(true);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [showRequirements, setShowRequirements] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const requirements = [
        { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
        { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
        { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
        { label: "One number", test: (p: string) => /[0-9]/.test(p) },
        { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
    ];

    const isPasswordValid = requirements.every((req) => req.test(password));
    const isMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("New Password:", password);
        setIsSubmitting(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center w-full animate-pulse">
                <Skeleton className="h-14 w-14 rounded-full bg-neutral-200" />
                <Skeleton className="mt-4 h-6 w-48 bg-neutral-200" />
                <div className="mt-10 w-full px-6">
                    <div className="mx-auto w-full max-w-xl rounded-2xl overflow-hidden border border-neutral-200/60 bg-white backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
                        <div className="p-10 space-y-6">
                            <Skeleton className="h-4 w-48 bg-neutral-200" />
                            <Skeleton className="h-11 w-full bg-neutral-200" />
                            <Skeleton className="h-4 w-32 bg-neutral-200" />
                            <Skeleton className="h-11 w-full bg-neutral-200" />
                            <Skeleton className="h-10 w-48 bg-primary/60 mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            {/* Header */}
            <div className="flex flex-col items-center">
                <Image
                    src="/logo.png"
                    width="56"
                    height="56"
                    alt="Logo"
                    priority
                />
                <h1 className="mt-4 text-2xl font-semibold text-neutral-800">
                    Set New Password
                </h1>
                <p className="text-neutral-600 mt-2 text-sm">
                    Create a strong password to secure your account
                </p>
            </div>

            {/* Card */}
            <div className="mt-10 w-full px-6">
                <div
                    className="
                        mx-auto w-full max-w-xl rounded-2xl overflow-hidden
                        bg-white backdrop-blur-2xl
                        shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                        ring-1 ring-white/40
                        transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                    "
                >
                    <div className="p-10 space-y-8">
                        {/* Password Input */}
                        <div>
                            <Label htmlFor="password" className="text-neutral-700">
                                Password
                            </Label>
                            <div className="mt-2 relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setShowRequirements(true)}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10 bg-white border-neutral-300 text-neutral-800"
                                />
                                <Lock
                                    className="absolute left-3 top-3 text-neutral-400"
                                    size={18}
                                    strokeWidth={1.5}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-800 transition"
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} strokeWidth={1.5} />
                                    ) : (
                                        <Eye size={18} strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>

                            {/* Live Requirements */}
                            {showRequirements && (
                                <div className="mt-4 space-y-2 text-xs">
                                    {requirements.map((req, index) => {
                                        const valid = req.test(password);
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-2 transition-colors ${valid
                                                        ? "text-green-600"
                                                        : "text-neutral-500"
                                                    }`}
                                            >
                                                {valid ? (
                                                    <CheckCircle2
                                                        size={14}
                                                        className="text-green-600"
                                                    />
                                                ) : (
                                                    <XCircle
                                                        size={14}
                                                        className="text-neutral-400"
                                                    />
                                                )}
                                                <span>{req.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Label htmlFor="confirm-password" className="text-neutral-700">
                                Confirm Password
                            </Label>
                            <div className="mt-2 relative">
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Re-enter your password"
                                    className="pl-10 pr-10 bg-white border-neutral-300 text-neutral-800"
                                />
                                <Lock
                                    className="absolute left-3 top-3 text-neutral-400"
                                    size={18}
                                    strokeWidth={1.5}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-800 transition"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} strokeWidth={1.5} />
                                    ) : (
                                        <Eye size={18} strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>

                            {confirmPassword && (
                                <p
                                    className={`mt-2 text-xs font-medium transition ${isMatch
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {isMatch
                                        ? "Passwords match"
                                        : "Passwords do not match"}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            onClick={handleSubmit}
                            disabled={!isPasswordValid || !isMatch || isSubmitting}
                            className={`w-full text-sm transition ${!isPasswordValid || !isMatch
                                    ? "bg-neutral-400 text-white cursor-not-allowed opacity-80"
                                    : "bg-primary text-white hover:brightness-95"
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                                    Setting Password...
                                </span>
                            ) : (
                                <>
                                    <KeyRound size={18} className="mr-2" />
                                    Set Password
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
