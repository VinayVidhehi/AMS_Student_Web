'use client'

import React from 'react';
import Header from '@/components/sections/Header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {

  const router = useRouter();


  return (
    <div className='md:p-4 flex flex-col justify-between py-2'>
      <Header />
      <div className='md:w-11/12 border-gray-200 border-2 rounded-sm bg-gray-200 m-auto flex flex-col h-full'>
        <div className='flex md:flex-row flex-col justify-between place-items-center'>
          <div className='md:px-12 md:py-4 px-4 py-8'>
            <p className='py-1 md:mt-8 mt-2 font-medium md:text-2xl'>Knowing your Attendance is now</p>
            <p className='md:text-5xl text-3xl font-extrabold md:font-medium md:py-4 py-2'>Convenient and Quick</p>
          </div>
          <div className='md:px-28'>
            <Button onClick={() => router.push('/signin')}>View Attendance</Button>
          </div>
        </div>
        <div className='md:px-12 py-4 px-2 md:mt-16 mt-12'>
          <p className='md:text-8xl text-5xl font-medium'>Attendance</p>
          <p className='md:text-8xl text-5xl font-medium text-gray-50 bg-gray-900 rounded-sm py-2 w-fit px-2'>Management</p>
          <p className='md:text-8xl text-5xl font-medium'>System</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
