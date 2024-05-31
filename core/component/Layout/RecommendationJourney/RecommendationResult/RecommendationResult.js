/* eslint-disable react-hooks/exhaustive-deps */
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BackArrow from '../../../../../public/assets/left-arrow.svg'
import HeadSection from './HeadSection/HeadSection'
import { CardNetwork, FilaterData, ProviderFilter } from '@/utils/alljsonfile/filterdata'
import InputRange from 'react-input-range'
import ReactStars from 'react-stars'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import { getKeyValueInfo, removeDuplicates } from '@/utils/util'
import CardsListing from './CardsListing/CardsListing'
import FilterIcon from '../../../../../public/assets/filter-icon.svg'
import MobileFilter from './MobileFilter/MobileFilter'
import CloseIcon from '../../../../../public/assets/close-icon.svg'
import TagManager from 'react-gtm-module'

const RecommendationResult = ({ filteredList, formInfo, leftMenuFilterData }) => {
  const starCount = 5
  const size = useWindowSize()

  // STATES
  const [checkBoxValues, setCheckBoxValues] = useState([])
  const [selectedIndex, setSelectedIndex] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [starRating, setStarRating] = useState(null)
  const [cardsList, setCardsList] = useState(filteredList)
  const [categoryActive, setCategoryActive] = useState([])
  const [providerActive, setProviderActive] = useState(true)
  const [networkActive, setNetworkActive] = useState(false)
  const [selectIndexProvider, setSelectIndexProvider] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [selectIndexCardNetwork, setSelectIndexCardNetwork] = useState()
  const [cardNetworkCheck, setCardNetworkCheck] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedOffers, setSelectedOffers] = useState([])

  //JOINING FEE
  const cardFee = getKeyValueInfo(filteredList, 'joining_fee')
  const minJoiningFees = cardFee?.length > 0 ? Math.min(...cardFee) : null
  const maxJoiningFees = cardFee?.length > 0 ? Math.max(...cardFee) : null
  const [joiningFeeRange, setJoiningFeeRange] = useState({ min: minJoiningFees, max: maxJoiningFees })

  // ANNUAL FEE
  const annualFee = getKeyValueInfo(filteredList, 'annual_fee')
  const minAnnualFee = annualFee ? Math.min(...annualFee) : null
  const maxAnnualFee = annualFee ? Math.max(...annualFee) : null
  const [annualFeeRange, setAnnualFeeRange] = useState({ min: minAnnualFee, max: maxAnnualFee })

  // APR %
  const aprRanges = getKeyValueInfo(filteredList, 'apr')
  const minimumApr = aprRanges ? Math.min(...aprRanges) : 0
  const maximumApr = aprRanges ? Math.max(...aprRanges) : 0
  const [aprRange, setAprRange] = useState({ min: minimumApr, max: maximumApr })

  // CREDIT SCORE RANGE
  const creditScoreMin = getKeyValueInfo(filteredList, 'min_credit_score')
  const creditScoreMax = getKeyValueInfo(filteredList, 'max_credit_score')
  const min = creditScoreMin ? Math.min(...creditScoreMin) : 0
  const max = creditScoreMax ? Math.max(...creditScoreMax) : 0
  const [creditScoreRange, setCreditScoreRange] = useState({ min: min, max: max })
  const [creditScore, setCreditScore] = useState(min || 0)

  // constants
  const combinedcardNetwork =
    filteredList?.length > 0 && filteredList?.map((str) => str?.card_network).reduce((acc, arr) => acc.concat(arr), [])

  const newDataCardNetwork = combinedcardNetwork ? [...new Set(combinedcardNetwork)] : []

  const minCond = joiningFeeRange?.min !== minJoiningFees && joiningFeeRange?.min !== joiningFeeRange?.max
  const annualMinCond = annualFeeRange?.min !== minAnnualFee && annualFeeRange?.min !== annualFeeRange?.max
  const aprCond = aprRange?.min !== minimumApr || aprRange?.max !== maximumApr
  const creditScoreCond = creditScoreRange?.min !== min || creditScoreRange?.max !== max

  // -----------------------FILTER IS APPLIED CONDITION
  const isApplied =
    checkBoxValues?.length !== 0 ||
    minCond ||
    annualMinCond ||
    aprCond ||
    creditScoreCond ||
    starRating !== null ||
    cardNetworkCheck?.length !== 0

  // GET BANKS NAMES FOR FILTER
  const banksNameArray = removeDuplicates(getKeyValueInfo(filteredList, 'bank_name'))

  const handleClick = (index) => {
    setIsActive(!isActive)
    if (selectedIndex?.includes(index)) {
      const updateValue = selectedIndex?.indexOf(index)
      selectedIndex?.splice(updateValue, 1)
      setSelectedIndex(selectedIndex)
    } else {
      setSelectedIndex([...selectedIndex, index])
    }
  }

  const handleRemoveCategory = (index) => {
    categoryActive?.splice(index, 1)
    setCategoryActive([...categoryActive])
  }

  //RATING
  const handleRatingdata = (rating) => {
    setStarRating(rating)
    const filterRating = filteredList?.filter((item) => {
      return Number(item?.rating) === Number(rating)
    })
    if (filterRating?.length > 0) {
      setCardsList(filterRating)
    } else setCardsList([])
  }

  // BANKS NAME FILTER FUNCTION
  const handleCheckboxChange = (event) => {
    const { value, checked } = event?.target
    if (checked) {
      setCheckBoxValues([...checkBoxValues, value])
    } else {
      setCheckBoxValues(checkBoxValues.filter((v) => v !== value))
    }
  }

  // LOUNGE ACCESS FUNCTION
  const handleCheckboxChangeForLouge = (event) => {
    const ischeck = event.target.checked
    setIsChecked(ischeck)
    if (ischeck) {
      const filtered = cardsList?.length > 0 && cardsList?.filter((el) => el?.lounge_access === '1')
      setCardsList(filtered)
    } else {
      setCardsList(filteredList)
    }
  }

  // CLEAR ALL FUNCTION
  const handleClearFilter = () => {
    setShowFilterModal(false)
    setCardsList(filteredList)
    setAnnualFeeRange({ min: minAnnualFee, max: maxAnnualFee })
    setJoiningFeeRange({ min: minJoiningFees, max: maxJoiningFees })
    setAprRange({ min: minimumApr, max: maximumApr })
    setCreditScoreRange({ min: min, max: max })
    setCreditScore(min)
    setCheckBoxValues([])
    setCardNetworkCheck([])
    setStarRating(null)
  }

  // APR RANGE
  const handleAprDataChange = (value) => {
    setAprRange(value)
    if (filteredList && value) {
      const filtered = filteredList?.filter((item) => item.apr >= value?.min && item.apr <= value?.max)
      setCardsList(filtered)
    } else {
      setCardsList(filteredList)
    }
  }

  const handleClickProvider = (index) => {
    setProviderActive(providerActive)
    setSelectIndexProvider(index)
  }
  const handleCardNetworkClick = (index) => {
    setNetworkActive(!networkActive)
    setSelectIndexCardNetwork(index)
  }
  const handleCardNetworkCheckBox = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setCardNetworkCheck([...cardNetworkCheck, value])
    } else {
      setCardNetworkCheck(cardNetworkCheck?.filter((v) => v !== value))
    }
  }

  // JOINING FEE
  const handleJoiningFeeRange = (newValue) => {
    const { min, max } = newValue
    setJoiningFeeRange(newValue)
    const filterJoining = filteredList?.filter((item) => item?.joining_fee >= min && item?.joining_fee <= max)
    filterJoining && setCardsList(filterJoining)
  }

  // ANNUAL FEE
  const handleAnnualFeeChange = (value) => {
    const { min, max } = value
    setAnnualFeeRange(value)
    const filterAnnual = filteredList?.filter((item) => item?.annual_fee >= min && item?.annual_fee <= max)
    filterAnnual && setCardsList(filterAnnual)
  }

  // CREDIT SCORE RANGE
  const handleCreditScoreChange = (value) => {
    setCreditScoreRange(value)
    setCreditScore(value)
    if (filteredList && value) {
      const filtered = filteredList?.filter(
        (card) => value >= card?.min_credit_score && value <= card?.max_credit_score
      )
      setCardsList(filtered)
    } else {
      setCardsList(filteredList)
    }
  }
  const handleFilterClick = (e) => {
    setShowFilterModal(!showFilterModal)
  }

  const handleCheckBoxRemove = (index) => {
    checkBoxValues?.splice(index, 1)
    setCheckBoxValues([...checkBoxValues])
    setCardsList(cardsList)
  }
  // CHECKBOXES
  const getCheckBoxAboveList = (data) => {
    return (
      <ul className='list-none flex gap-4  list-t  lg:hidden max-[1024px]:overflow-x-scroll max-[1024px]:whitespace-nowrap scrollbar-hide py-4'>
        {data?.map((value, index) => {
          return (
            <div key={index}>
              <li className='active cursor-pointer inline-flex'>
                <button className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                  {value}
                  <Image
                    src={CloseIcon}
                    alt='image'
                    height={16}
                    width={16}
                    priority={true}
                    className='align-middle ml-2 w-[16px] h-[16px] '
                    onClick={() => handleCheckBoxRemove(index)}
                  />
                </button>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
  // ------------------------------ WEB FILTER SECTION ---------------------- //
  const getFilterComponent = () => {
    return (
      <div className='xl:pt-8 lg:pt-4 border border-[#C2CACF] border-l-0  filter-resolution credit-left-filter filter-credit '>
        <div className='flex items-center justify-between pb-2 xl:pr-[17px] lg:pr-4 md:pr-4'>
          <p className='font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
          {isApplied && (
            <button
              className='text-[#49D49D] cursor-pointer font-bold text-[15px]'
              onClick={() => {
                handleClearFilter()
              }}>
              Clear All
            </button>
          )}
        </div>
        <div className='pb-[10px] border-b-0 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
          {/* BANKS NAME FILTER SECTION */}
          {ProviderFilter.map((selectdata, index) => {
            return (
              <div key={selectdata?.id}>
                <div id='accordionExample2' data-active-classes='bg-none' data-inactive-classes='text-[#212529]'>
                  <button
                    className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'
                    type='button'
                    id='headingTwo'
                    data-te-collapse-init
                    onClick={() => {
                      handleClickProvider(index)
                    }}
                    data-te-target='#collapseTwo'
                    aria-expanded='true'
                    aria-controls='collapseTwo'>
                    <p className='text-[15px] font-semibold text-[#212529]'>{selectdata?.Titlef}</p>
                  </button>

                  {index === selectIndexProvider && providerActive && (
                    <div
                      id='collapseTwo'
                      className='!visible'
                      data-te-collapse-item
                      data-te-collapse-show
                      aria-labelledby='headingTwo'
                      data-te-parent='#accordionExample2'>
                      <div className='pb-3 pt-2 font-light h-36 overflow-y-scroll'>
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
                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] !capitalize  filter-box-text  '>
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

          <div className='pb-4  border-b-0'>
            {FilaterData.map((data, index) => {
              return (
                <div key={data?.id}>
                  <div id='accordionExample' data-active-classes='bg-none' data-inactive-classes='text-[#212529]'>
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
                      <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>{data.Titlef}</p>
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
                        <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
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
                                  value={creditScore}
                                  name='Principle'
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
                                    half={true}
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
                <div key={selectdata?.id}>
                  <div id='accordionExample2' data-active-classes='bg-none' data-inactive-classes='text-[#212529]'>
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
                        <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
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
                              newDataCardNetwork?.toSorted().map((data, index) => {
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
        </div>
      </div>
    )
  }

  // filter banks on listing
  useEffect(() => {
    if (checkBoxValues?.length > 0) {
      const filteredBanks = filteredList?.filter((item) => {
        return checkBoxValues?.includes(item?.bank_name)
      })
      setCardsList(filteredBanks)
    } else {
      setCardsList(filteredList)
    }
  }, [checkBoxValues?.length])

  useEffect(() => {
    if (cardNetworkCheck?.length > 0) {
      const filterNetwork = filteredList?.filter((item) => {
        return cardNetworkCheck?.includes(item?.card_network)
      })
      setCardsList(filterNetwork)
    } else setCardsList(filteredList)
  }, [cardNetworkCheck?.length])

  useEffect(() => {
    if (filteredList?.length > 0) {
      setCardsList(filteredList)
      setJoiningFeeRange({ min: minJoiningFees, max: maxJoiningFees })
      setAnnualFeeRange({ min: minAnnualFee, max: maxAnnualFee })
      setAprRange({ min: minimumApr, max: maximumApr })
      setCreditScoreRange({ min: min, max: max })
    }
    const offers = localStorage?.getItem('subCategories')
    if (offers) {
      setSelectedOffers(offers)
    }
  }, [filteredList?.length])


  const handleGTM = () => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    const list = localStorage.getItem('listData') ? JSON.parse(localStorage.getItem('listData')) : {}

      TagManager?.dataLayer({
        dataLayer: {
          event: 'card_recommend_checked',
          recommend_product_list: list,
          date: formattedDate,
        },
      });
    }

  useEffect(() => {
    handleGTM();
  }, []);


  return (
    <div>
      <div className='h-auto container  mx-auto bg-[#F4F8FB] max-[1024px]:px-8 max-[991px]:max-w-full pt-[30px] max-sm:pt-[20px] pb-[60px] max-[576px]:pb-[50px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
        <HeadSection formInfo={formInfo} selectedOffers={selectedOffers} />
        <div className='list-none  items-center flex gap-4 max-[1440px]:gap-2 !overflow-x-scroll !whitespace-nowrap scrollbar-hide list-t max-[1200px]:px-0 mx-auto category-btn-scroll max-[479px]:pb-0 max-sm:mt-[30px]'>
          <div className='pl-2.5 flex flex-row gap-[10px] items-center justify-start'>
            <div className="text-neutral-800 text-[15px] font-semibold font-['Faktum'] lg:hidden">Filters</div>
            <Image
              src={FilterIcon}
              className='w-6 h-8 lg:hidden'
              alt='filtericon'
              onClick={(e) => handleFilterClick(e)}
            />
          </div>
        </div>
        <div className='md:hidden'> {getCheckBoxAboveList(checkBoxValues)}</div>
        {showFilterModal && (
          <MobileFilter
            BackArrow={BackArrow}
            handleClearFilter={handleClearFilter}
            setShowFilterModal={setShowFilterModal}
            isApplied={isApplied}
            isChecked={isChecked}
            checkBoxValues={checkBoxValues}
            cardNetworkCheck={cardNetworkCheck}
            starRating={starRating}
            cardsList={cardsList}
            handleClickProvider={handleClickProvider}
            selectIndexProvider={selectIndexProvider}
            providerActive={providerActive}
            banksNameArray={banksNameArray}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckboxChangeForLouge={handleCheckboxChangeForLouge}
            selectedIndex={selectedIndex}
            accordionArrowall={accordionArrowall}
            minJoiningFees={minJoiningFees}
            maxJoiningFees={maxJoiningFees}
            handleJoiningFeeRange={handleJoiningFeeRange}
            joiningFeeRange={joiningFeeRange}
            minimumApr={minimumApr}
            maximumApr={maximumApr}
            aprRange={aprRange}
            handleAprDataChange={handleAprDataChange}
            minAnnualFee={minAnnualFee}
            maxAnnualFee={maxAnnualFee}
            handleAnnualFeeChange={handleAnnualFeeChange}
            min={min}
            max={max}
            handleClick={handleClick}
            creditScoreRange={creditScoreRange}
            handleCreditScoreChange={handleCreditScoreChange}
            handleRatingdata={handleRatingdata}
            handleCardNetworkClick={handleCardNetworkClick}
            selectIndexCardNetwork={selectIndexCardNetwork}
            networkActive={networkActive}
            annualFeeRange={annualFeeRange}
            newDataCardNetwork={newDataCardNetwork}
            handleCardNetworkCheckBox={handleCardNetworkCheckBox}
          />
        )}

        <div className='container px-10 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
          <div className='grid 2xl:gap-8 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 gap-[20px] mt-[40px] max-sm:mt-[21px]'>
            {size?.width >= 992 && (
              <div className='2xl:col-span-1 xl:col-span-1 md:col-span-1 bg-none relative'>{getFilterComponent()}</div>
            )}
            {cardsList && (
              <CardsListing
                checkBoxValues={checkBoxValues}
                handleRemoveCategory={handleRemoveCategory}
                categoryActive={categoryActive}
                cardsList={cardsList}
                setCheckBoxValues={setCheckBoxValues}
                setCardsList={setCardsList}
                handleClearFilter={handleClearFilter}
                isSubCategoryFlow={false}
                totalProducts={cardsList?.length}
                url_slug={'url_slug'}
                isRecommendationFlow={true}
                isApplied={isApplied}
                filteredList={filteredList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationResult
