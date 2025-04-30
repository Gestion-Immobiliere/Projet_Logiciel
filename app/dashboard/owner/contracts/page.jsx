import Link from 'next/link';
import { FiFileText, FiPlus } from 'react-icons/fi';

export default function ContractsPage() {
  const contracts = [
    { id: 1, tenant: "Fama Sy", property: "Appartement ", endDate: "15/06/2024", status: "Actif" },
    { id: 2, tenant: "Mbaye Fall", property: "Maison Dakar", endDate: "30/09/2023", status: "À renouveler" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des contrats</h1>
        <Link href="/dashboard/owner/contracts/create" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FiPlus className="mr-2" /> Nouveau contrat
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locataire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bien</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin de contrat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.tenant}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.property}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    contract.status === "Actif" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/dashboard/owner/contracts/${contract.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                    Voir
                  </Link>
                  <Link href={`/dashboard/owner/contracts/edit/${contract.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}