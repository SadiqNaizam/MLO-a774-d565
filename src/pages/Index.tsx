import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import SalesForecastChart from '@/components/Dashboard/SalesForecastChart';
import DealTypeRadarChart from '@/components/Dashboard/DealTypeRadarChart';
import BalanceOverviewChart from '@/components/Dashboard/BalanceOverviewChart';
import DealsStatusTable from '@/components/Dashboard/DealsStatusTable';
import MyTasksCard from '@/components/Dashboard/MyTasksCard';

/**
 * CRMPage component for the Velzon Dashboard Clone.
 * This page represents the CRM Dashboard Overview, displaying various stats, charts, and tables.
 * It utilizes the AdminLayout for the overall page structure and arranges dashboard-specific
 * components in a responsive grid layout.
 */
const CRMPage: React.FC = () => {
  return (
    <AdminLayout>
      {/* StatsCardGrid is rendered first, taking full width of the content area. */}
      <StatsCardGrid />

      {/* SalesForecastChart and DealTypeRadarChart are displayed side-by-side in a 2-column grid on larger screens. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesForecastChart />
        <DealTypeRadarChart />
      </div>

      {/* BalanceOverviewChart is rendered next, taking the full width. */}
      <BalanceOverviewChart />

      {/* DealsStatusTable and MyTasksCard are displayed side-by-side.
          DealsStatusTable takes 2/3 of the width and MyTasksCard takes 1/3 on larger screens. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DealsStatusTable className="lg:col-span-2" />
        <MyTasksCard className="lg:col-span-1" />
      </div>
    </AdminLayout>
  );
};

export default CRMPage;
