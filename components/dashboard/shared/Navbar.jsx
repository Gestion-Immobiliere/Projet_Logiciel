'use client';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiUser, FiSettings, FiBell, FiHelpCircle } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-3 flex justify-between items-center"> 
        <div>
          <span className="font-semibold text-gray-900 text-lg">Tableau de bord</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <FiBell className="text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiHelpCircle className="text-gray-600" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
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
                      <p className="text-sm font-medium">{user?.name || 'Utilisateur'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                    </div>
                    
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50">
                      <FiUser className="mr-2" /> Profil
                    </Link>
                    
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-gray-50">
                      <FiSettings className="mr-2" /> Paramètres
                    </Link>
                    
                    <button
      onClick={handleLogout}
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
      </div>
    </header>
  );
}