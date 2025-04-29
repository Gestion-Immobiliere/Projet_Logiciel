'use client';
import { FiClock, FiUser, FiHome, FiPlus } from 'react-icons/fi';

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
      details: 'Appartement Dakar - 200000/mois',
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
    <div className="bg-white rounded-lg shadow border overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <FiClock className="mr-2" />
          Activité Récente
        </h2>
      </div>
      
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-gray-100 mr-3">
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{activity.action}</h3>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                  {activityTypes[activity.type]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Voir toute l'activité →
        </button>
      </div>
    </div>
  );
}