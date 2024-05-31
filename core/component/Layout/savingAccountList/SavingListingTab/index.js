/* eslint-disable react-hooks/exhaustive-deps */
import CreditCardsRoundButton from '@/core/component/common/CreditCardsRoundButton'
import React, { useEffect, useState } from 'react'
// import { SavingCardListAll, SavingListCards } from '@/utils/alljsonfile/savinglistcards'
import AccountListRight from '../AccountListRight'
import Image from 'next/image'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import {
  BalanceFilter,
  FeesFilter,
  Toppicks,
  DebitCarg,
  bankAccountsSortingOptions
} from '@/utils/alljsonfile/filterdata'
import InputRange from 'react-input-range'
import FilterIcon from '../../../../../public/assets/filter-icon.svg'
import BackArrow from '../../../../../public/assets/left-arrow.svg'
import CloseIcon from '../../../../../public/assets/closeIcon.svg'
import Link from 'next/link'
import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import {
  errorHandling,
  getKeyValueInfo,
  getSortKeyBankAccounts,
  lowToHigh,
  lowToHighSort,
  removeDuplicates
} from '@/utils/util'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import { BASE_URL, BUSINESSCATEGORY, BUSINESSSUBCATEGORY } from '@/utils/alljsonfile/service'
import axios from 'axios'

