'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiBarChart2, 
  FiSettings, 
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiHelpCircle
} from 'react-icons/fi';
import { useState } from 'react';

const adminLinks = [
  { href: '/dashboard/admin', icon: <FiHome size={18} />, label: 'Dashboard' },
  { href: '/dashboard/admin/users', icon: <FiUsers size={18} />, label: 'Utilisateurs' },
  { href: '/dashboard/admin/properties', icon: <FiPackage size={18} />, label: 'Biens immobiliers' },
  { href: '/dashboard/admin/reports', icon: <FiBarChart2 size={18} />, label: 'Analytiques' },
  { href: '/dashboard/admin/settings', icon: <FiSettings size={18} />, label: 'Configuration' }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <div className={`bg-white border-r h-full flex flex-col transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        {expanded ? (
          <h2 className="text-lg font-semibold flex items-center">
            <FiHome className="mr-2" /> Admin Panel
          </h2>
        ) : (
          <div className="w-6 h-6 flex items-center justify-center">
            <FiHome />
          </div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <FiChevronRight className={`transition-transform ${!expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center p-3 rounded-lg mx-1 transition-colors ${
              pathname === link.href
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className={`${expanded ? 'mr-3' : 'mx-auto'}`}>{link.icon}</span>
            {expanded && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        {expanded ? (
          <>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FiUser className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Abdoulaye DIAW</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
            </div>

            <div className="mt-2 space-y-1">

              <a href="/" className="flex items-center p-2 rounded-lg text-red-600 hover:bg-red-50">
                <FiLogOut className="mr-3" /> Déconnexion
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FiUser className="text-blue-600" />
            </div>
            <a href="/" className="p-2 rounded-lg hover:bg-gray-100">
              <FiLogOut className="text-red-600" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}