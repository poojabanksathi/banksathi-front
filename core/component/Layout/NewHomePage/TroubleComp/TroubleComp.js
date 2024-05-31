import React from 'react'
import troubleicon from '../../../../../public/assets/trouble-icon-new.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const TroubleComp = () => {
  const router = useRouter()
  return (
    <div className='px-[1px]'>
      <div className='flex flex-row items-center justify-center gap-x-[30px] max-[768px]:flex-col max-sm:gap-[20px]'>
        <div className='flex flex-row items-center justify-center gap-[30px] max-sm:gap-[20px]'>
          <Image src={troubleicon} height={75} width={65} alt='icons' priority={true}/>
          <div className="text-neutral-800 text-2xl max-sm:text-neutral-800 max-sm:text-lg max-[768px]:leading-[25.20px] font-medium font-['Poppins'] leading-[33.60px]">
            Having trouble choosing a right product?
          </div>
        </div>
        <div
          onClick={() => {
            router.push('/contact-us')
          }}
          className={`head-text font-[faktum] flex gap-4 px-5 py-2 bg-[#49D49D] rounded-lg max-[771px]:px-3 max-[1200px]:w-[22%]  max-[771px]:w-[131px] max-[576px]:w-[131px] max-[479px]:w-[131px] max-[375px]:w-[131px] max-[320px]:w-[131px] max-[479px]:justify-center ${
            router?.pathname === '/' ? 'contactus-btn-home' : 'contactus-btn'
          }  items-center`}>
          <Link href='/contact-us' prefetch={false}>
            <button className='text-neutral-800 text-[15px] font-semibold font-["Faktum"] cursor-pointer text-[#212529] max-[375px]:text-[14px] font-semibold max-[771px]:text-[15px]'>
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TroubleComp
