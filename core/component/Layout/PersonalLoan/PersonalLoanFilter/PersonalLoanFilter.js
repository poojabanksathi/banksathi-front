import Image from 'next/image'
import React from 'react'
import filterAccordion from '../../../../../public/assets/filter_accordion_new.svg'
import InputRange from 'react-input-range'
import { inputRangeFilters } from '@/utils/alljsonfile/personal-loan'

const PersonalLoanFilter = ({
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
  isSubCategoryFlow,
  minLoanVal,
  minTenureVal,
  minInterestVal
}) => {
  const banksCondition = banksArrayList && banksArrayList?.length > 0 && !isSubCategoryFlow

  return (
    <div className='my-[25px]'>
      <div className='flex flex-row justify-between items-center pr-[18px]'>
        <div className="text-neutral-800 text-lg font-bold font-['Poppins'] uppercase">Filters</div>
        {enableClearAll && (
          <div
            className="text-emerald-400 text-[15px] font-semibold font-['Faktum'] cursor-pointer"
            onClick={() => handleClearFilter()}>
            Clear All
          </div>
        )}
      </div>
      {banksCondition && (
        <div
          className='dot-scroll flex flex-col mt-[22px] gap-y-[11px] pb-[10px] border-b-0 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4
'>
          <div className="text-neutral-800 text-[15px] font-medium font-['Poppins']">Provider’s Name</div>
          <div
            className={`${banksArrayList?.length > 5 ? 'h-[160px]' : 'h-auto'} overflow-y-scroll flex flex-col gap-1`}>
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
                  <span className='text-[14px] flex items-center gap-2 cursor-pointer text-[#000] uppercase'>
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
          <div key={item?.id} className='mt-[25px]'>
            <div className={`${banksCondition ? 'border-t' : ''} border-[#C2CACF] flex flex-col gap-y-[12px]`}>
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
    </div>
  )
}

export default PersonalLoanFilter
