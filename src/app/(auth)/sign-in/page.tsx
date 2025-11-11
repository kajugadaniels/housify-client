"use client";

import React from "react";

function Logo() {
    return (
        <div className="flex flex-col items-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="11" fill="#ECF15E" />
                <path d="M7 12h10M12 7v10" stroke="#0b0b0b" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">Login to Superlist</h1>
        </div>
    );
}

/* Small shadcn-like UI primitives (self-contained so project doesn't need external package) */
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
            <div className="absolute inset-y-0 left-4 flex items-center opacity-60">{icon}</div>
            <input
                id={id}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="w-full rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-16 py-3 placeholder:text-neutral-400 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#ECF15E]/60 transition"
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
        <label className="inline-flex items-center gap-3 text-sm text-neutral-200 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded-sm border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] focus:ring-1 focus:ring-[#ECF15E]"
            />
            <span>{label}</span>
        </label>
    );
}

function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full py-3 rounded-lg bg-[#ECF15E] text-black font-medium text-lg shadow-[0_6px_18px_rgba(236,241,94,0.12)] hover:brightness-95 transition"
        >
            {children}
        </button>
    );
}

/* Main Page */
export default function SignIn() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [remember, setRemember] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="flex flex-col items-center">
            <Logo />

            <div className="mt-10 w-full px-6">
                {/* Card */}
                <div className="mx-auto w-full max-w-xl rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.04)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.00)_100%)] backdrop-blur-md drop-shadow-lg">
                    {/* inside content with dotted pattern bottom */}
                    <div className="p-8 md:p-10">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // placeholder: handle submit
                                console.log({ username, password, remember });
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm text-neutral-300 mb-3">Username or email</label>
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
                                            className="text-neutral-300"
                                        >
                                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M20 21v-1c0-2.8-3.6-4-8-4s-8 1.2-8 4v1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    }
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm text-neutral-300">Password</label>
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
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M17 11V9a5 5 0 10-10 0v2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <rect x="3" y="11" width="18" height="10" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                                            </svg>
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-4 top-3.5 text-neutral-300 opacity-80 hover:opacity-100"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 3l18 18" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Checkbox label="Remember Me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                            </div>

                            <div>
                                <Button>Log In</Button>
                            </div>

                            <div className="text-center text-sm text-neutral-300">
                                Do not have an account?{" "}
                                <a href="#" className="text-[#ECF15E] font-medium hover:underline">
                                    Sign Up
                                </a>
                            </div>
                        </form>
                    </div>

                    {/* dotted bottom pattern */}
                    <div className="bg-[linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)] bg-[length:14px_14px] opacity-30 h-16" />
                </div>
            </div>

            {/* small language selector and bottom spacing to match screenshot */}
            <div className="mt-8 text-sm text-neutral-400 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
                    <path d="M12 2v20M2 12h20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>English</span>
            </div>
        </div>
    );
}
