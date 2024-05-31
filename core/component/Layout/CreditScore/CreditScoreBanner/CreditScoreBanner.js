import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { AUTHUSER, BASE_URL, CIBIL, COMMON, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import SubmitFormBtn from '@/core/component/common/SubmitFormBtn'
import OTPInput from 'react-otp-input'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Input from '@/core/component/Leads/InputComponent/Input'
import LoaderLogo from '../../../../../public/assets/logo-loader.gif'
import closeIcon from '../../../../../public/assets/closeIcon.svg'
import moment from 'moment'
import jwt from 'jwt-decode'
import {
  ScrollToTop2,
  emailRegex,
  errorHandling,
  handleRemoveLocalstorage,
  isDateWithinLast30Days,
  localUserData,
  panRegex,
  removeNonAlphaNumeric
} from '@/utils/util'
import ParagraphBanner from '../../CategoryParagraphBanner/index'
import Cookies from 'js-cookie'
import { useWindowSize } from '@/hooks/useWindowSize'
import CheckAgree from '@/core/component/common/CommonList/CheckAgree/CheckAgree'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import LandingPageCheckAgree from '@/core/component/common/CommonList/LandingPageCheckAgree/LandingPageCheckAgree'

const CreditScoreBanner = ({ metaData, isLandingPage }) => {
  const router = useRouter()
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const [errMsg, setErrorMsg] = useState(false)
  const [mobile, SetMobile] = useState()
  const [scoreformData, setScoreFormdata] = useState({ gender: 'Male' })
  const [responseData, setResponseData] = useState([])
  const [otpdatacibil, setOtpdataCibil] = useState([])
  const [errorName, setErrorName] = useState(false)
  const [errorNameMiddle, setErrorMiddle] = useState(false)
  const [errorNameLast, setErrorLast] = useState(false)
  const [disbaled, setDisbaled] = useState(false)
  const [startDate, setDate] = useState(new Date())
  const today = new Date()
  const [isLoading, setLoading] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)
  const [tempOtp, setTempOtp] = useState('')

  const [time, setTime] = useState()
  const [checkVerifyEmail, setCheckVerifyEmail] = useState(false)
  const [IstimeActive, setIsTimeActive] = useState(true)
  const [resendOtp, setResendOtp] = useState(false)
  const [errOtp, setErrorOtp] = useState(false)
  const [flowdata, setFlow] = useState()

  const [tabs, settab] = useState(0)
  const [checkAgree, setCheckAgree] = useState(true)
  const [pancardError, setPancardError] = useState(true)
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisibility] = useState(false)
  const [disableData, setDisbleData] = useState([])
  const [nameLengthValidate, setNameLengthValidate] = useState(false)
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [scoreData, setScoreData] = useState(null)
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [form1Disable, setForm1Disable] = useState(true)
  const [formStepper, setFormStepper] = useState(0)
  const [transactionId, setTransactionId] = useState('')
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const [messageType, setMessageType] = useState('')
  const [showPanForm, setShowPanForm] = useState(false)
  const [showIsThatYou, setShowIsThatYou] = useState(false)
  const [fieldValue, setFieldValue] = useState()
  const [termsModal, setTermsModal] = useState(false)
  const [emailValid, setEmailValid] = useState(true)

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const token = typeof window !== 'undefined' && localStorage.getItem('token')

  const buttonName = isLandingPage ? 'Check Instantly' : 'Next'

  const localData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localData && JSON.parse(localUserData)

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [time])

  const formatTime = (time) => {
    return time?.toString().padStart(2, '0')
  }

  useEffect(() => {
    if (time === 0) {
      setIsTimeActive(false)
      setResendOtp(true)
    }
  }, [time])

  const selectDateHandler = (d) => {
    setDate(d)
  }

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const handleValidation = (e) => {
    // const inputValue = e.target.value
    const FirstNameCheck = scoreformData?.full_name?.match(/^[a-zA-Z a-zA-Z]+$/)
    const extractedName = scoreformData?.lastname?.replace(/^[a-zA-Z a-zA-Z]+$/, '')
    const MiddleName = scoreformData?.middlename?.replace(/^[a-zA-Z a-zA-Z]+$/, '')

    if (!extractedName) {
      setErrorLast(false)
    } else {
      setErrorLast(true)
    }
    if (FirstNameCheck) {
      setErrorName(true)
    }
    if (scoreformData?.full_name?.length === 50) {
      setNameLengthValidate(true)
    } else {
      setErrorName(false)
    }
    if (!MiddleName) {
      setErrorMiddle(false)
    } else {
      setErrorMiddle(true)
    }
  }

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

  const handleChange = (event) => {
    if (event?.target?.name === 'email') {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setEmailValid(false)
      else setEmailValid(true)
      setScoreFormdata({ ...scoreformData, email: event?.target?.value })
    }
    setErrorHrefName(false)
    if (event?.target?.name === 'full_name') {
      const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
      if (hrefRegex.test(event?.target?.value)) {
        if (event?.target?.name === 'full_name') {
          setErrorHrefName(true)
        }
      } else {
        setScoreFormdata({ ...scoreformData, [event?.target?.name]: event?.target?.value })
      }
    } else {
      if (event?.target?.name === 'pan_no') {
        const inputValue = event?.target?.value?.toUpperCase()
        const isValidInput = panRegex.test(inputValue)
        setPancardError(isValidInput)
        setScoreFormdata({ ...scoreformData, pan_no: inputValue })
        setPanVerifyCard(false)
      }
      setScoreFormdata({ ...scoreformData, [event?.target?.name]: event?.target?.value })
    }
  }

  useEffect(() => {
    if (scoreformData?.pan_no) {
      const uppercaseValue = scoreformData?.pan_no.toUpperCase()
      setScoreFormdata({ ...scoreformData, pan_no: uppercaseValue })
    }
  }, [scoreformData?.pan_no])

  const dateform = moment(scoreformData?.dob)
  const formatDateTime = dateform.format('DD-MM-YYYY')

  const handleChangeNumber = (e) => {
    const inputValue = e?.target?.value
    const extractedNumber = inputValue?.replace(/\D/g, '')
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

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const getCibilFromExperian = (token, leadId, fromPan = false) => {
    setLoading(true)
    const headersAuth = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    }
    let params = {
      full_name: panVerifyCard ? panVerifyName : scoreformData?.full_name,
      mobile_no: String(scoreformData?.mobile) || String(mobile) || '',
      gender: scoreformData?.gender?.toLowerCase() || '',
      dob: scoreformData?.dob || null,
      email: scoreformData?.email ? scoreformData?.email : 'abc@gmail.com',
      pan: scoreformData?.pan_no || null,
      pin_code: scoreformData?.pin_code || null,
      request_id: '',
      terms: 'agree',
      lead_profile_id: leadId || ''
    }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (deviceId) params = { ...params, device_id: deviceId }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (fieldValue) params = { ...params, utm_details: fieldValue }

    axios
      .post(BASE_URL + CIBIL?.withoutotpcibil, params, { headers: headersAuth })
      .then((response) => {
        setLoading(false)
        if (response?.data?.message === 'success') {
          if (response?.data?.data?.info === 'Cibil  generated!!') router.push('/my-profile/credit-reports')
        } else {
          if (response?.data?.code === 2) router.push('/my-profile/no-cibil-score')
          if (response?.data?.data === 'consumer record not found') setShowPanForm(true)
          if (fromPan) {
            setShowPanForm(true)
          } else {
            setFormStepper(1)
            setShowPanForm(true)
          }
        }
      })
      .catch((error) => {
        setFormStepper(1)
        setShowPanForm(true)
        setLoading(false)
      })
  }

  // check pan and no. verification
  const fetchPanMobValidData = () => {
    const params = {
      mobile_no: String(scoreformData?.mobile),
      pan_no: scoreformData?.pan_no
    }
    axios
      .post(BASE_URL + COMMON.panMobValidation, params)
      .then((res) => {
        if (res?.data?.code === 0) {
          getCibilFromExperian(token, leadId, true)
          // setShowIsThatYou(true)
        } else if (res?.data?.code === 1) {
          toast.error(res?.data?.data)
        }
      })
      .catch((err) => {
        return err
      })
  }

  // const handleYes = () => {
  //   setShowIsThatYou(false)
  // }

  // const handleNo = () => {
  //   setShowIsThatYou(false)
  //   setShowPanForm(false)
  //   setFormStepper(0)
  // }

  const GetScoreHistory = (token, leadId) => {
    setLoading(false)
    setLoadingOtp(false)
    setOtpModalOpen(false)
    const headersAuth = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    }
    axios
      .post(
        BASE_URL + USERSET?.creditscorehistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setScoreData(response?.data?.current_score)
          if (response?.data?.current_score) {
            const checkIfWithinLast30days = isDateWithinLast30Days(response?.data)
            if (checkIfWithinLast30days) {
              getCibilFromExperian(token, leadId)
            } else router?.push({ pathname: '/my-profile/credit-reports' })
          } else if (response?.data?.current_score === 0 || response?.data?.credit_history?.length === 0) {
            getCibilFromExperian(token, leadId)
          }
        }
      })
      .catch((error) => {
        errorHandling(error)
      })
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      setFieldValue(utm_details)
    }
  }, [])

  useEffect(() => {
    if (
      (scoreformData?.full_name || panVerifyName) &&
      scoreformData?.email &&
      scoreformData?.mobile &&
      scoreformData?.pin_code &&
      scoreformData?.pan_no?.length == 10 &&
      checkAgree
    ) {
      setDisbaled(true)
    } else {
      setDisbaled(false)
    }
  }, [scoreformData, checkAgree])

  useEffect(() => {
    if (scoreformData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [scoreformData?.pin_code?.length])

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: scoreformData?.pin_code
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
        } else if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        }
      })
  }

  const GetUserSetUp = (e) => {
    if (leadId) {
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
            setScoreFormdata(response?.data?.data)
            setDisbleData(response?.data?.data)
            if (response?.data?.data?.email !== null) {
              setCheckVerifyEmail(true)
            }
            const apiDob = response?.data?.data?.dob
            setDate(new Date(apiDob))
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(error?.response?.data?.reason)
          } else if (error?.response?.status == 401) {
            router.push('/login')
            toast.success(ApiMessage?.logoutmessage)
            handleRemoveLocalstorage()
          }
        })
    }
  }

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
        setPinCode([])
        // setLoading(false);
      })
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref?.current && !ref?.current?.contains(event.target)) {
          setVisibility(false)
        }
      }
      if (typeof window !== 'undefined') {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  // ---------------INITATE OTP CALL ---------------- //
  const callInitiateOtp = () => {
    // e.preventDefault()
    axios
      .post(
        BASE_URL + AUTHUSER?.initinatOtp,
        {
          mobile_no: String(scoreformData?.mobile) || String(mobile) || '',
          device_id: '',
          condition_accepted: true,
          whatsaap_consent: false
        },
        { headers: headers }
      )
      .then((response) => {
        setOtpModalOpen(true)
        setTransactionId(response?.data?.transaction_id)
        setMessageType(response?.data?.type)
        setTempOtp(response?.data?.is_temp_otp)
        if (typeof window !== 'undefined') {
          localStorage.setItem('transaction_id', response?.data?.transaction_id)
          localStorage.setItem('auth_type', response?.data?.type)
        }
        toast.success(ApiMessage?.otpsentsuccessfully)
        // setIsOpen(1)
        setIsTimeActive(true)
        setResendOtp(false)
        setTime(60)
        setLoading(false)
        // setOtpModalOpen(true)
      })
      .catch((error) => {
        setLoading(false)
        if (error?.response?.data?.detail?.[0]?.type === 'string_pattern_mismatch') {
          toast.error('Please enter a valid mobile number')
        } else {
          errorHandling(error)
        }
      })
  }
  const handleForm1Submit = () => {
    if (token && scoreformData && Object.keys(scoreformData)?.length > 0 && leadId) {
      // user is logged in
      GetScoreHistory(token, leadId)
    }
    //call initiate otp
    else {
      callInitiateOtp()
    }
  }

  //-------------verify OTP-----------//
  const verifyOtpCall = (e) => {
    if (e?.length === 4) {
      setLoadingOtp(true)
      setLoading(true)
      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionId,
            otp: e,
            mobile_no: String(scoreformData?.mobile) || String(mobile),
            type: messageType || localStorage.getItem('auth_type'),
            is_temp_otp: tempOtp
          },
          { headers: headers }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            if (!scoreformData?.mobile || !scoreformData?.pan_no || !scoreformData?.full_name) {
              setScoreFormdata(response?.data?.data)
            }
            setResponseData(response?.data)
            localStorage.setItem('token', response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
            localStorage.setItem('auth_Otp', e)
            localStorage.setItem('userData', JSON.stringify(response?.data?.data))
            toast.success(ApiMessage?.loginverify)
            GetScoreHistory(response?.data?.data?.access_token, response?.data?.data?.lead_profile_id)
          }
        })
        .catch((error) => {
          errorHandling(error)
          setLoadingOtp(false)
        })
    }
  }

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp.replace(/\D/g, '')
    setOtpdataCibil(extractedOtp)
    if (extractedOtp?.length === 4) {
      // call verify otp
      verifyOtpCall(extractedOtp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }
  const isPanDisabled = () => {
    if (userData?.pan_no) return true
    else return false
  }

  const data = { ref: topRef || nameRef, isMobile: mobileView }
  const emailCondition = !token && !checkVerifyEmail

  const getMobileAndNameForm = () => {
    return (
      <>
        <div>
          <div>
            <label className='text-[13px] font-normal text-[#212529] ' htmlFor='mobile'>
              Mobile Number
            </label>

            <div className={errMsg || zeroNumberValidation ? ' border-[#FF000F]  ' : ''}>
              <input
                type='tel'
                name='mobile'
                id='mobile'
                pattern='[0-9]*'
                className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                placeholder='Enter 10 Digit Number'
                onChange={(e) => {
                  e.target.value = e?.target?.value?.replace(/\D/g, '')
                  handleChangeNumber(e)
                  handleChange(e)
                }}
                onFocus={() => ScrollToTop2(data)}
                defaultValue={scoreformData?.mobile}
                required
                maxLength={10}
              />
            </div>
            {errMsg && <p className='text-[12px] text-[#FF000F] font-no'>Please enter the valid phone number</p>}
            {zeroNumberValidation && (
              <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
            )}
          </div>
          <div className='mt-[21px]'>
            <label className='text-[13px] font-normal text-[#212529]' htmlFor='date'>
              Full Name
            </label>
            <input
              className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              id='full_name'
              name='full_name'
              // disabled={scoreformData?.is_pan_verified === '1' || panVerifyCard ? true : false}
              type='text'
              onChange={(e) => {
                handleChange(e)
                handleValidation(e)
              }}
              pattern='[A-Za-z]+'
              onInput={(e) => {
                e.target.value = removeNonAlphaNumeric(e)
              }}
              placeholder='Enter Your Name'
              defaultValue={scoreformData?.full_name || panVerifyName}
            />
            {errorName && (
              <p className='text-[12px] text-[#FF000F] font-no'>Please enter a valid name containing only letters.</p>
            )}
            {errorHrefName && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>Do not enter any link</p>}
            {nameLengthValidate && (
              <p className='text-[12px] text-[#FF000F] font-no'>Please enter name less than 50 letters.</p>
            )}
          </div>
          {emailCondition && (
            <div className='mt-[21px]'>
              <CommonEmailInput value={scoreformData?.email} handleChange={handleChange} />
            </div>
          )}
          {isLandingPage ? (
            <LandingPageCheckAgree
              checkAgree={checkAgree}
              setCheckAgree={setCheckAgree}
              setTermsModal={setTermsModal}
            />
          ) : (
            <CheckAgree checkAgree={checkAgree} setCheckAgree={setCheckAgree} setTermsModal={setTermsModal} />
          )}
          {!token &&
            (isLandingPage && size?.width > 768 ? (
              <div className=" mt-[30px] text-neutral-700 !text-[12px] font-normal font-['Poppins']">
                You will receive an OTP on your number.
              </div>
            ) : (
              !isLandingPage && (
                <div className=" mt-[30px] text-neutral-700 text-[15px] font-normal font-['Poppins']">
                  You will receive an OTP on your number.
                </div>
              )
            ))}
          <div
            // className=''
            className={`${
              !otpModalOpen && mobileView
                ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-4 w-full flex justify-between items-center'
                : 'mt-[16px]  text-left w-full h-[48px]'
            }`}>
            <button
              type='submit'
              disabled={form1Disable}
              onClick={() => {
                handleForm1Submit()
              }}
              className={
                form1Disable
                  ? 'text-[18px]   min-[1200px]:w-[300px] w-full items-center cursor-pointer text-white max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#E6ECF1] rounded-lg max-[771px]:px-3 max-sm:w-full max-[620px]:text-[20px] max-[620px]:font-semibold max-[620px]:w-full'
                  : 'text-[18px]   min-[1200px]:w-[300px] w-full items-center cursor-pointer text-[#212529] max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full max-[620px]:text-[20px]  max-[620px]:font-semibold max-[620px]:w-full'
              }>
              {buttonName}
            </button>
          </div>
        </div>
      </>
    )
  }

  const getPanCardForm = () => {
    return (
      <>
        <div>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='date'>
            PAN Card
          </label>
          <Input
            className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${
              !pancardError ? 'border-red-500' : 'border-[#C2CACF] '
            }`}
            id='pan_no'
            name='pan_no'
            maxLength={10}
            type='text'
            disabled={isPanDisabled()}
            value={scoreformData?.pan_no}
            onChange={(e) => handleChange(e)}
            placeholder='Enter your PAN card number'
          />
          {scoreformData?.pan_no
            ? !pancardError && <p className='text-[12px] text-[#FF000F] font-no'>Please enter the valid PAN number</p>
            : ''}
        </div>
        <div
          className={`${
            !showIsThatYou && mobileView
              ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-4 w-full flex justify-between items-center z-[999]'
              : 'mt-[16px]  text-left w-full h-[48px]'
          }  `}>
          <button
            type='submit'
            disabled={!pancardError === true || !scoreformData?.is_pan_verified === '1'}
            onClick={() => {
              fetchPanMobValidData()
              // getCibilFromExperian(token, leadId, true)
            }}
            className={
              !pancardError === true || !scoreformData?.is_pan_verified === '1'
                ? 'text-[18px] w-[300px] items-center cursor-pointer text-white max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#E6ECF1] rounded-lg max-[771px]:px-3 max-sm:w-full'
                : 'text-[18px] w-[300px] items-center cursor-pointer text-[#212529] max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full'
            }>
            Next
          </button>
        </div>
      </>
    )
  }

  const getOTPComponent = () => {
    return (
      <div className='w-[35vw] h-auto py-[40px] bg-white rounded-3xl relative left-[30%] px-[20px]'>
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden'>
                <div className=' flex flex-col items-center justify-center sm:flex sm:items-center bg-white rounded-lg  pt-[60px] pb-[45px] max-sm:[35px] min-[1500px]:px-[45px]  px-[45px] min-h-full'>
                  <div className=''>
                    <button
                      className='flex absolute cursor-pointer right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                      onClick={() => setOtpModalOpen(false)}>
                      <Image
                        src={closeIcon}
                        className='w-[20px] max-xs:w-[13px] h-auto'
                        width={20}
                        height={20}
                        alt='img_text'
                        priority={true}
                      />
                    </button>
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
                            +91 {scoreformData?.mobile ? scoreformData?.mobile : mobile}
                          </span>{' '}
                          <button
                            onClick={() => setOtpModalOpen(false)}
                            className='text-[#49D49D] cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
                            Edit Number
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className='flex mt-4 max-[479px]:justify-center '>
                      <div className='space-x-2 otp-data-box text-[#212529]'>
                        <OTPInput
                          value={otpdatacibil}
                          onChange={(e) => handleChangeOtp(e)}
                          numInputs={4}
                          name='otp'
                          inputType='tel'
                          renderInput={(props) => <input {...props} />}
                        />
                        {errOtp && (
                          <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>
                        )}
                      </div>
                    </div>
                    <p className='font-normal  pt-5 max-[479px]:text-center text-[#212529]'>
                      Resend OTP in 00:{formatTime(time)} Sec
                    </p>
                    <div className=' pt-4 max-[479px]:text-center'>
                      {resendOtp ? (
                        <SubmitFormBtn name='Resend OTP' onClick={callInitiateOtp} />
                      ) : (
                        <SubmitFormBtn
                          name='Submit'
                          disabled={
                            flowdata === 'auth' ? otpdatacibil?.length < 4 : otpdatacibil?.length < 6 || isLoadingOtp
                          }
                          // onClick={EligibilityValidationOtp}
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const getFormOnly = () => {
    return (
      <div
        className={`min-[1400px]:w-[585px] h-auto ${
          isLandingPage ? 'py-[14px]' : 'py-[40px]'
        } bg-white rounded-3xl flex items-center justify center flex-col  max-sm:left-0 max-sm:w-auto min-[1024px]:w-full`}>
        {!isLandingPage && (
          <div className="text-center text-neutral-800 text-2xl font-medium font-['Poppins'] mb-[30px] max-sm:text-[18px]">
            Let’s check your credit score
          </div>
        )}
        <div className={`w-full px-[60px] max-sm:px-[20px] ${isLandingPage ? '' : ''}`} ref={topRef}>
          {formStepper === 0 && getMobileAndNameForm()}
          {showPanForm && getPanCardForm()}
        </div>
      </div>
    )
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (otpModalOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
    }
  }, [otpModalOpen])

  useEffect(() => {
    if (scoreformData?.mobile && scoreformData?.full_name && checkAgree && scoreformData?.email && emailValid) {
      setForm1Disable(false)
    } else setForm1Disable(true)
  }, [scoreformData?.mobile, scoreformData?.full_name, checkAgree, scoreformData?.email, emailValid])

  useEffect(() => {
    if (userData?.mobile && userData?.full_name && userData?.pan_no) {
      setScoreFormdata(userData)
    } else if (token) {
      GetUserSetUp()
    }
  }, [showPanForm])

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
      {isLandingPage ? (
        getFormOnly()
      ) : (
        <div className='container bg-[#F4F8FB] mx-auto px-14 max-[991px]:max-w-full max-[1440px]:px-12 max-md:px-8  max-[479px]:px-2  max-[375px]:px-2 max-[320px]:px-4 h-auto  pt-[20px] pb-[60px] justify-around max-[576px]:pt-[10px] max-[576px]:pb-[30px] max-[479px]:pt-4 max-[479px]:pb-10 max-[479px]:h-auto'>
          <div className='grid grid-cols-2 gap-[30px] max-[576px]:grid-cols-1 max-sm:gap-[24px] md:grid-cols-1 lg:grid-cols-2'>
            <div className='flex flex-col'>
              <h1 className='sm:text-[28px] md:px-0 px-2 max-sm:text-[24px] max-xs:text-[18px] font-semibold  text-[#212529] sm:leading-[50px] max-sm:leading-[33px]  font-[poppins]'>
                Check Your Credit Score for Free
              </h1>
              <div className='md:px-0 px-2'>
                <ParagraphBanner metaResponseBanner={metaData} />
              </div>
            </div>
            <div>{getFormOnly()}</div>
          </div>
        </div>
      )}
      {otpModalOpen && getOTPComponent()}
      {/* {showIsThatYou && (
        <IsThatYouComp
          handleYes={handleYes}
          handleNo={handleNo}
          question={`${scoreformData?.full_name || panVerifyName} is that you?`}
          noText='Not Me'
          yesText='Yes, It’s Me'
        />
      )} */}
    </>
  )
}

export default CreditScoreBanner
