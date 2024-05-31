import React from 'react'
import cancelIcon from '../../../../../public/assets/cancel-icon.svg'
import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'

function EligibilityCardThree({ isNotEligible }) {
  const size = useWindowSize()
  const input_slug = localStorage.getItem('@inputSlug')

  const alternat_product =
    typeof window !== 'undefined' &&
    (localStorage.getItem('@alternatdata') ? JSON.parse(localStorage.getItem('@alternatdata')) : '')

  const eligible_product = localStorage.getItem('@eligibleproduct')

  return (
    <>
      <div className={size.width <= 576 ? 'bg-[#F4F8FB]' : 'bg-white'}>
        <div className='container  mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
          <div className='w-full h-auto  px-[80px] max-[1024px]:px-[50px] max-[834px]:py-[10px] max-[834px]:px-[30px] max-[576px]:py-0 max-[576px]:px-0 '></div>
          <div className='eligibility-card '>
            <div className='pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]   '>
              <Image
                src={cancelIcon}
                alt='img'
                width={size?.width > 576 ? 60 : 40}
                height={size?.width > 576 ? 60 : 40}
                className=' '
              />
              {isNotEligible ? (
                <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                  Oh! You are not eligible for the selected card at this moment!
                </p>
              ) : !eligible_product && !alternat_product ? (
                <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                  Unfortunately, you are not eligible for any credit card.
                </p>
              ) : (
                ''
              )}
              {/* {size?.width > 576 ? (
                <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                  Unfortunately, you are not currently eligible for any credit card.
                </p>
              ) : (
                <p className='head-text text-[#212529] max-sm:text-justify   lg:text-2xl xl:text-[28px] md:text-xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                  Unfortunately, you are not currently eligible for any credit card.
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EligibilityCardThree
