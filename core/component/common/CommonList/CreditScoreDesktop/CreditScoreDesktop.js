import Image from 'next/image'
import React from 'react'
import creditscroreImage from '../../../../../public/assets/creditscroreImage.svg'
import Link from 'next/link'

const CreditScoreDesktop = ({ sizeData, isCreditRange = false }) => {
  return (
    <div
      className={`${
        isCreditRange
          ? 'w-[40vw] p-[25px]'
          : 'w-[1170px] min-[1445px]:w-full max-[1300px]:w-full max-[1024px]:w-full max-[768px]:w-full px-[40px] py-[23px]'
      }  rounded-3xl bg-[#E9DFF6] mt-[20px] flex !items-center justify-center`}>
      <div className='flex flex-row gap-[60px] items-center'>
        <Image
          src={creditscroreImage}
          width={sizeData?.imgW || 128}
          height={sizeData?.imgH || 120}
          alt='inner circle'
        />
        <div className={`flex flex-col ${isCreditRange ? 'gap-0' : 'gap-[10px]'}`}>
          <div
            className={`text-neutral-800 font-semibold font-['Faktum'] ${
              isCreditRange ? 'text-[15px] leading-[22.5px]' : 'text-2xl  leading-[33.60px] '
            }`}>
            Check Credit Score for Free
          </div>
          <div
            className={`text-neutral-800 font-normal font-['Poppins'] leading-[21px] ${
              isCreditRange ? 'text-[13px] leading-[18.2px]' : 'text-[15px] leading-[21px]'
            }`}>
            Get clear understanding of your creditworthiness & financial health
          </div>
        </div>
        <div className='mt-[20px] text-center mx-auto '>
          <Link href='/cibil-credit-score-check'>
            <button
              className={`bg-[#49D49D] ${
                isCreditRange ? ' w-[110px]' : 'w-[220px]'
              } h-[56px] rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]`}>
              Check Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreditScoreDesktop
