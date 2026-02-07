'use client';
import { FileText, Download, Eye, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedContract, setExpandedContract] = useState(null);

  const contracts = [
    {
      id: 1,
      title: "Contrat de location principale",
      type: "Location",
      date: "15/01/2023",
      status: "Actif",
      fileSize: "2.4 MB",
      details: {
        proprietaire: "M. Dupont",
        adresse: "12 Rue de la Paix, Dakar",
        duree: "3 ans (2023-2026)",
        loyer: "750000/mois",
        charges: "120000/mois"
      }
    },
    {
      id: 2,
      title: "État des lieux d'entrée",
      type: "État des lieux",
      date: "20/01/2023",
      status: "Signé",
      fileSize: "1.8 MB",
      details: {
        dateRealisation: "18/01/2023",
        constat: "Bon état général",
        remarques: "Petits trous dans les murs du salon"
      }
    },
    {
      id: 3,
      title: "Contrat d'assurance habitation",
      type: "Assurance",
      date: "10/01/2023",
      status: "Actif",
      fileSize: "3.2 MB",
      details: {
        compagnie: "MAIF",
        numero: "POL12345678",
        couverture: "Tous risques",
        echeance: "10/01/2024"
      }
    }
  ];

  const filteredContracts = contracts.filter(contract =>
    contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleContract = (id) => {
    setExpandedContract(expandedContract === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vos Contrats</h1>
        <p className="text-gray-600 mt-2">Liste des contrats signés avec leurs détails</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Rechercher un contrat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative">
            <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Trier par
              <ChevronDown className="ml-2 -mr-1" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        {filteredContracts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredContracts.map((contract) => (
              <li key={contract.id} className="hover:bg-gray-50 transition-colors">
                <div 
                  className="px-4 py-4 sm:px-6 cursor-pointer"
                  onClick={() => toggleContract(contract.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-blue-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">{contract.title}</p>
                        <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 space-x-3">
                          <span>{contract.type}</span>
                          <span>•</span>
                          <span>{contract.date}</span>
                          <span>•</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contract.status === 'Actif' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {contract.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{contract.fileSize}</span>
                      <ChevronRight className={`text-gray-400 transition-transform ${
                        expandedContract === contract.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                {expandedContract === contract.id && (
                  <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(contract.details).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <p className="font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="mt-1 text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Eye className="mr-2" size={16} />
                        Visualiser
                      </button>
                      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Download className="mr-2" size={16} />
                        Télécharger
                      </button>
                      <Link 
                        href="/dashboard/tenant/messages" 
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Contacter le propriétaire
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-12 text-center">
            <FileText className="mx-auto text-gray-400" size={40} />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun contrat trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Essayez une autre recherche" : "Vous n'avez aucun contrat pour le moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}