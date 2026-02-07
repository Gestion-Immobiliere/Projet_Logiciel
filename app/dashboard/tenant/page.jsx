'use client';
import { Home, CalendarCheck, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

export default function TenantDashboard() {
  const payments = [
    { id: 1, title: "Loyer Avril", amount: "200 000 FCFA", due: "05/04/2023" }
  ];

  const documents = [
    { id: 1, name: "Contrat de location", date: "15/01/2023" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bonjour, Abdoulaye</h1>
            <p className="text-gray-600">Votre résumé locatif</p>
          </div>
          <button className="p-2 rounded-full bg-white shadow-sm">
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <Home className="text-blue-600" size={20} />
              </div>
              <h2 className="font-semibold text-gray-800">Mon logement</h2>
            </div>
            <p className="text-gray-700 mb-1">Appartement B12, Résidence Les Almadies</p>
            <p className="text-sm text-gray-500">Bail jusqu'au 28/02/2024</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-50 rounded-full">
                <CalendarCheck className="text-green-600" size={20} />
              </div>
              <h2 className="font-semibold text-gray-800">Prochain paiement</h2>
            </div>
            <p className="text-gray-700 mb-1">150 000 FCFA</p>
            <p className="text-sm text-gray-500">Échéance: 05/11/2023</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Paiements</h2>
            <Link href="/paiements" className="text-blue-600 text-sm">Voir tout</Link>
          </div>
          
          <div className="space-y-3">
            {payments.map(payment => (
              <div key={payment.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="text-gray-500" size={18} />
                  <div>
                    <p className="font-medium text-gray-800">{payment.title}</p>
                    <p className="text-sm text-gray-500">À payer avant {payment.due}</p>
                  </div>
                </div>
                <span className="font-semibold">{payment.amount}</span>
              </div>
            ))}
            <button className="w-full text-center text-blue-600 text-sm py-2 hover:bg-blue-50 rounded-lg">
              Payer maintenant
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Documents</h2>
            <Link href="/documents" className="text-blue-600 text-sm">Tous les documents</Link>
          </div>
          
          <div className="space-y-3">
            {documents.map(doc => (
              <Link 
                href={`/documents/${doc.id}`} 
                key={doc.id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="text-gray-500" size={18} />
                <div>
                  <p className="font-medium text-gray-800">{doc.name}</p>
                  <p className="text-sm text-gray-500">Ajouté le {doc.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

       </div>
    </div>
  );
}