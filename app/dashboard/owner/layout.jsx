'use client';
import OwnerSidebar from './Sidebar';
import Navbar from '@/components/dashboard/owner/Navbar';

export default function OwnerLayout({ children }) {
  return (
      <ProtectedOwnerLayout>{children}</ProtectedOwnerLayout>
  );
}

function ProtectedOwnerLayout({ children }) {

  return (
    <div className="flex h-screen bg-gray-50">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={{ name: 'Abdoulaye DIAW', role: 'owner' }} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}