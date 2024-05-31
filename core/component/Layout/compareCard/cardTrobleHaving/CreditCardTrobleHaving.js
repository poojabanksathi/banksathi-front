import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import questionImg from '../../../../../public/assets/question-img.svg'
import rightArrow from '../../../../../public/assets/rightArrow.svg'
import markQuetion from '../../../../../public/assets/mark-quetion-icon.svg'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import { useIsInViewport } from '@/hooks/useIsInViewport'

function CreditCardTrobleHaving({ creditCompare, position }) {
  const router = useRouter()
  const pageRoute = router?.asPath
  const contactUsRef = useRef(null)
  const isInViewPort = useIsInViewport(contactUsRef)

  const data = { eventName: 'select_promotion', title: 'Contact Us', position, route: pageRoute }

  const callPromotionViewEvent = () => {
    const data = { eventName: 'view_promotion', title: 'Contact Us', position: position, route: pageRoute }
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
        ref={contactUsRef}
        className={`pt-[50px] ${creditCompare ? 'mt-0' : 'mt-10'} container mx-auto ${
          router?.pathname === '/' ? 'px-20' : 'px-20'
        } max-[991px]:max-w-full max-[1440px]:${router?.pathname === '/' ? 'px-0' : 'px-12'} ${
          router?.query?.slug || router.query['category-name'] ? 'pb-[50px]' : 'pb-0'
        } max-[1200px]:px-0 max-[1024px]:px-8 max-[576px]:px-6 max-[479px]:px-4  max-[479px]:py-[30px] max-[280px]:px-0`}>
        <div
          className={`flex justify-between ${
            router?.pathname === '/'
              ? 'bg-[#F4F8FB] w-full max-[1440px]:w-[90%] max-[1200px]:w-full mx-auto'
              : 'bg-white'
          } max-[479px]:gap-4   relative h-40 items-center rounded-xl px-16 py-[2.5] max-[771px]:px-4  max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 credit-having-box  max-[479px]:pt-40 max-[375px]:pt-24 max-[320px]:!pt-20  recometroble-card max-[479px]:mt-12 max-[375px]:mt-20  max-[320px]:mt-20`}>
          <div className='flex items-center gap-8 max-[1200px]:gap-4 max-[479px]:flex-col max-[479px]:gap-4  max-[771px]:gap-4  '>
            <div className='relative bottom-[0.6rem] w-[18%] max-[1200px]:w-[20%] max-[1024px]:w-[22%] max-[1024px]:bottom-[0.6rem] max-[991px]:w-[25%] max-[1200px]:bottom-[0.3rem] max-[834px]:w-[36%] max-[820px]:w-[37%] max-[771px]:w-[38%] max-[479px]:w-[35%] max-[479px]:bottom-40 max-[425px]:!bottom-44 max-[375px]:!bottom-44 max-[320px]:bottom-44 max-[320px]:w-[40%] having-user-img max-[479px]:absolute  max-[280px]:w-[44%] max-[280px]:bottom-44 having-question-img'>
              <Image
                src={markQuetion}
                alt='img'
                height={70}
                width={80}
                className='w-[75%] absolute top-[-3rem] mx-auto quetion-mark-img max-[320px]:top-[-2rem]'
              />
              <Image src={questionImg} alt='img' height={70} width={80} className='w-full ' />
            </div>
            <p className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[24px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center max-[771px]:w-[90%] max-[479px]:w-full '>
              Having trouble choosing a product?
            </p>
          </div>

          <div
            onClick={() => {
              sendEventToGTM(getPromotionObject(data))
              router.push('/contact-us')
            }}
            className={`head-text font-[faktum] flex gap-4 px-5 py-2 bg-[#49D49D] rounded-lg max-[771px]:px-3 max-[1200px]:w-[22%]  max-[771px]:w-[27%] max-[576px]:w-[34%] max-[479px]:w-[60%] max-[375px]:w-[65%] max-[320px]:w-[80%] max-[479px]:justify-center ${
              router?.pathname === '/' ? 'contactus-btn-home' : 'contactus-btn'
            }  items-center`}>
            <Link href='/contact-us'>
              <button className='text-[18px] cursor-pointer text-[#212529] max-[375px]:text-[16px] font-semibold max-[771px]:text-[15px]'>
                Contact Us
              </button>
            </Link>
            <Image src={rightArrow} alt='img' className='w-[34px] h-[30px]' height={40} width={50} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreditCardTrobleHaving
