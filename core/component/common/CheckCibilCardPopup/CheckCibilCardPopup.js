import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import { useIsInViewport } from '@/hooks/useIsInViewport'
import { useRouter } from 'next/router'

const CheckCibilCardPopup = ({ cardData, position, title }) => {
  const cibilAndEligibilityRef = useRef(null)
  const router = useRouter()
  const isInViewPort = useIsInViewport(cibilAndEligibilityRef)

  const pageRoute = router?.asPath

  const eventData = { eventName: 'select_promotion', title: title, position: position, route: pageRoute }

  const callPromotionViewEvent = () => {
    const data = { eventName: 'view_promotion', title: title, position: position, route: pageRoute }
    sendEventToGTM(getPromotionObject(data))
  }

  useEffect(() => {
    if (isInViewPort) {
      callPromotionViewEvent()
    }
  }, [isInViewPort])

  return (
    <div
      ref={cibilAndEligibilityRef}
      className={`${
        cardData?.eligibile ? 'px-[16px]' : ''
      }  flex  items-center justify-center flex-col xl:w-[380px] 2xl:w-auto lg:w-full max-[768px]:w-full bg-[#EDE3FD] rounded-tl-lg rounded-tr-lg credit-card-popup`}>
      <div className='flex flex-col gap-[2px]  pt-5 pb-1 px-[10px] max-sm:px-[20px] '>
        <div className="text-center text-neutral-800 text-lg font-bold font-['Poppins']">{cardData?.title}</div>
        <div className="text-center text-neutral-800  text-[13px] font-normal font-['Poppins'] leading-[21px]">
          {cardData?.subTitle}
        </div>
        <div className='mt-[18px] mb-[12px] text-center' onClick={() => sendEventToGTM(getPromotionObject(eventData))}>
          <Link href={cardData?.pathName}>
            <button className='bg-[#49D49D] w-[190px] lg:w-[240px] h-[39px] max-[240px]:w-full rounded-md font-faktum font-semibold text-[15px] leading-[18px] tracking-wide text-[#212529]'>
              {cardData?.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckCibilCardPopup
