import React from 'react'
import dynamic from 'next/dynamic'
import CheckCibilCard from '../../common/CheckCibilCard/CheckCibilCard'

import { scoreData } from '@/utils/alljsonfile/checkCibilCardList'
const CreditNewsOffer = dynamic(() => import('./CreditScoreCard/CreditNewsOffer'), { ssr: false })

const CreditNewsListComp = dynamic(() => import('./CreditScoreCard/CreditNewsListComp'), { ssr: false })
import { eligibilityData } from '@/utils/alljsonfile/checkCibilCardList'

const CreditNews = ({
  CreditNewsList,
  pageTitle,
  advisorPage,
  infoPage,
  holidayPage,
  bankPage,
  loanPage,
  aadharPage,
  panCardPage,
  taxPage,
  goldRatePage,
  silverRatePage,
  ifscPage,
  personalFinancePage,
  bankingPage,
  creditScorePage
}) => {
  return (
    <div className='container pb-20 px-16  2xl:px-4 max-[1440px]:px-[10px] max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-0  mx-auto max-[991px]:max-w-full  '>
      {CreditNewsList && (
        <div>
          <h1 className='text-center font-faktum font-semibold  md:text-[28px] max-sm:text-[24px] leading-[64px] max-sm:leading-[23px]  text-[#212529] md:px-0 max-sm:px-4  mt-[22px] px-0 lg:px-0 xl:px-8  2xl:px-16'>
            {pageTitle}
          </h1>
          <div className='flex w-[100%]  max-sm:flex-col justify-start md:gap-6 lg:gap-[30px]  '>
            <div className='md:basis-2/3'>
              <CreditNewsListComp
                CreditNewsList={CreditNewsList}
                advisorPage={advisorPage}
                infoPage={infoPage}
                holidayPage={holidayPage}
                bankPage={bankPage}
                loanPage={loanPage}
                aadharPage={aadharPage}
                panCardPage={panCardPage}
                taxPage={taxPage}
                goldRatePage={goldRatePage}
                silverRatePage={silverRatePage}
                ifscPage={ifscPage}
                personalFinancePage={personalFinancePage}
                bankingPage={bankingPage}
                creditScorePage={creditScorePage}
              />
            </div>
            <div className='md:basis-1/3 flex flex-col gap-[30px] max-sm:justify-center max-[768px]:items-center my-6 py-2'>
              <CheckCibilCard cardData={scoreData} position={'2'} title={'Check Score '} />
              <CreditNewsOffer position={'6'} />
              <CheckCibilCard cardData={eligibilityData} position={'4'} title={'Check Eligibility'} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreditNews
