// src/app/(auth)/sign-in/page.tsx
"use client";
import React from "react";

function Logo() {
    return (
        <div className="flex flex-col items-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="11" fill="#ECF15E" />
                <path d="M7 12h10M12 7v10" stroke="#0b0b0b" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-gray-800">
                Login to Superlist
            </h1>
        </div>
    );
}

/* Reusable UI Primitives */
function Input({
    id,
    type = "text",
    placeholder,
    icon,
    value,
    onChange,
}: {
    id?: string;
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                {icon}
            </div>
            <input
                id={id}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="w-full rounded-md bg-white border border-gray-200 px-12 py-3 placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ECF15E]/60 transition"
                aria-label={placeholder}
            />
        </div>
    );
}

function Checkbox({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <label className="inline-flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded-sm border-gray-300 focus:ring-1 focus:ring-[#ECF15E]"
            />
            <span>{label}</span>
        </label>
    );
}

function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full py-3 rounded-lg bg-[#ECF15E] text-black font-medium text-lg shadow-md hover:brightness-95 transition"
        >
            {children}
        </button>
    );
}

export default function SignIn() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [remember, setRemember] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="flex flex-col items-center">
            <Logo />

            <div className="mt-10 w-full px-6">
                <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg">
                    <div className="p-8 md:p-10">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log({ username, password, remember });
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm text-gray-600 mb-3">
                                    Username or email
                                </label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username or email"
                                    icon={
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="text-gray-400"
                                        >
                                            <path
                                                d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z"
                                                stroke="currentColor"
                                                strokeWidth="1.2"
                                            />
                                            <path
                                                d="M20 21v-1c0-2.8-3.6-4-8-4s-8 1.2-8 4v1"
                                                stroke="currentColor"
                                                strokeWidth="1.2"
                                            />
                                        </svg>
                                    }
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm text-gray-600">Password</label>
                                    <a href="#" className="text-sm text-[#ECF15E] hover:underline">
                                        Forgot Password?
                                    </a>
                                </div>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        icon={
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="text-gray-400"
                                            >
                                                <path
                                                    d="M17 11V9a5 5 0 10-10 0v2"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
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
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3 3l18 18"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="3"
                                                    stroke="currentColor"
                                                    strokeWidth="1.2"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Checkbox
                                    label="Remember Me"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                            </div>

                            <div>
                                <Button>Log In</Button>
                            </div>

                            <div className="text-center text-sm text-gray-700">
                                Do not have an account?{" "}
                                <a href="#" className="text-[#ECF15E] font-medium hover:underline">
                                    Sign Up
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:14px_14px] opacity-30 h-16" />
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-500 flex items-center gap-3">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-400"
                >
                    <path
                        d="M12 2v20M2 12h20"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                </svg>
                <span>English</span>
            </div>
        </div>
    );
}
