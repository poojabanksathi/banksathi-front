import React, { useEffect } from 'react'
import Image from 'next/image'
import NotFoundImg from '../../../../public/assets/new-not-found.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter();
  useEffect(()=>{
    router.push("/")
  },[])
  return (
    <>
      <div className='flex justify-center items-center h-full pt-[50px] pb-[134px] max-[576px]:pb-[50px] bg-[#F4F8FB] max-[576px]:h-full'>
        <div className='text-center px-6 '>
            <div className='pb-[30px]'>
            <p className='font-bold text-[24px] max-[576px]:text-[24px] max-[425px]:text-[24px] max-[320px]:text-[22px] text-center mt-3 text-[#212529]'>
            Oops! Page not found.
          </p>
          <p className=' xl:w-[60%] lg:w-[70%] md:w-[80%] max-[576px]:w-[85%] max-[390px]:w-full  mx-auto text-[18px] max-[576px]:text-[16px] max-[425px]:text-[14px] text-center mt-2  my-3  text-[#212529] max-[320px]:text-[12px]'>
           Something went wrong. It looks like the link is broken or the page has been removed
          </p>
            </div>


          <Image
            src={NotFoundImg}
            alt='img_text'
            className='mx-auto max-[771px]:w-3/6 max-[576px]:w-3/4 max-[479px]:w-full max-[375px]:w-full'
          />

         <div className='flex items-center justify-center gap-5 pt-[60px] mb-3'>
         <Link href='/' className='mt-3 ' prefetch={false}>
            <button className='bg-[#49D49D] cursor-pointer font-semibold flex mx-auto xl:px-4 lg:text-[10px] py-3 px-6 text-[#212529] xl:text-[15px] max-[320px]:text-[12px] sm:text-[12px] text-[14px] rounded-lg'>
              Home Page
            </button>
          </Link>
         <Link href='/' className='mt-3 ' prefetch={false}>
            <button className='bg-transparent cursor-pointer font-semibold flex mx-auto xl:px-4 lg:text-[10px] py-3 px-6 text-[#212529] xl:text-[15px] max-[320px]:text-[12px] sm:text-[12px] text-[14px] rounded-lg border border-[#212529]'>
              Go Back
            </button>
          </Link>
         </div>
        </div>
      </div>
    </>
  )
}
