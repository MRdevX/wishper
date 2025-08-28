'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/components/button';
import { Avatar } from '@repo/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { useAuthContext } from '@/lib/auth-context';
import { Menu, X, User, LogOut, Settings, Bell, Search } from 'lucide-react';

interface IHeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: IHeaderProps) {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
    setIsDropdownOpen(false);
  };

  const handleSettings = () => {
    router.push('/settings');
    setIsDropdownOpen(false);
  };

  return (
    <header className='sticky top-0 z-30 border-b border-slate-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Mobile Menu Button */}
          <div className='flex items-center lg:hidden'>
            <button
              onClick={onMenuToggle}
              className='rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            >
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className='hidden max-w-md flex-1 lg:block'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                placeholder='Search wishes, wishlists...'
                className='w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder-slate-500 focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500'
              />
            </div>
          </div>

          {/* Right: User Actions */}
          <div className='flex items-center space-x-3'>
            {/* Notifications */}
            <Button variant='ghost' size='sm' className='relative'>
              <Bell className='h-4 w-4' />
              <span className='absolute -right-1 -top-1 h-2 w-2 rounded-full bg-rose-500'></span>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-8 w-8'>
                      <div className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-sm font-medium text-white'>
                        {user.name
                          ? user.name.charAt(0).toUpperCase()
                          : user.email
                            ? user.email.charAt(0).toUpperCase()
                            : 'U'}
                      </div>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                  <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                      {user.name && <p className='font-medium'>{user.name}</p>}
                      <p className='w-[200px] truncate text-sm text-slate-600'>
                        {user.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={handleProfile}>
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettings}>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href='/auth'>
                <Button>Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
