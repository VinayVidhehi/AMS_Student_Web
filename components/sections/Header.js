import Image from 'next/image'
import React from 'react'
import rvlogo from '../../public/rvcelogo.png'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback} from "@/components/ui/avatar"


const Header= () => {
  const { data: session } = useSession();

  // Extract the first letter of the user's name, or default to 'A'
  const userInitial = session?.user?.name ? session.user.name.charAt(0) : 'A';


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
