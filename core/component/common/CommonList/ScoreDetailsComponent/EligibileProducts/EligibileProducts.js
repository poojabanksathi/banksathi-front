/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import CloseIcon from '../../../../../../public/assets/closeIcon.svg'
import alertOctagon from '../../../../../../public/assets/alert-octagon.svg'

import dynamic from 'next/dynamic'
import { getPromotionObject, sendEventToGTM } from '@/utils/util'
import ApplyNowButton from '../../../ApplyNowButton/ApplyNowButton'
import useGaEvents from '@/hooks/useGaEvents'
import StarRatings from 'react-star-ratings'
import PersonalLoanCards from '@/core/component/Layout/PersonalLoan/PersonalLoanCards/PersonalLoanCards'

const CompareNowBtn = dynamic(() => import('@/core/component/common/CompareNowBtn'), {
  ssr: false
})
const EligibleProducts = ({
  filteredDataCard,
  creditFirst,
  filteredBankAccountsData,
  eligbileHeading,
  isBestFit = false,
  hideCreditHeading,
  loanRef,
  bankRef,
  eligiblePersonalLoans
}) => {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const starCount = 5
  const maxLength = 20

  const size = useWindowSize()
  const router = useRouter()

  const isMobile = size?.width <= 576
  const isTablet = size?.width === 768

  const isMyProductsPage = router?.asPath?.includes('my-profile/products')
  const myOffersPage = router?.asPath?.includes('my-profile/my-offer')

  const [compareModal, setCompareModal] = useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [compareSlug, setCompareSlug] = useState([])
  const [fieldValue, setFieldValue] = useState()
  const [viewDetailsIndex, setViewDetailsIndex] = useState([])

  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  const getMatchPathUrl = (urlPath) => {
    const regex = /\/([^/]+)$/
    const matches = regex.exec(urlPath)
    if (matches && matches.length > 1) {
      const extractedString = matches[1]
      return extractedString
    }
  }
  const handlecompareModal = (event, item) => {
    const slugurl = getMatchPathUrl(item?.url_slug)

    if (event.target.checked) {
      setSelectedData((prevSelectedData) => {
        if (!prevSelectedData.some((selectedItem) => selectedItem?.product_id === item.product_id)) {
          return [...prevSelectedData, item]
        }
        return prevSelectedData
      })
      setCompareSlug((prevSelectedSlugs) => {
        if (!prevSelectedSlugs?.includes(slugurl)) {
          return [...prevSelectedSlugs, slugurl]
        }
        return prevSelectedSlugs
      })
    } else {
      setSelectedData((prevSelectedData) =>
        prevSelectedData.filter((selectedItem) => selectedItem?.product_id !== item.product_id)
      )
      setCompareSlug((prevSelectedSlugs) => prevSelectedSlugs.filter((selectedSlug) => selectedSlug !== slugurl))
    }
  }

  useEffect(() => {
    if (selectedData?.length > 0) {
      setCompareModal(true)
    } else {
      setCompareModal(false)
    }
  }, [selectedData?.length])

  const position = router?.query?.page ? (router?.query?.page - 1) * 10 : 0
  const combine = filteredDataCard && filteredBankAccountsData && [...filteredDataCard, ...filteredBankAccountsData]

  const listingItems = combine?.map((product, index) => {
    const pagePosition = position + index + 1
    return {
      item_id: product?.product_id?.toString(),
      item_name: product?.card_name || product?.title,
      index: pagePosition,
      item_brand: product?.bank_name,
      item_category: 'my-profile/products',
      item_category2: '',
      item_category3: '',
      item_category4: '',
      item_category5: '',
      item_list_id: 'Eligible Products',
      item_list_name: 'Eligible Products',
      item_variant: product?.card_name || product?.title,
      quantity: 1
    }
  })
  //GtM object defined
  const eventData = {
    event: 'view_item_list',
    ecommerce: {
      item_list_id: 'Eligible Products',
      item_list_name: 'Eligible Products',
      items: listingItems
    }
  }

  // Use the custom hook to send data to GTM
  useGaEvents(eventData)

  const sendGAProductClick = (index, item) => {
    const pagePosition = position + index + 1
    const sendProductClick = {
      event: 'select_item',
      ecommerce: {
        item_list_id: 'Eligible Product Cards',
        item_list_name: 'Eligible Product Cards',
        items: [
          {
            item_id: item?.product_id?.toString(),
            item_name: item?.card_name,
            index: pagePosition,
            item_brand: item?.bank_name,
            item_category: '',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: 'Eligible Product Cards',
            item_list_name: 'Eligible Product Cards',
            item_variant: item?.card_name,
            quantity: 1
          }
        ]
      }
    }
    return sendEventToGTM(sendProductClick)
  }

  //click promotion
  const pageRoute = router?.asPath

  const clickPromotion = (index) => {
    const data = {
      eventName: 'select_promotion',
      title: 'Check free credit score',
      position: index + 1,
      route: pageRoute
    }
    sendEventToGTM(getPromotionObject(data))
  }
  const getFrozenCompareComp = () => {
    return compareModal ? (
      <>
        {size?.width <= 991
          ? selectedData?.length == 2
          : selectedData?.length == 3 && (
              <div
                className='fixed z-50 bottom-0 w-full left-0 h-[16.5rem] max-[1200px]:h-[14rem] max-[991px]:h-[22rem] max-[1600px]:h-[17rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[8%]'
                id='modal'>
                <div className=' 2xl:px-40 xl:px-30 xl:py-8 lg:px-20 md:px-14 p-4 py-6 '>
                  <div className='text-center flex items-center gap-2 justify-center'>
                    <Image src={alertOctagon} height={20} width={20} className='' alt='img' />
                    <p className='text-[15px] text-[#FF000F]'>Remove a card to add another card to compare</p>
                  </div>
                </div>
              </div>
            )}
        <div
          className='fixed z-50  bottom-0 w-full left-0 h-[11rem] max-[1600px]:h-[12rem]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-white add-modal shadow'
          id='modal'>
          <div className='flex items-center justify-center min-height-100vh  px-4  text-center sm:block sm:p-0'>
            <div className=' 2xl:px-40 xl:px-30 xl:py-14 lg:px-20 md:px-14 p-4 py-8 max-[479px]:py-4 '>
              <div className='flex max-[1820px]:flex justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
                <>
                  <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                    {selectedData?.length <= 3 &&
                      selectedData.map((data, index) => {
                        return (
                          <div key={index}>
                            <div className=' rounded-lg  relative '>
                              <div
                                id={`${index}+'my-prof-3'`}
                                onClick={() => sendGAProductClick(index, data)}
                                className='w-[140px] h-full max-[991px]:w-[110px] max-[576px]:w-[110px] max-[479px]:w-[80px]  compare-img-card'>
                                <Image
                                  src={`${Img_URL}/${data?.product_image}`}
                                  alt='card image'
                                  width={140}
                                  height={160}
                                  className='w-full h-full bg-cover'
                                  unoptimized={true}
                                />
                              </div>

                              <div
                                className='absolute top-[-10px] right-[-8px] border border-[#000] p-1 rounded-full bg-white text-[#212529]'
                                onClick={() => {
                                  document.getElementById(data?.product_id).checked = false
                                  setSelectedData([
                                    ...selectedData.filter((item) => item?.product_id !== data?.product_id)
                                  ])
                                }}>
                                <Image
                                  src={CloseIcon}
                                  alt='img'
                                  height={12}
                                  width={12}
                                  priority={true}
                                  className='  w-[12px] h-[12px]'
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                  <div className='flex max-[1820px]:flex max-[1820px]:gap-8  gap-5 items-center max-[576px]:gap-4 max-[320px]:gap-2 '>
                    {size?.width > 991 && selectedData.length < 2 && selectedData.length != null && (
                      <div>
                        <p className='text-[15px] text-[#212529] max-[479px]:text-[12px]'>
                          Add upto 3 cards to compare
                        </p>
                      </div>
                    )}
                    <div className='max-xs:my-2'>
                      <CompareNowBtn
                        compareslug={selectedData}
                        name='Compare'
                        disable={selectedData.length < 2 || selectedData.length == 4}
                      />
                    </div>
                    <div className='max-xs:my-2'>
                      <button
                        type='button'
                        className='  text-[#212529] cursor-pointer rounded  mr-2 max-[479px]:mr-0 text-[15px] font-semibold max-[479px]:text-[13px]'
                        onClick={(e) => {
                          setCompareModal(false)
                          setSelectedData([])
                        }}>
                        {size.width <= 577 ? <>Clear</> : <>Clear All</>}
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      ''
    )
  }

  return (
    <>
      {getFrozenCompareComp()}
      {filteredDataCard?.length > 0 && eligbileHeading && !isMyProductsPage && !myOffersPage && !hideCreditHeading && (
        <h3 className='text-xl text-[#212529] px-2 mb-6 font-semibold font-[poppins]'>Eligible Credit Cards</h3>
      )}

      {filteredDataCard?.length > 0 &&
        filteredDataCard?.map((alldata, index) => {
          return (
            <>
              <div
                key={alldata?.product_id}
                className={`container mx-auto pt-[30px] rounded-2xl bg-white filter-card-box duration-300 mb-5 ${
                  isBestFit ? 'xl:w-[110%]' : ''
                }`}>
                <div className='flex px-[30px] max-[576px]:px-0 gap-4 '>
                  <div className='relative max-sm:basis-1/3 max-sm:px-4'>
                    <div
                      id={`${index}+'my-prof-3'`}
                      onClick={() => sendGAProductClick(index, alldata)}
                      className='xl:w-[240px] h-auto md:w-[180px] max-sm:w-[100px] business-card-img sm:px-0'>
                      <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                        <Image
                          src={`${Img_URL}/${alldata?.product_image}`}
                          alt='card image'
                          width={240}
                          height={90}
                          className=''
                          unoptimized={true}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className='max-sm:basis-2/3 xl:w-[100%] md:pr-0 lg:px-[30px] max-md:px-0'>
                    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-[567px]:grid-cols-1'>
                      <div className='col-span-3 max-[1536px]:col-span-2 gap-6'>
                        {alldata?.title && (
                          <div className=''>
                            <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                              <h2
                                id={`${index}+'my-nammme-3'`}
                                className={`text-[18px] font-bold text-[#212529] leading-7 pb-2 ${
                                  alldata?.title?.length > maxLength ? 'xl:truncate' : ''
                                }`}>
                                {alldata?.title}
                              </h2>
                            </Link>
                          </div>
                        )}

                        {creditFirst && alldata?.card_name && (
                          <div onClick={() => sendGAProductClick(index, alldata)} className='eligibleTooltip'>
                            <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                              <h2
                                id={`${index}+'my-name-3'`}
                                className={`text-[18px] font-bold text-[#212529] leading-7 pb-2 ${
                                  alldata?.card_name?.length > maxLength ? 'xl:truncate' : ''
                                }`}>
                                {alldata?.card_name}
                              </h2>
                            </Link>
                          </div>
                        )}

                        <span
                          className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                          data-tooltip-target='tooltip-light'
                          data-tooltip-style='light'
                          data-te-toggle='tooltip'
                          title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                          {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                        </span>

                        {creditFirst && (
                          <p className=' text-[13px] font-semibold text-[#212529] pt-3 max-[771px]:pt-2'>
                            {ListingfilterData.ratingtitle}
                          </p>
                        )}

                        <div className='flex items-center gap-4 max-[576px]:gap-1 mt-3 max-[576px]:mt-2'>
                          <div className='border rounded-full '>
                            <Image
                              src={ListingfilterData?.logoimg}
                              alt='img'
                              width={45}
                              height={50}
                              className=' border rounded-full p-2 w-[42px] h-[42px] border-[#e5e7eb] max-sm:h-[35px] max-sm:w-[36px] max-[375px]:w-[30px] max-[375px]:h-[30px]'
                            />
                          </div>

                          <div className='border rounded-full py-1 px-[7px] flex gap-2 items-center max-[1440px]:px-4 max-[1440px]:py-2  max-[320px]:px-2'>
                            <p className='xl:text-[18px] md:text-[14px] max-sm:text-[12px] font-semibold text-[#212529]'>
                              {alldata?.rating}/5
                            </p>
                            <StarRatings
                              rating={alldata?.rating}
                              starRatedColor='#49d49d'
                              numberOfStars={starCount}
                              name='rating'
                              starDimension={size?.width <= 576 ? '12px' : size?.width >= 764 ? '24px' : '12px'}
                              starSpacing='0'
                            />
                          </div>
                        </div>
                      </div>

                      {size?.width >= 768 && (
                        <div
                          id='comp-10-aply-btn'
                          className={`flex flex-col md:flex-col gap-4 lg:flex-col absolute right-4 ${
                            isBestFit ? '' : 'xl:mr-[4rem]'
                          }`}>
                          <ApplyNowButton
                            data={alldata}
                            userData={userData}
                            category={'credit-cards'}
                            pos='15'
                            position={index}
                            disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                          />
                          <div>
                            <label className=' text-gray-500 font-bold flex items-center'>
                              <input
                                className='mr-2 leading-tight w-[16px] h-[16px]'
                                type='checkbox'
                                id={alldata?.product_id}
                                disabled={
                                  size?.width <= 991
                                    ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                    : selectedData.length >= 3 && !selectedData?.includes(alldata)
                                }
                                onChange={(e) => handlecompareModal(e, alldata)}
                                checked={selectedData.some(
                                  (selectedItem) => selectedItem.product_id === alldata.product_id
                                )}
                              />
                              <p className='text-[15px] font-semibold  text-[#212529] business-right-text'>
                                Add to Compare{' '}
                              </p>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {size?.width < 768 && (
                  <>
                    <div className='flex flex-col items-center justify-between  mt-4 w-full px-2'>
                      <div id='comp-11-aply-btn ' className='flex w-full   mt-4 gap-8 justify-start items-end '>
                        <ApplyNowButton
                          data={alldata}
                          userData={userData}
                          category={'credit-cards'}
                          pos='17'
                          position={index}
                          disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                        />
                      </div>
                      <div className='mt-4'>
                        <label className=' text-gray-500 font-bold flex items-center'>
                          <input
                            className='mr-2 leading-tight w-[16px] h-[16px]'
                            type='checkbox'
                            id={alldata.product_id}
                            disabled={
                              size?.width <= 991
                                ? selectedData.length >= 2 && !selectedData?.includes(alldata)
                                : selectedData.length >= 3 && !selectedData?.includes(alldata)
                            }
                            onChange={(e) => handlecompareModal(e, alldata)}
                            checked={selectedData.some(
                              (selectedItem) => selectedItem.product_id === alldata.product_id
                            )}
                          />
                          <p className='text-[15px] font-semibold  text-[#212529] '>Add to Compare </p>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className='mt-4'>
                  <div className='grid grid-cols-3 max-[576px]:grid-cols-2 gap-0 pt-4'>
                    <div className='border border-[gray-100] border-l-0 border-b-0 p-6 text-[#212529]'>
                      <p className='text-[13px] font-normal '>{ListingfilterData.fees}</p>
                      <p className='text-[15px] font-semibold pt-1'>
                        {alldata?.annual_fee == 0 ? (
                          <span className='font-semibold'>Free</span>
                        ) : (
                          <span className='symbole-rupee'>₹ {alldata?.annual_fee} /-</span>
                        )}
                      </p>
                    </div>
                    <div className='border border-[gray-100] border-l-0 border-b-0 max-sm:border-r-0 p-6 text-[#212529]'>
                      <p className='text-[13px] font-normal'>{ListingfilterData?.joiningfees}</p>
                      <p className='text-[15px] font-semibold pt-1'>
                        {alldata?.joining_fee === 0 ? (
                          <span className='font-semibold'>Free</span>
                        ) : (
                          <span className='symbole-rupee'>₹ {alldata?.joining_fee} /-</span>
                        )}
                      </p>
                    </div>
                    <div className='border border-[gray-100] border-l-0  border-b-0  border-r-0 p-6 text-[#212529] max-sm:col-span-2'>
                      <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                      <div className='flex items-center gap-2'>
                        {alldata?.min_credit_score && (
                          <p className='text-[15px] font-semibold pt-1'>{alldata?.min_credit_score}</p>
                        )}
                        <div className='tooltip'>
                          <>
                            <Image
                              src={ListingfilterData?.helpimg}
                              className='w-5 h-5'
                              alt='img'
                              width={20}
                              height={20}
                            />
                            <span className='tooltiptext'>
                              Having a credit score within or above the recommended range increases your likelihood of
                              approval for various financial applications, but it does not provide an absolute
                              guarantee.
                            </span>
                          </>
                        </div>
                      </div>
                      <div onClick={() => clickPromotion(index)}>
                        <Link
                          href='/cibil-credit-score-check'
                          className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                          prefetch={false}>
                          Check free credit score
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      {filteredBankAccountsData?.length > 0 && eligbileHeading && (
        <h3
          className='text-xl text-[#212529] px-2  my-6 pt-[2rem] font-semibold font-[poppins] max-sm:pt-1'
          ref={bankRef}>
          Eligible Bank Accounts
        </h3>
      )}
      {filteredBankAccountsData?.map((alldata, index) => {
        return (
          <>
            <div
              key={index}
              className='container mx-auto py-[30px] rounded-2xl bg-white filter-card-box duration-300 mb-5'>
              <div className='flex px-[30px] max-[576px]:px-0 gap-4'>
                <div className='relative max-sm:basis-1/3 max-sm:px-2'>
                  <div
                    id={`${index}+'my-prof-3'`}
                    onClick={() => sendGAProductClick(index, alldata)}
                    className='xl:w-[240px] h-auto md:w-[180px] max-sm:w-[100px] business-card-img sm:px-0'>
                    <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                      <Image
                        src={`${Img_URL}/${alldata?.product_image}`}
                        alt='card image'
                        width={240}
                        height={90}
                        className='max-sm:pl-[5px] rounded-lg '
                        unoptimized={true}
                      />
                    </Link>
                  </div>
                </div>

                <div className='max-sm:basis-2/3  xl:w-[100%] md:pr-0 lg:px-[30px] max-md:px-0'>
                  <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-[567px]:grid-cols-1'>
                    <div className='col-span-3 max-[1536px]:col-span-2 gap-6'>
                      {alldata?.title && (
                        <div onClick={() => sendGAProductClick(index, alldata)}>
                          <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                            <h2
                              className={`text-[18px] font-bold text-[#212529] leading-7 pb-2 ${
                                alldata?.title?.length > maxLength ? 'xl:truncate' : ''
                              }`}>
                              {alldata?.title}
                            </h2>
                          </Link>
                        </div>
                      )}
                      {creditFirst && alldata?.card_name && (
                        <div id={`${index}+'my-name-3'`} onClick={() => sendGAProductClick(index, alldata)}>
                          <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                            <h2
                              className={`text-[18px] font-bold text-[#212529] leading-7 pb-2 ${
                                alldata?.title?.length > maxLength ? 'xl:truncate' : ''
                              }`}>
                              {alldata?.card_name}
                            </h2>
                          </Link>
                        </div>
                      )}

                      <span
                        className='text-[14px] comparebox-card-text  pb-6 text-[#212529]'
                        data-tooltip-target='tooltip-light'
                        data-tooltip-style='light'
                        data-te-toggle='tooltip'
                        title={`${alldata?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                        {alldata?.welcome_benefits?.replace(/["']/g, ' ')}
                      </span>

                      {creditFirst && (
                        <p className=' text-[13px] font-semibold text-[#212529] pt-3 max-[771px]:pt-2'>
                          {ListingfilterData?.ratingtitle}
                        </p>
                      )}

                      <div className='flex items-center gap-4 max-[576px]:gap-1 mt-3 max-[576px]:mt-2'>
                        <div className='border rounded-full '>
                          <Image
                            src={ListingfilterData?.logoimg}
                            alt='img'
                            width={45}
                            height={50}
                            className=' border rounded-full p-2 w-[42px] h-[42px] border-[#e5e7eb] max-sm:h-[35px] max-sm:w-[42px] max-[375px]:w-[42px] max-[375px]:h-[30px]'
                          />
                        </div>

                        <div className='border rounded-full py-1 px-[7px] flex gap-2 items-center max-[1440px]:px-4 max-[1440px]:py-2  max-[320px]:px-2'>
                          <p className='xl:text-[18px] md:text-[14px] max-sm:text-[12px] font-semibold text-[#212529]'>
                            {alldata?.rating}/5
                          </p>
                          <StarRatings
                            rating={alldata?.rating}
                            starRatedColor='#49d49d'
                            numberOfStars={starCount}
                            name='rating'
                            starDimension={size?.width <= 576 ? '16px' : size?.width >= 764 ? '24px' : '12px'}
                            starSpacing='0'
                          />
                        </div>
                      </div>
                    </div>

                    {size?.width >= 768 && (
                      <div
                        id='save-aply-btn-2'
                        className='flex flex-col md:flex-col gap-4 lg:flex-col absolute right-4 xl:mr-[3rem]  '>
                        <ApplyNowButton
                          data={alldata}
                          userData={userData}
                          addMargin={true}
                          category={'bank-accounts'}
                          pos='19'
                          position={index}
                          disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                        />
                        <div></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {size?.width < 768 && (
                <>
                  <div className='flex flex-col items-center justify-between  mt-4 w-full px-2'>
                    <div id='save-aply-btn-6' className='flex w-full   mt-4 gap-8 justify-start items-end '>
                      <ApplyNowButton
                        data={alldata}
                        userData={userData}
                        category={'bank-accounts'}
                        pos='20'
                        position={index}
                      />
                    </div>
                    <div className='mt-4'></div>
                  </div>
                </>
              )}

              <div className='mt-4'>
                <div className='grid grid-cols-3 max-[576px]:grid-cols-2 gap-0 pt-4'>
                  <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                    <p className='text-[13px] font-normal '>Interest Rate</p>
                    <p className='text-[15px] font-semibold pt-1'>
                      {alldata?.rate_of_interest && <span>{alldata?.rate_of_interest}%</span>}
                    </p>
                  </div>
                  <div className='border border-[gray-100] border-l-0 p-6 max-sm:border-r-0  text-[#212529]'>
                    <p className='text-[13px] font-normal'>Minimum Monthly Balance</p>
                    <p className='text-[15px] font-semibold pt-1'>
                      {alldata.avg_mon_bal && <span className='symbole-rupee'>₹ {alldata.avg_mon_bal} </span>}
                    </p>
                  </div>
                  <div className='border border-[gray-100] border-l-0 border-r-0 p-6 text-[#212529] max-sm:col-span-2'>
                    <p className='text-[13px] font-normal'>Minimum Balance to Open Account</p>
                    <div className='flex items-center gap-4'>
                      {alldata?.min_bal_to_open_ac && (
                        <>
                          <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                            ₹ {alldata?.min_bal_to_open_ac}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
      {eligiblePersonalLoans && eligiblePersonalLoans?.length > 0 && (
        <div ref={loanRef}>
          <h3 className='text-xl text-[#212529] px-2 mb-4 mt-12 font-semibold font-[poppins] max-sm:pt-1'>
            Eligible Personal Loan
          </h3>
          <div className='mt-[30px]'>
            <PersonalLoanCards
              viewDetailsIndex={viewDetailsIndex}
              isMobile={isMobile}
              isTablet={isTablet}
              size={size}
              personalProductList={eligiblePersonalLoans}
              setViewDetailsIndex={setViewDetailsIndex}
              isDetailsPage={false}
              hidePagination={true}
              hideFilterNotFound={true}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default EligibleProducts
