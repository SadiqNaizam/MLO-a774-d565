import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DealTypeRadarChartProps {
  className?: string;
}

const dealTypeData = [
  { subject: '2016', Pending: 85, Loss: 40, Won: 65, fullMark: 100 },
  { subject: '2017', Pending: 70, Loss: 55, Won: 80, fullMark: 100 },
  { subject: '2018', Pending: 60, Loss: 70, Won: 50, fullMark: 100 },
  { subject: '2019', Pending: 90, Loss: 25, Won: 75, fullMark: 100 },
  { subject: '2020', Pending: 50, Loss: 45, Won: 85, fullMark: 100 },
  { subject: '2021', Pending: 75, Loss: 30, Won: 90, fullMark: 100 },
];

const DealTypeRadarChart: React.FC<DealTypeRadarChartProps> = ({ className }) => {
  const [sortBy, setSortBy] = React.useState<string>('monthly');

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Deal Type</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">SORT BY: Monthly</SelectItem>
            <SelectItem value="yearly">SORT BY: Yearly</SelectItem>
            <SelectItem value="all-time">SORT BY: All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '20px'}} iconType="square" />
              <Radar name="Pending" dataKey="Pending" stroke="#fb923c" fill="#fb923c" fillOpacity={0.6} />
              <Radar name="Loss" dataKey="Loss" stroke="#F06548" fill="#F06548" fillOpacity={0.6} />
              <Radar name="Won" dataKey="Won" stroke="#0AB39C" fill="#0AB39C" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealTypeRadarChart;
