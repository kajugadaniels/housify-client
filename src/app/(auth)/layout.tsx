import AuthHeader from "@/components/shared/auth/Header";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AuthHeader />
            {children}
        </div>
    );
}
