import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import closeicon from '../../../../public/assets/closeIcon.svg'
import downloadIcon from '../../../../public/assets/download.svg'
import plusIcon from '../../../../public/assets/plus.svg'
import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast from 'react-hot-toast'
import { errorHandling, getCompareTitle, getHash, leadId, localUserData, token } from '@/utils/util'
import Cookies from 'js-cookie'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import SocialMediaShareComp from './SocialMediaShareComp'
import SearchableDropdown from '../SearchableDropdown/SearchableDropdown'
import StarRatings from 'react-star-ratings'

const CompareCreditCardNew = ({ route, faqdata, slug1, slug2, slug3, productcomparedata }) => {
  const [addCardDrop, setAddCardDrop] = useState(false)
  const [isActive, setIsactive] = useState(false)
  const [slugUrlData, setSlugUrlData] = useState()
  const [fieldValue, setFieldValue] = useState()
  const [openShareIcons, setOpenShareIcons] = useState(false)
  const [searchValue, setSearchValue] = useState({ name: null })

  const { query } = useRouter()
  const size = useWindowSize()

  const isDesktop = size?.width > 768
  const targetRef = useRef(null)
  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  const placeHolder = 'Select new credit card'

  const cardsArray =
    productcomparedata?.product_list?.length > 0 &&
    productcomparedata?.product_list?.filter(
      (obj) =>
        obj?.card_name !== slug1?.product_details?.card_name && obj?.card_name !== slug2?.product_details?.card_name
    )

  const cardsName = cardsArray?.map((item, index) => {
    {
      const array = [
        {
          id: index + 1,
          name: item?.card_name,
          url_slug: item?.url_slug
        }
      ]
      return array?.[0]
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')

      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])
  const OpenSocialIcons = () => {
    setOpenShareIcons((prev) => !prev)
  }

  const dropdownRef = useRef(null)
  const router = useRouter()

  const starCount = 5

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const userData = localUserData && JSON.parse(localUserData)

  const handleshowdrop = () => {
    setAddCardDrop(!addCardDrop)
  }
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const handleReplace = (slug) => {
    const slugurlreplace = slug?.product_details?.url_slug?.split('/')
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

  const handleDelete = (_id) => {
    const data = query?.slug
    delete router.query[_id]
    if (!query?.slug?.length) {
      router.push(`/credit-cards/compare/none`)
    }
  }
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

  function handleClick(slug_add) {
    if (slug_add) {
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
  }

  const h = getHash()

  // ADD LEADS API CALL
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const callAddLeadDetails = (applyUrl) => {
    const url_slug = applyUrl?.split?.('/')?.pop()
    let params = {
      lead_profile_id: leadId,
      url_slug: url_slug,
      gender: userData?.gender,
      pan: userData?.pan_no,
      full_name: userData?.full_name,
      mobile_no: String(userData?.mobile),
      dob: userData?.dob,
      email: userData?.email,
      pin_code: userData?.pin_code,
      occupation: userData?.occupation?.toLowerCase(),
      terms: 'agree',
      company_name: userData?.company_name,
      device_id: '',
      request_id: '',
      monthly_salary: userData?.monthly_salary,
      lang_id: 1,
      itr_amount: userData?.itr_amount,
      referrer_url: refOutSide || ''
    }

    if (leadIPData?.user_agent) {
      params = { ...params, user_agent: leadIPData?.user_agent }
    }
    if (deviceId) {
      params = { ...params, device_id: deviceId }
    }
    if (leadIPData?.ip) {
      params = { ...params, ip_address: leadIPData?.ip }
    }
    if (fieldValue) {
      params = { ...params, utm_details: fieldValue }
    }
    if (h) {
      params = { ...params, h: h }
    }
    axios
      .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, { headers: headersAuth })
      .then((response) => {
        if (response?.data?.data?.url) {
          router.push(response?.data?.data?.url)
        }
        if (response?.data?.message == 'success') {
          if (token) {
            props?.data?.page.handlePage('leads')
            props?.data?.otp.handleOtpCheck(false)
          }
        } else {
          toast.error(response?.data?.data)
        }
      })
      .catch((error) => {
        errorHandling(error)
      })
  }
  //navigate to pdf page
  const navigateToPdfPage = () => {
    router?.push(`${router?.asPath}/pdf`)
  }

  //
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
  }, [isActive, addCardDrop])

  useEffect(() => {
    getSlugsArray()
  }, [])

  const slugsArray = getSlugsArray()

  useEffect(() => {
    getMobileSlugsArray()
  }, [])
  const MobileSlugArray = getMobileSlugsArray()

  const tabBasis = size?.width > 577 && size?.width < 769

  const getMobileCompareCard = () => {
    return (
      <>
        <div ref={targetRef} className='bg-white rounded-xl'>
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
                  <button
                    className='flex absolute right-[-0.5rem] top-[-1rem] h-[30px]   cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px] h-[24px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                  {slug1?.product_details?.card_name}
                </div>
                {slug1?.product_details?.rating === 0 ? (
                  'NA'
                ) : (
                  <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                    <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                      {slug1?.product_details?.rating}
                    </p>
                    <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                      <StarRatings
                        rating={slug1?.product_details?.rating}
                        starRatedColor='#49d49d'
                        numberOfStars={starCount}
                        name='rating'
                        starDimension='16px'
                        starSpacing='0'
                      />
                    </div>
                  </div>
                )}
                <div className='flex items-center justify-center gap-1.5'></div>
                <div id='comp-aply-btn' className='text-center mt-2'>
                  <ApplyNowButton
                    data={MobileSlugArray?.[0]?.product_details}
                    userData={userData}
                    pos='4'
                    position='1'
                    disabled={MobileSlugArray?.[0]?.product_details?.bank_name === "KOTAK MAHINDRA BANK"}
                  />
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
                  <button
                    className='flex absolute right-[-0.5rem] top-[-1rem] h-[30px]   cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px] h-[24px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                  {slug2?.product_details?.card_name}
                </div>
                {slug2?.product_details?.rating === 0 ? (
                  'NA'
                ) : (
                  <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                    <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                      {slug2?.product_details?.rating}
                    </p>
                    <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                      <StarRatings
                        rating={slug2?.product_details?.rating}
                        starRatedColor='#49d49d'
                        numberOfStars={starCount}
                        name='rating'
                        starDimension='16px'
                        starSpacing='0'
                      />
                    </div>
                  </div>
                )}
                <div className='flex items-center justify-center gap-1.5'></div>
                <div id='comp-2-aply-btn' className='text-center mt-2'>
                  <ApplyNowButton
                    data={MobileSlugArray?.[1]?.product_details}
                    userData={userData}
                    pos='5'
                    position='2'
                    disabled={MobileSlugArray?.[1]?.product_details?.bank_name === "KOTAK MAHINDRA BANK"}
                  />
                </div>
              </div>
            )}

            {(size.width >= 992 ? slug1 == null || slug2 == null || slug3 == null : slug1 == null || slug2 == null) ? (
              <div className='max-[576px]:pt-10 basis-1/2   pb-8 pt-10 px-6 '>
                <div className='  h-[144px] border-2  border-[#D8D9DA] bg-[#FAFBFC] rounded-xl border-dashed w-auto mx-auto  max-[576px]:w-full  max-[576px]:h-auto  '>
                  <div className=' pb-10 h-full max-[479px]:py-8 flex justify-center flex-col'>
                    <Image
                      src={plusIcon}
                      alt='plus'
                      className='mx-auto max-[479px]:w-[30px] max-[479px]:h-[30px]'
                      width={35}
                      height={35}
                      onClick={() => setAddCardDrop(true)}
                    />
                    {addCardDrop && (
                      <div className='relative mt-4 w-[90%] max-[1440px]:w-[100%] sm:w-3/5 mx-auto max-[576px]:w-full flex justify-center'>
                        <SearchableDropdown
                          options={cardsName}
                          label='name'
                          id='id'
                          selectedVal={searchValue?.name}
                          handleChange={(val) => {
                            setSearchValue(val?.name)
                            handleClick(val?.url_slug?.split('/')?.[2])
                          }}
                          placeholder={placeHolder}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <h2 className='text-center mt-[34px] text-[15px] font-semibold leading-6'>
                  Search another card from above
                </h2>
              </div>
            ) : (
              ''
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

  const tablet = size?.width > 577 && size?.width < 769
  return (
    <div className='bg-[#F4F8FB] '>
      <div
        className={`container  min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-[34px] pb-[80px] px-20 rounded-2xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7
    `}>
        {size?.width > 768 && (
          <div>
            <h2 className='text-[#212529] pb-4  text-[22px] font-semibold leading-[30px] max-[425px]:text-2xl max-[320px]:text-lg  font-[Faktum]'>
              {getCompareTitle(slug1, slug2, slug3, 'Credit Cards')}
            </h2>
          </div>
        )}
        {size?.width <= 768 ? (
          <div className='flex justify-center  max-lg:flex-col  max-[375px]:gap-3 gap-3 mb-7 relative'>
            <div className='max-lg:text-center  max-[320px]:px-1 '>
              <h2 className='text-[#212529] mx-2 text-[18px] font-semibold leading-[25px] max-[425px]:text-[18px] max-[320px]:text-[15px]  font-[Faktum]'>
                {getCompareTitle(slug1, slug2, {}, 'Credit Cards')}
              </h2>
            </div>

            {slug1 && (
              <div className='flex gap-4 justify-between items-center max-sm:flex-col '>
                <Link href={`${router?.asPath}/pdf`} prefetch={false} target='_blank'>
                  <div
                    className='flex justify-start gap-2  items-start cursor-pointer'
                    onClick={() => navigateToPdfPage()}>
                    <span className='  px-2 text-center cursor-pointer'>
                      <Image src={downloadIcon} alt='download' width={20} height={20} />
                    </span>
                    <span className='text-[18px] max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[13px]'>
                      View & Print
                    </span>
                  </div>
                </Link>

                <span className=''>
                  <SocialMediaShareComp />
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className='flex justify-between items-baseline  max-lg:flex-col md:gap-4 relative'>
            <div className='  cursor-pointer'>
              {slug1 && (
                <Link
                  className='flex justify-start items-center gap-2'
                  href={`${router?.asPath}/pdf`}
                  prefetch={false}
                  target='_blank'>
                  <div className='    cursor-pointer' onClick={() => navigateToPdfPage()}>
                    <Image src={downloadIcon} alt='download' width={25} height={25} />
                  </div>
                  <div className='text-[15px] pt-2 max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[13px]'>
                    View & Print
                  </div>
                </Link>
              )}
            </div>

            <div className='pt-2'>
              <SocialMediaShareComp />
            </div>
          </div>
        )}

        {size?.width > 576 ? (
          <div ref={targetRef} className=''>
            <table className='border-collapse border-b-0 border-0 w-full bg-white rounded-xl   ...'>
              <thead className='flex'>
                {size?.width > 768 ? (
                  <th className='basis-1/4 '>
                    <>
                      <div className='border-r px-5 h-full border-slate-200'>
                        <h2 className='px-6 font-[poppins] text-[13px] pt-10 font-semibold uppercase'>card details</h2>
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
                          className={`max-sm:w-[40vw] relative max-sm:h-[100px]  h-[144px]  flex justify-center bg-white rounded-lg  px-[10px] ${
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
                          <button
                            className='flex absolute right-[-0.5rem] top-[-1rem] h-[30px]   cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                        <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                          {slug1?.product_details?.card_name}
                        </div>
                          {slug1?.product_details?.rating === 0 ? (
                            'NA'
                          ) : (
                            <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                              <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                                {slug1?.product_details?.rating}
                              </p>
                              <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                                <StarRatings
                                  rating={slug1?.product_details?.rating}
                                  starRatedColor='#49d49d'
                                  numberOfStars={starCount}
                                  name='rating'
                                  starDimension='16px'
                                  starSpacing='0'
                                />
                              </div>
                            </div>
                          )}
                        <div className='flex items-center justify-center gap-1.5'></div>
                        <div id='comp-3-aply-btn' className='text-center mt-2'>
                          <ApplyNowButton
                            data={slugsArray?.[0]?.product_details}
                            userData={userData}
                            pos='6'
                            position='1'
                            disabled={slugsArray?.[0]?.product_details?.bank_name === "KOTAK MAHINDRA BANK"}
                          />
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
                          className={`max-sm:w-[40vw] relative max-sm:h-[100px]  h-[144px]   flex justify-center bg-white rounded-lg  px-[10px] ${
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
                          <button
                            className='flex absolute right-[-0.5rem] top-[-1rem] h-[30px]   cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                        <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                          {slug2?.product_details?.card_name}
                        </div>
                          {slug2?.product_details?.rating === 0 ? (
                            'NA'
                          ) : (
                            <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                              <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                                {slug2?.product_details?.rating}
                              </p>
                              <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                                <StarRatings
                                  rating={slug2?.product_details?.rating}
                                  starRatedColor='#49d49d'
                                  numberOfStars={starCount}
                                  name='rating'
                                  starDimension='16px'
                                  starSpacing='0'
                                />
                              </div>
                            </div>
                          )}
                        <div className='flex items-center justify-center gap-1.5'></div>
                        <div id='comp-4-aply-btn' className='text-center mt-2'>
                          <ApplyNowButton
                            data={slugsArray?.[1]?.product_details}
                            userData={userData || productcomparedata}
                            pos='7'
                            position={'2'}
                            disabled={slugsArray?.[1]?.product_details?.bank_name === "KOTAK MAHINDRA BANK"}
                            
                          />
                        </div>
                      </div>
                    </div>
                  </th>
                )}

                {slug3 && isDesktop && (
                  <th className='basis-1/4'>
                    <div className='text-[#212529]   px-5 pb-8 pt-10 border-slate-200'>
                      <div
                        className={`max-sm:w-[40vw] relative max-sm:h-[100px] h-[144px]  flex justify-center bg-white rounded-lg   px-[10px]${
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
                        <button
                          className='flex  h-[30px] absolute right-[-0.5rem] top-[-1rem] cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                      <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                        {slug3?.product_details?.card_name}
                      </div>
                      <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px] pt-3'>
                        {slug3?.product_details?.rating ? (
                          <>
                            <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                              {slug3?.product_details?.rating}
                            </p>
                            <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                              <StarRatings
                                rating={slug3?.product_details?.rating}
                                starRatedColor='#49d49d'
                                numberOfStars={starCount}
                                name='rating'
                                starDimension='16px'
                                starSpacing='0'
                              />
                            </div>
                          </>
                        ) : (
                          'NA'
                        )}
                      </div>
                      <div className='flex items-center justify-center gap-1.5'></div>
                      <div id='comp-5-aply-btn' className='text-center mt-2'>
                        <ApplyNowButton
                          data={slugsArray?.[2]?.product_details}
                          userData={userData || productcomparedata}
                          pos='9'
                          position={'3'}
                          disabled={slugsArray?.[2]?.product_details?.bank_name === "KOTAK MAHINDRA BANK"}
                        />
                      </div>
                    </div>
                  </th>
                )}

                {(
                  size.width >= 992 ? slug1 == null || slug2 == null || slug3 == null : slug1 == null || slug2 == null
                ) ? (
                  <th className='basis-1/4'>
                    <div className='max-[576px]:pt-10 max-[576px]:p-4  pb-8 pt-10 px-6 '>
                      <div className='  h-[144px] border-2  border-[#D8D9DA] bg-[#FAFBFC] rounded-xl border-dashed w-auto mx-auto  max-[576px]:w-full  max-[576px]:h-auto  '>
                        <div className=' pb-10 h-full max-[479px]:py-8 flex justify-center flex-col'>
                          <Image
                            src={plusIcon}
                            alt='plus'
                            className='mx-auto max-[479px]:w-[30px] max-[479px]:h-[30px]'
                            width={35}
                            height={35}
                            onClick={() => setAddCardDrop(true)}
                          />
                          {addCardDrop && (
                            <div className='relative mt-4 w-[90%] max-[1440px]:w-[100%] sm:w-3/5 mx-auto max-[576px]:w-full flex justify-center'>
                              <SearchableDropdown
                                options={cardsName}
                                label='name'
                                id='id'
                                selectedVal={searchValue?.name}
                                handleChange={(val) => {
                                  setSearchValue(val?.name)
                                  handleClick(val?.url_slug?.split('/')?.[2])
                                }}
                                placeholder={placeHolder}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <h2 className='text-center mt-[34px] text-[15px] font-semibold leading-6'>
                        Search another card from above
                      </h2>
                    </div>
                  </th>
                ) : (
                  ''
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
        <div className='mt-10 max-sm: pb-10 text-center'>
          <Link className='text-center' href='/credit-cards' prefetch={false}>
            <button className='py-3 cursor-pointer  md:w-[160px]  rounded-lg text-[#212529] border border-[#000] font-semibold  max-[576px]:w-[50%]'>
              Go Back to Listing
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CompareCreditCardNew
