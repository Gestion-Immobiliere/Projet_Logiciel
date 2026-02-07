'use client';
import AdminSidebar from './Sidebar';
import Navbar from '@/components/dashboard/admin/Navbar';

export default function AdminLayout({ children }) {
  return (
      <ProtectedAdminLayout>{children}</ProtectedAdminLayout>
  );
}

function ProtectedAdminLayout({ children }) {

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={{ name: 'Abdoulaye DIAW', role: 'admin' }} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}