'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiHeart, 
  FiFileText, 
  FiCreditCard, 
  FiMessageSquare,
  FiUser, 
  FiLogOut, 
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiBell
} from 'react-icons/fi';

const tenantLinks = [
  { href: '/dashboard/tenant', icon: <FiHome size={20} />, label: 'Tableau de bord' },
  { href: '/dashboard/tenant/favorites', icon: <FiHeart size={20} />, label: 'Favoris' },
  { href: '/dashboard/tenant/contracts', icon: <FiFileText size={20} />, label: 'Contrats' },
  { href: '/dashboard/tenant/payments', icon: <FiCreditCard size={20} />, label: 'Paiements' },
  { href: '/dashboard/tenant/messages', icon: <FiMessageSquare size={20} />, label: 'Messagerie' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className={`bg-white border-r h-full flex flex-col transition-all duration-300 ${expanded ? 'w-64' : 'w-20'} shadow-sm`}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        {expanded ? (
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiHome className="mr-2 text-blue-600" size={20} />
            <span>Mon Espace</span>
          </h2>
        ) : (
          <div className="w-6 h-6 flex items-center justify-center">
            <FiHome className="text-blue-600" size={20} />
          </div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        >
          {expanded ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {tenantLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${pathname === link.href ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                <span className={`${pathname === link.href ? 'text-blue-600' : 'text-gray-500'}`}>
                  {link.icon}
                </span>
                {expanded && (
                  <span className="ml-3 font-medium">{link.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t p-4">
        {expanded ? (
          <div className="space-y-2">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="relative">
                <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
                  <FiUser size={18} />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium text-gray-800 truncate">Abdoulaye DIAW</p>
                <p className="text-xs text-gray-500 truncate">Locataire</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link 
                href="/settings" 
                className="flex-1 flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <FiSettings size={18} />
              </Link>
              <Link 
                href="/notifications" 
                className="flex-1 flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative"
              >
                <FiBell size={18} />
                <span className="absolute top-1.5 right-1.5 bg-blue-500 text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center"></span>
              </Link>
              <Link 
                href="/" 
                className="flex-1 flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-50"
              >
                <FiLogOut size={18} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <FiUser size={18} />
              </div>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center"></span>
            </div>
            <Link 
              href="/notifications" 
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative"
            >
              <FiBell size={18} />
              <span className="absolute top-1 right-1 bg-blue-500 text-white text-[8px] rounded-full h-2 w-2 flex items-center justify-center"></span>
            </Link>
            <Link 
              href="/" 
              className="p-2 rounded-lg text-red-500 hover:bg-red-50"
            >
              <FiLogOut size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}