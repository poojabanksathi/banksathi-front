/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FilterIcon from '../../../../../public/assets/filter-icon.svg'
// import sortingIcon from '../../../../../public/assets/sort-icon.svg'
import CreditCardsRoundButton from '@/core/component/common/CreditCardsRoundButton'
import CloseIcon from '../../../../../public/assets/closeIcon.svg'
import PersonalLoanFilter from '../PersonalLoanFilter/PersonalLoanFilter'
import PersonalLoanCards from '../PersonalLoanCards/PersonalLoanCards'
import { useWindowSize } from '@/hooks/useWindowSize'
import LoanMobileFilter from '../LoanMobileFilter/LoanMobileFilter'
import LoanSortingFilter from '../LoanSortingFilter/LoanSortingFilter'
import { commonMinMaxInputRangeFilter, getKeyValueInfo } from '@/utils/util'
import { useRouter } from 'next/router'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'

const PersonalLoanListing = ({
  personalProducts,
  allPersonalProducts,
  subCategoryTabs,
  url_slug,
  isSubCategoryFlow,
  hidePagination = false,
  recommendationFlow = false
}) => {
  const size = useWindowSize()
  const router = useRouter()

  const isMobile = size?.width <= 576
  const isTablet = size?.width === 768
  const allProducts = allPersonalProducts?.product_list

  const [openSortBy, setOpenSortBy] = useState(false)
  const [subCategoryTab, setSubCategoryTab] = useState([])
  const [viewDetailsIndex, setViewDetailsIndex] = useState([])
  const [banksArrayList, setBanksArrayList] = useState([])
  const [personalProductList, setPersonalProductList] = useState(personalProducts?.product_list)

  // LOAN AMOUNT
  const minLoans = getKeyValueInfo(allPersonalProducts?.product_list, 'loan_amount_min')
  const maxLoans = getKeyValueInfo(allPersonalProducts?.product_list, 'loan_amount_max')

  const minLoanVal = minLoans ? Math.min(...minLoans) : 0
  const maxLoanVal = maxLoans ? Math.max(...maxLoans) : 0

  const [loanAmount, setLoanAmount] = useState(minLoanVal || 0)

  // LOAN TENURE
  const minLoanTenure = getKeyValueInfo(allPersonalProducts?.product_list, 'loan_tenure_min')
  const maxLoanTenure = getKeyValueInfo(allPersonalProducts?.product_list, 'loan_tenure_max')
  const minTenureVal = minLoanTenure ? Math.min(...minLoanTenure) : 0
  const maxTenureVal = maxLoanTenure ? Math.max(...maxLoanTenure) : 0

  const [loanTenure, setLoanTenure] = useState(minTenureVal || 0)

  // INTEREST RATE
  const minInterestRate = getKeyValueInfo(allPersonalProducts?.product_list, 'interest_rate_min')
  const maxInterestRate = getKeyValueInfo(allPersonalProducts?.product_list, 'interest_rate_max')
  const minInterestVal = Math.min(...minInterestRate)
  const maxInterestVal = maxInterestRate ? Math.max(...maxInterestRate) : 0
  const [interestRate, setInterestRate] = useState(minInterestVal || 0)

  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [selectedAccordion, setSelectedAccordion] = useState([0, 1, 2, 3])
  const [checkBoxValues, setCheckBoxValues] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showLoader, setShowLoader] = useState(false)

  // CLEAR ALL ENABLE
  const enableClearAll =
    checkBoxValues?.length > 0 ||
    loanAmount !== minLoanVal ||
    loanTenure !== minTenureVal ||
    interestRate !== minInterestVal

  // --------------------- INPUT RANGE ACCORDION OPEN AND CLOSE ------------------ //
  const handleAccordionChange = (item, index) => {
    if (selectedAccordion?.includes(index)) {
      setSelectedAccordion(selectedAccordion.filter((item) => item !== index))
    } else {
      setSelectedAccordion([...selectedAccordion, index])
    }
  }

  const getBanksAndPurpleTabs = () => {
    const banks = allPersonalProducts?.product_list?.map((item) => item?.bank_name)
    const unqiue = new Set(banks)
    setBanksArrayList(Array.from(unqiue))
    if (isSubCategoryFlow) {
      setSubCategoryTab(Array.from(unqiue))
    } else {
      setSubCategoryTab(subCategoryTabs)
    }
  }

  const handleBanksCheckBoxes = (e) => {
    const { checked, value } = e
    if (checked) {
      setCheckBoxValues([...checkBoxValues, value])
    } else {
      setCheckBoxValues(checkBoxValues?.filter((item) => item !== value))
    }
  }

  const handleCheckBoxRemove = (index) => {
    checkBoxValues?.splice(index, 1)
    setCheckBoxValues([...checkBoxValues])
    setPersonalProductList(personalProducts?.product_list)
  }

  const handleLoanAmountChange = (value) => {
    setLoanAmount(value)
    const filter = commonMinMaxInputRangeFilter(value, allProducts, 'loan_amount_min', 'loan_amount_max')
    filter && filter?.length > 0
      ? setPersonalProductList(filter)
      : setPersonalProductList(personalProducts?.product_list)
  }
  const handleLoanTenureChange = (value) => {
    setLoanTenure(value)
    const filter = commonMinMaxInputRangeFilter(value, allProducts, 'loan_tenure_min', 'loan_tenure_max')
    filter && filter?.length > 0
      ? setPersonalProductList(filter)
      : setPersonalProductList(personalProducts?.product_list)
  }
  const handleInterestRateChange = (value) => {
    setInterestRate(value)
    const filter = commonMinMaxInputRangeFilter(value, allProducts, 'interest_rate_min', 'interest_rate_max')
    filter && filter?.length > 0
      ? setPersonalProductList(filter)
      : setPersonalProductList(personalProducts?.product_list)
  }
  const handleSubCatBankClick = (item) => {
    if (item) {
      if (checkBoxValues?.includes(item)) {
        setCheckBoxValues(checkBoxValues?.filter((ele) => ele !== item))
      } else setCheckBoxValues([...checkBoxValues, item])
    }
  }

  const handleTabClick = (item) => {
    if (isSubCategoryFlow) {
      handleSubCatBankClick(item)
    } else if (url_slug === 'personal-loan') {
      router.push(`/personal-loan/${item?.url_slug}`)
    }
  }
  const handleClearFilter = () => {
    setShowMobileFilter(false)
    setLoanAmount(minLoanVal)
    setLoanTenure(minTenureVal)
    setInterestRate(minInterestVal)
    setCheckBoxValues([])
    setPersonalProductList(personalProducts?.product_list)
  }

  // HANDLE PAGINATION PAGE CHANGE
  const onPageChange = async (page) => {
    setCurrentPage(page)
    setShowLoader(true)
    router?.push({
      pathname: `/${url_slug}`,
      query: `page=${page}`
    })
    setShowLoader(false)
  }
  // filter banks on listing
  useEffect(() => {
    if (checkBoxValues?.length > 0) {
      const filteredLoans = allProducts?.filter((item) => checkBoxValues?.includes(item?.bank_name))
      setPersonalProductList(filteredLoans)
    } else setPersonalProductList(personalProducts?.product_list)
  }, [checkBoxValues?.length])

  useEffect(() => {
    if (personalProducts?.product_list) setPersonalProductList(personalProducts?.product_list)
  }, [personalProducts?.product_list])

  useEffect(() => {
    getBanksAndPurpleTabs()
  }, [])

  // ------------- SELECTED BANKS COMPONENT FN ------------- //
  const getSelectedBanks = () => {
    return (
      checkBoxValues?.length > 0 && (
        <div className='flex flex-row gap-[10px] mb-[21px] lg:flex-wrap md:overflow-y-scroll max-sm:overflow-y-scroll'>
          {checkBoxValues &&
            checkBoxValues?.map((item, index) => {
              return (
                <button
                  key={index}
                  className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
                  {item}
                  <Image
                    src={CloseIcon}
                    alt='image'
                    height={16}
                    width={16}
                    priority={true}
                    className='align-middle ml-2 w-[16px] h-[16px]'
                    onClick={() => handleCheckBoxRemove(index)}
                  />
                </button>
              )
            })}
        </div>
      )
    )
  }
  return (
    <div>
      {showLoader && <LoaderComponent />}
      <div className='flex flex-col gap-y-[36.5px]'>
        <div
          className={`flex lg:flex-row-reverse flex-row gap-x-[20px] items-center ${
            subCategoryTab?.length > 0 ? 'justify-between' : ''
          }`}>
          <Image
            src={FilterIcon}
            alt='filter icon'
            height={24}
            width={24}
            className='lg:hidden mt-4'
            onClick={(e) => setShowMobileFilter(true)}
          />
          {/* --------------- SORTING OPTIONS ---------------- */}
          {!isTablet && !isMobile && (
            <LoanSortingFilter
              openSortBy={openSortBy}
              setOpenSortBy={setOpenSortBy}
              allPersonalProducts={allPersonalProducts}
              setPersonalProductList={setPersonalProductList}
              isSubCategoryFlow={isSubCategoryFlow}
              recommendationFlow={recommendationFlow}
            />
          )}
          {/* --------------- SUB CATEGORY LINKS -------------- */}
          <div className='flex mt-[20px] flex-row gap-x-[10px] items-center justify-center overflow-x-scroll !whitespace-nowrap scrollbar-hide category-btn-scroll'>
            <div className='category-scroll-parent'>
              <div className='category-scroll-child'>
                {subCategoryTab?.map((item, index) => {
                  return (
                    <>
                      <div key={index}>
                        <CreditCardsRoundButton
                          name={isSubCategoryFlow ? item : item?.title}
                          className={
                            checkBoxValues?.includes(item)
                              ? 'recommendation-category head-text font-[faktum] capitalize'
                              : 'text-[#212529] head-text font-[faktum] border border-[#212529] bg-transparent xl:py-3  xl:px-4 md:py-3 md:px-4 sm:py-3 sm:px-4 px-6 py-3 text-[15px] max-[1440px]:text-[14px] rounded-[5px] hover:bg-[#844FCF] hover:border-[#844FCF] hover:text-white capitalize list-resolov-credit '
                          }
                          onClick={() => {
                            handleTabClick(item)
                          }}
                        />
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 gap-x-[18px]'>
          {/* -------------- FILTERS AND LOAN CARDS------------ */}
          {!isMobile && !isTablet && (
            <div className='col-span-1 border border-[#C2CACF] border-l-0  h-fit filter-resolution credit-left-filter filter-credit'>
              <PersonalLoanFilter
                banksArrayList={banksArrayList}
                loanAmount={loanAmount}
                loanTenure={loanTenure}
                interestRate={interestRate}
                handleAccordionChange={handleAccordionChange}
                selectedAccordion={selectedAccordion}
                personalProductList={personalProductList}
                maxLoanVal={maxLoanVal}
                maxTenureVal={maxTenureVal}
                maxInterestVal={maxInterestVal}
                checkBoxValues={checkBoxValues}
                handleBanksCheckBoxes={handleBanksCheckBoxes}
                handleLoanAmountChange={handleLoanAmountChange}
                handleLoanTenureChange={handleLoanTenureChange}
                handleInterestRateChange={handleInterestRateChange}
                enableClearAll={enableClearAll}
                handleClearFilter={handleClearFilter}
                isSubCategoryFlow={isSubCategoryFlow}
                minLoanVal={minLoanVal}
                minTenureVal={minTenureVal}
                minInterestVal={minInterestVal}
              />
            </div>
          )}
          <div className='col-span-4 2xl:col-span-4 md:col-span-4 max-sm:col-span-5 flex flex-col'>
            {/* ----SELECTED BANKS---- */}
            {getSelectedBanks()}
            {/* ------------ MAIN CARDS------------- */}
            {isTablet ? (
              <div className='grid md:grid-cols-2 md:mt-0  md:gap-4'>
                <PersonalLoanCards
                  viewDetailsIndex={viewDetailsIndex}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  size={size}
                  currentPage={currentPage}
                  enableClearAll={enableClearAll}
                  personalProductList={personalProductList}
                  totalProducts={personalProducts?.total_count}
                  setViewDetailsIndex={setViewDetailsIndex}
                  handleClearFilter={handleClearFilter}
                  hidePagination={hidePagination}
                  onPageChange={onPageChange}
                />
              </div>
            ) : (
              <PersonalLoanCards
                viewDetailsIndex={viewDetailsIndex}
                isMobile={isMobile}
                isTablet={isTablet}
                size={size}
                currentPage={currentPage}
                personalProductList={personalProductList}
                enableClearAll={enableClearAll}
                totalProducts={personalProducts?.total_count}
                setViewDetailsIndex={setViewDetailsIndex}
                handleClearFilter={handleClearFilter}
                hidePagination={hidePagination}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </div>
      </div>
      {(isMobile || isTablet) && showMobileFilter && (
        <LoanMobileFilter
          banksArrayList={banksArrayList}
          loanAmount={loanAmount}
          loanTenure={loanTenure}
          interestRate={interestRate}
          handleAccordionChange={handleAccordionChange}
          selectedAccordion={selectedAccordion}
          setShowMobileFilter={setShowMobileFilter}
          personalProductList={personalProductList}
          maxLoanVal={maxLoanVal}
          maxTenureVal={maxTenureVal}
          maxInterestVal={maxInterestVal}
          checkBoxValues={checkBoxValues}
          handleBanksCheckBoxes={handleBanksCheckBoxes}
          handleLoanAmountChange={handleLoanAmountChange}
          handleLoanTenureChange={handleLoanTenureChange}
          handleInterestRateChange={handleInterestRateChange}
          enableClearAll={enableClearAll}
          handleClearFilter={handleClearFilter}
          isSubCategoryFlow={isSubCategoryFlow}
          minLoanVal={minLoanVal}
          minTenureVal={minTenureVal}
          minInterestVal={minInterestVal}
          allPersonalProducts={allPersonalProducts}
          setPersonalProductList={setPersonalProductList}
        />
      )}
    </div>
  )
}

export default PersonalLoanListing
