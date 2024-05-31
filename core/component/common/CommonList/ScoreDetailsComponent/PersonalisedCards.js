/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic'
import React from 'react'

const EligibileCards = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/EligibileProducts/EligibileProducts'),
  { ssr: false }
)
const PersonalisedCards = ({ bestFitCards, hideCreditHeading }) => {
  return (
    bestFitCards?.length > 0 && (
      <div className='flex flex-col gap-2 max-sm:items-center md:items-center xl:items-start xl:justify-start w-full'>
        <h3 className='text-2xl max-sm:text-[18px]  text-[#212529] px-4 mt-2 mb-[20px] max-sm:mb-1 max-lg:mb-[20px] font-semibold font-[poppins] lg:text-center'>
          Personalised Offers for You
        </h3>
        <div className='eligible-products-slider w-[90%] max-sm:w-[98%] relative max-sm:px-2 mb-[1rem] min-[1520px]:w-[85%]'>
          <EligibileCards
            eligbileHeading={true}
            filteredDataCard={bestFitCards}
            creditFirst={true}
            filteredBankAccountsData={[]}
            isBestFit={true}
            hideCreditHeading={hideCreditHeading}
          />
        </div>
      </div>
    )
  )
}
export default PersonalisedCards
