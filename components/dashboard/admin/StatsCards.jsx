import StatCard from '@/components/dashboard/shared/StatCard';

export default function StatsCards() {
  const stats = [
    { title: 'Utilisateurs', value: '1,248', trend: 'up', icon: '👥' },
    { title: 'Biens', value: '893', trend: 'stable', icon: '🏠' },
    { title: 'Revenus', value: '200000000FCFA', trend: 'up', icon: '💶' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}