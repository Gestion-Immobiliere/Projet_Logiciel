'use client';
import { FiDownload, FiPlus, FiUsers, FiActivity, FiTrendingUp } from 'react-icons/fi';

export default function AdminDashboard() {
  const stats = [
    { 
      title: "Utilisateurs actifs", 
      value: "142", 
      change: "+12%", 
      icon: <FiUsers className="text-blue-600" size={20} />,
      color: "blue"
    },
    { 
      title: "Activité aujourd'hui", 
      value: "89", 
      change: "+8%", 
      icon: <FiActivity className="text-green-600" size={20} />,
      color: "green"
    }
  ];

  const recentActivities = [
    { id: 1, user: "Admin", action: "a mis à jour les paramètres", time: "2 min ago" },
    { id: 2, user: "M. Diallo", action: "a ajouté un nouveau bien", time: "25 min ago" },
    { id: 3, user: "System", action: "sauvegarde automatique effectuée", time: "1h ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Admin</h1>
            <p className="text-gray-600 mt-1 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Système opérationnel
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="btn-outline flex items-center justify-center py-2 px-4 text-sm">
              <FiDownload className="mr-2" />
              Exporter
            </button>
            <button className="btn-primary flex items-center justify-center py-2 px-4 text-sm">
              <FiPlus className="mr-2" />
              Nouvelle action
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white p-4 rounded-lg border border-${stat.color}-100`}>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Activité récente</h2>
              <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                <option>24 dernières heures</option>
                <option>7 derniers jours</option>
              </select>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <FiUsers className="text-blue-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      <span className="text-gray-800">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-3">Performance</h2>
              <div className="flex items-center justify-between">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">75%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Objectif mensuel</p>
                  <p className="font-medium">15/20 jours</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 mb-3">Actions rapides</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium">
                  Gérer utilisateurs
                </button>
                <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium">
                  Voir logs
                </button>
                <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium">
                  Paramètres
                </button>
                <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          background-color: #3b82f6;
          color: white;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #2563eb;
        }
        .btn-outline {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-outline:hover {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}