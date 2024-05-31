import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import accordionArrowall from '../../../../public/assets/accordion-down.svg'
import starRate from '../../../../public/assets/star-rate.svg'
import likeIcon from '../../../../public/assets/like-icon.svg'
import likeBg from '../../../../public/assets/likethumb.svg'
import dislikeIcon from '../../../../public/assets/dislike-icon.svg'
import closeIcon from '../../../../public/assets/closeIcon.svg'
import dislikeBg from '../../../../public/assets/dislike-thumb.svg'
import LoaderLogo from '../../../../public/assets/logo-loader.gif'
import verdSad from '../../../../public/assets/very-sad.svg'
import satisfied from '../../../../public/assets/satisfied.svg'
import good from '../../../../public/assets/good.svg'
import veryGood from '../../../../public/assets/very-good.svg'
import amazing from '../../../../public/assets/amazing.svg'
import Link from 'next/link'
import ReactStars from 'react-stars'
import { CardsdetailsFilter, DetailsDatabox } from '@/utils/alljsonfile/cardsdetailsfilter'
import { ListingfilterData } from '@/utils/alljsonfile/listingfilterdata'
import { AUTHUSER, BASE_URL, LEADAPPAPI, PRODUCTSAPI } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import {
  createImageFromInitials,
  getHash,
  getPromotionObject,
  getRandomColor,
  handleRemoveLocalstorage,
  sendEventToGTM
} from '@/utils/util'
import ProgressBars from '../ProgressBars'
import { useRouter } from 'next/router'
import OTPInput from 'react-otp-input'
import SubmitFormBtn from '../SubmitFormBtn'
import jwt from 'jwt-decode'
import Loader from '../../Leads/common/Loader'
import SuccessIcon from '../../Leads/common/SuccessIcon'
import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'
import ApplyNowButton from '../ApplyNowButton/ApplyNowButton'
import useGaEvents from '@/hooks/useGaEvents'
import { useWindowSize } from '@/hooks/useWindowSize'
import moment from 'moment'
import StarRatings from 'react-star-ratings'
import TagManager from 'react-gtm-module'

const CreditListingBanner = dynamic(() => import('@/core/component/Layout/creditCardList/CreditListingBanner'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})

const HowToApplyDetail = dynamic(() => import('@/core/component/common/CommonList/HowToApplyDetail'), {
  ssr: false
})

const EligibilityCriteriaDetail = dynamic(
  () => import('@/core/component/common/CommonList/EligibilityCriteriaDetail'),
  {
    ssr: false
  }
)
const DetailRelatedCards = dynamic(() => import('@/core/component/common/CommonList/DetailRelatedCards'), {
  ssr: false
})

