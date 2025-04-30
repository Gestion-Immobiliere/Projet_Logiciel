'use client';
import { FiSearch, FiUsers,FiUser, FiPhone, FiMail, FiHome, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

const tenantsData = [
  {
    id: 1,
    name: "Babacar FALL",
    email: "babacar@gmail.com",
    phone: "06 12 34 56 78",
    property: "Appartement T2 Paris",
    rent: "750 000 FCFA",
    status: "actif",
    entryDate: "15/01/2023"
  },
  {
    id: 2,
    name: "Souleymane DIOP",
    email: "souley@gmail.com",
    phone: "07 23 45 67 89",
    property: "Maison Lyon",
    rent: "620 000 FCFA",
    status: "actif",
    entryDate: "01/03/2023"
  },
  {
    id: 3,
    name: "Nafissatou SOW",
    email: "nafissatou.sow@gmail.com",
    phone: "06 98 76 54 32",
    property: "Studio Marseille",
    rent: "480 000 FCFA",
    status: "en retard",
    entryDate: "10/05/2023"
  },
];

export default function TenantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const tenantsPerPage = 5;

  const filteredTenants = tenantsData.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.phone.includes(searchTerm);
    
    const matchesFilter = filter === 'all' || 
                         tenant.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirstTenant, indexOfLastTenant);
  const totalPages = Math.ceil(filteredTenants.length / tenantsPerPage);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'actif':
        return <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">Actif</span>;
      case 'en retard':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full">En retard</span>;
      case 'résilié':
        return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full">Résilié</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded-full">Inconnu</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Gestion des locataires</h1>
        <Link 
          href="/dashboard/owner/tenants/add" 
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="mr-2" /> Ajouter un locataire
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un locataire..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">Statut :</label>
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="actif">Actifs</option>
              <option value="en retard">En retard</option>
              <option value="résilié">Résiliés</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Locataire
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bien loué
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loyer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTenants.length > 0 ? (
                currentTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                          <div className="text-sm text-gray-500">Entré le {tenant.entryDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.email}</div>
                      <div className="text-sm text-gray-500">{tenant.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.rent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(tenant.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/dashboard/owner/tenants/edit/${tenant.id}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                        >
                          <FiEdit className="h-5 w-5" />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                          onClick={() => confirm('Supprimer ce locataire ?')}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    Aucun locataire trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredTenants.length > tenantsPerPage && (
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Précédent
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Suivant
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">{indexOfFirstTenant + 1}</span> à <span className="font-medium">
                    {Math.min(indexOfLastTenant, filteredTenants.length)}
                  </span> sur <span className="font-medium">{filteredTenants.length}</span> locataires
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Première page</span>
                    «
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Précédent</span>
                    ‹
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page 
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Suivant</span>
                    ›
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Dernière page</span>
                    »
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}