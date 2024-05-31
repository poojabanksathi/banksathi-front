import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState, useId } from 'react'
import CloseIcon from '../../../../../public/assets/closeIcon.svg'
import accordionArrowall from '../../../../../public/assets/accordion-down.svg'
import Link from 'next/link'
import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
// import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import dynamic from 'next/dynamic'
import logo from '../../../../../public/assets/footer-Logo.svg'
import { useRouter } from 'next/router'
import { sendEventToGTM } from '@/utils/util'
import alertOctagon from '../../../../../public/assets/alert-octagon.svg'
import { mockData } from '../data'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import useGaEvents from '@/hooks/useGaEvents'
import CommonFeaturesComp from '../SavingAccountsDetails/CommonFeaturesComp/CommonFeaturesComp'

const PaginationData = dynamic(() => import('@/core/component/common/Pagination'), {
  ssr: false
})
const FilterNotFound = dynamic(() => import('@/core/component/common/FilterNotFound'), {
  ssr: false
})
const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

function AccountListRight({
  handleRemoveCategory,
  categoryActive,
  addPagination = true,
  SavingCardListAll,
  checkBoxValues,
  setCheckBoxValues,
  setBankAccountsList,
  handleClearFilter,
  isSubCategoryFlow,
  totalProducts,
  relatedAccountsData,
  url_slug,
  title,
  onPageChange,
  currentPage,
  isApplied,
  getSortingOptionsPlp
}) {
  const pageSize = 20
  const starCount = 5
  const id = useId()

  const size = useWindowSize()
  const router = useRouter()
  const cardDataRef = useRef(null)

  const [savingcardAccordion, setSavingcardAccordion] = useState(false)
  const [savingCardIndex, setSavingCardIndex] = useState([])
  const [debitCardAccordion, setDebitcardAccordion] = useState(false)
  const [debitCardIndex, setDebitCradIndex] = useState([])
  const [comparemodal, setCompareModal] = useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [compareslug, setCompareSlug] = useState([])
  const [eligibleCardsData, setEligibleCardsData] = useState([])
  const [fieldValue, setFieldValue] = useState()

  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')

  const gaListName = isSubCategoryFlow ? `Bank Accounts ${url_slug}` : 'Bank Accounts Products'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')

      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const userData = localUserData && JSON.parse(localUserData)

  const handleAccordionSaving = (index) => {
    setSavingcardAccordion(!savingcardAccordion)
    if (savingCardIndex?.includes(index)) {
      const updateValue = savingCardIndex.indexOf(index)
      savingCardIndex.splice(updateValue, 1)
      setSavingCardIndex(savingCardIndex)
    } else {
      setSavingCardIndex([...savingCardIndex, index])
    }
  }

  const handleAccordionDebit = (index) => {
    setDebitcardAccordion(!debitCardAccordion)
    if (debitCardIndex?.includes(index)) {
      const updateValue = debitCardIndex.indexOf(index)
      debitCardIndex.splice(updateValue, 1)
      setDebitCradIndex(debitCardIndex)
    } else {
      setDebitCradIndex([...debitCardIndex, index])
    }
  }
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

  const getFrozenCompareComp = () => {
    const disable = selectedData?.length < 2 || selectedData?.length == 4

    const handleCompareNow = () => {
      const slugs = selectedData?.map((item) => {
        return item?.url_slug?.split('/')?.pop()
      })
      const length = slugs?.length
      const pathname =
        length === 3
          ? `/bank-accounts/compare/${slugs?.[0]}/${slugs?.[1]}/${slugs?.[2]}`
          : `/bank-accounts/compare/${slugs?.[0]}/${slugs?.[1]}`
      return router?.push({ pathname: pathname })
    }
    const renderCondition = windowWidthSize <= 991 ? selectedData?.length == 2 : selectedData?.length == 3

    return comparemodal && selectedData?.length > 0 ? (
      <>
        {renderCondition && (
          <div
            className='fixed z-50 h-[13rem] bottom-0 w-full left-0 max-[1200px]:h-[14rem] max-[991px]:h-[13rem] max-[1600px]:h-[200px]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-[#FFEBF2] add-modal  max-[767px]:bottom-[8%] max-sm:bottom-[15%]'
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
          className='fixed z-50  py-[30px] max-sm:py-4 bottom-0 w-full left-0 h-[124px]  max-xl:h-auto max-lg:h-auto max-[576px]:h-auto  max-[575px]:h-auto bg-white add-modal shadow'
          id='modal'>
          <div className='flex items-center justify-center min-height-100vh  px-4  text-center sm:block sm:p-0'>
            <div className=''>
              <div className='flex max-[1820px]:flex justify-center gap-12 max-[1600px]:gap-4   max-xl:justify-center  items-center add-comapre-modal'>
                <>
                  <div className='flex gap-7 max-[1200px]:flex-wrap  max-[991px]:flex-nowrap  max-[1200px]:gap-4 max-md:justify-between max-[576px]:justify-center add-comapre-card max-[320px]:gap-2'>
                    {selectedData?.length <= 3 &&
                      selectedData?.map((data, index) => {
                        return (
                          <div key={index}>
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
                                <Image src={CloseIcon} alt='img' height={12} width={12} priority={true} className='  w-[12px] h-[12px]' />
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
                      {/* <CompareNowBtn
                        compareslug={selectedData}
                        name='Compare'
                        disable={selectedData?.length < 2 || selectedData?.length == 4}
                      /> */}
                      <button
                        id={`1+'data+bank'`}
                        type='button'
                        disabled={disable}
                        className={
                          disable
                            ? 'bg-[#ccc]  disabled cursor-no-drop xl:px-4 lg:text-[14px] py-3 px-6 text-white xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px] rounded-lg'
                            : 'bg-[#49D49D] cursor-pointer xl:px-4 lg:text-[14px] py-3 px-6 text-[#212529] xl:text-[14px] max-[320px]:text-[10px] sm:text-[12px] text-[14px]  rounded-lg'
                        }
                        onClick={() => handleCompareNow(selectedData)}>
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
  const handleCheckBoxRemove = (index) => {
    checkBoxValues?.splice(index, 1)
    setCheckBoxValues([...checkBoxValues])
    setBankAccountsList(SavingCardListAll)
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

  const windowWidthSize = useMemo(() => {
    return size?.width
  }, [size?.width])

  const forTablet = size?.width > 576 && size?.width < 992

  //.......................... TAB LISTING.........................//
  const mediumCardListing = () => {
    return (
      <>
        <div className='grid 2xl:grid-cols-4 my-8 xl:mt-8 xl:gap-2 xl:grid-cols-3 xl:gap-4 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 max-[479px]:mt-0 lg:px-16 max-[479px]:gap-[30px]'>
          <>
            {SavingCardListAll?.length > 0 &&
              SavingCardListAll?.map((alldata, index) => {
                return (
                  <div key={index}>
                    <div className='pt-6 bg-white  rounded-3xl   h-full  filter-card-box duration-300 relative'>
                      {alldata?.best_of && (
                        <div className='absolute left-0 top-0'>
                          <div className='regular-box-card flex items-center justify-center rounded-tl-3xl rounded-br-3xl'>
                            <p className='uppercase text-white'>{alldata?.best_of}</p>
                          </div>
                        </div>
                      )}
                      <div className='flex mt-3 gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2 relative'>
                        <div className=''>
                          <div
                            onClick={() => sendGAProductClick(index, alldata)}
                            className='w-[130px] h-[130px] max-[771px]:w-[100px] max-[768px]:w-[120px] max-[425px]:w-[120px] max-[360px]:w-[100px] max-[320px]:!w-[84px] mobile-card-crdit'>
                            <Image
                              id={`${index}+'bank=14-img'`}
                              src={`${Img_URL}/${alldata?.product_image}`}
                              alt='card image'
                              width={120}
                              height={120}
                              className='xl:w-full md:w-full'
                              unoptimized={true}
                            />
                          </div>
                        </div>
                        <div className=' xl:w-[100%] '>
                          <div className=' grid grid-cols-1'>
                            <div className='text-[#212529]'>
                              <div onClick={() => sendGAProductClick(index, alldata)}>
                                <Link href={`/${alldata?.url_slug}`} prefetch={false}>
                                  <h2
                                    id={`${index}+'bank+name'`}
                                    className='text-[16px]  font-bold max-[991px]:text-[16px] text-[#212529] leading-7 pb-2'>
                                    {alldata?.card_name || alldata?.title}
                                  </h2>
                                </Link>
                              </div>

                              <p className=' text-[12px] font-semibold text-[#212529]  max-[771px]:pt-2'>
                                BankSathi rating
                              </p>

                              <div className='flex items-center gap-2 mt-2 max-[360px]:gap-1'>
                                <div className='border border-[#E6ECF1] rounded-full'>
                                  <Image
                                    src={alldata?.logoimg || logo}
                                    alt='img'
                                    width={45}
                                    height={50}
                                    className=' border rounded-full p-2 w-[36px] h-[36px]'
                                  />
                                </div>

                                <Link href='#' className='text-[#212529]' prefetch={false}>
                                  <div className='border rounded-full py-1 px-4 flex gap-2 items-center  max-[771px]:px-2 max-[360px]:gap-1'>
                                    <p className='xl:text-[18px] lg:text-[14px] max-[768px]:text-[12px] font-semibold max-[479px]:text-[14px] text-[15px] text-[#212529] max-[280px]:text-[11px] '>
                                      {alldata?.rating}/5
                                    </p>
                                    <div className=''>
                                      <ReactStars
                                        count={starCount}
                                        value={alldata?.rating}
                                        // onChange={ratingChanged}
                                        size={14}
                                        edit={false}
                                        color1={'#ccc'}
                                        color2={'#49d49d'}
                                      />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id={'save-aply-btn' + index}
                        className='flex items-center gap-4 mt-6 px-4  max-[280px]:!px-2'>
                        <ApplyNowButton
                          data={alldata}
                          userData={userData}
                          category={isSubCategoryFlow ? `bank ${url_slug}` : 'bank accounts'}
                          pos='23'
                          position={index}
                          disabled={alldata?.bank_name === "KOTAK MAHINDRA BANK"}
                        />
                      </div>

                      <div className='py-5 px-4 border-b max-[280px]:!px-2'>
                        <label className='text-gray-500 font-bold flex items-center'>
                          <input
                            className='mr-2 leading-tight w-[16px] h-[16px]'
                            type='checkbox'
                            id={alldata?.product_id}
                            disabled={
                              size?.width <= 991
                                ? selectedData?.length >= 2 && !selectedData?.includes(alldata)
                                : selectedData?.length >= 3 && !selectedData?.includes(alldata)
                            }
                            onChange={(e) => {
                              setCompareModal(true)
                              handlecompareModal(e, alldata)
                            }}
                            checked={selectedData?.some(
                              (selectedItem) => selectedItem?.product_id === alldata?.product_id
                            )}
                          />
                          <p className='text-[15px] font-semibold  text-[#212529] '>Add to Compare</p>
                        </label>
                      </div>
                      <div className='mt-4'>
                        <div className='grid grid-cols-2 gap-0 max-md:grid-cols-2'>
                          <div className='border border-[gray-100] border-l-0 p-6 h-full text-[#212529]'>
                            <p className='text-[13px] font-normal '>{'Interest Rate'}</p>
                            {alldata?.rate_of_interest && (
                              <p className='text-[15px] font-semibold pt-1 mt-0'>
                                <span className='symbole-rupee'>{alldata.rate_of_interest} %</span>
                              </p>
                            )}
                          </div>
                          <div className='border border-[gray-100] border-l-0 p-6 h-full text-[#212529]'>
                            <p className='text-[13px] font-normal'></p>
                            {alldata?.min_bal_to_open_ac != null &&
                              String(alldata?.min_bal_to_open_ac)?.trim().length > 0 && (
                                <div className='flex items-center gap-4'>
                                  <p className='text-[15px] font-semibold pt-1 mt-0 symbole-rupee'>
                                    ₹ {alldata?.min_bal_to_open_ac}{' '}
                                  </p>
                                </div>
                              )}
                          </div>
                          <div className='border grid-cols-1 col-span-2 border-[gray-100] border-l-0 border-r-0 p-6 text-[#212529]'>
                            <p className='text-[13px] font-normal'>Minimum monthly balance</p>
                            {alldata?.avg_mon_bal != null && String(alldata?.avg_mon_bal)?.trim().length > 0 && (
                              <div className='flex items-center gap-4'>
                                <p className='text-[15px] font-semibold pt-1 mt-0 symbole-rupee'>
                                  ₹ {alldata?.avg_mon_bal}{' '}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        id='accordionExample'
                        data-active-classes='bg-none'
                        data-inactive-classes='text-[#212529]'
                        className='   '>
                        {(alldata?.min_bal_to_open_ac ||
                          alldata?.cashback_offer ||
                          alldata?.avg_mon_bal ||
                          alldata?.daily_txn_limit_online) && (
                          <div
                            className={`relative bg-white  duration-300 px-6 py-[7px] border-[gray-100] ${
                              alldata?.features ? '!border-b' : ''
                            }`}>
                            <h3 id='accordion-flush-heading-1  '>
                              <button
                                id={`${index}+'bank+alldata'`}
                                onClick={() => handleAccordionSaving(index)}
                                type='button'
                                className='text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left'
                                data-accordion-target='#accordion-flush-body-1'
                                aria-expanded='true'
                                aria-controls='accordion-flush-body-1'>
                                {mockData?.serviceTabs?.subTitle1}
                                {savingCardIndex?.includes(index) ? (
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
                            {savingCardIndex?.includes(index) && (
                              <div aria-labelledby='accordion-flush-heading-1'>
                                <div className='grid grid-cols-3 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>
                                  <CommonFeaturesComp title='ACCOUNT' commonFeaturesData={alldata} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {(alldata?.atm_with_limit_fpm ||
                          alldata?.debit_card_spend_limit ||
                          alldata?.card_rep_fee ||
                          alldata?.international_usag) && (
                          <div className={`rounded-2xl relative  bg-white duration-300 px-6 py-[7px]`}>
                            <h3 id='accordion-flush-heading-1  '>
                              <button
                                id={`${index}+'bank+alldata'`}
                                onClick={() => handleAccordionDebit(index)}
                                type='button'
                                className='text-[#212529] list-none font-semibold gap-[16px] relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left'
                                data-accordion-target='#accordion-flush-body-1'
                                aria-expanded='true'
                                aria-controls='accordion-flush-body-1'>
                                {mockData?.other?.debit}
                                {debitCardIndex?.includes(index) ? (
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

                            {debitCardIndex?.includes(index) && (
                              <div aria-labelledby='accordion-flush-heading-1'>
                                <div className='grid grid-cols-4 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>
                                  <CommonFeaturesComp title='DEBIT' commonFeaturesData={alldata} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </>
        </div>
      </>
    )
  }

  const route = router?.pathname
  const position = router?.query?.page ? (router?.query?.page - 1) * 10 : 0

  const listingItems = SavingCardListAll?.map((product, index) => {
    const pagePosition = position == 0 ? position + index + 1 : position + index + 1
    return {
      item_id: product?.product_id?.toString(),
      item_name: product?.card_name || product?.title,
      index: pagePosition,
      item_brand: product?.bank_name,
      item_category: 'bank-accounts',
      item_category2: '',
      item_category3: '',
      item_category4: '',
      item_category5: '',
      item_list_id: gaListName,
      item_list_name: gaListName,
      item_variant: product?.card_name || product?.title,
      quantity: 1
    }
  })
  //GtM object defined
  const eventData = {
    event: 'view_item_list',
    ecommerce: {
      item_list_id: gaListName,
      item_list_name: gaListName,
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
        item_list_id: gaListName,
        item_list_name: gaListName,
        items: [
          {
            item_id: item?.product_id?.toString(),
            item_name: item?.card_name,
            index: pagePosition,
            item_brand: item?.bank_name,
            item_category: 'bank accounts',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: gaListName,
            item_list_name: gaListName,
            item_variant: item?.card_name,
            quantity: 1
          }
        ]
      }
    }
    return sendEventToGTM(sendProductClick)
  }

  return (
    <>
      <div id='related-accounts' className={'col-span-4 2xl:col-span-4 md:col-span-4 flex flex-col  w-full'}>
        {size?.width > 768 && (
          <div className='flex flex-row justify-between pb-[1rem] gap-x-0'>
            <div className='max-md:hidden'>{getCheckBoxAboveList()}</div>
            <div className=''>{getSortingOptionsPlp()}</div>
          </div>
        )}
        {/* ......DESKTOP FILTERED PROVIDERS NAMES TABS ..... */}
        {SavingCardListAll?.length > 0 ? (
          SavingCardListAll?.map((allListdata, index) => {
            return (
              <>
                {getFrozenCompareComp()}
                {size?.width > 992 ? (
                  <div key={index} className='' ref={cardDataRef}>
                    <div
                      className={`pt-[36px]  rounded-3xl bg-white filter-card-box duration-300 mb-[30px] ${
                        checkBoxValues?.length > 0 ? 'mt-[25px]' : ''
                      }`}>
                      {allListdata?.best_of && (
                        <div className='relative bottom-[40px]'>
                          <div className='regular-box-card flex items-center justify-center rounded-tl-3xl rounded-br-3xl'>
                            <p className='uppercase text-white'>{allListdata?.best_of}</p>
                          </div>
                        </div>
                      )}
                      <div className='flex max-[1024px]:justify-between px-[30px] max-[768px]:justify-start max-[768px]:gap-8 '>
                        <div className=''>
                          <div
                            className='xl:w-[200px] md:w-[180px] h-[122px]  rounded-lg flex justify-center items-center  '
                            onClick={() => sendGAProductClick(index, allListdata)}>
                            <Link href={`/${allListdata?.url_slug}`} prefetch={false}>
                              <Image
                                id={`${index}+'bank=11-img'`}
                                src={`${Img_URL}/${allListdata?.product_image}`}
                                alt='card image'
                                width={140}
                                height={100}
                                className='h-full w-full bg-cover rounded-lg'
                                unoptimized={true}
                              />
                            </Link>
                          </div>
                        </div>

                        <div className='px-4  xl:w-[100%] md:pr-0 md:px-[30px]'>
                          <div className=' grid grid-cols-4 max-[1440px]:grid-cols-3 max-[768px]:grid-cols-3'>
                            <div className='col-span-3 max-[1440px]:col-span-2'>
                              <div onClick={() => sendGAProductClick(index, allListdata)}>
                                <Link href={`/${allListdata?.url_slug}`} prefetch={false}>
                                  <h2
                                    id={`${index}+'alldata bank'`}
                                    className='text-[18px] font-bold text-[#212529] leading-7 pb-2'>
                                    {allListdata?.card_name || allListdata?.title}
                                  </h2>
                                </Link>
                              </div>

                              <div className='flex items-center gap-2 mt-2'>
                                <div className='border border-[#E6ECF1] rounded-full'>
                                  <Image
                                    src={allListdata?.logoimg || logo}
                                    alt='img'
                                    width={45}
                                    height={50}
                                    className=' p-2 w-[36px] h-[36px]'
                                  />
                                </div>

                                <div className='border rounded-full py-1 px-4 flex gap-2 items-center max-[320px]:px-2'>
                                  <p className='xl:text-[12px] md:text-[12px] font-semibold text-[#212529]'>
                                    {allListdata?.rating}/5
                                  </p>
                                  <ReactStars
                                    count={starCount}
                                    value={allListdata?.rating}
                                    size={18}
                                    edit={false}
                                    color1={'#ccc'}
                                    color2={'#49d49d'}
                                  />
                                </div>
                              </div>
                            </div>

                            {size?.width > 768 ? (
                              <div id='save-aply-btn+88' className='flex md:flex-col gap-4 lg:flex-col  items-end'>
                                <ApplyNowButton
                                  data={allListdata}
                                  userData={userData}
                                  category={isSubCategoryFlow ? `bank ${url_slug}` : 'bank accounts'}
                                  pos='25'
                                  position={index}
                                  disabled={allListdata?.bank_name === "KOTAK MAHINDRA BANK"}

                                />
                                <div>
                                  <label className=' text-gray-500 font-bold flex items-center'>
                                    <input
                                      className='mr-2 leading-tight w-[16px] h-[16px]'
                                      type='checkbox'
                                      id={allListdata?.product_id}
                                      disabled={
                                        size?.width <= 991
                                          ? selectedData?.length >= 2 && !selectedData?.includes(allListdata)
                                          : selectedData?.length >= 3 && !selectedData?.includes(allListdata)
                                      }
                                      onChange={(e) => {
                                        setCompareModal(true)
                                        handlecompareModal(e, allListdata)
                                      }}
                                      checked={selectedData?.some(
                                        (selectedItem) => selectedItem?.product_id === allListdata?.product_id
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
                                    data={allListdata}
                                    userData={userData}
                                    category={isSubCategoryFlow ? `bank ${url_slug}` : 'bank accounts'}
                                    pos='26'
                                    position={index}
                                    disabled={allListdata?.bank_name === "KOTAK MAHINDRA BANK"}

                                  />
                                </div>
                                <div>
                                  <label className=' text-gray-500 font-bold flex items-center'>
                                    <input
                                      className='mr-2 leading-tight w-[16px] h-[16px]'
                                      type='checkbox'
                                      onChange={(e) => {
                                        setCompareModal(true)
                                        handlecompareModal(e, allListdata)
                                      }}
                                      checked={selectedData?.some(
                                        (selectedItem) => selectedItem?.product_id === allListdata?.product_id
                                      )}
                                    />
                                    <p className='text-[15px] font-semibold  text-[#212529] business-right-text'>
                                      {allListdata?.compare || 'Add to compare'}
                                    </p>
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='mt-4'>
                        <div className='grid grid-cols-3 gap-0 max-md:grid-cols-2'>
                          <div className='border border-[gray-100] border-l-0 p-6 h-full text-[#212529]'>
                            <p className='text-[13px] font-normal '>{'Interest Rate'}</p>
                            {allListdata?.rate_of_interest && (
                              <p className='text-[15px] font-semibold pt-1 mt-0'>
                                <span className='symbole-rupee'>{allListdata.rate_of_interest} %</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <div className='border border-[gray-100] border-l-0 p-6 h-full text-[#212529]'>
                              <p className='text-[13px] font-normal'>Minimum Balance to Open A/c</p>
                              {/* {String(allListdata?.min_bal_to_open_ac)?.trim().length}{allListdata?.min_bal_to_open_ac} */}
                              {allListdata?.min_bal_to_open_ac != null &&
                                String(allListdata?.min_bal_to_open_ac)?.trim().length > 0 && (
                                  <p className='text-[15px] font-semibold pt-1 mt-0'>
                                    <span className='symbole-rupee'> ₹ {allListdata?.min_bal_to_open_ac}</span>
                                  </p>
                                )}
                            </div>
                          </div>
                          <div>
                            <div className='border border-[gray-100] border-l-0 border-r-0 p-6 h-full text-[#212529]'>
                              <p className='text-[13px] font-normal'>Minimum monthly balance</p>
                              {allListdata?.avg_mon_bal != null &&
                                String(allListdata?.avg_mon_bal)?.trim().length > 0 && (
                                  <div className='flex items-center gap-4'>
                                    <p className='text-[15px] font-semibold pt-1 mt-0 symbole-rupee'>
                                      ₹ {allListdata?.avg_mon_bal}{' '}
                                    </p>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id='accordionExample'
                        data-active-classes='bg-none'
                        data-inactive-classes='text-[#212529]'
                        className='   '>
                        {(allListdata?.min_bal_to_open_ac ||
                          allListdata?.cashback_offer ||
                          allListdata?.avg_mon_bal ||
                          allListdata?.daily_txn_limit_online) && (
                          <div
                            className={`relative bg-white  duration-300 px-6 py-[7px] border-[gray-100] ${
                              allListdata?.features ? '!border-b' : ''
                            }`}>
                            <h3 id='accordion-flush-heading-1  '>
                              <button
                                id={`${index}+'bank-btn'`}
                                onClick={() => handleAccordionSaving(index)}
                                type='button'
                                className='text-[#212529] gap-[16px] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left'
                                data-accordion-target='#accordion-flush-body-1'
                                aria-expanded='true'
                                aria-controls='accordion-flush-body-1'>
                                {mockData?.serviceTabs?.subTitle1}
                                {savingCardIndex?.includes(index) ? (
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
                              {/* )} */}
                            </h3>
                            {savingCardIndex?.includes(index) && (
                              <div aria-labelledby='accordion-flush-heading-1'>
                                <div className='grid grid-cols-4 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>
                                  <CommonFeaturesComp title='ACCOUNT' commonFeaturesData={allListdata} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {(allListdata?.atm_with_limit_fpm ||
                          allListdata?.debit_card_spend_limit ||
                          allListdata?.card_rep_fee ||
                          allListdata?.international_usag) && (
                          <div className={`rounded-2xl relative  bg-white duration-300 px-6 py-[7px]`}>
                            <h3 id='accordion-flush-heading-1  '>
                              <button
                                id={`${index}+'id-bank'`}
                                onClick={() => handleAccordionDebit(index)}
                                type='button'
                                className='text-[#212529] list-none font-semibold gap-[16px] relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center max-sm:justify-between w-full text-left'
                                data-accordion-target='#accordion-flush-body-1'
                                aria-expanded='true'
                                aria-controls='accordion-flush-body-1'>
                                {mockData?.other?.debit}
                                {debitCardIndex?.includes(index) ? (
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

                            {debitCardIndex?.includes(index) && (
                              <div aria-labelledby='accordion-flush-heading-1'>
                                <div className='grid grid-cols-4 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>
                                  <CommonFeaturesComp title='DEBIT' commonFeaturesData={allListdata} />
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
                    <div className='grid 2xl:grid-cols-4 xl:mt-8 xl:gap-2 xl:grid-cols-3 xl:gap-4 lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:mt-0 grid-cols-1 md:gap-8 sm:mt-4  sm:gap-[30px] gap-4 mt-4 max-[479px]:mt-0 lg:px-16 max-[479px]:gap-[35px] mb-[30px]'>
                      <div key={index}>
                        <div className='bg-white  rounded-3xl   h-full  filter-card-box duration-300 mt-[10px]'>
                          {allListdata?.best_of && (
                            <div className='relative left-0 top-0 pb-[15px]'>
                              <div className='regular-box-card flex items-center justify-center rounded-tl-3xl rounded-br-3xl'>
                                <p className='uppercase text-white'>{allListdata?.best_of}</p>
                              </div>
                            </div>
                          )}
                          <div className='flex gap-3 !px-6 max-[768px]:!px-4 max-[280px]:!px-2 py-2'>
                            <div className=''>
                              <div className='py-2' onClick={() => sendGAProductClick(index, allListdata)}>
                                <Link href={`/${allListdata?.url_slug}`} prefetch={false}>
                                  <Image
                                    id={`${index}+'bank=11-img'`}
                                    src={`${Img_URL}/${allListdata?.product_image}`}
                                    alt='card image'
                                    width={120}
                                    height={100}
                                    // className='w-full h-auto mx-auto'
                                    unoptimized={true}
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className=' xl:w-[100%] '>
                              <div className=' grid grid-cols-1'>
                                <div className='text-[#212529]'>
                                  <div onClick={() => sendGAProductClick(index, allListdata)}>
                                    <Link href={`/${allListdata?.url_slug}`} prefetch={false}>
                                      <h2
                                        id={`${index}+'bank-btn'`}
                                        className='text-[20px] whitespace-nowrap overflow-ellipsis overflow-hidden max-[425px]:text-[15px] font-bold max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'
                                        data-tooltip-target='tooltip-light'
                                        data-tooltip-style='light'
                                        data-te-toggle='tooltip'
                                        // title={`${allListdata?.card_name.replace(/["']/g, ' ')}`}
                                        title={`${
                                          allListdata?.card_name?.replace(/["']/g, ' ') ||
                                          allListdata?.title?.replace(/["']/g, ' ')
                                        }`}>
                                        {allListdata?.card_name || allListdata?.title}
                                      </h2>
                                    </Link>
                                  </div>

                                  <div className='flex items-center gap-2 mt-2 max-[360px]:gap-1'>
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
                                        {allListdata?.rating}/5
                                      </p>
                                      <div className=''>
                                        <ReactStars
                                          count={starCount}
                                          value={allListdata?.rating}
                                          size={14}
                                          edit={false}
                                          color1={'#ccc'}
                                          color2={'#49d49d'}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id='save-aply-btn+89' className='flex items-center gap-4 mt-4 px-4  max-[280px]:!px-2'>
                            <ApplyNowButton
                              data={allListdata}
                              userData={userData}
                              category={isSubCategoryFlow ? `bank ${url_slug}` : 'bank accounts'}
                              pos='27'
                              position={index}
                              disabled={allListdata?.bank_name === "KOTAK MAHINDRA BANK"}



                            />
                          </div>

                          <div className='py-5 px-4 max-[280px]:!px-2'>
                            <label className='text-gray-500 font-bold flex justify-center items-center'>
                              <input
                                className='mr-2 leading-tight  w-[16px] h-[16px]'
                                type='checkbox'
                                id={allListdata?.product_id}
                                disabled={
                                  size?.width <= 991
                                    ? selectedData?.length >= 2 && !selectedData?.includes(allListdata)
                                    : selectedData?.length >= 3 && !selectedData?.includes(allListdata)
                                }
                                onChange={(e) => {
                                  setCompareModal(true)
                                  handlecompareModal(e, allListdata)
                                }}
                                checked={selectedData?.some(
                                  (selectedItem) => selectedItem?.product_id === allListdata?.product_id
                                )}
                              />
                              <p className='text-[15px] font-semibold  text-[#212529] '>Add to compare</p>
                            </label>
                          </div>
                          <div className='mt-4 border-b border-[gray-100] '>
                            <div className='grid grid-cols-3 gap-0 max-md:grid-cols-2'>
                              <div className='p-6 text-[#212529] border border-[gray-100] border-l-0 '>
                                <p className='text-[13px] font-normal '>{'Interest Rate'}</p>
                                {allListdata?.rate_of_interest && (
                                  <p className='text-[15px] font-semibold pt-1 mt-0'>
                                    <span className='symbole-rupee'>{allListdata.rate_of_interest} %</span>
                                  </p>
                                )}
                              </div>
                              <div className=' p-6 text-[#212529] border border-[gray-100] border-l-0 border-r-0'>
                                <p className='text-[13px] font-normal'>Minimum Balance to Open A/c</p>
                                {allListdata?.min_bal_to_open_ac != null &&
                                  String(allListdata?.min_bal_to_open_ac)?.trim().length > 0 && (
                                    <div className='flex items-center gap-4'>
                                      <p className='text-[15px] font-semibold pt-1 mt-0 symbole-rupee'>
                                        ₹ {allListdata?.min_bal_to_open_ac}{' '}
                                      </p>
                                    </div>
                                  )}
                              </div>
                              <div className='px-6  pb-6 pt-6 h-full text-[#212529]  '>
                                <p className='text-[13px] font-normal'>Minimum monthly balance</p>
                                {allListdata?.avg_mon_bal != null &&
                                  String(allListdata?.avg_mon_bal)?.trim().length > 0 && (
                                    <div className='flex items-center gap-4'>
                                      <p className='text-[15px] font-semibold pt-1 mt-0 symbole-rupee'>
                                        ₹ {allListdata?.avg_mon_bal}{' '}
                                      </p>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div
                            id='accordionExample'
                            data-active-classes='bg-none'
                            data-inactive-classes='text-[#212529]'
                            className=''>
                            {(allListdata?.min_bal_to_open_ac ||
                              allListdata?.cashback_offer ||
                              allListdata?.avg_mon_bal ||
                              allListdata?.daily_txn_limit_online) && (
                              <div
                                className={`relative bg-white  duration-300 px-6 py-[7px] ${
                                  allListdata?.features ? '!border-b' : ''
                                }`}>
                                <h3 id='accordion-flush-heading-1  '>
                                  <button
                                    id={`${index}+'h3-bank'`}
                                    onClick={() => handleAccordionSaving(index)}
                                    type='button'
                                    className='text-[#212529]  list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                                    data-accordion-target='#accordion-flush-body-1'
                                    aria-expanded='true'
                                    aria-controls='accordion-flush-body-1'>
                                    {mockData?.serviceTabs?.subTitle1}
                                    {savingCardIndex?.includes(index) ? (
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
                                {savingCardIndex?.includes(index) && (
                                  <div aria-labelledby='accordion-flush-heading-1'>
                                    <div className='grid grid-cols-4 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>
                                      <CommonFeaturesComp title='ACCOUNT' commonFeaturesData={allListdata} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {(allListdata?.atm_with_limit_fpm ||
                              allListdata?.debit_card_spend_limit ||
                              allListdata?.card_rep_fee ||
                              allListdata?.international_usag) && (
                              <div className='rounded-2xl relative   bg-white  duration-300 px-6 py-[7px]'>
                                <h3 id='accordion-flush-heading-1  '>
                                  <button
                                    id={`${index}+'bank-all'`}
                                    onClick={() => handleAccordionDebit(index)}
                                    type='button'
                                    className='text-[#212529] list-none font-semibold relative text-[15px] max-[375px]:text-[15px] cursor-pointer faq-quation-title flex items-center justify-between w-full text-left'
                                    data-accordion-target='#accordion-flush-body-1'
                                    aria-expanded='true'
                                    aria-controls='accordion-flush-body-1'>
                                    Debit Card Facilities
                                    {debitCardIndex?.includes(index) ? (
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
                                {debitCardIndex?.includes(index) && (
                                  <div aria-labelledby='accordion-flush-heading-1'>
                                    <div className='grid grid-cols-4 py-4 gap-8 px-6 max-[771px]:grid-cols-2 '>
                                      <CommonFeaturesComp title='DEBIT' commonFeaturesData={allListdata} />
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
        {forTablet && mediumCardListing()}
        {addPagination && !isSubCategoryFlow && !isApplied && SavingCardListAll?.length !== 0 && (
          <div className='relative'>
            <div className='flex flex-end mt-1 absolute right-0 top-0 font-bold'>
              <PaginationData
                items={totalProducts}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AccountListRight
