'use client';

import AppLogo from '@/components/atoms/AppLogo';
import LoginButton from '@/components/molecules/LoginButton';
import LogoutButton from '@/components/molecules/LogoutButton';
import ToScrapPageButton from '@/components/organisms/scrap/ToScrapPageButton';
import useAuth from '@/hooks/useAuth';
import { authAtom, userInfoContext } from '@/utils/userInfoProvider';
import { useAtomValue } from 'jotai';
import React, { useContext } from 'react';
// import AppLogo from '@/views/header/AppLogo';

const Header = () => {
  const { isLogined } = useAuth();
  return (
    <div className="w-full h-full mx-auto flex justify-between items-center">
      <div className="flex items-center justify-center">
        <AppLogo />
      </div>
      <div className="flex justify-end items-center">
        <div className="scrap-link flex justify-end items-center">
          <ToScrapPageButton />
        </div>
        <div className="login-logout ml-[2.5rem] md:ml-[1.25rem]">
          {isLogined ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
};

export default Header;
