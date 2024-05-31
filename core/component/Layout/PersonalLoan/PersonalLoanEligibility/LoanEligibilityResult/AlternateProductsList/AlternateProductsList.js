import Image from 'next/image'
import React, { useState } from 'react'
import PersonalLoanCards from '../../../PersonalLoanCards/PersonalLoanCards'

const AlternateProductsList = ({ filteredAlternateList, size, isMobile, isTablet, title, hideCheckEligibleButton }) => {
  const [viewDetailsIndex, setViewDetailsIndex] = useState([])

  return (
    <div>
      <div className='xl:pb-[30px] flex justify-center items-center sm:items-center sm:gap-[30px] max-sm:gap-[12px] lg:mt-[20px]'>
        <Image
          src={'/assets/eligibility-seccess.svg'}
          alt='img'
          width={size?.width > 576 ? 70 : 50}
          height={size?.width > 576 ? 70 : 50}
          className='max-sm:pb-5 '
        />
        <p className='head-text text-[#212529]  lg:text-justify lg:text-3xl xl:text-[36px] md:text-2xl leading-[45px]  max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
          {title}
        </p>
      </div>
      <div className='mt-[30px] md:mx-12'>
        <PersonalLoanCards
          viewDetailsIndex={viewDetailsIndex}
          isMobile={isMobile}
          isTablet={isTablet}
          size={size}
          personalProductList={filteredAlternateList}
          setViewDetailsIndex={setViewDetailsIndex}
          isDetailsPage={false}
          hidePagination={true}
          hideFilterNotFound={true}
          hideCheckEligibleButton={hideCheckEligibleButton}
        />
      </div>
    </div>
  )
}

export default AlternateProductsList
