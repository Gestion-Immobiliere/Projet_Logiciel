import StatsCards from '@/components/dashboard/admin/StatsCards';
import RecentActivity from '@/components/dashboard/admin/RecentActivity';
import { FiDownload, FiPlus, FiTrendingUp, FiUsers, FiActivity } from 'react-icons/fi';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Système opérationnel • Dernière mise à jour: aujourd'hui
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="btn-outline flex items-center">
            <FiDownload className="mr-2" />
            Exporter les données
          </button>
          <button className="btn-primary flex items-center">
            <FiPlus className="mr-2" />
            Nouvelle action
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100">
          <StatsCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
              <select className="text-sm border-0 bg-gray-100 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500">
                <option>24 dernières heures</option>
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
              </select>
            </div>
            <RecentActivity />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistiques rapides</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-blue-800 flex items-center">
                        <FiUsers className="mr-2" />
                        Nouveaux utilisateurs
                      </p>
                      <p className="text-2xl font-bold mt-1 text-blue-900">24</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      <FiTrendingUp className="mr-1" />
                      +12%
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-green-800 flex items-center">
                        <FiActivity className="mr-2" />
                        Activité aujourd'hui
                      </p>
                      <p className="text-2xl font-bold mt-1 text-green-900">156</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      <FiTrendingUp className="mr-1" />
                      +8%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Performances</h2>
              <div className="flex items-center justify-between">
                <div className="radial-progress text-blue-600" style={{"--value":85}}>
                  85%
                </div>
                <div className="text-sm text-gray-600">
                  <p>Objectif mensuel</p>
                  <p className="font-medium">23/27 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}