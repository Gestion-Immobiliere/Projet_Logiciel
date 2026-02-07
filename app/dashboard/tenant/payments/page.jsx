'use client';
import { CreditCard, Download, FileText, Filter, Search, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const payments = [
    {
      id: 1,
      reference: "PAY-2023-0456",
      amount: 75000000,
      date: "05/03/2023",
      status: "Complété",
      type: "Loyer",
      method: "Virement",
      receiptUrl: "/receipts/2023-0456.pdf"
    },
    {
      id: 2,
      reference: "PAY-2023-0455",
      amount: 12000000, 
      date: "05/03/2023",
      status: "Complété",
      type: "Charges",
      method: "Virement",
      receiptUrl: "/receipts/2023-0455.pdf"
    },
    {
      id: 3,
      reference: "PAY-2023-0421",
      amount: 750,
      date: "05/02/2023",
      status: "Complété",
      type: "Loyer",
      method: "Prélèvement",
      receiptUrl: "/receipts/2023-0421.pdf"
    },
    {
      id: 4,
      reference: "PAY-2023-0387",
      amount: 75000000,
      date: "05/01/2023",
      status: "Complété",
      type: "Loyer",
      method: "Virement",
      receiptUrl: "/receipts/2023-0387.pdf"
    },
    {
      id: 5,
      reference: "PAY-2023-0386",
      amount: 11000000,
      date: "05/01/2023",
      status: "Complété",
      type: "Charges",
      method: "Virement",
      receiptUrl: "/receipts/2023-0386.pdf"
    },
  ];

  const sortedPayments = [...payments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredPayments = sortedPayments.filter(payment =>
    payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Historique des Paiements</h1>
        <p className="text-gray-600 mt-2">Consultez vos paiements récents et téléchargez vos reçus.</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Rechercher un paiement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Filter className="mr-2" size={16} />
            Filtrer
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('reference')}
                >
                  <div className="flex items-center">
                    Référence
                    <ArrowUpDown className="ml-1" size={14} />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-1" size={14} />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('type')}
                >
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="ml-1" size={14} />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('amount')}
                >
                  <div className="flex items-center">
                    Montant
                    <ArrowUpDown className="ml-1" size={14} />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('method')}
                >
                  <div className="flex items-center">
                    Méthode
                    <ArrowUpDown className="ml-1" size={14} />
                  </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {payment.amount.toFixed(2)} FCFA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 text-gray-400" size={16} />
                        {payment.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Complété' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={payment.receiptUrl}
                        className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                        download
                      >
                        <Download className="mr-1" size={16} />
                        Reçu
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <FileText className="mx-auto text-gray-400" size={40} />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun paiement trouvé</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? "Essayez une autre recherche" : "Vous n'avez effectué aucun paiement pour le moment"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filteredPayments.length}</span> sur{' '}
          <span className="font-medium">{payments.length}</span> résultats
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}