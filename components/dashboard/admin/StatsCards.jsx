import StatCard from '@/components/dashboard/shared/StatCard';

export default function StatsCards() {
  const stats = [
    { 
      title: 'Utilisateurs', 
      value: '1,248', 
      trend: 'up', 
      icon: '👥',
      change: '+12%'
    },
    { 
      title: 'Biens', 
      value: '893', 
      trend: 'stable', 
      icon: '🏠',
      change: '0%'
    },
    { 
      title: 'Revenus', 
      value: '200,000 FCFA', 
      trend: 'up', 
      icon: '💶',
      change: '+5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          {...stat}
          className={
            index === stats.length - 1 ? 
            'sm:col-span-2 lg:col-span-1' : 
            ''
          }
        />
      ))}
    </div>
  );
}