'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Gift, List, Settings, Menu, X } from 'lucide-react';
import { Button } from '../button';
import { Separator } from '../separator';
import { ToastProvider } from './toast';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Wishes', href: '/admin/wishes', icon: Gift },
  { name: 'Wishlists', href: '/admin/wishlists', icon: List },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface IAdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AdminLayout({ children, title, description }: IAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <ToastProvider>
      <div className='min-h-screen bg-gray-50'>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 z-40 bg-black/20 lg:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-200 ease-in-out lg:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex h-full flex-col'>
            <div className='flex h-16 items-center justify-between border-b border-gray-200 px-6'>
              <h1 className='text-lg font-semibold text-gray-900'>Wishper Admin</h1>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSidebarOpen(false)}
                className='h-8 w-8 p-0'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
            <nav className='flex-1 space-y-1 px-3 py-4'>
              {navigation.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border border-blue-200 bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-4 w-4 ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
          <div className='flex flex-grow flex-col border-r border-gray-200 bg-white'>
            <div className='flex h-16 items-center border-b border-gray-200 px-6'>
              <h1 className='text-lg font-semibold text-gray-900'>Wishper Admin</h1>
            </div>
            <nav className='flex-1 space-y-1 px-3 py-4'>
              {navigation.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'border border-blue-200 bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-4 w-4 ${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <div className='lg:pl-64'>
          {/* Mobile header */}
          <div className='flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setSidebarOpen(true)}
              className='h-8 w-8 p-0'
            >
              <Menu className='h-4 w-4' />
            </Button>
            <h1 className='text-lg font-semibold text-gray-900'>Wishper Admin</h1>
            <div className='w-8' />
          </div>

          {/* Content area */}
          <main className='p-4 lg:p-8'>
            {(title || description) && (
              <div className='mb-6'>
                {title && <h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>{title}</h1>}
                {description && <p className='mt-2 text-gray-600'>{description}</p>}
                <Separator className='mt-4' />
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
