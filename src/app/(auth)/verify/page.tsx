"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import * as React from "react";
import { ShieldCheck } from "lucide-react";

export default function Verify() {
    const [loading, setLoading] = React.useState(true);
    const [otp, setOtp] = React.useState(Array(6).fill(""));
    const [resendTimer, setResendTimer] = React.useState(30);
    const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        if (resendTimer > 0) {
            const countdown = setInterval(() => {
                setResendTimer((t) => t - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [resendTimer]);

    // Handle OTP change
    const handleChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < otp.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Handle resend click
    const handleResend = () => {
        setResendTimer(30);
        setOtp(Array(6).fill(""));
    };

    // Skeleton loading (matches sign-in layout)
    if (loading) {
        return (
            <div className="flex flex-col items-center w-full animate-pulse">
                <Skeleton className="h-14 w-14 rounded-full bg-neutral-200" />
                <Skeleton className="mt-4 h-6 w-48 bg-neutral-200" />
                <div className="mt-10 w-full px-6">
                    <div className="mx-auto w-full max-w-xl rounded-2xl overflow-hidden border border-neutral-200/60 bg-white backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
                        <div className="p-10 space-y-8">
                            <Skeleton className="h-4 w-64 bg-neutral-200 mx-auto" />
                            <div className="flex justify-center gap-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className="h-14 w-14 bg-neutral-200 rounded-md"
                                    />
                                ))}
                            </div>
                            <Skeleton className="h-10 w-48 bg-primary/60 mx-auto" />
                        </div>
                    </div>
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
                    priority
                />
                <h1 className="mt-4 text-2xl font-semibold text-neutral-800">
                    Verify Your Account
                </h1>
                <p className="text-white mt-2 text-sm">
                    Enter the 6-digit code sent to your email or phone
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
                        {/* OTP Inputs */}
                        <div className="flex justify-center gap-3">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => {
                                        inputsRef.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="
                                        h-14 w-14 text-center text-xl font-medium text-neutral-800
                                        bg-white/70 border border-neutral-300
                                        focus:ring-2 focus:ring-primary focus:border-primary/60
                                        rounded-lg transition-all
                                    "
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <Button
                            onClick={() => console.log("OTP:", otp.join(""))}
                            className="w-full bg-primary text-white hover:brightness-95 text-md"
                        >
                            <ShieldCheck size={18} className="mr-2" />
                            Verify Account
                        </Button>

                        {/* Resend OTP */}
                        <div className="text-center text-sm text-neutral-600">
                            {resendTimer > 0 ? (
                                <p>
                                    You can resend the code in{" "}
                                    <span className="font-medium text-primary">
                                        {resendTimer}s
                                    </span>
                                </p>
                            ) : (
                                <button
                                    onClick={handleResend}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Resend Code
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
