import Image from 'next/image'
import React from 'react'
import rvlogo from '../../public/rvcelogo.png'
import { useUser } from '@/app/context/useContext'
import { Avatar, AvatarFallback} from "@/components/ui/avatar"


const Header= () => {

  const {user} = useUser();
  // Extract the first letter of the user's name, or default to 'A'
  const userInitial =  user?.given_name[0] ||  'A';


  return (
    <div className='flex flex-row items-center justify-between mb-4 p-2'>
      <Image src={rvlogo} alt="rv logo" className='md:h-16 md:w-16 w-11 h-11'/>
      <p className='md:text-xl'>Dept. of ISE</p>
      <Avatar className='bg-zinc-800' > 
        <AvatarFallback>{userInitial}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default Header
