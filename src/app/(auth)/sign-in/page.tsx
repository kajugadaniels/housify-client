"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function SignIn() {
    const [loading, setLoading] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        remember: true,
    });

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center w-full">
                <Skeleton className="h-12 w-12 rounded-full bg-neutral-200" />
                <Skeleton className="mt-6 h-8 w-48 bg-neutral-200" />
                <div className="mt-10 w-full max-w-xl p-10 rounded-2xl border bg-white/70 backdrop-blur-md space-y-4">
                    <Skeleton className="h-10 w-full bg-neutral-200" />
                    <Skeleton className="h-10 w-full bg-neutral-200" />
                    <Skeleton className="h-12 w-full bg-primary/50" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            {/* Logo + Title */}
            <div className="flex flex-col items-center">
                <Image
                    src="/logo.png"
                    width="56"
                    height="56"
                    alt="Logo"
                />
                <h1 className="mt-4 text-2xl font-semibold text-neutral-800">
                    Login to Housify
                </h1>
            </div>

            {/* Card */}
            <div className="mt-10 w-full px-6">
                <div className="mx-auto w-full max-w-xl rounded-2xl overflow-hidden border border-neutral-200 bg-white/70 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                    <div className="p-8 md:p-10 space-y-6">
                        {/* Username */}
                        <div>
                            <Label htmlFor="username" className="text-neutral-700">
                                Username or email
                            </Label>
                            <div className="mt-2 relative">
                                <Input
                                    id="username"
                                    placeholder="Username or email"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    className="pl-10 bg-white border-neutral-300 text-neutral-800"
                                />
                                <span className="absolute left-3 top-3 text-neutral-400">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="text-neutral-400"
                                    >
                                        <path
                                            d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M20 21v-1c0-2.8-3.6-4-8-4s-8 1.2-8 4v1"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-neutral-700">
                                    Password
                                </Label>
                                <Link
                                    href="/forget-password"
                                    className="text-sm text-primary font-medium hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="mt-2 relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="pl-10 bg-white border-neutral-300 text-neutral-800"
                                />
                                <span className="absolute left-3 top-3 text-neutral-400">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="text-neutral-400"
                                    >
                                        <path
                                            d="M17 11V9a5 5 0 10-10 0v2"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <rect
                                            x="3"
                                            y="11"
                                            width="18"
                                            height="10"
                                            rx="2"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                        />
                                    </svg>
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-800"
                                >
                                    {showPassword ? (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M3 3l18 18" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.2"
                                        >
                                            <path
                                                d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                                                strokeLinecap="round"
                                            />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={formData.remember}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, remember: Boolean(checked) })
                                    }
                                />
                                <Label htmlFor="remember" className="text-neutral-700">
                                    Remember Me
                                </Label>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            className="w-full bg-primary text-white hover:brightness-95 text-md"
                            onClick={() => console.log(formData)}
                        >
                            Log In
                        </Button>

                        <div className="text-center text-sm text-neutral-600">
                            Do not have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="text-primary font-medium hover:underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[14px_14px] opacity-40 h-16" />
                </div>
            </div>
        </div>
    );
}
