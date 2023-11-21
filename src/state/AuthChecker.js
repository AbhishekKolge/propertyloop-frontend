'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

import { checkLoginStatus } from '@/features/auth/authAction';
import { useFirstRender } from '@/hooks/optimization';

const AuthChecker = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { firstRender } = useFirstRender();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const isProtectedPage = pathname.startsWith('/user');

  useEffect(() => {
    firstRender && dispatch(checkLoginStatus());
  }, [dispatch, firstRender]);

  useEffect(() => {
    if (isLoggedIn === false && isProtectedPage) {
      router.replace('/');
    }
  }, [isLoggedIn, router, isProtectedPage]);

  return null;
};

export default AuthChecker;
