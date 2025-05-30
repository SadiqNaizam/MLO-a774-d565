import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  BarChart2,
  Users,
  ShoppingCart,
  Bitcoin,
  Briefcase,
  Image as ImageIcon, // Renamed to avoid conflict with HTMLImageElement
  ClipboardList,
  Newspaper,
  AppWindow,
  Layers,
  Lock,
  FileText,
  Rocket,
  ComponentIcon, // Renamed to avoid conflict
  Shapes,
  Puzzle,
  Edit3,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
  badge?: { text: string; type: 'new' | 'hot' };
  children?: NavItemProps[];
  isInitiallyOpen?: boolean;
  onClick?: () => void;
  isChild?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, icon: Icon, active, badge, children, isInitiallyOpen, onClick, isChild }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen || false);
  const hasChildren = children && children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    if (onClick) {
      onClick();
    }
    // If it's a direct link, navigate (actual navigation not implemented here)
    if (!hasChildren && href !== "#") {
      console.log(`Navigating to ${href}`);
    }
  };

  const itemClasses = cn(
    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer',
    'transition-colors duration-150 ease-in-out',
    active
      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    isChild && 'pl-8 pr-3 py-2'
  );

  const badgeClasses = (type: 'new' | 'hot') => {
    switch (type) {
      case 'new':
        return 'bg-green-500 text-white';
      case 'hot':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className={itemClasses} onClick={handleToggle}>
            <Icon className={cn('h-5 w-5', active ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80')} />
            <span className="flex-1">{label}</span>
            {badge && <Badge className={cn('ml-auto text-xs px-1.5 py-0.5', badgeClasses(badge.type))}>{badge.text}</Badge>}
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 pt-1 space-y-1">
          {children.map((child) => (
            <NavItem key={child.label} {...child} isChild />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a href={href} className={itemClasses} onClick={handleToggle}>
      <Icon className={cn('h-5 w-5', active ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80')} />
      <span className="flex-1">{label}</span>
      {badge && <Badge className={cn('ml-auto text-xs px-1.5 py-0.5', badgeClasses(badge.type))}>{badge.text}</Badge>}
    </a>
  );
};

interface NavSectionData {
  title?: string;
  items: NavItemProps[];
}

const navSectionsData: NavSectionData[] = [
  {
    title: 'MENU',
    items: [
      {
        label: 'Dashboards',
        href: '#',
        icon: LayoutDashboard,
        isInitiallyOpen: true,
        children: [
          { label: 'Analytics', href: '/analytics', icon: BarChart2 },
          { label: 'CRM', href: '/crm', icon: Users, active: true },
          { label: 'Ecommerce', href: '/ecommerce', icon: ShoppingCart },
          { label: 'Crypto', href: '/crypto', icon: Bitcoin },
        ],
      },
      { label: 'Projects', href: '/projects', icon: Briefcase },
      { label: 'NFT', href: '/nft', icon: ImageIcon },
      { label: 'Job', href: '/job', icon: ClipboardList },
      { label: 'Blog', href: '/blog', icon: Newspaper, badge: { text: 'New', type: 'new' as const } },
      { label: 'Apps', href: '#', icon: AppWindow, children: [{ label: 'Calendar', href: '/apps/calendar', icon: Users /* Placeholder icon */ }] },
      { label: 'Layouts', href: '#', icon: Layers, badge: { text: 'Hot', type: 'hot' as const }, children: [{ label: 'Horizontal', href: '/layouts/horizontal', icon: Users /* Placeholder icon */}] },
    ],
  },
  {
    title: 'PAGES',
    items: [
      { label: 'Authentication', href: '#', icon: Lock, children: [{label: 'Login', href:'/auth/login', icon: Users}] },
      { label: 'Pages', href: '#', icon: FileText, children: [{label: 'Profile', href:'/pages/profile', icon: Users}] },
      { label: 'Landing', href: '#', icon: Rocket, children: [{label: 'One Page', href:'/landing/onepage', icon: Users}] },
    ],
  },
  {
    title: 'COMPONENTS',
    items: [
      { label: 'Base UI', href: '#', icon: ComponentIcon, children: [{label: 'Alerts', href:'/ui/alerts', icon: Users}] },
      { label: 'Advance UI', href: '#', icon: Shapes, children: [{label: 'Swiper Slider', href:'/ui/swiper', icon: Users}] },
      { label: 'Widgets', href: '/widgets', icon: Puzzle },
      { label: 'Forms', href: '#', icon: Edit3, children: [{label: 'Basic Elements', href:'/forms/basic', icon: Users}] },
    ],
  },
];

const SidebarNav: React.FC = () => {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground flex flex-col shadow-lg z-20">
      <div className="h-[70px] flex items-center justify-center shrink-0 border-b border-sidebar-border">
        <h1 className="text-3xl font-semibold text-white">VELZON</h1>
      </div>

      <div className="p-3 shrink-0">
        <Card className="bg-card text-card-foreground p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm text-card-foreground">Anna Adame</h3>
              <span className="text-xs text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Online
              </span>
            </div>
          </div>
        </Card>
      </div>

      <ScrollArea className="flex-1 mt-1">
        <nav className="p-3 space-y-1">
          {navSectionsData.map((section, sectionIndex) => (
            <div key={section.title || sectionIndex}>
              {section.title && (
                <h2 className="px-3 pt-3 pb-1.5 text-xs uppercase text-sidebar-foreground/70 font-semibold tracking-wider">
                  {section.title}
                </h2>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.label} {...item} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default SidebarNav;
