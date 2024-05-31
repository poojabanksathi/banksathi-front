import Input from '@/core/component/Leads/InputComponent/Input'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '@/core/component/common/CommonList/CommonFieldComponent/MobileNumber'
import SubmitFormBtn from '@/core/component/common/SubmitFormBtn'
import { BASE_URL, CONTACTAUTH, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import OTPInput from 'react-otp-input'
import LoaderComponent from '../../LoaderComponent/LoaderComponent'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import Image from 'next/image'
import Thankyou from '../../../../../public/assets/thank-u.svg'
import { removeNonAlphaNumeric } from '@/utils/util'

const CommonPartnersForm = ({ isMobile = false, partnerRef }) => {
  const router = useRouter()
  const width = typeof window !== 'undefined' && window?.innerWidth

  const [getInTouchData, setGetInTouchData] = useState({})
  const [mobileNumber, setMobileNumber] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  const [openOtpModal, setOpenOtpModal] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [otpdata, setOtpdata] = useState('')
  const [errOtp, setErrorOtp] = useState(false)
  const [resendOtp, setResendOtp] = useState(false)
  const [time, setTime] = useState(60)
  const [errorMessage, setErrorMessage] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [errorHref, setErrorHref] = useState(false)
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [errorHrefEmail, setErrorHrefEmail] = useState(false)
  const [showThanksModal, setShowThanksModal] = useState(false)

  const token = typeof window !== 'undefined' && localStorage?.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const getUserProfileData = () => {
    axios
      .post(
        BASE_URL + USERSET?.getusersetup,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message === 'success') {
          setGetInTouchData(response?.data?.data)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message === 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 401) {
          router.push('/login')
        } else if (error?.response?.status === 403) {
          //
        }
      })
  }

  const getOtpModal = () => {
    return (
      <div
        className={`bg-white w-[38vw] h-[380px] rounded-[16px] flex flex-col items-center justify-center mt-[40px] ${
          isMobile ? 'w-[99vw] relative bottom-[170px] mt-0' : ''
        }`}>
        {showThanksModal ? (
          <>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 p-[20px]'>
              <Image src={Thankyou} width={100} height={100} className='m-auto' alt='image' />
              <h3 className='text-2xl max-[479px]:text-[18px] text-center py-2 font-semibold text-[#212529]'>
                Thank you!
              </h3>
              <p className='text-[15px] max-[479px]:text-[13px] text-[#000000] max-[479px]:px-[50px] mt-[20px]'>
                We&apos; ve submitted your request.Our customer relationship manager will contact you soon!
              </p>
            </div>
            <div className='text-center p-5 max-[479px]:pt-5'>
              <SubmitFormBtn
                name={'Okay'}
                onClick={() => {
                  setShowLoader(false)
                  setOpenOtpModal(false)
                  setShowThanksModal(false)
                  getUserProfileData()
                  setOtpdata('')
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className='  flex items-center justify-center sm:flex sm:items-center  w-full'>
              <div className=' sm:mt-0'>
                <h3
                  className='text-[36px] max-[834px]:text-[32px]  max-sm:text-[18px]  py-2 font-semibold text-[#212529] text-center max-sm:p-0'
                  id='modal-title'>
                  Enter OTP
                </h3>
                <p className='text-center  py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center'>
                  A 4-digit code has been sent to your number
                </p>
                <div className='max-[479px]:text-center'>
                  <span className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] '>
                    +91 {getInTouchData?.mobile || mobileNumber}
                  </span>{' '}
                </div>
              </div>
            </div>
            <form>
              <div className='flex mt-4 max-[479px]:justify-center items-center justify-center'>
                <div className='space-x-2 otp-data-box text-[#212529]'>
                  <OTPInput
                    value={otpdata}
                    onChange={(e) => handleChangeOtp(e)}
                    numInputs={4}
                    name='otp'
                    inputType='tel'
                    renderInput={(props) => <input {...props} />}
                  />
                  {errOtp && <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>}
                </div>
              </div>
              <p className='font-normal  pt-5 max-[479px]:text-center text-[#212529]'></p>
              <div className=' pt-2 max-[479px]:text-center'>
                <div className='text-black text-[15px] font-normal text-center'>Resend OTP in {formatTime(time)}</div>
              </div>
              <div className='mt-[35px] flex items-center'>
                {resendOtp ? (
                  <SubmitFormBtn
                    name={'Resend'}
                    onClick={callOtpApi}
                    className={`head-text font-medium font-[faktum] w-[25vw] h-[50px] text-center bg-[#49D49D] !text-[#212529] rounded-lg text-[15px]  mx-auto flex items-center justify-center gap-4 relative bottom-[16px] ${
                      resendOtp ? '' : 'disableClassBtn'
                    }`}
                  />
                ) : (
                  <SubmitFormBtn
                    name={'Verify'}
                    onClick={() => {}}
                    className={`head-text font-medium font-[faktum] w-[25vw] h-[50px] text-center bg-[#49D49D] !text-[#212529] rounded-lg text-[15px]  mx-auto flex items-center justify-center gap-4 relative bottom-[16px] ${
                      otpdata?.length === 4 || resendOtp ? '' : 'disableClassBtn'
                    }`}
                  />
                )}
              </div>
            </form>
          </>
        )}
      </div>
    )
  }

  const handleChangeNumber = (e) => {
    const inputValue = e.target.value
    const extractedNumber = inputValue.replace(/\D/g, '')
    if (extractedNumber?.length === 10) {
      setMobileNumber(extractedNumber)
      setErrorMessage(false)
    } else if (extractedNumber?.length < 10) {
      setErrorMessage(true)
      setMobileNumber(extractedNumber)
    }
    if (extractedNumber == '0000000000') {
      setZeroNumberValidation(true)
    } else setZeroNumberValidation(false)
  }

  const handleChange = (event) => {
    setErrorHref(false)
    setErrorHrefName(false)
    setErrorHrefEmail(false)
    if (event?.target?.name === 'enquiry' || event?.target?.name === 'full_name' || event?.target?.name === 'email') {
      const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
      if (hrefRegex.test(event.target.value)) {
        if (event?.target?.name === 'enquiry') {
          setErrorHref(true)
        } else if (event?.target?.name === 'full_name') {
          setErrorHrefName(true)
        } else {
          setErrorHrefEmail(true)
        }
      } else {
        setGetInTouchData({ ...getInTouchData, [event?.target?.name]: event.target.value })
      }
    }
    if (event?.target.name === 'email') {
      setGetInTouchData({ ...getInTouchData, email: event?.target?.value })
    }
  }

  // verify otp api call
  const VerifyOtpCall = (otp) => {
    setShowLoader(true)
    axios
      .post(
        BASE_URL + CONTACTAUTH?.contactotpverify,
        {
          name: getInTouchData?.full_name || '',
          email: getInTouchData?.email || '',
          user_type: 'partner',
          message: getInTouchData?.enquiry || '',
          otp: otp,
          transaction_id: transactionId,
          mobile_no: String(getInTouchData?.mobile) || String(mobileNumber)
        },
        { headers: headers }
      )
      .then((response) => {
        setShowLoader(false)
        if (response?.data?.message === 'success') {
          setTransactionId(response?.data?.Recommended_Product?.transaction_id)
          toast.success(ApiMessage?.otpsentsuccessfully)
        }
        setResendOtp(false)
        setTime(60)
        localStorage.removeItem('otpnumber')
        setShowThanksModal(true)
      })
      .catch((error) => {
        setOtpdata('')
        setShowLoader(false)
        setOpenOtpModal(false)
        setShowThanksModal(false)
        if (error?.response?.data?.message === 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 422) {
          if (otp === '0000') {
            toast.error('Invalid Otp!')
          }
        }
      })
  }

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp.replace(/\D/g, '')
    setOtpdata(extractedOtp)
    if (extractedOtp?.length === 4) {
      VerifyOtpCall(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }
  const handleScroll = () => {
    partnerRef?.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }
  // otp api call
  const callOtpApi = (e) => {
    setOpenOtpModal(true)

    handleScroll()
    e.preventDefault()
    setShowLoader(true)
    axios
      .post(
        BASE_URL + CONTACTAUTH?.contactsendotp,
        {
          mobile_no: getInTouchData?.mobile ? String(getInTouchData?.mobile) : String(mobileNumber),
          condition_accepted: true,
          whatsaap_consent: false
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.status === 200) {
          setTransactionId(response?.data?.Recommended_Product?.transaction_id)
          toast.success(ApiMessage?.otpsentsuccessfully)
          setOpenOtpModal(true)
          setShowLoader(false)
          setResendOtp(false)
          setTime(60)
          localStorage.removeItem('otpnumber')
        }
      })
      .catch((error) => {
        setShowLoader(false)
        setOpenOtpModal(false)
        setShowThanksModal(false)
        if (error?.response?.data?.message === 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 422) {
          toast.error(error?.message)
        }
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('full_name', getInTouchData?.full_name)
    bodyFormData.append('email', getInTouchData?.email)
    bodyFormData.append('mobile', getInTouchData?.mobile)
    bodyFormData.append('enquiry', getInTouchData?.enquiry)
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
      setResendOtp(true)
    }
  }, [time])

  //to disable enable the button
  useEffect(() => {
    if (getInTouchData && Object.keys(getInTouchData)?.length > 0) {
      if (
        getInTouchData?.email &&
        getInTouchData?.enquiry &&
        getInTouchData?.full_name &&
        getInTouchData?.company_name &&
        (getInTouchData?.mobile || mobileNumber)
      ) {
        setDisableButton(false)
      }
    }
  }, [Object?.keys(getInTouchData)?.length])

  // To get user profile data
  useEffect(() => {
    if (token) {
      getUserProfileData()
    }
  }, [])

  return (
    <div>
      <>{showLoader && <LoaderComponent />}</>
      {!openOtpModal && !showLoader && (
        <div
          className={`${isMobile ? 'w-auto !mt-0 relative bottom-[150px]' : 'w-[672px]'} h-auto bg-white rounded-2xl ${
            !isMobile && 'relative right-[19%]'
          } mt-[61px] ${width === 768 ? 'bottom-[130px]' : ''}`}>
          <div className='flex flex-col p-[36px]'>
            <div className='text-neutral-400 text-xs font-medium uppercase'>send a message</div>
            <div className='text-black text-[26px] font-semibold'>Get in Touch with Us</div>
            <form method='post' id='enquiryForm' onSubmit={handleSubmit}>
              <div className='mt-[35px]'>
                <div className='grid grid-cols-2 gap-[20px] max-[479px]:grid-cols-1'>
                  <div>
                    <Input
                      className={`w-full py-4 px-4 shadow border rounded-lg mr-[37px] text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 ${'border-[#C2CACF]'}`}
                      id='name'
                      name='name'
                      type='text'
                      required
                      pattern='[A-Za-z]+'
                      placeholder='Your Name'
                      disabled={false}
                      value={getInTouchData?.full_name}
                      onInput={(e) => {
                        e.target.value = removeNonAlphaNumeric(e)
                      }}
                      onChange={(e) => {
                        setGetInTouchData({ ...getInTouchData, full_name: e?.target?.value })
                      }}
                    />
                    {errorHrefName && (
                      <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>
                    )}
                    {/* {errorMessage && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>} */}
                  </div>
                  <div>
                    <div className={errorMessage || zeroNumberValidation ? ' border-[#FF000F]  ' : ''}>
                      <CommonNumberInput
                        disabled={getInTouchData?.mobile !== '' && token}
                        defaultValue={getInTouchData?.mobile || mobileNumber}
                        handleChange={handleChange}
                        className={false}
                        handleChangeNumber={handleChangeNumber}
                        // value={getInTouchData?.mobile || mobileNumber}
                      />
                    </div>
                    {zeroNumberValidation && (
                      <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
                    )}
                  </div>
                </div>
                <div className='grid grid-cols-1 max-[479px]:grid-cols-1 pt-[12px]'>
                  <div>
                    <input
                      className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                      id='employerName'
                      name='company_name'
                      onChange={(e) => setGetInTouchData({ ...getInTouchData, company_name: e?.target?.value })}
                      value={getInTouchData?.company_name}
                      type='text'
                      placeholder='Company Name'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 pt-[12px]'>
                  <CommonEmailInput
                    value={getInTouchData?.email}
                    hideLabel={true}
                    handleChange={handleChange}
                    errorHrefEmail={errorHrefEmail}
                    disabled={getInTouchData?.email && token ? true : false}
                  />
                </div>
                <div className='mt-[10px]'>
                  <textarea
                    className='conformtext'
                    name='enquiry'
                    id='enquiry'
                    onChange={(e) => setGetInTouchData({ ...getInTouchData, enquiry: e?.target?.value })}
                    value={getInTouchData?.enquiry}
                    type='text-area'
                    placeholder='Your Message'></textarea>
                  {errorHref && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}
                </div>
              </div>
              <div className='flex items-center justify-center mt-[17px]'>
                <SubmitFormBtn
                  name={'Send OTP'}
                  disabled={disableButton}
                  onClick={callOtpApi}
                  className={`cursor-pointer head-text font-[faktum] text-center bg-cyan-950 !text-white py-2 pl-2 pr-2 rounded-lg text-[16px] w-full h-[64px] mx-auto flex items-center justify-center gap-4 max-sm:w-[127px] max-sm:h-[40px] max-sm:text-[12px] md:text-[12px] ${
                    disableButton ? 'disableClassBtn' : ''
                  }`}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='relative'>
        <button
          className='flex absolute cursor-pointer right-[5%] top-[3%]  px-2 py-1 z-[1] w-[26px]'
          onClick={() => {
            setOpenOtpModal(false)
          }}></button>

        {openOtpModal && getOtpModal()}
      </div>
    </div>
  )
}

export default CommonPartnersForm