const SavingListingTab = ({
  subCategoryTabs,
  url_slug,
  bankAccountsData,
  leftMenuFilterData,
  isSubCategoryFlow = false,
  totalProducts,
  sub_cat_params,
  businessmetaheadtag
}) => {
  const starCount = 5
  const scrollValue = typeof window !== 'undefined' && window?.scrollY

  const size = useWindowSize()
  const router = useRouter()

  const [categoryActive, setCategoryActive] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const [bankAccountsList, setBankAccountsList] = useState(bankAccountsData)
  const [SelectIndex, setSelectIndex] = useState([])
  const [SelectFees, setSelectFees] = useState([])
  const [Picks, setPicks] = useState([])
  const [CardLimit, setCardLimit] = useState([])
  const [provideName, setProvideName] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [modal, setModal] = useState(false)
  const [providersFiltersName, setProvidersFiltersName] = useState([])
  const [starRating, setStarRating] = useState(null)
  const [dataCondition, setDataCondition] = useState(false)
  const [checkBoxValues, setCheckBoxValues] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rangeFilterApplied, setRangeFilterApplied] = useState(false)
  const [totalAccountsList, setTotalAccountsList] = useState(bankAccountsData)
  const [openSortBy, setOpenSortBy] = useState(false)
  const [selectedSortOption, setSelectedSortOption] = useState('Default')
  const [sortSelected, setSortSelected] = useState(false)

  //JOINING FEE
  const cardFee = bankAccountsData?.map((card) => {
    return card?.joining_fee
  })
  const minJoiningFees = cardFee ? Math.min(...cardFee) : 0
  const maxJoiningFees = cardFee ? Math.max(...cardFee) : 0
  const [joiningFeeRange, setJoiningFeeRange] = useState({ min: minJoiningFees, max: maxJoiningFees })

  // ANNUAL FEE
  const annualFee = bankAccountsData?.map((card) => {
    return card?.annual_fee
  })
  const minAnnualFee = annualFee ? Math.min(...annualFee) : 0
  const maxAnnualFee = annualFee ? Math.max(...annualFee) : 0
  const [annualFeeRange, setAnnualFeeRange] = useState({ min: minAnnualFee, max: maxAnnualFee })

  // DAILY ONLINE TRANSACTION LIMIT
  const transactionLimitOnline = totalAccountsList?.map((card) => {
    return card?.daily_txn_limit_online
  })
  const maxValueFromApi = transactionLimitOnline ? Math.max(...transactionLimitOnline) : 0
  const [transactionLmtOnline, setTransactionLmtOnline] = useState('')

  // MINIMUM MONTHLY BALANCE
  const minimumMonthly = totalAccountsList?.map((card) => card?.avg_mon_bal)
  const minMonthlyRange = minimumMonthly?.length > 0 ? Math.min(...minimumMonthly) : 0
  const maxMonthlyRange = minimumMonthly?.length > 0 ? Math.max(...minimumMonthly) : 0
  const [monthlyBalance, setMonthlyBalance] = useState({ min: minMonthlyRange, max: maxMonthlyRange })

  //MINIMUM BAL TO OPEN
  const minimumBalToOpen = totalAccountsList?.map((card) => {
    return card?.min_bal_to_open_ac
  })
  const maxBalValueFromApi = minimumBalToOpen ? Math.max(...minimumBalToOpen) : null
  const [minBalToOpen, setMinBalToOpen] = useState(null)

  //INTEREST
  const interestRange = totalAccountsList?.map((card) => {
    return card?.rate_of_interest
  })
  // check -
  // const checkIfAllSame = checkIfAllElementsAreSame(interestRange)

  const minInterestRange = interestRange ? Math.min(...interestRange) : null
  const maxInterestRange = interestRange ? Math.max(...interestRange) : null
  const [interestRate, setInterestRate] = useState({ min: minInterestRange, max: maxInterestRange })

  //WITHDRAWAL
  const minimumWithdrawal = totalAccountsList?.map((card) => {
    return card?.atm_with_limit_fpm
  })
  const maxWithdrawalFromApi = minimumWithdrawal ? Math.max(...minimumWithdrawal) : null
  const [atmWithdrawal, setATMwithdrawal] = useState(null)

  const banks = totalAccountsList || bankAccountsData

  const CategoryFilterData = (data) => {
    if (categoryActive?.includes(data)) {
      setCategoryActive(categoryActive.filter((selectedCategory) => selectedCategory !== data))
    } else {
      setCategoryActive([...categoryActive, data])
    }
  }

  const handleRemoveCategory = (index) => {
    categoryActive?.splice(index, 1)
    setCategoryActive([...categoryActive])
  }

  const handleClickName = (index) => {
    setIsActive(!isActive)
    if (provideName?.includes(index)) {
      const updateValue = provideName.indexOf(index)
      provideName.splice(updateValue, 1)
      setProvideName(provideName)
    } else {
      setProvideName([...provideName, index])
    }
  }

  const handleClick = (index) => {
    setIsActive(!isActive)
    if (SelectIndex?.includes(index)) {
      const updateValue = SelectIndex.indexOf(index)
      SelectIndex.splice(updateValue, 1)
      setSelectIndex(SelectIndex)
    } else {
      setSelectIndex([...SelectIndex, index])
    }
  }
  const handleClickFees = (index) => {
    setIsActive(!isActive)
    if (SelectFees?.includes(index)) {
      const updateValue = SelectFees.indexOf(index)
      SelectFees.splice(updateValue, 1)
      setSelectFees(SelectFees)
    } else {
      setSelectFees([...SelectFees, index])
    }
  }
  const handlePicks = (index) => {
    setIsActive(!isActive)
    if (Picks?.includes(index)) {
      const updateValue = Picks.indexOf(index)
      Picks.splice(updateValue, 1)
      setPicks(Picks)
    } else {
      setPicks([...Picks, index])
    }
  }
  const handleCard = (index) => {
    setIsActive(!isActive)
    if (CardLimit?.includes(index)) {
      const updateValue = CardLimit.indexOf(index)
      CardLimit.splice(updateValue, 1)
      setCardLimit(CardLimit)
    } else {
      setCardLimit([...CardLimit, index])
    }
  }

  const savingRadio = [
    { id: 1, amount: '0-2000' },
    { id: 2, amount: '2000-5000' },
    { id: 3, amount: '5000-10000' },
    { id: 4, amount: '10000-Above' }
  ]

  const getMax = (maxValue, value) => {
    if (value?.split('-')?.[1] === 'Above') {
      return Number(maxValue)
    } else return Number(value?.split('-')?.[1])
  }
  //MINIMUM BALANCE
  const handleMinimumBalance = (newValue) => {
    const { min, max } = newValue
    setMonthlyBalance(newValue)
    newValue && setRangeFilterApplied(true)
    const filterMinimumBalance = banks?.filter((item) => item?.avg_mon_bal >= min && item?.avg_mon_bal <= max)
    filterMinimumBalance && setBankAccountsList(filterMinimumBalance)
  }

  const FilterModal = (e) => {
    setModal(!modal)
  }

  // SUB CATEGORY/CATEGORY TABS CLICKS
  const handleTabClick = (item) => {
    if (item) {
      if (isSubCategoryFlow) {
        CategoryFilterData(item)
      } else if (url_slug === 'bank-accounts') {
        router?.push({
          pathname: `/bank-accounts/${item?.url_slug}`
        })
      }
    }
  }

  // GET BANKS NAMES FOR FILTER
  const getProvidersName = (data) => {
    const banksArray = data?.map((item) => {
      return item?.bank_name
    })
    const filter = removeDuplicates(banksArray)
    setProvidersFiltersName(filter)
  }

  // JOINING FEE
  const handleJoiningFeeRange = (newValue) => {
    const { min, max } = newValue
    setJoiningFeeRange(newValue)
    const filterJoining = banks?.filter((item) => item?.joining_fee >= min && item?.joining_fee <= max)
    filterJoining && setBankAccountsList(filterJoining)
  }
  // ANNUAL FEE
  const handleAnnualFeeChange = (value) => {
    const { min, max } = value
    setAnnualFeeRange(value)
    const filterAnnual = banks?.filter((item) => item?.annual_fee >= min && item?.annual_fee <= max)
    filterAnnual && setBankAccountsList(filterAnnual)
  }
  //RATING
  const handleRatingdata = (rating) => {
    setStarRating(rating)
    const filterRating = banks?.filter((item) => {
      return Math.round(item?.rating) === rating
    })
    filterRating && setBankAccountsList(filterRating)
  }
  // SPEND LIMIT ONLINE
  const handleMinimumSpendLimit = (value) => {
    // setTransactionLmtOnline(value)
    const min = Number(value?.split('-')?.[0])
    const max = getMax(maxValueFromApi, value)
    const filtered = banks?.filter(
      (item) =>
        item?.daily_txn_limit_online && item?.daily_txn_limit_online >= min && item?.daily_txn_limit_online <= max
    )
    filtered && setBankAccountsList(filtered)
  }
  //MINIMUM TO OPEN
  const handleMinimumBalToOpen = (value) => {
    const min = Number(value?.split('-')?.[0])
    const max = getMax(maxBalValueFromApi, value)
    const filteredData = banks?.filter(
      (item) => item?.min_bal_to_open_ac && item?.min_bal_to_open_ac >= min && item?.min_bal_to_open_ac <= max
    )
    setMinBalToOpen(value)
    filteredData && setBankAccountsList(filteredData)
  }

  //INTEREST RATE
  const handleInterestRateChange = (interest) => {
    const { min, max } = interest
    setInterestRate(interest)
    interest && setRangeFilterApplied(true)
    const filterInterest = banks?.filter(
      (item) => item?.rate_of_interest && item?.rate_of_interest >= min && item?.rate_of_interest <= max
    )
    filterInterest && setBankAccountsList(filterInterest)
  }

  // ATM WITHDRAWAL
  const handleATMWindrawal = (value) => {
    const min = Number(value?.split('-')?.[0])
    const max = getMax(maxWithdrawalFromApi, value)
    const filtered = banks?.filter(
      (item) =>
        item?.atm_with_limit_fpm && Number(item?.atm_with_limit_fpm) >= min && Number(item?.atm_with_limit_fpm) <= max
    )
    setATMwithdrawal(value)
    filtered && setBankAccountsList(filtered)
  }

  // CLEAR ALL FUNCTION
  const handleClearFilter = () => {
    setModal(false)
    setBankAccountsList(bankAccountsData)
    setDataCondition(true)
    setAnnualFeeRange({ min: minAnnualFee, max: maxAnnualFee })
    setMonthlyBalance({ min: minMonthlyRange, max: maxMonthlyRange })
    setJoiningFeeRange({ min: minJoiningFees, max: maxJoiningFees })
    setInterestRate({ min: minInterestRange, max: maxInterestRange })
    setCheckBoxValues([])
    setMinBalToOpen(null)
    setATMwithdrawal(null)
    setStarRating(null)
  }

  // BANKS NAME FILTER FUNCTION
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setCheckBoxValues([...checkBoxValues, value])
    } else {
      setCheckBoxValues(checkBoxValues.filter((v) => v !== value))
    }
  }

  // filters info
  const getAllFitersInfo = (data) => {
    const monthBalance = getKeyValueInfo(data, 'avg_mon_bal')
    const min = monthBalance?.length > 0 ? Math.min(...monthBalance) : 0
    const max = monthBalance?.length > 0 ? Math.max(...monthBalance) : 0
    setMonthlyBalance({ min: min, max: max })
    getProvidersName(data)
  }

  // FETCH BANKS ACCOUNTS
  const getBankAccountsData = () => {
    let apiEndPoint = ''
    let params = {}

    if (isSubCategoryFlow) {
      apiEndPoint = BASE_URL + BUSINESSSUBCATEGORY.productListCatSub
      params = sub_cat_params
    } else {
      apiEndPoint = BASE_URL + BUSINESSCATEGORY.productListCategory
      params = { lang_id: 1, business_category_url_slug: url_slug, offset: 0, limit: 200 }
    }
    axios
      .post(apiEndPoint, params)
      .then((res) => {
        setTotalAccountsList(res?.data?.product_list)
        getAllFitersInfo(res?.data?.product_list)
      })
      .catch((err) => {
        errorHandling(err)
      })
  }

  // HANDLE PAGINATION PAGE CHANGE
  const onPageChange = async (page) => {
    setCurrentPage(page)
    setShowLoader(true)
    router?.push({
      pathname: `/${url_slug}`,
      query: `page=${page}`
    })
    bankAccountsData && setBankAccountsList(bankAccountsData)
    setShowLoader(false)
  }

  // CHECKBOX REMOVE
  const handleCheckBoxRemove = (index) => {
    if (isSubCategoryFlow) {
      categoryActive?.splice(index, 1)
      setCategoryActive([...categoryActive])
      setBankAccountsList(bankAccountsList)
    } else {
      checkBoxValues?.splice(index, 1)
      setCheckBoxValues([...checkBoxValues])
      setBankAccountsList(bankAccountsList)
    }
  }

  // CHECKBOXES
  const getCheckBoxAboveList = (data) => {
    return (
      <ul className='list-none flex gap-4  list-t  lg:hidden max-[1024px]:overflow-x-scroll max-[1024px]:whitespace-nowrap scrollbar-hide pt-4'>
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

  // ......................................... SORTING OPTIONS................................. //
  const handleLowToHigh = (parentName) => {
    const sortKey = getSortKeyBankAccounts(parentName)
    const list = lowToHighSort(totalAccountsList || bankAccountsData, sortKey)
    setBankAccountsList(list)
    setOpenSortBy(false)
  }

  const handleHighToLow = (parentName) => {
    const sortKey = getSortKeyBankAccounts(parentName)
    const list = lowToHighSort(totalAccountsList || bankAccountsData, sortKey)
    setBankAccountsList(list?.reverse())
    setOpenSortBy(false)
  }

  const handleSortingOptionClick = (name) => {
    if (size?.width < 768) setSortSelected(true)
    setSelectedSortOption(name)
    const values = name?.split(':')
    if (values?.[1] === lowToHigh) {
      handleLowToHigh(values?.[0])
    } else handleHighToLow(values?.[0])
    setModal(false)
  }

  // ----------DESKTOP ------ //
  const getSortingOptionsPlp = () => {
    const readMoreOpen = typeof window !== 'undefined' && localStorage.getItem('readMore')
    const moreOpen = readMoreOpen === 'true'

    const tabsInfo = isSubCategoryFlow && businessmetaheadtag?.is_bank === 0 ? providersFiltersName : subCategoryTabs
    const noRoundedButtons = tabsInfo?.length === 0 || tabsInfo?.length === undefined

    const forCategoryPage =
      scrollValue === 0 ? (moreOpen ? 'top-[520px]' : 'top-[464px]') : moreOpen ? 'top-[480px]' : 'top-[410px]'

    const forNoBanksandSubCatPage =
      scrollValue === 0 ? (moreOpen ? 'top-[460px]' : 'top-[390px]') : moreOpen ? 'top-[400px]' : 'top-[340px]'

    const forSubCategoryPage = noRoundedButtons
      ? forNoBanksandSubCatPage
      : scrollValue === 0
        ? moreOpen
          ? 'top-[500px]'
          : 'top-[446px]'
        : moreOpen
          ? 'top-[450px]'
          : 'top-[394px]'

    return (
      <div className='flex flex-row items-center justify-end md:gap-2 gap-4 px-2 max-[628px]:overflow-x-scroll !whitespace-nowrap scrollbar-hide category-btn-scroll'>
        <div className="text-neutral-800 md:text-[14px] text-[12px] font-semibold font-['Poppins']">SORT BY :</div>
        <div className='flex flex-col items-center justify-center md:gap-0' onMouseLeave={() => setOpenSortBy(false)}>
          <div
            onMouseOver={() => setOpenSortBy(true)}
            className={` w-[300px] flex flex-row justify-between shadow-md px-2 items-start ${
              !openSortBy
                ? 'border border-[#212529] rounded-[5px]'
                : 'border border-[#212529] border-b-0 rounded-t-[5px]'
            } md:h-[45px] h-auto cursor-pointer bg-white text-center text-[12px] font-medium md:py-[14px] max-[628px]:py-[12px] relative`}>
            <div className='hover:text-[12px] font-medium '>{selectedSortOption}</div>
            <div type='button' onClick={() => setOpenSortBy(!openSortBy)}>
              <Image
                src={accordionArrowall}
                alt='arrow'
                width={17}
                height={17}
                priority={true}
                className={openSortBy ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
              />
            </div>
          </div>
          {openSortBy && (
            <>
              <div
                className={`border-t-0 border border-[#212529] shadow-md rounded-b-[5px] w-[300px] pl-2 h-auto  bg-white flex flex-col gap-[12px] items-start justify-start absolute ${
                  isSubCategoryFlow ? forSubCategoryPage : forCategoryPage
                }`}>
                {bankAccountsSortingOptions?.map((item) => {
                  return (
                    <div key={item?.id} className='last:pb-4 first:pt-2'>
                      <div
                        className='hover:text-[#a882dd] cursor-pointer hover:text-[13px] text-[13px] w-[300px]'
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

  // ----------MOBILE -------- //
  const getMobileSortingOptions = () => {
    return (
      <>
        <div className='flex flex-col items-start justify-start'>
          <div className='text-[15px] text-[#212529] font-semibold filter-text-resolution'>Sort By :</div>
          <div className={`h-auto  bg-white flex flex-col gap-2 items-start justify-start mt-2`}>
            {bankAccountsSortingOptions?.map((item) => {
              return (
                <div key={item?.id} className=''>
                  <div
                    className='text-[#212529] hover:text-[#212529] text-[14px] hover:!underline'
                    onClick={() => handleSortingOptionClick(item?.name)}>
                    {item?.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }

  // category tabs filter data
  useEffect(() => {
    if (categoryActive?.length > 0 && isSubCategoryFlow) {
      const filterBanks = banks?.filter((element) => {
        return categoryActive?.includes(element?.bank_name)
      })
      setBankAccountsList(filterBanks)
    } else {
      setBankAccountsList(bankAccountsData)
    }
  }, [categoryActive?.length])

  // filter banks on listing
  useEffect(() => {
    if (checkBoxValues?.length > 0) {
      const filteredBanks = banks?.filter((item) => {
        return checkBoxValues?.includes(item?.bank_name)
      })
      setBankAccountsList(filteredBanks)
    } else {
      setBankAccountsList(bankAccountsData)
    }
  }, [checkBoxValues?.length])

  // On page change to set the accounts data
  useEffect(() => {
    if (bankAccountsData && currentPage !== 0) {
      setBankAccountsList(bankAccountsData)
    }
  }, [currentPage, bankAccountsData])

  // to initially call the accounts data to get full list
  useEffect(() => {
    getBankAccountsData()
  }, [])

  // constants
  const topPicks = leftMenuFilterData?.top_category
  const moreFeatures = leftMenuFilterData?.more_way_to_browse
  const creditScore = leftMenuFilterData?.more_by_category

  const minCond = joiningFeeRange?.min !== 0 && joiningFeeRange?.min !== joiningFeeRange?.max
  const annualMinCond = annualFeeRange?.min !== 0 && annualFeeRange?.min !== annualFeeRange?.max

  const isApplied =
    checkBoxValues?.length !== 0 ||
    minCond ||
    annualMinCond ||
    minBalToOpen !== null ||
    atmWithdrawal !== null ||
    starRating !== null ||
    sortSelected

  const checkBoxList = isSubCategoryFlow ? categoryActive : checkBoxValues

  return (
    <>
      {showLoader && <LoaderComponent />}
      <div className='container max-md:px-4 mx-auto max-[991px]:max-w-full mt-[10px]'>
        <div className='list-none  items-center flex !overflow-x-scroll !whitespace-nowrap scrollbar-hide list-t max-[1200px]:px-0 mx-auto  pb-4 category-btn-scroll max-[479px]:pb-0'>
          <div className='pl-2.5'>
            <Image src={FilterIcon} className='w-6 h-8 lg:hidden' alt='filtericon' onClick={(e) => FilterModal(e)} />
          </div>
          <div className='category-scroll-parent'>
            <div className='category-scroll-child'>
              {/* TABS */}
              {isSubCategoryFlow && businessmetaheadtag?.is_bank === 0
                ? providersFiltersName?.map((filterTab, index) => {
                    return (
                      <>
                        <div key={index}>
                          <CreditCardsRoundButton
                            name={filterTab}
                            onClick={() => {
                              handleTabClick(filterTab)
                            }}
                            className={
                              categoryActive?.includes(filterTab)
                                ? 'recommendation-category head-text font-[faktum] capitalize'
                                : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-6 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit '
                            }
                          />
                        </div>
                      </>
                    )
                  })
                : subCategoryTabs?.category_info?.map((filterTab, index) => {
                    return (
                      <>
                        <div key={index}>
                          <CreditCardsRoundButton
                            name={filterTab?.title}
                            onClick={() => {
                              handleTabClick(filterTab)
                            }}
                            className={
                              categoryActive?.includes(filterTab)
                                ? 'recommendation-category head-text font-[faktum] capitalize'
                                : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-6 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit '
                            }
                          />
                        </div>
                      </>
                    )
                  })}
            </div>
          </div>
        </div>
        {/* ........MOBILE FILTERED PROVIDERS NAMES TABS....... */}
        <div className='md:hidden'> {getCheckBoxAboveList(checkBoxList)}</div>
        <div>
          <div className='grid 2xl:gap-8 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 gap-4 mt-6'>
            {/* DESKTOP */}
            {size.width >= 992 && (
              <div className='2xl:col-span-1 xl:col-span-1 md:col-span-1 bg-none  relative'>
                <div className='xl:py-8 lg:py-4 border border-[#C2CACF] border-l-0  filter-resolution credit-left-filter filter-credit '>
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
                  {!isSubCategoryFlow && (
                    <div className='pb-6 border-b border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                      <div className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'>
                        <p className='text-[15px] font-semibold text-[#212529]'>Provider’s Name</p>
                      </div>
                      <div className='h-auto overflow-y-scroll-auto'>
                        {/* PROVIDER CHECKBOX */}
                        {providersFiltersName?.map((check, index) => {
                          return (
                            <>
                              <div key={index}>
                                <div className='flex pb-1 '>
                                  <input
                                    type='checkbox'
                                    id='vehicle1'
                                    className='mr-3'
                                    value={check}
                                    checked={checkBoxValues?.includes(check)}
                                    onChange={(e) => handleCheckboxChange(e)}
                                  />
                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] !capitalize  filter-box-text  '>
                                    {check}
                                  </span>
                                </div>
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 border-b filter-scroll'>
                    {BalanceFilter.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            id='accordionExample'
                            data-active-classes='bg-none'
                            data-inactive-classes='text-[#212529]'>
                            <button
                              className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
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
                              {SelectIndex?.includes(index) ? (
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

                            {SelectIndex?.includes(index) && (
                              <div
                                id='collapseOne'
                                className='!visible inputRangeClass'
                                data-te-collapse-item
                                data-te-collapse-show
                                aria-labelledby='headingOne'
                                data-te-parent='#accordionExample'>
                                <div>
                                  {data.slug === 'INR' && (
                                    //min balance to open account
                                    <>
                                      {savingRadio.map((balance, index) => {
                                        return (
                                          <div key={index}>
                                            <div className='flex pb-1'>
                                              <input
                                                type='radio'
                                                name='city'
                                                value={!dataCondition ? balance?.amount : ''}
                                                className='mr-3'
                                                onChange={(e) => handleMinimumBalToOpen(e?.target?.value)}
                                              />
                                              <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                {balance.amount}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </>
                                  )}
                                  {data.slug === 'minimumBalance' && (
                                    <>
                                      <InputRange
                                        minValue={minMonthlyRange}
                                        maxValue={maxMonthlyRange}
                                        value={monthlyBalance}
                                        onChange={handleMinimumBalance}
                                      />
                                    </>
                                  )}
                                  {data.slug === 'interestRate' && (
                                    <>
                                      <InputRange
                                        minValue={minInterestRange}
                                        maxValue={maxInterestRange}
                                        value={interestRate}
                                        onChange={handleInterestRateChange}
                                      />
                                    </>
                                  )}
                                  {data.slug === 'joinFee' && (
                                    <>
                                      <InputRange
                                        minValue={minJoiningFees}
                                        maxValue={maxJoiningFees}
                                        value={joiningFeeRange}
                                        onChange={handleJoiningFeeRange}
                                      />
                                    </>
                                  )}
                                  {data.slug === 'bankRating' && (
                                    <>
                                      <ReactStars
                                        count={starCount}
                                        onChange={handleRatingdata}
                                        size={24}
                                        value={starRating}
                                        half={false}
                                        color1={'#ccc'}
                                        color2={'#49d49d'}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 border-b filter-scroll'>
                    {FeesFilter.map((data, index) => {
                      return (
                        <div key={index}>
                          <div
                            id='accordionExample'
                            data-active-classes='bg-none'
                            data-inactive-classes='text-[#212529]'>
                            <button
                              className='flex filter-allof cursor-pointer items-center justify-between w-full font-medium text-left text-gray-500rounded-t-xl'
                              type='button'
                              id='headingOne'
                              data-te-collapse-init
                              onClick={() => {
                                handleClickFees(index)
                              }}
                              data-te-target='#collapseOne'
                              aria-expanded='true'
                              aria-controls='collapseOne'>
                              <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                {data.Titlef}
                              </p>
                              {SelectFees?.includes(index) ? (
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

                            {SelectFees?.includes(index) && (
                              <div
                                id='collapseOne'
                                className='!visible'
                                data-te-collapse-item
                                data-te-collapse-show
                                aria-labelledby='headingOne'
                                data-te-parent='#accordionExample'>
                                <div>
                                  {data.slug === 'INR' && (
                                    <>
                                      {savingRadio.map((balance, index) => {
                                        return (
                                          <div key={index}>
                                            <div className='flex pb-1'>
                                              <input type='radio' name='city' value='city' className='mr-3' />
                                              <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                {balance.amount}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </>
                                  )}

                                  {/* {data.slug === 'annuleFee' && (
                                    <>
                                      <InputRange
                                        minValue={minAnnualFee}
                                        maxValue={maxAnnualFee}
                                        value={annualFeeRange}
                                        onChange={handleAnnualFeeChange}
                                      />
                                    </>
                                  )}
                                  {data.slug === 'joinFee' && (
                                    <>
                                      <>
                                        <InputRange
                                          minValue={minJoiningFees}
                                          maxValue={maxJoiningFees}
                                          value={joiningFeeRange}
                                          onChange={handleJoiningFeeRange}
                                        />
                                      </>
                                    </>
                                  )} */}
                                  {data.slug === 'bankRating' && (
                                    <>
                                      <ReactStars
                                        count={starCount}
                                        onChange={handleRatingdata}
                                        size={24}
                                        value={starRating}
                                        half={false}
                                        color1={'#ccc'}
                                        color2={'#49d49d'}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {(topPicks || moreFeatures || creditScore) && (
                    <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4  filter-scroll'>
                      {Toppicks?.map((data, index) => {
                        return (
                          <div key={index}>
                            <p className='text-[15px] text-[#212529] font-semibold filter-text-resolution mb-[10px] mt-[10px]'>
                              {data.Titlef}
                            </p>
                            {data.slug === 'INR' && (
                              <>
                                {savingRadio.map((balance, index) => {
                                  return (
                                    <div key={index}>
                                      <div className='flex pb-1'>
                                        <input type='radio' name='city' value='city' className='mr-3' />
                                        <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                          {balance.amount}
                                        </span>
                                      </div>
                                    </div>
                                  )
                                })}
                              </>
                            )}

                            {data.slug === 'topPick' && (
                              <>
                                {topPicks?.map((balance, index) => {
                                  return (
                                    <div key={index}>
                                      <div className='flex pb-1'>
                                        {/* <input type='radio' name='city' value='city' className='mr-3' /> */}
                                        <Link href={`/bank-accounts/${balance?.url_slug}`} prefetch={false}>
                                          <span className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'>
                                            {balance?.title}
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  )
                                })}
                              </>
                            )}
                            {data.slug === 'creditScore' && (
                              <>
                                {creditScore?.map((balance, index) => {
                                  return (
                                    <div key={index}>
                                      <div className='flex pb-1'>
                                        {/* <input type='radio' name='city' value='city' className='mr-3' /> */}
                                        <Link href={`/bank-accounts/${balance?.url_slug}`} prefetch={false}>
                                          <span className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'>
                                            {balance?.title}
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  )
                                })}
                              </>
                            )}
                            {data.slug === 'creditFeatures' && (
                              <>
                                {moreFeatures?.map((balance, index) => {
                                  return (
                                    <div key={index}>
                                      <div className='flex pb-1'>
                                        {/* <input type='radio' name='city' value='city' className='mr-3' /> */}
                                        <Link href={`/bank-accounts/${balance?.url_slug}`} prefetch={false}>
                                          <span className='text-[15px] flex items-center gap-2 text-[#000]  filter-box-text hover:!underline'>
                                            {balance?.title}
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  )
                                })}
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            <AccountListRight
              checkBoxValues={isSubCategoryFlow ? categoryActive : checkBoxValues}
              handleRemoveCategory={handleRemoveCategory}
              categoryActive={categoryActive}
              SavingCardListAll={bankAccountsList}
              setCheckBoxValues={setCheckBoxValues}
              setBankAccountsList={setBankAccountsList}
              handleClearFilter={handleClearFilter}
              isSubCategoryFlow={isSubCategoryFlow}
              totalProducts={totalProducts}
              url_slug={url_slug}
              onPageChange={onPageChange}
              currentPage={currentPage}
              isApplied={isApplied}
              getSortingOptionsPlp={getSortingOptionsPlp}
            />
          </div>
        </div>

        {modal && (
          <>
            <div className='fixed z-[9999] overflow-y-auto top-0 w-full left-0 ' id='modal'>
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
                          className='  text-[#212529] cursor-pointer rounded  mr-2'
                          style={{ color: 'red' }}
                          onClick={(e) => setModal(false)}>
                          <Image src={BackArrow} alt='img' className='  w-[30px] h-auto' />
                        </button>

                        <p className=' font-bold text-[18px] text-[#212529] uppercase'>Filters</p>
                        {isApplied && (
                          <button
                            onClick={() => {
                              handleClearFilter()
                            }}
                            className='text-[#49D49D] cursor-pointer font-bold text-[18px] ml-32'>
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>
                    <div className='md:px-8 md:pt-8  p-5  rounded-lg   filter-credit w-full pb-[5rem] bg-white'>
                      {!isSubCategoryFlow && (
                        <div className='pb-6 border-b border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                          <div className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500 rounded-t-xl'>
                            <p className='text-[15px] font-semibold text-[#212529]'>Provider’s Name</p>
                          </div>
                          <div className='h-40 '>
                            {providersFiltersName?.map((check, index) => {
                              return (
                                <>
                                  <div key={index}>
                                    <div className='flex pb-1 '>
                                      <input
                                        type='checkbox'
                                        id='vehicle1'
                                        className='mr-3'
                                        value={check}
                                        checked={checkBoxValues?.includes(check)}
                                        onChange={(e) => handleCheckboxChange(e)}
                                      />
                                      <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] !capitalize  filter-box-text  '>
                                        {check}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 border-b filter-scroll'>
                        {BalanceFilter.map((data, index) => {
                          return (
                            <div key={index}>
                              <div
                                id='accordionExample'
                                data-active-classes='bg-none'
                                data-inactive-classes='text-[#212529]'>
                                <button
                                  className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
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
                                  {SelectIndex?.includes(index) ? (
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

                                {SelectIndex?.includes(index) && (
                                  <div
                                    id='collapseOne'
                                    className='!visible inputRangeClass'
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby='headingOne'
                                    data-te-parent='#accordionExample'>
                                    <div>
                                      {data.slug === 'INR' && (
                                        // min balance to open mobile
                                        <>
                                          {savingRadio.map((balance, index) => {
                                            return (
                                              <div key={index}>
                                                <div className='flex pb-1'>
                                                  <input
                                                    type='radio'
                                                    name='city'
                                                    value={!dataCondition ? balance.amount : ''}
                                                    className='mr-3'
                                                    onChange={(e) => handleMinimumBalToOpen(e?.target?.value)}
                                                  />
                                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                    {balance.amount}
                                                  </span>
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </>
                                      )}
                                      {data.slug === 'minimumBalance' && (
                                        <>
                                          <InputRange
                                            minValue={minMonthlyRange}
                                            maxValue={maxMonthlyRange}
                                            value={monthlyBalance}
                                            onChange={handleMinimumBalance}
                                          />
                                        </>
                                      )}
                                      {data.slug === 'interestRate' && (
                                        <>
                                          <InputRange
                                            minValue={minInterestRange}
                                            maxValue={maxInterestRange}
                                            value={interestRate}
                                            onChange={handleInterestRateChange}
                                          />
                                        </>
                                      )}
                                      {/* {data.slug === 'annuleFee' && (
                                        <>
                                          <InputRange
                                            minValue={minAnnualFee}
                                            maxValue={maxAnnualFee}
                                            value={annualFeeRange}
                                            onChange={handleAnnualFeeChange}
                                          />
                                        </>
                                      )}
                                      {data.slug === 'joinFee' && (
                                        <>
                                          <>
                                            <InputRange
                                              minValue={minJoiningFees}
                                              maxValue={maxJoiningFees}
                                              value={joiningFeeRange}
                                              onChange={handleJoiningFeeRange}
                                            />
                                          </>
                                        </>
                                      )} */}
                                      {data.slug === 'bankRating' && (
                                        <>
                                          <ReactStars
                                            count={starCount}
                                            onChange={handleRatingdata}
                                            size={24}
                                            value={starRating}
                                            half={false}
                                            color1={'#ccc'}
                                            color2={'#49d49d'}
                                          />
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 border-b filter-scroll'>
                        {FeesFilter.map((data, index) => {
                          return (
                            <div key={index}>
                              <div
                                id='accordionExample'
                                data-active-classes='bg-none'
                                data-inactive-classes='text-[#212529]'>
                                <button
                                  className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
                                  type='button'
                                  id='headingOne'
                                  data-te-collapse-init
                                  onClick={() => {
                                    handleClickFees(index)
                                  }}
                                  data-te-target='#collapseOne'
                                  aria-expanded='true'
                                  aria-controls='collapseOne'>
                                  <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                    {data.Titlef}
                                  </p>
                                  {SelectFees?.includes(index) ? (
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

                                {SelectFees?.includes(index) && (
                                  <div
                                    id='collapseOne'
                                    className='!visible'
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby='headingOne'
                                    data-te-parent='#accordionExample'>
                                    <div>
                                      {data.slug === 'INR' && (
                                        <>
                                          {savingRadio.map((balance, index) => {
                                            return (
                                              <div key={index}>
                                                <div className='flex pb-1'>
                                                  <input type='radio' name='city' value='city' className='mr-3' />
                                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                    {balance.amount}
                                                  </span>
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </>
                                      )}

                                      {/* {data.slug === 'annuleFee' && (
                                        <>
                                          <InputRange
                                            minValue={minAnnualFee}
                                            maxValue={maxAnnualFee}
                                            value={annualFeeRange}
                                            onChange={handleAnnualFeeChange}
                                          />
                                        </>
                                      )}
                                      {data.slug === 'joinFee' && (
                                        <>
                                          <>
                                            <InputRange
                                              minValue={minJoiningFees}
                                              maxValue={maxJoiningFees}
                                              value={joiningFeeRange}
                                              onChange={handleJoiningFeeRange}
                                            />
                                          </>
                                        </>
                                      )} */}
                                      {data.slug === 'bankRating' && (
                                        <>
                                          <ReactStars
                                            count={starCount}
                                            onChange={handleRatingdata}
                                            size={24}
                                            value={starRating}
                                            half={false}
                                            color1={'#ccc'}
                                            color2={'#49d49d'}
                                          />
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {(topPicks || moreFeatures || creditScore) && (
                        <div className='py-6 border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4  filter-scroll'>
                          {Toppicks?.map((data, index) => {
                            return (
                              <div key={index}>
                                <p className='text-[15px] text-[#212529] font-semibold filter-text-resolution mb-[10px] mt-[10px]'>
                                  {data.Titlef}
                                </p>

                                {data.slug === 'INR' && (
                                  <>
                                    {savingRadio.map((balance, index) => {
                                      return (
                                        <div key={index}>
                                          <div className='flex pb-1'>
                                            <input type='radio' name='city' value='city' className='mr-3' />
                                            <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                              {balance.amount}
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </>
                                )}

                                {data.slug === 'topPick' && (
                                  <>
                                    {topPicks?.map((balance, index) => {
                                      console.log(balance)
                                      return (
                                        <div key={index}>
                                          <div className='flex pb-1'>
                                            <Link href={`/bank-accounts/${balance?.url_slug}`} prefetch={false}>
                                              <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                {balance?.title}
                                              </span>
                                            </Link>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                                {data.slug === 'creditScore' && (
                                  <>
                                    {creditScore?.map((balance, index) => {
                                      return (
                                        <div key={index}>
                                          <div className='flex pb-1'>
                                            {/* <input type='radio' name='city' value='city' className='mr-3' /> */}
                                            <Link href={`/bank-accounts/${balance?.url_slug}`} prefetch={false}>
                                              <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text hover:!underline'>
                                                {balance?.title}
                                              </span>
                                            </Link>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                                {data.slug === 'creditFeatures' && (
                                  <>
                                    {moreFeatures?.map((balance, index) => {
                                      return (
                                        <div key={index}>
                                          <div className='flex pb-1'>
                                            {/* <input type='radio' name='city' value='city' className='mr-3' /> */}
                                            <Link href={`/bank-accounts/${balance?.url_slug}`} prefetch={false}>
                                              <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text hover:!underline'>
                                                {balance?.title}
                                              </span>
                                            </Link>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                      <div className='border-[#C2CACF] xl:pr-[17px] lg:pr-4 md:pr-4 filter-scroll'>
                        {DebitCarg.map((data, index) => {
                          return (
                            <div key={index}>
                              <div
                                id='accordionExample'
                                data-active-classes='bg-none'
                                data-inactive-classes='text-[#212529]'>
                                <button
                                  className='flex filter-allof cursor-pointer items-center justify-between w-full py-3 font-medium text-left text-gray-500rounded-t-xl'
                                  type='button'
                                  id='headingOne'
                                  data-te-collapse-init
                                  onClick={() => {
                                    handleCard(index)
                                  }}
                                  data-te-target='#collapseOne'
                                  aria-expanded='true'
                                  aria-controls='collapseOne'>
                                  <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>
                                    {data.Titlef}
                                  </p>
                                  {CardLimit?.includes(index) ? (
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

                                {CardLimit?.includes(index) && (
                                  <div
                                    id='collapseOne'
                                    className='!visible'
                                    data-te-collapse-item
                                    data-te-collapse-show
                                    aria-labelledby='headingOne'
                                    data-te-parent='#accordionExample'>
                                    <div>
                                      {data.slug === 'ATM' && (
                                        <>
                                          {/* Debit Card ATM Withdrawal Limit  MOBILE */}
                                          {savingRadio.map((balance, index) => {
                                            return (
                                              <div key={index}>
                                                <div className='flex pb-1'>
                                                  <input
                                                    type='radio'
                                                    name='city'
                                                    value={balance.amount}
                                                    className='mr-3'
                                                  />
                                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                    {balance.amount}
                                                  </span>
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </>
                                      )}
                                      {data.slug === 'spendLimit' && (
                                        <>
                                          {savingRadio.map((balance, index) => {
                                            return (
                                              <div key={index}>
                                                <div className='flex pb-1'>
                                                  <input
                                                    type='radio'
                                                    name='city'
                                                    value={!dataCondition ? balance.amount : ''}
                                                    className='mr-3'
                                                    onChange={(e) => handleMinimumSpendLimit(e?.target?.value)}
                                                  />
                                                  <span className='text-[15px] flex items-center gap-2 cursor-pointer text-[#000] filter-box-text '>
                                                    {balance.amount}
                                                  </span>
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className='mt-4 mb-[1rem]'> {getMobileSortingOptions()}</div>
                    </div>
                  </div>
                </div>
                <div className='fixed  bottom-0 z-[9999] left-0 w-full py-4 px-5 bg-white grid grid-cols-2 justify-between items-center md:px-8 modal-sticky-clear'>
                  <button
                    onClick={() => {
                      setModal(false)
                    }}
                    className='text-[#212529] cursor-pointer font-bold text-[15px] text-left'>
                    Close
                  </button>
                  <button
                    onClick={(e) => {
                      setModal(false)
                    }}
                    className=' py-3 w-full lg:w-[160px] md:w-full cursor-pointer rounded-lg text-[#212529] bg-[#49D49D] max-[320px]:text-[14px]'>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SavingListingTab
