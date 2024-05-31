import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import closeicon from '../../../../public/assets/closeIcon.svg'
import downloadIcon from '../../../../public/assets/download.svg'
import shareIcon from '../../../../public/assets/share-2.svg'
import plusIcon from '../../../../public/assets/plus.svg'
import ReactStars from 'react-stars'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import { getCompareTitle, getHash, localUserData, token } from '@/utils/util'
// import { Margin, usePDF } from 'react-to-pdf'
import Cookies from 'js-cookie'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import SocialMediaShareComp from '@/core/component/common/CommonList/SocialMediaShareComp'
import { useReactToPrint } from 'react-to-print'
import CreditCardTrobleHaving from '../compareCard/cardTrobleHaving/CreditCardTrobleHaving'
import SearchableDropdown from '../../common/SearchableDropdown/SearchableDropdown'

const CompareBankAccounts = ({ slug1, slug2, slug3, productcomparedata, title }) => {
  // TO GET SELECT OPTIONS VALUES ----
  const banksArray =
    productcomparedata?.product_list?.length > 0 &&
    productcomparedata?.product_list?.filter(
      (obj) =>
        obj?.card_name !== slug1?.product_details?.card_name && obj?.card_name !== slug2?.product_details?.card_name
    )

  const banksName = banksArray?.map((item, index) => {
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
  const placeHolder = 'Select new account'

  const [addCardDrop, setAddCardDrop] = useState(false)
  const [isActive, setIsactive] = useState(false)
  const [slugUrlData, setSlugUrlData] = useState()
  const [fieldValue, setFieldValue] = useState()
  const [openShareIcons, setOpenShareIcons] = useState(false)
  const [searchValue, setSearchValue] = useState({ name: null })

  const { query } = useRouter()
  const size = useWindowSize()

  const tablet = size?.width > 577 && size?.width < 769
  const isDesktop = size?.width > 768

  const targetRef = useRef(null)

  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')

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
    if (query?.compareslug?.length > 1) {
      const updatedParams = query['compareslug']?.filter((param) => param !== slugurlreplace[2], query?.compareslug)
      const updatedQuery = {
        ...query,
        ['compareslug']: updatedParams
      }
      router.push({
        pathname: router?.pathname,
        query: updatedQuery
      })
    } else {
      delete query?.compareslug[slugurlreplace[2]]
      router.push(`/bank-accounts/compare/none`)
    }
  }

  const handleDelete = (_id) => {
    const data = query?.compareslug
    delete router?.query[_id]
    if (!query?.compareslug?.length) {
      router.push(`/bank-accounts/compare/none`)
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
      const data = query?.compareslug
      const newSlug = slug_add
      if (data.length) {
        const slug1 = data[0]
        const slug2 = data[1]
        const slug3 = data[2] == undefined || !data[2] ? newSlug : data[2]
        if (query?.compareslug[0] === 'none' && slug1 === 'none') {
          router.push(`/bank-accounts/compare/${newSlug}`, `/bank-accounts/compare/${newSlug}`, undefined, {
            scroll: false
          })
          setSearchValue({ name: 'Select new account' })
        } else if (slug1 && !slug2 && !slug3) {
          router.push(
            `/bank-accounts/compare/${slug1}/${newSlug}`,
            `/bank-accounts/compare/${slug1}/${newSlug}`,
            undefined,
            {
              scroll: false
            }
          )
          setSearchValue({ name: 'Select new account' })
        } else if (slug1 && !slug2 && slug2 === undefined) {
          router.push(
            `/bank-accounts/compare/${slug1}/${newSlug}`,
            `/bank-accounts/compare/${slug1}/${newSlug}`,
            undefined,
            {
              scroll: false
            }
          )
          setSearchValue({ name: 'Select new account' })
        } else if (slug1 && slug2 && slug3) {
          router.push(
            `/bank-accounts/compare/${slug1}/${slug2}/${slug3}`,
            `/bank-accounts/compare/${slug1}/${slug2}/${slug3}`,
            undefined,
            { scroll: false }
          )
          setSearchValue({ name: 'Select new account' })
        } else if (query?.compareslug[0] === 'none' || slug1 === 'none') {
          router.push(`/bank-accounts/compare/${newSlug}`, `/bank-accounts/compare/${newSlug}`, undefined, {
            scroll: false
          })
          setSearchValue({ name: 'Select new account' })
        }
      } else {
        router.push(`/bank-accounts/compare/none`)
      }
    }
  }

  const h = getHash()

  // ADD LEADS API CALL
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

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

  const printPage = useReactToPrint({
    content: () => targetRef?.current,
    documentTitle: 'compare-report'
  })
  //navigate to pdf page
  const navigateToPdfPage = () => {
    router?.push(`${router?.asPath}/pdf`)
  }

  const getMobileCompareCard = () => {
    return (
      <>
        <div ref={targetRef} className='bg-white rounded-xl'>
          <div className='grid grid-cols-2  '>
            {slug1 && (
              <div className='text-[#212529] p-3 pb-8 pt-10 basis-1/2 '>
                {/* <div className='   px-5  pb-8 pt-10'> */}
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
                <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                  <div className=' pb-10 h-full max-[479px]:py-8 flex justify-center items-center flex-col'>
                    <Image
                      src={plusIcon}
                      alt='plus'
                      className='mx-auto max-[479px]:w-[30px] max-[479px]:h-[30px]'
                      width={35}
                      height={35}
                      onClick={() => setAddCardDrop(true)}
                    />
                    {addCardDrop && (
                      <div className='relative mt-4 w-[90%] max-[1440px]:w-[100%] mx-[10px] sm:w-3/5 max-[576px]:w-full flex items-center justify-center'>
                        <SearchableDropdown
                          options={banksName}
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
                <h2 className='text-center mt-[34px] text-[14px] font-semibold leading-5'>
                  Select a card from the list to compare
                </h2>
              </div>
            ) : (
              ''
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

  return (
    <div className='bg-[#F4F8FB] '>
      <div
        className={`container  min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-[30px] pb-[30px] px-20 rounded-2xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7
    `}>
        {size?.width > 768 && (
          <div>
            <h2 className='text-[#212529]  pb-4  text-[22px] font-semibold leading-[30px] max-[425px]:text-2xl max-[320px]:text-lg  font-[Faktum]'>
              {getCompareTitle(slug1, slug2, slug3, 'Bank Accounts')}
            </h2>
          </div>
        )}
        {size?.width <= 768 ? (
          <div className='flex justify-center  max-lg:flex-col  max-[375px]:gap-3 gap-3 mb-7 relative'>
            <div className='max-lg:text-center  max-[320px]:px-1 '>
              <h2 className='text-[#212529]  text-[18px] font-semibold leading-[25px] max-[425px]:text-[18px] max-[320px]:text-[15px]  font-[Faktum]'>
                {getCompareTitle(slug1, slug2, {}, 'Bank Accounts')}
              </h2>
            </div>

            {slug1 && (
              <div className='flex gap-4 justify-between items-center max-sm:flex-col '>
                <Link href={`${router?.asPath}/pdf`} prefetch={false} target='_blank'>
                  <div className='flex justify-start gap-2  items-start cursor-pointer'>
                    <span className='  px-2 text-center cursor-pointer' onClick={() => navigateToPdfPage()}>
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
          slug1 && (
            <div className='flex justify-between items-baseline  max-lg:flex-col md:gap-4 relative'>
              <div className='  cursor-pointer'>
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
              </div>

              <div className='pt-2'>
                <SocialMediaShareComp />
              </div>
            </div>
          )
        )}

        {size?.width > 576 ? (
          <div ref={targetRef} className=''>
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
                        <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                        <div className="mt-[30px] text-center text-neutral-800 text-lg max-sm:text-[13px]  max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
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
                      <div className="mt-[34px]  text-center text-neutral-800 text-lg max-sm:text-[13px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                        {slug3?.product_details?.card_name}
                      </div>
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
                  <th className='basis-1/4 max-[768px]:basis-1/2'>
                    <div className='max-[576px]:pt-10 max-[576px]:p-4  pb-8 pt-10 px-6 '>
                      <div className='h-[144px] border-2  border-[#D8D9DA] bg-[#FAFBFC] rounded-xl border-dashed w-full mx-auto  max-[576px]:w-full max-[576px]:h-auto  '>
                        <div className=' pb-10 h-full max-[479px]:py-8 flex justify-center items-center flex-col'>
                          <Image
                            src={plusIcon}
                            alt='plus'
                            className='mx-auto max-[479px]:w-[30px] max-[479px]:h-[30px]'
                            width={35}
                            height={35}
                            onClick={() => setAddCardDrop(true)}
                          />
                          {addCardDrop && (
                            <div className='mt-4 w-[90%] max-[1440px]:w-[100%] sm:w-3/5  mx-[30px] max-[576px]:w-full flex items-center justify-center'>
                              <SearchableDropdown
                                options={banksName}
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
                        Select a card from the list to compare
                      </h2>
                    </div>
                  </th>
                ) : (
                  ''
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
                              {item?.product_details?.best_of && <p className=''> {item?.product_details?.best_of} </p>}
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
                                item?.product_details?.zero_lib_protection && item?.product_details?.zero_lib_protection
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
                            <p className='text-neutral-800 text-xs font-semibold font-[poppins]'>International Usage</p>
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
        <div className='mt-10 max-sm: pb-5 text-center'>
          <Link className='text-center' href='/bank-accounts' prefetch={false}>
            <button className='py-3 cursor-pointer  md:w-[160px]  rounded-lg text-[#212529] border border-[#000] font-semibold  max-[576px]:w-[50%]'>
              Go Back to Listing
            </button>
          </Link>
        </div>
      </div>
      <div className='py-4'>
        <CreditCardTrobleHaving position={'2'} />
      </div>
    </div>
  )
}

export default CompareBankAccounts
