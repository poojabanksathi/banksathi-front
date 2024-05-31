import Image from 'next/image'
import React, { useMemo, useRef } from 'react'
import bg1 from '../../../../public/assets/bg1.svg'
import bg2mobile from '../../../../public/assets/bg2mobile.svg'
import bg1mobile from '../../../../public/assets/bg1mobile.svg'
import bg2 from '../../../../public/assets/bg2.svg'
import startIcon from '../../../../public/assets/partnerStarIcon.svg'
import kotakBankIcon from '../../../../public/assets/kotakBank.svg'
import sbiBank from '../../../../public/assets/sbi.svg'
import hdfcBankIcon from '../../../../public/assets/hdfc.svg'
import axisBankIcon from '../../../../public/assets/axis.svg'
import indusBankIcon from '../../../../public/assets/indusbank.svg'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'

const PartnersInfo = dynamic(() => import('@/core/component/Partners/PartnersInfo/PartnersInfo'), {
  ssr: false
})

const Partners = () => {
  const size = useWindowSize()
  const formRef = useRef()

  const windowSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const isDesktop = windowSize >= 776

  const handleScroll = () => {
    formRef?.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }
  return (
    <>
      <div className=''>
        <div className='partners h-auto max-sm:h-auto'>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-center text-white text-[42px] font-semibold mt-[50px] min-[768px]:text-[32px] max-sm:mt-[54px] max-sm:leading-[30px] max-sm:text-[24px] max-sm:mx-[20px]'>
              Collaborate, Thrive & Succeed
              <br />
              Explore Our Partnerships
            </div>
            <div className='text-center text-white text-xl font-semibold mt-[28px] max-sm:mt-[21px] max-sm:leading-[17px] max-[786px]:text-[14px] max-sm:text-[14px] max-sm:mx-[20px]'>
              Empower Every Household Financially with Our Platform. {windowSize >= 768 && <br />}
              Say Goodbye to Confusion and Secure Better Deals!
            </div>
          </div>
          <div className='mt-[24px]'>
            <div
              className={`h-[374px] max-sm:h-[276px] max-[425px]:h-[302px] max-[768px]:h-[422px] max-[1024px]:h-[298px] max-[320px]:h-[276px] ${
                windowSize === 375 ? '!h-[288px]' : ''
              }`}>
              <Image
                src={isDesktop ? bg1 : bg1mobile}
                height=''
                width=''
                alt='bg1'
                className={`bg1media w-[106vw] ${windowSize === 425 ? 'w-[560px]' : ''}`}
              />
              <div
                className={`mediaClass tabClass ${
                  windowSize === 1355 || windowSize === 1366 ? 'w-[11%]' : 'w-fit'
                } h-[54px] bg-slate-100 rounded-[90px] ${
                  windowSize > 1500 ? 'ml-[690px]' : 'ml-[631px]'
                } mr-[640px] relative bottom-[70%] max-sm:bottom-[68%] max-[425px]:bottom-[65%] max-sm:left-[22%] max-sm:mx-[20px] max-[320px]:bottom-[52%] max-[320px]:left-[20%] smallLaptop ${
                  windowSize === 375 ? '!bottom-[65%]' : ''
                }`}>
                <div
                  onClick={() => handleScroll()}
                  className='flex items-start flex-col px-[12px] py-[11px] cursor-pointer'>
                  <div className='text-violet-500 text-[8px] font-semibold uppercase  max-sm:text-[8px] max-sm:leading-[12px]'>
                    Let’s Talk
                  </div>
                  <div className='text-violet-500 text-base font-semibold  max-sm:text-[14px] max-sm:leading-[17px]'>
                    Be Our Partner
                  </div>
                </div>
                <div className='partner-icon'>
                  <Image src={startIcon} height='' width='' alt='bg1' className='' />
                </div>
              </div>
              <div className='text-center text-slate-100 text-sm font-medium relative bottom-[60%] max-[375px]:bottom-[46%] max-[320px]:bottom-[45%] max-sm:bottom-[40%] max-[425px]:bottom-[57%] max-[768px]:bottom-[83%]'>
                Your Trusted Partner in Finance
                <div className='absolute top-[62%] scrollPartnersClass'>
                  <div className='float-left flex gap-[78px] ml-[231px] max-[1024px]:ml-[16px] max-[768px]:ml-[16px] max-sm:mx-[16px] max-sm:gap-[62px]'>
                    <Image src={kotakBankIcon} height='43px' width='161px' alt='kotak bank' />
                    <Image src={sbiBank} height='29px' width='86px' alt='sbi bank' />
                    <Image src={hdfcBankIcon} height='25px' width='145px' alt='hdfc bank' />
                    <Image src={axisBankIcon} height='30px' width='128px' alt='axis bank' />
                    <Image src={indusBankIcon} height='18px' width='174px' alt='indus bank' />
                  </div>
                </div>
                <Image
                  src={isDesktop ? bg2 : bg2mobile}
                  height=''
                  width=''
                  alt='bg2'
                  className={`bg1media w-[106vw] ${windowSize === 425 ? 'w-[560px]' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mid-purple h-auto '>
          <PartnersInfo windowSize={windowSize} formRef={formRef}/>
        </div>
      </div>
    </>
  )
}

export default Partners
