import { AUTHUSER, BASE_URL } from '@/utils/alljsonfile/service'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SubmitFormBtn from '../SubmitFormBtn'
import OTPInput from 'react-otp-input'
import closeicon from '../../../../public/assets/closeIcon.svg'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { useRouter } from 'next/router'
import jwt from 'jwt-decode'
import { handleRemoveLocalstorage } from '@/utils/util'
import Loader from '../../Leads/common/Loader'
import LoaderLogo from '../../../../public/assets/logo-loader.gif'
import closeIcon from "../../../../public/assets/closeIcon.svg"
import TagManager from 'react-gtm-module'


function LoginPopUp() {

  const token = localStorage.getItem('token')
  const leadprofileid = localStorage?.getItem('leadprofileid')
  const userData = localStorage?.getItem('userData')
  const router = useRouter()

  const [responseData, setResponseData] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState(60)
  const [IstimeActive, setIsTimeActive] = useState(true)
  const [resendOtp, setResendOtp] = useState(false)
  const [loginPopupmodal, setLoginPopupModal] = useState(false)
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


  useEffect(() => {
    if (modalIsOpen || loginPopupmodal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [modalIsOpen, loginPopupmodal])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('review', responseData.review)
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

const handleGTM = (profileId) => {
  TagManager?.dataLayer({
    dataLayer: {
      event: 'user_login',
      lead_profile_id: profileId,
      name: userData?.full_name,
      cust_id: profileId,
      customer_name : userData?.full_name,
      customer_mobile_no : mobile
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
            localStorage.setItem('userName', response?.data?.data?.full_name)
            localStorage.setItem('auth_Otp', e)
            toast.success(ApiMessage?.loginverify)
            handleGTM(response?.data?.data?.lead_profile_id)
            if (response?.data?.data?.is_first_time_user === true) {
              router.push('/user/setprofile')
            } else {
              // router.push('/')
            }
            setIsOpen(false)
            setLoginPopupModal(false)
            setLoadingOtp(false)
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

  const handleChangeOtp = (e) => {
    // setOtpdata(e)
    const valueotp = e
    const extractedOtp = valueotp?.replace(/\D/g, '')

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
    const extractedNumber = inputValue?.replace(/\D/g, '')

    if (extractedNumber?.length === 10) {
      setIsTimeActiveetMobile(extractedNumber)
      setErrorMsg(false)
    } else if (extractedNumber?.length < 10) {
      setErrorMsg(true)
      setMobile(extractedNumber)
    }
    if (extractedNumber == '0000000000') {
      setZeroNumberValidation(true)
    }
  }

  useEffect(() => {
    if (!token) {
      setLoginPopupModal(true)
    } else if (loginPopupmodal) {
      router?.push('/')
    }
  }, [])


  const handleCloseModal = () => {
    setLoginPopupModal(false)
    router?.push('/')
  }

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

      {loginPopupmodal && (
        <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg p-8 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <button
                    className='flex cursor-pointer absolute right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                    onClick={() => handleCloseModal()}>
                    <Image
                      src={closeicon}
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
        <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-0 transition-opacity'></div>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg p-8 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <button
                      className='flex absolute cursor-pointer right-[2%] top-[2%]  px-2 py-1 z-[1] w-[26px]'
                      onClick={() => {
                        setIsOpen(false)
                      }}>
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
                  <div className='text-center pt-4'>
                    {resendOtp ? (
                      <SubmitFormBtn
                        name={!isLoading ? 'Resend OTP' : <Loader />}
                        onClick={LoginOtp}
                        disabled={isLoading}
                      />
                    ) : (
                      <SubmitFormBtn
                        name={!isLoadingOtp ? 'Submit' : <Loader />}
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
    </>
  )
}

export default LoginPopUp
