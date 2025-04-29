'use client';
import { useState } from 'react';
import Navbar from '@/components/dashboard/shared/Navbar';
import Sidebar from '@/components/dashboard/tenant/Sidebar';
import { Toaster } from '@/components/ui/toaster';

export default function TenantLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          user={{ name: 'Locataire', role: 'tenant' }}
          onMenuToggle={toggleSidebar} 
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}