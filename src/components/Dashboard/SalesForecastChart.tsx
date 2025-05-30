import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SalesForecastChartProps {
  className?: string;
}

const salesData = [
  {
    name: 'Total Forecasted Value',
    goal: 37000,
    pendingForecast: 12000,
    revenue: 18000,
  },
];

const SalesForecastChart: React.FC<SalesForecastChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('nov-2021');

  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 1000) {
      return `${tickItem / 1000}k`;
    }
    return tickItem.toString();
  };

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Sales Forecast</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-2021">SORT BY: Nov 2021</SelectItem>
            <SelectItem value="monthly">SORT BY: Monthly</SelectItem>
            <SelectItem value="yearly">SORT BY: Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={salesData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={formatYAxis} domain={[0, 'dataMax + 5000']} />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '20px'}} iconType="square" />
              <Bar dataKey="goal" name="Goal" fill="#299CDB" barSize={20} />
              <Bar dataKey="pendingForecast" name="Pending Forecast" fill="#0AB39C" barSize={20} />
              <Bar dataKey="revenue" name="Revenue" fill="#fb923c" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesForecastChart;
