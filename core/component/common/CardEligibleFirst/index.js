import Image from 'next/image'
import React from 'react'
import SuccessIcon from '../../../../public/assets/eligibility-seccess.svg'
import { useWindowSize } from '@/hooks/useWindowSize'

import dynamic from 'next/dynamic'
function CardEligibleFirst({ alternat_product, alternetRelatedproduct }) {
  const finalArray = alternat_product?.credit_cards

  const filteredDataCard = alternetRelatedproduct?.product_list?.filter((obj) =>
    finalArray?.includes(obj.url_slug.split('/').pop())
  )

  const size = useWindowSize()

  const EligibileCards = dynamic(
    () => import('@/core/component/common/CommonList/ScoreDetailsComponent/EligibileProducts/EligibileProducts'),
    { ssr: false }
  )
  return (
    <>
      {filteredDataCard && filteredDataCard?.length > 0 ? (
        <div className='container  mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
          <div className='pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]   '>
            <Image
              src={SuccessIcon}
              alt='img'
              width={size?.width > 576 ? 70 : 50}
              height={size?.width > 576 ? 70 : 50}
              className='max-sm:pb-5 '
            />
            {size?.width > 576 ? (
              <p className='head-text text-[#212529] max-sm:text-justify  text-justify lg:text-3xl xl:text-[36px] md:text-2xl leading-[45px]  max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                Yay! You are eligible for these credit cards
              </p>
            ) : (
              <p className='head-text text-[#212529] lg:text-3xl xl:text-[36px] md:text-2xl leading-[45px]  max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                Yay! You are eligible for these credit cards
              </p>
            )}
          </div>
          <div className=' eligible-products-slider relative xl:px-16'>
            <EligibileCards filteredDataCard={filteredDataCard} creditFirst={true} />
          </div>
        </div>
      ) : (
        <div className='container  mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[20px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
          <div className='w-full h-auto  px-[80px] max-[1024px]:px-[50px] max-[834px]:py-[10px] max-[834px]:px-[30px] max-[576px]:py-0 max-[576px]:px-0 '></div>
          <div className='eligibility-card '>
            <div className='pb-[30px] flex justify-center sm:items-center sm:gap-[30px] max-sm:gap-[12px]   '>
              <Image
                src={'/assets/cancel-icon.svg'}
                alt='img'
                width={size?.width > 576 ? 60 : 40}
                height={size?.width > 576 ? 60 : 40}
                className=' '
              />
              <p className='head-text text-[#212529] text-leftlg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                Unfortunately, you are not currently eligible for any credit card.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardEligibleFirst
