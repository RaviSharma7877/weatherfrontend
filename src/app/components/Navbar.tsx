import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full absolute z-50 border-b border-black h-14 px-7'>
        <div className='w-[10rem] ml-auto flex items-center justify-center h-full'>
            <Button className='mr-2'>Login</Button>
            <Button variant={"ghost"}>SignUp</Button>
        </div>
    </div>
  )
}

export default Navbar