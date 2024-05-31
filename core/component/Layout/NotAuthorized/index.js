import React from 'react'
import Image from 'next/image'
import NotAuthorizedImg from '../../../../public/assets/halalnode-401.png'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div className='flex justify-center items-center h-[100vh] bg-[#fff]'>
        <div className='tetx-center px-6'>
          <Image
            src={NotAuthorizedImg}
            alt='img_text'
            className='mx-auto max-w-[500px] w-[100%] max-[771px]:w-3/6 max-[576px]:w-3/4 max-[375px]:w-full'
          />
          <p className='font-bold text-[35px] max-[576px]:text-[30px] max-[425px]:text-[26px] text-center mt-3 text-[#005249]'>
            NOT AUTHORIZED!
          </p>
          <p className=' xl:w-[60%] lg:w-[70%] md:w-[80%]  mx-auto text-[18px] max-[576px]:text-[16px] max-[425px]:text-[14px] text-center mt-2  my-3  text-[#212529]'>
            You are not authorized to access this page
          </p>
          <Link href='/' className='mt-3 ' prefetch={false}>
            <button className='bg-[#49D49D] cursor-pointer flex mx-auto xl:px-4 lg:text-[10px] py-3 px-6 text-[#212529] xl:text-[14px] max-[320px]:text-[12px] sm:text-[12px] text-[14px] rounded-lg'>
              Go back
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
