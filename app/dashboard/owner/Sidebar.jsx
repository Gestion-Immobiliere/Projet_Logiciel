'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiPackage,
  FiDollarSign,
  FiFileText,
  FiMessageSquare,
  FiSettings, 
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiPlus
} from 'react-icons/fi';
import { useState } from 'react';

const ownerLinks = [
  { href: '/dashboard/owner', icon: <FiHome size={18} />, label: 'Tableau de bord' },
  { href: '/dashboard/owner/properties', icon: <FiPackage size={18} />, label: 'Mes biens' },
  { href: '/dashboard/owner/tenants', icon: <FiUsers size={18} />, label: 'Locataires' },
  { href: '/dashboard/owner/payments', icon: <FiDollarSign size={18} />, label: 'Paiements' },
  { href: '/dashboard/owner/contracts', icon: <FiFileText size={18} />, label: 'Contrats' },
  { href: '/dashboard/owner/messages', icon: <FiMessageSquare size={18} />, label: 'Messages' },
  { href: '/dashboard/owner/settings', icon: <FiSettings size={18} />, label: 'Paramètres' }
];

export default function OwnerSidebar() {
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
            <FiHome className="mr-2" /> Propriétaire
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
        {ownerLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          const showSubmenu = activeSubmenu === link.href && expanded;

          return (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => {
                  if (link.submenu) {
                    e.preventDefault();
                    toggleSubmenu(link.href);
                  }
                }}
                className={`flex items-center p-3 rounded-lg mx-1 transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className={`${expanded ? 'mr-3' : 'mx-auto'}`}>
                  {link.icon}
                </span>
                {expanded && (
                  <>
                    <span className="flex-1">{link.label}</span>
                    {link.submenu && (
                      <FiChevronDown 
                        className={`transition-transform ${showSubmenu ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </>
                )}
              </Link>

              {link.submenu && showSubmenu && (
                <div className="ml-8 mt-1 space-y-1">
                  {link.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`block p-2 pl-4 rounded-lg text-sm ${
                        pathname === subItem.href
                          ? 'bg-blue-100 text-blue-600 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {}
      </nav>

      <div className="border-t p-4">
        {expanded ? (
          <>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FiUser className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Jules SAGNA</p>
                <p className="text-xs text-gray-500">Propriétaire</p>
              </div>
            </div>

            <div className="mt-2 space-y-1">
              <a 
                href="/logout" 
                className="flex items-center p-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                <FiLogOut className="mr-3" /> Déconnexion
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FiUser className="text-blue-600" />
            </div>
            <a href="/logout" className="p-2 rounded-lg hover:bg-gray-100">
              <FiLogOut className="text-red-600" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}