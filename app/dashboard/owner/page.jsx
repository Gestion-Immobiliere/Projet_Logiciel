'use client';
import { 
  FiHome, 
  FiDollarSign, 
  FiUsers, 
  FiCalendar,
  FiMessageSquare,
  FiChevronRight
} from 'react-icons/fi';

export default function OwnerDashboard() {
  const stats = [
    { 
      title: "Biens immobiliers", 
      value: "12", 
      icon: <FiHome className="text-blue-600" size={20} />,
      trend: "+2 ce mois"
    },
    { 
      title: "Locataires", 
      value: "10", 
      icon: <FiUsers className="text-green-600" size={20} />,
      trend: "3 contrats actifs"
    },
    { 
      title: "Revenus mensuels", 
      value: "8 500 000 FCFA", 
      icon: <FiDollarSign className="text-purple-600" size={20} />,
      trend: "+15% vs mois dernier"
    }
  ];

  const recentPayments = [
    { id: 1, tenant: "A. Diop", amount: "450 000 FCFA", date: "05/11/2023", status: "payé" },
    { id: 2, tenant: "M. Ndiaye", amount: "375 000 FCFA", date: "03/11/2023", status: "payé" }
  ];

  const recentMessages = [
    { id: 1, sender: "M. Ndiaye", content: "Problème de plomberie", date: "04/11/2023" },
    { id: 2, sender: "Service Technique", content: "RDV réparation", date: "02/11/2023" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord propriétaire</h1>
            <p className="text-gray-600">Résumé de votre activité</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FiCalendar className="mr-2" />
            <span>{new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1 text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Derniers paiements</h2>
              <button className="text-blue-600 text-sm flex items-center">
                Voir tout <FiChevronRight className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-3">
              {recentPayments.map(payment => (
                <div key={payment.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{payment.tenant}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{payment.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === "payé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Messages récents</h2>
              <button className="text-blue-600 text-sm flex items-center">
                Voir tout <FiChevronRight className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-3">
              {recentMessages.map(message => (
                <div key={message.id} className="p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-800">{message.sender}</p>
                    <p className="text-sm text-gray-500">{message.date}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 truncate">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}