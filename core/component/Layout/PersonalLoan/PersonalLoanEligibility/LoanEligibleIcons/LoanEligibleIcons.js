import Image from 'next/image'
import React from 'react'
import EligibilityBanner from '../../../../../../public/assets/eligbilileSliderImg.svg'
import sliderLine from '../../../../../../public/assets/sliderLine.svg'

const LoanEligibleIcons = () => {
  return (
    <div>
      <div className='w-[300px] max-sm:w-[100%] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
        <Image src={EligibilityBanner} alt='slider' width={70} height={40} />
        <div className='leading-[25px]  pt-[24px] '>
          <p className='text-[15px] font-medium  text-[#212529] font-[poppins] text-justify'>No credit score impact</p>
        </div>
        <div className='leading-[21px text-center pt-[12px]'>
          <p className='text-[15px] font-normal  text-[#212529] font-[poppins] text-justify'>
            Rest assured that your credit score will not be impacted as we perform a soft credit check.
          </p>
        </div>
        <div className='flex flex-start gap-[10px] pt-[30px] max-sm:pt-[24px]'>
          <Image src={sliderLine} alt='line' width={'40px'} height={0} />
          <Image src={sliderLine} alt='line' width={'40px'} height={0} />

          <Image src={sliderLine} alt='line' width={'40px'} height={0} />
        </div>
      </div>
    </div>
  )
}

export default LoanEligibleIcons
