'use client';
import Link from 'next/link';
import { FiFileText, FiPlus, FiEye, FiEdit, FiMoreHorizontal, FiDownload } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function ContractsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const contracts = [
    { 
      id: 1, 
      tenant: "Fama Sy", 
      property: "Appartement Dakar", 
      endDate: "15/06/2024", 
      status: "Actif",
      amount: "150,000 FCFA/mois"
    },
    { 
      id: 2, 
      tenant: "Mbaye Fall", 
      property: "Maison Plateau", 
      endDate: "30/09/2023", 
      status: "À renouveler",
      amount: "250,000 FCFA/mois"
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Gestion des contrats</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{contracts.length} contrats trouvés</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link 
            href="/dashboard/owner/contracts/create" 
            className="flex items-center justify-center sm:justify-start bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm w-full sm:w-auto"
          >
            <FiPlus className="mr-1 sm:mr-2" /> 
            <span>Nouveau contrat</span>
          </Link>
        </div>
      </div>

      {/* Tableau responsive */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Locataire
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Bien
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Échéance
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">
                Statut
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50">
                {/* Colonne Locataire (toujours visible) */}
                <td className="px-4 sm:px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{contract.tenant}</div>
                  <div className="text-xs text-gray-500 sm:hidden mt-1">{contract.property}</div>
                  <div className="text-xs text-gray-500 sm:hidden mt-1">{contract.amount}</div>
                </td>

                {/* Colonne Bien (cachée sur mobile) */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900">{contract.property}</div>
                  <div className="text-xs text-gray-500">{contract.amount}</div>
                </td>

                {/* Colonne Date */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contract.endDate}</div>
                </td>

                {/* Colonne Statut (cachée sur très petits écrans) */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden xs:table-cell">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    contract.status === "Actif" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {contract.status}
                  </span>
                </td>

                {/* Colonne Actions */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center space-x-2">
                    <Link 
                      href={`/dashboard/owner/contracts/${contract.id}`}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Voir contrat"
                    >
                      <FiEye size={18} />
                    </Link>
                    <Link
                      href={`/dashboard/owner/contracts/edit/${contract.id}`}
                      className="text-indigo-600 hover:text-indigo-900 p-1 hidden sm:inline-block"
                      title="Modifier"
                    >
                      <FiEdit size={18} />
                    </Link>
                    <button
                      className="text-gray-600 hover:text-gray-900 p-1 hidden sm:inline-block"
                      title="Télécharger"
                    >
                      <FiDownload size={18} />
                    </button>
                    {isMobile && (
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <FiMoreHorizontal size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pied de tableau responsive */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-gray-500">
          Affichage de 1 à {contracts.length} contrats
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-xs sm:text-sm">
            Précédent
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs sm:text-sm">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}