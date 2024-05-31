import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Homepage_Section from '@/public/assets/Homepage_Section.svg'

function HomeHeader() {
  const [accordian, setAccordian] = useState(false)
  const objectPositionX = 0
  const objectPositionY = 0
  return (
    <div className=''>
      <nav className='bg-white shadow-xl h-[52px] z-50 dark:bg-white fixed w-full navbar top-0 left-0 '>
        <div className='max-w-screen-xl relative  flex  items-center justify-between mx-auto '>
          <div
            className='flex items-center gap-3
          '>
            {/* <a href='' className=''>
            <Image
              src={Homepage_Section}
              className='h-6 w-auto mr-3 spriteImages home-logo-sprite'
              width={60}
              height={60}
              alt='BankSathi Logo'
            />
          </a> */}
            <Link
              href='/'
              className='spriteImages w-[47px] h-[38px]  bg-no-repeat bg-[1400px 104px] bg-[100px 0]'></Link>
            <Link href='/'>
              <p className='text-black text-[faktum] font-semibold text-center text-[30px] mt-[5px] cursor-pointer'>
                BankSathi
              </p>
            </Link>
          </div>
          <div className='flex md:order-2 h-[36px] items-center py-4'>
            <Link
              target='_blank'
              href='https://click.trackier.io/c/QWpuAnRezz?click_id=click&sub_site_id=BS_Web&pid=qWqjLsqSRK&lbw=7d'>
              <button
                type='button'
                className='text-white flex items-center font-medium rounded-lg text-sm px-6 py-[10px] text-center mr-3 md:mr-0
                    bg-[#49D49D] sm:flex hidden'>
                Download{' '}
                <svg className='w-2 ml-2' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M14.3199 3.32751L-1.02833e-07 17.6474L2.35255 20L16.6725 5.68173L16.6725 18.3013L20 18.3013L20 0L1.69869 7.99975e-07L1.69869 3.32751L14.3199 3.32751Z'
                    fill='white'
                  />
                </svg>
              </button>
            </Link>
            {/* <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false' onClick={()=>{setAccordian(!accordian)}}>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'>
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button> */}
          </div>
          {/* <div className={`items-center justify-between ${accordian ? "" : 'hidden'} w-full md:flex md:w-auto md:order-1`} id='navbar-sticky'>
            <ul
              className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50
                md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white nav-menu'>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-0 pr-2  rounded md:bg-transparent text-[#212529]'
                  aria-current='page'>
                  Products
                </a>
              </li>
              <li>
                <a
                  href='#product-container'
                  className='block py-2 pl-0 pr-2  rounded md:bg-transparent text-[#212529]'
                  aria-current='page'>
                  How it works ?
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-0 pr-2 rounded md:bg-transparent text-[#212529]'
                  aria-current='page'>
                  Contact Us
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </div>
  )
}

export default HomeHeader
