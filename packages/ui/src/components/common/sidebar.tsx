'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../button';
import { NavigationItem } from './navigation-item';
import { Heart, X, Plus, Sparkles } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
}

interface QuickAction {
  name: string;
  href: string;
  icon: any;
}

interface SidebarProps {
  navigation: NavigationItem[];
  quickActions?: QuickAction[];
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
  brandHref?: string;
}

export function Sidebar({
  navigation,
  quickActions = [],
  isOpen,
  onClose,
  brandName = 'Wishper',
  brandHref = '/dashboard',
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className='fixed inset-0 z-40 lg:hidden' onClick={onClose}>
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity' />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-white to-slate-50 shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:flex-shrink-0 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className='flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6'>
          <Link href={brandHref} className='flex items-center space-x-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg'>
              <Heart className='h-5 w-5 text-white' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold text-slate-900'>{brandName}</span>
              <span className='text-xs text-slate-500'>Wish Management</span>
            </div>
          </Link>
          <Button variant='ghost' size='sm' onClick={onClose} className='lg:hidden'>
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Navigation */}
        <div className='flex h-full flex-col'>
          <nav className='flex-1 px-4 py-6'>
            {/* Main Navigation */}
            <div className='space-y-2'>
              <h3 className='mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Navigation
              </h3>
              {navigation.map(item => (
                <NavigationItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                  isActive={pathname === item.href}
                  onClick={onClose}
                />
              ))}
            </div>

            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className='mt-8'>
                <h3 className='mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                  Quick Actions
                </h3>
                <div className='space-y-2'>
                  {quickActions.map(action => (
                    <NavigationItem
                      key={action.name}
                      name={action.name}
                      href={action.href}
                      icon={action.icon}
                      isActive={pathname === action.href}
                      onClick={onClose}
                      className='border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100'
                    />
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className='border-t border-slate-200 p-4'>
            <div className='flex items-center space-x-2 text-xs text-slate-500'>
              <Sparkles className='h-3 w-3' />
              <span>Making wishes come true</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
