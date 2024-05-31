import Image from 'next/image'
import React from 'react'
import { ContactUS } from '@/utils/alljsonfile/contactus'
import Link from 'next/link'
import { useWindowSize } from '@/hooks/useWindowSize'
import MapDestop from '../../../../../public/assets/mapfram.svg'
import MapMobile from '../../../../../public/assets/mobile-map.svg'

const GetInThouch = () => {
  const size = useWindowSize()

  const style = {
    backgroundImage: `url(${MapDestop.src})`,
    width: '100%',
    height: '550px'
  }

  const style2 = {
    backgroundImage: `url(${MapMobile.src})`,
    width: '100%',
    height: '100vh'
  }

  return (
    <>
      <div className=' container  mx-auto max-[991px]:max-w-full md:px-16 px-20 pb-[50px] max-[576px]:pb-0 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[991px]:px-0 '>
        <div className='company-text relative'>
          <h2 className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[320px]:text-[20px] font-semibold text-center  pb-5 '>
            Get in touch with us
          </h2>
        </div>
      </div>

      <div
        style={size.width <= 767 ? style2 : style}
        className='p-8 2xl:px-20  bg-cover bg-no-repeat flex items-center sm:justify-end max-[479px]:px-4'>
        <div className='bg-white rounded-lg p-4 2xl:w-[25%] lg:w-[35%] max-[991px]:w-[45%] max-[834px]:w-[55%] max-[576px]:w-full'>
          <div>
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex  items-start gap-[1.5em]'>
                <div className='w-[100px] h-[100px] max-[576px]:w-[65px] max-[576px]:h-[65px] location-icon-form'>
                  <Image src={ContactUS?.locicon} alt='image' width={100} height={100} className='w-full    pb-3 ' />
                </div>
                <p className='leading-[24px] text-[15px] max-[576px]:text-[13px] text-[#222] mb-2'>
                  {ContactUS.meetsub}
                </p>
              </div>
              <div className='flex  items-start max-[479px]:items-center gap-3'>
                <div className='w-[40px] h-[40px] contactinfo-icon-resolve'>
                  <Image
                    src={ContactUS?.callicon}
                    alt='image'
                    width={100}
                    height={100}
                    className='w-full h-full   pb-3 '
                  />
                </div>
                
                <div>
                  <Link
                    href='tel:+91 7412933933'
                    className='leading-[29px] text-[13px] text-[#222] mb-2'
                    prefetch={false}>
                    {ContactUS.callnumber}
                  </Link>
                  <p className='leading-[24px] text-[15px] max-[576px]:text-[13px] text-[#222] mb-2'>
                    {ContactUS.calltime}
                  </p>
                </div>
              </div>
              <div className='flex  items-start max-[479px]:items-center gap-3'>
                <div className='w-[40px] h-[40px]   contactinfo-icon-resolve'>
                  <Image
                    src={ContactUS?.emailicon}
                    alt='image'
                    width={100}
                    height={100}
                    className='w-full h-full mx-auto pb-3 '
                  />
                </div>
                <div>
                  <Link href='mailto:Customer@banksathi.com' className='leading-[29px] text-[13px] text-[#222] mb-2'>
                    {ContactUS.email}
                  </Link>
                  <p className='leading-[24px] text-[15px] max-[576px]:text-[13px] text-[#222] mb-2'>
                    {ContactUS.anytime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetInThouch
