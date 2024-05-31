import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import rightArrow from '../../../../../public/assets/rightArrow.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import { useIsInViewport } from '@/hooks/useIsInViewport'

function TrobleChoose({ position }) {
  const router = useRouter()
  const troubleChooseRef = useRef(null)
  const isInViewPort = useIsInViewport(troubleChooseRef)

  const pageRoute = router?.asPath
  const data = { eventName: 'select_promotion', title: "Let's Connect", position, route: pageRoute }

  const callPromotionViewEvent = () => {
    const data = { eventName: 'view_promotion', title: "Let's Connect", position: position, route: pageRoute }
    sendEventToGTM(getPromotionObject(data))
  }

  useEffect(() => {
    if (isInViewPort) {
      callPromotionViewEvent()
    }
  }, [isInViewPort])

  return (
    <>
      <div className='having-troble  ' ref={troubleChooseRef}>
        <div
          onClick={() => sendEventToGTM(getPromotionObject(data))}
          className='container max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[56px] px-20 max-[1440px]:px-12 max-[1200px]:px-0  max-[479px]:px-4 max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4 max-[280px]:py-[30px]'>
          <Link href='/contact-us' prefetch={false}>
            <div className=' flex items-baseline  max-[771px]:items-center gap-8   max-[771px]:gap-32 max-[576px]:gap-8 max-[479px]:gap-2'>
              <p className='text-[#212529] head-text font-[faktum] lg:text-4xl md:text-3xl max-[771px]:w-[60%]  max-[576px]:text-[28px] max-[479px]:text-[22px] max-[375px]:text-[22px] max-[320px]:text-[18px] max-[280px]:text-[15px] font-semibold  text-[#212529]  max-[576px]:w-4/5 max-[375px]:w-[77%] max-[320px]:!w-[75%] max-[820px]:w-[85%] trouble-box-bottom'>
                Having trouble choosing a product? Let’s connect{' '}
              </p>
              <Image
                src={rightArrow}
                alt='img'
                className='w-[50px] h-full  troble-icon  max-[479px]:w-[40px] max-[576px]:!mr-[5%]'
                height={20}
                width={80}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TrobleChoose
