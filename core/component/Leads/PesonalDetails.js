import React from 'react'
import dynamic from 'next/dynamic'
import leadStyle from './css/leadStyle.module.css'
import Input from './InputComponent/Input'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios'
import { BASE_URL, COMMON, USERSET } from '@/utils/alljsonfile/service'
import { useEffect } from 'react'
import { useRef } from 'react'
import Loader from './common/Loader'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'
import CommonDatePicker from '../common/CommonList/CommonFieldComponent/Datepicker'

const PanInput = dynamic(() => import('@/core/component/Leads/InputComponent/PanInput'), {
  ssr: false
})
const MobileInput = dynamic(() => import('@/core/component/Leads/InputComponent/MobileInput'), {
  ssr: false
})
const PincodeInput = dynamic(() => import('@/core/component/Leads/InputComponent/PincodeInput'), {
  ssr: false
})

export default function PesonalDetails(props) {
  const [startDate, setDate] = useState(null)
  const [pincodeNumber, setPincodeNumber] = useState()
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cityPin, setCityPin] = useState()
  const [statePin, setStatePin] = useState()

  const today = new Date()
  var dateObject = new Date(startDate)
  var year = dateObject.getFullYear()
  var month = dateObject.getMonth() + 1
  var day = dateObject.getDate()

  const selectDateHandler = (d) => {
    setDate(d)
  }

  var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)

  useEffect(() => {
    // setProfileFormdata({
    //   ...profileformData,
    //   dob: formattedDate
    // })
    props?.setFormData({
      ...props?.formData,
      dob: formattedDate
    })
  }, [formattedDate])

  const [profileformData, setProfileFormdata] = useState([])

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

  const handleChange = (event) => {
    props?.setFormData({ ...props?.formData, [event.target?.name]: event.target?.value })
    // setProfileFormdata({ ...profileformData, [event.target?.name]: event.target?.value })
  }
  const handlePincodeChange = (e) => {
    setVisibility(true)
  }

  useEffect(() => {
    // setProfileFormdata({
    //   ...profileformData,
    //   pin_code: pincodeNumber
    // })
    props?.setFormData({
      ...props?.formData,
      pin_code: pincodeNumber
    })
  }, [pincodeNumber])

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  useEffect(() => {
    if (props?.formData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [props?.formData?.pin_code?.length === 6])

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: props?.formData?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setCityPin(response?.data?.data?.pincode_data?.cities[0])
          setStatePin(response?.data?.data?.pincode_data?.states[0])
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

  const dateform = moment(props?.formData.dob)
  const formatDateTime = dateform.format('DD-MM-YYYY')

  return (
    <>
      <Toaster />

      <div className='grid grid-cols-12 md:mt-[30px] gap-x-4 font-sans'>
        <div className=' mb-6 col-span-12'>
          <p className=' text-[#212529]'>Gender</p>
          <div className='flex pt-[10px] gap-4'>
            <div>
              <label
                htmlFor='gender'
                className={`form-redio flex gap-2 items-center ${
                  props?.formData.gender === 'Male' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='gender'
                  value={props?.formData.gender === 'Male' ? props?.formData.gender === 'Male' : 'Male'}
                  checked={props?.formData.gender === 'Male'}
                  // value={props.formFields.fieldData.male?.value}
                  onChange={(e) => handleChange(e)}
                />
                Male
              </label>
            </div>
            <div>
              <label
                htmlFor='gender'
                className={`form-redio flex gap-2 items-center ${
                  props?.formData.gender === 'Female' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='gender'
                  value={props?.formData.gender === 'Female' ? props?.formData.gender === 'Female' : 'Female'}
                  checked={props?.formData.gender === 'Female'}
                  // value={props.formFields.fieldData.female?.value}
                  onChange={(e) => handleChange(e)}
                />
                Female
              </label>
            </div>
            <div>
              <label
                htmlFor='gender'
                className={`form-redio flex gap-2 items-center ${
                  props?.formData.gender === 'Other' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='gender'
                  value={props?.formData.gender === 'Other' ? props?.formData.gender === 'Other ' : 'Other'}
                  checked={props?.formData.gender === 'Other'}
                  // value={props.formFields.fieldData.other?.value}
                  onChange={(e) => handleChange(e)}
                />
                Other
              </label>
            </div>
          </div>
        </div>

        <div className='mb-6 col-span-6 max-sm:col-span-12 datepicker   '>
          <label className='text-[14px] font-normal text-[#212529] ' htmlFor='date'>
            Date of Birth
          </label>
          {/* <DatePicker
          showYearDropdown
          dropdownMode='select'
          dateFormat='yyyy/MM/dd'
          name='dob'
          id='dob'
          // disabled={profileformData?.dob && token ? true : false}
          className={[leadStyle.input, props.formFields.fieldData.dob?.error ? leadStyle.inputError : ''].join(' ')}
          selected={startDate}
          onChange={(e) => {
            selectDateHandler(e)
            handleChange(e)
          }}
          maxDate={today}
          value={props?.formData.dob ? formatDateTime : 'DD/MM/YYYY'}
          required
          todayButton={'Today'}
        /> */}
        
          <CommonDatePicker
            startDate={startDate}
            value={props?.formData.dob ? formatDateTime : 'DD/MM/YYYY'}
            className={[leadStyle.input, props.formFields.fieldData.dob?.error ? leadStyle.inputError : ''].join(' ')}
            selectDateHandler={selectDateHandler}
            handleChange={handleChange}
          />
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12'>
          <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
            Educational Qualification
          </label>
          <select
            id='qualification'
            defaultValue='select'
            value={props.formFields.fieldData.qualification?.value}
            className={[
              leadStyle.input,
              props.formFields.fieldData.qualification?.error ? leadStyle.inputError : ''
            ].join(' ')}>
            <option disabled value='select'>
              select
            </option>
            <option>12TH</option>
            <option>Graduate</option>
            <option>Master</option>
          </select>
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12'>
          <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
            Ownership
          </label>
          <select
            id='ownership'
            defaultValue='select'
            value={props.formFields.fieldData.ownership?.value}
            className={[leadStyle.input, props.formFields.fieldData.ownership?.error ? leadStyle.inputError : ''].join(
              ' '
            )}>
            <option disabled value='select'>
              select
            </option>
          </select>
        </div>
        <div className='mb-6 col-span-6 max-sm:col-span-12'>
          <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
            Citizenship Status
          </label>
          <select
            id='citizenship'
            defaultValue='select'
            value={props.formFields.fieldData.citizenship?.value}
            className={[
              leadStyle.input,
              props.formFields.fieldData.citizenship?.error ? leadStyle.inputError : ''
            ].join(' ')}>
            <option disabled value='select'>
              select
            </option>
          </select>
        </div>
        <div className='mb-6 col-span-12  max-sm:col-span-12'>
          <Input
            type='text'
            id='address'
            label='Permanent Address'
            value={props.formFields.fieldData.address?.value}
            className={[leadStyle.input, props.formFields.fieldData.address?.error ? leadStyle.inputError : ''].join(
              ' '
            )}
            placeholder='Enter Your Permanent Address'
            onBeforeInput={(event) => {
              if (!/^[A-Za-z]*$/.test(event.data)) {
                event.preventDefault()
                event.stopPropagation()
              }
            }}
            disabled={props.formFields.fieldData.address?.locked}
            error={props.formFields.fieldData.address?.error}
          />
        </div>

        <div className='mb-6 col-span-6 max-sm:col-span-12 relative'>
          {/* <PincodeInput value={props.formFields} setPincodeNumber={setPincodeNumber} /> */}
          <CommonPicodeInput
            // disabled={profileformData?.pin_code && token ? true : false}
            value={props?.formData?.pin_code ? props?.formData?.pin_code : props.formFields.fieldData?.pin_code}
            getData={getData}
            handleChange={handleChange}
            handlePincodeChange={handlePincodeChange}
            className={[leadStyle.input, props?.data?.fieldData?.pin_code?.error ? leadStyle.inputError : ''].join(' ')}
            placeholder='Enter your pincode'
          />
          {visible && (
            <ul className='suggestions pin-suggestion top-[100%]' ref={wrapperRef}>
              {pinCode.map((i, v) => (
                <li
                  className={''}
                  key={v}
                  onClick={() => {
                    props?.setFormData({ ...props?.formData, pin_code: i })
                    setVisibility(!visible)
                  }}>
                  {i}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='mb-6 col-span-6  max-sm:col-span-12'>
          <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
            City
          </label>
          <input
            id='city'
            disabled={props?.formData?.city && token ? true : false}
            value={props?.formData?.city ? props?.formData?.city : cityPin}
            className={[leadStyle.input, props.formFields.fieldData.city?.error ? leadStyle.inputError : ''].join(' ')}>
            {/* <option disabled value='select'>
            select
          </option> */}
          </input>
        </div>
        <div className='mb-6 col-span-6  max-sm:col-span-12'>
          <label className='text-[14px] font-normal text-[#212529] mb-2' htmlFor='date'>
            State
          </label>
          <input
            id='city'
            value={statePin ? statePin : props.formFields.fieldData.state?.value}
            className={[leadStyle.input, props.formFields.fieldData.state?.error ? leadStyle.inputError : ''].join(
              ' '
            )}>
            {/* <option disabled value='select'>
            select
          </option> */}
          </input>
        </div>
      </div>
    </>
  )
}
