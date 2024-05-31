import { inputRangeFilters, loanSortingOptions } from '@/utils/alljsonfile/personal-loan'
import Image from 'next/image'
import React from 'react'
import InputRange from 'react-input-range'
import filterAccordion from '../../../../../public/assets/filter_accordion_new.svg'
import { getSortKeyPersonalLoan, lowToHigh, lowToHighSort } from '@/utils/util'

const LoanMobileFilter = ({
  banksArrayList,
  loanAmount,
  loanTenure,
  interestRate,
  handleAccordionChange,
  selectedAccordion,
  maxLoanVal,
  maxTenureVal,
  maxInterestVal,
  checkBoxValues,
  handleBanksCheckBoxes,
  handleLoanAmountChange,
  handleLoanTenureChange,
  handleInterestRateChange,
  enableClearAll,
  handleClearFilter,
  setShowMobileFilter,
  isSubCategoryFlow,
  minLoanVal,
  minTenureVal,
  minInterestVal,
  allPersonalProducts,
  setPersonalProductList
}) => {
  const banksCondition = banksArrayList && banksArrayList?.length > 0 && !isSubCategoryFlow
  const handleLowToHigh = (parentName) => {
    const sortKey = getSortKeyPersonalLoan(parentName)
    const list = lowToHighSort(allPersonalProducts?.product_list, sortKey)
    setPersonalProductList(list)
    setShowMobileFilter(false)
  }

  const handleHighToLow = (parentName) => {
    const sortKey = getSortKeyPersonalLoan(parentName)
    const list = lowToHighSort(allPersonalProducts?.product_list, sortKey)
    setPersonalProductList(list?.reverse())
    setShowMobileFilter(false)
  }

  const handleSortingOptionClick = (name) => {
    const values = name?.split(':')
    if (values?.[1] === lowToHigh) {
      handleLowToHigh(values?.[0])
    } else handleHighToLow(values?.[0])
  }
  return (
    <div>
      <div className='fixed z-[9999] overflow-y-auto top-0 w-full left-0' id='modal'>
        <div className='flex items-center justify-center min-height-100vh  text-center sm:block '>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-gray-900 opacity-75' />
          </div>
          <p className='sm:inline-block sm:align-middle sm:h-screen  h-[100vh]'></p>
          <div
            className=' relative inline-block align-center bg-white  text-left h-[100vh] overflow-y-scroll shadow-xl transform transition-all  sm:align-middle w-full'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'>
            <div className='2xl:col-span-2 xl:col-span-2 md:col-span-2 bg-white '>
              <div className='md:px-8 md:pt-8  p-5  shadow-md filter-credit w-full pb-4 bg-white'>
                <div className='flex cursor-pointer items-center justify-between'>
                  <div className='flex flex-row gap-3'>
                    <button
                      type='button'
                      className='  text-[#212529] rounded  mr-2'
                      style={{ color: 'red' }}
                      onClick={() => {
                        setShowMobileFilter(false)
                      }}>
                      <Image
                        src={'/assets/left-arrow.svg'}
                        width={30}
                        height={13}
                        alt='img'
                        className=' w-[30px] h-auto'
                      />
                    </button>
                    <p className=' font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
                  </div>
                  {enableClearAll && (
                    <button
                      onClick={() => handleClearFilter()}
                      className='text-[#49D49D] cursor-pointer font-bold text-[18px] ml-32'>
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              {banksCondition && (
                <div className={`md:px-8 md:pt-8  p-5  rounded-lg   filter-credit w-full ${'pb-[1.2rem]'}`}>
                  <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] mb-4">Provider’s Name</div>
                  <div
                    className={`${
                      banksArrayList?.length > 5 ? 'h-[160px]' : 'h-auto'
                    } overflow-y-scroll flex flex-col gap-1`}>
                    {banksArrayList?.map((item, index) => {
                      return (
                        <div className='flex flex-row gap-x-[12px]' key={index}>
                          <input
                            type='checkbox'
                            id='vehicle1'
                            value={item}
                            checked={checkBoxValues?.includes(item)}
                            onChange={(e) => {
                              handleBanksCheckBoxes(e?.target)
                            }}
                          />
                          <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] uppercase'>
                            {item}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {inputRangeFilters?.map((item, index) => {
                return (
                  <div key={item?.id} className='mt-[25px] px-5'>
                    <div className={`${banksCondition ? 'border-t' : ''} flex flex-col gap-y-[12px]`}>
                      <div
                        className='flex flex-row justify-between items-center mt-[22px] pr-[15px]'
                        onClick={() => handleAccordionChange(item, index)}>
                        <div className="text-black text-[15px] font-medium font-['Poppins'] leading-[18px]">
                          {item?.filterName}
                        </div>
                        <Image
                          src={filterAccordion}
                          alt='arrow'
                          width={15}
                          height={15}
                          className={selectedAccordion?.includes(index) ? '' : 'rotate-180'}
                        />
                      </div>
                      <div className='mt-[18px] pr-[16px] pl-[8px]'>
                        {item?.slug === 'loanAmount' && selectedAccordion?.includes(index) && (
                          <InputRange
                            minValue={minLoanVal}
                            maxValue={maxLoanVal}
                            value={loanAmount}
                            name='Principle'
                            onChange={handleLoanAmountChange}
                          />
                        )}
                        {item?.slug === 'loanTenure' && selectedAccordion?.includes(index) && (
                          <InputRange
                            minValue={minTenureVal}
                            maxValue={maxTenureVal}
                            value={loanTenure}
                            name='Principle'
                            onChange={handleLoanTenureChange}
                          />
                        )}
                        {item?.slug === 'interest' && selectedAccordion?.includes(index) && (
                          <InputRange
                            minValue={minInterestVal}
                            maxValue={maxInterestVal}
                            value={interestRate}
                            name='Principle'
                            onChange={handleInterestRateChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='p-5'>
                <div className='flex flex-col items-start justify-start'>
                  <div className='text-[15px] max-[1024px]:text-[14px] font-semibold pb-4 text-[#212529]'>
                    Sort By :
                  </div>
                  <div className={`h-auto  bg-white flex flex-col gap-[5px] items-start justify-start`}>
                    {loanSortingOptions?.map((item) => {
                      return (
                        <div key={item?.id} className=''>
                          <div
                            className='hover:text-[#a882dd] text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'
                            onClick={() => handleSortingOptionClick(item?.name)}>
                            {item?.name}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {enableClearAll && (
            <div className='fixed bottom-0 z-[9999] left-0 w-full py-4 px-5 bg-white grid grid-cols-2 justify-between items-center md:px-8 modal-sticky-clear'>
              <button
                onClick={() => {
                  setShowMobileFilter(false)
                }}
                className='text-[#212529] cursor-pointer font-bold text-[15px] text-left'>
                Close
              </button>
              <button
                onClick={() => {
                  setShowMobileFilter(false)
                }}
                className=' py-3 w-full lg:w-[160px] cursor-pointer md:w-full  rounded-lg text-[#212529] bg-[#49D49D] max-[320px]:text-[14px]'>
                Apply Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoanMobileFilter
