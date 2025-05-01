'use client';
import { useState } from 'react';
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';

export default function UsersTable() {
  const [users] = useState([
    { id: 1, name: 'Admin', email: 'admin@exemple.com', role: 'admin' },
    { id: 2, name: 'Propriétaire', email: 'owner@exemple.com', role: 'owner' },
    { id: 3, name: 'Locataire', email: 'tenant@exemple.com', role: 'tenant' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                  <div className="sm:hidden text-xs text-gray-500 mt-1">
                    {user.email}
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center space-x-3">
                    <button 
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Éditer"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Supprimer"
                    >
                      <FiTrash2 size={16} />
                    </button>
                    <button className="sm:hidden text-gray-500 hover:text-gray-700 p-1">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
        <div className="hidden sm:block text-sm text-gray-700">
          Affichage de <span className="font-medium">1</span> à <span className="font-medium">{users.length}</span> utilisateurs
        </div>
        <div className="text-xs sm:text-sm text-gray-500 sm:text-gray-700 mt-2 sm:mt-0">
          Total: {users.length} utilisateurs
        </div>
      </div>
    </div>
  );
}