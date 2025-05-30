import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface BalanceOverviewChartProps {
  className?: string;
}

const balanceData = [
  { month: 'Jan', revenue: 25000, expenses: 18000 },
  { month: 'Feb', revenue: 28000, expenses: 20000 },
  { month: 'Mar', revenue: 45000, expenses: 30000 },
  { month: 'Apr', revenue: 38000, expenses: 32000 },
  { month: 'May', revenue: 52000, expenses: 35000 },
  { month: 'Jun', revenue: 48000, expenses: 33000 },
  { month: 'Jul', revenue: 60000, expenses: 40000 },
  { month: 'Aug', revenue: 55000, expenses: 42000 },
  { month: 'Sep', revenue: 75000, expenses: 48000 },
  { month: 'Oct', revenue: 70000, expenses: 50000 },
  { month: 'Nov', revenue: 85000, expenses: 55000 },
  { month: 'Dec', revenue: 92000, expenses: 60000 },
];

const BalanceOverviewChart: React.FC<BalanceOverviewChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('current-year');

  const totalRevenue = balanceData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = balanceData.reduce((sum, item) => sum + item.expenses, 0);
  const profitRatio = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue * 100).toFixed(1) : '0.0';

  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 1000) {
      return `$${tickItem / 1000}k`;
    }
    return `$${tickItem}`;
  };

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Balance Overview</CardTitle>
          <div className="text-sm text-muted-foreground mt-1 flex space-x-4">
            <span><span className="text-blue-500 font-semibold">${(totalRevenue/1000).toFixed(0)}k</span> Revenue</span>
            <span><span className="text-red-500 font-semibold">${(totalExpenses/1000).toFixed(0)}k</span> Expenses</span>
            <span><span className="text-green-500 font-semibold">{profitRatio}%</span> Profit Ratio</span>
          </div>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-year">SORT BY: Current Year</SelectItem>
            <SelectItem value="last-year">SORT BY: Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={balanceData} margin={{ top: 5, right: 20, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '20px'}} iconType="square" />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0AB39C" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#F06548" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceOverviewChart;
