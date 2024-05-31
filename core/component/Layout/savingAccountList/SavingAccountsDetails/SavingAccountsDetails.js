import { BankAccountsdetailsFilter } from '@/utils/alljsonfile/cardsdetailsfilter'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import ReactStars from 'react-stars'
import logo from '../../../../../public/assets/footer-Logo.svg'
import { useWindowSize } from '@/hooks/useWindowSize'
import CommonFeaturesComp from './CommonFeaturesComp/CommonFeaturesComp'
import dynamic from 'next/dynamic'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import axios from 'axios'
import {
  addRatingJsonLd,
  errorHandling,
  getHash,
  getPromotionObject,
  scrollIntoSection,
  sendEventToGTM
} from '@/utils/util'
import Cookies from 'js-cookie'
import useGaEvents from '@/hooks/useGaEvents'
import ApplyNowButton from '@/core/component/common/ApplyNowButton/ApplyNowButton'

const ExperReview = dynamic(() => import('@/core/component/Layout/savingAccountList/ExperReview'), {
  ssr: false
})
const OverallRating = dynamic(() => import('@/core/component/Layout/savingAccountList/OverallRating'), {
  ssr: false
})
const EligiblityCriteria = dynamic(() => import('@/core/component/Layout/savingAccountList/EligiblityCriteria'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), { ssr: false })
const DetailsFindTailor = dynamic(() => import('@/core/component/common/CommonList/DetailsFindTailor'), {
  ssr: false
})
const AccountListRight = dynamic(() => import('@/core/component/Layout/savingAccountList/AccountListRight'), {
  ssr: false
})
const HelplineNo = dynamic(() => import('@/core/component/Layout/savingAccountList/HelplineNo'), {
  ssr: false
})
const ServiceTabs = dynamic(() => import('@/core/component/Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/core/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})
const CreditListingBanner = dynamic(() => import('@/core/component/Layout/creditCardList/CreditListingBanner'), {
  ssr: false
})
const starCount = 5

export const ExpertReview = ({ ReviewsExpert }) => {
  return (
    <>
      <div className='expert-review max-[576px]:my-6 target-element pt-[30px]'>
        <div className=' py-6  rounded-3xl bg-white'>
          <div className='grid grid-cols-3  gap-20 px-6 max-[1200px]:gap-8 max-[1024px]:grid-cols-2  max-[1024px]:gap-0 max-[576px]:grid-cols-1 max-[576px]:gap-5 expert-review'>
            <div className='card-left'>
              <div className=' text-[#212529]'>
                <h2 className='pb-4 text-[18px] font-semibold'>Expert Review </h2>
                {ReviewsExpert?.rating === 0 ? (
                  'NA'
                ) : (
                  <div className='flex items-center gap-6 justify-start max-[1024px]:justify-start pb-2 max-[479px]:gap-4'>
                    <p className='text-[15px] text-[#212529] font-medium max-[1024px]:w-[40%]'>Rating:</p>
                    <div className='flex items-center gap-2'>
                      <ReactStars
                        count={starCount}
                        size={22}
                        value={ReviewsExpert?.rating}
                        edit={false}
                        color1={'#ccc'}
                        color2={'#49d49d'}
                      />

                      <p className='text-[15px] font-bold text-[#212529] '>{ReviewsExpert?.rating}/5</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='card-right col-span-2 max-[1024px]:col-span-1'>
              <div className=' text-[#212529]'>
                <h2 className='pb-4 text-[18px] font-semibold'>{ReviewsExpert?.rating_header}</h2>
                <p className='text-[15px]  py-1 leading-6 w-[90%] max-[576px]:w-full'>
                  {ReviewsExpert?.rating_details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const SavingAccountsDetails = ({
  productDetailsData,
  overallRatingData,
  reviewsData,
  relatedAccountsData,
  longFormData,
  serviceTabs,
  CONS_PROS,
  url_slug
}) => {
  const size = useWindowSize()
  const isDeskTop = size?.width > 768
  const isTab = size?.width === 768 || size?.width === 1024
  const isMobile = size?.width <= 576
  const maxContent = size?.width > 1440

  const router = useRouter()

  const queryHash = router?.asPath?.split('=')?.pop()
  const filter = queryHash && BankAccountsdetailsFilter?.filter((item) => item?.linkhref === queryHash)

  const [selectedId, setSelectedId] = useState(filter?.[0]?.id || 1)
  const [fieldValue, setFieldValue] = useState()

  const bankDetails = useRef()
  const debitCardFeatureRef = useRef()
  const bankAccountsFeatureRef = useRef()
  const expertRef = useRef()
  const customerReviews = useRef()
  const moreAboutRef = useRef()
  const relatedCardRef = useRef()
  const videoRef = useRef()
  const serviceTabRef = useRef()

  const pageRoute = router?.asPath

  const clickPromotion = (index, item) => {
    const data = { eventName: 'select_promotion', title: item?.detaildata, position: index + 1, route: pageRoute }
    sendEventToGTM(getPromotionObject(data))
  }

  const getLeftTabs = () => {
    return (
      <div
        className={`flex p-5 max-[1024px]:p-2 bg-white filter-credit sticky top-16 rounded-3xl w-[235px] ${
          size?.width === 1024 && 'mr-[10px]'
        }`}>
        <div className='pt-4 '>
          {BankAccountsdetailsFilter?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedId(data?.id)
                  clickPromotion(index, data)
                }}>
                <Link
                  href={`/bank-accounts/${router.query['bank-accounts-category']}/${router.query['bank-accounts-details']}${data?.linkhref}`}
                  // href={`/savings-account/${router?.query['category-name']}/${router?.query['cards-details']}/${data?.linkhref}`}
                  prefetch={false}>
                  <p
                    id={`${index}+'bank+btn'`}
                    className={
                      selectedId === data?.id
                        ? 'p-4  mb-2 max-[1200px]:text-[13px] bg-[#844FCF] active:bg-[#844FCF]  duration-150 rounded-[12px] hover:text-white text-white text-[15px] font-semibold detail-filter'
                        : 'p-4  mb-2 max-[1200px]:text-[13px] hover:bg-[#844FCF] active:bg-[#844FCF]  duration-150 rounded-[12px] hover:text-white text-[#212529] text-[15px] font-semibold detail-filter'
                    }>
                    {data.detaildata}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  const getButtons = () => {
    return (
      <div
        id='save-088-aply-btn'
        // className='flex md:basis-1/4 md:flex-col lg:flex-col items-center gap-[14px] max-sm:flex-col'
        className={`${
          isMobile ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-3 w-full justify-between items-center' : ''
        }  flex md:flex-col lg:flex-col  items-center gap-[14px]`}>
        <ApplyNowButton
          userData={userData}
          data={productDetailsData?.product_details}
          isPdp={true}
          pos='31'
          position={'1'}
          disabled={productDetailsData?.product_details?.bank_name === "KOTAK MAHINDRA BANK"}
        />
      </div>
    )
  }
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')

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
  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const userData = localUserData && JSON.parse(localUserData)
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
        // setLoading(false)
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

  const handleApplyNow = (applyUrl) => {
    if (userData) {
      callAddLeadDetails(applyUrl)
    } else if (!userData) {
      router.push(`/${applyUrl}`)
    }
  }
  // const handleEligibilty = (urlSlug) => {
  //   // if (token) {
  //   //   router.push(`/credit-cards/eligibility?eligible=${urlSlug?.split('/')?.pop()}`)
  //   // } else router.push(`/credit-cards/eligibility/`)
  // }

  // useEffect(() => {
  //   if (userData?.eligible_product) {
  //     setEligibleCardsData([userData?.eligible_product])
  //   } else {
  //     //call get user profile api
  //   }
  // }, [])
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  //pdp impression
  const item = productDetailsData?.product_details
  const sendProductDetail = {
    event: 'view_item',
    ecommerce: {
      items: [
        {
          item_id: item?.product_id?.toString(),
          item_name: item?.card_name,
          index: 1,
          item_brand: item?.bank_name,
          item_category: 'Bank accounts detail',
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_category5: '',
          item_list_id: 'Bank Accounts Details',
          item_list_name: 'Bank Accounts Details',
          item_variant: item?.card_name,
          quantity: 1
        }
      ]
    }
  }

  useGaEvents(sendProductDetail)

  const ratingJson = addRatingJsonLd(productDetailsData, overallRatingData, 'min_bal_to_open_ac')

  useEffect(() => {
    const pathname = router?.asPath
    if (debitCardFeatureRef) {
      scrollIntoSection(pathname, '#debit-card-features', debitCardFeatureRef)
    }
    if (bankAccountsFeatureRef) {
      scrollIntoSection(pathname, '#bank-account-features', bankAccountsFeatureRef)
    }
    if (bankDetails) {
      scrollIntoSection(pathname, '#bank-account-details', bankDetails)
    }
    if (expertRef) {
      scrollIntoSection(pathname, '#expert-review', expertRef)
    }
    if (customerReviews) {
      scrollIntoSection(pathname, '#overall-rating', customerReviews)
    }
    if (moreAboutRef) {
      scrollIntoSection(pathname, '#more-about-product', moreAboutRef)
    }
    if (relatedCardRef) {
      scrollIntoSection(pathname, '#related-accounts', relatedCardRef)
    }
    if (videoRef) {
      scrollIntoSection(pathname, '#Video', videoRef)
    }
    if (serviceTabRef) {
      scrollIntoSection(pathname, '#more-ways-to-browse-services', serviceTabRef)
    }
  }, [router?.asPath])

  return (
    <>
      {/* <Head>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={ratingJson} />
      </Head> removed this added new in index file */}
      <div
        id='bank-account-details'
        className={`min:[1441px]:container  min-[1441px]:mx-auto 2xl:px-20 min-[1441px]:px-16 flex pt-[28px] gap-[20px] max-2xl:mx-[136px]  max-sm:mx-[10px] max-sm:gap-0 ${
          isTab && '!mx-[15px] gap-[1px]'
        } ${maxContent && '!container mx-auto'}`}
        ref={bankDetails}>
        <div>{isDeskTop && getLeftTabs()}</div>
        <div className='min-[1441px]:container  flex flex-col max-sm:px-2'>
          <div className='axis-card-top target-element'>
            <div className=' py-6  rounded-3xl bg-white'>
              <div className='flex flex-col'>
                <div className='flex px-6 sm:justify-between gap-[30px] cards-details-filter max-[577px]:flex-col'>
                  <div className='flex justify-center '>
                    <div className='xl:w-[200px] md:w-[180px] w-[180px] h-[122px]  rounded-lg flex justify-center items-center '>
                      <Link href={`/${productDetailsData?.product_details?.url_slug}`} prefetch={false}>
                        <Image
                          src={`${Img_URL}/${productDetailsData?.product_details?.product_image}`}
                          alt='card image'
                          width={200}
                          height={122}
                          className='h-full w-full bg-cover rounded-lg'
                          unoptimized={true}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className='flex flex-col items-start gap-[10px] max-sm:items-center'>
                    <div
                      id='bank-pdp-title'
                      className=" text-neutral-800 text-2xl  font-bold font-['Poppins']  w-[100%] max-sm:text-[15px] max-sm:leading-[22px] max-sm:text-center">
                      <h1
                        className='text-[25px] max-[577px]:text-[15px] font-bold max-[991px]:text-[18px] text-[#212529] leading-7 pb-2'
                        data-tooltip-target='tooltip-light'
                        data-tooltip-style='light'
                        data-te-toggle='tooltip'
                        title={`${productDetailsData?.product_details?.card_name.replace(/["']/g, ' ')}`}>
                        {productDetailsData?.product_details?.card_name}
                      </h1>
                    </div>
                    <div
                      className="text-neutral-800 text-[13px] font-normal font-['Poppins'] leading-[20.80px]"
                      data-tooltip-target='tooltip-light'
                      data-tooltip-style='light'
                      data-te-toggle='tooltip'></div>
                    <div className='flex sm:items-center  gap-4 md:mt-0  max-sm:gap-2 max-sm:flex-col'>
                      <div className='flex gap-[4px] rounded-full'>
                        <div className='border w-[36px] h-[36px] p-2 rounded-full'>
                          <Image
                            src={logo}
                            alt='img'
                            width={isDeskTop ? 48 : 29}
                            height={isDeskTop ? 48 : 29}
                            className='rounded-full  border   '
                          />
                        </div>
                        <div className='border rounded-full md:h-[36px]  py-2 max-sm:px-4 sm:px-2 lg:px-4  flex gap-2 items-center max-[320px]:px-2 max-sm:py-[3px]'>
                          <p className='xl:text-[18px] md:text-[14px]  rounded-full font-semibold text-[#212529]'>
                            {productDetailsData?.product_details?.rating}/5
                          </p>

                          <ReactStars
                            count={starCount}
                            value={productDetailsData?.product_details?.rating}
                            size={16}
                            edit={false}
                            color1={'#ccc'}
                            color2={'#49d49d'}
                          />
                        </div>
                      </div>
                      <div className='mt-[16px]'>{!isDeskTop && !isTab && getButtons()}</div>
                    </div>
                  </div>
                  {(isDeskTop || isTab) && getButtons()}
                </div>

                <div className='py-4 pb-0 max-md:px-2 max-sm:px-[10px] '>
                  <CreditListingBanner
                    businessmetaheadtag={productDetailsData?.product_details}
                    linesToShow={2}
                    creditDetails={true}
                  />
                </div>

                <div className='border-b-2 border-[#E6ECF1] mt-[24px]' ref={bankAccountsFeatureRef} />
                {(productDetailsData?.product_details?.min_bal_to_open_ac ||
                  productDetailsData?.product_details?.cashback_offer ||
                  productDetailsData?.product_details?.avg_mon_bal ||
                  productDetailsData?.product_details?.daily_txn_limit_online) && (
                  <>
                    <div
                      id='bank-account-features'
                      className="text-neutral-800 text-lg font-semibold font-['Poppins'] px-6 pt-4 ">
                      Account Features
                    </div>
                    <div className='grid grid-cols-3 pt-4 gap-8 px-6 max-[577px]:grid-cols-2 mb-[10px] '>
                      <CommonFeaturesComp
                        title='ACCOUNT'
                        bankDetailPage={true}
                        commonFeaturesData={productDetailsData?.product_details}
                      />
                    </div>
                    {/* <div className='grid grid-cols-4 gap-5  pt-[24px] gap-8 px-6 max-[479px]:grid-cols-2 '>
                      <CommonFeaturesComp
                        title='ACCOUNT_SECOND'
                        commonFeaturesData={productDetailsData?.product_details}
                      />

                    </div> */}
                  </>
                )}
                {/* features section */}
                <div className='grid grid-cols-2 py-4 gap-8 px-6 max-[577px]:grid-cols-1'>
                  <div className=' flex-col justify-start items-start gap-6 inline-flex'>
                    {productDetailsData?.product_details?.rate_of_interest && (
                      <div className='flex-col justify-start items-start gap-0.5 flex'>
                        <div className="text-neutral-800 text-[15px] font-medium font-['Poppins']">Interest Rate</div>

                        <div className="text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-normal">
                          {productDetailsData?.product_details?.rate_of_interest} %
                        </div>
                      </div>
                    )}

                    <div className='flex-col justify-start items-start gap-0.5 flex'>
                      <div className="text-neutral-800 text-[15px] font-medium font-['Poppins']">
                        Minimum Monthly Balance
                      </div>

                      <div className="text-neutral-800 symbole-rupee text-[15px] font-normal font-['Poppins'] leading-[30px]">
                        ₹ {productDetailsData?.product_details?.avg_mon_bal}
                      </div>
                    </div>

                    <div className='flex-col justify-start items-start gap-0.5 flex'>
                      <div className="text-neutral-800 text-[15px] font-medium font-['Poppins']">
                        Minimum Balance to Open Account
                      </div>
                      <div className="text-neutral-800 symbole-rupee text-[15px] font-normal font-['Poppins'] leading-[21px]">
                        ₹{' '}
                        {productDetailsData?.product_details?.min_bal_to_open_ac &&
                          productDetailsData?.product_details?.min_bal_to_open_ac}
                      </div>
                    </div>
                    {productDetailsData?.product_details?.cashback_offer && (
                      <>
                        {' '}
                        <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] mb-[6px] mt-[20px]">
                          Cashback Offer
                        </div>
                        <div className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-relaxed'>
                          <div
                            className='list-disc  space-y-2 text-[14px] product-list-data'
                            dangerouslySetInnerHTML={{
                              __html: `<div>${productDetailsData?.product_details?.cashback_offer}</div>`
                            }}></div>
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {productDetailsData?.product_details?.features && (
                      <>
                        <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] mb-[6px]">
                          Features
                        </div>

                        <div className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-relaxed'>
                          <div
                            className='list-disc  space-y-2 text-[14px] product-list-data'
                            dangerouslySetInnerHTML={{
                              __html: `<div>${productDetailsData?.product_details?.features}</div>`
                            }}></div>
                        </div>
                      </>
                    )}

                    {productDetailsData?.product_details?.welcome_offer && (
                      <>
                        {' '}
                        <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] mb-[6px] mt-[20px]">
                          Welcome Offer
                        </div>
                        <div className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-relaxed'>
                          <div
                            className='list-disc  space-y-2 text-[14px] product-list-data'
                            dangerouslySetInnerHTML={{
                              __html: `<div>${productDetailsData?.product_details?.welcome_offer}</div>`
                            }}></div>
                        </div>
                      </>
                    )}
                    {productDetailsData?.product_details?.reward_program && (
                      <>
                        {' '}
                        <div className="text-neutral-800 text-[15px] font-medium font-['Poppins'] mb-[6px] mt-[20px]">
                          Reward Program
                        </div>
                        <div className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-relaxed'>
                          <div
                            className='list-disc  space-y-2 text-[14px] product-list-data'
                            dangerouslySetInnerHTML={{
                              __html: `<div>${productDetailsData?.product_details?.reward_program}</div>`
                            }}></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div ref={debitCardFeatureRef}></div>
                {(productDetailsData?.product_details?.atm_with_limit_fpm ||
                  productDetailsData?.product_details?.debit_card_spend_limit ||
                  productDetailsData?.product_details?.card_rep_fee ||
                  productDetailsData?.product_details?.international_usag) && (
                  <>
                    <div className='border-b-2 border-[#E6ECF1] mt-[8px]' />
                    <div
                      id='debit-card-features'
                      className="text-neutral-800 text-lg font-semibold font-['Poppins'] px-6 pt-4 max-sm:text-[15px] leading-[22px]">
                      Debit Card Features
                    </div>
                    <div className='grid grid-cols-4 py-4 gap-8 px-6 max-[577px]:grid-cols-2 '>
                      <CommonFeaturesComp
                        title='DEBIT'
                        bankDetailPage={true}
                        commonFeaturesData={productDetailsData?.product_details}
                      />
                    </div>
                  </>
                )}
                {/* <ExperReview expertReviews={CONS_PROS} /> */}
              </div>
            </div>
          </div>
          <div ref={expertRef}>
            <ExpertReview ReviewsExpert={productDetailsData?.product_details} />
          </div>
          <div ref={customerReviews}>
            <OverallRating
              overallRatingData={overallRatingData}
              reviewsData={reviewsData}
              productDetailsData={productDetailsData}
            />
          </div>
        </div>
      </div>
      <div className='container mx-auto xl:px-8'>
        {/* <EligiblityCriteria isTab={isTab} /> */}
        <div ref={videoRef}>
          <VedioCheck productDetailsData={productDetailsData?.product_details} />
        </div>
        <div className=' max-sm:px-4 sm:px-6  lg:px-9 md:mx-3 lg:mx-0 xl:px-0'>
          <DetailsFindTailor isTab={isTab} bankAccounts={true} position='7' />
        </div>
        {relatedAccountsData?.alternate_product?.length > 0 && (
          <div className={` sm:px-4 lg:mx-8 max-sm:mx-[16px] mt-[80px] ${isTab && 'mx-[15px] gap-[1px]'}`}>
            <div className='flex justify-between mx-[25px]'>
              <div
                className=' flex justify-center pb-5 mx-auto  max-[1440px]:w-[90%] max-[1200px]:w-full max-[576px]:items-center px-20 max-[1200px]:px-0'
                ref={relatedCardRef}>
                <h2 className='text-[#212529] text-[28px] max-[1024px]:text-[28px] max-[771px]:text-[28px] max-[576px]:text-[22px] max-[479px]:text-[22px] max-[375px]:text-[20px] max-[320px]:text-[18px] text-center font-semibold'>
                  Related Accounts
                </h2>
              </div>
              {/* <div className=''>
                <button
                  type='submit'
                  className='py-3 w-full cursor-pointer lg:w-[160px] md:w-[180px] text-[15px] rounded-lg text-[#212529] border border-[#000] font-semibold max-sm:text-xs max-sm:p-[14px]'>
                  View More
                </button>
              </div> */}
            </div>
            <div id='related-accounts'>
              <AccountListRight
                isTab={isTab}
                addPagination={false}
                SavingCardListAll={relatedAccountsData?.alternate_product}
                url_slug={url_slug}
                title={true}
                getSortingOptionsPlp={() => {}}
              />
            </div>
          </div>
        )}
        {/* add long form component */}
        <div id='more-about-product' ref={moreAboutRef}>
          <CreditBeginnerCard longTerm={longFormData} />
        </div>
        {/* <HelplineNo isTab={isTab} /> */}
        <div className={`max-sm:mx-0 ${isTab && 'lg:mx-[15px] gap-[1px]'}`} ref={serviceTabRef}>
          <ServiceTabs isTab={isTab} size={size} serviceTabs={serviceTabs} position={'9'} />
        </div>
        {/* faq to be added */}
      </div>
    </>
  )
}

export default SavingAccountsDetails
