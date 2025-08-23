'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Button } from '@repo/ui/components/button';
import { Home, Gift, List, User, Settings, Plus, Heart, X } from 'lucide-react';

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

export function DashboardLayout({ children }: IDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-40 lg:hidden' onClick={() => setSidebarOpen(false)}>
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className='flex h-16 items-center justify-between border-b border-slate-200 px-6'>
          <Link href='/dashboard' className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500'>
              <Heart className='h-4 w-4 text-white' />
            </div>
            <span className='text-xl font-bold text-slate-900'>Wishper</span>
          </Link>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setSidebarOpen(false)}
            className='lg:hidden'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        <nav className='mt-6 px-3'>
          <div className='space-y-1'>
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`
                    mr-3 h-5 w-5
                    ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500'}
                  `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className='mt-8 border-t border-slate-200 pt-6'>
            <h3 className='px-3 text-xs font-semibold uppercase tracking-wider text-slate-500'>
              Quick Actions
            </h3>
            <div className='mt-3 space-y-1'>
              <Link
                href='/wishlists/new'
                className='group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
                onClick={() => setSidebarOpen(false)}
              >
                <Plus className='mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500' />
                New Wishlist
              </Link>
              <Link
                href='/wishes/new'
                className='group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
                onClick={() => setSidebarOpen(false)}
              >
                <Plus className='mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500' />
                New Wish
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className='lg:pl-64'>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isMenuOpen={sidebarOpen} />
        <main className='py-6'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  );
}
