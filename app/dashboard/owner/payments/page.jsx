'use client';
import { FiDollarSign, FiFilter, FiSearch, FiDownload, FiPrinter, FiCalendar } from 'react-icons/fi';
import { useState } from 'react';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const payments = [
    { 
      id: 1, 
      tenant: "Abdoulaye Diallo", 
      amount: "750 000 FCFA", 
      date: "05/04/2023", 
      dueDate: "01/04/2023",
      status: "payé", 
      property: "Appartement Dakar",
      method: "Virement"
    },
    { 
      id: 2, 
      tenant: "Mouhamed Ndiaye", 
      amount: "950 000 FCFA", 
      date: "10/04/2023",
      dueDate: "01/04/2023",
      status: "en retard", 
      property: "Maison Almadies",
      method: "Espèces"
    },
    { 
      id: 3, 
      tenant: "Bassirou Touré", 
      amount: "620 000 FCFA", 
      date: "28/03/2023",
      dueDate: "01/03/2023",
      status: "payé", 
      property: "Studio Plateau",
      method: "Mobile Money"
    },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payment.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || true; 
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'payé':
        return <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">Payé</span>;
      case 'en retard':
        return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-medium">En retard</span>;
      case 'en attente':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-medium">En attente</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">Inconnu</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des paiements</h1>
          <p className="text-sm text-gray-500 mt-1">Suivi des loyers et paiements</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <FiDownload className="mr-2" /> Exporter
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <FiPrinter className="mr-2" /> Imprimer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher locataire ou bien..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" />
            <select 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">Toutes dates</option>
              <option value="this_month">Ce mois</option>
              <option value="last_month">Mois dernier</option>
              <option value="overdue">En retard</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous statuts</option>
              <option value="payé">Payés</option>
              <option value="en retard">En retard</option>
              <option value="en attente">En attente</option>
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
                  Montant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date paiement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Méthode
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bien
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
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.tenant}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 flex items-center">
                        <FiDollarSign className="mr-1 text-gray-500" size={14} />
                        {payment.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.date}</div>
                      {payment.status === 'en retard' && (
                        <div className="text-xs text-red-500">Échéance: {payment.dueDate}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.property}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Reçu
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    Aucun paiement trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-3 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-2 sm:mb-0">
            Total: <span className="font-medium">{filteredPayments.length}</span> paiements
          </div>
          <div className="flex space-x-4">
            <div className="text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Payés: <span className="font-medium">
                {filteredPayments.filter(p => p.status === 'payé').length}
              </span>
            </div>
            <div className="text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
              En retard: <span className="font-medium">
                {filteredPayments.filter(p => p.status === 'en retard').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}