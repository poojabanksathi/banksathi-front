import React, { useRef } from 'react'
import leadStyle from './css/leadStyle.module.css'
import Input from './InputComponent/Input'
import { useState } from 'react'
import { BASE_URL, COMMON, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { useEffect } from 'react'
import SuccessIcon from './common/SuccessIcon'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// const PanInput = dynamic(() => import('@/core/component/Leads/InputComponent/PanInput'), {
//   ssr: false
// })
// const MobileInput = dynamic(() => import('@/core/component/Leads/InputComponent/MobileInput'), {
//   ssr: false
// })
// const PincodeInput = dynamic(() => import('@/core/component/Leads/InputComponent/PincodeInput'), {
//   ssr: false
// })

export default function ContactDetails(props) {
  const [profileformData, setProfileFormdata] = useState({ gender: 'Male' })
  const [mobile, SetMobile] = useState()
  const [errMsg, setErrorMsg] = useState(false)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisibility] = useState(false)
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [pancardError, setPancardError] = useState()
  const [startDate, setDate] = useState(null)
  const [validData, setValid] = useState('')
  const [pinCodeId, setPinCodeId] = useState([])
  const [errorCompany, setErrorCompany] = useState(false)
  const [errHrefCompany, setErrHrefCompany] = useState(false)
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [monthlyError, setmonthlyError] = useState(false)
  const [disbaled, setDisabled] = useState(false)

  const today = new Date()
  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

  const router = useRouter()

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
  // var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)

  // useEffect(() => {
  //   setProfileFormdata({
  //     ...profileformData,
  //     dob: formattedDate
  //   })
  // }, [formattedDate])

  const selectDateHandler = (d) => {
    setDate(d)
  }
  useEffect(() => {
    if (profileformData?.pan_no) {
      const uppercaseValue = profileformData?.pan_no.toUpperCase()
      setProfileFormdata({ ...profileformData, pan_no: uppercaseValue })
    }
  }, [profileformData?.pan_no])

  const handleChange = (event) => {
    if (event?.target?.name === 'pan_no') {
      setPanVerifyCard(false)
    }
    if (event?.target?.name === 'mobile') {
      localStorage.setItem('LeadMobile', event.target?.value)
    }
    if (event !== null) {
      setProfileFormdata({ ...profileformData, [event.target?.name]: event.target?.value })
    }
  }

  const handlePincodeChange = (event) => {
    setVisibility(true)
  }

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
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
          localStorage.setItem('LeadMobile', response?.data?.data?.mobile)
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
        }
      })
  }

  useEffect(() => {
    if (token) {
      GetUserSetUp()
    }
  }, [])

  const handleChangeNumber = (e) => {
    const inputValue = e.target.value
    const extractedNumber = inputValue.replace(/\D/g, '')
    if (inputValue?.length === 10) {
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

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
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
        if (response?.data?.message === 'success') {
          setPinCodeId(response?.data?.data?.pincode_data?.id)
          props.formFields.handleFieldData({
            ...props.formFields.fieldData,
            pin_code: {
              ...props.formFields.fieldData.pin_code,
              value: profileformData?.pin_code,
              pincodeId: response?.data?.data?.pincode_data?.id[0]
            }
          })
        }
        setLoading(false)
      })

      .catch((error) => {
        setLoading(true)
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
        setPinCode(response.data.data.pincode_data?.pincodes)
        // setLoading(false);
      })
      .catch((error) => {
        console.error(error)
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
    if (panVerifyName) {
      props.formFields.handleFieldData({
        ...props.formFields.fieldData,
        full_name: { ...props.formFields.fieldData.full_name, value: panVerifyName }
      })
    }
  }, [panVerifyName])

  return (
    <>
      <Toaster />

      <div className='grid grid-cols-12 md:mt-[30px] gap-x-4 font-sans lead-form-contact'>
        <div className=' col-span-12'>
          {/* <PanInput
          data={props.formFields}
          setPancardName={setPancardName}
          profileformData={profileformData}
          token={token}
        /> */}
          <div className='mb-6'>
            <p className='text-[#212529]  max-[1200px]:!pt-0 gender-resolve'>Gender</p>
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
                    checked={
                      profileformData?.gender === 'Male' || props?.formFields?.fieldData.gender?.value === 'Male'
                    }
                    onChange={(e) => {
                      handleChange(e)
                      props.formFields.handleFieldData({
                        ...props.formFields.fieldData,
                        gender: {
                          ...props.formFields.fieldData.gender,
                          value: e.target.value,
                          error: null
                        }
                      })
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
                    checked={
                      profileformData?.gender === 'Female' || props?.formFields?.fieldData.gender?.value === 'Female'
                    }
                    onChange={(e) => {
                      handleChange(e)
                      props.formFields.handleFieldData({
                        ...props.formFields.fieldData,
                        gender: {
                          ...props.formFields.fieldData.gender,
                          value: e.target.value,
                          error: null
                        }
                      })
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
                    checked={
                      profileformData?.gender === 'Other' || props?.formFields?.fieldData.gender?.value === 'Other'
                    }
                    onChange={(e) => {
                      handleChange(e)
                      props.formFields.handleFieldData({
                        ...props.formFields.fieldData,
                        gender: {
                          ...props.formFields.fieldData.gender,
                          value: e.target.value,
                          error: null
                        }
                      })
                    }}
                  />
                  Other
                </label>
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <label className='text-[13px] font-normal text-[#212529] ' htmlFor='email'>
              PAN Card
            </label>

            <Input
              className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${
                pancardError === false ? 'border-red-500' : 'border-[#C2CACF] '
              }`}
              id='pan_no'
              name='pan_no'
              type='text'
              value={profileformData?.pan_no}
              onChange={(e) => {
                handleChange(e)
                props.formFields.handleFieldData({
                  ...props.formFields.fieldData,
                  pan_no: {
                    ...props.formFields.fieldData.pan_no,
                    value: e.target.value,
                    valid: validData !== 'VALID' ? true : false,
                    verified: validData !== 'VALID'
                  }
                })
              }}
              placeholder='Enter your PAN card number'
            />
            {profileformData?.pan_no
              ? pancardError === false && (
                  <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>
                )
              : ''}
          </div>
        </div>
        <div className='mb-6 col-span-12'>
          <Input
            type='text'
            id='name'
            label='Full Name'
            // disabled={profileformData?.full_name && token ? true : false}
            defaultValue={panVerifyName ? panVerifyName : profileformData?.full_name}
            className={[leadStyle.input, props?.formFields?.fieldData?.name?.error ? leadStyle.inputError : ''].join(
              ' '
            )}
            placeholder='Enter your full name'
            onChange={(event) => {
              handleChange(event)

              props.formFields.handleFieldData({
                ...props.formFields.fieldData,
                full_name: { ...props.formFields.fieldData.full_name, value: event.target.value }
              })
            }}
            onBeforeInput={(event) => {
              if (!/^[A-Za-z ]*$/.test(event.data)) {
                event.preventDefault()
                event.stopPropagation()
              }
            }}
            // disabled={props.formFields.fieldData.name.locked}
            error={props?.formFields?.fieldData?.name?.error}
          />
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12'>
          {/* <MobileInput data={props.formFields} otpData={props.otpData} data1={profileformData?.mobile} token={token} /> */}
          <Input
            type='tel'
            name='mobile'
            id='mobile'
            label='Mobile as per Aadhaar'
            disabled={profileformData?.mobile && token ? true : false}
            // className={[leadStyle.input, props.formFields.fieldData?.mobile?.error ? leadStyle.inputError : ''].join(
            //   ' '
            // )}
            className={
              errMsg || zeroNumberValidation
                ? ' p-3 w-full flex items-center gap-[18px] h-[48px] !border !border-[#FF000F] rounded-md mt-2 focus:border-gray-900 focus:!outline-none'
                : ' p-3 w-full flex items-center gap-[18px] h-[48px] border border-[#C2CACF] rounded-md mt-2 focus:border-gray-900 focus:!outline-none'
            }
            placeholder='Enter Mobile Number'
            onChange={(e) => {
              handleChangeNumber(e)
              handleChange(e)
              e.target.value = e?.target?.value?.replace(/\D/g, '')
              props?.formFields?.handleFieldData({
                ...props.formFields.fieldData,
                mobile: {
                  ...mobile,
                  value: e.target.value,
                  valid: false,
                  verified: false,
                  error: 'Please enter valid mobile number'
                }
              })
            }}
            defaultValue={
              profileformData?.mobile ? profileformData?.mobile : props?.formFields?.fieldData.mobile?.value
            }
            required
            maxLength={10}
          />
          {errMsg && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberError}</p>}
          {zeroNumberValidation && (
            <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
          )}
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12'>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='birthDate'>
            Date of Birth
          </label>
          <div className='datepicker'>
            {/* <MobileInput data={props.formFields} otpData={props.otpData} data1={profileformData?.mobile} token={token} /> */}
            <DatePicker
              type='text'
              showYearDropdown
              dropdownMode='select'
              dateFormat='dd-MM-yyyy'
              name='dob'
              id='dob'
              disabled={profileformData?.dob}
              className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              selected={startDate}
              onChange={(e) => {
                selectDateHandler(e)
                handleChange(e)
                props.formFields.handleFieldData({
                  ...props.formFields.fieldData,
                  date_of_birth: {
                    ...props.formFields?.fieldData?.date_of_birth,
                    value: e,
                    valid: false,
                    error: 'Please enter valid DOB'
                  }
                })
              }}
              placeholderText='DD/MM/YYYY'
              maxDate={today}
              value={token && profileformData?.dob ? moment(profileformData?.dob)?.format('DD-MM-YYYY') : startDate}
              required
              todayButton={'Today'}
            />
          </div>
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12'>
          <Input
            type='email'
            id='email'
            name='email'
            label='Email Address'
            disabled={profileformData?.email && token ? true : false}
            value={profileformData?.email}
            className={[leadStyle.input, props.formFields.fieldData?.email?.error ? leadStyle.inputError : ''].join(
              ' '
            )}
            onChange={(event) => {
              handleChange(event)
              let emailRegex =
                /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
              if (emailRegex.test(event.target.value)) {
                props.formFields.handleFieldData({
                  ...props.formFields.fieldData,
                  email: {
                    ...props.formFields?.fieldData?.email,
                    value: event.target?.value.toLowerCase(),
                    valid: true,
                    error: null
                  }
                })
              } else {
                props.formFields.handleFieldData({
                  ...props.formFields.fieldData,
                  email: {
                    ...props.formFields?.fieldData?.email,
                    value: event.target?.value.toLowerCase(),
                    valid: false,
                    error: 'Please enter valid email'
                  }
                })
              }
            }}
            onBeforeInput={(event) => {
              if (event.target.value.slice(-1)) {
                if (event.data == ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                }
              } else {
                if (!/^\w*$/.test(event.data)) {
                  event.preventDefault()
                  event.stopPropagation()
                }
              }
            }}
            placeholder='Valid email address'
            // disabled={props.formFields.fieldData.email.locked}
            error={props.formFields.fieldData?.email?.error}
          />
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12 relative'>
          {/* <PincodeInput value={props.formFields} setPincodeNumber={setPincodeNumber} /> */}
          <CommonPicodeInput
            // disabled={profileformData?.pin_code?.length === 6 && token ? true : false}
            value={profileformData?.pin_code ? profileformData?.pin_code : props?.formFields?.fieldData?.pincode?.value}
            getData={getData}
            handleChange={handleChange}
            handlePincodeChange={handlePincodeChange}
            className={[leadStyle.input, props?.data?.fieldData?.pin_code?.error ? leadStyle.inputError : ''].join(' ')}
            placeholder='Pin Code'
          />

          {visible && (
            <ul className='suggestions pin-suggestion top-[100%]' ref={wrapperRef}>
              {pinCode.map((i, v) => (
                <li
                  className=''
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
        <div className='mb-6 col-span-12 relative'>
          <div className=''>
            <p className=' text-[#212529]'>Occupation</p>
            <div className='flex pt-[10px] gap-4'>
              <div>
                <label
                  htmlFor='gender'
                  className={`form-redio flex gap-2 items-center ${
                    profileformData?.occupation === 'Salaried' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                  }`}>
                  <input
                    type='radio'
                    id='occupation'
                    checked={profileformData?.occupation === 'Salaried'}
                    name='occupation'
                    value='Salaried'
                    onChange={(e) => {
                      handleChange(e)
                      props.formFields.handleFieldData({
                        ...props.formFields?.fieldData,
                        occupation: {
                          ...props.formFields.fieldData?.occupation,
                          value: e.target.value,
                          error: e.target.value ? null : props.formFields.fieldData?.occupation?.error
                        }
                      })
                    }}
                  />
                  Salaried
                </label>
              </div>
              <div>
                <label
                  htmlFor='gender'
                  className={`form-redio flex gap-2 items-center ${
                    profileformData?.occupation === 'Self-employed' ? 'text-[#212529] font-normal' : 'text-[#808080]'
                  } `}>
                  <input
                    type='radio'
                    id='occupation'
                    name='occupation'
                    checked={profileformData?.occupation === 'Self-employed'}
                    value='Self-employed'
                    onChange={(e) => {
                      handleChange(e)
                      props.formFields.handleFieldData({
                        ...props.formFields?.fieldData,
                        occupation: {
                          ...props.formFields.fieldData?.occupation,
                          value: e.target.value,
                          error: e.target.value ? null : props.formFields.fieldData?.occupation?.error
                        }
                      })
                    }}
                  />
                  Self-Employed
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-6 col-span-12 relative'>
          <div className={errorCompany ? ' border-[#FF000F]  ' : ' '}>
            <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
              Company Name
            </label>
            <input
              className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              id='company_name'
              name='company_name'
              type='text'
              placeholder='Company Name'
              // disabled={profileformData?.company_name?.length >= 26 && token ? true : false}
              value={profileformData?.company_name}
              onChange={(e) => {
                handleChange(e)
                props.formFields.handleFieldData({
                  ...props.formFields?.fieldData,
                  company_name: {
                    ...props.formFields.fieldData?.company_name,
                    value: e.target.value,
                    error: e.target.value ? null : props.formFields.fieldData?.company_name?.error
                  }
                })
              }}
            />
            {errHrefCompany && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}

            {errorCompany && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
          </div>
        </div>
        {profileformData?.occupation === 'Salaried' && (
          <div className='mb-6 col-span-12 max-sm:col-span-12'>
            <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
              Monthly Salary
            </label>
            <input
              type='text'
              id='monthly_salary'
              name='monthly_salary'
              value={Math.floor(profileformData?.monthly_salary) == 0 ? '' : profileformData?.monthly_salary}
              className={[
                leadStyle.input,
                props.formFields.fieldData?.monthly_salary?.error ? leadStyle.inputError : ''
              ].join(' ')}
              onChange={(event) => {
                handleChange(event)
                handleMonthlyIncome(event)
                props.formFields.handleFieldData({
                  ...props.formFields?.fieldData,
                  monthly_salary: {
                    ...props.formFields.fieldData?.monthly_salary,
                    value: event.target.value.replace(/\D/g, ''),
                    error: event.target?.value ? null : props.formFields.fieldData?.monthly_salary?.error
                  }
                })
              }}
              placeholder='Enter your monthly salary'
              // disabled={props.formFields.fieldData.email.locked}
              // error={props.formFields.fieldData?.email?.error}
            />
            {monthlyError && (
              <p className='text-[12px] text-[#FF000F] font-no'>Please enter the Income less than or equal to 400000</p>
            )}
          </div>
        )}
        {profileformData?.occupation === 'Self-employed' && (
          <div className='mb-6 col-span-12 max-sm:col-span-12'>
            <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
              ITR (Amount)
            </label>
            <input
              type='text'
              id='itr_amount'
              name='itr_amount'
              value={Math.floor(profileformData?.itr_amount) == 0 ? '' : profileformData?.itr_amount}
              className={[leadStyle.input, profileformData?.itr_amount?.error ? leadStyle.inputError : ''].join(' ')}
              onChange={(event) => {
                handleChange(event)
                props.formFields.handleFieldData({
                  ...props.formFields?.fieldData,
                  itr_amount: {
                    ...props.formFields.fieldData?.itr_amount,
                    value: event.target.value.replace(/\D/g, ''),
                    error: event.target?.value ? null : profileformData?.itr_amount?.error
                  }
                })
              }}
              placeholder='Enter your ITR (amount)'
              // disabled={props.formFields.fieldData.email.locked}
            />
            {profileformData?.itr_amount?.error && (
              <p className='text-[12px] text-[#FF000F] font-no'>Please enter a ITR(AMOUNT)</p>
            )}
          </div>
        )}

        <div className='flex flex-col col-span-12'>
          <label className={[leadStyle.consentContainer]}>
            <span className='text-sm font-[400] text-[#212529]  '>
              By clicking here, I acknowledge that I have reviewed and understood the{' '}
              <Link href={'/terms-use'}>
                <span className='text-[#212529] font-bold underline underline-offset-4 '>terms and conditions</span>
              </Link>{' '}
              and{' '}
              <Link href={'/privacy-policy'}>
                <span className='text-[#212529] font-bold underline underline-offset-4 '>privacy policy.</span>
              </Link>
            </span>
            <input
              checked={props.formFields.fieldData?.consent?.value}
              id='consentCheck'
              type='checkbox'
              onChange={(event) => {
                props.formFields.handleFieldData({
                  ...props.formFields?.fieldData,
                  consent: {
                    ...props.formFields.fieldData?.consent,
                    value: event.target.checked,
                    error: event.target?.checked ? null : props.formFields.fieldData?.consent?.error
                  }
                })
              }}
              className={[leadStyle.consentInput]}
            />
            <span className={[leadStyle.mark]}></span>
          </label>
          {props.formFields.fieldData?.consent?.error && (
            <p className='text-red-500 text-xs italic'>{props.formFields.fieldData?.consent?.error}</p>
          )}
        </div>
      </div>
    </>
  )
}
