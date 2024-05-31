/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Input from '@/core/component/Leads/InputComponent/Input'
import SubmitFormBtn from '../../common/SubmitFormBtn'
import { AUTHUSER, BASE_URL, COMMON, ELIGIBILITY, USERSET } from '@/utils/alljsonfile/service'
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
  CheckUserData,
  emailRegex,
  errorHandling,
  handleRemoveLocalstorage,
  mobileNumberRegex,
  panRegex,
  removeNonAlphaNumeric,
  ScrollToTop2
} from '@/utils/util'
import Loader from '@/core/component/Leads/common/Loader'
import LoaderLogo from '../../../../public/assets/logo-loader.gif'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import NewFormsIcons from '../../common/CommonList/NewFormsIcons/NewFormsIcons'
import CheckAgree from '../../common/CommonList/CheckAgree/CheckAgree'
import { useWindowSize } from '@/hooks/useWindowSize'
import closeIcon from '../../../../public/assets/closeIcon.svg'
import TagManager from 'react-gtm-module'

const IsThatYouComp = dynamic(() => import('@/core/component/common/CommonList/IsThatYouComp/IsThatYouComp'), {
  ssr: false
})

const EligibilityForm = ({ formDataChange, setFormDataChange , productList }) => {
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const [profileFormData, setProfileFormData] = useState({ gender: 'Male' })
  const [userInformation, setUserInformation] = useState(profileFormData)
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorCompany, setErrorCompany] = useState(false)
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
  const [checkAgree, setCheckAgree] = useState(true)
  const [pancardError, setPancardError] = useState(true)
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
  const [panValidation, setPanValidation] = useState('')
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [errorHrefEmail, setErrorHrefEmail] = useState(false)
  const [errHrefCompany, setErrHrefCompany] = useState(false)
  const [panVerifyModal, setPanVerifyModal] = useState(false)
  const [city, setCity] = useState()
  const today = new Date()
  const router = useRouter()
  const [fieldValue, setFieldValue] = useState()
  const [transactionId, setTransactionId] = useState('')
  const [messageType, setMessageType] = useState('')
  const [tempOtp, setTempOtp] = useState('')
  const [otpModal, setOtpModal] = useState(false)
  const [pinCodeError, setPinCodeError] = useState(false)
  const [emailValid, setEmailValid] = useState(true)
  const elegibilitypath = router?.query?.eligible
  const category_url = router?.pathname?.split('/')[1]

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const userData =
    typeof window !== 'undefined' && localStorage?.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null

      const eligible_product = typeof window !== 'undefined' && localStorage.getItem('@eligibleproduct')

  const data = { ref: topRef || nameRef, isMobile: mobileView }
  //forms
  //perosonal form
  const getPersonalForm = () => {
    return (
      <>
        {/* {!personalLocalBtn && ( */}
          <div>
            <div className='pb-[25px] '>
              <h3 className='text-[24px] leading-[30px] max-sm:leading-[25px]  max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
                Best Credit Card in a few clicks
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
                        profileFormData?.gender === 'Male' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                      }`}>
                      <input
                        type='radio'
                        name='gender'
                        value={profileFormData?.gender === 'Male' ? profileFormData?.gender === 'Male' : 'Male'}
                        // disabled={profileFormData?.gender ? true : false}
                        checked={profileFormData?.gender === 'Male'}
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
                        profileFormData?.gender === 'Female' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                      }`}>
                      <input
                        type='radio'
                        name='gender'
                        // disabled={profileFormData?.gender ? true : false}
                        value={profileFormData?.gender === 'Female' ? profileFormData?.gender === 'Female' : 'Female'}
                        checked={profileFormData?.gender === 'Female'}
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
                        profileFormData?.gender === 'Other' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                      } `}>
                      <input
                        type='radio'
                        name='gender'
                        // disabled={profileFormData?.gender ? true : false}
                        value={profileFormData?.gender === 'Other' ? profileFormData?.gender === 'Other' : 'Other'}
                        checked={profileFormData?.gender === 'Other'}
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
                      // disabled={profileFormData?.dob && token ? true : false}
                      id='dob'
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      // selected={startDate}
                      onChange={(e) => {
                        selectDateHandler(e)
                        handleChange(e)
                      }}
                      value={profileFormData?.dob || userInformation?.dob}
                      max={new Date().toISOString().split('T')[0]}
                      required
                      defaultValue={profileFormData?.dob || today}
                      todayButton={'Today'}
                      onFocus={() => ScrollToTop2(data)}
                    />
                  </div>
                </div>
              </div>

              <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
                <CommonEmailInput
                  value={profileFormData?.email || userInformation?.email}
                  // disabled={checkVerifyEmail && token ? true : false}
                  handleChange={handleChange}
                  errorHrefEmail={errorHrefEmail}

                  // onFocus={() => ScrollToTop2(data)}
                />
              </div>
              <div className='relative my-[20px] '>
                <CommonPicodeInput
                  value={profileFormData?.pin_code || userInformation?.pin_code}
                  getData={getData}
                  handleChange={handleChange}
                  handlePincodeChange={handlePincodeChange}
                  pinCodeError={pinCodeError}
                />
                {visible && (
                  <ul className='suggestions pin-suggestion top-[100%] ' ref={wrapperRef}>
                    {pinCode.map((i, v) => (
                      <li
                        className={''}
                        key={v}
                        onClick={() => {
                          setProfileFormData({ ...profileFormData, pin_code: i })
                          setVisibility(false)
                        }}>
                        {i}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className='mt-[20px]'>
                <label className='text-[13px] font-normal text-[#212529] ' htmlFor='city'>
                  City
                </label>
                <input
                  className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                  id='city'
                  name='city'
                  type='text'
                  disabled={city || profileFormData?.city}
                  value={pinCodeError ? '' : city || profileFormData?.city}
                  placeholder='Enter your city'
                  onChange={(e) => {
                    if (!city && e?.target?.value) {
                      // setCity(e?.target?.value)
                      setProfileFormData({ ...profileFormData, city: e?.target?.value })
                    }
                  }}
                />
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
        {/* )} */}
      </>
    )
  }
  //professional form
  const getProfessionalForm = () => {
    const salariedCondition = profileFormData?.occupation === 'Salaried' || userInformation?.occupation === 'Salaried'
    const selfEmployedCondition =
      profileFormData?.occupation === 'Self-employed' || userInformation?.occupation === 'Self-employed'

    return (
      <>
        {/* {!localCheckELibilityBtn && ( */}
          <div>
            <div className='pb-[25px] '>
              <h3 className='text-[24px] leading-[30px] max-sm:leading-[25px]  max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
                Best Credit Card in a few clicks
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
                        salariedCondition ? 'text-[#212529] font-normal' : 'text-[#808080]'
                      }`}>
                      <input
                        type='radio'
                        id='occupation'
                        checked={salariedCondition}
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
                        selfEmployedCondition ? 'text-[#212529] font-normal' : 'text-[#808080]'
                      } `}>
                      <input
                        type='radio'
                        id='occupation'
                        name='occupation'
                        checked={selfEmployedCondition}
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
                    disabled={
                      (profileFormData?.company_name?.length || userInformation?.company_name?.length) >= 26 && token
                        ? true
                        : false
                    }
                    value={profileFormData?.company_name || userInformation?.company_name}
                    onChange={(e) => {
                      handleChange(e)
                      handleValidation(e)
                    }}
                    onFocus={() => ScrollToTop2(data)}
                  />
                  {errHrefCompany && (
                    <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>
                  )}

                  {errorCompany && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
                </div>
              </div>

              <div className=' '>
                <div className='mb-[30px] max-[771px]:!mb-4 max-[479px]:mb-0 '>
                  <div className='grid grid-cols-1 gap-4 max-[479px]:grid-cols-1'>
                    {salariedCondition && (
                      <div className={errorMessage ? ' border-[#FF000F] mb-[30px]  ' : 'mb-[30px] max-[771px]:!mb-0'}>
                        <label
                          className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]'
                          htmlFor='name'>
                          Monthly Salary
                        </label>
                        <input
                          className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                          id='salary'
                          name='monthly_salary'
                          type='number'
                          placeholder='Enter your monthly salary'
                          // disabled={profileFormData?.monthly_salary?.length >= 6 && token ? true : false}
                          value={profileFormData?.monthly_salary || userInformation?.monthly_salary}
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
                    {selfEmployedCondition && (
                      <div className={'mb-[30px] max-[771px]:!mb-0'}>
                        <label
                          className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]'
                          htmlFor='name'>
                          ITR (amount)
                        </label>
                        <input
                          className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                          id='itr_amount'
                          name='itr_amount'
                          type='number'
                          placeholder='Enter your ITR (amount)'
                          value={profileFormData?.itr_amount || userInformation?.itr_amount}
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
                  name={!isLoading ? 'Check Eligibility' : <Loader />}
                  // disabled={disbaled}
                  disabled={!checkELibilityBtn}
                  onClick={EligibilityRegister}
                />
              </div>
            </form>
          </div>
        {/* )} */}
      </>
    )
  }
  //forms end

  const selectDateHandler = (d) => {
    // setDate(d)
    if (d?.target?.name === 'dob') {
      setProfileFormData({ ...profileFormData, ['dob']: parseInt(d?.target?.value) })
    }
  }

  useEffect(() => {
    if (time === 0) {
      setIsTimeActive(false)
      setResendOtp(true)
    }
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

  //-------------------------const for fields -----------//
  // FIELDS
  const dob = profileFormData?.dob || userInformation?.dob || ''
  const pin_code = profileFormData?.pin_code || userInformation?.pin_code || ''
  const email = profileFormData?.email || userInformation?.email || ''
  const gender = profileFormData?.gender || userInformation?.gender || ''
  const panNo = profileFormData?.pan_no || userInformation?.pan_no || ''
  const mobileNo = profileFormData?.mobile || userInformation?.mobile || ''
  const name = profileFormData?.full_name || panVerifyName || userInformation?.full_name || ''

  const { itr_amount, monthly_salary } = userInformation

  const companyAndOccupation =
    (profileFormData?.company_name || userInformation?.company_name || '') &&
    (profileFormData?.occupation || userInformation?.occupation || '')

  const salariedCondition = companyAndOccupation === 'Salaried'

  const itrMonth = salariedCondition
    ? profileFormData?.monthly_salary || monthly_salary || ''
    : profileFormData?.itr_amount || itr_amount || ''

  const localCheckELibilityBtn = userData?.company_name && userData?.occupation && itrMonth
  const personalLocalBtn = userData?.dob && userData?.pin_code && userData?.email && userData?.gender
  const verifyNextBtn =
    panNo !== '' && mobileNo !== '' && name !== '' && checkAgree && !zeroNumberValidation && !errMsg && pancardError

  // main conditions
  const personalNextBtn =
    dob !== '' && pin_code !== '' && email !== '' && gender !== '' && !pinCodeError && emailValid ? true : false
  const checkELibilityBtn = companyAndOccupation !== '' && itrMonth !== '' && itrMonth !== '0' ? true : false

  const checkHasAllField = () => {
    if (personalNextBtn && checkELibilityBtn && panNo !== '' && mobileNo !== '' && name !== '') {
      return true
    }
    return false
  }
  const allFields = checkHasAllField()

  const handlePincodeChange = (event) => {
    setVisibility(true)
    const PincodeErr = event.target.value.replace(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/g, '')
    if (!PincodeErr) {
      setErrorPinCode(false)
    } else {
      setErrorPinCode(true)
    }
  }
  // VERIFY OTP
  const callVerifyOtpApi = (e) => {
    if (e?.length === 4) {
      setLoading(true)
      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionId,
            otp: e,
            mobile_no: String(userInformation?.mobile) || String(profileFormData?.mobile) || String(mobile),
            type: messageType || localStorage.getItem('auth_type'),
            is_temp_otp: tempOtp
          },
          { headers: headers }
        )
        .then((response) => {
          setOtpModal(false)
          if (response?.data?.message == 'success') {
            if (!profileFormData?.mobile || !profileFormData?.pan_no || !profileFormData?.full_name) {
              setUserInformation(response?.data?.data)
            }
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', response?.data?.data?.access_token)
              localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
              localStorage.setItem('auth_Otp', e)
              localStorage.setItem('userData', JSON.stringify(response?.data?.data))
            }
            GetUserSetUp(response?.data?.data?.lead_profile_id, response?.data?.data?.access_token, true)
            toast.success(ApiMessage?.loginverify)
            setLoading(false)
            // if (personalNextBtn !== '' && checkELibilityBtn !== '') {
            //   EligibilityRegister()
            // } else {
            //   setFormDataChange(2)
            // }
            setTime(0)
          }
        })
        .catch((error) => {
          errorHandling(error)
          setLoading(false)
        })
    }
  }

  const handleChangeOtp = (e) => {
    // setOtpdata(e)
    const valueotp = e
    const extractedOtp = valueotp.replace(/\D/g, '')
    setOtpdata(extractedOtp)

    if (flowdata === 'auth' ? extractedOtp?.length === 4 : extractedOtp?.length === 6) {
      // EligibilityValidationOtp(valueotp)
      callVerifyOtpApi(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }

  const handleValidation = (e) => {
    const FirstNameCheck = profileFormData?.full_name?.replace(/^[a-zA-Z a-zA-Z]+$/, '')
    const CompanyName = profileFormData?.companyname?.replace(/^[a-zA-Z a-zA-Z]+$/, '')

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
      setProfileFormData({ ...profileFormData, email: event?.target?.value })
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
        setProfileFormData({ ...profileFormData, [event?.target?.name]: event?.target?.value })
      }
    } else {
      if (event?.target?.name === 'pan_no') {
        const inputValue = event?.target?.value?.toUpperCase()
        const isValidInput = panRegex.test(inputValue)
        setPancardError(isValidInput)
        setProfileFormData({ ...profileFormData, pan_no: inputValue })
        setPanVerifyCard(false)
      }
      setProfileFormData({ ...profileFormData, [event?.target?.name]: event?.target?.value })
      setUserInformation({ ...userInformation, [event?.target?.name]: event?.target?.value })
    }
    if (event?.target?.name === 'monthly_salary') {
      setProfileFormData({ ...profileFormData, ['monthly_salary']: parseInt(event?.target?.value) })
    }
  }

  useEffect(() => {
    if (profileFormData?.pan_no) {
      const uppercaseValue = profileFormData?.pan_no.toUpperCase()
      setProfileFormData({ ...profileFormData, pan_no: uppercaseValue })
    }
  }, [profileFormData?.pan_no])

  useEffect(() => {
    setProfileFormData({
      ...profileFormData,
      pin_code: pincodeNumber
    })
  }, [pincodeNumber])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('full_name', panVerifyCard ? panVerifyName : profileFormData?.full_name)
    bodyFormData.append('occupation', (profileFormData?.occupation || userInformation?.occupation)?.toLowerCase())
    bodyFormData.append('companyname', profileFormData?.companyname)
    bodyFormData.append('mobile', profileFormData?.mobile)
    bodyFormData.append('years', profileFormData?.years)
    bodyFormData.append('salary', profileFormData?.salary)
    bodyFormData.append('dob', profileFormData?.dob)
    bodyFormData.append('email', profileFormData?.email)
    bodyFormData.append('pan_no', profileFormData?.pan_no)
    bodyFormData.append('pin_code', profileFormData?.pin_code)
  }
  useEffect(() => {
    if (
      (profileFormData?.occupation || userInformation?.occupation) &&
      profileFormData?.company_name
      // checkAgree == true
    ) {
      setDisbaled(false)
    } else {
      setDisbaled(true)
    }
  }, [
    profileFormData?.company_name,
    profileFormData.email,
    profileFormData.mobile,
    profileFormData?.occupation,
    profileFormData.pin_code,
    userInformation?.occupation
  ])

  const handleNumberEdit = () => {
    setOtpModal(0)
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

  const dateform = moment(profileFormData?.dob)
  const formatDateTime = dateform.format('DD/MM/YYYY')

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  // const headersAuth = {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   Authorization: `Bearer ${token}`
  // }
  const handleGTM = () => {
    const isEligibilityPath = elegibilitypath ? true : false;
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

    if (isEligibilityPath) {

      TagManager?.dataLayer({
        dataLayer: {
          event: 'card_eligibility',
          product_category: category_url,
          product_name: elegibilitypath,
          date: formattedDate,
        },
      });
    } else {
      TagManager?.dataLayer({
        dataLayer: {
          event: 'cards_eligibility',
          Source: fieldValue || "",
          date: formattedDate,
        },
      });
    }
  };
  const handleCheckedGTM = (elegibleData) => {
    const isEligibilityPath = elegibilitypath ? true : false;
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    const filteredDataCard = productList?.product_list?.filter((obj) =>
    elegibleData?.credit_cards?.includes(obj.url_slug.split('/').pop())
  )
    if (isEligibilityPath) {
      TagManager?.dataLayer({
        dataLayer: {
          event: 'card_eligibility_checked',
          product_category: category_url,
          product_name: elegibilitypath,
          status: eligible_product ? true : false,
        },
      });
    } else {
      TagManager?.dataLayer({
        dataLayer: {
          event: 'cards_eligibility_checked',
          eligibile_produt_list: filteredDataCard || [],
          date: formattedDate,
        },
      });
    }
  };


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
      pan_no: profileFormData?.pan_no ? profileFormData?.pan_no : '',
      mobile_no: profileFormData?.mobile ? profileFormData?.mobile : mobile,
      transaction_id: flowdata === 'auth' ? trans_id : null,
      full_name: panVerifyCard ? panVerifyName : profileFormData?.full_name,
      pin_code: profileFormData?.pin_code ? profileFormData?.pin_code : '',
      email: profileFormData?.email ? profileFormData?.email : '',
      occupation: profileFormData?.occupation?.toLowerCase() ? profileFormData?.occupation?.toLowerCase() : '',
      company_name: profileFormData?.company_name ? profileFormData?.company_name : '',
      monthly_salary: parseInt(profileFormData?.monthly_salary) ? parseInt(profileFormData?.monthly_salary) : '0',
      dob: profileFormData?.dob ? profileFormData?.dob : '',
      terms: checkAgree ? 'agree' : 'not agree',
      request_id: '',
      lead_profile_id: leadId ? leadId : null
    }
    if (profileFormData || flowdata === 'auth' ? e.length == 4 : e.length == 6) {
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
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const EligibilityRegister = (userInfo, id = leadId, accessToken = token, checkFields = allFields) => {
    // REQUEST PARAMS
    const headersAuth = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`
    }
    const pan_no = userInfo?.pan_no || panNo || ''
    const mobileNumber =
      (userInfo?.mobile ? String(userInfo?.mobile) : '') ||
      (mobileNo ? String(mobileNo) : '') ||
      (mobile ? String(mobile) : '') ||
      ''
    const fullName = panVerifyCard
      ? panVerifyName
      : userInfo?.full_name || profileFormData?.full_name || userInformation?.full_name

    const email = userInfo?.email || profileFormData?.email || userInformation?.email || ''

    const occupation =
      userInfo?.occupation?.toLowerCase() ||
      profileFormData?.occupation?.toLowerCase() ||
      userInformation?.occupation?.toLowerCase() ||
      ''
    const companyName = userInfo?.company_name || profileFormData?.company_name || userInformation?.company_name || ''
    const monthlySalary =
      parseInt(userInfo?.monthly_salary) ||
      parseInt(profileFormData?.monthly_salary) ||
      parseInt(userInformation?.monthly_salary) ||
      '0'
    const dob = userInfo?.dob || profileFormData?.dob || userInformation?.dob || ''

    // To check if has all fields
    const checkInfo = CheckUserData(userInfo)
    if (checkFields || checkInfo) {
      setLoading(true)
      let params = {
        pan_no: pan_no,
        mobile_no: mobileNumber,
        full_name: fullName,
        pin_code: userInfo?.pin_code || profileFormData?.pin_code || userInformation?.pin_code || '',
        email: email,
        occupation: occupation,
        company_name: companyName,
        monthly_salary: monthlySalary,
        dob: dob,
        terms: checkAgree ? 'agree' : 'not agree',
        device_id: deviceId,
        request_id: '',
        url_slug: router.query.eligible ? router.query.eligible : null,
        lang_id: 1,
        lead_profile_id: id || null,
        itr_amount: profileFormData?.itr_amount || userInformation?.itr_amount
      }
      if (refOutSide) params = { ...params, referrer_url: refOutSide }
      if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
      if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
      if (fieldValue) params = { ...params, utm_details: fieldValue }
      // API CALL
      axios
        .post(BASE_URL + ELIGIBILITY?.eligibilityRegister, params, { headers: accessToken ? headersAuth : headers })
        .then((response) => {
          if (response?.data?.message == 'success') {
            setFlow(response?.data?.data?.flow)
            setStgOneHitId(response?.data?.data?.stgOneHitId)
            setStgTwoHitId(response?.data?.data?.stgTwoHitId)
            settransid(response?.data?.data?.transaction_id)
            setAuthType(response?.data?.data?.type)
            const alternateProducts = response?.data?.data?.alternate_product
              ? JSON.stringify(response?.data?.data?.alternate_product)
              : ''
            localStorage.setItem('@alternatdata', alternateProducts)
            localStorage.setItem('@eligibleproduct', response?.data?.data?.eligible_product)
            localStorage.setItem('@inputSlug', response?.data?.data?.input_slug)
            router.push(`/credit-cards/eligibility/result`)
            setIsTimeActive(true)
            setResendOtp(false)
            setLoading(false)
            setDisbaled(true)
            setTime(60)
            handleGTM();
            handleCheckedGTM(response?.data?.data?.eligible_product)
          }
          if (response?.data?.message == 'failed') {
            setDisbaled(true)
            setLoading(false)
            toast.error(response?.data?.data)
          }
          setLoading(false)
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

          setLoading(false)
        })
    } else toast.error('All fields are required!')
  }

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: profileFormData?.pin_code || userInformation?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setCity(response?.data?.data?.pincode_data?.cities?.[0])
        }
      })

      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        }
      })
  }

  const GetUserSetUp = (id = leadId, accessToken = token, guestFlow = false) => {
    const headersAuth = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`
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
        if (response?.data?.message == 'success') {
          setUserInformation(response?.data?.data)
          if (router?.query?.redirect === 'true') {
            setLoading(true)
            const check = CheckUserData(response?.data?.data)
            if (check) {
              EligibilityRegister(response?.data?.data, leadId, token, true)
              router.push(`/credit-cards/eligibility/result`)
            } else setLoading(false)
          }
          const checkFields = CheckUserData(response?.data?.data)
          if (response?.data?.data?.email !== null) {
            setCheckVerifyEmail(true)
          }
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(response?.data?.data))
          }
          if (guestFlow) {
            if (checkFields) {
              EligibilityRegister(response?.data?.data, id, accessToken, checkFields)
            } else {
              setFormDataChange(2)
            }
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
        } else if (error?.response?.status == 403) {
          // toast.error(error?.response?.data?.detail)
        }
      })
  }

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
        if (response?.data?.data?.pincode_data?.pincodes?.length <= 0) {
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

  //INITIATE OTP CALL
  const callInitiateOtpApi = () => {
    axios
      .post(
        BASE_URL + AUTHUSER?.initinatOtp,
        {
          mobile_no: String(profileFormData?.mobile) || String(userInformation?.mobile) || String(mobile) || '',
          device_id: '',
          condition_accepted: true,
          whatsaap_consent: false
        },
        { headers: headers }
      )
      .then((response) => {
        // setOtpModal(true)
        setTransactionId(response?.data?.transaction_id)
        setMessageType(response?.data?.type)
        setTempOtp(response?.data?.is_temp_otp)
        if (typeof window !== 'undefined') {
          localStorage.setItem('transaction_id', response?.data?.transaction_id)
          localStorage.setItem('auth_type', response?.data?.type)
        }
        toast.success(ApiMessage?.otpsentsuccessfully)
        setIsTimeActive(true)
        setResendOtp(false)
        setTime(60)
        setLoading(false)
      })
      .catch((error) => {
        errorHandling(error)
        setLoading(false)
        setOtpModal(false)
      })
  }
  const fetchPanMobValidData = () => {
    const paramsPan = {
      mobile_no: String(userInformation?.mobile) || String(profileFormData?.mobile),
      pan_no: panNo
    }
    axios
      .post(BASE_URL + COMMON.panMobValidation, paramsPan)
      .then((res) => {
        if (res?.data?.code === 0) {
          if (!token) {
            setFlow('auth')
            // setPanVerifyModal(true)
            setPanVerifyModal(false)
            setOtpModal(true)
            callInitiateOtpApi()
          } else {
            setFormDataChange(2)
          }
        } else if (res?.data?.code === 1) {
          toast.error(res?.data?.data)
        }
      })
      .catch((err) => {
        setPanVerifyModal(false)
        return err
      })
  }
  const handleVerifyNextClick = () => {
    fetchPanMobValidData()
    if (personalNextBtn && checkELibilityBtn) {
      EligibilityRegister(profileFormData, leadId, token, allFields)
    } else {
      if (panVerifyModal) {
        setFormDataChange(2)
      }
    }
  }
  const isPanDisabled = () => {
    if (userData?.pan_no) return true
    else return false
  }

  useEffect(() => {
    if (profileFormData?.pin_code?.toString()?.length === 6 || userInformation?.pin_code?.toString()?.length === 6) {
      PinCodeVerify()
    }
  }, [profileFormData?.pin_code, userInformation?.pin_code])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]

      setFieldValue(utm_details)
    }
  }, [])

  useEffect(() => {
    if (panVerifyModal === true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [panVerifyModal])

  useEffect(() => {
    if (otpModal === 1) {
      document.body.style.overflow = 'hidden'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [otpModal])

  useEffect(() => {
    if (token && userData && allFields) {
      userData && setProfileFormData(userData)
    } else if (token && !allFields) {
      GetUserSetUp()
    }
  }, [])
  const disablePAN =
    (profileFormData?.pan_no && profileFormData?.pan_no !== '') ||
    (userInformation?.pan_no && userInformation?.pan_no !== '')
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
          question={`${panVerifyName || profileFormData?.full_name} is that you?`}
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
                  <div className=' flex flex-col items-center justify-center sm:flex sm:items-center bg-white rounded-lg  pt-[60px] pb-[45px] max-sm:[35px] min-[1500px]:px-[45px]  px-[45px] min-h-full'>
                    <div className=''>
                      <div className='sm:flex sm:items-center  w-full'>
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
                            className='text-[28px] max-[834px]:text-[32px]  max-[479px]:text-[24px]  py-2 font-semibold text-[#212529] max-[479px]:text-center'
                            id='modal-title'>
                            OTP Sent!
                          </h3>
                          <p className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center'>
                            {ApiMessage?.otpContent}
                          </p>
                          <div className='max-[479px]:text-center'>
                            <span className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] '>
                              +91 {profileFormData?.mobile || userInformation?.mobile || mobile}
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
                          {/* {flowdata === 'auth' ? ( */}
                          <OTPInput
                            value={otpdata}
                            onChange={(e) => handleChangeOtp(e)}
                            numInputs={4}
                            name='otp'
                            inputType='tel'
                            renderInput={(props) => <input {...props} />}
                          />
                          {/* ) : (
                            <OTPInput
                              value={otpdata}
                              onChange={(e) => handleChangeOtp(e)}
                              numInputs={6}
                              name='otp'
                              inputType='tel'
                              renderInput={(props) => <input {...props} />}
                            />
                          )} */}
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
                          <SubmitFormBtn name={resendOtp ? 'Resend OTP' : <Loader />} onClick={callInitiateOtpApi} />
                        ) : (
                          <SubmitFormBtn
                            name={!isLoadingOtp ? 'Submit' : <Loader />}
                            disabled={flowdata === 'auth' ? otpdata.length < 4 : otpdata.length < 6 || isLoadingOtp}
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
          <div className='pb-[25px] '>
            <h3 className='text-[24px] leading-[30px] max-sm:leading-[25px] max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
              Best Credit Card in a few clicks
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
                  className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${'border-[#C2CACF]'} ${
                    !pancardError ? 'border-red-500' : 'border-[#C2CACF] '
                  }`}
                  id='pan_no'
                  name='pan_no'
                  type='text'
                  maxLength={10}
                  required
                  placeholder='Enter your PAN card number'
                  disabled={isPanDisabled()}
                  value={profileFormData?.pan_no || userInformation?.pan_no}
                  onChange={(e) => handleChange(e)}
                  onFocus={() => ScrollToTop2(data)}
                  // endAdornment={pancardError || panVerifyCondition ? <SuccessIcon /> : ''}
                />
                {!pancardError && <p className='text-[12px] text-[#FF000F] font-no'>Please enter valid PAN</p>}
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
                // disabled={panValidation === 'INVALID' || panValidation === 'VALID' || panVerifyCondition}
                // disabled={profileFormData?.full_name  && token ? true : false}
                defaultValue={
                  panVerifyCard && panVerifyName
                    ? panVerifyName
                    : profileFormData?.full_name || userInformation?.full_name
                }
                onChange={(e) => {
                  handleChange(e)
                  handleValidation(e)
                }}
                pattern='^[A-Za-z]+(?: [A-Za-z]+)*$'
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
                  // disabled={profileFormData?.mobile && token ? true : false}
                  defaultValue={profileFormData?.mobile || userInformation?.mobile}
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
                className={`w-full lg:w-[303px] py-3 text-black text-[16px] rounded-lg hover:border border hover:text-[#212529] font-[500] duration-300 ${
                  verifyNextBtn ? 'bg-[#49D49D] hover:border-[#49d49d]' : 'bg-[#d5d7d8]'
                }`}>
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

export default EligibilityForm
