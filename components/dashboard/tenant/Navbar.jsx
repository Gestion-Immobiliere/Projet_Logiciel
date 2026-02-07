'use client';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function TenantNavbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitial = () => (user?.nom ? user.nom.charAt(0).toUpperCase() : 'U');
  const getFullName = () => user ? `${user.nom} ${user.prenom}` : 'Utilisateur';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-3 flex justify-between items-center"> 
        <span className="font-semibold text-gray-900 text-lg">Locataire</span>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
              {getInitial()}
            </div>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-40"
              >
                <div className="py-1">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium">{getFullName()}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <Link href="/dashboard/tenant/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50">
                    <FiUser className="mr-2" /> Profil
                  </Link>

                  <button
                    onClick={() => { logout(); router.push('/'); }}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                  >
                    <FiLogOut className="mr-2" /> Déconnexion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
