'use client';
import { Bell, LogOut, User, ChevronDown, Home } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center md:hidden">
            <Link href="/dashboard/tenant" className="text-lg font-bold flex items-center">
              <Home className="mr-2" size={20} />
              <span>Locataire</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <h1 className="text-lg font-bold text-gray-900">Espace Locataire</h1>
            <nav className="flex space-x-4">
              <Link 
                href="/dashboard/tenant" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/dashboard/tenant' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Locataire
              </Link>
              <Link 
                href="/dashboard/tenant/contracts" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/dashboard/tenant/contracts' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Mes contrats
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="text-blue-600" size={16} />
                </div>
                <span className="hidden md:inline text-sm font-medium">{user?.name || 'Mon compte'}</span>
                <ChevronDown className={`hidden md:inline transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">Locataire</p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mon profil
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Paramètres
                  </Link>
                  <Link 
                    href="/" 
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="mr-2" size={16} />
                    Déconnexion
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}