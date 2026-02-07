'use client';
import { FiClock, FiUser, FiHome, FiPlus, FiChevronRight } from 'react-icons/fi';

export default function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: 'user',
      action: 'Nouvel utilisateur enregistré',
      details: 'Doudou Fall (Propriétaire)',
      time: 'Il y a 15 min',
      icon: <FiUser className="text-blue-500" />
    },
    {
      id: 2,
      type: 'property',
      action: 'Bien immobilier ajouté',
      details: 'Appartement Dakar - 200,000 FCFA/mois',
      time: 'Il y a 2 heures',
      icon: <FiHome className="text-green-500" />
    },
    {
      id: 3,
      type: 'system',
      action: 'Mise à jour système',
      details: 'Version 2.3.1 déployée',
      time: 'Hier, 14:30',
      icon: <FiPlus className="text-purple-500" />
    }
  ];

  const activityTypes = {
    user: 'Utilisateur',
    property: 'Bien',
    system: 'Système'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <FiClock className="mr-2 text-gray-600" />
          <span className="text-gray-800">Activité Récente</span>
        </h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
                {activity.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-800 truncate">
                    {activity.action}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                  {activity.details}
                </p>
                
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {activityTypes[activity.type]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 sm:p-4 border-t text-center">
        <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
          Voir toute l'activité
          <FiChevronRight className="ml-1" size={14} />
        </button>
      </div>
    </div>
  );
}