import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import TailorMsgIcon from '../../../../public/assets/tailor-massege.svg'
import rightArrow from '../../../../public/assets/rightArrow.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIsInViewport } from '@/hooks/useIsInViewport'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'

function DetailsFindTailor({ bankAccounts, position }) {
  const exploreCardsRef = useRef(null)
  const router = useRouter()
  const isInViewPort = useIsInViewport(exploreCardsRef)

  const pageRoute = router?.asPath

  const eventData = {
    eventName: 'select_promotion',
    title: bankAccounts ? 'Explore bank accounts' : 'Explore cards',
    position: position,
    route: pageRoute
  }

  const callPromotionViewEvent = () => {
    const data = {
      eventName: 'view_promotion',
      title: bankAccounts ? 'Explore bank accounts' : 'Explore cards',
      position: position,
      route: pageRoute
    }
    sendEventToGTM(getPromotionObject(data))
  }

  useEffect(() => {
    if (isInViewPort) {
      callPromotionViewEvent()
    }
  }, [isInViewPort])

  return (
    <>
      <div
        ref={exploreCardsRef}
        className='pt-[100px] container mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[576px]:pt-[50px]'>
        <div className='flex justify-between bg-[#E9DFF6] max-[479px]:gap-4  relative h-40 items-center rounded-xl px-16 py-[2.5]  max-[1200px]:px-8 max-[771px]:px-4  max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 find-tailor-resolution'>
          <div className='flex items-center gap-8 max-[479px]:flex-col max-[479px]:gap-4  max-[771px]:gap-4 max-[1024px]:gap-4 '>
            <Image
              src={TailorMsgIcon}
              alt='img'
              height={70}
              width={80}
              className='w-[18%] max-[771px]:w-[16%] max-[479px]:w-[26%] max-[479px]:bottom-20'
            />
            <div>
              {bankAccounts ? (
                <p className='text-[#212529] text-[24px]  max-[834px]:text-[22px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center  '>
                  Find your tailor-made bank accounts with BankSathi now
                </p>
              ) : (
                <p className='text-[#212529] text-[24px]  max-[834px]:text-[22px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center  '>
                  Find your tailor-made credit card with BankSathi now
                </p>
              )}
              <p className='text-[#212529] text-[15px] font-medium max-[479px]:text-center pt-2'>
                Select your lifestyle & usage preferences to get the curated list of products.{' '}
              </p>
            </div>
          </div>
          <Link href={`${bankAccounts ? '/bank-accounts' : '/credit-cards'}`} prefetch={false}>
            <div className='flex tailor_explore_btn sm:ml-2 gap-2 px-5 py-2 bg-[#49D49D] rounded-lg max-[771px]:px-3  max-[479px]:justify-center max-[1024px]:px-4 '>
              <button
                onClick={() => sendEventToGTM(getPromotionObject(eventData))}
                className='text-[18px] cursor-pointer max-[1024px]:text-[16px] text-[#212529] max-[375px]:text-[16px] font-semibold max-[771px]:text-[15px]'>
                {bankAccounts ? 'Explore bank accounts' : 'Explore cards'}
              </button>
              <Image
                src={rightArrow}
                alt='img'
                className='w-[34px] h-[30px] max-[1024px]:w-[26px] max-[1024px]:h-[26px]'
                height={40}
                width={50}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default DetailsFindTailor
