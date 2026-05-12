'use client';

import { siteConfig } from '@/config/site.config';
import { useLayoutStore } from '@/store/layout.store';
import { authClient } from '@/utils/auth-client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { isNavbarOpen, setIsNavbarOpen } = useLayoutStore();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          refetch();
          redirect('/'); // redirect to login page
        },
      },
    });
  }
  return (
    <>
      <header
        className="flex justify-between items-center px-7.5 md:px-15 py-5.5 bg-primary fixed left-0 right-0  border-b-border border-b z-10"
        style={{ height: siteConfig.topbarHeight }}
      >
        <button
          onClick={() => setIsNavbarOpen(true)}
          className="md:hidden  w-6 h-6 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="md:flex gap-7.5 hidden">
          {siteConfig.navItems.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="uppercase text-[14px] hover:text-accent"
            >
              {i.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2.5">
          {!session && !isPending && (
            <Link
              href={'/login'}
              className="uppercase text-[14px] hover:text-accent"
            >
              Вход
            </Link>
          )}
          {session && <p className='hidden md:block'>{session.user.email}</p>}
          {session && (
            <button
              className="uppercase text-[14px] hover:text-accent cursor-pointer"
              onClick={handleSignOut}
            >
              Выйти
            </button>
          )}
        </div>
      </header>
      <div
        className={`${isNavbarOpen ? 'block' : 'hidden'} fixed bg-primary h-full w-full  p-5 flex flex-col z-20`}
      >
        <button className="self-end" onClick={() => setIsNavbarOpen(false)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex flex-col gap-4">
          {siteConfig.navItems.map((i) => (
            <Link
              onClick={() => setIsNavbarOpen(false)}
              key={i.href}
              href={i.href}
              className="uppercase text-[14px] hover:text-accent"
            >
              {i.label}
            </Link>
          ))}
          {session && <p className='text-[14px]'>Вход выполнен: {session.user.email}</p>}
        </div>
      </div>
    </>
  );
}
