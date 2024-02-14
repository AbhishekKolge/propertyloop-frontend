'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { logoutHandler } from '@/features/auth/authAction';
import { useLogoutMutation } from '@/features/auth/authApiSlice';

import { getInitials } from '@/utils/helper';

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const auth = useSelector((state) => state.auth);
  const isAuthPage = pathname.startsWith('/auth');

  const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();

  const logoutAccountHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(logoutHandler());
      })
      .catch((error) => {
        if (error.data?.msg) {
          toast.error(error.data.msg);
        } else {
          toast.error('Something went wrong!, please try again');
        }
      });
  };

  useEffect(() => {
    setShowSideMenu(false);
  }, [pathname]);

  return (
    <nav className='w-full fixed top-0 inset-x-0 z-10 bg-primary'>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className='text-2xl md:text-4xl'>
          <Link href='/'>Propertyloop</Link>
        </h1>
        <Sheet open={showSideMenu} onOpenChange={setShowSideMenu}>
          <SheetTrigger asChild>
            <Button variant='outline'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Options</SheetTitle>
            </SheetHeader>
            <div className='grid gap-4 py-4'>
              {auth.isLoggedIn === null &&
                (isAuthPage ? (
                  <div className='flex flex-col items-center gap-5'>
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='h-8 w-full' />
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-5'>
                    <Skeleton className='h-[40px] w-[40px] md:h-[100px] md:w-[100px] rounded-full' />
                    <Skeleton className='h-8 w-[120px]' />
                    <Skeleton className='h-8 w-[120px]' />
                    <Skeleton className='h-8 w-full' />
                  </div>
                ))}
  
              {auth.isLoggedIn ? (
                <div className='flex flex-col items-center gap-5'>
                  <Avatar className='md:h-[100px] md:w-[100px]'>
                    <AvatarImage
                      className='object-cover '
                      src={auth.profileImage}
                      alt={`@${auth.name}`}
                    />
                    <AvatarFallback className='uppercase'>
                      {getInitials(auth.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Link href='/user/profile'>Profile</Link>
                  {auth.role === 'landlord' && (
                    <Link href='/user/property'>My Properties</Link>
                  )}
                  {auth.role === 'tenant' && (
                    <Link href='/user/application'>My Applications</Link>
                  )}
                  <Button className='w-full' onClick={logoutAccountHandler}>
                    {logoutIsLoading && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    Logout
                  </Button>
                </div>
              ) : (
                auth.isLoggedIn === false && (
                  <div className='flex flex-col items-center gap-5'>
                    <Link href='/auth/login'>Login</Link>
                    <Link href='/auth/sign-up'>Register</Link>
                  </div>
                )
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
