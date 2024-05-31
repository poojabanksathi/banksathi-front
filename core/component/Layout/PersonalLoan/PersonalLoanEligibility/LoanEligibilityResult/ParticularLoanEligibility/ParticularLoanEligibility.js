import Image from 'next/image'
import React from 'react'
import AlternateProductsList from '../AlternateProductsList/AlternateProductsList'

const ParticularLoanEligibility = ({ alternateProducts, size, isMobile, isTablet, filteredAlternateList }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]'>
        <Image
          src={'/assets/cancel-icon.svg'}
          alt='img'
          width={size?.width > 576 ? 60 : 40}
          height={size?.width > 576 ? 60 : 40}
          className=' '
        />
        {alternateProducts?.length > 0 ? (
          <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
            Oh! You are not eligible for the selected loan at this moment!
          </p>
        ) : (
          <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
            Unfortunately, you are not currently eligible for any loan.
          </p>
        )}
      </div>
      <div className='mt-[40px]'>
        <AlternateProductsList
          size={size}
          isMobile={isMobile}
          isTablet={isTablet}
          filteredAlternateList={filteredAlternateList}
          title='Congratulations! You qualify for these Personal Loans.'
        />
      </div>
    </div>
  )
}

export default ParticularLoanEligibility
