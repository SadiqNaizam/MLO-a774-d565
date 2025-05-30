import React from 'react';
import StatCard from './StatCard';
import { BellRing, DollarSign, Activity, CreditCard, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardGridProps {
  className?: string;
}

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  const stats = [
    {
      title: 'CAMPAIGN SENT',
      value: '197',
      icon: BellRing,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-500',
      // No trend indicator visible for this one in the image
    },
    {
      title: 'ANNUAL PROFIT',
      value: '$489.4k',
      icon: DollarSign,
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      trendDirection: 'up' as const,
    },
    {
      title: 'LEAD CONVERSATION',
      value: '32.89%',
      icon: Activity,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-500',
      trendDirection: 'down' as const,
    },
    {
      title: 'DAILY AVERAGE INCOME',
      value: '$1,596.5',
      icon: CreditCard,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-500',
      trendDirection: 'up' as const,
    },
    {
      title: 'ANNUAL DEALS',
      value: '2,659',
      icon: Heart,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-500',
      trendDirection: 'down' as const,
    },
  ];

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6', className)}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
          trendDirection={stat.trendDirection}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
