'use client';
import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { FiDownload } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

const monthlyData = [
  { name: 'Jan', users: 10, properties: 5, visits: 45 },
  { name: 'Feb', users: 15, properties: 8, visits: 62 },
  { name: 'Mar', users: 20, properties: 12, visits: 78 },
  { name: 'Apr', users: 25, properties: 15, visits: 95 },
  { name: 'May', users: 30, properties: 18, visits: 110 },
];

const yearlyData = [
  { name: '2020', users: 80, properties: 45, visits: 320 },
  { name: '2021', users: 120, properties: 68, visits: 450 },
  { name: '2022', users: 180, properties: 95, visits: 620 },
  { name: '2023', users: 240, properties: 130, visits: 850 },
];

export default function ReportsPage() {
  const [isClient, setIsClient] = useState(false);
  const [timeRange, setTimeRange] = useState('monthly');
  const [activeData, setActiveData] = useState(monthlyData);
  const [activeMetrics, setActiveMetrics] = useState(['users', 'properties', 'visits']);

  useEffect(() => {
    setIsClient(true);
    setActiveData(timeRange === 'monthly' ? monthlyData : yearlyData);
  }, [timeRange]);

  const toggleMetric = (metric) => {
    setActiveMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric) 
        : [...prev, metric]
    );
  };

  if (!isClient) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord analytique</h1>
          <p className="text-sm text-gray-500">Performances et statistiques de la plateforme</p>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <FiDownload />
          <span>Exporter</span>
        </Button>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTimeRange('monthly')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${timeRange === 'monthly' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Vue mensuelle
        </button>
        <button
          onClick={() => setTimeRange('yearly')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${timeRange === 'yearly' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Vue annuelle
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['users', 'properties', 'visits'].map(metric => (
          <button
            key={metric}
            onClick={() => toggleMetric(metric)}
            className={`px-3 py-1 text-sm rounded-full border ${
              activeMetrics.includes(metric)
                ? getMetricStyle(metric).selected
                : getMetricStyle(metric).unselected
            }`}
          >
            {getMetricLabel(metric)}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280' }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280' }}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => getMetricLabel(value)}
              />
              
              {activeMetrics.includes('users') && (
                <Bar 
                  dataKey="users" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  name="Utilisateurs"
                />
              )}
              {activeMetrics.includes('properties') && (
                <Bar 
                  dataKey="properties" 
                  fill="#82ca9d" 
                  radius={[4, 4, 0, 0]}
                  name="Biens"
                />
              )}
              {activeMetrics.includes('visits') && (
                <Bar 
                  dataKey="visits" 
                  fill="#ffc658" 
                  radius={[4, 4, 0, 0]}
                  name="Visites"
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeMetrics.map(metric => (
          <div key={metric} className="bg-white p-4 rounded-xl border border-gray-200 h-[250px]">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{getMetricLabel(metric)}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={activeData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Bar 
                  dataKey={metric} 
                  fill={getMetricColor(metric)} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

function getMetricLabel(metric) {
  const labels = {
    users: 'Utilisateurs',
    properties: 'Biens',
    visits: 'Visites'
  };
  return labels[metric] || metric;
}

function getMetricColor(metric) {
  const colors = {
    users: '#8884d8',
    properties: '#82ca9d',
    visits: '#ffc658'
  };
  return colors[metric] || '#8884d8';
}

function getMetricStyle(metric) {
  const styles = {
    users: {
      selected: 'bg-purple-50 border-purple-200 text-purple-700',
      unselected: 'border-gray-200 text-gray-600 hover:bg-gray-50'
    },
    properties: {
      selected: 'bg-green-50 border-green-200 text-green-700',
      unselected: 'border-gray-200 text-gray-600 hover:bg-gray-50'
    },
    visits: {
      selected: 'bg-amber-50 border-amber-200 text-amber-700',
      unselected: 'border-gray-200 text-gray-600 hover:bg-gray-50'
    }
  };
  return styles[metric] || styles.users;
}