'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { label: 'Accueil', href: '/dashboard', icon: '🏠' },
  { label: 'Administration', href: '/dashboard/admin', icon: '📊' },
  { label: "Propriétaires", href: '/dashboard/owner', icon: '🏠' },
  { label: "Locataires", href: '/dashboard/tenant', icon: '👥' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-white w-64 min-h-screen shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Tableau de bord</h2>
      </div>

      <nav className="mt-6">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                  pathname === item.href ? 'bg-gray-200' : ''
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}