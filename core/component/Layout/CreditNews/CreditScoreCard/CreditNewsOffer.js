import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { BASE_URL, RecommendNews } from '@/utils/alljsonfile/service'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import { useIsInViewport } from '@/hooks/useIsInViewport'
import StarRatings from 'react-star-ratings'

const CreditNewsOffer = ({ position }) => {
  const starCount = 5
  const IMAGE_BASE = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const bestCardsRef = useRef(null)
  const router = useRouter()
  const isInViewPort = useIsInViewport(bestCardsRef)

  const pageRoute = router?.asPath

  const [bestCreditCards, setBestCreditCards] = useState([])
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const leadprofileid = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const token = typeof window !== 'undefined' && localStorage.getItem('token')

  const data = {
    eventName: 'select_promotion',
    title: 'Top Credit Cards in India',
    position: position,
    route: pageRoute
  }

  const navigateToCardDetails = (item) => {
    if (item?.url_slug) {
      if (item?.url_slug?.split('/')?.[0] === 'credit-cards') {
        const pathname = item?.url_slug?.replace('/credit-cards', '')
        return `/${pathname}`
      } else {
        return `/${item?.url_slug}`
      }
    }
  }

  const fetchRecommendCardsData = () => {
    const requestParams = {
      category: 'Credit Cards',
      lang_id: 1,
      device_id: deviceId,
      lead_profile_id: token && leadprofileid
    }

    axios
      .post(BASE_URL + RecommendNews?.recommendNewsProducts, requestParams)
      .then((res) => {
        const creditCardsData = res?.data?.data

        setBestCreditCards(creditCardsData)
      })
      .catch((error) => {
        console.log('error while fetching credit cards data', error)
      })
  }
  const callPromotionViewEvent = () => {
    const data = {
      eventName: 'view_promotion',
      title: 'Top Credit Cards in India',
      position: position,
      route: pageRoute
    }
    sendEventToGTM(getPromotionObject(data))
  }

  useEffect(() => {
    if (isInViewPort && bestCreditCards?.length > 0) {
      callPromotionViewEvent()
    }
  }, [isInViewPort, bestCreditCards?.length])

  useEffect(() => {
    fetchRecommendCardsData()
  }, [])

  return (
    <>
      <div ref={bestCardsRef}>
        {bestCreditCards?.length > 0 && (
          <div className='container xl:w-[380px] 2xl:w-auto lg:w-full max-[768px]:w-full h-auto max-[1440px]:px-0 max-[1200px]:px-4 max-[1024px]:px-0 mx-auto'>
            <div className='p-2 bg-[#ffffff] my-2 rounded-xl'>
              <h2 className='font-poppins font-semibold text-[15px] leading-[22px] px-4 text-[#212529] my-6'>
                Top Credit Cards in India
              </h2>
              {bestCreditCards?.map((card, index) => (
                <div key={index} className='border-t-2 border-[#E6ECF1] p-4 max-[320px]:p-2'>
                  <div className='flex flex-row justify-start gap-[10px]'>
                    <div className='md:basis-1/3'>
                      <Link href={navigateToCardDetails(card)} prefetch={false}>
                        <Image
                          src={`${IMAGE_BASE}/${card?.product_image}`}
                          width={100}
                          height={60}
                          className='rounded-md'
                          alt='card image'
                          priority={true}
                          unoptimized={true}
                        />
                      </Link>
                    </div>
                    <div className='md:basis-2/3 gap-[6px]'>
                      {card?.title && (
                        <Link href={navigateToCardDetails(card)} prefetch={false}>
                          <h2
                            onClick={() => sendEventToGTM(getPromotionObject(data))}
                            className='font-poppins font-medium text-[15px] leading-[21px] text-[#212529]'>
                            {card?.title}
                          </h2>
                        </Link>
                      )}
                      <div className='flex justify-start gap-2 items-center'>
                        <p className='font-poppins font-bold text-[12px] leading-[16px]  text-[#212529]'>
                          {card?.rating}
                        </p>
                        <StarRatings
                          rating={card?.rating}
                          starRatedColor='#49d49d'
                          numberOfStars={starCount}
                          name='rating'
                          starDimension='14px'
                          starSpacing='0'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CreditNewsOffer
