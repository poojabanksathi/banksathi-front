/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Input from '@/core/component/Leads/InputComponent/Input'
import SubmitFormBtn from '../common/SubmitFormBtn'
import { AUTHUSER, BASE_URL, COMMON, ELIGIBILITY, LEADAPPAPI, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { useRouter } from 'next/router'
import OTPInput from 'react-otp-input'
import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import moment from 'moment'
import jwt from 'jwt-decode'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '@/core/component/common/CommonList/CommonFieldComponent/MobileNumber'
import {
  handleRemoveLocalstorage,
  removeNonAlphaNumeric,
  getHash,
  sendEventToGTM,
  errorHandling,
  panRegex,
  emailRegex,
  mobileNumberRegex
} from '@/utils/util'
import Loader from '@/core/component/Leads/common/Loader'
import LoaderLogo from '../../../public/assets/logo-loader.gif'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import NewFormsIcons from '../common/CommonList/NewFormsIcons/NewFormsIcons'
import CheckAgree from '../common/CommonList/CheckAgree/CheckAgree'
import { useWindowSize } from '@/hooks/useWindowSize'
import { ScrollToTop2 } from '@/utils/util'
import closeIcon from '../../../public/assets/closeIcon.svg'
import TagManager from 'react-gtm-module'
import { MainContext } from './MainContext'

const IsThatYouComp = dynamic(() => import('@/core/component/common/CommonList/IsThatYouComp/IsThatYouComp'), {
  ssr: false
})

const LeadApplyNowForm = (props) => {
  const { formDataChange, setFormDataChange, FData } = props
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const [profileformData, setProfileFormdata] = useState({ gender: 'Male' })
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorCompany, setErrorCompany] = useState(false)
  const [errorPincode, setErrorPinCode] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(0)
  const [otpModal, setOtpModal] = useState(false)
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
  const [checkAgree, setCheckAgree] = useState(true)
  const [pancardError, setPancardError] = useState()
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [pincodeNumber, setPincodeNumber] = useState()
  const [termsModal, setTermsModal] = useState(false)
  const [monthlyError, setmonthlyError] = useState(false)
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
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [emailValid, setEmailValid] = useState(true)
  const [errHrefCompany, setErrHrefCompany] = useState(false)
  const [panVerifyModal, setPanVerifyModal] = useState(false)
  const [dataFieldsCheck, setDataFieldsCheck] = useState(false)
  const [panNumber, setPanNumber] = useState('')
  const [pinCodeError, setPinCodeError] = useState(false)
  const [firstPageInputData, setFirstPageInputData] = useState({})
  const [isValid, setIsValid] = useState(true)
  const productData = useContext(MainContext)
  const category_url = productData?.product_details?.url_slug?.split('/')[1]

  const userData =
    typeof window !== 'undefined' && localStorage?.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null

  const today = new Date()
  const router = useRouter()
  const [fieldValue, setFieldValue] = useState()

  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const [dataOtp, setdataOtp] = useState([])

  const [currentStep, setCurrentStep] = useState(1)
  const [firstSuccess, setFirstSuccess] = useState(false)
  const [verifyOtpIsCalled, setVerifyOtpIsCalled] = useState(false)

  const data = { ref: topRef || nameRef, isMobile: mobileView }

  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')


  const finalArray = userData?.eligible_product?.credit_cards
    const finalData = productData?.product_details?.url_slug.split('/').pop();
    const isEligible = finalArray?.includes(finalData);   

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  useEffect(() => {
    props?.data?.step.handleFormActiveStep(currentStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const checkAllDataFields = () => {
    if (profileformData && Object.keys(profileformData)?.length > 0) {
      const isNot =
        !profileformData?.pan_no ||
        !profileformData?.mobile ||
        !profileformData?.full_name ||
        !profileformData?.pin_code ||
        !profileformData?.gender ||
        !profileformData?.dob ||
        !profileformData?.email ||
        !profileformData?.occupation ||
        !profileformData?.company_name ||
        !profileformData?.monthly_salary
      setDataFieldsCheck(isNot)
      return isNot
    }
  }
  const GetUserSetUp = (access_token = token, id = leadId) => {
    const headersAuth = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${access_token}`
    }
    axios
      .post(
        BASE_URL + USERSET?.getusersetup,
        {
          lead_profile_id: id
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message === 'success') {
          setProfileFormdata((prevData) => ({
            ...prevData,
            ...response?.data?.data
          }))
          checkAllDataFields()
          if (response?.data?.data?.email !== null) {
            setCheckVerifyEmail(true)
          }
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(response?.data?.data))
          }
          const apiDob = response.data?.data?.dob
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  //forms
  const selectDateHandler = (d) => {
    setDate(d)
  }

  useEffect(() => {
    if (otpModal) {
      if (time > 0) {
        const timer = setTimeout(() => {
          setTime(time - 1)
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [time, otpModal])

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  useEffect(() => {
    if (time === 0) {
      setIsTimeActive(false)
      setResendOtp(true)
    }
  }, [time])

  const handlePincodeChange = (event) => {
    setVisibility(true)
    const PincodeErr = event.target.value.replace(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/g, '')
    if (!PincodeErr) {
      setErrorPinCode(false)
    } else {
      setErrorPinCode(true)
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
    const isAllZero = extractedNumber === '0000000000'
    if (extractedNumber?.length === 10) {
      SetMobile(extractedNumber)
      setErrorMsg(false)
      const isValid = mobileNumberRegex.test(inputValue)
      if (!isValid && !zeroNumberValidation && !isAllZero) setErrorMsg(true)
    } else if (extractedNumber?.length < 10) {
      setErrorMsg(true)
      SetMobile(extractedNumber)
    }
    if (isAllZero) {
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
    if (event?.target?.name === 'email') {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setEmailValid(false)
      else setEmailValid(true)
      setProfileFormdata({ ...profileformData, email: event?.target?.value })
    }
    if (event?.target?.name === 'company_name' || event?.target?.name === 'full_name') {
      const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
      if (hrefRegex.test(event.target.value)) {
        if (event?.target?.name === 'company_name') {
          setErrHrefCompany(true)
        } else if (event?.target?.name === 'full_name') {
          setErrorHrefName(true)
        }
      } else {
        setProfileFormdata({ ...profileformData, [event?.target?.name]: event?.target?.value })
      }
    } else {
      if (event?.target?.name === 'pan_no') {
        const inputValue = event.target.value.toUpperCase()
        const isValidInput = panRegex.test(inputValue)
        setIsValid(isValidInput)
        setPanVerifyCard(false)
        setProfileFormdata({ ...profileformData, pan_no: inputValue })
      } else setProfileFormdata({ ...profileformData, [event?.target?.name]: event?.target?.value })
    }
    if (event?.target?.name === 'monthly_salary') {
      setProfileFormdata({ ...profileformData, ['monthly_salary']: parseInt(event?.target?.value) })
    }
  }

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

  const handleNumberEdit = () => {
    setOtpModal(false)
    setOtpdata([])
  }

  const dateform = moment(profileformData?.dob)
  const formatDateTime = dateform.format('DD-MM-YYYY')

  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const headersotpsend = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const LeadeSendOtpApi = (e) => {
    axios
      .post(
        BASE_URL + LEADAPPAPI.leadsendotp,
        {
          device_id: '',
          condition_accepted: true,
          whatsaap_consent: false,
          mobile_no: profileformData?.mobile ? profileformData?.mobile : mobile
        },
        { headers: headersotpsend }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setLoadingOtp(false)
          setLoading(false)
          toast.success(ApiMessage?.otpsentsuccessfully)
          //  setFormDataChange(2)
          localStorage.setItem('transaction_id', response?.data?.transaction_id)
          localStorage.setItem('auth_type', response?.data?.type)
          localStorage.setItem('istempotp', response?.data?.is_temp_otp)
          props.data.page.handlePage('otp')
          // token && window?.location?.reload()
        }
      })

      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
          setLoading(false)
          setLoadingOtp(false)
        } else if (error?.response?.status == 422) {
          if (error?.response?.data?.message?.mobileNo) {
            toast.error(error?.response?.data?.message?.mobileNo[0])
          }
          if (error?.response?.data?.message?.method) {
            toast.error(error?.response?.data?.message?.method[0])
          }
        } else if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        }
      })
  }
  //
  const verifyNextBtn =
    (profileformData?.pan_no || firstPageInputData?.pan_no) &&
    (profileformData?.mobile || firstPageInputData?.mobile) &&
    (profileformData?.full_name || firstPageInputData?.full_name) &&
    checkAgree &&
    isValid &&
    !errMsg

  const personalNextBtn =
    profileformData?.dob &&
    profileformData?.pin_code &&
    profileformData?.email &&
    profileformData?.gender &&
    !pinCodeError &&
    emailValid

  const personalLocalBtn = userData?.dob && userData?.pin_code && userData?.email && userData?.gender

  const itrMonth = profileformData?.itr_amount || profileformData?.monthly_salary
  const checkELibilityBtn = profileformData?.company_name && profileformData?.occupation && itrMonth
  const localCheckELibilityBtn = userData?.company_name && userData?.occupation && itrMonth

  const firstPageMobile = firstPageInputData?.mobile ? String(firstPageInputData?.mobile) : null

  const EligibilityValidationOtp = (e) => {
    let params = {
      url_slug: router.query.eligible ? router.query.eligible : null,
      lang_id: 1,
      flow: flowdata,
      cibil_otp: flowdata === 'auth' ? null : e,
      auth_otp: flowdata === 'auth' ? e : null,
      stgOneHitId: stgonehitId || '',
      stgTwoHitId: stgtwohitId || '',
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
      lead_profile_id: leadId || null
    }
    if (profileformData || flowdata === 'auth' ? e.length == 4 : e.length == 6) {
      axios
        .post(BASE_URL + ELIGIBILITY?.eligibilityValidOtp, params, { headers: headers })
        .then((response) => {
          if (response?.data?.message == 'success') {
            toast.success(ApiMessage?.verifyotp)
            if (!response?.data?.data?.is_first_time_user)
              setProfileFormdata((prevData) => ({
                ...prevData,
                ...response?.data?.data
              }))
            localStorage.setItem('@alternatdata', response?.data?.data?.alternate_product)
            localStorage.setItem('@eligibleproduct', response?.data?.data?.eligible_product)
            localStorage.setItem('token', response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
            router.push(`/credit-cards/eligibility/result`)
            setLoadingOtp(false)
            setDisbaled(true)
            setFormDataChange(2)
          } else if (response?.data?.message == 'failed') {
            toast.error(response?.data?.data?.errorString)
            setLoadingOtp(false)
          } else if (response?.data?.data?.pan_no) {
            router.push(`/credit-cards/eligibility/result`)
          }
        })

        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
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

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: profileformData?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {})
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        }
      })
  }

  const transactionid = localStorage.getItem('transaction_id')
  const messagetype = localStorage.getItem('auth_type')
  const istempotpData = localStorage.getItem('istempotp')

  const previousController = useRef()

  const getData = (searchPinCode) => {
    if (previousController.current) {
      previousController.current.abort()
    }
    const controller = new AbortController()

    previousController.current = controller
    let url = BASE_URL + COMMON.pinCodeVerify

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
        if (response.data.data.pincode_data?.pincodes?.length <= 0) {
          setPinCode([])
          setVisibility(false)
          setPinCodeError(true)
        } else {
          setPinCodeError(false)
          setPinCode(response.data.data.pincode_data?.pincodes)
        }
      })
      .catch((error) => {
        setPinCode([])
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

  const fetchPanMobValidData = () => {
    const paramsPan = {
      mobile_no: String(profileformData?.mobile) || firstPageMobile,
      pan_no: profileformData?.pan_no || firstPageInputData?.pan_no
    }
    axios
      .post(BASE_URL + COMMON.panMobValidation, paramsPan)
      .then((res) => {
        if (res?.data?.code === 0) {
          if (personalNextBtn && checkELibilityBtn) {
            LeadeAddGloble()
          } else {
            if (verifyNextBtn && !token) {
              // setFormDataChange(2)
              setOtpModal(true)
              LeadeSendOtpApi()
            } else setFormDataChange(2)
          }
        } else if (res?.data?.code === 1) {
          toast.error(res?.data?.data)
        }
      })
      .catch((err) => {
        return err
      })
  }

  const handleVerifyNextClick = () => {
    if (!token) setFirstPageInputData(profileformData)
    fetchPanMobValidData()
    token && setFormDataChange(2)
    if (personalNextBtn && checkELibilityBtn) {
      LeadeAddGloble()
    } else {
      verifyNextBtn && setPanVerifyModal(true)
    }
  }

  const LeadeVerifyOtp = (e) => {
    if (e.length == 4) {
      setLoadingOtp(true)
      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionid,
            otp: e,
            mobile_no: mobile,
            type: messagetype,
            is_temp_otp: istempotpData
          },
          { headers: headers }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            setLoadingOtp(false)
            localStorage.setItem('token', response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
            localStorage.setItem('auth_Otp', e)
            localStorage.setItem('is_verify_lead', true)
            const userDataVerify = response?.data?.data
            setdataOtp(userDataVerify)
            toast.success(ApiMessage?.loginverify)
            setOtpModal(false)
            // setFormDataChange(2)
            GetUserSetUp(response?.data?.data?.access_token, response?.data?.data?.lead_profile_id)
            setVerifyOtpIsCalled(true)
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(ApiMessage?.validotpenter)
            setLoadingOtp(false)
          } else if (error?.response?.status == 500) {
            toast.error(ApiMessage?.internalServerError)
            setLoadingOtp(false)
          }
          setLoadingOtp(false)
        })
    }
  }

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp.replace(/\D/g, '')
    setOtpdata(extractedOtp)
    if (extractedOtp?.length === 4) {
      LeadeVerifyOtp(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }
  const leadUrlSlug = router?.query['product-slug']
  const handleResendOtp = (e) => {
    e?.preventDefault()
    const requestData = {
      mobile_no: mobile,
      device_id: '',
      condition_accepted: true,
      whatsaap_consent: false
    }
    setResendOtp(true)
    axios
      .post(BASE_URL + AUTHUSER?.initinatOtp, requestData, { headers: headers })
      .then((response) => {
        localStorage.setItem('transaction_id', response?.data?.transaction_id)
        localStorage.setItem('type', response?.data?.type)
        localStorage.setItem('temp', response?.data?.is_temp_otp)
        setResendOtp(false)
        setTime(60)
        toast.success('OTP has been resend successfully.')
      })
      .catch((error) => {
        setResendOtp(false)
        toast.error('Failed to resend OTP. Please try again later.')
      })
  }

  //Add Globe Submit api call
  // purchase event
  const sendProductPurchases =
    typeof window !== 'undefined' && localStorage.getItem('purchaseItem')
      ? JSON.parse(localStorage.getItem('purchaseItem'))
      : null

  const h = getHash()

  const handleGTM = () => {
    TagManager?.dataLayer({
      dataLayer: {
        event: 'applied_card',
        product_category: category_url,
        product_name: productData?.product_details?.card_name,
        eligible_status: isEligible
      },
    });
  }

  const LeadeAddGloble = (e) => {
    setLoading(true)
    if (profileformData?.itr_amount?.value === '' || !profileformData?.itr_amount) {
      props?.data?.formFields.handleFieldData({
        ...props.formFields?.fieldData,
        itr_amount: {
          ...props.formFields?.fieldData?.itr_amount,
          error: true
        }
      })
    }
    let params = {
      lead_profile_id: leadId,
      url_slug: leadUrlSlug,
      gender: profileformData?.gender ? profileformData?.gender : FData?.formFields?.fieldData?.gender?.value,
      pan: panNumber
        ? panNumber?.toUpperCase()
        : profileformData?.pan_no
          ? profileformData?.pan_no?.toUpperCase()
          : firstPageInputData?.pan_no
            ? firstPageInputData?.pan_no
            : FData?.formFields?.fieldData?.pan_no?.value?.toUpperCase(),

      full_name: profileformData?.full_name || firstPageInputData?.full_name,
      mobile_no: profileformData?.mobile
        ? String(profileformData?.mobile)
        : firstPageMobile
          ? firstPageMobile
          : String(FData?.formFields?.fieldData?.mobile?.value),
      dob: profileformData?.dob
        ? profileformData?.dob
        : moment(FData?.formFields?.fieldData?.date_of_birth?.value)?.format('DD-MM-YYYY'),
      email: profileformData?.email ? profileformData?.email : FData?.formFields?.fieldData?.email?.value,
      pin_code: profileformData?.pin_code ? profileformData?.pin_code : FData?.formFields?.fieldData?.pin_code?.value,
      occupation: profileformData?.occupation?.toLowerCase()
        ? profileformData?.occupation?.toLowerCase()
        : FData?.formFields?.fieldData?.occupation?.value?.toLowerCase(),
      company_name: profileformData?.company_name
        ? profileformData?.company_name
        : FData?.formFields?.fieldData?.company_name?.value,
      terms: checkAgree ? 'agree' : 'not agree',
      request_id: '',
      monthly_salary: FData?.formFields?.fieldData?.monthly_salary?.value
        ? FData?.formFields?.fieldData?.monthly_salary?.value
        : profileformData?.monthly_salary,
      lang_id: 1,
      itr_amount: FData?.formFields?.fieldData?.itr_amount?.value
        ? FData?.formFields?.fieldData?.itr_amount?.value
        : profileformData?.itr_amount
    }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (deviceId) params = { ...params, device_id: deviceId }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (fieldValue) params = { ...params, utm_details: fieldValue }
    if (h) params = { ...params, h: h }

    axios
      .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, { headers: headersAuth })
      .then((response) => {
        setLoading(false)
        sendEventToGTM(sendProductPurchases)
        if (response?.data?.data?.url) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('purchaseItem')
          }
          router.push(response?.data?.data?.url)
        }
        if (response?.data?.message == 'success') {
          setLoading(false)
          if (token) {
            setFirstSuccess(true)
            props.data.page.handlePage('leads')
            props.data.otp.handleOtpCheck(false)
          }
          handleGTM()
        }
        if (response?.data?.message === 'failed') {
          setLoading(false)
          if (response?.data?.reason || response?.data?.data) {
            // const message = response?.data?.reason || response?.data?.data
            // toast.error(message)
            router.push(`/credit-cards/eligibility?eligible=${leadUrlSlug}&redirect=true`)
          }
        }
      })
      .catch((error) => {
        setLoading(false)
        errorHandling(error)
      })
  }

  const getPanDisable = () => {
    if (userData?.pan_no) return true
    else return false
  }

  useEffect(() => {
    if (profileformData?.pan_no) {
      const uppercaseValue = profileformData?.pan_no.toUpperCase()
      setProfileFormdata({ ...profileformData, pan_no: uppercaseValue })
    }
  }, [profileformData?.pan_no])

  useEffect(() => {
    setProfileFormdata({
      ...profileformData,
      pin_code: pincodeNumber
    })
  }, [pincodeNumber])

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

  useEffect(() => {
    if (profileformData?.occupation && profileformData?.company_name) {
      setDisbaled(false)
    } else {
      setDisbaled(true)
    }
  }, [
    profileformData?.company_name,
    profileformData?.dob,
    profileformData?.email,
    profileformData?.mobile,
    profileformData?.occupation,
    profileformData?.pin_code
  ])

  useEffect(() => {
    if (panVerifyModal === true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [panVerifyModal])

  useEffect(() => {
    if (profileformData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [profileformData?.pin_code?.length])

  useEffect(() => {
    if (verifyOtpIsCalled) {
      if (personalNextBtn && checkELibilityBtn) {
        LeadeAddGloble()
      } else {
        setFormDataChange(2)
      }
    }
  }, [verifyOtpIsCalled, personalNextBtn, checkELibilityBtn])

  useEffect(() => {
    if (token && !profileformData?.mobile) {
      GetUserSetUp()
    }
  }, [])

  //perosonal form
  const getPersonalForm = () => {
    return (
      <>
        <div>
          <div className='pb-[25px] '>
            <h3 className='text-[24px] max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
              Apply Now
            </h3>
            <div ref={topRef}>
              <NewFormsIcons
                stepperData={{
                  firstTtitle: 'Verification',
                  secondTitle: 'Personal Info',
                  thirdTitle: 'Professional Info',
                  modalStepper: 1
                }}
              />
            </div>
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
                  Date of Birth
                </label>
                <div className='datepicker'>
                  <input
                    type='date'
                    showYearDropdown
                    dropdownMode='select'
                    dateFormat='dd-MM-yyyy'
                    placeholderText='DD/MM/YYYY'
                    name='dob'
                    // disabled={profileformData?.dob && token ? true : false}
                    id='dob'
                    className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                    // selected={startDate}
                    onChange={(e) => {
                      selectDateHandler(e)
                      handleChange(e)
                    }}
                    value={profileformData?.dob}
                    max={new Date().toISOString().split('T')[0]}
                    required
                    defaultValue={profileformData?.dob || today}
                    todayButton={'Today'}
                    onFocus={() => ScrollToTop2(data)}
                  />
                </div>
              </div>
            </div>

            <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
              <CommonEmailInput
                value={profileformData?.email}
                // disabled={checkVerifyEmail && token ? true : false}
                handleChange={handleChange}
              />
            </div>
            <div className='relative my-[20px] '>
              <CommonPicodeInput
                value={profileformData?.pin_code}
                getData={getData}
                handleChange={handleChange}
                handlePincodeChange={handlePincodeChange}
                pinCodeError={pinCodeError}
              />
              {visible && (
                <ul className='suggestions pin-suggestion top-[100%] ' ref={wrapperRef}>
                  {pinCode?.map((i, v) => (
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
            <div
              className={` ${
                mobileView
                  ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-4 w-full flex justify-between items-center'
                  : 'pt-4  text-left w-full h-[48px]'
              }`}>
              <button
                type='submit'
                disabled={!personalNextBtn}
                onClick={() => setFormDataChange(3)}
                className={`${
                  personalNextBtn ? 'bg-[#49D49D]' : 'bg-[#d5d7d8]'
                }  w-full lg:w-[303px] py-3  text-black  text-[16px] rounded-lg  hover:border-[#49d49d]  hover:border border hover:text-[#212529] font-[500] duration-300 `}>
                Next
              </button>
            </div>
          </form>
        </div>
      </>
    )
  }
  //professional form
  const getProfessionalForm = () => {
    return (
      <>
        {/* {!localCheckELibilityBtn && ( */}
        <div>
          <div className='pb-[25px] '>
            <h3 className='text-[24px] max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
              Apply Now
            </h3>
            <div ref={topRef}>
              <NewFormsIcons
                stepperData={{
                  firstTtitle: 'Verification',
                  secondTitle: 'Personal Info',
                  thirdTitle: 'Professional Info',
                  modalStepper: 2
                }}
              />
            </div>
          </div>
          <form className='pb-4 profile-form' action='' method='POST' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <p className='   text-[#212529]  max-[1200px]:!pt-0'>Occupation</p>
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
            <div className='grid grid-cols-1 gap-4 max-[479px]:grid-cols-1 '>
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
                  onFocus={() => ScrollToTop2(data)}
                />
                {errHrefCompany && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}

                {errorCompany && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
              </div>
            </div>

            <div className=' '>
              <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
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
                        value={profileformData?.monthly_salary}
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
            </div>

            <div
              className={` ${
                mobileView
                  ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-4 w-full flex justify-between items-center'
                  : 'pt-4  text-left w-full h-[48px]'
              }`}>
              <SubmitFormBtn
                stepperBtn={true}
                name={!isLoading ? 'submit' : <Loader />}
                // disabled={disbaled}
                disabled={!checkELibilityBtn}
                onClick={() => token && LeadeAddGloble()}
              />
            </div>
          </form>
        </div>
        {/* )} */}
      </>
    )
  }

  //forms end
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
      {/* {panVerifyModal && !token && (
        <IsThatYouComp
          question={`${profileformData?.full_name || panVerifyName} is that you?`}
          noText='Not Me'
          yesText='Yes, It’s Me'
          handleYes={handleYes}
          handleNo={handleNo}
        />
      )} */}
      {otpModal && !token && (
        <>
          <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className='fixed inset-0 z-50 overflow-y-auto'>
              <div className='flex min-h-full  items-center justify-center p-4 text-center  sm:p-0'>
                <div className='relative transform overflow-hidden'>
                  <div className=' relative flex flex-col items-center justify-center sm:flex sm:items-center bg-white rounded-lg  pt-[60px] pb-[45px] max-sm:[35px] min-[1500px]:px-[45px]  px-[45px] min-h-full'>
                    <div className=''>
                      <div className='sm:flex sm:items-center  w-full '>
                        <button
                          className='flex absolute cursor-pointer right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                          onClick={() => setOtpModal(false)}>
                          <Image
                            src={closeIcon}
                            className='w-[20px] max-xs:w-[13px] h-auto'
                            width={20}
                            height={20}
                            priority={true}
                            alt='img_text'
                          />
                        </button>
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
                        <div className='space-x-2 otp-data-box text-[#212529]'>
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
                              numInputs={4}
                              name='otp'
                              inputType='tel'
                              renderInput={(props) => <input {...props} />}
                            />
                          )}
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
                          <SubmitFormBtn name={!isLoading ? 'Resend OTP' : <Loader />} onClick={handleResendOtp} />
                        ) : (
                          <SubmitFormBtn
                            name={!isLoadingOtp ? 'Submit' : <Loader />}
                            // disabled={flowdata === 'auth' ? otpdata.length < 4 : otpdata.length < 6 || isLoadingOtp}
                            onClick={EligibilityValidationOtp}
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {formDataChange === 1 && modalIsOpen === 0 && (
        <div>
          <div className='pb-[25px]'>
            <h3 className='text-[24px] leading-[25px] max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
              Apply Now
            </h3>
            <div ref={topRef}>
              <NewFormsIcons
                stepperData={{
                  firstTtitle: 'Verification',
                  secondTitle: 'Personal Info',
                  thirdTitle: 'Professional Info',
                  modalStepper: 0
                }}
              />
            </div>
          </div>
          <form className='pb-4 profile-form' action='' method='POST' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 max-[479px]:grid-cols-1 '>
              <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
                <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='pancard'>
                  PAN Card
                </label>
                <Input
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${
                    pancardError === false ? 'border-red-500' : 'border-[#C2CACF] '
                  }`}
                  id='pan_no'
                  name='pan_no'
                  type='text'
                  maxLength={10}
                  required
                  placeholder='Enter your PAN card number'
                  value={profileformData?.pan_no}
                  disabled={getPanDisable()}
                  onChange={(e) => handleChange(e)}
                  onFocus={() => ScrollToTop2(data)}
                  // endAdornment={pancardError || profileformData?.is_pan_verified === '1' ? <SuccessIcon /> : ''}
                />
                {!isValid && (
                  <div className='text-[12px] text-[#FF000F] font-no  mt-2'>Please enter a valid PAN card number</div>
                )}
              </div>
            </div>

            <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
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
                pattern='^[A-Za-z]+(?:[ -][A-Za-z]+)*$'
                onInput={(e) => {
                  e.target.value = removeNonAlphaNumeric(e)
                }}
              />
              {errorHrefName && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}
              {errorMessage && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
            </div>
            <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
              <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
                Mobile as per Aadhaar
              </label>
              <div>
                <CommonNumberInput
                  // disabled={profileformData?.mobile && token ? true : false}
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
            <CheckAgree checkAgree={checkAgree} setCheckAgree={setCheckAgree} setTermsModal={setTermsModal} />
            <div
              className={` ${
                !otpModal && !panVerifyModal && mobileView
                  ? 'fixed bottom-0 bg-[#FFF] left-0 px-4 py-4 w-full flex justify-between items-center'
                  : 'pt-4  text-left w-full h-[48px]'
              }`}>
              <button
                type='submit'
                disabled={!verifyNextBtn}
                onClick={handleVerifyNextClick}
                className={`${
                  verifyNextBtn ? 'bg-[#49D49D]' : 'bg-[#d5d7d8]'
                }  w-full lg:w-[303px] py-3  text-black  text-[16px] rounded-lg  hover:border-[#49d49d]  hover:border border hover:text-[#212529] font-[500] duration-300 `}>
                Next
              </button>
            </div>
          </form>
        </div>
      )}
      {formDataChange === 2 && getPersonalForm()}
      {formDataChange === 3 && getProfessionalForm()}
    </>
  )
}

export default LeadApplyNowForm
