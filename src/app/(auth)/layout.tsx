import AuthHeader from "@/components/shared/auth/Header";
import Footer from "@/components/shared/Footer";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AuthHeader />
            {children}
            <Footer />
        </div>
    );
}
