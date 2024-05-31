import React, { useEffect, useRef, useState } from 'react'
import SubmitFormBtn from '../../../common/SubmitFormBtn'
import { BASE_URL, COMMON, ELIGIBILITY, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import DatePicker from 'react-datepicker'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OTPInput from 'react-otp-input'
import Input from '@/core/component/Leads/InputComponent/Input'
import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import moment from 'moment'
import jwt from 'jwt-decode'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '@/core/component/common/CommonList/CommonFieldComponent/MobileNumber'
import { handleRemoveLocalstorage, removeNonAlphaNumeric } from '@/utils/util'
import CommonDatePicker from '@/core/component/common/CommonList/CommonFieldComponent/Datepicker'
import Loader from '@/core/component/Leads/common/Loader'
import Image from 'next/image'
import LoaderLogo from '../../../../../public/assets/logo-loader.gif'
import Cookies from 'js-cookie'

function EligibilityCredit() {
  const [profileformData, setProfileFormdata] = useState({ gender: 'Male' })
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorCompany, setErrorCompany] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPincode, setErrorPinCode] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(0)
  const [otpdata, setOtpdata] = useState([])
  const [errOtp, setErrorOtp] = useState(false)
  const [resendOtp, setResendOtp] = useState(false)
  const [stgonehitId, setStgOneHitId] = useState([])
  const [trans_id, settransid] = useState(null)
  const [authType, setAuthType] = useState(null)
  const [stgtwohitId, setStgTwoHitId] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)
  const [flowdata, setFlow] = useState()
  const [checkAgree, setCheckAgree] = useState(false)
  const [pancardError, setPancardError] = useState()
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [pincodeNumber, setPincodeNumber] = useState()
  const [termsModal, setTermsModal] = useState(false)
  const [monthlyError, setmonthlyError] = useState(false)
  //   const [errorNameLast, setErrorLast] = useState(false);
  const [disbaled, setDisbaled] = useState(false)
  const [checkVerifyEmail, setCheckVerifyEmail] = useState(false)
  const [mobile, SetMobile] = useState()
  const [errMsg, setErrorMsg] = useState(false)
  const [time, setTime] = useState(60)
  const [IstimeActive, setIsTimeActive] = useState(true)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [startDate, setDate] = useState()
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisibility] = useState(false)
  const [validData, setValid] = useState('')
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [errorHrefEmail, setErrorHrefEmail] = useState(false)
  const [errHrefCompany, setErrHrefCompany] = useState(false)
  const [fieldValue, setFieldValue] = useState()
  const today = new Date()
  const router = useRouter()
  const selectDateHandler = (d) => {
    setDate(d)
  }

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      // const url = refererUrl && new URL(refererUrl)
      // const utm_campaign = url?.searchParams.get('utm_campaign') || ''
      // const utm_medium = url?.searchParams.get('utm_medium') || ''
      // const utm_source = url?.searchParams.get('utm_source') || ''

      // const utm_details = utm_campaign + utm_medium + utm_source

      // const updatedLeadsField = {
      //   ...leadsParams,
      //   utm_details
      // }
      setFieldValue(utm_details)
    }
  }, [])
  // useEffect(() => {
  //   window.scrollTo(0, 500);

  // },[])
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

  var dateObject = new Date(startDate)
  var year = dateObject.getFullYear()
  var month = dateObject.getMonth() + 1
  var day = dateObject.getDate()

  var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
  useEffect(() => {
    setProfileFormdata({
      ...profileformData,
      dob: formattedDate
    })
  }, [formattedDate])

  const handleEmailChange = (event) => {
    const emailErr = event.target.value.replace(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g, '')
    if (!emailErr) {
      setErrorEmail(false)
    } else {
      setErrorEmail(true)
    }
  }
  const handlePincodeChange = (event) => {
    setVisibility(true)
    const PincodeErr = event.target.value.replace(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/g, '')
    if (!PincodeErr) {
      setErrorPinCode(false)
    } else {
      setErrorPinCode(true)
    }
  }

  const handleChangeOtp = (e) => {
    // setOtpdata(e)
    const valueotp = e
    const extractedOtp = valueotp.replace(/\D/g, '')
    setOtpdata(extractedOtp)

    if (flowdata === 'auth' ? extractedOtp?.length === 4 : extractedOtp?.length === 6) {
      EligibilityValidationOtp(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }

  const handleValidation = (e) => {
    const FirstNameCheck = profileformData?.full_name?.replace(/^[a-zA-Z a-zA-Z]+$/, '')
    const CompanyName = profileformData?.companyname?.replace(/^[a-zA-Z a-zA-Z]+$/, '')

    if (!FirstNameCheck) {
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }
    if (!CompanyName) {
      setErrorCompany(false)
    } else {
      setErrorCompany(true)
    }
  }

  const handleChangeNumber = (e) => {
    const inputValue = e.target.value
    const extractedNumber = inputValue.replace(/\D/g, '')
    if (extractedNumber?.length === 10) {
      SetMobile(extractedNumber)
      setErrorMsg(false)
    } else if (extractedNumber?.length < 10) {
      setErrorMsg(true)
      SetMobile(extractedNumber)
    }
    if (extractedNumber == '0000000000') {
      setZeroNumberValidation(true)
    } else setZeroNumberValidation(false)
  }

  const handleMonthlyIncome = (e) => {
    const inputValue = e.target.value
    const extracIncome = inputValue.replace(/\D/g, '')
    if (extracIncome?.length === 6) {
      setmonthlyError(false)
    } else if (extracIncome?.length > 6) {
      setmonthlyError(true)
    }
  }

  const handleChange = (event) => {
    setErrorHrefName(false)
    setErrorHrefEmail(false)
    if (
      event?.target?.name === 'company_name' ||
      event?.target?.name === 'full_name' ||
      event?.target?.name === 'email'
    ) {
      const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
      if (hrefRegex.test(event.target.value)) {
        if (event?.target?.name === 'company_name') {
          setErrHrefCompany(true)
        } else if (event?.target?.name === 'full_name') {
          setErrorHrefName(true)
        } else {
          setErrorHrefEmail(true)
        }
      } else {
        setProfileFormdata({ ...profileformData, [event?.target?.name]: event?.target?.value })
      }
    } else {
      if (event?.target?.name === 'pan_no') {
        setPanVerifyCard(false)
      }
      setProfileFormdata({ ...profileformData, [event?.target?.name]: event?.target?.value })
    }
    if (event?.target?.name === 'monthly_salary') {
      setProfileFormdata({ ...profileformData, ['monthly_salary']: parseInt(event?.target?.value) })
    }
  }

  useEffect(() => {
    if (profileformData?.pan_no) {
      const uppercaseValue = profileformData?.pan_no.toUpperCase()
      setProfileFormdata({ ...profileformData, pan_no: uppercaseValue })
    }
  }, [profileformData?.pan_no])
  var pin_code
  useEffect(() => {
    setProfileFormdata({
      ...profileformData,
      pin_code: pincodeNumber
    })
  }, [pincodeNumber])
  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('full_name', panVerifyCard ? panVerifyName : profileformData?.full_name)
    bodyFormData.append('occupation', profileformData?.occupation?.toLowerCase())
    bodyFormData.append('companyname', profileformData?.companyname)
    bodyFormData.append('mobile', profileformData?.mobile)
    bodyFormData.append('years', profileformData?.years)
    bodyFormData.append('salary', profileformData?.salary)
    bodyFormData.append('dob', profileformData?.dob)
    bodyFormData.append('email', profileformData?.email)
    bodyFormData.append('pan_no', profileformData?.pan_no)
    bodyFormData.append('pin_code', profileformData?.pin_code)
  }
  useEffect(() => {
    if (
      profileformData?.mobile &&
      profileformData?.email &&
      profileformData?.dob &&
      profileformData?.pin_code &&
      profileformData?.occupation &&
      profileformData?.company_name &&
      checkAgree == true
    ) {
      setDisbaled(false)
    } else {
      setDisbaled(true)
    }
  }, [
    checkAgree,
    profileformData?.company_name,
    profileformData?.dob,
    profileformData?.email,
    profileformData?.mobile,
    profileformData?.occupation,
    profileformData?.pin_code
  ])

  const handleNumberEdit = () => {
    setIsOpen(0)
    setOtpdata([])
    setLoading(false)
    setLoadingOtp(false)
  }

  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

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

  const dateform = moment(profileformData?.dob)
  const formatDateTime = dateform.format('DD-MM-YYYY')

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const EligibilityRegister = (e) => {
    // e?.preventDefault()
    if (profileformData) {
      setLoading(true)
      let params = {
        pan_no: profileformData?.pan_no ? profileformData?.pan_no : '',
        mobile_no: profileformData?.mobile ? String(profileformData?.mobile) : String(mobile),
        full_name: panVerifyCard ? panVerifyName : profileformData?.full_name,
        pin_code: profileformData?.pin_code ? profileformData?.pin_code : '',
        email: profileformData?.email ? profileformData?.email : '',
        occupation: profileformData?.occupation?.toLowerCase() ? profileformData?.occupation?.toLowerCase() : '',
        company_name: profileformData?.company_name ? profileformData?.company_name : '',
        monthly_salary: parseInt(profileformData?.monthly_salary) ? parseInt(profileformData?.monthly_salary) : '0',
        dob: profileformData?.dob ? profileformData?.dob : '',
        terms: checkAgree ? 'agree' : 'not agree',
        device_id: deviceId,
        request_id: '',
        url_slug: router.query.eligible ? router.query.eligible : null,
        lang_id: 1,
        referrer_url: refOutSide || '',
        lead_profile_id: leadId ? leadId : null,
        itr_amount: profileformData?.itr_amount
      }
      if (leadIPData?.user_agent) {
        params = { ...params, user_agent: leadIPData?.user_agent }
      }
      // if (deviceId) {
      //   params = { ...params, device_id: deviceId }
      // }
      if (leadIPData?.ip) {
        params = { ...params, ip_address: leadIPData?.ip }
      }
      if (fieldValue) {
        params = { ...params, utm_details: fieldValue }
      }
      axios
        .post(BASE_URL + ELIGIBILITY?.eligibilityRegister, params, { headers: token ? headersAuth : headers })
        .then((response) => {
          if (response?.data?.message == 'success') {
            setFlow(response?.data?.data?.flow)
            setStgOneHitId(response?.data?.data?.stgOneHitId)
            setStgTwoHitId(response?.data?.data?.stgTwoHitId)
            settransid(response?.data?.data?.transaction_id)
            setAuthType(response?.data?.data?.type)
            if (token) {
              localStorage.setItem('@alternatdata', response?.data?.data?.alternate_product)
              localStorage.setItem('@eligibleproduct', response?.data?.data?.eligible_product)
              localStorage.setItem('@inputSlug', response?.data?.data?.input_slug)
              router.push(`/credit-cards/eligibility/result`)
            } else {
              // toast.success(ApiMessage?.otpsentsuccessfully)
              setIsOpen(1)
            }
            setIsTimeActive(true)
            setResendOtp(false)
            setLoading(false)
            setDisbaled(true)
            setTime(60)
          }
          if (response?.data?.message == 'failed') {
            setDisbaled(true)
            setLoading(false)
            toast.error(response?.data?.data)
          }
        })
        .catch((error) => {
          setDisbaled(false)
          if (error?.response?.data?.message == 'failed') {
            setLoading(false)
            setDisbaled(true)
            toast.error(error?.response?.data?.reason)
          } else if (error?.response?.status == 422) {
            toast.error(error?.message)
            setLoading(false)
            setDisbaled(true)
          } else if (error?.response?.status == 500) {
            toast.error(ApiMessage?.internalServerError)
            setDisbaled(true)
          }
          // toast.error(error?.response?.data?.reason)

          setLoading(false)
        })
    }
  }
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const EligibilityValidationOtp = (e) => {
    let params = {
      url_slug: router.query.eligible ? router.query.eligible : null,
      lang_id: 1,
      flow: flowdata,
      cibil_otp: flowdata === 'auth' ? null : e,
      auth_otp: flowdata === 'auth' ? e : null,
      stgOneHitId: stgonehitId ? stgonehitId : '',
      stgTwoHitId: stgtwohitId ? stgtwohitId : '',
      cibil_type: 'CUSTOM',
      auth_type: flowdata === 'auth' ? authType : null,
      pan_no: profileformData?.pan_no ? profileformData?.pan_no : '',
      mobile_no: profileformData?.mobile ? profileformData?.mobile : mobile,
      transaction_id: flowdata === 'auth' ? trans_id : null,
      full_name: panVerifyCard ? panVerifyName : profileformData?.full_name,
      pin_code: profileformData?.pin_code ? profileformData?.pin_code : '',
      email: profileformData?.email ? profileformData?.email : '',
      occupation: profileformData?.occupation?.toLowerCase() ? profileformData?.occupation?.toLowerCase() : '',
      company_name: profileformData?.company_name ? profileformData?.company_name : '',
      monthly_salary: parseInt(profileformData?.monthly_salary) ? parseInt(profileformData?.monthly_salary) : '0',
      dob: profileformData?.dob ? profileformData?.dob : '',
      terms: checkAgree ? 'agree' : 'not agree',
      request_id: '',
      lead_profile_id: leadId ? leadId : null
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
    if (profileformData || flowdata === 'auth' ? e.length == 4 : e.length == 6) {
      axios
        .post(BASE_URL + ELIGIBILITY?.eligibilityValidOtp, params, { headers: headers })
        .then((response) => {
          if (response?.data?.message == 'success') {
            toast.success(ApiMessage?.verifyotp)
            localStorage.setItem('@alternatdata', response?.data?.data?.alternate_product)
            localStorage.setItem('@eligibleproduct', response?.data?.data?.eligible_product)
            localStorage.setItem('token', response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
            router.push(`/credit-cards/eligibility/result`)
            setLoadingOtp(false)
            setDisbaled(true)
          } else if (response?.data?.message == 'failed') {
            toast.error(response?.data?.data?.errorString)
            setLoadingOtp(false)
          } else if (response?.data?.data?.pan_no) {
            router.push(`/credit-cards/eligibility/result`)
          }
        })

        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            // toast.error(ApiMessage?.validotpenter)
            toast.error(error?.response?.data?.reason)
            setLoadingOtp(false)
          } else if (error?.response?.status == 500) {
            toast.error(ApiMessage?.internalServerError)
            setLoadingOtp(false)
          }
          setLoadingOtp(false)
        })
    }
  }

  useEffect(() => {
    if (profileformData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [profileformData?.pin_code?.length === 6])

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: profileformData?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
        }
      })

      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        }
      })
  }

  const GetUserSetUp = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.getusersetup,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setProfileFormdata(response?.data?.data)
          if (response?.data?.data?.email !== null) {
            setCheckVerifyEmail(true)
          }
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(response?.data?.data))
            setGetDataUser(response?.data?.data)
          }
          const apiDob = response.data?.data?.dob
          setDate(new Date(apiDob))
          // toast.success(ApiMessage?.setuser)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status == 401) {
          router.push('/login')
          toast.success(ApiMessage?.logoutmessage)
          handleRemoveLocalstorage()
        } else if (error?.response?.status == 403) {
          // toast.error(error?.response?.data?.detail)
        }
      })
  }

  useEffect(() => {
    if (token) {
      GetUserSetUp()
    }
  }, [])

  const previousController = useRef()

  const getData = (searchPinCode) => {
    if (previousController.current) {
      previousController.current.abort()
    }
    const controller = new AbortController()

    previousController.current = controller
    let url = BASE_URL + COMMON.pinCodeVerify

    let search = window.location.search
    let params = new URLSearchParams(search)

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    axios
      .post(
        url,
        {
          pin_code: searchPinCode
        },
        { headers: headers }
      )
      .then((response) => {
        setPinCode(response.data.data.pincode_data?.pincodes)
        // setLoading(false);
      })
      .catch((error) => {
        /*console.error(error)*/
        setPinCode([])
        // setLoading(false);
      })
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setVisibility(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  useEffect(() => {
    if (modalIsOpen === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [modalIsOpen === 1])

  return (
    <>
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

      {modalIsOpen === 0 && (
        <>
          <div className='pb-[25px]'>
            <h3 className='text-[36px] max-[834px]:text-[32px] font-semibold max-[479px]:text-[24px] py-2 text-[#212529]'>
              Check Eligibility
            </h3>
            <p className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529]'>
              Check your eligibility for credit card
            </p>
          </div>
          <form className='pb-4 profile-form' action='' method='POST' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <p className='   text-[#212529]  max-[1200px]:!pt-0'>Gender</p>
              <div className='flex pt-[10px] gap-4 '>
                <div>
                  <label
                    htmlFor='gender'
                    className={`form-redio flex gap-2 items-center ${
                      profileformData?.gender === 'Male' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                    }`}>
                    <input
                      type='radio'
                      name='gender'
                      value={profileformData?.gender === 'Male' ? profileformData?.gender === 'Male' : 'Male'}
                      // disabled={profileformData?.gender ? true : false}
                      checked={profileformData?.gender === 'Male'}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                    Male
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='gender'
                    className={`form-redio flex gap-2 items-center  ${
                      profileformData?.gender === 'Female' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                    }`}>
                    <input
                      type='radio'
                      name='gender'
                      // disabled={profileformData?.gender ? true : false}
                      value={profileformData?.gender === 'Female' ? profileformData?.gender === 'Female' : 'Female'}
                      checked={profileformData?.gender === 'Female'}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                    Female
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='gender'
                    className={`form-redio flex gap-2 items-center ${
                      profileformData?.gender === 'Other' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                    } `}>
                    <input
                      type='radio'
                      name='gender'
                      // disabled={profileformData?.gender ? true : false}
                      value={profileformData?.gender === 'Other' ? profileformData?.gender === 'Other' : 'Other'}
                      checked={profileformData?.gender === 'Other'}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 max-[479px]:grid-cols-1 '>
              <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
                <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='pancard'>
                  PAN Card
                </label>
                <Input
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1  ${
                    pancardError === false ? 'border-red-500' : 'border-[#C2CACF] '
                  }`}
                  id='pan_no'
                  name='pan_no'
                  type='text'
                  required
                  placeholder='Enter your PAN card number'
                  // disabled={profileformData?.is_pan_verified === '1'}
                  // disabled={profileformData?.pan_no && panVerifyCard && token ? true : false}
                  value={profileformData?.pan_no}
                  onChange={(e) => handleChange(e)}
                  endAdornment={pancardError || profileformData?.is_pan_verified === '1' ? <SuccessIcon /> : ''}
                />
                {profileformData?.pan_no
                  ? !pancardError &&
                    profileformData?.is_pan_verified !== '1' && (
                      <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>
                    )
                  : ''}
              </div>
            </div>

            <div className={errorMessage ? ' border-[#FF000F] mb-[30px]  ' : 'mb-[30px] max-[771px]:!mb-4'}>
              <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
                Full Name
              </label>
              <input
                className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                id='full_name'
                name='full_name'
                type='text'
                placeholder='Enter your name'
                // disabled={panVerifyCard || profileformData?.is_pan_verified === '1' ? true : false}
                // disabled={profileformData?.full_name  && token ? true : false}
                defaultValue={panVerifyCard && panVerifyName ? panVerifyName : profileformData?.full_name}
                onChange={(e) => {
                  handleChange(e)
                  handleValidation(e)
                }}
                pattern='[A-Za-z]+'
                onInput={(e) => {
                  e.target.value = removeNonAlphaNumeric(e)
                }}
              />
              {errorHrefName && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}
              {errorMessage && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
            </div>
            <div className='grid grid-cols-2 gap-4 max-[771px]:grid-cols-1 max-[771px]:gap-0 '>
              <div
                className={
                  errMsg || zeroNumberValidation ? ' border-[#FF000F] mb-[30px] ' : 'mb-[30px] max-[771px]:!mb-4'
                }>
                <label className='text-[13px] font-normal text-[#212529]'>Mobile as per Aadhaar</label>
                <div>
                  <CommonNumberInput
                    disabled={profileformData?.mobile && token ? true : false}
                    defaultValue={profileformData?.mobile}
                    handleChangeNumber={handleChangeNumber}
                    handleChange={handleChange}
                  />
                </div>
                {errMsg && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberError}</p>}
                {zeroNumberValidation && (
                  <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
                )}
              </div>
              <div className='max-[771px]:!mb-4'>
                <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='date'>
                  Date of Birth
                </label>
                <div className='datepicker'>
                  <DatePicker
                    type='text'
                    showYearDropdown
                    dropdownMode='select'
                    dateFormat='dd-MM-yyyy'
                    placeholderText='DD/MM/YYYY'
                    name='dob'
                    disabled={profileformData?.dob && token ? true : false}
                    id='dob'
                    className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                    selected={startDate}
                    onChange={(e) => {
                      selectDateHandler(e)
                      handleChange(e)
                    }}
                    maxDate={today}
                    value={profileformData?.dob ? formatDateTime : 'DD/MM/YYYY'}
                    required
                    todayButton={'Today'}
                  />
                </div>
              </div>
            </div>

            <div className='mb-[30px] max-[771px]:!mb-4'>
              <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1'>
                <CommonEmailInput
                  value={profileformData?.email}
                  // disabled={checkVerifyEmail && token ? true : false}
                  handleChange={handleChange}
                  errorHrefEmail={errorHrefEmail}
                />
                <div className='relative'>
                  <CommonPicodeInput
                    value={profileformData?.pin_code}
                    getData={getData}
                    handleChange={handleChange}
                    handlePincodeChange={handlePincodeChange}
                  />
                  {visible && (
                    <ul className='suggestions pin-suggestion top-[100%] ' ref={wrapperRef}>
                      {pinCode.map((i, v) => (
                        <li
                          className={''}
                          key={v}
                          onClick={() => {
                            setProfileFormdata({ ...profileformData, pin_code: i })
                            setVisibility(false)
                          }}>
                          {i}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className='mb-[30px] max-[771px]:!mb-4'>
              <p className=' text-[#212529]'>Occupation</p>
              <div className='flex pt-[10px] gap-4'>
                <div>
                  <label
                    htmlFor='occupation'
                    className={`form-redio flex gap-2 items-center ${
                      profileformData?.occupation === 'Salaried' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                    }`}>
                    <input
                      type='radio'
                      id='occupation'
                      checked={profileformData?.occupation === 'Salaried'}
                      name='occupation'
                      value='Salaried'
                      onChange={(e) => handleChange(e)}
                    />
                    Salaried
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='occupation'
                    className={`form-redio flex gap-2 items-center ${
                      profileformData?.occupation === 'Self-employed' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                    } `}>
                    <input
                      type='radio'
                      id='occupation'
                      name='occupation'
                      checked={profileformData?.occupation === 'Self-employed'}
                      value='Self-employed'
                      onChange={(e) => handleChange(e)}
                    />
                    Self-Employed
                  </label>
                </div>
              </div>
            </div>

            <div className=''>
              <div className='grid grid-cols-1 gap-4 max-[479px]:grid-cols-1'>
                <div className={errorCompany ? ' border-[#FF000F] mb-[30px]  ' : 'mb-[30px] max-[771px]:!mb-4 '}>
                  <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
                    Company Name
                  </label>
                  <input
                    className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                    id='company_name'
                    name='company_name'
                    type='text'
                    placeholder='Company Name'
                    disabled={profileformData?.company_name?.length >= 26 && token ? true : false}
                    value={profileformData?.company_name}
                    onChange={(e) => {
                      handleChange(e)
                      handleValidation(e)
                    }}
                  />
                  {errHrefCompany && (
                    <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>
                  )}

                  {errorCompany && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
                </div>
              </div>
            </div>
            <div className='mb-[30px] max-[771px]:!mb-4'>
              <div className='grid grid-cols-1 gap-4 max-[479px]:grid-cols-1'>
                {profileformData?.occupation === 'Salaried' && (
                  <div className={errorMessage ? ' border-[#FF000F] mb-[30px]  ' : 'mb-[30px] max-[771px]:!mb-0'}>
                    <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
                      Monthly Salary
                    </label>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='salary'
                      name='monthly_salary'
                      type='number'
                      placeholder='Enter your monthly salary'
                      // disabled={profileformData?.monthly_salary?.length >= 6 && token ? true : false}
                      value={profileformData?.monthly_salary}
                      // maxLength={6}
                      onChange={(e) => {
                        handleChange(e)
                        handleMonthlyIncome(e)
                      }}
                    />
                    {monthlyError && (
                      <p className='text-[12px] text-[#FF000F] font-no'>
                        Please enter the Income less than or equal to 400000
                      </p>
                    )}
                  </div>
                )}
                {profileformData?.occupation === 'Self-employed' && (
                  <div className={'mb-[30px] max-[771px]:!mb-0'}>
                    <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
                      ITR (amount)
                    </label>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='itr_amount'
                      name='itr_amount'
                      type='number'
                      placeholder='Enter your ITR (amount)'
                      value={profileformData?.itr_amount}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='flex items-baseline mt-8 gap-2 max-[771px]:items-center'>
              <input
                className='mr-1 w-4 h-4 text-white accent-[#49D49D] '
                type='checkbox'
                value={checkAgree}
                onChange={(e) => {
                  setCheckAgree(e.target?.checked)
                  // if (checkAgree === false || checkAgree === null || checkAgree === undefined) {
                  //   setTermsModal(true)
                  // }
                }}
              />
              <p className='text-[15px] text-[#212529] font-normal  max-[479px]:text-[14px] max-[375px]:text-[13px]'>
                {ApiMessage?.termsAndConditionContent}
                <Link
                  href='/terms-use'
                  className='!underline !font-medium text-[#212529] pl-2'
                  onClick={() => setTermsModal(true)}
                  prefetch={false}
                  target='_blank'>
                  terms and conditions
                </Link>
                <span className='mr-[2px]'> and</span>
                <Link
                  href='/privacy-policy'
                  className='!underline !font-medium text-[#212529] pl-[1px]'
                  onClick={() => setTermsModal(true)}
                  prefetch={false}
                  target='_blank'>
                  privacy and policy
                </Link>
              </p>
            </div>
            {/* {termsModal ? <Terms setTermsModal={setTermsModal} /> : ''} */}

            <div className=' pt-4 text-center'>
              <SubmitFormBtn
                name={!isLoading ? 'Check Eligibility' : <Loader />}
                disabled={disbaled}
                onClick={EligibilityRegister}
              />
            </div>
          </form>
        </>
      )}

      {/* {modalIsOpen === 1 && (
        <>
          <div className=''>
            <div className='sm:flex sm:items-center  w-full'>
              <div className=' sm:mt-0'>
                <h3
                  className='text-[36px] max-[834px]:text-[32px]  max-[479px]:text-[24px]  py-2 font-semibold text-[#212529] max-[479px]:text-center'
                  id='modal-title'>
                  OTP Sent!
                </h3>
                <p className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center'>
                  {ApiMessage?.otpContent}
                </p>
                <div className='max-[479px]:text-center'>
                  <span className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] '>
                    +91 {profileformData?.mobile ? profileformData?.mobile : mobile}
                  </span>{' '}
                  <button
                    onClick={handleNumberEdit}
                    className='text-[#49D49D] cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
                    Edit Number
                  </button>
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className='flex mt-4 max-[479px]:justify-center '>
              <div className='space-x-2 otp-data-box'>
                {flowdata === 'auth' ? (
                  <OTPInput
                    value={otpdata}
                    onChange={(e) => handleChangeOtp(e)}
                    numInputs={4}
                    name='otp'
                    inputType='tel'
                    renderInput={(props) => <input {...props} />}
                  />
                ) : (
                  <OTPInput
                    value={otpdata}
                    onChange={(e) => handleChangeOtp(e)}
                    numInputs={6}
                    name='otp'
                    inputType='tel'
                    renderInput={(props) => <input {...props} />}
                  />
                )}
                {errOtp && <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>}
              </div>
            </div>
            <p className='font-normal  pt-5 max-[479px]:text-center text-[#212529]'>
              Resend OTP in 00:{formatTime(time)} Sec
            </p>
            <div className=' pt-4 max-[479px]:text-center'>
              {resendOtp ? (
                <SubmitFormBtn name={isLoading ? 'Resend OTP' : <Loader />} onClick={EligibilityRegister} />
              ) : (
                <SubmitFormBtn
                  name={!isLoadingOtp ? 'Submit' : <Loader />}
                  disabled={flowdata === 'auth' ? otpdata.length < 4 : otpdata.length < 6 || isLoadingOtp}
                  onClick={EligibilityValidationOtp}
                />
              )}
            </div>
          </form>
        </>
      )} */}
    </>
  )
}

export default EligibilityCredit
