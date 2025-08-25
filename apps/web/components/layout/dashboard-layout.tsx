'use client';

import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from '@repo/ui/components/common';
import { Home, Gift, List, User, Settings, Plus } from 'lucide-react';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Wishlists', href: '/wishlists', icon: List },
  { name: 'Wishes', href: '/wishes', icon: Gift },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const quickActions = [
  { name: 'New Wishlist', href: '/wishlists/new', icon: Plus },
  { name: 'New Wish', href: '/wishes/new', icon: Plus },
];

export function DashboardLayout({ children }: IDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50 lg:flex'>
      <Sidebar
        navigation={navigation}
        quickActions={quickActions}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className='flex min-w-0 flex-1 flex-col'>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isMenuOpen={sidebarOpen} />
        <main className='flex-1 py-6'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  );
}
