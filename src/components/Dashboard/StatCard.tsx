import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react'; // Example trend icons

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconColor?: string;
  trendDirection?: 'up' | 'down';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: IconComponent,
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
  trendDirection,
  className,
}) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md ${iconBgColor}`}>
            <IconComponent className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-semibold text-card-foreground mt-1">{value}</p>
          </div>
          {trendDirection && (
            <div className="ml-2 flex-shrink-0">
              {trendDirection === 'up' && (
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              )}
              {trendDirection === 'down' && (
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