const DetailsFindTailor = dynamic(() => import('@/core/component/common/CommonList/DetailsFindTailor'), {
  ssr: false
})
function CardDetailsFilterBox({
  productDetailsData,
  getallreview,
  getOverlallRating,
  productLongformcon,
  alternetRelatedproduct
}) {
  const router = useRouter()

  const queryHash = router?.asPath?.split('=')?.pop()
  const url_slug_scapia = productDetailsData?.product_details?.url_slug?.split('/')[2]
  const filter = queryHash && CardsdetailsFilter?.filter((item) => item?.linkhref === queryHash)
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')

  const userData = localUserData && JSON.parse(localUserData)

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  const [isActive, setIsactive] = useState(false)
  const [IdData, setIdData] = useState(filter?.[0]?.id || 1)
  const [responseData, setResponseData] = useState([])
  const [likeUnData, setLikeUnData] = useState([])
  const [liked, setLiked] = useState(false)
  const [unliked, setUnLiked] = useState(false)
  const [countlikeunlike, setCountLikeUnlike] = useState(0)
  const [ratingcustomer, setRatingCustomer] = useState(0)
  const LikeCount = countlikeunlike?.toString()
  const [commentdata, setcommentdata] = useState()
  const [reviewButton, setReviewButton] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectUnlikeId, setselectUnlikeId] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState(0)
  const [IstimeActive, setIsTimeActive] = useState(true)
  const [resendOtp, setResendOtp] = useState(false)
  const [loginPopup, setLoginPopup] = useState(false)
  const [otpdata, setOtpdata] = useState([])
  const [errMsg, setErrorMsg] = useState(false)
  const [errOtp, setErrorOtp] = useState(false)
  const [transactionid, setTransactionId] = useState([])
  const [otpmessage, setotpMessage] = useState([])
  const [messagetype, setMessageType] = useState([])
  const [istempotp, setTempOtp] = useState([])
  const [mobile, setMobile] = useState(userData?.mobile)
  const [tokentype, setTokenType] = useState('')
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)
  const [riviewError, setReviewError] = useState(false)
  const [errorHref, setErrorHref] = useState(false)
  const [scrollId, setScrollId] = useState('card-details')
  const [eligibleCardsData, setEligibleCardsData] = useState([])
  const [fieldValue, setFieldValue] = useState()
  const [emojiStatus, setEmojiStatus] = useState(0)

  const expertRef = useRef()
  const ratingRef = useRef()
  const relatedRef = useRef()
  const eligibilityRef = useRef()
  const moreAboutRef = useRef()
  const cardRef = useRef()
  const pageRoute = router?.asPath
  const size = useWindowSize()
  const isMobile = size?.width <= 576
  const data = { eventName: 'select_promotion', title: 'Check free credit score', position: '1', route: pageRoute }
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

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  useEffect(() => {
    if (time === 0) {
      setIsTimeActive(false)
      setResendOtp(true)
    }
  }, [time])

  useEffect(() => {
    if (token) {
      const decordtoken = jwt(token)

      const timecurrrunt = Date.now()
      const timestampexp = decordtoken?.exp

      const CurruntTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(timecurrrunt)

      function formatUnixTimestamp(timestampexp) {
        const dateObj = new Date(timestampexp * 1000)
        const month = dateObj.getMonth() + 1
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()
        const hours = dateObj.getHours()
        const minutes = dateObj.getMinutes()
        const seconds = dateObj.getSeconds()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(
          minutes
        )}:${formatTimeexp(seconds)} ${ampm}`
        return formattedDate
      }

      function formatTimeexp(time) {
        return time < 10 ? '0' + time : time
      }

      const formattedDateExp = formatUnixTimestamp(timestampexp)

      if (CurruntTime === formattedDateExp) {
        router.push('/login')
        toast.success(ApiMessage?.logoutmessage)
        handleRemoveLocalstorage()
      }
    }
  }, [])

  const handleLike = (index) => {
    if (!token) {
      toast.error(ApiMessage?.likeloginerror)
      return false
    } else {
      setSelectedId(index)
      setCountLikeUnlike(1)
      setLiked(true)
      setUnLiked(false)
      LikeUnlikeReview()
    }
  }
  const handleUnLike = (index) => {
    if (!token) {
      toast.error(ApiMessage?.likeloginerror)
      return false
    } else {
      setselectUnlikeId(index)
      setCountLikeUnlike(0)
      setUnLiked(true)
      setLiked(false)
      LikeUnlikeReview()
    }
  }

  useEffect(() => {
    if (loginPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [loginPopup])

  const handleWriteReview = (e) => {
    setReviewError(false)
    setErrorHref(false)
    const { value } = e.target
    const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
    if (!hrefRegex.test(value)) {
      setcommentdata(value)
    } else {
      setErrorHref(true)
    }
  }

  const dropdownRef = useRef(null)

  const handledropdown = () => {
    setIsactive(!isActive)
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
  }, [isActive || getallreview?.all_review.length > 0])

  const ProductUrlSlug = productDetailsData?.product_details?.url_slug.split('/')[2]

  const starCount = 5

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('review', responseData.review)
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp?.replace(/\D/g, '')

    setOtpdata(extractedOtp)

    if (extractedOtp?.length === 4) {
      LoginVerify(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }

  const handleChangeNumber = (e) => {
    const inputValue = e.target.value
    const extractedNumber = inputValue?.replace(/\D/g, '')

    if (extractedNumber?.length === 10) {
      setMobile(extractedNumber)
      setErrorMsg(false)
    } else if (extractedNumber?.length < 10) {
      setErrorMsg(true)
      setMobile(extractedNumber)
    }
    if (extractedNumber == '0000000000') {
      setZeroNumberValidation(true)
    }
  }

  const GetOvenProductReview = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + PRODUCTSAPI?.getOwnProductReview,
        {
          lead_profile_id: leadId,
          language_id: 1,
          product_url_slug: ProductUrlSlug
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setResponseData(response?.data)
        }
      })
      .catch((error) => {
        //
      })
  }

  const AddProductReview = (e) => {
    e?.preventDefault()
    if (!token) {
      setLoginPopup(true)
    } else {
      if (ratingcustomer === undefined || ratingcustomer === null) {
        toast.error('Please Select Rating')
      } else if (commentdata === undefined || commentdata === null || commentdata === '') {
        setReviewError(true)
      } else {
        axios
          .post(
            BASE_URL + PRODUCTSAPI?.reviewProductadd,
            {
              lead_profile_id: leadId,
              language_id: 1,
              product_url_slug: ProductUrlSlug,
              comment: commentdata,
              rating: String(Math.round(ratingcustomer))
            },
            { headers: headers }
          )
          .then((response) => {
            if (response?.data?.message == 'success') {
              setReviewError(false)
              setResponseData(response?.data)
              toast.success(ApiMessage?.addreview)
              setReviewButton(false)
            }
          })
          .catch((error) => {
            if (error?.response?.data?.message == 'failed') {
              toast.error(error?.response?.data?.reason)
            } else if (error?.response?.status == 422) {
              toast.error(error?.response?.data?.detail[0].msg)
            } else if (error?.response?.status == 403) {
              toast.error(error?.response?.data?.detail)
            } else if (error?.response?.status == 500) {
              toast.error(ApiMessage?.internalServerError)
            }
          })
      }
    }
  }
  const LikeUnlikeReview = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + PRODUCTSAPI?.likeunlikereview,
        {
          pk_review: 4,
          lead_profile_id: leadId,
          vote: LikeCount
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setLikeUnData(response?.data)
          {
            !liked ? toast.success(ApiMessage?.likeunlike) : toast.success(ApiMessage?.likeun)
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status == 422) {
          toast.error(ApiMessage?.likeloginerror)
        } else if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        }
      })
  }

  useEffect(() => {
    if (token) {
      GetOvenProductReview()
    }
  }, [token])

  const onChangeRating = (e) => {
    setRatingCustomer(e)
    setEmojiStatus(e)
  }

  const handleGTM = (profileId) => {
    TagManager?.dataLayer({
      dataLayer: {
        event: 'user_login',
        lead_profile_id: profileId,
        name: userData?.full_name,
        cust_id: profileId,
        customer_name : userData?.full_name,
        customer_mobile_no : mobile
      },
    });
  }

  const LoginOtp = (e) => {
    e?.preventDefault()
    setLoading(true)
    axios
      .post(
        BASE_URL + AUTHUSER?.initinatOtp,
        {
          mobile_no: mobile,
          device_id: '',
          condition_accepted: true,
          whatsaap_consent: false
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setResponseData(response?.data)
          setTransactionId(response?.data?.transaction_id)
          setotpMessage(response?.data?.message)
          setMessageType(response?.data?.type)
          setTempOtp(response?.data?.is_temp_otp)
          toast.success(ApiMessage?.otpsentsuccessfully)
          setIsOpen(true)
          setIsTimeActive(true)
          setResendOtp(false)
          setTime(60)
          setLoading(false)
          setDisbaled(true)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        } else if (error?.response?.status == 503) {
          toast.error(ApiMessage?.serviceUnavailable)
        }
        setLoading(false)
      })
  }

  const LoginVerify = (e) => {
    if (e.length == 4) {
      setLoadingOtp(true)
      window.location.reload()

      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionid,
            otp: e,
            mobile_no: mobile,
            type: messagetype,
            is_temp_otp: istempotp
          },
          { headers: headers }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            setResponseData(response?.data)
            setTokenType(response?.data?.data?.token_type)
            localStorage.setItem('token', response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
            localStorage.setItem('auth_Otp', e)
            handleGTM(response?.data?.data?.lead_profile_id)
            toast.success(ApiMessage?.loginverify)
            if (response?.data?.data?.is_first_time_user === true) {
              router.push('/user/setprofile')
            } else {
            }
            setIsOpen(false)
            setLoginPopup(false)
            setLoadingOtp(false)
            setDisbaled(true)
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(ApiMessage?.validotpenter)
            setLoadingOtp(false)
          } else if (error?.response?.status == 500) {
            toast.error(ApiMessage?.internalServerError)
          }
          setLoadingOtp(false)
        })
    }
  }

  const handleNumberEdit = () => {
    setIsOpen(false)
    setOtpdata([])
    setLoading(false)
    setLoadingOtp(false)
  }

  const offset = 110 // Replace this with your desired offset value

  const handleScroll = (entries, observer) => {
    entries.forEach((entry) => {
      const elementID = entry.target.id
      const elementTop = entry.boundingClientRect.top

      if (elementTop < offset) {
        setScrollId(elementID)
      }
    })
  }

  const h = getHash()
  // call add lead details api
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const callAddLeadDetails = () => {
    setLoading(true)
    const url_slug = productDetailsData?.product_details?.apply_url?.split?.('/')?.pop()
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
      // advisor_id: null
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
        setLoading(false)
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
        setLoading(false)
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 422 && url_slug) {
          toast.error(error?.response?.data?.detail[0]?.msg)
          if (error?.response?.data?.message?.fullName) {
            toast.error(error?.response?.data?.message?.fullName[0])
          }
          if (error?.response?.data?.message?.panNo) {
            toast.error(error?.response?.data?.message?.panNo[0])
          }
        } else if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        }
      })
  }

  const options = {
    root: null,
    threshold: 0
  }

  const observer = new IntersectionObserver(handleScroll, options)

  const targetElements = document.querySelectorAll('.target-element')
  targetElements.forEach((element) => {
    observer.observe(element)
  })

  useEffect(() => {
    if (userData?.eligible_product?.credit_cards) {
      setEligibleCardsData(userData?.eligible_product?.credit_cards)
    } else {
      //call get user profile api
    }
  }, [])

  const checkEligibility = () => {
    if (eligibleCardsData) {
      const names = router?.asPath?.split('/')?.pop()
      const eligibleNames = eligibleCardsData
      if (eligibleNames?.includes(names)) {
        return true
      } else return false
    }
  }
  const isEligible = checkEligibility()

  const formattedRatingDate = moment(productDetailsData?.product_details?.published_time).format('DD-MM-YYYY')
  const ratingValue =
    getOverlallRating?.data?.over_all_rating && getOverlallRating?.data?.over_all_rating !== 0
      ? getOverlallRating?.data?.over_all_rating
      : '5'
  const ratingCount =
    getOverlallRating?.data?.total_reviews && getOverlallRating?.data?.total_reviews !== 0
      ? getOverlallRating?.data?.total_reviews
      : '1'
  const price =
    productDetailsData?.product_details?.joining_fee && productDetailsData?.product_details?.joining_fee === 0
      ? 'Free'
      : productDetailsData?.product_details.joining_fee

  function addRatingJsonLd() {
    const reviewJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Product',
        name: productDetailsData?.product_details?.card_name || ''
      },
      author: {
        '@type': 'Person',
        name: productDetailsData?.product_details?.publisher_name
      },
      datePublished: formattedRatingDate || '',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: productDetailsData?.product_details?.rating || '5',
        bestRating: '5'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ratingValue,
        bestRating: '5',
        ratingCount: ratingCount
      },
      offers: {
        '@type': 'Offer',
        price: price, //joining fee
        priceCurrency: 'INR'
      },
      reviewBody: productDetailsData?.product_details?.rating_details || ''
    }

    const jsonLdString = JSON.stringify(reviewJsonLd)

    return {
      __html: jsonLdString
    }
  }
  const ratingJson = addRatingJsonLd()

  useEffect(() => {
    if (router?.asPath?.includes('#expert-review') && expertRef?.current) {
      expertRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    if (router?.asPath?.includes('#overall-rating')) {
      ratingRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    if (router?.asPath?.includes('#related-card-offer')) {
      relatedRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    if (router?.asPath?.includes('#eligibility-criteria')) {
      eligibilityRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    if (router?.asPath?.includes('#more-about-product')) {
      moreAboutRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
    if (router?.asPath?.includes('#card-details')) {
      cardRef?.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [router?.asPath])

  //pdp impression
  const route = router?.pathname

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
          item_category: 'Credit Card detail',
          item_category2: '',
          item_category3: '',
          item_category4: '',
          item_category5: '',
          item_list_id: 'Credit Card Details',
          item_list_name: 'Credit Card Details',
          item_variant: item?.card_name,
          quantity: 1
        }
      ]
    }
  }

  useGaEvents(sendProductDetail)

  const clickPromotion = (index, item) => {
    const data = { eventName: 'select_promotion', title: item?.detaildata, position: index + 1, route: pageRoute }
    sendEventToGTM(getPromotionObject(data))
  }
  const isZeroOrNull = !getOverlallRating?.data?.over_all_rating || getOverlallRating?.data?.over_all_rating === 0

  return (
    <>
      {/* <Head>
        <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={ratingJson} />
      </Head> */}
      <Toaster />
      {isLoading || isLoadingOtp ? (
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden'>
                <Image src={LoaderLogo} className='w-[150px] h-[150px] bg-white rounded-full' alt='imageloader' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className='container px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
        <div className=''>
          <div className='grid 2xl:gap-8 grid-cols-5  gap-4   max-[768px]:grid-cols-1'>
            <div className='col-span-1 bg-none  relative hidden lg:block'>
              <div className='p-5 max-[1024px]:p-2 bg-white filter-credit sticky top-20 rounded-3xl'>
                <div className='pt-4 '>
                  {CardsdetailsFilter.map((data, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setIdData(data?.id)
                          clickPromotion(index, data)
                        }}>
                        <Link
                          href={`/credit-cards/${router?.query['category-name']}/${router.query['cards-details']}${data?.linkhref}`}
                          prefetch={false}>
                          <p
                            id={`${index}+'cd+btn'`}
                            className={
                              IdData === data.id
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
            </div>

            <div className='col-span-4 flex flex-col lg:gap-6 md:gap-4 ' id='card-details' ref={cardRef}>
              <div className='axis-card-top target-element'>
                <div className=' py-6  rounded-3xl bg-white'>
                  <div className='flex px-6  gap-5   max-[479px]:flex-col cards-details-filter'>
                    <div className=''>
                      <div id='pdp-1-img' className='xl:w-[240px] md:w-[180px] '>
                        <Image
                          src={`${Img_URL}/${productDetailsData?.product_details?.product_image}`}
                          alt='card image'
                          width={200}
                          height={160}
                          className='xl:w-full md:w-full max-[479px]:mx-auto'
                          unoptimized={true}
                        />
                      </div>
                    </div>
                    <div className='px-4  w-[100%] xl:pr-0 md:px-4 max-[375px]:px-0'>
                      <div className=' grid grid-cols-4 max-[1440px]:grid-cols-3 max-[576px]:grid-cols-1'>
                        <div className='col-span-3 max-[1440px]:col-span-2 max-[576px]:pb-6 text-[#212529] max-[479px]:!text-center'>
                          <h1
                            id='pdp-name-2'
                            className='text-[24px] font-bold leading-9 w-[60%] max-[1440px]:w-[84%] pb-2  max-[1200px]:w-[94%] max-[834px]:w-full max-[479px]:w-full  max-[479px]:mx-auto max-[1024px]:w-[75%] max-[884px]:leading-8 max-[479px]:text-center max-[479px]:text-[14px] cursor-pointer max-[479px]:leading-8'>
                            {productDetailsData?.product_details?.card_name}
                          </h1>

                          <span
                            className='text-[14px] leading-7  pb-3 text-[#212529] max-[479px]:!text-center'
                            data-tooltip-target='tooltip-light'
                            data-tooltip-style='light'
                            data-te-toggle='tooltip'
                            title={`${productDetailsData?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}`}>
                            {productDetailsData?.product_details?.welcome_benefits?.replace(/["']/g, ' ')}
                          </span>

                          <div className='flex items-center gap-4 mt-2 max-[479px]:justify-center '>
                            <div>
                              <Image
                                src={DetailsDatabox.logoimg}
                                alt='img'
                                width={45}
                                height={50}
                                className=' border rounded-full p-2 w-[45px] h-[45px]'
                              />
                            </div>
                            {productDetailsData?.product_details?.rating === 0 ||
                            !productDetailsData?.product_details?.rating ? (
                              'NA'
                            ) : (
                              <div className='border rounded-full py-1 px-4 flex gap-2  max-[320px]:px-2 items-center product-starts-rating'>
                                <p className='xl:text-[18px] md:text-[14px] font-semibold '>
                                  {productDetailsData?.product_details?.rating}/5
                                </p>

                                {/* <ReactStars
                                  count={starCount}
                                  size={24}
                                  value={productDetailsData?.product_details?.rating}
                                  edit={false}
                                  color1={'#ccc'}
                                  color2={'#49d49d'}
                                /> */}
                                {productDetailsData?.product_details?.rating && (
                                  <StarRatings
                                    rating={productDetailsData?.product_details?.rating}
                                    starRatedColor='#49d49d'
                                    numberOfStars={starCount}
                                    name='rating'
                                    starDimension='24px'
                                    starSpacing='0'
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          id='apply-card'
                          className={`${
                            isMobile
                              ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-3 w-full justify-between items-center'
                              : ''
                          }  flex md:flex-col lg:flex-col  items-center gap-[14px]`}>
                          <ApplyNowButton
                            userData={userData}
                            data={productDetailsData?.product_details}
                            isPdp={true}
                            pos='3'
                            disabled={productDetailsData?.product_details?.bank_name === "KOTAK MAHINDRA BANK" || url_slug_scapia === "scapia"}
                          />
                          {isEligible ? (
                            <button
                              id='eligb-card-cc-pdp'
                              className='flex gap-2 justify-center cursor-pointer business-right-text py-3 w-full lg:w-[160px] rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                              {' '}
                              <SuccessIcon />
                              Eligible
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                router.push(
                                  `/credit-cards/eligibility?eligible=${
                                    productDetailsData?.product_details?.url_slug.split('/')[2]
                                  }`
                                )
                              }}
                              className=' business-right-text py-3 w-full lg:w-[160px] md:w-full rounded-lg text-[#212529] border border-[#000] font-semibold max-[320px]:text-[13px] max-[280px]:text-[11px]'>
                              Check Eligibility
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='py-4 max-md:px-2 max-sm:px-[10px] border-b'>
                    <CreditListingBanner
                      businessmetaheadtag={productDetailsData?.product_details}
                      linesToShow={2}
                      creditDetails={true}
                    />
                    {/* </div> */}
                  </div>

                  <div className='grid grid-cols-2 py-4 gap-8 px-6 max-[479px]:grid-cols-1'>
                    <div className='card-left'>
                      <div className='mt-4 text-[#212529]'>
                        <p className='pb-2 text-[18px] font-semibold'>{DetailsDatabox.category}</p>
                        <span
                          className='text-[14px] leading-7 mt-2 pb-3 !text-[#212529] max-[479px]:!text-center'
                          data-tooltip-target='tooltip-light'
                          data-tooltip-style='light'
                          data-te-toggle='tooltip'
                          title={`${productDetailsData?.product_details?.welcome_benefits.replace(/["']/g, ' ')}`}>
                          {productDetailsData?.product_details?.welcome_benefits.replace(/["']/g, ' ')}
                        </span>
                      </div>
                      <div className='mt-8 text-[#212529]'>
                        <p className='pb-2 text-[18px] font-semibold'>{DetailsDatabox.recommended}</p>
                        <div className='flex items-center gap-2'>
                          <p className='text-[15px]  py-1'>{productDetailsData?.product_details?.min_credit_score}</p>
                          <div className='tooltip details-page-tooltip'>
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
                          </div>
                        </div>
                        <div onClick={() => sendEventToGTM(getPromotionObject(data))}>
                          <Link
                            href='/cibil-credit-score-check'
                            className='text-[15px] pt-3  !underline text-[#5a5add] hover:!text-[#5a5add]'
                            prefetch={false}>
                            Check free credit score
                          </Link>
                        </div>
                      </div>
                      <div className='mt-8 text-[#212529]'>
                        <p className='pb-2 text-[18px] font-semibold'>{DetailsDatabox.introtitle}</p>
                        {productDetailsData?.product_details?.apr && (
                          <div className=''>
                            <p className='text-[15px]  py-1 w-[80%]'>
                              {productDetailsData?.product_details?.apr}% annual percentage rate
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='card-right'>
                      {productDetailsData?.product_details?.features && (
                        <div className='mt-4 text-[#212529]'>
                          <p className='pb-2 text-[18px] font-semibold'>{DetailsDatabox.features}</p>
                          <div
                            className='list-disc  space-y-2 text-[14px] product-list-data'
                            dangerouslySetInnerHTML={{
                              __html: `<div>${productDetailsData?.product_details?.features}</div>`
                            }}></div>
                        </div>
                      )}
                      {productDetailsData?.product_details?.welcome_offer && (
                        <div className='mt-8 text-[#212529]'>
                          <p className='pb-2 text-[18px] font-semibold'>{DetailsDatabox.welcomeoffer}</p>
                          <div
                            className='list-disc  space-y-2 text-[14px] product-list-data'
                            dangerouslySetInnerHTML={{
                              __html: `<div>${productDetailsData?.product_details?.welcome_offer}</div>`
                            }}></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='mt-4 card-bottom text-[#212529]'>
                    <div className='border-t px-6 py-4'>
                      <div className='flex justify-between items-center'>
                        <p className='text-[18px] font-semibold pb-[10px]'>{DetailsDatabox.additionalcard}</p>
                      </div>

                      <div className='grid grid-cols-4 gap-0  max-[576px]:grid-cols-2 max-[576px]:gap-5 max-[479px]:grid-cols-1 max-[479px]:gap-4'>
                        <div className=''>
                          <p className='text-[15px] font-bold '>{DetailsDatabox.fees}</p>
                          <p className='text-[13px] font-normal'>
                            {productDetailsData?.product_details.annual_fee == 0 ? (
                              <div className='flex flex-col'>
                                <span>Free</span>
                                {/* <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span> */}
                              </div>
                            ) : (
                              <div className='flex flex-col'>
                                <span className='symbole-rupee'>
                                  ₹ {productDetailsData?.product_details.annual_fee} /-
                                </span>
                                <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span>
                              </div>
                            )}
                          </p>
                        </div>

                        <div className=''>
                          <p className='text-[15px] font-bold'>{DetailsDatabox.joiningfees}</p>
                          <p className='text-[13px] font-normal'>
                            {productDetailsData?.product_details.joining_fee == 0 ? (
                              <div className='flex flex-col'>
                                <span>Free</span>
                                {/* <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span> */}
                              </div>
                            ) : (
                              <div className='flex flex-col'>
                                <span className='symbole-rupee'>
                                  ₹ {productDetailsData?.product_details.joining_fee} /-
                                </span>
                                <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span>
                              </div>
                            )}
                          </p>
                        </div>

                        <div className=''>
                          <p className='text-[15px] font-bold'>{DetailsDatabox?.foreignfee}</p>
                          <div className='flex flex-col'>
                            <p className='text-[13px] font-normal pt-1'>
                              {productDetailsData?.product_details?.foreign_txn_fee}
                            </p>
                            <span className='font-normal text-[12px] mt-[4px]'>*Applicable Taxes</span>
                          </div>
                        </div>

                        <div className='target-element' id='expert-review' ref={expertRef}>
                          <p className='text-[15px] font-bold'>{DetailsDatabox.travelassistance}</p>
                          {productDetailsData?.product_details?.fraud_liability && (
                            <p className='text-[13px] font-normal pt-1'>
                              {productDetailsData?.product_details?.fraud_liability}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='expert-review max-[576px]:my-6 target-element'>
                <div className=' py-6  rounded-3xl bg-white'>
                  <div className='grid grid-cols-3 py-4 gap-20 px-6 max-[1200px]:gap-8 max-[1024px]:grid-cols-2  max-[1024px]:gap-0 max-[576px]:grid-cols-1 max-[576px]:gap-5 expert-review'>
                    <div className='card-left'>
                      <div className='mt-4 text-[#212529]'>
                        <h2 className='pb-4 text-[18px] font-semibold'>Expert Review </h2>
                        {productDetailsData?.product_details?.rating === 0 ? (
                          'NA'
                        ) : (
                          <div className='flex items-center gap-6 justify-start max-[1024px]:justify-start pb-2 max-[479px]:gap-4'>
                            <p className='text-[15px] text-[#212529] font-medium max-[1024px]:w-[40%]'>Rating:</p>
                            <div className='flex items-center gap-2'>
                              {/* <ReactStars
                                count={starCount}
                                size={22}
                                value={productDetailsData?.product_details?.rating}
                                edit={false}
                                color1={'#ccc'}
                                color2={'#49d49d'}
                              /> */}
                              {productDetailsData?.product_details?.rating && (
                                <StarRatings
                                  rating={productDetailsData?.product_details?.rating}
                                  starRatedColor='#49d49d'
                                  numberOfStars={starCount}
                                  name='rating'
                                  starDimension='22px'
                                  starSpacing='0'
                                />
                              )}

                              <p className='text-[15px] font-bold text-[#212529] '>
                                {productDetailsData?.product_details?.rating}/5
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='card-right col-span-2 max-[1024px]:col-span-1'>
                      <div className='mt-4 text-[#212529]'>
                        <h2 className='pb-4 text-[18px] font-semibold'>
                          {productDetailsData?.product_details?.rating_header}
                        </h2>
                        <p className='text-[15px]  py-1 leading-6 w-[90%] max-[576px]:w-full'>
                          {productDetailsData?.product_details?.rating_details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='overall-rating  max-[576px]:my-6 target-element' id='overall-rating' ref={ratingRef}>
                <div className=' py-6  rounded-3xl bg-white'>
                  <div className='grid grid-cols-3 py-8 gap-32 px-6  max-[1024px]:grid-cols-2 max-[1024px]:gap-8 max-[576px]:grid-cols-1 max-[576px]:gap-8  max-[576px]:py-0 max-[479px]:border-b-0 '>
                    <div className='card-left max-[479px]:px-5'>
                      {getOverlallRating && (
                        <div className='mt-4 text-[#212529]'>
                          <h2 className='pb-4 text-[18px] font-semibold max-[479px]:text-center max-[479px]:pb-8'>
                            Overall Rating
                          </h2>

                          <div className='bg-[#DEF7ED] py-2.5 px-5 rounded-xl text-center max-[479px]:mb-4'>
                            <p className=' text-[30px] font-bold text-center'>
                              {!isZeroOrNull ? getOverlallRating?.data?.over_all_rating : 'NA'}
                            </p>

                            <div className='text-center over-rate-star flex justify-center'>
                              {/* <ReactStars
                                count={starCount}
                                size={26}
                                value={getOverlallRating?.data?.over_all_rating}
                                edit={false}
                                isHalf={true}
                                color1={'#ccc'}
                                color2={'#49d49d'}
                              /> */}
                              {isZeroOrNull ? (
                                ''
                              ) : (
                                <StarRatings
                                  rating={getOverlallRating?.data?.over_all_rating}
                                  starRatedColor='#49d49d'
                                  numberOfStars={starCount}
                                  name='rating'
                                  starDimension='26px'
                                  starSpacing='0'
                                />
                              )}
                            </div>
                            {getOverlallRating?.data?.total_reviews === 0 ? (
                              ''
                            ) : (
                              <p className='text-[13px] text-[#272727] font-semibold'>
                                Based on {getOverlallRating?.data?.total_reviews} reviews
                              </p>
                            )}
                          </div>
                          {Object.keys(getOverlallRating?.data?.rating)
                            .sort((a, b) => b - a)
                            .map((rating) => (
                              <div className='flex items-center gap-6 justify-start pt-4' key={rating}>
                                <p className='text-[15px] text-[#212529] font-medium flex items-center gap-2'>
                                  <Image src={starRate} className='' alt='img' />
                                  {rating}
                                </p>
                                <div className='flex items-center gap-2 max-[1024px]:w-full w-full'>
                                  <ProgressBars
                                    rating={getOverlallRating?.data?.rating[rating]}
                                    maxRating={Object.values(getOverlallRating?.data?.rating).reduce(
                                      (acc, cur) => acc + cur
                                    )}
                                  />

                                  <p className='text-[15px] font-bold text-[#212529] '>
                                    {getOverlallRating?.data?.rating[rating]
                                      ? getOverlallRating?.data?.rating[rating]
                                      : 'NA'}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className='card-right col-span-2 max-[1024px]:col-span-1 max-[479px]:pb-8'>
                      <div className='mt-4 text-[#212529]'>
                        <h2 className='pb-4 text-[18px] font-semibold max-[479px]:text-[20px] max-[479px]:text-center'>
                          Customer Review
                        </h2>

                        <form
                          onSubmit={handleSubmit}
                          className='rounded-2xl border px-14 py-8 text-center max-[1024px]:px-8  max-[479px]:p-0  max-[479px]:border-0'>
                          <p className='text-[15px] text-[#212529] '>Let us know how you feel about the card</p>
                          <div className='py-2.5'>
                            {((emojiStatus === 0 || emojiStatus === 0.5) && (
                              <>
                                <Image src={good} className='mx-auto' alt='img' />
                                <p className='text-[18px] font-semibold pt-2'>Okay!</p>
                              </>
                            )) ||
                              ((emojiStatus === 1 || emojiStatus === 1.5) && (
                                <>
                                  <Image src={verdSad} className='mx-auto' alt='img' />
                                  <p className='text-[18px] font-semibold pt-2'>Very Bad!</p>
                                </>
                              )) ||
                              ((emojiStatus === 2 || emojiStatus === 2.5) && (
                                <>
                                  <Image src={satisfied} className='mx-auto' alt='img' />
                                  <p className='text-[18px] font-semibold pt-2'>Satisfied!</p>
                                </>
                              )) ||
                              ((emojiStatus === 3 || emojiStatus === 3.5) && (
                                <>
                                  <Image src={good} className='mx-auto' alt='img' />
                                  <p className='text-[18px] font-semibold pt-2'>Good!</p>
                                </>
                              )) ||
                              ((emojiStatus === 4 || emojiStatus === 4.5) && (
                                <>
                                  <Image src={veryGood} className='mx-auto' alt='img' />
                                  <p className='text-[18px] font-semibold pt-2'>Very Good!</p>
                                </>
                              )) ||
                              (emojiStatus === 5 && (
                                <>
                                  {' '}
                                  <Image src={amazing} className='mx-auto' alt='img' />
                                  <p className='text-[18px] font-semibold pt-2'>Amazing!</p>
                                </>
                              ))}
                          </div>

                          <div className='text-center over-rate-star flex justify-center'>
                            <ReactStars
                              count={starCount}
                              size={35}
                              onChange={onChangeRating}
                              value={ratingcustomer}
                              isHalf={false}
                              color1={'#ccc'}
                              color2={'#49d49d'}
                            />
                          </div>

                          <div>
                            <p className='text-[15px] font-semibold pt-4 pb-2'>Write a review</p>
                            <textarea
                              id='review'
                              name='review'
                              className={
                                errorHref || riviewError
                                  ? 'border !border-red-500 rounded-xl focus:outline-none p-4 text-[15px] w-full'
                                  : 'border rounded-xl focus:outline-none p-4 text-[15px] w-full'
                              }
                              onChange={(e) => {
                                if (e.target.value) {
                                  setReviewButton(true)
                                }
                                handleWriteReview(e)
                              }}
                              placeholder='Let us know what you liked or disliked '
                              rows='6'
                              value={commentdata}
                              cols='50'></textarea>
                            {riviewError && (
                              <p className='text-[12px] text-left text-[#FF000F] font-no mt-2'>
                                Please enter write a review
                              </p>
                            )}
                            {errorHref && (
                              <p className='text-[12px] text-left text-[#FF000F] font-no mt-2'>
                                {ApiMessage?.linkError}
                              </p>
                            )}
                          </div>
                          <div className='mt-5'>
                            <button
                              type='submit'
                              onClick={AddProductReview}
                              className='py-3 w-full cursor-pointer lg:w-[160px] md:w-full text-[15px] rounded-lg text-[#212529] border border-[#000] font-semibold'>
                              Submit Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {getallreview?.all_review.length > 0 && (
                    <div className='pt-10 px-6 text-[#212529] details-top-review border-t'>
                      <div className='flex justify-between items-center pb-8'>
                        <h3 className='text-[18px] font-semibold'>Top Reviews</h3>
                        <div className='relative'>
                          <button
                            className='inline-flex cursor-pointer w-full justify-between gap-x-1.5 rounded-md bg-[#E6ECF133] text-[15px] px-3 py-2 text-sm font-normal text-gray-900 shadow-sm border border-[#E6ECF1] '
                            type='button'
                            ref={dropdownRef}
                            onClick={(e) => handledropdown(e)}>
                            Latest Reviews
                            <span className=' w-5'>
                              {isActive ? (
                                <Image
                                  src={accordionArrowall}
                                  alt='up'
                                  width={24}
                                  height={24}
                                  priority={true}
                                  className=' rotate-180 w-5 h-5 shrink-0'
                                />
                              ) : (
                                <Image
                                  src={accordionArrowall}
                                  alt='down'
                                  width={24}
                                  height={24}
                                  priority={true}
                                  className=' w-5 h-5 shrink-0'
                                />
                              )}
                            </span>
                          </button>
                          {isActive ? (
                            <ul className='absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left p-2 text-base shadow-lg dark:bg-neutral-700 w-full'>
                              <li>Most Recent</li>
                              <li>Positive First</li>
                              <li>Negative First</li>
                            </ul>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      {getallreview?.all_review?.map((reviewdata, index) => {
                        return (
                          <div key={index}>
                            <div className='pb-8 border-b text-[#212529]'>
                              <div className='flex  gap-4 pt-5 '>
                                <Image
                                  id='preview'
                                  width={60}
                                  height={60}
                                  className='h-[60px] w-[60px] rounded-full'
                                  alt='profile-pic'
                                  src={createImageFromInitials(500, reviewdata?.reviewer_name, getRandomColor())}
                                />
                                <div>
                                  <h4 className='text-[15px] font-semibold'>{reviewdata?.reviewer_name}</h4>
                                  {
                                    reviewdata?.rating === 0 ? (
                                      'NA'
                                    ) : (
                                      <ReactStars
                                        count={starCount}
                                        size={24}
                                        value={reviewdata?.rating}
                                        edit={false}
                                        color1={'#ccc'}
                                        color2={'#49d49d'}
                                      />
                                    )
                                    // reviewdata?.rating && (
                                    //   <StarRatings
                                    //     rating={reviewdata?.rating}
                                    //     starRatedColor='#49d49d'
                                    //     numberOfStars={starCount}
                                    //     name='rating'
                                    //     starDimension='24px'
                                    //     starSpacing='0'
                                    //   />
                                    // )
                                  }
                                  <div className=''>
                                    <p className='pt-3 text-[15px] font-normal text-justify'> {reviewdata?.comment}</p>
                                    <div className='flex items-center gap-3 pt-4'>
                                      <p className='text-[13px] font-normal'>Was this helpful? </p>
                                      <div className='flex items-center cursor-pointer gap-3'>
                                        <button onClick={(e) => handleLike(reviewdata?.review_pk)}>
                                          <Image
                                            src={selectedId === reviewdata?.review_pk ? likeBg : likeIcon}
                                            className='cursor-pointer'
                                            alt='img'
                                          />
                                        </button>
                                        <button onClick={(e) => handleUnLike(reviewdata?.review_pk)}>
                                          <Image
                                            src={selectUnlikeId === reviewdata?.review_pk ? dislikeBg : dislikeIcon}
                                            className='cursor-pointer'
                                            alt='img'
                                          />
                                        </button>
                                      </div>
                                      <p className='text-[13px] font-normal'>Report </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {loginPopup && (
          <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

            <div className='fixed inset-0 z-50 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
                <div className='relative transform overflow-hidden rounded-lg p-8 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <button
                      className='flex absolute cursor-pointer right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                      onClick={() => setLoginPopup(false)}>
                      <Image
                        src={closeIcon}
                        className='w-[15px] max-xs:w-[13px] h-auto'
                        width={15}
                        height={15}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                    <div className='sm:flex sm:items-center justify-center w-full'>
                      <div>
                        <div>
                          <h3 className='text-2xl max-[479px]:text-[18px] text-center py-2 font-semibold text-[#212529]'>
                            Login
                          </h3>
                          <p className='text-center py-1 text-[15px] max-[479px]:text-[13px] text-[#212529]'>
                            Hey, Please enter your details to login to your account
                          </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <p className='text-[13px] font-semibold mt-[35px] max-[834px]:mt-5 text-[#212529]'>
                            Phone Number
                          </p>
                          <div
                            className={
                              errMsg || zeroNumberValidation
                                ? 'w-full flex items-center gap-[18px] h-[48px] border border-[#FF000F] rounded-md mt-1'
                                : 'w-full flex items-center gap-[18px] h-[48px] border border-[#C2CACF] rounded-md mt-1'
                            }>
                            <div>
                              <p className='pl-[20px] text-[15px] text-[#212529]'>+91</p>
                            </div>
                            <div>
                              <input
                                type='tel'
                                name='phone'
                                id='phone'
                                className='border-none outline-none'
                                placeholder='9999999999'
                                onChange={(e) => handleChangeNumber(e)}
                                value={mobile}
                                required
                                maxLength={10}
                              />
                            </div>
                          </div>
                          {errMsg && (
                            <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberError}</p>
                          )}
                          {zeroNumberValidation && (
                            <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
                          )}
                          <div className='text-center mt-[30px] max-[479px]:text-center'>
                            <SubmitFormBtn
                              name={!isLoading ? 'Send OTP' : <Loader />}
                              disabled={mobile?.length < 10 || mobile === undefined || isLoading}
                              onClick={LoginOtp}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalIsOpen && (
          <div className='relative z-60' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

            <div className='fixed inset-0 z-50 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
                <div className='relative transform overflow-hidden rounded-lg p-8 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <button
                      className='flex absolute cursor-pointer right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                      onClick={() => {
                        setIsOpen(false)
                        setLoginPopup(false)
                      }}>
                      <Image
                        src={closeIcon}
                        className='w-[15px] max-xs:w-[13px] h-auto'
                        width={15}
                        height={15}
                        priority={true}
                        alt='img_text'
                      />
                    </button>
                    <div className='sm:flex sm:items-center justify-center w-full'>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0'>
                        <h3
                          className='text-2xl max-[479px]:text-[18px] text-center py-2 font-semibold text-[#212529]'
                          id='modal-title'>
                          OTP Sent!
                        </h3>
                        <p className='text-center py-1 text-[15px] max-[479px]:text-[13px] text-[#212529]'>
                          {ApiMessage?.otpContent}
                        </p>
                        <span className='text-center py-1 text-[15px] max-[479px]:text-[13px] text-[#212529]'>
                          +91 {mobile}
                        </span>{' '}
                        <button
                          onClick={handleNumberEdit}
                          className='text-[#49D49D] cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
                          Edit Number
                        </button>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className='flex mt-4 justify-center'>
                      <div className='space-x-2 otp-data-box text-[#212529]'>
                        <OTPInput
                          value={otpdata}
                          onChange={handleChangeOtp}
                          numInputs={4}
                          inputType='tel'
                          name='otp'
                          renderInput={(props) => <input {...props} />}
                        />
                        {errOtp && (
                          <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>
                        )}
                      </div>
                    </div>
                    <p className='font-normal text-center pt-5 text-[#212529]'>
                      Resend OTP in 00:{formatTime(time)} Sec
                    </p>

                    <div className=' pt-4 text-center'>
                      {resendOtp ? (
                        <SubmitFormBtn name='Resend OTP' onClick={LoginOtp} />
                      ) : (
                        <SubmitFormBtn
                          name='Submit'
                          disabled={otpdata.length < 4 || isLoadingOtp}
                          onClick={LoginVerify}
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={eligibilityRef}>
        <EligibilityCriteriaDetail productDetailsData={productDetailsData} position={'3'} />
      </div>
      <VedioCheck productDetailsData={productDetailsData?.product_details} />
      <div className='container xl:px-8'>
        <DetailsFindTailor position='7' />
      </div>
      <div ref={relatedRef}>
        <DetailRelatedCards alternetRelatedproduct={alternetRelatedproduct} />
      </div>
      <div ref={moreAboutRef} className='xl:px-12'>
        <HowToApplyDetail productLongformcon={productLongformcon} moreAboutRef={moreAboutRef} />
      </div>
    </>
  )
}

export default CardDetailsFilterBox
