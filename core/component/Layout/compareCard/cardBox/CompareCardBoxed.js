import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import closeicon from '../../../../../public/assets/closeIcon.svg'
import plusIcon from '../../../../../public/assets/plus.svg'

import ReactStars from 'react-stars'

import { CompareCardBoxData, ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { useRouter } from 'next/router'
import { useWindowSize } from '@/hooks/useWindowSize'

function CompareCardBoxed({ slug1, slug2, slug3, productcomparedata }) {
  const [isActive, setIsactive] = useState(false)

  const [addCardDrop, setAddCardDrop] = useState(false)
  const [slugUrlData, setSlugUrlData] = useState()

  const size = useWindowSize()
  const dropdownRef = useRef(null)
  const starCount = 5
  const handleshowdrop = () => {
    setAddCardDrop(!addCardDrop)
  }

  const router = useRouter()

  const { query } = useRouter()

  const handleReplace = (slug1) => {
    const slugurlreplace = slug1?.product_details?.url_slug?.split('/')
    if (query.slug?.length > 1) {
      const updatedParams = query['slug'].filter((param) => param !== slugurlreplace[2], query.slug)
      const updatedQuery = {
        ...query,
        ['slug']: updatedParams
      }
      router.push({
        pathname: router.pathname,
        query: updatedQuery
      })
    } else {
      delete query.slug[slugurlreplace[2]]
      router.push(`/credit-cards/compare/none`)
    }
  }

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const handleDelete = (_id) => {
    const data = query?.slug
    delete router.query[_id]
    if (!query?.slug?.length) {
      router.push(`/credit-cards/compare/none`)
    }
  }
  function handleClick(slug_add) {
    setSlugUrlData(slug_add)
    const data = query?.slug
    const newSlug = slug_add
    if (data.length) {
      const slug1 = data[0]
      const slug2 = data[1]
      const slug3 = data[2] == undefined || !data[2] ? newSlug : data[2]
      if (query?.slug[0] === 'none' && slug1 === 'none') {
        router.push(`/credit-cards/compare/${newSlug}`, `/credit-cards/compare/${newSlug}`, undefined, {
          scroll: false
        })
      } else if (slug1 && !slug2 && !slug3) {
        router.push(
          `/credit-cards/compare/${slug1}/${newSlug}`,
          `/credit-cards/compare/${slug1}/${newSlug}`,
          undefined,
          {
            scroll: false
          }
        )
      } else if (slug1 && !slug2 && slug2 === undefined) {
        router.push(
          `/credit-cards/compare/${slug1}/${newSlug}`,
          `/credit-cards/compare/${slug1}/${newSlug}`,
          undefined,
          {
            scroll: false
          }
        )
      } else if (slug1 && slug2 && slug3) {
        router.push(
          `/credit-cards/compare/${slug1}/${slug2}/${slug3}`,
          `/credit-cards/compare/${slug1}/${slug2}/${slug3}`,
          undefined,
          { scroll: false }
        )
      } else if (query?.slug[0] === 'none' || slug1 === 'none') {
        router.push(`/credit-cards/compare/${newSlug}`, `/credit-cards/compare/${newSlug}`, undefined, {
          scroll: false
        })
      }
    } else {
      router.push(`/credit-cards/compare/none`)
    }
  }
  useEffect(() => {
    const handleDropDownMenu = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsactive(false)
      }
      document.addEventListener('click', handleDropDownMenu)
      return () => {
        document.removeEventListener('click', handleDropDownMenu)
      }
    }
    handleDropDownMenu()
  }, [isActive || addCardDrop])

  const slugurl = productcomparedata?.product_list?.url_slug?.split('/')[2]
  return (
    <>
      <div className='flex justify-center mb-7'>
        <h2 className='text-[#212529] text-[46px] font-semibold leading-[64.4px] max-[425px]:text-2xl font-[Faktum]'>
          Compare Cards
        </h2>
      </div>
      <div className='py-10 rounded-3xl bg-white max-[479px]:py-0'>
        <div className='w-full  m-auto pt-6 max-[576px]:pt-0'>
          <div className='grid grid-cols-3 max-[1024px]:grid-cols-3 max-[834px]:grid-cols-2 max-[576px]:grid-cols-2 max-[479px]:grid-cols-2 '>
            {slug1 && (
              <div className='text-[#212529]'>
                <div className='border-b border-[#E6ECF1] p-4 pt-0 pb-8 max-[576px]:pt-10'>
                  <div className='w-[270px] h-[160px] mx-auto relative max-[576px]:w-full max-[576px]:h-auto'>
                    <Image
                      src={`${Img_URL}/${slug1?.product_details?.product_image}`}
                      alt={`img`}
                      width={270}
                      height={160}
                      className='md:w-[270px] h-full sm:w-[120px] max-[375px]:w-full mb-6 m-auto'
                      unoptimized={true}
                    />
                    <button
                      className='flex absolute cursor-pointer right-[-10px] top-[-12px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
                      onClick={() => handleReplace(slug1)}>
                      <Image
                        src={closeicon}
                        className='w-[15px] max-xs:w-[13px] h-auto'
                        onClick={() => handleDelete(slug1)}
                        width={15}
                        height={15}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                  </div>
                  <p className='mt-4 text-center text-[18px] font-bold max-[576px]:text-[15px] toprecome-card-text max-[479px]:mt-0'>
                    {slug1?.product_details?.card_name}
                  </p>
                  <Link href={`${slug1?.product_details?.card_name}`} prefetch={false}>
                    {slug1?.product_details?.rating === 0 ? (
                      'NA'
                    ) : (
                      <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2'>
                        <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[15px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                          {slug1?.product_details?.rating}/5
                        </p>
                        <div className='flex  justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                          <ReactStars
                            count={starCount}
                            size={24}
                            value={slug1?.product_details?.rating}
                            edit={false}
                            color1={'#ccc'}
                            color2={'#49d49d'}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className='flex items-center justify-center gap-1.5'>
                    <p className='mt-2 text-[15px] text-center mb-2 text-[#212529] font-normal leading-[21px]'>
                      {CompareCardBoxData.creditscore} : {slug1?.product_details?.min_credit_score}-
                      {slug1?.product_details?.max_credit_score}{' '}
                    </p>
                    <div className='tooltip compare-tool'>
                      <Image src={ListingfilterData?.helpimg} className='w-5 h-5' alt='img' width={20} height={20} />
                      <span className='tooltiptext'>
                        Having a credit score within or above the recommended range increases your likelihood of
                        approval for various financial applications, but it does not provide an absolute guarantee.
                      </span>
                    </div>
                  </div>
                  <div className='text-center mt-2'>
                    {/* <Link href={`/${slug1?.product_details?.apply_url}`} prefetch={false}> */}
                      <button onClick={()=>router.push(`/${slug1?.product_details?.apply_url}`)} className=' py-3 cursor-pointer w-full lg:w-[275px] md:w-full rounded-lg text-white bg-[#49D49D] font-semibold '>
                        {CompareCardBoxData.apllynow}
                      </button>
                    {/* </Link> */}
                  </div>
                </div>

                <div className=' border-[#E6ECF1] py-4 px-12 border-b  max-[771px]:gap-20 max-[576px]:gap-12 max-[479px]:gap-20 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.joiningfees}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug1?.product_details.joining_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {slug1?.product_details.joining_fee} /-</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4 '>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.fees}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug1?.product_details.annual_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {slug1?.product_details.annual_fee} /-</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.apr}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>{slug1?.product_details?.apr}</p>
                  </div>
                </div>
                {slug1?.product_details?.rating === 0 ? (
                  'NA'
                ) : (
                  <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                    <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                      {CompareCardBoxData.ratingtitle}
                    </p>
                    <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                      <ReactStars
                        count={starCount}
                        size={24}
                        value={slug1?.product_details?.rating}
                        edit={false}
                        color1={'#ccc'}
                        color2={'#49d49d'}
                      />
                    </div>
                  </div>
                )}
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.loungeaccess}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug1?.product_details?.lounge_access === '0' ? 'No' : 'Yes'}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.benefits}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p
                      className='text-[15px] font-normal'
                      data-tooltip-target='tooltip-light'
                      data-tooltip-style='light'
                      data-te-toggle='tooltip'
                      title={`${slug1?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                      {slug1?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}
                    </p>
                  </div>
                </div>
                <div className='border-[#D8D9DA] border-b py-4 px-12 max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.future}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <div className='mt-4'>
                      <div
                        className='list-disc space-y-2 text-[14px] text-[#545454] mobile-future product-list-data compare-card'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${slug1?.product_details?.features}</div>`
                        }}></div>
                    </div>
                  </div>
                </div>
                <div className=' py-4 px-12 max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData?.welcomeoffer}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <div className='mt-4'>
                      <div
                        className='list-disc space-y-2 text-[14px] text-[#545454] mobile-future product-list-data compare-card'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${slug1?.product_details?.welcome_offer}</div>`
                        }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {slug2 && (
              <div className='text-[#212529]'>
                <div className='border-b border-[#E6ECF1] p-4 pt-0 pb-8 max-[576px]:pt-10'>
                  <div className='w-[270px] h-[160px] mx-auto relative max-[576px]:w-full max-[576px]:h-auto'>
                    <Image
                      src={`${Img_URL}/${slug2?.product_details?.product_image}`}
                      alt={`img`}
                      width={270}
                      height={160}
                      className='md:w-[270px] h-full sm:w-[120px] max-[375px]:w-full mb-6 m-auto'
                      unoptimized={true}
                    />
                    <button
                      className='flex absolute right-[-10px] cursor-pointer top-[-12px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
                      onClick={() => handleReplace(slug2)}>
                      <Image
                        src={closeicon}
                        className='w-[15px] max-xs:w-[13px] h-auto'
                        onClick={() => handleDelete(slug2)}
                        width={15}
                        height={15}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                  </div>
                  <p className='mt-4 text-center text-[18px] font-bold max-[576px]:text-[15px] toprecome-card-text max-[479px]:mt-0'>
                    {slug2?.product_details?.card_name}
                  </p>
                  <Link href={`${slug2?.product_details?.card_name}`} prefetch={false}>
                    {slug2?.product_details?.rating === 0 ? (
                      'NA'
                    ) : (
                      <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2'>
                        <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[15px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                          {slug2?.product_details?.rating}/5
                        </p>
                        <div className='flex  justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                          <ReactStars
                            count={starCount}
                            size={24}
                            value={slug2?.product_details?.rating}
                            edit={false}
                            color1={'#ccc'}
                            color2={'#49d49d'}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className='flex items-center justify-center gap-1.5'>
                    <p className='mt-2 text-[15px] text-center mb-2 text-[#212529] font-normal leading-[21px]'>
                      {CompareCardBoxData.creditscore} : {slug2?.product_details?.min_credit_score}-
                      {slug2?.product_details?.max_credit_score}{' '}
                    </p>
                    <div className='tooltip compare-tool'>
                      <Image src={ListingfilterData?.helpimg} className='w-5 h-5' alt='img' width={20} height={20} />
                      <span className='tooltiptext'>
                        Having a credit score within or above the recommended range increases your likelihood of
                        approval for various financial applications, but it does not provide an absolute guarantee.
                      </span>
                    </div>
                  </div>
                  <div className='text-center mt-2'>
                      <button onClick={()=>router.push(`/${slug2?.product_details?.apply_url}`)} className=' py-3 cursor-pointer w-full lg:w-[275px] md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                        {CompareCardBoxData.apllynow}
                      </button>
                  </div>
                </div>

                <div className=' border-[#E6ECF1] py-4 px-12 border-b  max-[771px]:gap-20 max-[576px]:gap-12 max-[479px]:gap-20 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.joiningfees}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    
                    <p className='text-[15px] font-normal'>
                      {slug2?.product_details.joining_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {slug2?.product_details.joining_fee} /-</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.fees}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug2?.product_details.annual_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {slug2?.product_details.annual_fee} /-</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.apr}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>{slug2?.product_details?.apr}</p>
                  </div>
                </div>
                {slug2?.product_details?.rating === 0 ? (
                  'NA'
                ) : (
                  <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                    <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                      {CompareCardBoxData.ratingtitle}
                    </p>
                    <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                      <ReactStars
                        count={starCount}
                        size={24}
                        value={slug2?.product_details?.rating}
                        edit={false}
                        color1={'#ccc'}
                        color2={'#49d49d'}
                      />
                    </div>
                  </div>
                )}
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.loungeaccess}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug2?.product_details?.lounge_access === '0' ? 'No' : 'Yes'}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.benefits}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p
                      className='text-[15px] font-normal'
                      data-tooltip-target='tooltip-light'
                      data-tooltip-style='light'
                      data-te-toggle='tooltip'
                      title={`${slug2?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                      {slug2?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}
                    </p>
                  </div>
                </div>
                <div className=' border-[#D8D9DA] border-b py-4 px-12 max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.future}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <div className='mt-4'>
                      <div
                        className='list-disc  space-y-2 text-[14px] text-[#545454] product-list-data compare-card'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${slug2?.product_details?.features}</div>`
                        }}></div>
                    </div>
                  </div>
                </div>
                <div className=' py-4 px-12 max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData?.welcomeoffer}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <div className='mt-4'>
                      <div
                        className='list-disc  space-y-2 text-[14px] text-[#545454] product-list-data compare-card'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${slug2?.product_details?.welcome_offer}</div>`
                        }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {slug3 && (
              <div className='text-[#212529] '>
                <div className='border-b border-[#E6ECF1] p-4 pt-0 pb-8 max-[576px]:pt-10'>
                  <div className='w-[270px] h-[160px] mx-auto relative max-[576px]:w-full max-[576px]:h-auto'>
                    <Image
                      src={`${Img_URL}/${slug3?.product_details?.product_image}`}
                      alt={`img`}
                      width={270}
                      height={160}
                      className='md:w-[270px] h-full sm:w-[120px] max-[375px]:w-full mb-6 m-auto'
                      unoptimized={true}
                    />
                    <button
                      className='flex absolute cursor-pointer right-[-10px] top-[-12px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
                      onClick={() => handleReplace(slug3)}>
                      <Image
                        src={closeicon}
                        className='w-[15px] max-xs:w-[13px] h-auto'
                        onClick={() => handleDelete(slug3)}
                        width={15}
                        height={15}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                  </div>
                  <p className='mt-4 text-center text-[18px] font-bold max-[576px]:text-[15px] toprecome-card-text max-[479px]:mt-0'>
                    {slug3?.product_details?.card_name}
                  </p>
                  <Link href={`${slug3?.product_details?.card_name}`} prefetch={false}>
                    {slug3?.product_details?.rating === 0 ? (
                      'NA'
                    ) : (
                      <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2'>
                        <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[15px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                          {slug3?.product_details?.rating}/5
                        </p>
                        <div className='flex  justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                          <ReactStars
                            count={starCount}
                            size={24}
                            value={slug3?.product_details?.rating}
                            edit={false}
                            color1={'#ccc'}
                            color2={'#49d49d'}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className='flex items-center justify-center gap-1.5'>
                    <p className='mt-2 text-[15px] text-center mb-2 text-[#212529] font-normal leading-[21px]'>
                      {CompareCardBoxData.creditscore} : {slug3?.product_details?.min_credit_score}-
                      {slug3?.product_details?.max_credit_score}{' '}
                    </p>
                    <div className='tooltip compare-tool  '>
                      <Image src={ListingfilterData?.helpimg} className='w-5 h-5' alt='img' width={20} height={20} />
                      <span className='tooltiptext'>
                        Having a credit score within or above the recommended range increases your likelihood of
                        approval for various financial applications, but it does not provide an absolute guarantee.
                      </span>
                    </div>
                  </div>
                  <div className='text-center mt-2'>
                      <button onClick={()=>router.push(`/${slug3?.product_details?.apply_url}`)} className=' py-3 cursor-pointer w-full lg:w-[275px] md:w-full rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                        {CompareCardBoxData.apllynow}
                      </button>
                  </div>
                </div>

                <div className=' border-[#E6ECF1] py-4 px-12 border-b  max-[771px]:gap-20 max-[576px]:gap-12 max-[479px]:gap-20 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.joiningfees}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    
                    <p className='text-[15px] font-normal'>
                      {slug3?.product_details.joining_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {slug3?.product_details.joining_fee} /-</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.fees}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug3?.product_details.annual_fee == 0 ? (
                        <span>Free</span>
                      ) : (
                        <span className='symbole-rupee'>₹ {slug3?.product_details.annual_fee} /-</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.apr}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>{slug3?.product_details?.apr}</p>
                  </div>
                </div>
                {slug3?.product_details?.rating === 0 ? (
                  'NA'
                ) : (
                  <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                    <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                      {CompareCardBoxData.ratingtitle}
                    </p>
                    <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                      <ReactStars
                        count={starCount}
                        size={24}
                        value={slug3?.product_details?.rating}
                        edit={false}
                        color1={'#ccc'}
                        color2={'#49d49d'}
                      />
                    </div>
                  </div>
                )}
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.loungeaccess}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p className='text-[15px] font-normal'>
                      {slug3?.product_details?.lounge_access === '0' ? 'No' : 'Yes'}
                    </p>
                  </div>
                </div>
                <div className=' border-[#E6ECF1] py-4 px-12 border-b max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData.benefits}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <p
                      className='text-[15px] font-normal'
                      data-tooltip-target='tooltip-light'
                      data-tooltip-style='light'
                      data-te-toggle='tooltip'
                      title={`${slug3?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                      {slug3?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}
                    </p>
                  </div>
                </div>
                <div className=' border-[#D8D9DA] border-b py-4 px-12 max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>{CompareCardBoxData.future}</p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <div className='mt-4'>
                      <div
                        className='list-disc space-y-2 text-[14px] text-[#545454] mobile-future product-list-data compare-card'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${slug3?.product_details?.features}</div>`
                        }}></div>
                    </div>
                  </div>
                </div>
                <div className=' py-4 px-12 max-[771px]:gap-[3.1rem] max-[576px]:gap-12 max-[479px]:gap-14 max-[1440px]:px-8 max-[1200px]:px-4'>
                  <p className='text-left text-[15px] font-semibold max-xs:text-[14px]'>
                    {CompareCardBoxData?.welcomeoffer}
                  </p>
                  <div className='text-left flex items-center gap-4 pt-2 max-[1440px]:gap-4'>
                    <div className='mt-4'>
                      <div
                        className='list-disc  space-y-2 text-[14px] text-[#545454] product-list-data compare-card'
                        dangerouslySetInnerHTML={{
                          __html: `<div>${slug3?.product_details?.welcome_offer}</div>`
                        }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(size.width >= 992 ? slug1 == null || slug2 == null || slug3 == null : slug1 == null || slug2 == null) ? (
              <div className='max-[576px]:pt-10 max-[576px]:p-4'>
                <div className='border-2  border-[#D8D9DA] bg-[#FAFBFC] rounded-xl border-dashed w-[270px] h-[160px] mx-auto  max-[576px]:w-full  max-[576px]:h-auto  '>
                  <div className='p-14 pb-10 h-full max-[479px]:py-8' >
                    <Image
                      src={plusIcon}
                      alt='plus'
                      className='mx-auto max-[479px]:w-[30px] max-[479px]:h-[30px]'
                      width={35}
                      height={35}
                      onClick={()=>setAddCardDrop(true)}
                    />
                    {addCardDrop && (
                  <div className='relative mt-4 w-[90%] max-[1440px]:w-[100%] sm:w-3/5 mx-auto max-[576px]:w-full flex justify-center'>
                  <select
                    defaultValue='credit cards'
                    onChange={(e) => handleClick(e.target.value)}
                    className='w-[80px] sm:w-32 max-[414px]:px-1  custome-select-tag inline-flex overflow-auto justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    style={{ fontSize: 'small' }}>
                    <option disabled value='credit cards'>
                      Credit cards
                    </option>
                    {productcomparedata?.product_list?.length > 0 &&
                      productcomparedata?.product_list
                        ?.filter(
                          (obj) =>
                            obj?.card_name !== slug1?.product_details?.card_name &&
                            obj?.card_name !== slug2?.product_details?.card_name
                        )
                        .map((comparedata, index) => {
                          return (
                            <option value={comparedata?.url_slug?.split('/')[2]} key={index}>
                              <button
                                className='block w-full text-left cursor-pointer whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 toprecome-card-text '
                                data-te-dropdown-item-ref
                                prefetch={false}>
                                {comparedata?.card_name}
                              </button>
                            </option>
                          );
                        })}
                  </select>
                </div>
                
                
                )}
                  </div>
                </div>
                <h2 className='text-center mt-4 text-[15px] font-semibold leading-6'>Search another card from above</h2>
                
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='mt-10 text-center'>
        <Link className='text-center' href='/credit-cards' prefetch={false}>
          <button className='py-3 cursor-pointer  lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold  max-[576px]:w-[50%]'>
            Go Back to Listing
          </button>
        </Link>
      </div>
    </>
  )
}

export default CompareCardBoxed
