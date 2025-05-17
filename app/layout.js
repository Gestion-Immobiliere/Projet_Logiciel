'use client';
import "./globals.css";
import { usePathname } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

          {!isAdminRoute && <Footer />}

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="border border-[#e0d6cc]"
            bodyClassName="text-[#5d4a3a]"
            progressClassName="bg-[#8d7364]"
          />
        </AuthProvider>
      </body>
    </html>
  );
}