'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../button';
import { NavigationItem } from './navigation-item';
import { Heart, X, Plus } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: any; // LucideIcon type
}

interface QuickAction {
  name: string;
  href: string;
  icon: any; // LucideIcon type
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
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:flex-shrink-0 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className='flex h-16 items-center justify-between border-b border-slate-200 px-6'>
          <Link href={brandHref} className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500'>
              <Heart className='h-4 w-4 text-white' />
            </div>
            <span className='text-xl font-bold text-slate-900'>{brandName}</span>
          </Link>
          <Button variant='ghost' size='sm' onClick={onClose} className='lg:hidden'>
            <X className='h-4 w-4' />
          </Button>
        </div>

        <nav className='mt-6 px-3'>
          <div className='space-y-1'>
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
            <div className='mt-8 border-t border-slate-200 pt-6'>
              <h3 className='px-3 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Quick Actions
              </h3>
              <div className='mt-3 space-y-1'>
                {quickActions.map(action => (
                  <NavigationItem
                    key={action.name}
                    name={action.name}
                    href={action.href}
                    icon={action.icon}
                    isActive={pathname === action.href}
                    onClick={onClose}
                  />
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
