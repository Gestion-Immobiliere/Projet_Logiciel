'use client';
import { FiHome, FiUser, FiEye, FiEyeOff, FiMoreHorizontal } from 'react-icons/fi';

export default function PropertiesTable() {
  const properties = [
    { id: 1, address: '123 Rue Mermoz, Dakar', owner: 'Lamine Ba', status: 'actif', price: '200,000 FCFA/mois' },
    { id: 2, address: '456 Corniche, Dakar', owner: 'Mamadou Balde', status: 'inactif', price: '150,000 FCFA/mois' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiHome className="mr-1" size={14} />
                  <span>Adresse</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                <div className="flex items-center">
                  <FiUser className="mr-1" size={14} />
                  <span>Propriétaire</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Prix
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map(property => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {property.address}
                  </div>
                  <div className="md:hidden text-xs text-gray-500 mt-1">
                    <FiUser className="inline mr-1" size={12} />
                    {property.owner}
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-900">
                    {property.owner}
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900 font-medium">
                    {property.price}
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center ${
                    property.status === 'actif'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.status === 'actif' ? (
                      <FiEye className="mr-1" size={12} />
                    ) : (
                      <FiEyeOff className="mr-1" size={12} />
                    )}
                    {property.status}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Voir détails"
                    >
                      <FiEye size={16} />
                    </button>
                    <button 
                      className="text-gray-600 hover:text-gray-900 p-1 md:hidden"
                      title="Plus d'options"
                    >
                      <FiMoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
        <div className="text-xs sm:text-sm text-gray-500">
          {properties.length} propriétés trouvées
        </div>
        <div className="mt-2 sm:mt-0">
          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
            Voir plus de propriétés →
          </button>
        </div>
      </div>
    </div>
  );
}