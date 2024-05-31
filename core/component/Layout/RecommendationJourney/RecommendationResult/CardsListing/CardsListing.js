import FilterNotFound from '@/core/component/common/FilterNotFound'
import Image from 'next/image'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useWindowSize } from '@/hooks/useWindowSize'
import logo from '../../../../../../public/assets/footer-Logo.svg'
import accordionArrowall from '../../../../../../public/assets/accordion-down.svg'
import { getMatchPathUrl, sendEventToGTM } from '@/utils/util'
import CloseIcon from '../../../../../../public/assets/closeIcon.svg'
import alertOctagon from '../../../../../../public/assets/alert-octagon.svg'
import useGaEvents from '@/hooks/useGaEvents'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import TabletListing from './TabletListing/TabletListing'
import StarRatings from 'react-star-ratings'

const CardsListing = ({ cardsList, checkBoxValues, setCheckBoxValues, setCardsList, handleClearFilter }) => {
  const starCount = 5

  const router = useRouter()
  const size = useWindowSize()
  const cardDataRef = useRef(null)

  const forTablet = size?.width > 576 && size?.width < 992
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)

  const windowWidthSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const [featureIndex, setFeatureIndex] = useState([])
  const [compareModal, setCompareModal] = useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [compareslug, setCompareSlug] = useState([])
  const [welcomeIndex, setWelcomeIndex] = useState([])
  const [featureAccordion, setFeatureAccordion] = useState(false)
  const [welcomeAccordion, setWelcomeAccordion] = useState(false)

  //-------------------------FROZEN COMPONENT-------------------------//
  const handlecompareModal = (event, item) => {
    const slugurl = getMatchPathUrl(item?.url_slug)

    if (event?.target?.checked) {
      setSelectedData((prevSelectedData) => {
        if (!prevSelectedData?.some((selectedItem) => selectedItem?.product_id === item?.product_id)) {
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
        prevSelectedData?.filter((selectedItem) => selectedItem?.product_id !== item.product_id)
      )
      setCompareSlug((prevSelectedSlugs) => prevSelectedSlugs?.filter((selectedSlug) => selectedSlug !== slugurl))
    }
  }
  console.log(selectedData)
  const getFrozenCompareComp = () => {
    const disable = selectedData?.length < 2 || selectedData?.length == 4

    const renderCondition = windowWidthSize <= 991 ? selectedData?.length == 2 : selectedData?.length == 3

    const handleCompareNow = () => {
      const slugs = selectedData?.map((item) => {
        return item?.url_slug?.split('/')?.pop()
      })
      const length = slugs?.length
      const pathname =
        length === 3
          ? `/credit-cards/compare/${slugs?.[0]}/${slugs?.[1]}/${slugs?.[2]}`
          : `/credit-cards/compare/${slugs?.[0]}/${slugs?.[1]}`
      return router?.push({ pathname: pathname })
    }
    return compareModal ? (
      <>
        {renderCondition && (
          <div
            className='fixed z-50 h-[13rem] bottom-0 w-full left-0 max-[1200px]:h-[14rem] max-[991px]:h-[13rem] max-[1600px]:h-[200px]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[8%] max-sm:bottom-[12%]'
            id='modal'>
            <div className=' 2xl:px-40 xl:px-30 xl:py-8 lg:px-20 max-sm:py-[12px] p-4 py-6 '>
              <div className='text-center flex items-center gap-2 justify-center'>
                <Image src={alertOctagon} className='' alt='img' />
                <p className='text-[15px] text-[#FF000F] text-left'>
                  To compare another account, remove an existing one
                </p>
              </div>
            </div>
          </div>
        )}
        <div
          className='fixed z-50 py-[30px] max-sm:py-4 bottom-0 w-full left-0 h-[124px]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-white add-modal shadow'
          id='modal'>
          <div className='flex items-center justify-center min-height-100vh  px-4  text-center sm:block sm:p-0'>
            <div className=''>
              <div className='flex max-[1820px]:flex justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
                <>
                  <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                    {selectedData?.length <= 3 &&
                      selectedData?.map((data, index) => {
                        return (
                          <div key={data?.product_id}>
                            <div className=' rounded-lg  relative '>
                              <div
                                onClick={() => sendGAProductClick(index, data)}
                                className='w-[146px]  rounded-md px-[18px] py-[8px] h-auto max-[991px]:w-[110px] max-[576px]:w-[90px] max-[479px]:w-[80px]  compare-img-card'>
                                <Image
                                  id={`${index}+'bank=11-img'`}
                                  src={`${Img_URL}/${data?.product_image}`}
                                  alt='card image'
                                  width={90}
                                  height={50}
                                  unoptimized={true}
                                  className=''
                                />
                              </div>

                              <div
                                className='absolute top-[-10px] right-[-8px] border border-[#000] p-1 rounded-full bg-white text-[#212529]'
                                onClick={() => {
                                  document.getElementById(data.product_id).checked = false
                                  setSelectedData([
                                    ...selectedData?.filter((item) => item.product_id !== data.product_id)
                                  ])
                                }}>
                                <Image src={CloseIcon} height={12} width={12} priority={true} alt='img' className='  w-[12px] h-[12px]' />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                  <div className='flex max-[1820px]:flex max-[1820px]:gap-8  gap-5 items-center max-[576px]:gap-4 max-[320px]:gap-2 '>
                    {size?.width > 991 && selectedData?.length < 2 && selectedData?.length != null && (
                      <div>
                        <p className='text-[15px] text-[#212529] max-[479px]:text-[12px]'>
                          Add upto 3 accounts to compare
                        </p>
                      </div>
                    )}
                    <div className='max-xs:my-2'>
                      <button
                        id={`1+'data+bank'`}
                        type='button'
                        disabled={disable}
                        className={
                          disable
                            ? 'bg-[#ccc]  disabled cursor-no-drop xl:px-4 lg:text-[14px] py-3 px-6 text-white xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px] rounded-lg'
                            : 'bg-[#49D49D] cursor-pointer xl:px-4 lg:text-[14px] py-3 px-6 text-[#212529] xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px]  rounded-lg'
                        }
                        onClick={() => handleCompareNow()}>
                        Compare
                      </button>
                    </div>
                    <div className='max-xs:my-2'>
                      <button
                        id={`2+'bank=btn'`}
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

  // ------------------------BANKS NAMES WHEN APPLIED FILTER ------------------------- //

  const handleCheckBoxRemove = (index) => {
    checkBoxValues?.splice(index, 1)
    setCheckBoxValues([...checkBoxValues])
    setCardsList(cardsList)
  }
  const getCheckBoxAboveList = () => {
    return checkBoxValues?.map((value1, index) => {
      return (
        <div className='active cursor-pointer inline-flex ml-[8px] mt-[5px]' key={index}>
          <button
            id={`${index}+'bank=btn'`}
            className='bg-none p-2 px-6 text-sm rounded-md bg-[#E6ECF1] border-[#E6ECF1] text-[#212529] flex capitalize items-center '>
            {value1}
            <Image
              id={`${index}+'btn+bank'`}
              src={CloseIcon}
              alt='image'
              height={16}
              width={16}
              priority={true}
              className='align-middle ml-2 w-[16px] h-[16px] '
              onClick={() => handleCheckBoxRemove(index)}
            />
          </button>
        </div>
      )
    })
  }

  // -------------------------  GA EVENTS LOGGING ----------------------------------- //
  const position = router?.query?.page ? (router?.query?.page - 1) * 10 : 0

  const listingItems =
    cardsList?.length > 0 &&
    cardsList?.map((product, index) => {
      const pagePosition = position + index + 1
      return {
        item_id: product?.product_id?.toString(),
        item_name: product?.card_name,
        index: pagePosition,
        item_brand: product?.bank_name,
        item_category: 'Credit Cards',
        item_category2: '',
        item_category3: '',
        item_category4: '',
        item_category5: '',
        item_list_id: 'Credit Cards Products',
        item_list_name: 'Credit Cards Products',
        item_variant: product?.card_name,
        quantity: 1
      }
    })
  const eventData = {
    event: 'view_item_list',
    ecommerce: {
      item_list_id: 'Credit Cards Products',
      item_list_name: 'Credit Cards Products',
      items: listingItems
    }
  }
  useGaEvents(eventData)
  const sendGAProductClick = (index, item) => {
    const pagePosition = position + index + 1
    const sendProductClick = {
      event: 'select_item',
      ecommerce: {
        item_list_id: 'Credit Card Products',
        item_list_name: 'Credit Card Products',
        items: [
          {
            item_id: item?.product_id?.toString(),
            item_name: item?.card_name,
            index: pagePosition,
            item_brand: item?.bank_name,
            item_category: 'Credit Cards',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: 'Credit Card Products',
            item_list_name: 'Credit Card Products',
            item_variant: item?.card_name,
            quantity: 1
          }
        ]
      }
    }
    return sendEventToGTM(sendProductClick)
  }

  const handleFeatureAccordion = (index) => {
    setFeatureAccordion(!featureAccordion)
    if (featureIndex?.includes(index)) {
      const updateValue = featureIndex.indexOf(index)
      featureIndex.splice(updateValue, 1)
      setFeatureIndex(featureIndex)
    } else {
      setFeatureIndex([...featureIndex, index])
    }
  }
  const handleWelcomAccordion = (index) => {
    setWelcomeAccordion(!welcomeAccordion)
    if (welcomeIndex?.includes(index)) {
      const updateValue = welcomeIndex.indexOf(index)
      welcomeIndex.splice(updateValue, 1)
      setWelcomeIndex(welcomeIndex)
    } else {
      setWelcomeIndex([...welcomeIndex, index])
    }
  }

  useEffect(() => {
    if (selectedData?.length > 0) {
      setCompareModal(true)
    } else {
      setCompareModal(false)
    }
  }, [selectedData.length])

  return (
    <div className='col-span-4 2xl:col-span-4 md:col-span-4 flex flex-col w-full'>
      <div className='max-md:hidden'>{getCheckBoxAboveList()}</div>
      {getFrozenCompareComp()}
      {cardsList?.length > 0 ? (
        cardsList?.map((item, index) => {
          return (
            <>
              {size?.width > 992 ? (
                <div key={item?.product_id} className='' ref={cardDataRef}>
                  <div
                    className={`pt-[36px] rounded-3xl bg-white filter-card-box duration-300 mb-[30px] relative ${
                      checkBoxValues?.length > 0 ? 'mt-[25px]' : ''
                    }`}>
                    <div className='flex max-[1024px]:justify-between px-[30px] max-[768px]:justify-start max-[768px]:gap-8 '>
                      <div className=''>
                        {/* PRODUCT IMAGE */}
                        <div
                          className='xl:w-[200px] h-full md:w-[180px]  rounded-lg flex justify-center items-center  '
                          onClick={() => sendGAProductClick(index, item)}>
                          <Link href={`/${item?.url_slug}`} prefetch={false}>
                            <Image
                              id={`${index}+'bank=11-img'`}
                              src={`${Img_URL}/${item?.product_image}`}
                              alt='card image'
                              width={140}
                              height={100}
                              className='xl:w-[240px] md:w-[180px] business-card-img'
                              unoptimized={true}
                            />
                          </Link>
                        </div>
                      </div>
                      {/* CARD NAME */}
                      <div className='px-4 xl:w-[100%] md:pr-0 md:px-[30px]'>
                        <div className=' grid grid-cols-4 max-[1440px]:grid-cols-3 max-[768px]:grid-cols-3'>
                          <div className='col-span-3 max-[1440px]:col-span-2'>
                            <div onClick={() => sendGAProductClick(index, item)}>
                              <Link href={`/${item?.url_slug}`} prefetch={false}>
                                <h2
                                  id={`${index}+'item bank'`}
                                  className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>
                                  {item?.card_name || item?.title}
                                </h2>
                              </Link>
                            </div>
                            {/* categories or benefits */}
                            <span
                              className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                              data-tooltip-target='tooltip-light'
                              data-tooltip-style='light'
                              data-te-toggle='tooltip'
                              title={`${item?.welcome_benefits.replace(/["']/g, ' ')}`}>
                              {item?.welcome_benefits.replace(/["']/g, ' ')}
                            </span>
                            {/* LOGO */}
                            <div className='flex items-center gap-2 mt-2 pt-6'>
                              <div className='border border-[#E6ECF1] rounded-full'>
                                <Image
                                  src={item?.logoimg || logo}
                                  alt='img'
                                  width={45}
                                  height={50}
                                  className=' p-2 w-[36px] h-[36px]'
                                />
                              </div>

                              <div className='border rounded-full py-1 px-4 flex gap-2 items-center max-[320px]:px-2'>
                                <p className='xl:text-[12px] md:text-[12px] font-semibold text-[#212529]'>
                                  {item?.rating}/5
                                </p>
                                <StarRatings
                                  rating={item?.rating}
                                  starRatedColor='#49d49d'
                                  numberOfStars={starCount}
                                  name='rating'
                                  starDimension='20px'
                                  starSpacing='0'
                                />
                              </div>
                            </div>
                          </div>

                          {/* APPLY NOW AND COMPARE BUTTON */}
                          {size?.width > 768 ? (
                            <div id='save-aply-btn+88' className='flex md:flex-col gap-4 lg:flex-col items-end'>
                              <ApplyNowButton
                                data={item}
                                userData={userData}
                                category={'credit-cards'}
                                pos='25'
                                position={index}
                                disabled={item?.bank_name === "KOTAK MAHINDRA BANK"}
                                
                              />
                              <div>
                                <label className=' text-gray-500 font-bold flex items-center'>
                                  <input
                                    className='mr-2 leading-tight w-[16px] h-[16px]'
                                    type='checkbox'
                                    id={item?.product_id}
                                    disabled={
                                      size?.width <= 991
                                        ? selectedData?.length >= 2 && !selectedData?.includes(item)
                                        : selectedData?.length >= 3 && !selectedData?.includes(item)
                                    }
                                    onChange={(e) => {
                                      setCompareModal(true)
                                      handlecompareModal(e, item)
                                    }}
                                    checked={selectedData?.some(
                                      (selectedItem) => selectedItem?.product_id === item?.product_id
                                    )}
                                  />
                                  <p className='text-[15px] font-semibold  text-[#212529] business-right-text addtocomapare'>
                                    Add to compare
                                  </p>
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className='flex md:flex-col gap-4 col-span-3  mt-4 '>
                              <div id='save-aply-btn+80' className='flex justify-between items-center gap-8'>
                                <ApplyNowButton
                                  data={item}
                                  userData={userData}
                                  category={'credit-cards'}
                                  pos='26'
                                  position={index}
                                  disabled={item?.bank_name === "KOTAK MAHINDRA BANK"}
                                />
                              </div>
                              <div>
                                <label className=' text-gray-500 font-bold flex items-center'>
                                  <input
                                    className='mr-2 leading-tight w-[16px] h-[16px]'
                                    type='checkbox'
                                    onChange={(e) => {
                                      setCompareModal(true)
                                      handlecompareModal(e, item)
                                    }}
                                    checked={selectedData?.some(
                                      (selectedItem) => selectedItem?.product_id === item?.product_id
                                    )}
                                  />
                                  <p className='text-[15px] font-semibold  text-[#212529] business-right-text'>
                                    {item?.compare || 'Add to compare'}
                                  </p>
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* FEES */}
                    <div className='mt-4'>
                      <div className='grid grid-cols-3 gap-0 pt-4'>
                        <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                          <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                          {item.annual_fee == 0 ? (
                            <p className='text-[15px] font-semibold pt-1'>Free</p>
                          ) : (
                            <p className='text-[15px] font-semibold pt-1 symbole-rupee'>&#8377; {item.annual_fee} /-</p>
                          )}
                        </div>
                        <div className='border border-[gray-100] border-l-0 p-6 text-[#212529]'>
                          <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                          {item.joining_fee == 0 ? (
                            <p className='text-[15px] font-semibold pt-1'>Free</p>
                          ) : (
                            <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                              &#8377; {item.joining_fee} /-
                            </p>
                          )}
                        </div>
                        <div className='border border-[gray-100] border-l-0 border-r-0 p-6 text-[#212529]'>
                          <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                          <div className='flex items-center gap-4'>
                            {item?.min_credit_score && (
                              <>
                                <p className='text-[15px] font-semibold pt-1'>{item?.min_credit_score}</p>
                              </>
                            )}
                            <div className='tooltip'>
                              {item?.min_credit_score && item?.max_credit_score && (
                                <>
                                  <Image
                                    src={ListingfilterData?.helpimg}
                                    className='w-5 h-5'
                                    alt='img'
                                    width={20}
                                    height={20}
                                  />
                                  <span className='tooltiptext'>
                                    Having a credit score within or above the recommended range increases your
                                    likelihood of approval for various financial applications, but it does not provide
                                    an absolute guarantee.
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <Link
                            href='/cibil-credit-score-check'
                            className='text-[15px]  pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                            prefetch={false}>
                            Check free credit score
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div
                      id='accordionExample'
                      data-active-classes='bg-none'
                      data-inactive-classes='text-[#212529]'
                      className='px-4 py-[8px]'>
                      {item?.features && (
                        <div className=' px-3 relative   bg-white  duration-300 border-b'>
                          <h3 id='accordion-flush-heading-1 '>
                            <button
                              onClick={() => handleFeatureAccordion(index)}
                              type='button'
                              className='text-[#212529]  list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                              data-accordion-target='#accordion-flush-body-1'
                              aria-expanded='true'
                              aria-controls='accordion-flush-body-1'>
                              {ListingfilterData.features}

                              {featureIndex?.includes(index) ? (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
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
                          </h3>
                          {featureIndex?.includes(index) && (
                            <div aria-labelledby='accordion-flush-heading-1'>
                              <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                                <div
                                  className='list-disc  space-y-2 mb-6 text-[14px] text-[#545454] product-list-data'
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${item?.features}</div>`
                                  }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {item?.welcome_offer && (
                        <div className=' px-3 rounded-2xl relative  bg-white  duration-300'>
                          <h3 id='accordion-flush-heading-1 '>
                            <button
                              onClick={() => handleWelcomAccordion(index)}
                              type='button'
                              className='pt-[8px] text-[#212529] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                              data-accordion-target='#accordion-flush-body-1'
                              aria-expanded='true'
                              aria-controls='accordion-flush-body-1'>
                              {ListingfilterData.welcomeoffer}

                              {welcomeIndex?.includes(index) ? (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
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
                          </h3>
                          {welcomeIndex?.includes(index) && (
                            <div aria-labelledby='accordion-flush-heading-1'>
                              <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                                <div
                                  className='list-disc space-y-2 mb-2    text-[14px] text-[#545454] pb-2 product-list-data'
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${item?.welcome_offer}</div>`
                                  }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : size?.width < 576 ? (
                <>
                  <div className='grid 2xl:grid-cols-4 xl:mt-8 xl:gap-2 xl:grid-cols-3 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 max-[479px]:mt-0 lg:px-16 max-[479px]:gap-[35px] mb-[30px]'>
                    <div key={item?.product_id}>
                      <div className='bg-white  rounded-3xl   h-full  filter-card-box duration-300 mt-[10px]'>
                        <div className='flex gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2 py-2 max-sm:pt-4'>
                          <div className=''>
                            <div className='w-auto h-[100px] py-1' onClick={() => sendGAProductClick(index, item)}>
                              <Link href={`/${item?.url_slug}`} prefetch={false}>
                                <Image
                                  id={`${index}+'bank=11-img'`}
                                  src={`${Img_URL}/${item?.product_image}`}
                                  alt='card image'
                                  width={120}
                                  height={90}
                                  unoptimized={true}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className=' xl:w-[100%] '>
                            <div className=' grid grid-cols-1'>
                              <div className='text-[#212529]'>
                                <div onClick={() => sendGAProductClick(index, item)}>
                                  <Link href={`/${item?.url_slug}`} prefetch={false}>
                                    <h2
                                      id={`${index}+'bank-btn'`}
                                      className='text-[20px] whitespace-nowrap overflow-ellipsis overflow-hidden max-[425px]:text-[15px] font-bold max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'
                                      data-tooltip-target='tooltip-light'
                                      data-tooltip-style='light'
                                      data-te-toggle='tooltip'
                                      title={`${
                                        item?.card_name?.replace(/["']/g, ' ') || item?.title?.replace(/["']/g, ' ')
                                      }`}>
                                      {item?.card_name || item?.title}
                                    </h2>
                                  </Link>
                                </div>
                                <span
                                  className='text-[14px] comparebox-card-text pb-3 text-[#212529]'
                                  data-tooltip-target='tooltip-light'
                                  data-tooltip-style='light'
                                  data-te-toggle='tooltip'
                                  title={`${item?.welcome_benefits.replace(/["']/g, ' ')}`}>
                                  {item?.welcome_benefits.replace(/["']/g, ' ')}
                                </span>

                                <div className='flex items-center gap-2 mt-2 pt-6 max-[360px]:gap-1'>
                                  <div className='border rounded-full border-[#E6ECF1] '>
                                    <Image
                                      src={logo}
                                      alt='img'
                                      width={45}
                                      height={50}
                                      className=' p-2 w-[36px] h-[36px]'
                                    />
                                  </div>

                                  <div className='border rounded-full py-[6px] px-4 flex gap-2 items-center  max-[771px]:px-2 max-[320px]:px-1 max-[360px]:gap-1'>
                                    <p className='xl:text-[18px] md:text-[14px] font-semibold max-[479px]:text-[12px] text-[15px] text-[#212529] max-[280px]:text-[11px]'>
                                      {item?.rating}/5
                                    </p>
                                    <div className=''>
                                      <StarRatings
                                        rating={item?.rating}
                                        starRatedColor='#49d49d'
                                        numberOfStars={starCount}
                                        name='rating'
                                        starDimension='17px'
                                        starSpacing='0'
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id='save-aply-btn+89' className='flex items-center gap-4 mt-6 px-4  max-[280px]:!px-2'>
                          <ApplyNowButton
                            data={item}
                            userData={userData}
                            category={'credit-cards'}
                            pos='27'
                            position={index}
                            disabled={item?.bank_name === "KOTAK MAHINDRA BANK"}
                          />
                        </div>
                        <div className='py-5 px-4 border-b max-[280px]:!px-2'>
                          <label className='text-gray-500 font-bold flex items-center justify-center'>
                            <input
                              className='mr-2 leading-tight w-[16px] h-[16px]'
                              type='checkbox'
                              id={item?.product_id}
                              disabled={
                                size?.width <= 991
                                  ? selectedData.length >= 2 && !selectedData?.includes(item)
                                  : selectedData.length >= 3 && !selectedData?.includes(item)
                              }
                              onChange={(e) => {
                                handlecompareModal(e, item)
                                setCompareModal(true)
                              }}
                              checked={selectedData.some(
                                (selectedItem) => selectedItem.product_id === item?.product_id
                              )}
                            />
                            <p className='text-[15px] font-semibold  text-[#212529] '>{ListingfilterData.compare}</p>
                          </label>
                        </div>
                        <div className='pb-5 border-b text-[#212529] max-[280px]:!px-2 grid grid-cols-2'>
                          <div className='p-6 border border-[gray-100] border-l-0 border-t-0 text-[#212529]'>
                            <p className='text-[13px] font-normal'>{ListingfilterData.fees}</p>
                            {item?.annual_fee == 0 ? (
                              <p className='text-[15px] font-semibold pt-1'>Free</p>
                            ) : (
                              <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                                &#8377; {item?.annual_fee} /-
                              </p>
                            )}
                          </div>
                          <div className='p-6 border border-[gray-100] border-l-0 border-t-0 border-r-0 text-[#212529]'>
                            <p className='text-[13px] font-normal'>{ListingfilterData.joiningfees}</p>
                            {item?.joining_fee == 0 ? (
                              <p className='text-[15px] font-semibold pt-1'>Free</p>
                            ) : (
                              <p className='text-[15px] font-semibold pt-1 symbole-rupee'>
                                &#8377; {item?.joining_fee} /-
                              </p>
                            )}
                          </div>
                          <div className='pl-6 pt-6 col-span-2 pb-1'>
                            <p className='text-[13px] font-normal'>{ListingfilterData?.recommended}</p>
                            <div className='flex items-center gap-4'>
                              {item?.min_credit_score && (
                                <>
                                  <p className='text-[15px] font-semibold pt-1'>{item?.min_credit_score}</p>
                                </>
                              )}
                              <div className='tooltip'>
                                {item?.min_credit_score && item?.max_credit_score && (
                                  <>
                                    <Image
                                      src={ListingfilterData?.helpimg}
                                      className='w-5 h-5'
                                      alt='img'
                                      width={20}
                                      height={20}
                                    />
                                    <span className='tooltiptext'>
                                      Having a credit score within or above the recommended range increases your
                                      likelihood of approval for various financial applications, but it does not provide
                                      an absolute guarantee.
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <Link
                              href='/cibil-credit-score-check'
                              className='text-[15px]  pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                              prefetch={false}>
                              Check free credit score
                            </Link>
                          </div>
                        </div>
                        <div
                          id='accordionExample'
                          data-active-classes='bg-none'
                          data-inactive-classes='text-[#212529]'
                          className='px-4 py-[8px]'>
                          {item?.features && (
                            <div className=' px-3 relative   bg-white  duration-300 border-b'>
                              <h3 id='accordion-flush-heading-1 '>
                                <button
                                  onClick={() => handleFeatureAccordion(index)}
                                  type='button'
                                  className='text-[#212529]  list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                                  data-accordion-target='#accordion-flush-body-1'
                                  aria-expanded='true'
                                  aria-controls='accordion-flush-body-1'>
                                  {ListingfilterData.features}

                                  {featureIndex?.includes(index) ? (
                                    <Image
                                      src={accordionArrowall}
                                      alt='down'
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
                              </h3>
                              {featureIndex?.includes(index) && (
                                <div aria-labelledby='accordion-flush-heading-1'>
                                  <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                                    <div
                                      className='list-disc  space-y-2 text-[14px] text-[#545454] product-list-data'
                                      dangerouslySetInnerHTML={{
                                        __html: `<div>${item?.features}</div>`
                                      }}></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {item?.welcome_offer && (
                            <div className=' px-3 pt-2 rounded-2xl relative   bg-white  duration-300'>
                              <h3 id='accordion-flush-heading-1 '>
                                <button
                                  onClick={() => handleWelcomAccordion(index)}
                                  type='button'
                                  className='text-[#212529] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                                  data-accordion-target='#accordion-flush-body-1'
                                  aria-expanded='true'
                                  aria-controls='accordion-flush-body-1'>
                                  {ListingfilterData.welcomeoffer}

                                  {welcomeIndex?.includes(index) ? (
                                    <Image
                                      src={accordionArrowall}
                                      alt='down'
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
                              </h3>
                              {welcomeIndex?.includes(index) && (
                                <div aria-labelledby='accordion-flush-heading-1'>
                                  <div className=' font-light border-0 border-b-0 border-t-0 border-gray-200 '>
                                    <div
                                      className='list-disc space-y-2 text-[14px] text-[#545454] pb-2 product-list-data'
                                      dangerouslySetInnerHTML={{
                                        __html: `<div>${item?.welcome_offer}</div>`
                                      }}></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
            </>
          )
        })
      ) : (
        <FilterNotFound
          resetFilter={handleClearFilter}
          btnActive='Go Back'
          btnActiveLink={router?.asPath}
          btnTransparentLink={router?.asPath}
          btnTransparent='Reset Filter'
          btn={true}
          subTitle='Kindly reset filters or Go back to Previous page'
          showPadding={false}
          isTab={forTablet}
        />
      )}
      {forTablet && (
        <TabletListing
          Img_URL={Img_URL}
          cardsList={cardsList}
          sendGAProductClick={sendGAProductClick}
          starCount={starCount}
          userData={userData}
          size={size}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          logo={logo}
          handleFeatureAccordion={handleFeatureAccordion}
          handleWelcomAccordion={handleWelcomAccordion}
          featureIndex={featureIndex}
          accordionArrowall={accordionArrowall}
          welcomeIndex={welcomeIndex}
          setCompareModal={setCompareModal}
          handlecompareModal={handlecompareModal}
        />
      )}
    </div>
  )
}

export default CardsListing
