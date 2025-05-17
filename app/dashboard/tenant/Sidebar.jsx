'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiHeart, 
  FiFileText, 
  FiCreditCard, 
  FiMessageSquare,
  FiUser, 
  FiLogOut, 
  FiChevronRight,
  FiSettings,
  FiBell,
  FiChevronDown
} from 'react-icons/fi';
import { useState } from 'react';

const tenantLinks = [
  { 
    href: '/dashboard/tenant', 
    icon: <FiHome size={18} />, 
    label: 'Tableau de bord' 
  },
  {
    href: '/dashboard/tenant/properties',
    icon: <FiHome size={18} />,
    label: 'Propriétés',
  },
  { 
    href: '/dashboard/tenant/favorites', 
    icon: <FiHeart size={18} />, 
    label: 'Favoris',
  },
  { 
    href: '/dashboard/tenant/contracts', 
    icon: <FiFileText size={18} />, 
    label: 'Contrats',
  },
  { 
    href: '/dashboard/tenant/payments', 
    icon: <FiCreditCard size={18} />, 
    label: 'Paiements' 
  },
  { 
    href: '/dashboard/tenant/messages', 
    icon: <FiMessageSquare size={18} />, 
    label: 'Messagerie' 
  }
];

export default function TenantSidebar() {
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
            <FiHome className="mr-2" /> Locataire
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
        {tenantLinks.map((link) => {
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
      </nav>

      <div className="border-t p-4">
        {expanded ? (
          <>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiUser className="text-blue-600" />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Abdoulaye DIAW</p>
                <p className="text-xs text-gray-500">Locataire</p>
              </div>
            </div>

            <div className="mt-2 flex space-x-2">
              <Link
                href="/dashboard/tenant/settings"
                className="flex-1 flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <FiSettings />
              </Link>
              <Link
                href="/dashboard/tenant/notifications"
                className="flex-1 flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative"
              >
                <FiBell />
                <span className="absolute top-1.5 right-1.5 bg-blue-500 text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center"></span>
              </Link>
              <a 
                href="/logout" 
                className="flex-1 flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                <FiLogOut />
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="bg-blue-100 p-2 rounded-full">
                <FiUser className="text-blue-600" />
              </div>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center"></span>
            </div>
            <Link
              href="/dashboard/tenant/notifications"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative"
            >
              <FiBell />
              <span className="absolute top-1 right-1 bg-blue-500 text-white text-[8px] rounded-full h-2 w-2 flex items-center justify-center"></span>
            </Link>
            <a 
              href="/logout" 
              className="p-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <FiLogOut />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}