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
    const [isVerifying, setIsVerifying] = React.useState(false);

    // Fake skeleton loader on mount
    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Countdown logic
    React.useEffect(() => {
        if (resendTimer > 0) {
            const countdown = setInterval(() => {
                setResendTimer((t) => t - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [resendTimer]);

    // OTP input handlers
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

    // Reset timer & OTP
    const handleResend = () => {
        setResendTimer(30);
        setOtp(Array(6).fill(""));
    };

    // Verify action simulation
    const handleVerify = async () => {
        setIsVerifying(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsVerifying(false);
        console.log("Verified OTP:", otp.join(""));
    };

    // ------------------------------------------------------------
    // Skeleton loader (matches Sign-In form layout)
    // ------------------------------------------------------------
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

    // ------------------------------------------------------------
    // Main Verify Page
    // ------------------------------------------------------------
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
                <p className="text-neutral-600 mt-2 text-sm">
                    Enter the 6-digit code sent to your email or phone
                </p>
            </div>

            {/* Glass Card */}
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
                                    disabled={isVerifying}
                                    className="
                                        h-14 w-14 text-center text-xl font-medium text-neutral-800
                                        bg-white/80 border border-neutral-300
                                        focus:ring-2 focus:ring-primary focus:border-primary/60
                                        rounded-lg transition-all
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <Button
                            onClick={handleVerify}
                            disabled={resendTimer === 0 ? false : isVerifying || otp.join("").length < 6}
                            className={`
                                w-full text-md transition
                                ${resendTimer > 0
                                    ? "bg-primary text-white hover:brightness-95 text-sm"
                                    : "bg-neutral-400 text-white cursor-not-allowed opacity-80"
                                }
                            `}
                        >
                            {isVerifying ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                                    Verifying...
                                </span>
                            ) : (
                                <>
                                    <ShieldCheck size={18} className="mr-2" />
                                    Verify Account
                                </>
                            )}
                        </Button>

                        {/* Resend OTP Section */}
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
