import { CardNetwork, FilaterData, ProviderFilter } from '@/utils/alljsonfile/filterdata'
import Image from 'next/image'
import React from 'react'
import InputRange from 'react-input-range'
import ReactStars from 'react-stars'

const MobileFilter = ({
  BackArrow,
  setShowFilterModal,
  isApplied,
  isChecked,
  checkBoxValues,
  cardNetworkCheck,
  starRating,
  cardsList,
  handleClickProvider,
  selectIndexProvider,
  providerActive,
  banksNameArray,
  handleCheckboxChange,
  handleCheckboxChangeForLouge,
  selectedIndex,
  accordionArrowall,
  minJoiningFees,
  maxJoiningFees,
  handleJoiningFeeRange,
  joiningFeeRange,
  minimumApr,
  maximumApr,
  aprRange,
  handleAprDataChange,
  minAnnualFee,
  maxAnnualFee,
  handleAnnualFeeChange,
  min,
  max,
  creditScoreRange,
  handleCreditScoreChange,
  handleRatingdata,
  selectIndexCardNetwork,
  networkActive,
  annualFeeRange,
  handleClick,
  handleClearFilter,
  newDataCardNetwork,
  handleCardNetworkClick,
  handleCardNetworkCheckBox
}) => {
  const starCount = 5

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
                <div className='flex cursor-pointer items-center gap-3'>
                  <button
                    type='button'
                    className='  text-[#212529] rounded  mr-2'
                    style={{ color: 'red' }}
                    onClick={(e) => setShowFilterModal(false)}>
                    <Image src={BackArrow} alt='img' className='  w-[30px] h-auto' />
                  </button>

                  <p className=' font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
                  {isApplied && (
                    <button
                      onClick={() => handleClearFilter()}
                      className='text-[#49D49D] cursor-pointer font-bold text-[18px] ml-32'>
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`md:px-8 md:pt-8  p-5  rounded-lg   filter-credit w-full ${
                  !isChecked && checkBoxValues?.length === 0 && cardNetworkCheck?.length === 0 && starRating == null
                    ? ''
                    : 'pb-[5rem]'
                }`}>
                {cardsList?.length > 0 && (
                  <>
                    <div className='pb-4 border-b'>
                      {ProviderFilter.map((selectdata, index) => {
                        return (
                          <div key={index}>
                            <div
                              id='accordionExample2'
                              data-active-classes='bg-none'
                              data-inactive-classes='text-[#212529]'>
                              <button
                                className='flex cursor-pointer filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                                type='button'
                                id='headingTwo'
                                data-te-collapse-init
                                onClick={() => {
                                  handleClickProvider(index)
                                }}
                                data-te-target='#collapseTwo'
                                aria-expanded='true'
                                aria-controls='collapseTwo'>
                                <p className='text-[15px] text-[#212529] font-semibold '>{selectdata?.Titlef}</p>
                              </button>

                              {index === selectIndexProvider && providerActive && (
                                <div
                                  id='collapseTwo'
                                  className='!visible'
                                  data-te-collapse-item
                                  data-te-collapse-show
                                  aria-labelledby='headingTwo'
                                  data-te-parent='#accordionExample2'>
                                  <div className='pb-3 pt-2  font-light  h-36 overflow-y-scroll'>
                                    {selectdata.slug === 'providername' &&
                                      banksNameArray?.sort().map((data, index) => {
                                        return (
                                          <div key={index}>
                                            <div className='flex pb-1'>
                                              <input
                                                type='checkbox'
                                                id='vehicle1'
                                                className='mr-3'
                                                value={data}
                                                checked={checkBoxValues?.includes(data)}
                                                onChange={handleCheckboxChange}
                                              />
                                              <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] !capitalize  filter-box-text   '>
                                                {data}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className='pt-4 loungeaccess-sec'>
                      <div className='container-range flex items-center justify-between py-3'>
                        <p className='text-[15px] text-[#212529] font-medium filter-text-resolution '>Lounge Access</p>
                        <label htmlFor='vehicle1' className='text-[15px]  flex items-center gap-2 text-[#000]  '>
                          <input
                            className='mr-1 w-4 h-4'
                            type='checkbox'
                            checked={isChecked}
                            onChange={handleCheckboxChangeForLouge}
                          />
                        </label>
                      </div>
                    </div>

                    <div className='pb-4  border-b'>
                      {FilaterData.map((data, index) => {
                        return (
                          <div key={data?.id}>
                            <div
                              id='accordionExample'
                              data-active-classes='bg-none'
                              data-inactive-classes='text-[#212529]'>
                              <button
                                className='flex cursor-pointer filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
                                type='button'
                                id='headingOne'
                                data-te-collapse-init
                                onClick={() => {
                                  handleClick(index)
                                }}
                                data-te-target='#collapseOne'
                                aria-expanded='true'
                                aria-controls='collapseOne'>
                                <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                  {data.Titlef}
                                </p>
                                {selectedIndex?.includes(index) ? (
                                  <Image
                                    src={accordionArrowall}
                                    alt='up'
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className='rotate-180 w-6 h-6 shrink-0'
                                  />
                                ) : (
                                  <Image
                                    src={accordionArrowall}
                                    alt='down'
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className='w-6 h-6 shrink-0'
                                  />
                                )}
                              </button>

                              {selectedIndex?.includes(index) && (
                                <div
                                  id='collapseOne'
                                  className='!visible'
                                  data-te-collapse-item
                                  data-te-collapse-show
                                  aria-labelledby='headingOne'
                                  data-te-parent='#accordionExample'>
                                  <div className='pb-3 pt-2 font-light p-[8px] '>
                                    <ul className='list-none'>
                                      {data.slug === 'joiningfee' && (
                                        <>
                                          <InputRange
                                            minValue={minJoiningFees}
                                            maxValue={maxJoiningFees}
                                            value={joiningFeeRange}
                                            onChange={handleJoiningFeeRange}
                                          />
                                        </>
                                      )}

                                      {data.slug === 'apr' && (
                                        <>
                                          <InputRange
                                            minValue={minimumApr}
                                            maxValue={maximumApr}
                                            step={0.33}
                                            value={aprRange}
                                            onChange={handleAprDataChange}
                                            formatLabel={(value) => value?.toFixed(2)}
                                          />
                                        </>
                                      )}

                                      {data.slug === 'anualfee' && (
                                        <>
                                          <InputRange
                                            minValue={minAnnualFee}
                                            maxValue={maxAnnualFee}
                                            value={annualFeeRange}
                                            onChange={handleAnnualFeeChange}
                                          />
                                        </>
                                      )}

                                      {data.slug === 'creditscore' && (
                                        <>
                                          <InputRange
                                            minValue={min}
                                            maxValue={max}
                                            value={creditScoreRange}
                                            onChange={handleCreditScoreChange}
                                          />
                                        </>
                                      )}

                                      {data.slug === 'rating' && (
                                        <>
                                          <li className='text-[#212529] text-[15px]  font-normal filter-benefits-truncate'>
                                            <ReactStars
                                              count={starCount}
                                              onChange={handleRatingdata}
                                              size={24}
                                              value={starRating}
                                              half={false}
                                              color1={'#ccc'}
                                              color2={'#49d49d'}
                                            />
                                          </li>
                                        </>
                                      )}

                                      <li
                                        className='text-[#212529] text-[15px] font-normal'
                                        onClick={() => handledata(data.option1.toLowerCase())}>
                                        {data.option1}
                                      </li>
                                      <li
                                        className='text-[#212529] text-[15px]  font-normal'
                                        onClick={() => handledata(data.option2.toLowerCase())}>
                                        {data.option2}
                                      </li>
                                      <li
                                        className='text-[#212529] text-[15px]  font-normal'
                                        onClick={() => handledata(data.option3.toLowerCase())}>
                                        {data.option3}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}

                      {CardNetwork.map((selectdata, index) => {
                        return (
                          <div key={index}>
                            <div
                              id='accordionExample2'
                              data-active-classes='bg-none'
                              data-inactive-classes='text-[#212529]'>
                              <button
                                className='flex cursor-pointer filter-allof items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                                type='button'
                                id='headingTwo'
                                data-te-collapse-init
                                onClick={() => {
                                  handleCardNetworkClick(index)
                                }}
                                data-te-target='#collapseTwo'
                                aria-expanded='true'
                                aria-controls='collapseTwo'>
                                <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                  {selectdata?.Titlef}
                                </p>
                                {index === selectIndexCardNetwork && networkActive ? (
                                  <Image
                                    src={accordionArrowall}
                                    alt='up'
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className='rotate-180 w-6 h-6 shrink-0'
                                  />
                                ) : (
                                  <Image
                                    src={accordionArrowall}
                                    alt='down'
                                    width={24}
                                    height={24}
                                    priority={true}
                                    className='w-6 h-6 shrink-0'
                                  />
                                )}
                              </button>

                              {index === selectIndexCardNetwork && networkActive && (
                                <div
                                  id='collapseTwo'
                                  className='!visible'
                                  data-te-collapse-item
                                  data-te-collapse-show
                                  aria-labelledby='headingTwo'
                                  data-te-parent='#accordionExample2'>
                                  <div className='pb-3 pt-2 font-light  '>
                                    <div className=''>
                                      {selectdata.slug === 'cardnetwork' &&
                                        newDataCardNetwork?.sort().map((data, index) => {
                                          return (
                                            <div key={index}>
                                              <div className='flex pb-1'>
                                                <input
                                                  type='checkbox'
                                                  id='vehicle1'
                                                  className='mr-3'
                                                  value={data}
                                                  checked={cardNetworkCheck?.includes(data)}
                                                  onChange={handleCardNetworkCheckBox}
                                                />
                                                <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                  {data}
                                                </span>
                                              </div>
                                            </div>
                                          )
                                        })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {(isChecked !== false ||
            checkBoxValues?.length !== 0 ||
            joiningFeeRange?.min !== 0 ||
            annualFeeRange?.min !== 0 ||
            aprRange?.min !== 0 ||
            creditScoreRange?.min !== 0 ||
            cardNetworkCheck?.length !== 0 ||
            ratingstar != null) && (
            <>
              <div className='fixed bottom-0 z-[9999] left-0 w-full py-4 px-5 bg-white grid grid-cols-2 justify-between items-center md:px-8 modal-sticky-clear'>
                <button
                  onClick={(e) => {
                    setShowFilterModal(false)
                  }}
                  className='text-[#212529] cursor-pointer font-bold text-[15px] text-left'>
                  Close
                </button>
                <button
                  onClick={(e) => {
                    setShowFilterModal(false)
                  }}
                  className=' py-3 w-full lg:w-[160px] cursor-pointer md:w-full  rounded-lg text-[#212529] bg-[#49D49D] max-[320px]:text-[14px]'>
                  Apply Filters
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileFilter
