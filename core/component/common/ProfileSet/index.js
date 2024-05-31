/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL, COMMON, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import DatePicker from 'react-datepicker'
import { useRouter } from 'next/router'
import SuccessIcon from '../../Leads/common/SuccessIcon'
import Input from '../../Leads/InputComponent/Input'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import CommonEmailInput from '../CommonList/CommonFieldComponent/EmailAdd'
import {
  errorHandling,
  handleRemoveLocalstorage,
  removeNonAlphaNumeric,
  ScrollToTop2,
  ScrollToTop,
  panRegex,
  emailRegex
} from '@/utils/util'
import NewFormsIcons from '../CommonList/NewFormsIcons/NewFormsIcons'
import LoaderComponent from '../../Partners/LoaderComponent/LoaderComponent'
import IsThatYouComp from '../CommonList/IsThatYouComp/IsThatYouComp'
import CheckAgree from '../CommonList/CheckAgree/CheckAgree'
import { useWindowSize } from '@/hooks/useWindowSize'
import moment from 'moment'
import PincodeAndCity from '../CommonList/PincodeAndCity/PincodeAndCity'

export const CommonButton = ({ title, handleSubmit, disable, ref }) => {
  return (
    <div className='mt-[30px] max-sm:mb-4 text-left w-full h-[48px]' ref={ref}>
      <button
        type='submit'
        disabled={disable}
        onClick={() => {
          handleSubmit()
        }}
        className={
          disable
            ? 'text-[18px] w-[200px] items-center cursor-pointer text-white max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#E6ECF1] rounded-lg max-[771px]:px-3 max-sm:w-full'
            : 'text-[18px] w-[200px] items-center cursor-pointer text-white max-[280px]:text-[15px] max-[771px]:text-[16px] px-5 py-[12px]  bg-[#49D49D] rounded-lg max-[771px]:px-3 max-sm:w-full'
        }>
        {title}
      </button>
    </div>
  )
}
function ProfileSet({ leadId, token }) {
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const data = { ref: topRef || nameRef, isMobile: mobileView }

  const [profileFormData, setProfileFormData] = useState([])
  const [panValidation, setPanValidation] = useState('')
  const [errorNameLast, setErrorNameLast] = useState(false)
  const [startDate, setStartDate] = useState()
  const [pincodeNumber, setPincodeNumber] = useState()
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [pancardError, setPancardError] = useState(true)
  const [panVerifyCard, setPanVerifyCard] = useState(false)
  const [panVerifyName, setPanVerifyName] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [modalStepper, setModalStepper] = useState(0)
  const [showIsThatYou, setShowIsThatYou] = useState(false)
  const [checkAgree, setCheckAgree] = useState(false)
  const [termsModal, setTermsModal] = useState(false)
  const [city, setCity] = useState()
  const [emailValid, setEmailValid] = useState(true)

  const router = useRouter()

  const today = new Date()

  // check entered date format
  const isValidDate = (dateString) => {
    // Regular expression for 'dd-MM-yyyy' format
    const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
    return dateFormatRegex.test(dateString)
  }

  const selectDateHandler = (d) => {
    setStartDate(d)
  }

  let dateObject = new Date(startDate)
  let year = dateObject.getFullYear()
  let month = dateObject.getMonth() + 1
  let day = dateObject.getDate()

  let formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)

  const handleValidation = (e) => {
    const extractedName = profileFormData?.lastname?.replace(/^[a-zA-Z]+$/, '')
    if (!extractedName) {
      setErrorNameLast(false)
    } else {
      setErrorNameLast(true)
    }
  }

  const handleChange = (event) => {
    if (event?.target?.name === 'email') {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setEmailValid(false)
      else setEmailValid(true)
      setProfileFormData({ ...profileFormData, email: event?.target?.value })
    }
    if (event?.target?.name === 'pan_no') {
      const inputValue = event?.target?.value?.toUpperCase()
      const isValidInput = panRegex.test(inputValue)
      setPancardError(isValidInput)
      setProfileFormData({ ...profileFormData, pan_no: inputValue })
      setPanVerifyCard(false)
    }
    if (event?.target?.name === 'monthly_salary') {
      setProfileFormData({ ...profileFormData, ['monthly_salary']: parseInt(event?.target?.value) })
    }
    if (event?.target?.name === 'itr_amount') {
      setProfileFormData({ ...profileFormData, ['itr_amount']: parseInt(event?.target?.value) })
    }
    setProfileFormData({ ...profileFormData, [event?.target?.name]: event?.target?.value })
  }

  const handlePincodeChange = (event) => {
    setVisible(true)
  }

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
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
          setProfileFormData(response?.data?.data)
          const apiDob = response.data?.data?.dob
          apiDob && setStartDate(apiDob)
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

  const UserUpdateSetUp = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    const params = {
      lead_profile_id: leadId,
      full_name: panVerifyCard ? panVerifyName : profileFormData?.full_name,
      email: profileFormData?.email ? profileFormData?.email : '',
      dob: profileFormData?.dob ? profileFormData?.dob : '',
      pin_code: profileFormData?.pin_code ? profileFormData?.pin_code : '',
      pan_no: profileFormData?.pan_no ? profileFormData?.pan_no : '',
      gender: profileFormData?.gender,
      occupation: profileFormData?.occupation?.toLowerCase(),
      company_name: profileFormData?.company_name,
      monthly_salary: parseInt(profileFormData?.monthly_salary) ? parseInt(profileFormData?.monthly_salary) : '0',
      itr_amount: parseInt(profileFormData?.itr_amount) ? parseInt(profileFormData?.itr_amount) : '0'
    }
    if (typeof window !== 'undefined' && params) {
      localStorage.setItem('userData', JSON.stringify(params))
    }
    axios
      .put(BASE_URL + USERSET?.updateusersetup, params, { headers: headersAuth })
      .then((response) => {
        if (response?.data?.message == 'success') {
          toast.success(ApiMessage?.updateProfile)
          GetUserSetUp()
          setIsLoading(false)
          router.push('/my-profile/profile')
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          setIsLoading(false)
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 422) {
          setIsLoading(false)
          toast.error(error?.response?.reason)
        } else if (error?.response?.status == 500) {
          setIsLoading(false)
          toast.error(ApiMessage?.internalServerError)
        }
        setIsLoading(false)
      })
  }

  const PinCodeVerify = (e) => {
    axios
      .post(
        BASE_URL + COMMON?.pinCodeVerify,
        {
          pin_code: profileFormData?.pin_code
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

  const previousController = useRef()

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setVisible(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  // check pan and mobile verification
  const fetchPanMobValidData = () => {
    const params = {
      mobile_no: String(profileFormData?.mobile),
      pan_no: profileFormData?.pan_no
    }
    axios
      .post(BASE_URL + COMMON.panMobValidation, params)
      .then((res) => {
        if (res?.data?.code === 0) {
          setModalStepper(1)
        } else if (res?.data?.code === 1) {
          toast.error(res?.data?.data)
        }
      })
      .catch((err) => {
        errorHandling(err)
      })
  }
  const handlePanSubmit = () => {
    // CALL pan and mobile verify API
    fetchPanMobValidData()
  }
  const handlePersonalSubmit = () => setModalStepper(2)
  //PAN FORM

  const getPanForm = () => {
    const disable =
      profileFormData?.pan_no === '' ||
      profileFormData?.pan_no === null ||
      (!profileFormData?.full_name && !panVerifyName) ||
      !pancardError

    const panVerifyFromData = profileFormData?.is_pan_verified === '1'
    return (
      <>
        <div ref={topRef}>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='email'>
            PAN Card
          </label>

          <Input
            className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${
              pancardError === false ? 'border-red-500' : 'border-[#C2CACF] '
            }`}
            id='pan_no'
            name='pan_no'
            maxLength={10}
            type='text'
            value={profileFormData?.pan_no}
            // disabled={panVerifyFromData}
            onChange={(e) => handleChange(e)}
            onFocus={() => ScrollToTop2(data)}
            placeholder='Enter your PAN card number'
            // endAdornment={pancardError || panVerifyFromData ? <SuccessIcon /> : ''}
          />
          {!pancardError && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>}
        </div>
        <div className={errorNameLast ? ' border-[#FF000F]' : ' mt-[21px]'}>
          <label className='text-[13px] font-normal text-[#212529]' htmlFor='email'>
            Full Name
          </label>
          <input
            className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
            id='full_name'
            name='full_name'
            type='text'
            pattern='[A-Za-z]+'
            onChange={(e) => {
              handleChange(e)
              handleValidation(e)
            }}
            onInput={(e) => {
              e.target.value = removeNonAlphaNumeric(e)
            }}
            onFocus={() => ScrollToTop(nameRef, mobileView)}
            placeholder='Enter Your Last Name'
            // disabled={panValidation === 'INVALID' || panValidation === 'VALID' || panVerifyFromData}
            defaultValue={
              panVerifyName !== '' && (panValidation === 'VALID' || panVerifyFromData)
                ? panVerifyName || profileFormData?.full_name
                : ''
            }
          />
          {errorNameLast && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
        </div>
        <CommonButton title='Next' handleSubmit={handlePanSubmit} disable={disable} ref={nameRef} />
      </>
    )
  }
  // PERSONAL INFO FORM
  const getPersonalInfoForm = () => {
    const formattedDate = moment(profileFormData?.dob).format('DD-MM-YYYY')
    const isValid = isValidDate(formattedDate)
    const disable =
      !profileFormData?.gender ||
      !startDate ||
      !profileFormData?.email ||
      profileFormData?.pin_code === '' ||
      profileFormData?.pin_code === null ||
      !profileFormData?.dob ||
      !isValid ||
      (!city && !profileFormData?.city) ||
      !emailValid

    return (
      <>
        <div className='mb-4' ref={topRef}>
          <p className='pt-[10px] text-[#212529]  max-[1200px]:!pt-0'>Gender</p>
          <div className='flex pt-[10px] gap-4'>
            <div>
              <label
                htmlFor='gender'
                className={`form-redio flex gap-2 items-center ${
                  profileFormData?.gender === 'Male' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='gender'
                  value={profileFormData?.gender === 'Male' ? profileFormData?.gender === 'Male' : 'Male'}
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
                  profileFormData?.gender === 'Female' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='gender'
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
                  profileFormData?.gender === 'Other' ? 'text-[#212529]' : 'text-[#808080]'
                } `}>
                <input
                  type='radio'
                  name='gender'
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
        <div className='datepicker mt-[20px]'>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='date'>
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
              selected={startDate}
              onChange={(e) => {
                selectDateHandler(e)
                handleChange(e)
              }}
              // value={profileformData?.dob}
              max={new Date().toISOString().split('T')[0]}
              required
              // defaultValue={profileformData?.dob || today}
              todayButton={'Today'}
              onFocus={() => ScrollToTop2(data)}
            />
          </div>
          {/* <div className='datepicker'>
            <DatePicker
              type='text'
              showYearDropdown
              dropdownMode='select'
              dateFormat='dd-MM-yyyy'
              placeholderText='DD/MM/YYYY'
              name='dob'
              // disabled={profileFormData?.dob && token ? true : false}
              id='dob'
              className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              selected={startDate}
              onChange={(e) => {
                selectDateHandler(e)
                handleChange(e)
              }}
              maxDate={new Date().toISOString().split('T')[0]}
              required
              todayButton={'Today'}
              onFocus={() => ScrollToTop2(data)}
            />
          </div> */}
        </div>
        <div className='mt-[20px]'>
          <CommonEmailInput value={profileFormData?.email} handleChange={handleChange} />
        </div>
        <PincodeAndCity
          userInfo={profileFormData}
          setUserInfo={setProfileFormData}
          city={city}
          setCity={setCity}
          handleInputChange={handleChange}
        />
        <CommonButton title='Next' handleSubmit={handlePersonalSubmit} disable={disable} ref={nameRef} />
      </>
    )
  }
  // PROFESSIONAL INFO FORM
  const getProfessionalForm = () => {
    const type =
      profileFormData?.occupation === 'Salaried'
        ? !!profileFormData?.monthly_salary
        : !!profileFormData?.itr_amount != '0'

    const disable = !profileFormData?.occupation || !checkAgree || !profileFormData?.company_name || !type

    return (
      <>
        <div className='' ref={topRef}>
          <p className=' text-[#212529] max-[]'>Occupation</p>
          <div className='flex pt-[10px] gap-4 max-[576px]:gap-2 mb-[16px]'>
            <div>
              <label
                htmlFor='gender'
                className={`form-redio flex gap-2 items-center ${
                  profileFormData?.occupation === 'Salaried' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='occupation'
                  value={
                    profileFormData?.occupation === 'Salaried' ? profileFormData?.occupation === 'Salaried' : 'Salaried'
                  }
                  checked={profileFormData?.occupation === 'Salaried'}
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
                  profileFormData?.occupation === 'Self-employed' ? 'text-[#212529]' : 'text-[#808080]'
                }`}>
                <input
                  type='radio'
                  name='occupation'
                  value={
                    profileFormData?.occupation === 'Self-employed'
                      ? profileFormData?.occupation === 'Self-employed'
                      : 'Self-employed'
                  }
                  checked={profileFormData?.occupation === 'Self-employed'}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                />
                Self-Employed
              </label>
            </div>
          </div>
        </div>
        <div className='mt=[20px]'>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='employerName'>
            Company Name
          </label>
          <input
            className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-2 border-[#C2CACF]'
            id='employerName'
            name='company_name'
            onChange={(e) => handleChange(e)}
            value={profileFormData?.company_name}
            type='text'
            placeholder='Enter employer name'
            onFocus={() => ScrollToTop2(data)}
          />
        </div>
        <div className='mb-4'>
          <div className='grid grid-cols-1 gap-4 max-[1200px]:!grid-cols-1 max-[1024px]:grid-cols-1 '>
            {profileFormData?.occupation === 'Salaried' && (
              <div className='mt-[20px]'>
                <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                  Monthly Income
                </label>
                <input
                  className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-2 border-[#C2CACF]'
                  id='monthly_salary'
                  name='monthly_salary'
                  value={Math.floor(profileFormData?.monthly_salary) == 0 ? '' : profileFormData?.monthly_salary}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  type='number'
                  placeholder='Enter monthly income'
                />
              </div>
            )}
            {profileFormData?.occupation === 'Self-employed' && (
              <div className='mt-[20px]'>
                <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                  ITR (amount)
                </label>
                <input
                  className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-2 border-[#C2CACF]'
                  id='itr_amount'
                  name='itr_amount'
                  value={Math.floor(profileFormData?.itr_amount) == 0 ? '' : profileFormData?.itr_amount}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  type='number'
                  placeholder='ITR (amount)'
                />
              </div>
            )}
          </div>
        </div>
        <CheckAgree
          checkAgree={checkAgree}
          setCheckAgree={setCheckAgree}
          setTermsModal={setTermsModal}
          termsModal={termsModal}
        />
        <CommonButton title='Submit' handleSubmit={UserUpdateSetUp} disable={disable} ref={nameRef} />
      </>
    )
  }

  // const handleYes = () => {
  //   setModalStepper(1)
  //   setShowIsThatYou(false)
  // }
  // const handleNo = () => {
  //   setShowIsThatYou(false)
  //   setModalStepper(0)
  // }

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

  useEffect(() => {
    setProfileFormData({
      ...profileFormData,
      dob: formattedDate,
      mobile: profileFormData?.mobile
    })
  }, [formattedDate])

  useEffect(() => {
    if (profileFormData?.pin_code?.length === 6) {
      PinCodeVerify()
    }
  }, [profileFormData?.pin_code?.length === 6])

  useEffect(() => {
    if (token) {
      GetUserSetUp()
    }
  }, [])

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  return (
    <>
      <Toaster />
      {(isLoading || isLoadingCheck) && <LoaderComponent />}
      {/* {showIsThatYou && (
        <IsThatYouComp
          handleYes={handleYes}
          handleNo={handleNo}
          question={`${profileFormData?.full_name || panVerifyName} is that you?`}
          noText='Not Me'
          yesText='Yes, It’s Me'
        />
      )} */}
      <div className='flex flex-col'>
        <div className="text-center max-sm:pt-[20px]text-neutral-800 text-2xl font-medium font-['Poppins'] mb-[20px] max-sm:mb-0 max-sm:text-[18px]">
          Enter your basic Details
        </div>
        <NewFormsIcons
          stepperData={{
            firstTtitle: 'PAN Details',
            secondTitle: 'Personal Info',
            thirdTitle: 'Professional Info',
            modalStepper: modalStepper
          }}
        />
        {modalStepper === 0 && <div className='mt-[29px] max-sm:mt-[20px]'>{getPanForm()}</div>}
        {modalStepper === 1 && <div className='mt-[30px]'>{getPersonalInfoForm()}</div>}
        {modalStepper === 2 && <div className='mt-[29px]'>{getProfessionalForm()}</div>}
      </div>
    </>
  )
}

export default ProfileSet
