'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, LogOut, Menu, X, LogIn, UserPlus, Star, HomeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/properties', label: 'Explorer', icon: Search },
  { href: '/favorites', label: 'Favoris', icon: Heart },
];

const linkVariants = cva(
  'flex items-center gap-3 transition-colors duration-200',
  {
    variants: {
      active: {
        true: 'text-primary-600 font-semibold',
        false: 'text-gray-700 hover:text-primary-500'
      },
      variant: {
        default: 'px-4 py-2.5 rounded-lg',
        mobile: 'w-full px-5 py-3.5 rounded-lg text-base'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90'}
      border-b ${scrolled ? 'border-gray-100' : 'border-transparent'}
    `}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            onClick={() => setMobileMenuOpen(false)}
            
          >
            <img src="/Dakar.png" alt="Logo" className="h-6 w-6" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700 transition-all"
            >
              
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text ">
              DakarImmo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkVariants({ active: isActive(link.href) })}
                >
                  <Icon className={`h-5 w-5 ${isActive(link.href) ? 'stroke-[2.5]' : ''}`} />
                  <span>{link.label}</span>

                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center border border-primary-100 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 text-primary-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {user?.name || 'Mon compte'}
                  </span>
                </button>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-lg py-2 hidden group-hover:block border border-gray-100 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Mon profil
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Tableau de bord
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors text-sm font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Link
                    href="/auth/register"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all text-sm font-medium  shadow-md shadow-primary-100"
                  >
                    <UserPlus className="h-4 w-4" />
                    Inscription
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 -mr-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu mobile"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-1 py-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={link.href}
                        className={linkVariants({ 
                          active: isActive(link.href), 
                          variant: 'mobile' 
                        })}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className={`h-5 w-5 ${isActive(link.href) ? 'stroke-[2.5]' : ''}`} />
                        {link.label}
                        {}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="border-t border-gray-100 pt-3 pb-4">
                {isAuthenticated ? (
                  <>
                    <div className="px-5 py-3 text-sm font-medium text-gray-700">
                      <p>Connecté en tant que</p>
                      <p className="text-primary-600 truncate">{user?.name || 'utilisateur'}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate">{user?.email}</p>
                    </div>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-5 py-3.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Mon profil
                      </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-5 py-3.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Tableau de bord
                      </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 rounded-lg text-red-600 hover:bg-gray-50 text-left transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        Déconnexion
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/auth/login"
                        className="flex items-center gap-3 px-5 py-3.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="h-5 w-5" />
                        Connexion
                      </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/auth/register"
                        className="flex items-center justify-center gap-2 mt-2 px-5 py-3.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all shadow-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserPlus className="h-5 w-5" />
                        Créer un compte
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}