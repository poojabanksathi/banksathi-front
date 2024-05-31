import { capitalizeFirstLetter } from '@/utils/util'
import Link from 'next/link'
import React from 'react'

const HeadSection = ({ formInfo, selectedOffers }) => {
  const categoriesArray = selectedOffers ? selectedOffers?.toString()?.split(',') : []
  const length = categoriesArray?.length
  const first = categoriesArray?.splice(0, length - 1)
  const categoriesList = length > 1 ? ` ${first} & ${categoriesArray?.pop()}` : categoriesArray?.pop()

  const name = formInfo?.firstName ? capitalizeFirstLetter(formInfo?.firstName?.toLowerCase()) : ''

  return (
    <div>
      <div className='flex flex-col justify-start sm:items-start sm:gap-[16px] max-sm:gap-[14px] container px-10 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
        <h1 className='head-text text-[#212529] lg:text-[28px] xl:text-[26px] md:text-2xl !leading-[30px] max-[576px]:text-[28px] max-[479px]:text-[19px] max-[320px]:text-[20px] max-[576px]:leading-[38px] max-[479px]:leading-[30px]'>
          Hey {name || ''}! {`Your recommended ${categoriesList} credit cards for excellent credit`}
        </h1>
        <h2 className='text-neutral-800 text-[16px] font-normal font-["Poppins"] leading-[25.20px] max-sm:text-[14px] max-sm:leading-[22px]'>
          {`Based on your submitted preferences, credit and interest in ${
            categoriesList || ''
          } credit cards, here are the offers we
          recommend.`}
        </h2>
        <div className='mt-[29px] text-left w-full h-[48px] flex items-start justify-start'>
          <Link href='/credit-cards/recommendation'>
            <button
              type='submit'
              className='text-center text-neutral-800 text-[15px] font-semibold font-["Faktum"] leading-normal w-[246px] cursor-pointer max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full'>
              Edit Your Match Preference
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeadSection
