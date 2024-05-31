import Image from 'next/image'
import React from 'react'

const NotEligibleForAny = ({ size }) => {
  return (
    <div className='eligibility-card lg:mt-[30px] mt-[20px]'>
      <div className='pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]   '>
        <Image
          src={'/assets/cancel-icon.svg'}
          alt='img'
          width={size?.width > 576 ? 60 : 40}
          height={size?.width > 576 ? 60 : 40}
          className=' '
        />
        <p className='head-text text-[#212529] max-sm:text-justify text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
          Unfortunately, currently you are not eligible for any Personal Loan.
        </p>
      </div>
    </div>
  )
}

export default NotEligibleForAny
