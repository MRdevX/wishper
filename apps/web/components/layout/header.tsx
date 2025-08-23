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
import { useAuthContext } from '../auth-provider';
import { Heart, Menu, X, User, LogOut, Settings } from 'lucide-react';

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
          {/* Logo and Mobile Menu Button */}
          <div className='flex items-center'>
            <button
              onClick={onMenuToggle}
              className='rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden'
            >
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>

            <Link href='/dashboard' className='ml-2 flex items-center space-x-2 lg:ml-0'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500'>
                <Heart className='h-4 w-4 text-white' />
              </div>
              <span className='text-xl font-bold text-slate-900'>Wishper</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden items-center space-x-8 lg:flex'>
            <Link
              href='/dashboard'
              className='rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900'
            >
              Dashboard
            </Link>
            <Link
              href='/wishlists'
              className='rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900'
            >
              Wishlists
            </Link>
            <Link
              href='/wishes'
              className='rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900'
            >
              Wishes
            </Link>
          </nav>

          {/* User Menu */}
          <div className='flex items-center space-x-4'>
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
