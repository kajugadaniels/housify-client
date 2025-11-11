import AuthHeader from "@/components/shared/auth/Header";
import Footer from "@/components/shared/Footer";

/**
 * Layout used specifically for auth routes (sign-in, sign-up, reset password...)
 * Keeps auth pages consistent: header, content area and footer.
 */
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="w-full">
                <AuthHeader />
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
                {children}
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}
