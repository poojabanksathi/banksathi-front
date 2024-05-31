import Link from 'next/link'
import React from 'react'

const FindBestCard = ({ isLevel4Open, level4Data, activeLevel }) => {
  const positionCondition = isLevel4Open && level4Data?.length > 3 && activeLevel > 3
  return (
    <div>
      <div
        className={`text-center bg-[#D2BFED] w-full pt-[20px] pb-[24px] px-[16px] fixed bottom-0
        `}>
        <p className='text-[#212529] font-medium text-[18px] pb-4 max-[479px]:text-[15px] max-[320px]:text-[14px]'>
          Finding the ideal credit card is simple by reviewing our tailored suggestions.
        </p>
        <div className=''>
          <Link
            href='/credit-cards'
            className='head-text font-[faktum] text-[#212529]  hover:!text-[#212529]  font-semibold text-[13px]  '
            prefetch={false}>
            <button className='text-center cursor-pointer mx-auto max-[820px]:px-4 flex gap-4 px-5 py-2 bg-white rounded-lg max-[771px]:px-3 w-auto justify-center'>
              Find the Right Card
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FindBestCard
