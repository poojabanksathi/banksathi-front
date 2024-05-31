import { BASE_URL, COMMON, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import SubmitFormBtn from '../../SubmitFormBtn'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '@/core/component/Leads/common/Loader'
import Input from '@/core/component/Leads/InputComponent/Input'
import moment from 'moment'
import jwt from 'jwt-decode'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import CommonEmailInput from '../CommonFieldComponent/EmailAdd'
import CommonNumberInput from '../CommonFieldComponent/MobileNumber'
import { handleRemoveLocalstorage, panRegex, removeNonAlphaNumeric } from '@/utils/util'
import LoaderLogo from '../../../../../public/assets/logo-loader.gif'
import Image from 'next/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import { ScrollToTop2, ScrollToTop } from '@/utils/util'

export default function CreditProfile() {
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const data = { ref: topRef || nameRef, isMobile: mobileView }
  const [profileformData, setProfileFormdata] = useState({ gender: 'Male' })
  const [disbled, setDisbled] = useState(false)
  const [ButtonDisable, setButtonDisable] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorPincode, setErrorPinCode] = useState(false)
  const [mobile, SetMobile] = useState()
  const [errMsg, setErrorMsg] = useState(false)
  const [monthlyError, setmonthlyError] = useState(false)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [startDate, setDate] = useState(new Date())
  const [UpdateButton, setUpdateButton] = useState(false)
  const [pancardError, setPanCardError] = useState()
  const [validData, setValid] = useState('')
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [cityPin, setCityPin] = useState()
  const [pincodeNumber, setPincodeNumber] = useState()
  const [isLoading, setLoading] = useState(false)
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisibility] = useState(false)
  const [pinCodeError, setPinCodeError] = useState(false)

  const today = new Date()
  const router = useRouter()

  var dateObject = new Date(startDate)
  var year = dateObject.getFullYear()
  var month = dateObject.getMonth() + 1
  var day = dateObject.getDate()

  const dateform = moment(profileformData?.dob)
  const formatDateTime = dateform.format('DD-MM-YYYY')

  var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)

  useEffect(() => {
    setProfileFormdata({
      ...profileformData,
      dob: formattedDate
    })
  }, [formattedDate])

  const selectDateHandler = (d) => {
    // setDate(d)
    if (d?.target?.name === 'dob') {
      setProfileFormdata({ ...profileformData, ['dob']: parseInt(d?.target?.value) })
    }
  }

  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')
  const ValidPan = localStorage.getItem('ValidPan')

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

  const handlePincodeChange = (event) => {
    setVisibility(true)

    const PincodeErr = event.target.value?.replace(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/g, '')
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
  }

  useEffect(() => {
    setProfileFormdata({
      ...profileformData,
      pin_code: pincodeNumber
    })
  }, [pincodeNumber])

  const handleChangeNumber = (e) => {
    const inputValue = e.target.value
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
    }
  }

  const handleMonthlyIncome = (e) => {
    const inputValue = e.target.value
    const extracIncome = inputValue?.replace(/\D/g, '')
    if (extracIncome?.length === 6) {
      setmonthlyError(false)
    } else if (extracIncome?.length > 6) {
      setmonthlyError(true)
    }
  }

  const handleChange = (event) => {
    if (event?.target?.name === 'pan_no') {
      const inputValue = event.target.value.toUpperCase()
      const isValidInput = panRegex.test(inputValue)
      setPanCardError(isValidInput)
      setProfileFormdata({ ...profileformData, pan_no: inputValue })
    }
    if (event?.target?.value) {
      setUpdateButton(false)
    }
    if (event?.target?.name === 'monthly_salary') {
      setProfileFormdata({ ...profileformData, ['monthly_salary']: parseInt(event?.target?.value) })
    }
    if (event?.target?.name === 'itr_amount') {
      setProfileFormdata({ ...profileformData, ['itr_amount']: parseInt(event?.target?.value) })
    }
    setProfileFormdata({ ...profileformData, [event?.target?.name]: event?.target?.value })
  }
  useEffect(() => {
    if (profileformData?.pan_no) {
      const uppercaseValue = profileformData?.pan_no.toUpperCase()
      setProfileFormdata({ ...profileformData, pan_no: uppercaseValue })
    }
  }, [profileformData?.pan_no])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('full_name', panVerifyCard ? panVerifyName : profileformData?.full_name)
    bodyFormData.append('occupation', profileformData?.occupation)
    bodyFormData.append('companyname', profileformData?.companyname)
    bodyFormData.append('mobile', profileformData?.mobile)
    bodyFormData.append('years', profileformData?.years)
    bodyFormData.append('monthly_salary', profileformData?.monthly_salary)
    bodyFormData.append('dob', profileformData?.dob)
    bodyFormData.append('email', profileformData?.email)
    bodyFormData.append('pan_no', profileformData?.pan_no)
    bodyFormData.append('pan_no', profileformData?.pan_no)
    bodyFormData.append('pin_code', profileformData?.pin_code)
    bodyFormData.append('itr_amount', profileformData?.itr_amount)
  }

  useEffect(() => {
    if (
      (profileformData?.full_name &&
        profileformData?.occupation &&
        profileformData?.companyname &&
        profileformData?.years &&
        profileformData?.mobile &&
        profileformData?.monthly_salary &&
        profileformData?.dob &&
        profileformData?.email &&
        profileformData?.pan_no?.length == 10) ||
      (profileformData?.is_pan_verified === '1' && profileformData?.pin_code && profileformData?.length !== 0)
    ) {
      setDisbled(true)
    } else {
      setDisbled(false)
    }
  }, [profileformData])

  useEffect(() => {
    if (profileformData?.pan_no?.length == 10 && profileformData?.is_pan_verified === '1') {
      setButtonDisable(true)
    } else {
      setButtonDisable(false)
    }
  }, [profileformData])

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON.pinCodeVerify,
        {
          pin_code: profileformData?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setCityPin(response?.data?.data?.pincode_data?.cities[0])
        }
      })
      .catch((error) => {
        console.log('error in fetching pincodes', error)
      })
  }
  useEffect(() => {
    if (profileformData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [profileformData?.pin_code?.length])

  const GetUserSetUp = (e) => {
    e?.preventDefault()
    setLoading(false)

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
          const apiDob = response.data?.data?.dob
          setDate(new Date(apiDob))
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(response?.data?.data))
        }
      })
      .catch((error) => {
        if (error?.response?.data?.data?.message == 'failed') {
        } else if (error?.response?.status == 401) {
          router.push('/login')
          toast.success(ApiMessage?.logoutmessage)
          handleRemoveLocalstorage()
        } else if (error?.response?.status == 403) {
        }
      })
  }

  useEffect(() => {
    if (token) {
      GetUserSetUp()
      // setProfileFormdata(getUserData)
    }
  }, [])

  const UserUpdateSetUp = (e) => {
    e?.preventDefault()
    setLoading(true)
    axios
      .put(
        BASE_URL + USERSET?.updateusersetup,
        {
          lead_profile_id: leadId,
          full_name: panVerifyCard ? panVerifyName : profileformData?.full_name,
          email: profileformData?.email ? profileformData?.email : '',
          dob: profileformData?.dob ? profileformData?.dob : '',
          pin_code: profileformData?.pin_code ? profileformData?.pin_code : '',
          pan_no: profileformData?.pan_no ? profileformData?.pan_no : '',
          pan_no: profileformData?.pan_no ? profileformData?.pan_no : '',
          gender: profileformData?.gender,
          occupation: profileformData?.occupation?.toLowerCase(),
          company_name: profileformData?.company_name,
          monthly_salary: parseInt(profileformData?.monthly_salary) ? parseInt(profileformData?.monthly_salary) : '0',
          itr_amount: parseInt(profileformData?.itr_amount) ? parseInt(profileformData?.itr_amount) : '0'
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          toast.success(ApiMessage?.updateProfile)
          setButtonDisable(false)
          GetUserSetUp()
          if (validData == 'VALID') {
            setUpdateButton(true)
          } else {
            setUpdateButton(false)
          }
          setLoading(false)
          setProfileFormdata({
            ...profileformData,
            email: '',
            full_name: '',
            lastname: '',
            dob: '',
            pan_no: '',
            pin_code: '',
            mobile: ''
          })
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          setButtonDisable(false)
          toast.error(error?.response?.data?.reason)
          setLoading(false)
        } else if (error?.response?.status === 422) {
          toast.error(error?.response?.data?.reason)
          toast.error(error?.response?.data?.detail[0]?.msg)
          setLoading(false)
        } else if (error?.response?.status == 500) {
          setLoading(false)
          toast.error(ApiMessage?.internalServerError)
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
        console.error(error)
        if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        }
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

  return (
    <>
      <Toaster />
      {isLoading && (
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
      )}
      <div className='profile-card'>
        <div className='pb-6'>
          <p className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center '>
            My Profile
          </p>
        </div>
        <div className='rounded-3xl bg-white card-insight mb-8 font-[Poppins]'>
          <div className='px-6 py-7'>
            <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Personal Information</p>
            <form>
              <div className='mb-4' ref={topRef}>
                <div className='mt-4'>
                  <p className=' text-[#212529] max-[]'>Gender</p>
                  <div className='flex pt-[10px] gap-4 max-[576px]:gap-2'>
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
                <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1 pt-6'>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='panNumber'>
                      PAN Card
                    </label>
                    <Input
                      className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${
                        pancardError === false ? 'border-red-500' : 'border-[#C2CACF] '
                      }`}
                      id='pan_no'
                      maxLength={10}
                      name='pan_no'
                      type='text'
                      required
                      placeholder='Enter your PAN card number'
                      disabled={profileformData?.pan_no}
                      value={profileformData?.pan_no}
                      onChange={(e) => handleChange(e)}
                      onFocus={() => ScrollToTop2(data)}
                      // endAdornment={pancardError || profileformData?.is_pan_verified === '1' ? <SuccessIcon /> : ''}
                    />
                    {profileformData?.pan_no
                      ? pancardError === false && (
                          <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>
                        )
                      : ''}
                  </div>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='fullName'>
                      Full Name
                    </label>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='full_name'
                      name='full_name'
                      type='text'
                      placeholder='Enter your name'
                      // disabled={panVerifyName || profileformData?.is_pan_verified === '1' ? true : false}
                      pattern='[A-Za-z]+'
                      defaultValue={panVerifyCard && panVerifyName ? panVerifyName : profileformData?.full_name}
                      onChange={(e) => {
                        handleChange(e)
                        handleValidation(e)
                      }}
                      onInput={(e) => {
                        e.target.value = removeNonAlphaNumeric(e)
                      }}
                    />
                    {errorMessage && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1 pt-6'>
                  <CommonEmailInput value={profileformData?.email} handleChange={handleChange} />
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='birthDate'>
                      Date of Birth
                    </label>
                    <div className='datepicker'>
                      <input
                        type='date'
                        showYearDropdown
                        dropdownMode='select'
                        dateFormat='dd-MM-yyyy'
                        name='dob'
                        id='dob'
                        className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                        onChange={(e) => {
                          selectDateHandler(e)
                          handleChange(e)
                        }}
                        value={profileformData?.dob}
                        max={new Date().toISOString().split('T')[0]}
                        required
                        defaultValue={profileformData?.dob}
                        todayButton={'Today'}
                      />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1 pt-6'>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='mobile'>
                      Mobile Number
                    </label>
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
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='address'>
                      Address
                    </label>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='address'
                      name='address'
                      type='text'
                      value={profileformData?.address}
                      placeholder='Enter your address'
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1 pt-6'>
                  <div className='relative'>
                    <CommonPicodeInput
                      value={profileformData?.pin_code}
                      getData={getData}
                      defaultValue={profileformData?.pin_code}
                      handleChange={handleChange}
                      handlePincodeChange={handlePincodeChange}
                      pinCodeError={pinCodeError}
                    />
                    {visible && (
                      <ul className='suggestions pin-suggestion top-[120%]' ref={wrapperRef}>
                        {pinCode.map((i, v) => (
                          <li
                            className={''}
                            key={v}
                            onClick={() => {
                              setProfileFormdata({ ...profileformData, pin_code: i })
                              setVisibility(!visible)
                            }}>
                            {i}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='city'>
                      City
                    </label>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='city'
                      name='city'
                      type='text'
                      disabled={cityPin ? true : false}
                      value={cityPin || profileformData?.city}
                      placeholder='Enter your city'
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='rounded-3xl bg-white card-insight mb-8 font-[Poppins]'>
          <div className='px-6 py-7'>
            <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Employment Information</p>
            <div className='mt-4' ref={nameRef}>
              <p className=' text-[#212529] max-[]'>Occupation</p>
              <div className='flex pt-[10px] gap-4 max-[576px]:gap-2'>
                <div>
                  <label
                    htmlFor='gender'
                    className={`form-redio flex gap-2 items-center ${
                      profileformData?.occupation === 'Salaried' ? 'text-[#212529]' : 'text-[#808080]'
                    }`}>
                    <input
                      type='radio'
                      name='occupation'
                      value={
                        profileformData?.occupation === 'Salaried'
                          ? profileformData?.occupation === 'Salaried'
                          : 'Salaried'
                      }
                      checked={profileformData?.occupation === 'Salaried'}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                    Salaried
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='occupation'
                    className={`form-redio flex gap-2 items-center  ${
                      profileformData?.occupation === 'Self-employed' ? 'text-[#212529]' : 'text-[#808080]'
                    }`}>
                    <input
                      type='radio'
                      name='occupation'
                      value={
                        profileformData?.occupation === 'Self-employed'
                          ? profileformData?.occupation === 'Self-employed'
                          : 'Self-employed'
                      }
                      checked={profileformData?.occupation === 'Self-employed'}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                    Self-Employed
                  </label>
                </div>
              </div>
            </div>
            <form>
              <div className='mb-4'>
                <div className='grid grid-cols-2 gap-4 max-[479px]:grid-cols-1 pt-6'>
                  <div>
                    <label className='text-[13px] font-normal text-[#212529] ' htmlFor='employerName'>
                      Company Name
                    </label>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='employerName'
                      name='company_name'
                      onChange={(e) => handleChange(e)}
                      value={profileformData?.company_name}
                      type='text'
                      placeholder='Enter employer name'
                      onFocus={() => ScrollToTop(nameRef, mobileView)}
                    />
                  </div>
                  {profileformData?.occupation === 'Salaried' && (
                    <div>
                      <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                        Monthly Salary
                      </label>
                      <input
                        className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                        id='monthly_salary'
                        name='monthly_salary'
                        value={Math.floor(profileformData?.monthly_salary) == 0 ? '' : profileformData?.monthly_salary}
                        onChange={(e) => {
                          handleChange(e)
                          handleMonthlyIncome(e)
                        }}
                        type='number'
                        step='1'
                        placeholder='Enter monthly income'
                        max={4000000}
                      />

                      {monthlyError && (
                        <p className='text-[12px] text-[#FF000F] font-no'>
                          Please enter the Income less than or equal to 4000000
                        </p>
                      )}
                    </div>
                  )}
                  {profileformData?.occupation === 'Self-employed' && (
                    <div>
                      <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                        ITR (Amount)
                      </label>
                      <input
                        className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                        id='itr_amount'
                        name='itr_amount'
                        value={Math.floor(profileformData?.itr_amount) == 0 ? '' : profileformData?.itr_amount}
                        onChange={(e) => {
                          handleChange(e)
                        }}
                        type='number'
                        step='1'
                        placeholder='ITR (Amount)'
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='flex justify-center'>
          <SubmitFormBtn disabled={false} name={!isLoading ? 'Save Changes' : <Loader />} onClick={UserUpdateSetUp} />
        </div>
      </div>
    </>
  )
}
