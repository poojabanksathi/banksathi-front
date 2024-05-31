import React, { useState, useEffect, useRef } from 'react'

import emojiIcon from '../../../../public/assets/emoji-icon.svg'
import verdSad from '../../../../public/assets/very-sad.svg'

import satisfied from '../../../../public/assets/satisfied.svg'

import good from '../../../../public/assets/good.svg'

import veryGood from '../../../../public/assets/very-good.svg'

import amazing from '../../../../public/assets/amazing.svg'

import ReactStars from 'react-stars'
import Image from 'next/image'
import starRate from '../../../../public/assets/star-rate.svg'
import dynamic from 'next/dynamic'
import ProgressBars from '../../../component/common/ProgressBars'
import { useRouter } from 'next/router'
import axios from 'axios'
import { BASE_URL, COMMON, BUSINESSCATEGORY, PRODUCTSAPI, AUTHUSER } from '@/utils/alljsonfile/service'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { toast } from 'react-hot-toast'
import SubmitFormBtn from '../../common/SubmitFormBtn'
import Loader from '../../Leads/common/Loader'
import OTPInput from 'react-otp-input'
import closeIcon from '../../../../public/assets/closeIcon.svg'
import TagManager from 'react-gtm-module'

const ReviewsCard = dynamic(() => import('@/core/component/Layout/savingAccountList/ReviewsCard'), {
  ssr: false
})
const OverallRating = ({ overallRatingData, reviewsData, getallreview, productDetailsData }) => {

  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')

  const userData = localUserData && JSON.parse(localUserData)

  const [isActive, setIsactive] = useState(false)
  const [IdData, setIdData] = useState(1)
  const [responseData, setResponseData] = useState([])
  const [likeUnData, setLikeUnData] = useState([])
  const [liked, setLiked] = useState(false)
  const [unliked, setUnLiked] = useState(false)
  const [countlikeunlike, setCountLikeUnlike] = useState(0)
  const [ratingcustomer, setRatingCustomer] = useState()
  const LikeCount = countlikeunlike?.toString()
  const [commentdata, setcommentdata] = useState()
  const [reviewButton, setReviewButton] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectUnlikeId, setselectUnlikeId] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState(60)
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
  const [emojiStatus, setEmojiStatus] = useState(0)


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
  }, [time])

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  useEffect(() => {
    if (time === 0) {
      setIsTimeActive(false)
      setResendOtp(true)
    }
  }, [time])

  const router = useRouter()

  useEffect(() => {
    if (router.query?.linkSlug) {
      const container = document.getElementById(router.query?.linkSlug)
      container?.scrollIntoView({ behavior: 'smooth' })
    }
    if (router.query?.linkSlug === 'card-details') {
      window.scrollTo(0, 0)
    }
  }, [router.query?.linkSlug])

  // useEffect(() => {
  //   if (token) {
  //     const decordtoken = jwt(token)

  //     const timecurrrunt = Date.now()
  //     const timestampexp = decordtoken?.exp

  //     const CurruntTime = new Intl.DateTimeFormat('en-US', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit'
  //     }).format(timecurrrunt)

  //     function formatUnixTimestamp(timestampexp) {
  //       const dateObj = new Date(timestampexp * 1000)
  //       const month = dateObj.getMonth() + 1
  //       const day = dateObj.getDate()
  //       const year = dateObj.getFullYear()
  //       const hours = dateObj.getHours()
  //       const minutes = dateObj.getMinutes()
  //       const seconds = dateObj.getSeconds()
  //       const ampm = hours >= 12 ? 'PM' : 'AM'
  //       const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(
  //         minutes
  //       )}:${formatTimeexp(seconds)} ${ampm}`
  //       return formattedDate
  //     }

  //     function formatTimeexp(time) {
  //       return time < 10 ? '0' + time : time
  //     }

  //     const formattedDateExp = formatUnixTimestamp(timestampexp)

  //     if (CurruntTime === formattedDateExp) {
  //       router.push('/login')
  //       toast.success(ApiMessage?.logoutmessage)
  //       handleRemoveLocalstorage()
  //     }
  //   }
  // }, [])

  useEffect(() => {
    setcommentdata(responseData?.comment)
    setRatingCustomer(responseData?.rating)
  }, [responseData || ratingcustomer])

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

  //text area
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

  // const handleChange = (event) => {
  //   setResponseData({ ...responseData, [event.target?.name]: event.target?.value })
  // }
  //login
  const callVerifyOtpApi = (e) => {
    if (e?.length === 4) {
      setLoading(true)
      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionId,
            otp: e,
            mobile_no: String(profileformData?.mobile) || String(mobile),
            type: messageType || localStorage.getItem('auth_type'),
            is_temp_otp: tempOtp
          },
          { headers: headers }
        )
        .then((response) => {
          setIsOpen(0)
          if (response?.data?.message == 'success') {
            if (!profileformData?.mobile || !profileformData?.pan_no || !profileformData?.full_name) {
              setProfileFormdata(response?.data?.data)
            }
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', response?.data?.data?.access_token)
              localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
              localStorage.setItem('auth_Otp', e)
              localStorage.setItem('userData', JSON.stringify(response?.data?.data))
            }
            toast.success(ApiMessage?.loginverify)
            setLoading(false)
            router.reload()
          }
        })
        .catch((error) => {
          errorHandling(error)
          setLoading(false)
        })
    }
  }

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
    const extractedOtp = valueotp.replace(/\D/g, '')

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
    const extractedNumber = inputValue.replace(/\D/g, '')

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
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        } else if (error?.response?.status == 500) {
        }
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
              rating: String(ratingcustomer)
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
        customer_mobile_no : response?.data?.data?.lead_profile_id
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

  // call add lead details api
  // const callAddLeadDetails = () => {
  //   setLoading(true)
  //   const url_slug = productDetailsData?.product_details?.apply_url?.split?.('/')?.pop()
  //   axios
  //     .post(
  //       BASE_URL + LEADAPPAPI.leadaddgloble,
  //       {
  //         lead_profile_id: leadId,
  //         url_slug: url_slug,
  //         gender: userData?.gender,
  //         pan: userData?.pan_no,
  //         full_name: userData?.full_name,
  //         mobile_no: String(userData?.mobile),
  //         dob: userData?.dob,
  //         email: userData?.email,
  //         pin_code: userData?.pin_code,
  //         occupation: userData?.occupation?.toLowerCase(),
  //         terms: 'agree',
  //         company_name: userData?.company_name,
  //         device_id: '',
  //         request_id: '',
  //         monthly_salary: userData?.monthly_salary,
  //         lang_id: 1,
  //         itr_amount: userData?.itr_amount,
  //         advisor_id: null
  //       },
  //       { headers: headersAuth }
  //     )
  //     .then((response) => {
  //       setLoading(false)
  //       if (response?.data?.data?.url) {
  //         router.push(response?.data?.data?.url)
  //       }
  //       if (response?.data?.message == 'success') {
  //         if (token) {
  //           props?.data?.page.handlePage('leads')
  //           props?.data?.otp.handleOtpCheck(false)
  //         }
  //       } else {
  //         toast.error(response?.data?.data)
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false)
  //       if (error?.response?.data?.message == 'failed') {
  //         toast.error(error?.response?.data?.reason)
  //       } else if (error?.response?.status === 422 && url_slug) {
  //         toast.error(error?.response?.data?.detail[0]?.msg)
  //         if (error?.response?.data?.message?.fullName) {
  //           toast.error(error?.response?.data?.message?.fullName[0])
  //         }
  //         if (error?.response?.data?.message?.panNo) {
  //           toast.error(error?.response?.data?.message?.panNo[0])
  //         }
  //       } else if (error?.response?.status == 500) {
  //         toast.error(ApiMessage?.internalServerError)
  //       }
  //     })
  // }

  // const handleChangeOtp = (e) => {
  //   // setOtpdata(e)
  //   const valueotp = e
  //   const extractedOtp = valueotp.replace(/\D/g, '')
  //   setOtpdata(extractedOtp)

  //   if (flowdata === 'auth' ? extractedOtp?.length === 4 : extractedOtp?.length === 6) {
  //     // EligibilityValidationOtp(valueotp)
  //     callVerifyOtpApi(valueotp)
  //     setErrorOtp(false)
  //   } else {
  //     setErrorOtp(true)
  //   }
  // }

  return (
    <div className='container pt-[30px]'>
      <div className='overall-rating  max-[576px]:my-6 target-element' id='overall-rating'>
        <div className=' rounded-3xl bg-white'>
          <div className='grid grid-cols-3 pb-[30px] gap-[57px] px-[30px]  max-[1024px]:grid-cols-2 max-[1024px]:gap-8 max-[576px]:grid-cols-1 max-[576px]:gap-8  max-[576px]:py-0 max-[479px]:border-b-0 '>
            <div className='card-left max-[479px]:px-5'>
              <div className='mt-4 text-[#212529]'>
                <h2 className='pb-4 text-[18px] font-semibold max-[479px]:text-center max-[479px]:pb-8'>
                  Overall Rating
                </h2>

                <div className='bg-[#DEF7ED] py-2.5 px-5 rounded-xl text-center max-[479px]:mb-4'>
                  <p className=' text-[30px] font-bold text-center'>
                    {/* {getOverlallRating?.data?.over_all_rating ? getOverlallRating?.data?.over_all_rating : 'NA'} */}
                    {/* 4.0 */}
                    {overallRatingData?.over_all_rating || 'NA'}
                  </p>

                  {overallRatingData?.over_all_rating === 0 ? (
                    ''
                  ) : (
                    <div className='text-center over-rate-star flex justify-center'>
                      <ReactStars
                        count={starCount}
                        size={26}
                        value={overallRatingData?.over_all_rating}
                        edit={false}
                        // isHalf={false}
                        color1={'#ccc'}
                        color2={'#49d49d'}
                      />
                    </div>
                  )}
                  {overallRatingData?.total_reviews !== 0 && (
                    <p className='text-[13px] text-[#272727] font-semibold'>
                      Based on {overallRatingData?.total_reviews} reviews
                    </p>
                  )}
                </div>
                {overallRatingData?.rating &&
                  Object?.keys(overallRatingData?.rating)
                    .sort((a, b) => b - a)
                    .map((rating, index) => (
                      <div key={index} className='flex items-center gap-6 justify-start pt-4'>
                        <p className='text-[15px] text-[#212529] font-medium flex items-center gap-2'>
                          <Image src={starRate} className='' alt='img' />
                          {rating}
                        </p>
                        <div className='flex items-center gap-2 max-[1024px]:w-full w-full'>
                          <ProgressBars
                            rating={overallRatingData?.rating[rating]}
                            // rating={23}
                            // maxRating={79}

                            maxRating={Object.values(overallRatingData?.rating).reduce((acc, cur) => acc + cur)}
                          />

                          <p className='text-[15px] font-bold text-[#212529] '>
                            {overallRatingData?.rating[rating] ? overallRatingData?.rating[rating] : 'NA'}
                          </p>
                        </div>
                      </div>
                      // <div className='flex items-center gap-6 justify-start pt-4'>
                      //   <p className='text-[15px] text-[#212529] font-medium flex items-center gap-2'>
                      //     <Image src={starRate} className='' alt='img' />
                      //     {/* {rating} */}4
                      //   </p>
                      //   <div className='flex items-center gap-2 max-[1024px]:w-full w-full'>
                      //     <ProgressBars
                      //       // rating={getOverlallRating?.data?.rating[rating]}
                      //       rating={23}
                      //       maxRating={79}

                      //       // maxRating={Object.values(getOverlallRating?.data?.rating).reduce((acc, cur) => acc + cur)}
                      //     />

                      //     <p className='text-[15px] font-bold text-[#212529] '>
                      //       {/* {getOverlallRating?.data?.rating[rating] ? getOverlallRating?.data?.rating[rating] : 'NA'} */}
                      //       23
                      //     </p>
                      //   </div>
                      // </div>
                      // <div className='flex items-center gap-6 justify-start pt-4'>
                      //   <p className='text-[15px] text-[#212529] font-medium flex items-center gap-2'>
                      //     <Image src={starRate} className='' alt='img' />
                      //     {/* {rating} */}4
                      //   </p>
                      //   <div className='flex items-center gap-2 max-[1024px]:w-full w-full'>
                      //     <ProgressBars
                      //       // rating={getOverlallRating?.data?.rating[rating]}
                      //       rating={23}
                      //       maxRating={79}

                      //       // maxRating={Object.values(getOverlallRating?.data?.rating).reduce((acc, cur) => acc + cur)}
                      //     />

                      //     <p className='text-[15px] font-bold text-[#212529] '>
                      //       {/* {getOverlallRating?.data?.rating[rating] ? getOverlallRating?.data?.rating[rating] : 'NA'} */}
                      //       23
                      //     </p>
                      //   </div>
                      // </div>
                      // <div className='flex items-center gap-6 justify-start pt-4'>
                      //   <p className='text-[15px] text-[#212529] font-medium flex items-center gap-2'>
                      //     <Image src={starRate} className='' alt='img' />
                      //     {/* {rating} */}4
                      //   </p>
                      //   <div className='flex items-center gap-2 max-[1024px]:w-full w-full'>
                      //     <ProgressBars
                      //       // rating={getOverlallRating?.data?.rating[rating]}
                      //       rating={23}
                      //       maxRating={79}

                      //       // maxRating={Object.values(getOverlallRating?.data?.rating).reduce((acc, cur) => acc + cur)}
                      //     />

                      //     <p className='text-[15px] font-bold text-[#212529] '>
                      //       {/* {getOverlallRating?.data?.rating[rating] ? getOverlallRating?.data?.rating[rating] : 'NA'} */}
                      //       23
                      //     </p>
                      //   </div>
                      // </div>
                    ))}
              </div>
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
                    {/* <Image src={emojiIcon} className='mx-auto' alt='img' /> */}
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
                  {ratingcustomer === 0 ? (
                    ''
                  ) : (
                    <div className='text-center over-rate-star flex justify-center'>
                      <ReactStars
                        count={starCount}
                        size={35}
                        onChange={onChangeRating}
                        value={parseInt(ratingcustomer)}
                        // value={2}
                        // isHalf={true}
                        color1={'#ccc'}
                        color2={'#49d49d'}
                      />
                    </div>
                  )}
                  {/* <EmojiCard/> */}
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
                      <p className='text-[12px] text-left text-[#FF000F] font-no mt-2'>Please enter write a review</p>
                    )}
                    {errorHref && (
                      <p className='text-[12px] text-left text-[#FF000F] font-no mt-2'>{ApiMessage?.linkError}</p>
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
          {reviewsData?.length > 0 && <ReviewsCard reviewsData={reviewsData} />}
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
                      alt='img_text'
                      priority={true}
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
                      {errOtp && <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>}
                    </div>
                  </div>
                  <p className='font-normal text-center pt-5 text-[#212529]'>Resend OTP in 00:{formatTime(time)} Sec</p>

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
  )
}

export default OverallRating
