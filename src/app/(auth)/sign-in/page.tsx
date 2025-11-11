"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import {
    Eye,
    EyeOff,
    Lock,
    LockKeyholeOpen,
    User,
} from "lucide-react";

// Import landlords data (mocked local DB)
import data from "@/data.json"; // ✅ make sure this file exists in your `src` directory

export default function SignIn() {
    const [loading, setLoading] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        remember: true,
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // ------------------------------------------------------------
    // Handle Login Logic
    // ------------------------------------------------------------
    const handleLogin = async () => {
        const { username, password } = formData;

        if (!username || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API latency
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check credentials in landlords
            const landlord = data.landlords.find(
                (l) =>
                    (l.email.toLowerCase() === username.toLowerCase() ||
                        l.name.toLowerCase() === username.toLowerCase()) &&
                    l.password === password
            );

            if (!landlord) {
                toast.error("Invalid credentials. Please try again.");
                setIsSubmitting(false);
                return;
            }

            // Save landlord to localStorage
            localStorage.setItem("housify_landlord", JSON.stringify(landlord));

            toast.success(`Welcome back, ${landlord.name.split(" ")[0]}! 👋`);

            // Delay redirect for UX smoothness
            setTimeout(() => {
                router.push("/landlord/dashboard");
            }, 1200);
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ------------------------------------------------------------
    // Skeleton loader (exact layout matching the final form)
    // ------------------------------------------------------------
    if (loading) {
        return (
            <div className="flex flex-col items-center w-full animate-pulse">
                <Skeleton className="h-14 w-14 rounded-full bg-neutral-200" />
                <Skeleton className="mt-4 h-6 w-48 bg-neutral-200" />

                <div className="mt-10 w-full px-6">
                    <div className="mx-auto w-full max-w-xl rounded-2xl overflow-hidden border border-neutral-200/60 bg-white backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
                        <div className="p-8 md:p-10 space-y-6">
                            <Skeleton className="h-4 w-36 bg-neutral-200" />
                            <Skeleton className="h-11 w-full bg-neutral-200" />
                            <Skeleton className="h-4 w-24 bg-neutral-200" />
                            <Skeleton className="h-11 w-full bg-neutral-200" />
                            <Skeleton className="h-5 w-32 bg-neutral-200" />
                            <Skeleton className="h-11 w-full bg-primary/60" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------
    // Main Sign-In Form
    // ------------------------------------------------------------
    return (
        <div className="flex flex-col items-center">
            {/* Logo + Title */}
            <div className="flex flex-col items-center">
                <Image src="/logo.png" width="56" height="56" alt="Logo" priority />
                <h1 className="mt-4 text-2xl font-semibold text-neutral-800">
                    Login to Housify
                </h1>
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
                    <div className="p-8 md:p-10 space-y-6">
                        {/* Username */}
                        <div>
                            <Label htmlFor="username" className="text-neutral-700">
                                Email or Name
                            </Label>
                            <div className="mt-2 relative">
                                <Input
                                    id="username"
                                    placeholder="Enter your email or name"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        })
                                    }
                                    className="pl-10 bg-white/80 border-neutral-300 text-neutral-800"
                                />
                                <User
                                    className="absolute left-3 top-3 text-neutral-400"
                                    size={18}
                                    strokeWidth={1.5}
                                />
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
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="pl-10 bg-white/80 border-neutral-300 text-neutral-800"
                                />
                                <Lock
                                    className="absolute left-3 top-3 text-neutral-400"
                                    size={18}
                                    strokeWidth={1.5}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-800 transition"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} strokeWidth={1.5} />
                                    ) : (
                                        <Eye size={18} strokeWidth={1.5} />
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
                                        setFormData({
                                            ...formData,
                                            remember: Boolean(checked),
                                        })
                                    }
                                />
                                <Label htmlFor="remember" className="text-neutral-700">
                                    Remember Me
                                </Label>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            onClick={handleLogin}
                            disabled={isSubmitting}
                            className={`w-full text-sm transition ${isSubmitting
                                    ? "bg-primary/70 cursor-not-allowed"
                                    : "bg-primary hover:brightness-95"
                                } text-white`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                                    Logging in...
                                </span>
                            ) : (
                                <>
                                    <LockKeyholeOpen size={16} className="mr-2" />
                                    Login
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
