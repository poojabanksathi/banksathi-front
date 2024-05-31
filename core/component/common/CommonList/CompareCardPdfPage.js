import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import downloadIcon from '../../../../public/assets/download.svg'
import logoSticky from '../../../../public/assets/logo-sticky.svg'

import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import { useReactToPrint } from 'react-to-print'
import ExplorePDfBanner from './ExplorePDfBanner'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { getCompareTitle } from '@/utils/util'

const CompareCardPdfPage = ({ slug1, slug2, slug3, link }) => {
  const size = useWindowSize()

  const isDesktop = size?.width > 768
  const targetRef = useRef(null)

  const router = useRouter()

  const starCount = 5

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  //desktop slug array
  const getSlugsArray = () => {
    let slugsArray = []
    if (slug1) {
      slugsArray.push(slug1)
    }
    if (slug2) {
      slugsArray.push(slug2)
    }
    if (slug3) {
      slugsArray.push(slug3)
    }
    return slugsArray
  }

  //mobile slug array
  const getMobileSlugsArray = () => {
    let slugsArray = []
    if (slug1) {
      slugsArray.push(slug1)
    }
    if (slug2) {
      slugsArray.push(slug2)
    }

    return slugsArray
  }

  useEffect(() => {
    getSlugsArray()
  }, [])

  const slugsArray = getSlugsArray()

  useEffect(() => {
    getMobileSlugsArray()
  }, [])
  const MobileSlugArray = getMobileSlugsArray()

  const tabBasis = size?.width > 577 && size?.width < 769
  const tablet = size?.width > 577 && size?.width < 769
  const printPage = useReactToPrint({
    content: () => targetRef?.current,
    documentTitle: 'compare-report'
  })

  const getMobileCompareCard = () => {
    return (
      <>
        <div className='bg-white rounded-xl'>
          <div className='grid grid-cols-2  '>
            {slug1 && (
              <div className='text-[#212529] p-3 pb-8 pt-10 basis-1/2 '>
                <div
                  className={`max-sm:w-auto px-2 max-sm:h-[100px] relative  min-[769px]:h-auto lg:h-[144px]     flex justify-center bg-white rounded-lg py-2 `}>
                  <Image
                    src={`${Img_URL}/${slug1?.product_details?.product_image}`}
                    id='2'
                    alt={`img`}
                    width={160}
                    height={90}
                    unoptimized={true}
                  />
                </div>
                <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px] h-[24px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                  {slug1?.product_details?.card_name}
                </div>
                <Link href={`${slug1?.product_details?.card_name}`} prefetch={false}>
                  {slug1?.product_details?.rating === 0 ? (
                    'NA'
                  ) : (
                    <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                      <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                        {slug1?.product_details?.rating}
                      </p>
                      <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                        <ReactStars
                          count={starCount}
                          size={16}
                          value={slug1?.product_details?.rating}
                          edit={false}
                          color1={'#ccc'}
                          color2={'#49d49d'}
                        />
                      </div>
                    </div>
                  )}
                </Link>
                <div className='flex items-center justify-center gap-1.5'></div>
                <div id='comp-aply-btn' className='text-center mt-2'>
                  <Link href={`/${slug1?.product_details.apply_url}`}>
                    <button
                      id={`'apply+detail+ 1'`}
                      //
                      onClick={() => router?.push(`/${slug1?.product_details.apply_url}`)}
                      className={`text-[#212529] px-4 cursor-pointer business-right-text py-4 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] `}>
                      {ListingfilterData.apllynow}
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {slug2 && (
              <div className='text-[#212529] p-3 pb-8 pt-10 basis-1/2 '>
                <div
                  className={`max-sm:w-auto px-2 relative max-sm:h-[100px]  min-[769px]:h-auto lg:h-[144px]  flex justify-center bg-white rounded-lg py-2  ${
                    size?.width === 768 ? '!w-[40vw] h-[100px] py-[10px]' : ''
                  }`}>
                  <Image
                    src={`${Img_URL}/${slug2?.product_details?.product_image}`}
                    id='2'
                    alt={`img`}
                    width={160}
                    height={90}
                    unoptimized={true}
                  />
                </div>
                <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px] h-[24px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                  {slug2?.product_details?.card_name}
                </div>
                <Link href={`${slug2?.product_details?.card_name}`} prefetch={false}>
                  {slug2?.product_details?.rating === 0 ? (
                    'NA'
                  ) : (
                    <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                      <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                        {slug2?.product_details?.rating}
                      </p>
                      <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                        <ReactStars
                          count={starCount}
                          size={16}
                          value={slug2?.product_details?.rating}
                          edit={false}
                          color1={'#ccc'}
                          color2={'#49d49d'}
                        />
                      </div>
                    </div>
                  )}
                </Link>
                <div className='flex items-center justify-center gap-1.5'></div>
                <div id='comp-2-aply-btn' className='text-center mt-2'>
                  <Link href={`/${slug2?.product_details.apply_url}`}>
                    <button
                      id={`'apply+detail+ 2'`}
                      //
                      onClick={() => router?.push(`/${slug2?.product_details.apply_url}`)}
                      className={`text-[#212529] px-4 cursor-pointer business-right-text py-4 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] `}>
                      {ListingfilterData.apllynow}
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Joining Fee{' '}
              </p>

              <div className='flex justify-between gap-2 items-center py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item) => {
                  return (
                    <>
                      {item?.product_details.joining_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <p className='symbole-rupee '>₹ {item?.product_details.joining_fee} /-</p>
                      )}
                    </>
                  )
                })}
              </div>
            </div>

            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Annual Fee{' '}
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item) => {
                  return (
                    <>
                      {item?.product_details.annual_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <p className='symbole-rupee '>₹ {item?.product_details.annual_fee} /-</p>
                      )}
                    </>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                APR{' '}
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return <p key={index}>{item?.product_details?.apr}</p>
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Rating{' '}
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item?.product_details?.rating}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Domestic Lounge access{' '}
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return <p key={index}>{item?.product_details?.lounge_access === '0' ? 'No' : 'Yes'}</p>
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Benefits{' '}
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      data-tooltip-target='tooltip-light'
                      data-tooltip-style='light'
                      data-te-toggle='tooltip'>
                      {' '}
                      {item?.product_details?.welcome_benefits &&
                        item?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}{' '}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Features{' '}
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  const features = item?.product_details?.features

                  if (features !== null) {
                    return (
                      <p
                        key={index}
                        className='flex basis-1/2 list-disc  space-y-2 product-list-data'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${features}</div>`
                        }}></p>
                    )
                  } else {
                    return <p key={index} className='flex basis-1/2'></p>
                  }
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Welcome Offer
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  const welcomeOffer = item?.product_details?.welcome_offer

                  // Check if the value is not null before rendering
                  if (welcomeOffer !== null) {
                    return (
                      <p
                        key={index}
                        className='flex basis-1/2 list-disc  space-y-2 product-list-data'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${welcomeOffer}</div>`
                        }}></p>
                    )
                  } else {
                    // If the value is null, return an empty td
                    return <p key={index} className='flex basis-1/2'></p>
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='bg-[#F4F8FB] '>
      <div
        className={` container min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full  pb-[80px] px-20 rounded-2xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7
    `}>
        <div className='flex justify-center py-4  items-center' onClick={() => printPage()}>
          <span className='w-[40px] h-[40px]  p-2  text-center cursor-pointer'>
            <Image src={downloadIcon} alt='download' width={40} height={40} />
          </span>
          <span className='text-[18px] cursor-pointer max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[11px]'>
            Print
          </span>
        </div>
        <div ref={targetRef}>
          <div className='flex justify-between max-sm:flex-col gap-4 items-center max-lg:items-center py-4 px-2'>
            <Image src={logoSticky} width={180} height={40} alt='logo' unoptimized={true} />

            {size?.width > 768 ? (
              <h2 className='text-[#212529] text-top items-top lg:pt-2 text-[18px] font-semibold leading-[30px] max-[425px]:text-2xl max-[320px]:text-lg  font-[Faktum]'>
                {getCompareTitle(slug1, slug2, slug3, 'Credit Cards')}
              </h2>
            ) : (
              <h2 className='text-[#212529] max-lg:text-center    font-semibold leading-[25px] text-[16px] max-[425px]:text-[15px] max-[320px]:[15px]  font-[Faktum]'>
                {getCompareTitle(slug1, slug2, {}, 'Credit Cards')}
              </h2>
            )}
          </div>

          {size?.width > 576 ? (
            <div className=''>
              <table className='border-collapse border-b-0 border-0 w-full bg-white rounded-xl   ...'>
                <thead className='flex'>
                  {size?.width > 768 ? (
                    <th className='basis-1/4 '>
                      <>
                        <div className='border-r px-5 h-full border-slate-200'>
                          <h2 className='px-6 font-[poppins] text-[13px] pt-10 font-semibold text-left uppercase'>
                            card details
                          </h2>
                        </div>
                      </>
                    </th>
                  ) : (
                    ''
                  )}
                  {slug1 && (
                    <th className={`${tabBasis ? 'basis-1/2' : 'basis-1/4'}`}>
                      <div className='text-[#212529]  border-r h-full border-slate-200'>
                        <div className='   px-5  pb-8 pt-10'>
                          <div
                            className={`max-sm:w-[40vw] relative max-sm:h-[100px] min-[769px]:h-auto lg:h-[144px]  flex justify-center bg-white rounded-lg  px-[10px] ${
                              tablet ? '!w-[40vw] h-[100px] py-[10px]' : ''
                            }`}>
                            <Image
                              src={`${Img_URL}/${slug1?.product_details?.product_image}`}
                              id='2'
                              alt={`img`}
                              width={isDesktop || tablet ? 160 : 50}
                              height={40}
                              unoptimized={true}
                              className='w-full h-full bg-cover rounded-lg'
                            />
                          </div>
                          <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                            {slug1?.product_details?.card_name}
                          </div>
                          <Link href={`${slug1?.product_details?.card_name}`} prefetch={false}>
                            {slug1?.product_details?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                                <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                                  {slug1?.product_details?.rating}
                                </p>
                                <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                                  <ReactStars
                                    count={starCount}
                                    size={16}
                                    value={slug1?.product_details?.rating}
                                    edit={false}
                                    color1={'#ccc'}
                                    color2={'#49d49d'}
                                  />
                                </div>
                              </div>
                            )}
                          </Link>
                          <div className='flex items-center justify-center gap-1.5'></div>
                          <div id='comp-3-aply-btn' className='text-center mt-2'>
                            <Link href={`/${slug1?.product_details.apply_url}`}>
                              <button
                                id={`'apply+detail+ 3'`}
                                onClick={() => router?.push(`/${slug1?.product_details.apply_url}`)}
                                className={`text-[#212529] px-4 cursor-pointer business-right-text py-4 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] `}>
                                {ListingfilterData.apllynow}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </th>
                  )}

                  {slug2 && (
                    <th className={`${tabBasis ? 'basis-1/2' : 'basis-1/4'}`}>
                      <div className={`text-[#212529]   ${tabBasis ? '' : 'border-r'} h-full  border-slate-200`}>
                        <div className='  px-5  pb-8 pt-10'>
                          <div
                            className={`max-sm:w-[40vw] relative max-sm:h-[100px]  min-[769px]:h-auto lg:h-[144px]     flex justify-center bg-white rounded-lg  px-[10px] ${
                              tablet ? '!w-[40vw] h-[100px] py-[10px]' : ''
                            }`}>
                            <Image
                              src={`${Img_URL}/${slug2?.product_details?.product_image}`}
                              id='2'
                              alt={`img`}
                              width={isDesktop || tablet ? 160 : 50}
                              height={40}
                              unoptimized={true}
                              className='w-full h-full bg-cover rounded-lg'
                            />
                          </div>
                          <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                            {slug2?.product_details?.card_name}
                          </div>
                          <Link href={`${slug2?.product_details?.card_name}`} prefetch={false}>
                            {slug2?.product_details?.rating === 0 ? (
                              'NA'
                            ) : (
                              <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                                <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                                  {slug2?.product_details?.rating}
                                </p>
                                <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                                  <ReactStars
                                    count={starCount}
                                    size={16}
                                    value={slug2?.product_details?.rating}
                                    edit={false}
                                    color1={'#ccc'}
                                    color2={'#49d49d'}
                                  />
                                </div>
                              </div>
                            )}
                          </Link>
                          <div className='flex items-center justify-center gap-1.5'></div>
                          <div id='comp-4-aply-btn' className='text-center mt-2'>
                            <Link href={`/${slug2?.product_details.apply_url}`}>
                              <button
                                id={`'apply+detail+ 5'`}
                                onClick={() => router?.push(`/${slug2?.product_details.apply_url}`)}
                                className={`text-[#212529] px-4 cursor-pointer business-right-text py-4 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] `}>
                                {ListingfilterData.apllynow}
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </th>
                  )}

                  {slug3 && isDesktop && (
                    <th className='basis-1/4'>
                      <div className='text-[#212529]   px-5 pb-8 pt-10 border-slate-200'>
                        <div
                          className={`max-sm:w-[40vw] relative max-sm:h-[100px] min-[769px]:h-auto lg:h-[144px]   flex justify-center bg-white rounded-lg   px-[10px]${
                            size?.width === 768 ? '!w-[40vw] h-[100px] py-[10px]' : ''
                          }`}>
                          <Image
                            src={`${Img_URL}/${slug3?.product_details?.product_image}`}
                            id='2'
                            alt={`img`}
                            width={isDesktop || size?.width === 768 ? 160 : 50}
                            height={40}
                            unoptimized={true}
                            className='w-full h-full bg-cover rounded-lg'
                          />
                        </div>
                        <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                          {slug3?.product_details?.card_name}
                        </div>
                        <Link href={`${slug3?.product_details?.card_name}`} prefetch={false}>
                          <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                            {slug3?.product_details?.rating ? (
                              <>
                                <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                                  {slug3?.product_details?.rating}
                                </p>
                                <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                                  <ReactStars
                                    count={starCount}
                                    size={16}
                                    value={slug3?.product_details?.rating}
                                    edit={false}
                                    color1={'#ccc'}
                                    color2={'#49d49d'}
                                  />
                                </div>
                              </>
                            ) : (
                              'NA'
                            )}
                          </div>
                        </Link>
                        <div className='flex items-center justify-center gap-1.5'></div>
                        <div id='comp-5-aply-btn' className='text-center mt-2'>
                          <Link href={`/${slug3?.product_details.apply_url}`}>
                            <button
                              id={'apply+detail+ 7'}
                              onClick={() => router?.push(`/${slug3?.product_details.apply_url}`)}
                              className={`text-[#212529] px-4 cursor-pointer business-right-text py-4 w-full lg:w-[160px] md:w-full rounded-lg  bg-[#49D49D] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px] `}>
                              {ListingfilterData.apllynow}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </th>
                  )}
                </thead>
                {size?.width > 768 ? (
                  <>
                    <tbody>
                      <tr className='flex'>
                        <td className='border  border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Joining Fee
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2
                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }  symbole-rupee border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              <>
                                {item?.product_details.joining_fee == 0 ? (
                                  <span>Free</span>
                                ) : (
                                  <span className='symbole-rupee'>₹ {item?.product_details.joining_fee} /-</span>
                                )}
                              </>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Annual Fee
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }  symbole-rupee border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              <>
                                {item?.product_details.annual_fee == 0 ? (
                                  <span>Free</span>
                                ) : (
                                  <span className='symbole-rupee'>₹ {item?.product_details.annual_fee} /-</span>
                                )}
                              </>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          APR
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              {item?.product_details?.apr}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Rating
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              {item?.product_details?.rating}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Domestic Lounge access
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              {item?.product_details?.lounge_access === '0' ? 'No' : 'Yes'}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Benefits
                        </td>

                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                              data-tooltip-target='tooltip-light'
                              data-tooltip-style='light'
                              data-te-toggle='tooltip'>
                              {item?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}{' '}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex '>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Features
                        </td>

                        {slugsArray?.map((item, index) => {
                          const features = item?.product_details?.features
                          const isLastTd = index === 2

                          // Check if the value is not null before rendering
                          if (features !== null) {
                            return (
                              <td
                                key={index}
                                className={` ${
                                  isLastTd ? 'border-r-0' : 'border-r'
                                }  list-disc  space-y-2 product-list-data border border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                                dangerouslySetInnerHTML={{
                                  __html: `<div>${features}</div>`
                                }}></td>
                            )
                          } else {
                            // If the value is null, render a td with borders but without any content
                            return (
                              <td
                                key={index}
                                className={` ${
                                  isLastTd ? 'border-r-0' : 'border-r'
                                }   border border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}></td>
                            )
                          }

                          // If the value is null, nothing will be rendered for that particular item
                        })}
                      </tr>
                      <tr className='flex '>
                        <td className='border border-l-0  border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Welcome Offer
                        </td>
                        {slugsArray?.map((item, index) => {
                          const welcomeOffer = item?.product_details?.welcome_offer
                          const isLastTd = index === 2

                          // Check if the value is not null before rendering
                          if (welcomeOffer !== null) {
                            return (
                              <td
                                key={index}
                                className={` ${
                                  isLastTd ? 'border-r-0' : 'border-r'
                                }  list-disc  space-y-2 product-list-data border border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                                dangerouslySetInnerHTML={{
                                  __html: `<div>${welcomeOffer}</div>`
                                }}></td>
                            )
                          } else {
                            // If the value is null, render a td with borders but without any content
                            return (
                              <td
                                key={index}
                                className={` ${
                                  isLastTd ? 'border-r-0' : 'border-r'
                                }   border border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}></td>
                            )
                          }
                        })}
                      </tr>
                    </tbody>
                  </>
                ) : (
                  <>
                    <tbody>
                      <tr className='flex border border-slate-200 border-l-0 border-r-0 '>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0
                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Joining Fee</p>
                              <p className='text-neutral-800  text-xs font-normal font-[poppins] symbole-rupee'>
                                {' '}
                                <>
                                  {item?.product_details.joining_fee == 0 ? (
                                    <span>Free</span>
                                  ) : (
                                    <span className='symbole-rupee'>₹ {item?.product_details.joining_fee} /-</span>
                                  )}
                                </>
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Annual Fee</p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins] symbole-rupee '>
                                <>
                                  {item?.product_details.annual_fee == 0 ? (
                                    <span>Free</span>
                                  ) : (
                                    <span className='symbole-rupee'>₹ {item?.product_details.annual_fee} /-</span>
                                  )}
                                </>
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>APR</p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins]'>
                                {item?.product_details?.apr}
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Rating</p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins]'>
                                {item?.product_details?.rating}
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>
                                Domestic Lounge access
                              </p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins]'>
                                {item?.product_details?.lounge_access === '0' ? 'No' : 'Yes'}
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td
                              className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`}
                              key={index}
                              data-tooltip-target='tooltip-light'
                              data-tooltip-style='light'
                              data-te-toggle='tooltip'>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Benefits</p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins]'>
                                {item?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}{' '}
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0
                          const features = item?.product_details?.features

                          if (features !== null) {
                            return (
                              <React.Fragment key={index}>
                                <td
                                  className={`basis-1/2 p-4 ${
                                    isFirstTd ? 'border-r border-slate-200' : ''
                                  } list-disc  space-y-2 product-list-data text-neutral-800 text-xs font-semibold font-[poppins]`}
                                  dangerouslySetInnerHTML={{
                                    __html: `<div className=''>
                      <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Features</p>
                      ${features}
                    </div>`
                                  }}></td>
                              </React.Fragment>
                            )
                          } else {
                            return (
                              <td
                                key={index}
                                className={`basis-1/2 p-4 ${
                                  isFirstTd ? 'border-r border-slate-200' : ''
                                } text-neutral-800 text-xs font-semibold font-[poppins]`}></td>
                            )
                          }
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-b-0 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const welcomeOffer = item?.product_details?.welcome_offer
                          const isFirstTd = index === 0

                          const content =
                            welcomeOffer !== null
                              ? `<div className='text-neutral-800 list-disc  space-y-2 product-list-data text-xs font-normal font-[poppins]'>
 <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Welcome Offer</p>
      ${welcomeOffer}
    </div>`
                              : ''

                          return (
                            <td
                              className={`basis-1/2 p-4 ${
                                isFirstTd ? 'border-r border-slate-200' : ''
                              } text-neutral-800 text-xs font-semibold font-[poppins]`}
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: content
                              }}></td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </>
                )}
              </table>
            </div>
          ) : (
            getMobileCompareCard()
          )}

          <div className='pt-[160px]'>
            <ExplorePDfBanner url={link} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareCardPdfPage
