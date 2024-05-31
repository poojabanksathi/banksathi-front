import React, { useEffect, useRef, useState } from 'react'
import CreditCardTrobleHaving from '../../compareCard/cardTrobleHaving/CreditCardTrobleHaving'
import FAQ from '@/core/component/common/FAQ/FAQ'
import Link from 'next/link'
import Image from 'next/image'
import closeicon from '../../.../../../../../public/assets/closeIcon.svg'
import downloadIcon from '../../.../../../../../public/assets/download.svg'
import shareIcon from '../../.../../../../../public/assets/share-2.svg'
import plusIcon from '../../.../../../../../public/assets/plus.svg'
import ReactStars from 'react-stars'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast from 'react-hot-toast'
import { errorHandling, getHash, leadId, localUserData, token } from '@/utils/util'
import { Margin, usePDF } from 'react-to-pdf'
import Cookies from 'js-cookie'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'
import { useReactToPrint } from 'react-to-print'

const CompareCardTable = dynamic(() => import('@/core/component/Layout/savingAccountList/CompareTable'), {
  ssr: false
})

const CompareSavingsCard = ({ faqdata, slug1, slug2, slug3, productcomparedata }) => {
  const [addCardDrop, setAddCardDrop] = useState(false)
  // const [deleteCard, setDeleteCard] = useState(false)
  const [isActive, setIsactive] = useState(false)
  const [slugUrlData, setSlugUrlData] = useState()
  const [fieldValue, setFieldValue] = useState()

  const size = useWindowSize()
  const isDesktop = size?.width > 768

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')

      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  const dropdownRef = useRef(null)
  const targetRef = useRef(null)
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

  //close Icon
  const handleDelete = (_id) => {
    delete router.query[_id]
    if (!router?.query?.compareslug?.length) {
      router.push(`/bank-accounts/compare/none`)
    }
  }

  const handleReplace = (slug) => {
    const slugurlreplace = slug?.product_details?.url_slug?.split('/')
    if (router?.query?.compareslug?.length > 1) {
      const routes = router?.query?.compareslug
      const updatedParams = routes?.filter((item) => item !== slugurlreplace?.[2])
      const updatedQuery = {
        ...router?.query,
        ['compareslug']: updatedParams
      }
      return router.push({
        pathname: router?.pathname,
        query: updatedQuery
      })
    } else {
      delete router?.query?.compareslug?.[slugurlreplace?.[2]]
      return router.push(`/bank-accounts/compare/none`)
    }
  }
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

  const handleClick = (slug_add) => {
    setSlugUrlData(slug_add)
    const data = router?.query?.compareslug
    const newSlug = slug_add
    if (data?.length) {
      const slug1 = data?.[0]
      const slug2 = data?.[1]
      const slug3 = data?.[2] === undefined || !data[2] ? newSlug : data[2]
      if (router?.query?.compareslug?.[0] === 'none' && slug1 === 'none') {
        router.push(`/bank-accounts/compare/${newSlug}`, `/bank-accounts/compare/${newSlug}`, undefined, {
          scroll: false
        })
      } else if (slug1 && !slug2 && !slug3) {
        router.push(
          `/bank-accounts/compare/${slug1}/${newSlug}`,
          `/bank-accounts/compare/${slug1}/${newSlug}`,
          undefined,
          {
            scroll: false
          }
        )
      } else if (slug1 && !slug2 && slug2 === undefined) {
        router.push(
          `/bank-accounts/compare/${slug1}/${newSlug}`,
          `/bank-accounts/compare/${slug1}/${newSlug}`,
          undefined,
          {
            scroll: false
          }
        )
      } else if (slug1 && slug2 && slug3) {
        router.push(
          `/bank-accounts/compare/${slug1}/${slug2}/${slug3}`,
          `/bank-accounts/compare/${slug1}/${slug2}/${slug3}`,
          undefined,
          { scroll: false }
        )
      } else if (router?.query?.slug[0] === 'none' || slug1 === 'none') {
        router.push(`/bank-accounts/compare/${newSlug}`, `/bank-accounts/compare/${newSlug}`, undefined, {
          scroll: false
        })
      }
    } else {
      router.push(`/bank-accounts/compare/none`)
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
        // router.push(`/${applyUrl}`)
      })
  }

  const handleApplyNow = (applyUrl) => {
    if (userData) {
      callAddLeadDetails(applyUrl)
    } else if (!userData) {
      router.push(`/${applyUrl}`)
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
  }, [isActive, addCardDrop])

  useEffect(() => {
    getSlugsArray()
  }, [])

  const slugsArray = getSlugsArray()

  // const { toPDF, targetRef } = usePDF({
  //   filename: 'compareBanks.pdf',
  //   page: { margin: Margin.SMALL }
  // })

  const printPdf = useReactToPrint({
    content: () => targetRef?.current,
    documentTitle: 'banks-compare-report'
  })

  return (
    <div>
      <div className='bg-[#F4F8FB]'>
        <div
          className={`container  min-h-[500px] max-[1440px]:px-12 max-[1200px]:px-0 mx-auto max-[991px]:max-w-full pt-[34px] pb-[100px] px-20 rounded-xl max-[1024px]:px-8 max-[479px]:px-0  max-[479px]:pb-0 max-[375px]:pb-7 max-[479px]:pt-7
         `}>
          <div className='flex justify-center max-lg:flex-col md:gap-10 max-[576px]:gap-8 mb-7 relative'>
            <div className='max-lg:text-center max-[375px]:mb-4 max-[320px]:px-1 '>
              <h2 className='text-[#212529]  text-[46px] font-semibold leading-[64.4px] max-[425px]:text-2xl max-[320px]:text-lg  font-[Faktum]'>
                Compare Savings Accounts
              </h2>
            </div>
            <div className='flex gap-4 justify-center max-[768px]:mt-[16px] max-lg:mb-2  lg:justify-end lg:absolute lg:right-2 lg:bottom-0'>
              <span
                className='w-[48px] h-[48px] border border-[#212529] p-3 rounded-[8px] text-center cursor-pointer'
                onClick={() => printPdf()}>
                <Image src={downloadIcon} alt='download' width={48} />
              </span>
              <span className='w-[48px] h-[48px] border border-[#212529] p-3 rounded-[8px]  text-center'>
                <Image src={shareIcon} alt='share' width={48} />
              </span>
            </div>
          </div>
          {/* compare card box */}

          <div ref={targetRef} className=' rounded-3xl bg-white max-[479px]:py-0'>
            <div className='w-full  m-auto  max-[576px]:pt-0'>
              <div className='grid grid-cols-4 max-[1024px]:grid-cols-4 max-[834px]:grid-cols-2 max-[576px]:grid-cols-2 max-[479px]:grid-cols-2 '>
                {/* {deleteCard && ( */}
                {size?.width > 768 ? (
                  <>
                    <div
                      className={`text-[#212529]  border-r  border-slate-200 w-[103%] ${size?.width === 768 ? '!w-[70%]' : ''
                        }`}>
                      <h2 className='px-6 font-[poppins] text-[13px] pt-10 font-semibold'>Bank Name</h2>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {slug1 && (
                  <div className='text-[#212529]  border-r px-5  border-slate-200'>
                    <div className='pb-8 pt-10'>
                      <div
                        className={`max-sm:w-[40vw] max-sm:h-[100px] h-[202px] flex justify-center bg-white rounded-lg border border-slate-200 py-[20px]  ${size?.width === 768 ? '!w-[40vw] h-[100px] py-[10px]' : ''
                          }`}>
                        <Image
                          src={`${Img_URL}/${slug1?.product_details?.product_image}`}
                          // src={'/assets/RightShortArrow.svg'}
                          id='2'
                          alt={`img`}
                          width={isDesktop || size?.width === 768 ? 160 : 50}
                          height={40}
                          unoptimized={true}
                        />
                        <button
                          className='flex relative h-[30px] left-[19%]  cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                      <Link href={`${slug1?.product_details?.card_name}`} prefetch={false}>
                        <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px]'>
                          {slug1?.product_details?.rating ? (
                            <>
                              <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                                {slug1?.product_details?.rating}
                              </p>
                              <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                                <ReactStars
                                  count={starCount}
                                  size={16}
                                  value={slug1?.product_details?.rating}
                                  // value={4}
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
                      <div id='save-aply-btn+676' className='text-center mt-2'>
                        {/* <button
                          onClick={() => handleApplyNow(slug1?.product_details?.applyUrl)}
                          className=' py-3 cursor-pointer w-full md:w-[230px] lg:w-[200px] xl:w-[230px]  rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                          Apply Now
                        </button> */}
                        <ApplyNowButton data={slug1} position='1' userData={userData} pos='28'
                          disabled={slug1?.bank_name === "KOTAK MAHINDRA BANK"}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* )} */}
                {slug2 && (
                  <div className='text-[#212529]  border-r px-5 border-slate-200'>
                    <div className='    pb-8 pt-10'>
                      <div
                        className={`max-sm:w-[40vw] max-sm:h-[100px]  h-[202px] flex justify-center bg-white rounded-lg border border-slate-200 py-[20px]  ${size?.width === 768 ? '!w-[40vw] h-[100px] py-[10px]' : ''
                          }`}>
                        <Image
                          src={`${Img_URL}/${slug2?.product_details?.product_image}`}
                          id='2'
                          alt={`img`}
                          width={isDesktop || size?.width === 768 ? 160 : 50}
                          height={40}
                          unoptimized={true}
                        />
                        <button
                          className='flex relative h-[30px] left-[19%]  cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
                          onClick={() => handleReplace(slug2)}>
                          <Image
                            src={closeicon}
                            className='w-[15px] max-xs:w-[13px] h-auto'
                            onClick={() => handleDelete(slug2)}
                            width={15}
                            height={15}
                            alt='img_text'
                            priority={true}
                          />
                        </button>
                      </div>
                      <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px] h-[24px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                        {slug2?.product_details?.card_name}
                      </div>
                      <Link href={`${slug2?.product_details?.card_name}`} prefetch={false}>
                        {slug2?.product_details?.rating === 0 ? (
                          'NA'
                        ) : (
                          <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px]'>
                            <p className='text-[#212529] lg:text-[15px] md:text-[14px] sm:text-[12px] text-[13px] font-bold whitespace-nowrap sm:ml-2 max-xs:mt-2'>
                              {slug2?.product_details?.rating}
                            </p>
                            <div className='flex  items-center justify-center lg:gap-2 md:gap-1  mobile-start-res'>
                              <ReactStars
                                count={starCount}
                                size={16}
                                value={slug2?.product_details?.rating}
                                // value={4}
                                edit={false}
                                color1={'#ccc'}
                                color2={'#49d49d'}
                              />
                            </div>
                          </div>
                        )}
                      </Link>
                      <div className='flex items-center justify-center gap-1.5'></div>
                      <div id='save-aply-btn+86' className='text-center mt-2'>
                        {/* <button
                          onClick={() => handleApplyNow(slug2?.product_details?.applyUrl)}
                          className=' py-3 cursor-pointer w-full md:w-[230px] lg:w-[200px] xl:w-[230px] rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                          Apply Now
                        </button> */}
                        <ApplyNowButton data={slug2} userData={userData} pos='29' position={'2'} disabled={slug2?.bank_name === "KOTAK MAHINDRA BANK"}/>
                      </div>
                    </div>
                  </div>
                )}
                {slug3 && isDesktop && (
                  <div className='text-[#212529]   px-4  border-slate-200'>
                    <div className='pb-8 pt-10'>
                      <div
                        className={`max-sm:w-[40vw] max-sm:h-[100px]  h-[202px] flex justify-center bg-white rounded-lg border border-slate-200 py-[20px]  ${size?.width === 768 ? '!w-[40vw] h-[100px] py-[10px]' : ''
                          }`}>
                        <Image
                          src={`${Img_URL}/${slug3?.product_details?.product_image}`}
                          id='2'
                          alt={`img`}
                          width={isDesktop || size?.width === 768 ? 160 : 50}
                          height={40}
                          unoptimized={true}
                        />
                        <button
                          className='flex relative h-[30px] left-[19%]  cursor-pointer bottom-[33px] bg-[#FFFFFF] px-2 py-1 rounded-full  z-[1] w-[30px] border border-[#E6ECF1] drop-shadow-lg'
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
                      <div className="mt-[34px] mb-[17.5px] text-center text-neutral-800 text-lg max-sm:text-[13px] h-[24px] max-sm:leading-[21px] font-bold font-['Poppins'] leading-[25.20px]">
                        {slug3?.product_details?.card_name}
                      </div>
                      <Link href={`${slug3?.product_details?.card_name}`} prefetch={false}>
                        {slug3?.product_details?.rating === 0 ? (
                          'NA'
                        ) : (
                          <div className='m-auto flex  justify-center lg:gap-2 md:gap-1 items-center max-xs:gap-2 mb-[20px]'>
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
                          </div>
                        )}
                      </Link>
                      <div className='flex items-center justify-center gap-1.5'></div>
                      <div id='save-0-aply-btn' className='text-center mt-2 '>
                        {/* <button
                          onClick={() => handleApplyNow(slug3?.product_details?.applyUrl)}
                          className=' py-3 cursor-pointer w-full md:w-[230px] lg:w-[200px] xl:w-[230px]  rounded-lg text-[#212529] bg-[#49D49D] font-semibold '>
                          Apply Now
                        </button> */}
                        <ApplyNowButton data={slug3} userData={userData} pos='30' position='3' disabled={slug3?.bank_name === "KOTAK MAHINDRA BANK"}/>
                      </div>
                    </div>
                  </div>
                )}
                {(
                  size.width >= 992 ? slug1 == null || slug2 == null || slug3 == null : slug1 == null || slug2 == null
                ) ? (
                  <div className='max-[576px]:pt-10 p-4  pb-8 pt-10'>
                    <div className=' h-[202px] border-2  border-[#D8D9DA] bg-[#FAFBFC] rounded-xl border-dashed w-auto mx-auto  max-[576px]:w-full  max-[576px]:h-auto  '>
                      <div className='p-14 pb-10 h-full max-[479px]:py-8 flex justify-center flex-col'>
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
                            <select
                              defaultValue='Bank accounts'
                              onChange={(e) => handleClick(e?.target?.value)}
                              className='w-[80px] sm:w-32 max-[414px]:px-1  custome-select-tag inline-flex overflow-auto justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                              style={{ fontSize: 'small' }}>
                              <option disabled value='bank accounts'>
                                Bank Accounts
                              </option>
                              {productcomparedata?.product_list?.length > 0 &&
                                productcomparedata?.product_list
                                  ?.filter(
                                    (obj) =>
                                      obj?.card_name !== slug1?.product_details?.card_name &&
                                      obj?.card_name !== slug2?.product_details?.card_name
                                  )
                                  ?.map((comparedata, index) => {
                                    return (
                                      <option value={comparedata?.url_slug?.split('/')[2]} key={index}>
                                        <button
                                          className='block w-full text-left cursor-pointer whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 toprecome-card-text '
                                          data-te-dropdown-item-ref
                                          prefetch={false}>
                                          {comparedata?.card_name}
                                        </button>
                                      </option>
                                    )
                                  })}
                            </select>
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
            </div>
            {slug1 && <CompareCardTable title={'Bank Features'} slug1={slug1} slug2={slug2} slug3={slug3} />}
            {slug1 && <CompareCardTable title={'Debit Card Features'} slug1={slug1} slug2={slug2} slug3={slug3} />}
          </div>

          {/* go to back button */}
          <div className='mt-10 text-center'>
            <Link className='text-center' href='/bank-accounts' prefetch={false}>
              <button className='py-3 cursor-pointer  lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold  max-[576px]:w-[50%]'>
                Go Back to Listing
              </button>
            </Link>
          </div>
        </div>
        <CreditCardTrobleHaving position={'2'} />
        <FAQ faqdata={faqdata} />
      </div>
    </div>
  )
}

export default CompareSavingsCard
