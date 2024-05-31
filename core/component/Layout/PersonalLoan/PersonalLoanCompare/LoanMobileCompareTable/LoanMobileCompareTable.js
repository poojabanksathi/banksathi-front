import SearchableDropdown from '@/core/component/common/SearchableDropdown/SearchableDropdown'
import Image from 'next/image'
import React from 'react'

const LoanMobileCompareTable = ({
  size,
  targetRef,
  slug1Data,
  slug2Data,
  slug3Data,
  slugImageComp,
  banksName,
  searchValue,
  setSearchValue,
  slugsArray,
  handleClick,
  mapKeyValuePair
}) => {
  const placeHolder = 'Select lender'

  const mobileArray = slugsArray?.length == 3 ? slugsArray?.slice(0, slugsArray?.length - 1) : slugsArray

  return (
    <div>
      <div ref={targetRef} className='bg-white rounded-xl'>
        <div className='grid grid-cols-2'>
          {slug1Data && slugImageComp(slug1Data)}
          {slug2Data && slugImageComp(slug2Data)}
          {slug3Data && Object(slug3Data).keys?.length > 0 && isDesktop && slugImageComp(slug3Data)}
          {(
            size.width >= 992
              ? slug1Data === null || slug2Data === null || slug3Data === null
              : slug1Data === null || slug2Data === null
          ) ? (
            <th className='basis-1/4 max-[768px]:basis-1/2'>
              <div className='max-[576px]:pt-10 max-[576px]:p-4  pb-8 pt-10 px-6 '>
                <h2 className='text-left mb-[34px] text-[15px] font-semibold leading-6'>
                  Select lender from the list to compare
                </h2>
                <div className='w-full max-[576px]:w-full'>
                  <SearchableDropdown
                    options={banksName}
                    label='name'
                    id='id'
                    selectedVal={searchValue?.name}
                    handleChange={(val) => {
                      setSearchValue(val?.name)
                      handleClick(val?.url_slug?.split('/')?.[2])
                    }}
                    placeholder={placeHolder}
                  />
                </div>
              </div>
            </th>
          ) : (
            ''
          )}
        </div>
        <div>
          <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
            PERSONAL LOAN FEATURES
          </h2>
          <div className='flex flex-col px-4 border-t border-b border-slate-200'>
            <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Interest Rates
            </p>
            <div className='flex justify-between gap-2 items-center py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'interest_rate_min', 'interest_rate_max')}
            </div>
          </div>

          <div className='flex flex-col px-4 border-t border-b border-slate-200 bg-[#EAECED]'>
            <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Loan Amount Range
            </p>
            <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'loan_amount_min', 'loan_amount_max')}
            </div>
          </div>
          <div className='flex flex-col px-4 border-t border-b border-slate-200'>
            <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Processing Fees
            </p>
            <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'processing')}
            </div>
          </div>
          <div className='flex flex-col px-4 border-t border-b border-slate-200 bg-[#EAECED]'>
            <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Prepayment Charges
            </p>
            <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'part_payment_facility')}
            </div>
          </div>
          <div className='flex flex-col px-4 border-t border-b border-slate-200'>
            <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Salary Required
            </p>
            <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'salary')}
            </div>
          </div>
          <div className='flex flex-col px-4 border-t border-b border-slate-200'>
            <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              ITR Amount Required
            </p>
            <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'itr')}
            </div>
          </div>
          <div className='flex flex-col px-4 border-t border-b border-slate-200'>
            <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Approval TAT 
            </p>
            <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'instant_approval')}
            </div>
          </div>
          <div className='flex flex-col px-4 border-t border-b border-slate-200'>
            <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
              Minimum Cibil Required
            </p>
            <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
              {mapKeyValuePair(slugsArray, 'min_cibil_required')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanMobileCompareTable
