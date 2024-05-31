import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import downloadIcon from '../../../../public/assets/download.svg'
import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
// import { Margin, usePDF } from 'react-to-pdf'
import { useReactToPrint } from 'react-to-print'
import ExplorePDfBanner from '../../common/CommonList/ExplorePDfBanner'
import logoSticky from '../../../../public/assets/logo-sticky.svg'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { getCompareTitle } from '@/utils/util'

const CompareBankPdfPage = ({ slug1, slug2, slug3, link }) => {
  const size = useWindowSize()

  const isDesktop = size?.width > 768
  const targetRef = useRef(null)

  const router = useRouter()

  const starCount = 5

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

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  useEffect(() => {
    getSlugsArray()
  }, [])

  const slugsArray = getSlugsArray()

  useEffect(() => {
    getMobileSlugsArray()
  }, [])
  const MobileSlugArray = getMobileSlugsArray()

  const tabBasis = size?.width > 577 && size?.width < 769

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
                  className={`max-sm:w-auto px-2 max-sm:h-[100px] relative  h-[144px]   flex justify-center bg-white rounded-lg py-2 `}>
                  <Image
                    src={`${Img_URL}/${slug1?.product_details?.product_image}`}
                    id='2'
                    alt={`img`}
                    width={180}
                    height={90}
                    unoptimized={true}
                  />
                </div>
                <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                  className={`max-sm:w-auto px-2 relative max-sm:h-[100px]  h-[144px]  flex justify-center bg-white rounded-lg py-2  ${
                    size?.width === 768 ? '!w-[40vw] h-[100px] py-[10px]' : ''
                  }`}>
                  <Image
                    src={`${Img_URL}/${slug2?.product_details?.product_image}`}
                    id='2'
                    alt={`img`}
                    width={180}
                    height={90}
                    unoptimized={true}
                  />
                </div>
                <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                      id={`'apply+detail+ 1'`}
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
            <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
              BANK FEATURES
            </h2>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                APR (%)
              </p>

              <div className='flex justify-between gap-2 items-center py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item) => {
                  return (
                    <>
                      {item?.product_details.rate_of_interest && (
                        <p className=''> {item?.product_details.rate_of_interest} </p>
                      )}
                    </>
                  )
                })}
              </div>
            </div>

            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Interest Credit Cycle
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item) => {
                  return (
                    <>
                      {item?.product_details.int_credit_cycle && (
                        <p className=''> {item?.product_details.int_credit_cycle} </p>
                      )}
                    </>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Minimum Balance to Open Account
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p key={index} className='symbole-rupee'>
                      ₹ {item?.product_details?.min_bal_to_open_ac}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Average Monthly/Quarterly Balance
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p className='symbole-rupee'>₹ {item?.product_details?.avg_mon_bal}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Welcome Offer
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className='flex basis-1/2 list-disc  space-y-2 product-list-data'
                      dangerouslySetInnerHTML={{
                        __html: `<div>${
                          item?.product_details?.welcome_offer && item?.product_details?.welcome_offer
                        }</div>`
                      }}></p>
                  )
                })}
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
              DEBIT CARD FEATURES
            </h2>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Insurance Coverage
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className='flex basis-1/2'
                      dangerouslySetInnerHTML={{
                        __html: `<div className=''>${
                          item?.product_details?.ins_cov && item?.product_details?.ins_cov
                        }</div>`
                      }}></p>
                  )
                })}
              </div>
            </div>

            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                International Usage
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item) => {
                  return (
                    <>
                      {item?.product_details?.international_usag && (
                        <p className=''> {item?.product_details?.international_usag} </p>
                      )}
                    </>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center  py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                ATM Withdrawals (Free per month)
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return <p key={index}>{item?.product_details?.atm_with_limit_fpm}</p>
                })}
              </div>
            </div>

            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Zero Liability Protection
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className='flex basis-1/2'
                      dangerouslySetInnerHTML={{
                        __html: `<div>${
                          item?.product_details?.zero_lib_protection && item?.product_details?.zero_lib_protection
                        }</div>`
                      }}></p>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Card Replacement Fee
              </p>

              <div className='flex justify-between items-center gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item?.product_details?.card_rep_fee}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Personal Accidental Insurance Cover
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className='flex basis-1/2'
                      dangerouslySetInnerHTML={{
                        __html: `<div>${
                          item?.product_details?.personal_acci_cover && item?.product_details?.personal_acci_cover
                        }</div>`
                      }}></p>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col px-4 border-t border-b border-slate-200'>
              <p className='text-center justify-center py-2  text-neutral-800 text-xs font-semibold font-[poppins]'>
                Air Accidental Insurance Cover
              </p>

              <div className='flex justify-between items-baseline gap-2 py-2  text-neutral-800 text-xs font-normal font-[poppins]'>
                {MobileSlugArray?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className='flex basis-1/2'
                      dangerouslySetInnerHTML={{
                        __html: `<div>${
                          item?.product_details?.air_acc_ins_cover && item?.product_details?.air_acc_ins_cover
                        }</div>`
                      }}></p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  const tablet = size?.width > 577 && size?.width < 769
  return (
    <div className='bg-[#F4F8FB] '>
      <div
        className={`container  min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-[34px] pb-[30px] px-20 rounded-2xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7
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
          <div className='flex justify-between max-sm:flex-col gap-4 items-baseline max-lg:items-center py-4 px-2'>
            <Image src={logoSticky} width={180} height={40} alt='image' unoptimized={true} />

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
                          <h2 className='px-6 font-[poppins] text-[13px] pt-10 font-semibold'>Bank Name</h2>
                        </div>
                      </>
                    </th>
                  ) : (
                    ''
                  )}
                  {slug1 && (
                    <th className={`${tabBasis ? 'basis-1/2' : 'basis-1/4'}`}>
                      <div className='text-[#212529]  border-r  border-slate-200'>
                        <div className='   px-5  pb-8 pt-10'>
                          <div
                            className={`max-sm:w-[40vw] relative max-sm:h-[100px]  h-auto  flex justify-center bg-white rounded-lg  px-[10px] ${
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
                          <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                                id={`'apply+detail+ 1'`}
                                //
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
                      <div className={`text-[#212529]   ${tabBasis ? '' : 'border-r'}  border-slate-200`}>
                        <div className='  px-5  pb-8 pt-10'>
                          <div
                            className={`max-sm:w-[40vw] relative max-sm:h-[100px]  h-auto  flex justify-center bg-white rounded-lg  px-[10px] ${
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
                          <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                                id={`'apply+detail+ 1'`}
                                //
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
                        {/* <div className='px-5 pb-8 pt-10 '> */}
                        <div
                          className={`max-sm:w-[40vw] relative max-sm:h-[100px] h-auto  flex justify-center bg-white rounded-lg px-[10px]  ${
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
                        <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                              id={`'apply+detail+ 1'`}
                              //
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
                    <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
                      BANK FEATURES
                    </h2>

                    <tbody>
                      <tr className='flex'>
                        <td className='border  border-l-0 border-t-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Best for Category
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2
                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border border-t-0  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              <>
                                {item?.product_details?.best_of && (
                                  <p className=''> {item?.product_details?.best_of} </p>
                                )}
                              </>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border  border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          APR (%)
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2
                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              <>
                                {item?.product_details?.rate_of_interest && (
                                  <p className=''> {item?.product_details?.rate_of_interest} </p>
                                )}
                              </>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Interest Credit Cycle
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border   border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              <>
                                {item?.product_details?.int_credit_cycle && (
                                  <span className=''> {item?.product_details?.int_credit_cycle} </span>
                                )}
                              </>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Minimum Balance to Open Account
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border symbole-rupee  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              ₹ {item?.product_details?.min_bal_to_open_ac}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Average Monthly/Quarterly Balance
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              } symbole-rupee  border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              ₹ {item?.product_details?.avg_mon_bal}
                            </td>
                          )
                        })}
                      </tr>

                      <tr className='flex '>
                        <td className='border border-l-0  border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Welcome Offer
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              } list-disc  space-y-2 product-list-data   border border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                              dangerouslySetInnerHTML={{
                                __html: `<div>${
                                  item?.product_details?.welcome_offer && item?.product_details?.welcome_offer
                                }</div>`
                              }}></td>
                          )
                        })}
                      </tr>
                    </tbody>
                    <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
                      DEBIT CARD FEATURES
                    </h2>

                    <tbody>
                      <tr className='flex'>
                        <td className='border  border-t-0 border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Insurance Coverage
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2
                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border border-t-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                              dangerouslySetInnerHTML={{
                                __html: `<div>${item?.product_details?.ins_cov && item?.product_details?.ins_cov}</div>`
                              }}></td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          International Usage
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              <>
                                {item?.product_details?.international_usag && (
                                  <p className=''> {item?.product_details?.international_usag} </p>
                                )}
                              </>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          ATM Withdrawals (Free per month)
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              {item?.product_details?.atm_with_limit_fpm}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex'>
                        <td className='border border-l-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Zero Liability Protection
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border  border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                              dangerouslySetInnerHTML={{
                                __html: `<div>${
                                  item?.product_details?.zero_lib_protection &&
                                  item?.product_details?.zero_lib_protection
                                }</div>`
                              }}></td>
                          )
                        })}
                      </tr>

                      <tr className='flex '>
                        <td className='border border-l-0  border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Card Replacement Fee
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}>
                              {item?.product_details?.card_rep_fee}
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex '>
                        <td className='border border-l-0  border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Personal Accidental Insurance Cover
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                              dangerouslySetInnerHTML={{
                                __html: item?.product_details?.personal_acci_cover
                                  ? item?.product_details?.personal_acci_cover
                                  : ''
                              }}></td>
                          )
                        })}
                      </tr>
                      <tr className='flex '>
                        <td className='border border-l-0  border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-semibold font-[poppins]'>
                          Air Accidental Insurance Cover
                        </td>
                        {slugsArray?.map((item, index) => {
                          const isLastTd = index === 2

                          return (
                            <td
                              key={index}
                              className={` ${
                                isLastTd ? 'border-r-0' : 'border-r'
                              }   border border-b-0 border-slate-200 basis-1/4 p-4 text-neutral-800 text-[13px] font-normal font-[poppins]`}
                              dangerouslySetInnerHTML={{
                                __html: item?.product_details?.air_acc_ins_cover
                                  ? item?.product_details?.air_acc_ins_cover
                                  : ''
                              }}></td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </>
                ) : (
                  <>
                    <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
                      BANK FEATURES
                    </h2>

                    <tbody>
                      <tr className='flex border border-slate-200 border-l-0 border-r-0 '>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0
                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>APR (%)</p>
                              {item?.product_details?.rate_of_interest && (
                                <p className='text-neutral-800  text-xs font-normal font-[poppins] '>
                                  {item?.product_details?.rate_of_interest}
                                </p>
                              )}
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
                                Interest Credit Cycle
                              </p>
                              {item?.product_details?.int_credit_cycle && (
                                <p className='text-neutral-800 text-xs font-normal font-[poppins] symbole-rupee '>
                                  {item?.product_details?.int_credit_cycle}
                                </p>
                              )}
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
                                Minimum Balance to Open Account
                              </p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins] symbole-rupee'>
                                ₹ {item?.product_details?.min_bal_to_open_ac}
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
                                Average Monthly/Quarterly Balance
                              </p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins] symbole-rupee'>
                                ₹ {item?.product_details?.avg_mon_bal}
                              </p>
                            </td>
                          )
                        })}
                      </tr>

                      <tr className='flex  border border-slate-200 border-b-0 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td
                              className={`basis-1/2 p-4 ${
                                isFirstTd ? 'border-r border-slate-200' : ''
                              } list-disc  space-y-2 product-list-data text-neutral-800 text-xs font-semibold font-[poppins]`}
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: `<div className='text-neutral-800 text-xs font-normal font-[poppins]'>
                          <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Welcome Offer</p>
                          ${item?.product_details?.welcome_offer && item?.product_details?.welcome_offer}</div>`
                              }}></td>
                          )
                        })}
                      </tr>
                    </tbody>
                    <h2 className='text-neutral-800 pl-[24px]  bg-slate-50 text-[15px] font-semibold font-[Poppins] uppercase max-sm:text-center max-sm:text-[12px]'>
                      DEBIT CARD FEATURES
                    </h2>

                    <tbody>
                      <tr className='flex border border-slate-200 border-l-0 border-r-0 '>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0
                          return (
                            <td
                              className={`basis-1/2 p-4 ${
                                isFirstTd ? 'border-r border-slate-200' : ''
                              } text-neutral-800 text-xs font-semibold font-[poppins]`}
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: `<div className='text-neutral-800 text-xs font-normal font-[poppins]'>
                          <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>Insurance Coverage</p>
                          ${item?.product_details?.ins_cov && item?.product_details?.ins_cov}</div>`
                              }}></td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>
                                International Usage
                              </p>
                              {item?.product_details?.international_usag && (
                                <p className='text-neutral-800 text-xs font-normal font-[poppins]  '>
                                  {item?.product_details?.international_usag}
                                </p>
                              )}
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
                                Minimum Balance to Open Account
                              </p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins] symbol-rupee'>
                                ₹ {item?.product_details?.min_bal_to_open_ac}
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
                                ATM Withdrawals (Free per month)
                              </p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins]'>
                                {item?.product_details?.atm_with_limit_fpm}
                              </p>
                            </td>
                          )
                        })}
                      </tr>

                      <tr className='flex  border border-slate-200 border-b-0 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td
                              className={`basis-1/2 p-4 ${
                                isFirstTd ? 'border-r border-slate-200' : ''
                              } text-neutral-800 text-xs font-semibold font-[poppins]`}
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: `<div className='text-neutral-800 text-xs font-normal font-[poppins]'>
                          <p className='text-neutral-800 text-xs font-semibold font-[poppins]'> Zero Liability Protection</p>
                          ${
                            item?.product_details?.zero_lib_protection && item?.product_details?.zero_lib_protection
                          }</div>`
                              }}></td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td className={`basis-1/2 p-4 ${isFirstTd ? 'border-r border-slate-200' : ''}`} key={index}>
                              <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>
                                Card Replacement Fee
                              </p>
                              <p className='text-neutral-800 text-xs font-normal font-[poppins]'>
                                {item?.product_details?.card_rep_fee}
                              </p>
                            </td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-b-0 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td
                              className={`basis-1/2 p-4 ${
                                isFirstTd ? 'border-r border-slate-200' : ''
                              } text-neutral-800 text-xs font-semibold font-[poppins]`}
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: `<div className='text-neutral-800 text-xs font-normal font-[poppins]'>
                          <p className='text-neutral-800 text-xs font-semibold font-[poppins]'> Personal Accidental Insurance Cover</p>
                          ${
                            item?.product_details?.personal_acci_cover && item?.product_details?.personal_acci_cover
                          }</div>`
                              }}></td>
                          )
                        })}
                      </tr>
                      <tr className='flex  border border-slate-200 border-b-0 border-l-0 border-r-0'>
                        {MobileSlugArray?.map((item, index) => {
                          const isFirstTd = index === 0

                          return (
                            <td
                              className={`basis-1/2 p-4 ${
                                isFirstTd ? 'border-r border-slate-200' : ''
                              } text-neutral-800 text-xs font-semibold font-[poppins]`}
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: `<div className='text-neutral-800 text-xs font-normal font-[poppins]'>
                          <p className='text-neutral-800 text-xs font-semibold font-[poppins]'> Air Accidental Insurance Cover</p>
                          ${item?.product_details?.air_acc_ins_cover && item?.product_details?.air_acc_ins_cover}</div>`
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

export default CompareBankPdfPage
