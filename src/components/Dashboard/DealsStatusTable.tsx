import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DealsStatusTableProps {
  className?: string;
}

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRep: {
    name: string;
    avatarUrl?: string;
    fallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'New Lead' | 'Negotiation';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRep: { name: 'Donald Risher', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', fallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRep: { name: 'Sofia Cunha', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', fallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRep: { name: 'Luis Rocha', avatarUrl: 'https://randomuser.me/api/portraits/men/36.jpg', fallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRep: { name: 'Vitoria Rodrigues', avatarUrl: 'https://randomuser.me/api/portraits/women/63.jpg', fallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Tech Solutions Inc.',
    lastContacted: 'Oct 02, 2021',
    salesRep: { name: 'Pedro Alvares', avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg', fallback: 'PA' },
    status: 'Negotiation' as const,
    dealValue: '$210K',
  },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won':
      return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
    case 'Intro Call':
      return 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200';
    case 'Stuck':
      return 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200';
    case 'Negotiation':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200';
    case 'New Lead':
      return 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
  }
};

const DealsStatusTable: React.FC<DealsStatusTableProps> = ({ className }) => {
  const [dateRange, setDateRange] = React.useState<string>('nov-dec-2021');

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Deals Status</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[240px] h-8 text-xs">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="current-month">Current Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium pl-6">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={deal.salesRep.avatarUrl} alt={deal.salesRep.name} />
                      <AvatarFallback>{deal.salesRep.fallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.salesRep.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('font-normal', getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium pr-6">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsStatusTable;
