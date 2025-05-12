'use client';
import "./globals.css";
import { usePathname } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/dashboard');

  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`
        bg-beige text-marron
        min-h-screen flex flex-col
        ${isAdminRoute ? 'admin-mode' : ''}
      `}>
        <AuthProvider>
          {!isAdminRoute && <Navbar />}

          <main className="flex-1">
            {children}
          </main>
          <Toaster/>
          {!isAdminRoute && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}