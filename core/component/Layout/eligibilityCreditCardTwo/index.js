import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import cancelIcon from '../../../../public/assets/cancel-icon.svg'
import { useWindowSize } from '@/hooks/useWindowSize'

const EligibilityCreditTwo = dynamic(() => import('./EligibilityCreditTwo'), {
  ssr: false
})

const EligibilityCardThree = dynamic(() => import('../eligibilityThree/EligibilityCardThree'), {
  ssr: false
})

const CardsEligibilityBox = dynamic(() => import('@/core/component/common/CommonList/CardsEligibilityBox'), {
  ssr: false
})

const CardEligibleFirst = dynamic(() => import('@/core/component/common/CardEligibleFirst'), {
  ssr: false
})

function EligibilityCreditCardTwo({ alternetRelatedproduct }) {
  const size = useWindowSize()

  const userData =
    typeof window !== 'undefined' && localStorage.getItem('userData')
      ? JSON?.parse(localStorage.getItem('userData'))
      : {}

  const alternat_product =
    typeof window !== 'undefined' &&
    (localStorage.getItem('@alternatdata') ? JSON.parse(localStorage.getItem('@alternatdata')) : '')

  const eligible_product = typeof window !== 'undefined' && localStorage.getItem('@eligibleproduct')
  const input_slug = typeof window !== 'undefined' && localStorage.getItem('@inputSlug')

  const isNotEligible =
    input_slug !== 'null'
      ? input_slug !== eligible_product && !userData?.eligible_product?.credit_cards?.includes(input_slug)
      : false

  const showErrorMessage = () => {
    if (eligible_product === '' && alternat_product === '') {
      return (
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
              <p className='head-text text-[#212529] text-leftlg:text-2xl xl:text-[28px] md:text-2xl leading-[45px]  max-[576px]:text-[24px] max-[479px]:text-[19px] max-[320px]:text-[19px]  max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
                Unfortunately, you are not eligible for any credit card.
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {isNotEligible ? <EligibilityCardThree isNotEligible={isNotEligible} /> : showErrorMessage()}
      {alternat_product && !eligible_product && (
        <CardEligibleFirst alternat_product={alternat_product} alternetRelatedproduct={alternetRelatedproduct} />
      )}
      {eligible_product && (
        <EligibilityCreditTwo
          alternetRelatedproduct={alternetRelatedproduct}
          eligible_product={eligible_product}
          alternat_product={alternat_product}
        />
      )}

      {eligible_product && (
        <div className='bg-[#F4F8FB] '>
          <div className='container mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  pt-[35px] pb-[80px] justify-around max-[576px]:py-[50px] max-[479px]:py-10 max-[479px]:h-auto'>
            <div className='w-full h-auto  px-[80px]  max-[1200px]:px-0 max-[576px]:py-0 max-[576px]:px-0 '>
              <CardsEligibilityBox
                alternetRelatedproduct={alternetRelatedproduct}
                alternat_product={alternat_product}
                eligible_product={eligible_product}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EligibilityCreditCardTwo
