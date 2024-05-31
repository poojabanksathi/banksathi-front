import Image from 'next/image'
import React, { useState } from 'react'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import { loanSortingOptions } from '@/utils/alljsonfile/personal-loan'
import { getSortKeyPersonalLoan, lowToHigh, lowToHighSort } from '@/utils/util'

const LoanSortingFilter = ({
  allPersonalProducts,
  setOpenSortBy,
  openSortBy,
  setPersonalProductList,
  isSubCategoryFlow,
  recommendationFlow
}) => {
  const scrollValue = typeof window !== 'undefined' && window?.scrollY
  const readMoreOpen = typeof window !== 'undefined' && localStorage.getItem('readMore')
  const [selectedSortOption, setSelectedSortOption] = useState('Selected Option')

  const handleLowToHigh = (parentName) => {
    const sortKey = getSortKeyPersonalLoan(parentName)
    const list = lowToHighSort(allPersonalProducts?.product_list, sortKey)
    setPersonalProductList(list)
    setOpenSortBy(false)
  }

  const handleHighToLow = (parentName) => {
    const sortKey = getSortKeyPersonalLoan(parentName)
    const list = lowToHighSort(allPersonalProducts?.product_list, sortKey)
    setPersonalProductList(list?.reverse())
    setOpenSortBy(false)
  }

  const handleSortingOptionClick = (name) => {
    setSelectedSortOption(name)
    const values = name?.split(':')
    if (values?.[1] === lowToHigh) {
      handleLowToHigh(values?.[0])
    } else handleHighToLow(values?.[0])
  }
  const forSubCategoryPage =
    scrollValue === 0
      ? readMoreOpen === 'true'
        ? 'top-[452px]'
        : 'top-[390px]'
      : readMoreOpen === 'true'
        ? 'top-[400px]'
        : 'top-[338px]'

  const forListing =
    scrollValue === 0
      ? readMoreOpen === 'true'
        ? 'top-[469px]'
        : recommendationFlow
          ? 'top-[340px]'
          : 'top-[407px]'
      : readMoreOpen === 'true'
        ? 'top-[418px]'
        : recommendationFlow
          ? 'top-[290px]'
          : 'top-[354px]'

  return (
    <div className='flex flex-col gap-y-[4px]' onMouseLeave={() => setOpenSortBy(false)}>
      <div className="text-neutral-800 text-xs font-medium font-['Poppins'] uppercase">Sort By</div>
      <div
        className={`flex flex-row justify-around items-center w-[235px] h-[45px] bg-white rounded-lg border ${
          !openSortBy ? 'border border-[#212529] rounded-[5px]' : ' border-[#212529] !border-b-0 rounded-t-[5px]'
        }`}
        onMouseEnter={() => setOpenSortBy(true)}>
        <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[30px]">
          {selectedSortOption}
        </div>
        <Image
          src={accordionArrowall}
          alt='arrow'
          width={17}
          height={17}
          priority={true}
          className={openSortBy ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
        />
        {openSortBy && (
          <>
            <div
              className={`border-t-0 border border-[#212529] shadow-md rounded-b-[5px] xl:w-[235px] lg:w-[235px] px-[24px] h-auto  bg-white flex flex-col gap-[12px] items-start justify-start absolute ${
                isSubCategoryFlow ? forSubCategoryPage : forListing
              }`}>
              {loanSortingOptions?.map((item) => {
                return (
                  <div key={item?.id} className='last:pb-4 first:pt-2'>
                    <div
                      className='hover:text-[#a882dd] cursor-pointer hover:text-[14px]'
                      onClick={() => handleSortingOptionClick(item?.name)}>
                      {item?.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LoanSortingFilter
