import { useWindowSize } from '@/hooks/useWindowSize'
import Link from 'next/link'
import React from 'react'
import PersonalLoanListing from '../../PersonalLoanListing/PersonalLoanListing'
import { capitalizeFirstLetter } from '@/utils/util'

const LoanRecommendationResult = ({ filteredList, leftMenuFilterData }) => {
  return (
    <div className='h-auto container  mx-auto bg-[#F4F8FB] max-[1024px]:px-8 max-[991px]:max-w-full pt-[30px] max-sm:pt-[20px] pb-[60px] max-[576px]:pb-[50px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
      <div className='flex flex-col justify-start sm:items-start sm:gap-[16px] max-sm:gap-[14px] container px-10 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
        <h1 className='head-text text-[#212529] lg:text-[28px] xl:text-[26px] md:text-2xl !leading-[30px] max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[20px] max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
          {`${
            capitalizeFirstLetter(filteredList?.userInfo?.firstName) || 'Hey'
          }, High-Five for Excellent Credit! Here Are Your Ideal Personal Loans!`}
        </h1>
        <h2 className='text-neutral-800 text-[16px] font-normal font-["Poppins"] leading-[25.20px] max-sm:text-[14px] max-sm:leading-[22px]'>
          Here Are Your Ideal Personal Loans!
        </h2>
        <div className='mt-[25px] text-left w-full h-[48px] flex items-start justify-start'>
          <Link href='/personal-loan/recommendation'>
            <button
              type='submit'
              className='text-center text-neutral-800 text-[15px] font-semibold font-["Faktum"] leading-normal w-[246px] cursor-pointer max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full'>
              Edit Your Match Preference
            </button>
          </Link>
        </div>
      </div>
      {filteredList?.product_list?.length > 0 && (
        <div className='container h-full mx-auto px-12 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4 max-[991px]:max-w-full'>
          <PersonalLoanListing
            personalProducts={filteredList}
            allPersonalProducts={filteredList}
            url_slug={'personal-loan'}
            isSubCategoryFlow={false}
            hidePagination={true}
            recommendationFlow={true}
          />
        </div>
      )}
    </div>
  )
}

export default LoanRecommendationResult
