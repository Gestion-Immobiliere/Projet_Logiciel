'use client';
import { Building, CalendarCheck, FileText, Home, Settings, Bell, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TenantDashboard() {
  const upcomingPayments = [
    { id: 1, title: "Loyer Avril", amount: "2000000 FCFA", dueDate: "05/04/2023", urgent: true },
    { id: 2, title: "Charges", amount: "1200000 FCFA", dueDate: "10/04/2023", urgent: false }
  ];

  const recentDocuments = [
    { id: 1, name: "Contrat de location", date: "15/01/2023", type: "contrat" },
    { id: 2, name: "État des lieux", date: "20/01/2023", type: "document" },
    { id: 3, name: "Quittance de loyer", date: "05/03/2023", type: "quittance" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Bienvenue dans votre espace locataire</p>
          </div>
          <button className="flex items-center space-x-2 bg-white p-2 md:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full md:w-auto justify-center">
            <Bell className="text-gray-600" size={20} />
            <span className="text-gray-700 hidden sm:inline">Notifications</span>
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-semibold text-white bg-red-500 rounded-full">3</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Home className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Mon logement</p>
                    <p className="font-medium text-gray-900">Appartement T3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CalendarCheck className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Prochain paiement</p>
                    <p className="font-medium text-gray-900">7500000</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Building className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Propriétaire</p>
                    <p className="font-medium text-gray-900">M. DIALLO</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Paiements à venir</h2>
                <Link href="/paiements" className="text-blue-600 text-sm font-medium flex items-center">
                  Voir tout <ArrowRight className="ml-1" size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingPayments.map(payment => (
                  <div key={payment.id} className={`flex justify-between items-center p-3 rounded-lg ${payment.urgent ? 'bg-red-50 border-l-4 border-red-500' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${payment.urgent ? 'bg-red-100' : 'bg-blue-50'}`}>
                        <FileText className={payment.urgent ? 'text-red-600' : 'text-blue-600'} size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{payment.title}</p>
                        <p className="text-sm text-gray-500">Échéance: {payment.dueDate}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${payment.urgent ? 'text-red-600' : 'text-gray-900'}`}>{payment.amount}</span>
                  </div>
                ))}
                <button className="w-full flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                  <Plus className="mr-1" size={16} />
                  Programmer un paiement
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Documents récents</h2>
                <Link href="/documents" className="text-blue-600 text-sm font-medium flex items-center">
                  Tous <ArrowRight className="ml-1" size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {recentDocuments.map(doc => (
                  <Link 
                    href={`/documents/${doc.id}`} 
                    key={doc.id} 
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      doc.type === 'contrat' ? 'bg-blue-50 text-blue-600' : 
                      doc.type === 'quittance' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Actions rapides</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/signer-document"
                  className="flex flex-col items-center justify-center p-3 space-y-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <span className="text-sm font-medium text-center">Signer un document</span>
                </Link>
                <Link 
                  href="/rendez-vous"
                  className="flex flex-col items-center justify-center p-3 space-y-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                    <CalendarCheck className="text-green-600" size={20} />
                  </div>
                  <span className="text-sm font-medium text-center">Prendre RDV</span>
                </Link>
                <Link 
                  href="/declarer-probleme"
                  className="flex flex-col items-center justify-center p-3 space-y-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <Settings className="text-purple-600" size={20} />
                  </div>
                  <span className="text-sm font-medium text-center">Déclarer problème</span>
                </Link>
                <Link 
                  href="/contact-proprietaire"
                  className="flex flex-col items-center justify-center p-3 space-y-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                    <Building className="text-orange-600" size={20} />
                  </div>
                  <span className="text-sm font-medium text-center">Contacter propriétaire</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}