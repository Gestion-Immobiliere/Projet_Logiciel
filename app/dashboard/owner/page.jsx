'use client';
import { 
  FiHome, FiDollarSign, FiUsers, FiUser, FiPackage, 
  FiTrendingUp, FiTrendingDown, FiMinus, FiCalendar,
  FiMessageSquare, FiChevronRight
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
  { name: 'Jan', revenus: 4000, contrats: 3 },
  { name: 'Fév', revenus: 3000, contrats: 2 },
  { name: 'Mar', revenus: 5000, contrats: 4 },
  { name: 'Avr', revenus: 2780, contrats: 3 },
  { name: 'Mai', revenus: 1890, contrats: 2 },
  { name: 'Juin', revenus: 6000, contrats: 5 },
];

const recentPayments = [
  { id: 1, tenant: 'Jean Dupont', amount: '750 000 FCFA', date: 'Aujourd\'hui, 10:45', status: 'completed' },
  { id: 2, tenant: 'Marie Lambert', amount: '620 000 FCFA', date: 'Hier, 14:30', status: 'completed' },
  { id: 3, tenant: 'Paul Martin', amount: '800 000 FCFA', date: '12 juin 2023', status: 'pending' },
];

const recentMessages = [
  { id: 1, sender: 'Lucie Bernard', preview: 'Bonjour, je souhaite signaler un problème...', date: '11:30', unread: true },
  { id: 2, sender: 'Service Technique', preview: 'Votre demande d\'intervention a été...', date: 'Hier', unread: false },
  { id: 3, sender: 'Assurance Habitation', preview: 'Votre contrat arrive à échéance le...', date: '10 juin', unread: false },
];

export default function OwnerDashboard() {
  const stats = [
    { 
      title: "Biens gérés", 
      value: "24", 
      icon: <FiPackage size={20} />,
      change: "+12%", 
      trend: "up",
      color: "blue"
    },
    { 
      title: "Locataires", 
      value: "18", 
      icon: <FiUsers size={20} />,
      change: "+5%", 
      trend: "up",
      color: "green"
    },
    { 
      title: "Revenus mensuels", 
      value: "15 000 000 FCFA", 
      icon: <FiDollarSign size={20} />,
      change: "+8%", 
      trend: "up",
      color: "purple"
    },
    { 
      title: "Taux d'occupation", 
      value: "92%", 
      icon: <FiHome size={20} />,
      change: "0%", 
      trend: "stable",
      color: "orange"
    },
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <FiTrendingUp className="mr-1" />;
      case 'down': return <FiTrendingDown className="mr-1" />;
      default: return <FiMinus className="mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <FiCalendar className="text-gray-400" />
          <span className="text-sm text-gray-600">12 juin 2023</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-all">
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-800">{stat.value}</p>
                <div className={`flex items-center mt-2 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {getTrendIcon(stat.trend)}
                  <span>{stat.change} vs mois dernier</span>
                </div>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Performance mensuelle</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
              <span className="text-sm text-gray-600">Revenus</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Contrats</span>
            </div>
            <select className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="revenus" 
                fill="#4f46e5" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
                name="Revenus (k FCFA)"
              />
              <Bar 
                dataKey="contrats" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
                name="Nouveaux contrats"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Derniers paiements</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              Voir tout <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg mr-3 ${
                  payment.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  <FiDollarSign />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{payment.tenant}</h3>
                  <p className="text-xs text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{payment.amount}</p>
                  {payment.status === 'pending' && (
                    <span className="text-xs text-yellow-600">En attente</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Messages récents</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              Voir tout <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg mr-3 ${message.unread ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  <FiUser />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm ${message.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}`}>
                      {message.sender}
                    </h3>
                    <span className={`text-xs ${message.unread ? 'text-blue-600' : 'text-gray-500'}`}>
                      {message.date}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${message.unread ? 'text-gray-800' : 'text-gray-500'}`}>
                    {message.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}