import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { mockData } from './data'
import { useRouter } from 'next/router'

import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import { useIsInViewport } from '@/hooks/useIsInViewport'

const ServiceTabs = ({ size, serviceTabs, position, hidePadding = false }) => {
  const router = useRouter()
  const serviceTabsRef = useRef(null)
  const isInViewPort = useIsInViewport(serviceTabsRef)

  const [isHover, setIsHover] = useState(false)
  const [isLoanHover, setIsLoanHover] = useState(false)
  const [isBankHover, setIsBankHover] = useState(false)

  const pageRoute = router?.asPath
  const data = { eventName: 'select_promotion', title: 'Browse Services', position: position, route: pageRoute }

  const callPromotionViewEvent = () => {
    const data = { eventName: 'view_promotion', title: 'Browse Services', position: position, route: pageRoute }
    sendEventToGTM(getPromotionObject(data))
  }

  useEffect(() => {
    if (isInViewPort) {
      callPromotionViewEvent()
    }
  }, [isInViewPort])

  // Function to get a random subset of tabs that include "Accounts"
  const getRandomAccountTabs = (tabsArray, count) => {
    const accountTabs = tabsArray.filter((tab) => tab?.title?.toLowerCase().includes('account'))
    const shuffledTabs = accountTabs.sort(() => Math.random() - 0.5)
    return shuffledTabs.slice(0, count)
  }

  // Function to get a random subset of tabs that include "Card"
  const getRandomCreditCardTabs = (tabsArray, count) => {
    const creditCardTabs = tabsArray.filter((tab) => tab?.title?.toLowerCase().includes('card'))
    const shuffledTabs = creditCardTabs.sort(() => Math.random() - 0.5)
    return shuffledTabs.slice(0, count)
  }

  const randomBankAccounts = getRandomAccountTabs(serviceTabs?.data?.bank_accounts || [], 6)
  const randomCreditCards = getRandomCreditCardTabs(serviceTabs?.data?.credit_cards || [], 6)
  const personalTabs = serviceTabs?.data?.personal_loan

  return (
    <div
      ref={serviceTabsRef}
      id='more-category-to-browse'
      className={
        hidePadding
          ? 'py-[50px] px-4'
          : 'py-[50px] px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 mx-auto max-[991px]:max-w-full max-sm:px-4'
      }>
      {mockData?.serviceTabs?.title && (
        <h2 className='text-gray-900 font-faktum text-3xl font-semibold leading-140 max-sm:text-[18px] max-sm:leading-[25px]'>
          {mockData?.serviceTabs?.title}
        </h2>
      )}
      {randomBankAccounts?.length > 0 && (
        <div className='items-center mt-[20px] max-sm:mt-[12px]'>
          <h3 className='text-gray-900  font-faktum text-xl font-semibold leading-140 max-sm:text-[15px] max-sm:leading-[21px]'>
            {mockData?.serviceTabs?.subTitle1}
          </h3>
          <div className='flex gap-[30px] rounded-lg max-sm:gap-[16px] items-center max-[320px]:justify-center flex-wrap py-[20px]'>
            {randomBankAccounts?.slice(0, 4).map((item) => (
              <Link href={`/bank-accounts/${item?.url_slug}`} key=''>
                <button
                  onMouseEnter={() => setIsBankHover(true)}
                  onClick={() => sendEventToGTM(getPromotionObject(data))}
                  key=''
                  className={`h-auto hover:border-[#844FCF] !hover:text-[#844FCF] hover:shadow-md rounded-lg border w-[240px] max-sm:w-[180px] max-[375px]:w-[143px] max-[320px]:w-[233px]  bg-white px-[16px] max-sm:p-[12px] py-[19px] text-var(--Text-Dark, #212529) text-center font-poppins text-base font-medium leading-normal max-sm:text-[12px] ${
                    size?.width <= 375 ? 'w-[143px]' : ''
                  }`}>
                  <h4
                    className={`text-[#212529] text-center truncate  ${
                      isBankHover ? 'hover:text-[#844FCF]' : ''
                    } font-poppins text-base font-medium leading-normal max-sm:text-[12px]`}>
                    {item?.title}
                  </h4>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
      {randomCreditCards?.length > 0 && (
        <div className='items-center my-4 '>
          <h3 className='text-gray-900 font-faktum text-xl font-semibold leading-140 max-sm:text-[15px] max-sm:leading-[21px]'>
            {mockData?.serviceTabs?.subTitle2}
          </h3>
          <div className='flex gap-[30px]  max-sm:gap-[16px] items-center max-[320px]:justify-center flex-wrap py-[20px]'>
            {randomCreditCards?.slice(0, 4)?.map((item) => (
              <Link href={`/credit-cards/${item?.url_slug}`} key=''>
                <button
                  onMouseEnter={() => setIsHover(true)}
                  onClick={() => sendEventToGTM(getPromotionObject(data))}
                  key=''
                  className={`h-auto hover:border-[#844FCF] !hover:text-[#844FCF]  hover:shadow-md border rounded-lg w-[240px] max-sm:w-[180px] max-[375px]:w-[143px] max-[320px]:w-[233px] bg-white px-[16px] max-sm:p-[12px] py-[19px] text-var(--Text-Dark, #212529) text-center font-poppins text-base font-medium leading-normal max-sm:text-[12px] ${
                    size?.width <= 375 ? 'w-[143px]' : ''
                  }`}>
                  <h4
                    className={`text-[#212529] text-center truncate ${
                      isHover ? 'hover:text-[#844FCF]' : ''
                    } font-poppins text-base font-medium leading-normal max-sm:text-[12px]`}>
                    {item?.title}
                  </h4>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
      {personalTabs?.length > 0 && (
        <div className='items-center my-4 '>
          <h3 className='text-gray-900 font-faktum text-xl font-semibold leading-140 max-sm:text-[15px] max-sm:leading-[21px]'>
            {mockData?.serviceTabs?.subTitle3}
          </h3>
          <div className='flex gap-[30px]  max-sm:gap-[16px] items-center max-[320px]:justify-center flex-wrap py-[20px]'>
            {personalTabs?.slice(0, 4)?.map((item) => (
              <Link href={`/personal-loan/${item?.url_slug}`} key=''>
                <button
                  onMouseEnter={() => setIsLoanHover(true)}
                  onClick={() => sendEventToGTM(getPromotionObject(data))}
                  key=''
                  className={`h-auto hover:border-[#844FCF] !hover:text-[#844FCF]  hover:shadow-md border rounded-lg w-[240px] max-sm:w-[180px] max-[375px]:w-[143px] max-[320px]:w-[233px] bg-white px-[16px] max-sm:p-[12px] py-[19px] text-var(--Text-Dark, #212529) text-center font-poppins text-base font-medium leading-normal max-sm:text-[12px] ${
                    size?.width <= 375 ? 'w-[143px]' : ''
                  }`}>
                  <h4
                    className={`text-[#212529] truncate ${
                      isLoanHover ? 'hover:text-[#844FCF]' : ''
                    } text-center font-poppins text-base font-medium leading-normal max-sm:text-[12px]`}>
                    {item?.title}
                  </h4>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceTabs
