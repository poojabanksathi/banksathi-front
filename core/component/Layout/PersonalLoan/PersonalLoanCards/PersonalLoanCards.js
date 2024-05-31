/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings'
import bankImage from '../../../../../public/assets/sbi.svg'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import Link from 'next/link'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import Pagination from '@/core/component/common/Pagination'
import CardTopCommonContent from '../PersonalLoanDetails/CardTopCommonContent/CardTopCommonContent'
import PersonalApplyNow from '../PersonalApplyNow/PersonalApplyNow'
import FrozenCompareDesktop from '../FrozenCompareDesktop/FrozenCompareDesktop'
import { useRouter } from 'next/router'
import { getInterestRate, getLoanAmount, getLoanTenure } from '@/utils/util'
import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import FilterNotFound from '@/core/component/common/FilterNotFound'

const PersonalLoanCards = ({
  viewDetailsIndex,
  totalProducts,
  onPageChange,
  currentPage,
  personalProductList,
  setViewDetailsIndex,
  isMobile,
  isTablet,
  size,
  isDetailsPage,
  hidePagination = false,
  hideFilterNotFound = false,
  handleClearFilter,
  enableClearAll,
  hideCheckEligibleButton
}) => {
  const starCount = 5
  const pageSize = 20
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userInfo = localUserData ? JSON.parse(localUserData) : null

  const creditScoreText = ''
  const router = useRouter()
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedCompareData, setSelectedCompareData] = useState([])

  const handleCompareClick = (e, item) => {
    setShowCompareModal(true)
    const id = item?.product_id
    setSelectedIds([...selectedIds, id])
    if (selectedIds?.includes(id)) {
      setSelectedIds(selectedIds?.filter((item) => item !== id))
    }
  }

  const handleViewDetailsClick = (index) => {
    const isOpen = viewDetailsIndex?.includes(index)
    setViewDetailsIndex((prevOpenAccordions) =>
      isOpen ? prevOpenAccordions.filter((openIndex) => openIndex !== index) : [...prevOpenAccordions, index]
    )
  }

  const getCommonApplyNowBtns = (item, index) => {
    const getEligibilityName = () => {
      const list = userInfo?.eligible_product?.personal_loans
      if (list?.includes(item?.url_slug?.split('/')?.pop())) {
        return 'Eligible'
      }
      return 'Check Eligibility'
    }
    return (
      <div className='flex flex-col items-center gap-y-[12px] max-[280px]:!px-2' id='comp-8-aply-btn'>
        <PersonalApplyNow
          dimensions={{ width: 'lg:w-[160px]', height: 'h-[48px]' }}
          url_slug={item?.url_slug?.split('/')?.pop()}
        />
        {!hideCheckEligibleButton && (
          <>
            {getEligibilityName() === 'Eligible' ? (
              <button
                id={`+${index}+'pl-btn'`}
                className='flex cursor-pointer items-center gap-2 justify-center business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                <SuccessIcon />
                {getEligibilityName()}
              </button>
            ) : (
              <button
                id={`+${index}+'pl-btn'`}
                onClick={() => {
                  router.push(`/personal-loan/eligibility?eligible=${item?.url_slug?.split('/')[2]}`)
                }}
                className='py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                {getEligibilityName()}
              </button>
            )}
          </>
        )}
        <div className='flex flex-row gap-x-[12px] items-center justify-center'>
          <label className='text-gray-500 font-bold flex items-center'>
            <input
              className='mr-2 leading-tight w-[16px] h-[14px]'
              type='checkbox'
              id={item?.product_id}
              disabled={
                size?.width <= 991
                  ? selectedCompareData?.length >= 2 && !selectedCompareData?.includes(item)
                  : selectedCompareData?.length >= 3 && !selectedCompareData?.includes(item)
              }
              onChange={(e) => {
                handleCompareClick(e, item)
              }}
              checked={selectedCompareData?.some((selectedItem) => selectedItem?.product_id === item?.product_id)}
            />
            <p className='text-[13px] font-semibold  text-[#212529] '>{ListingfilterData.compare}</p>
          </label>
        </div>
      </div>
    )
  }

  const handleCompareNow = () => {
    if (selectedCompareData?.length > 0) {
      const slugs = selectedCompareData?.map((item) => item?.url_slug?.split('/')?.pop())
      const length = slugs?.length
      const pathname =
        length === 3
          ? `/personal-loan/compare/${slugs?.[0]}/${slugs?.[1]}/${slugs?.[2]}`
          : `/personal-loan/compare/${slugs?.[0]}/${slugs?.[1]}`
      return router.push({ pathname: pathname })
    }
  }

  useEffect(() => {
    if (selectedIds?.length > 0) {
      setShowCompareModal(true)
      setSelectedCompareData(personalProductList.filter((ele) => selectedIds?.includes(ele?.product_id)))
    } else {
      setSelectedIds([])
      setShowCompareModal(false)
      setSelectedCompareData([])
    }
  }, [selectedIds?.length])

  useEffect(() => {
    if (selectedCompareData?.length <= 0) {
      setSelectedIds([])
      setSelectedCompareData([])
    }
  }, [selectedCompareData?.length])

  return (
    <>
      {personalProductList &&
        personalProductList?.length > 0 &&
        personalProductList?.map((item, index) => {
          const anyOneFees = item?.processing || item?.part_payment_charges || item?.forclosure_charges
          const isLastIndex = index === personalProductList?.length - 1
          return (
            <div
              key={item?.product_id}
              className={`h-auto bg-white rounded-3xl border border-slate-200 pb-[18px] filter-card-box duration-300 ${
                isLastIndex ? 'mb-[10px]' : 'mb-[30px]'
              }`}>
              <div className='flex flex-row gap-x-0'>
                <div className='lg:w-[149px] max-sm:w-[122px] md:w-[139px] max-sm:text-[10px] max-sm:py-[5px] md:text-[12px] md:leading-[14px] md:py-[5px] max-md:leading-[14px]  text-white font-semibold text-center rounded-tl-2xl bg-[#844FCF]'>
                  PERSONAL LOAN
                </div>
                {item?.best_of && (
                  <div className='lg:w-[200px] max-sm:w-[170px] md:w-[170px] py-[5px] max-md:text-[12px] max-md:leading-[14px]  text-black text-center font-normal bg-[#C5BCFF]'>
                    {item?.best_of}
                  </div>
                )}
              </div>
              {/*  ------------------- BANK NAME, APPLY NOW BTN, LOAN NAME, COMPARE BTN --------------------- */}
              {isMobile || isTablet ? (
                <>
                  <div className='px-[18px] py-[20px]'>
                    <CardTopCommonContent
                      creditScoreText={creditScoreText}
                      rating={item?.rating}
                      interestRate={getInterestRate(item?.interest_rate_min, item?.interest_rate_max)}
                      loanAmount={getLoanAmount(item?.loan_amount_min, item?.loan_amount_max)}
                      loanTenure={`Tenure: ${getLoanTenure(item?.loan_tenure_min, item?.loan_tenure_max)}`}
                      processingFees={item?.processing}
                      minScore={item?.min_cibil_required}
                      bankImage={`${Img_URL}/${item?.product_image}`}
                      isListingPage={true}
                      cardName={item?.card_name}
                      cardHref={item?.url_slug}
                      bestOfName={item?.best_of}
                    />
                  </div>
                  <div className='border-t mt-[9px] mb-[20px]' />
                  <div className='px-[18px] mt-[20px]'>{getCommonApplyNowBtns(item, index)}</div>
                  <div className='border-t mt-[20px] mb-[20px]' />
                </>
              ) : (
                <>
                  <div className='px-[30px] mt-[17px] mb-[21px]'>
                    <div className='flex flex-row justify-between'>
                      <div className='flex flex-row gap-[20px]'>
                        <Link href={`/${item?.url_slug}`} prefetch={false}>
                          <div className='w-[220px] h-auto lg:mr-4 bg-white rounded-lg border border-slate-200 flex items-center justify-center cursor-pointer'>
                            <Image
                              src={`${Img_URL}/${item?.product_image}`}
                              alt='bank image'
                              width={220}
                              height={52}
                              className='rounded-lg w-auto h-auto'
                            />
                          </div>
                        </Link>
                        <div className='flex flex-col gap-[13px]'>
                          <div className='flex flex-col gap-0'>
                            <Link href={`/${item?.url_slug}`} prefetch={false}>
                              <div className="text-neutral-800 text-lg font-bold font-['Poppins'] leading-[25.20px] cursor-pointer">
                                {item?.card_name}
                              </div>
                            </Link>
                            <div className="text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[20.80px]">
                              {item?.best_of}
                            </div>
                          </div>
                          <div className='flex flex-col gap-y-[6px]'>
                            <div className='flex items-center gap-x-[8px]'>
                              <div className='border rounded-full py-1 px-2 flex gap-[10px] items-center justify-center max-[771px]:px-2 max-[360px]:gap-1'>
                                <p className='xl:text-[14px] lg:text-[14px] max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px] h-[30px] flex justify-center items-center'>
                                  {item?.rating}/5
                                </p>
                                <div className='mobile-rating'>
                                  <StarRatings
                                    rating={item?.rating}
                                    starRatedColor='#49d49d'
                                    numberOfStars={starCount}
                                    name='rating'
                                    starDimension='15px'
                                    starSpacing='0'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="text-violet-600 text-xs font-normal font-['Poppins'] leading-none">
                              BankSathi Expert Review
                            </div>
                          </div>
                        </div>
                      </div>
                      {getCommonApplyNowBtns(item, index)}
                    </div>
                  </div>
                  <div className='grid grid-cols-3 max-md:grid-cols-2'>
                    <div className='border border-[gray-100] border-l-0 flex flex-col gap-0 items-start justify-center  px-[30px] h-auto py-[18px]'>
                      <>
                        <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
                          Interest Rate
                        </div>
                        <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px]">
                          {getInterestRate(item?.interest_rate_min, item?.interest_rate_max)}
                        </div>
                      </>
                    </div>
                    <div className='border border-[gray-100] border-l-0 flex flex-col gap-0 items-start justify-center  px-[30px] h-auto py-[18px]'>
                      <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
                        Loan Amount
                      </div>
                      <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[21px] my-1 symbole-rupee">
                        {getLoanAmount(item?.loan_amount_min, item?.loan_amount_max)}
                      </div>
                      <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
                        {`Tenure: ${getLoanTenure(item?.loan_tenure_min, item?.loan_tenure_max)}`}
                      </div>
                    </div>
                    <div className='border border-[gray-100] border-r-0 flex flex-col gap-0 items-start justify-center px-[30px] h-auto py-[18px]'>
                      <div className="text-neutral-800 text-sm font-normal font-['Poppins'] leading-tight">
                        {ListingfilterData?.recommended}
                      </div>
                      <div className='flex items-center gap-2'>
                        <p className='text-[15px] font-semibold pt-1'>{item?.min_cibil_required}</p>
                        <div className='tooltip'>
                          <Image
                            src={ListingfilterData?.helpimg}
                            className='w-5 h-5'
                            alt='img'
                            width={20}
                            height={20}
                          />
                          <span className='tooltiptext'>
                            Having a credit score within or above the recommended range increases your likelihood of
                            approval for various financial applications, but it does not provide an absolute guarantee.
                          </span>
                        </div>
                      </div>
                      <Link
                        href='/cibil-credit-score-check'
                        className='text-[15px] !underline text-[#5a5add] hover:!text-[#5a5add]'
                        prefetch={false}>
                        Check free credit score
                      </Link>
                    </div>
                  </div>
                </>
              )}
              {(anyOneFees || item?.features) && (
                <div className='px-[30px] flex flex-col gap-y-[6px]'>
                  <div
                    className='flex flex-row gap-[16px] items-center py-[10px] max-sm:justify-between cursor-pointer'
                    onClick={() => handleViewDetailsClick(index)}>
                    <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-[30px]">
                      View Details
                    </div>
                    <Image
                      src={accordionArrowall}
                      alt='arrow'
                      width={17}
                      height={17}
                      priority={true}
                      className={viewDetailsIndex?.includes(index) ? 'rotate-180' : ''}
                    />
                  </div>
                  {viewDetailsIndex?.includes(index) && (
                    <div className='grid grid-cols-2 max-sm:grid-cols-1'>
                      <div className='flex flex-col'>
                        {item?.features && (
                          <>
                            <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-[30px]">
                              Features
                            </div>
                            <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                              <div
                                className='list-disc space-y-2 text-[14px] text-[#545454] pb-2 product-list-data'
                                dangerouslySetInnerHTML={{
                                  __html: `<div>${item?.features}</div>`
                                }}></div>
                            </div>
                          </>
                        )}
                      </div>
                      {anyOneFees && (
                        <div className='flex flex-col'>
                          <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] leading-[30px]">
                            Fee and charges
                          </div>
                          <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                            <ul className='list-disc pl-[15px] marker:text-[]'>
                              {item?.processing && (
                                <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>
                                  Processing fees: {item?.processing}
                                </li>
                              )}
                              {item?.part_payment_charges && (
                                <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>
                                  Part payment Charges: {item?.part_payment_charges}
                                </li>
                              )}
                              {item?.forclosure_charges && (
                                <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>
                                  foreclosure charges: {item?.forclosure_charges}
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      {!isDetailsPage && !isMobile && !hidePagination && !enableClearAll && (
        <div className='relative mt-[20px] max-sm:hidden md:mt-0 md:mb-10 md:left-24 lg:left-0'>
          <div className='flex flex-end mt-1 absolute right-0 top-0 font-bold'>
            <Pagination
              items={totalProducts}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
      {personalProductList && personalProductList?.length === 0 && !hideFilterNotFound && (
        <FilterNotFound
          resetFilter={handleClearFilter}
          btnActive='Go Back'
          btnActiveLink={router?.asPath}
          btnTransparentLink={router?.asPath}
          btnTransparent='Reset Filter'
          btn={true}
          subTitle='Kindly reset filters or Go back to Previous page'
          showPadding={false}
          isTab={isTablet}
        />
      )}
      {/* FILTER NOT FOUND TO BE ADDED */}

      {/* -----------------------COMPARE FROZEN PANE---------------------------- */}
      {showCompareModal && (
        <>
          <FrozenCompareDesktop
            selectedCompareData={selectedCompareData}
            setSelectedCompareData={setSelectedCompareData}
            handleCompareNow={handleCompareNow}
            setShowCompareModal={setShowCompareModal}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </>
      )}
    </>
  )
}

export default PersonalLoanCards
