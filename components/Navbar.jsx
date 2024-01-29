"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from "next/link"
import { useUser } from '@auth0/nextjs-auth0/client'


const Navbar = () => {
  const { user } = useUser();
  const router = useRouter()
  const src = user?.picture
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex justify-between px-20 py-4 items-center">
      <Image 
          src='/logo.png'  
          onClick={() => router.push('/')}
          width={50}
          height={50}
          className='object-contain'
          alt="logo"
        />

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        { user ? (
          <div className='flex gap-3 md:gap-5'>
          <Link href='/create-post' className='black_btn'>
            Create Post
          </Link>

          <Link href="/api/auth/logout" className='black_btn'>
            LogOut
          </Link>

          <Link href='/profile'>
            <Image
              loader={()=>src}
              src={src}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
            />
          </Link>
        </div>
        ) : (
          <Link href='/api/auth/login' className='black_btn'>
            Login
          </Link>
        )}
      </div>
      
      {/* Mobile Navigation */}
      
      <div className='sm:hidden flex relative'>
        {user ? (
          <div className='flex'>
              <Image
                loader={()=>src}
                src={src}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    router.push('/api/auth/logout')
                  }}
                  className='mt-5 w-full black_btn'
                >
                  LogOut
                </button>
              </div>
            )}

          </div>
        ) : (
          <Link href='/api/auth/login' className='black_btn'>
            Login
          </Link>
        )}
      </div>
      
      
      
    </nav>
  )
}

export default Navbar


{/* <nav className="flex justify-between px-20 py-4 items-center">
        <Image 
          src='/logo.png'  
          onClick={() => router.push('/')}
          height="50"
          width="50"
          alt="logo"
        />
        {!user ? 
        (<div className="flex items-center">
            <ul className="flex items-center space-x-6">
            <Link className="button font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md cursor-pointer" href="/api/auth/login">Login</Link>
            </ul>
        </div>):
        (<div className="flex items-center">
            <ul className="flex items-center space-x-6">
              <Link className="button font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md cursor-pointer" href="./create-post">Create</Link>
              <Link className="button font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md cursor-pointer" href="/api/auth/logout">Logout</Link>
            </ul>
        </div>)
        }
    </nav> */}