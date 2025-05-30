import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-background min-h-screen', className)}>
      <SidebarNav />
      <TopHeader />
      <main 
        className="ml-64 mt-[70px] overflow-y-auto p-6"
        style={{ height: 'calc(100vh - 70px)' }} // Ensures main content scrolls within its viewport area
      >
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
