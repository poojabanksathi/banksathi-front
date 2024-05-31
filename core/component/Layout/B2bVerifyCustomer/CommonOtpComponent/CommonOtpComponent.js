import SubmitFormBtn from '@/core/component/common/SubmitFormBtn'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { BASE_URL, CIBIL } from '@/utils/alljsonfile/service'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import OTPInput from 'react-otp-input'
import Cookies from 'js-cookie'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import closeIcon from '../../../../../public/assets/close-icon.svg'

const LoaderComponent = dynamic(() => import('@/core/component/Partners/LoaderComponent/LoaderComponent'), {
  ssr: false
})
const CommonOtpComponent = ({ setOtpOpen, isDesktop, customerDetails, otpOpen, callApi, setCallApi, hasAllFields }) => {
  const router = useRouter()

  const [otpdata, setOtpdata] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [errOtp, setErrorOtp] = useState(false)
  const [flow, setFlow] = useState('')
  const [authType, setAuthType] = useState(null)
  const [tempOtp, setTempOtp] = useState()
  const [resendOtp, setResendOtp] = useState(false)
  const [time, setTime] = useState(60)
  const [transactionId, setTransactionId] = useState('')
  const [fieldValue, setFieldValue] = useState()

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  const size = useWindowSize()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      setFieldValue(utm_details)
    }
  }, [])

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp?.replace(/\D/g, '')
    setOtpdata(extractedOtp)
    if (extractedOtp?.length === 4) {
      VerifyOtpCall(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }

  const formatTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  //get OTP api call

  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const getOtpApiCall = () => {
    if (hasAllFields) {
      setShowLoader(true)
      let params = {
        full_name: customerDetails?.name || '',
        mobile_no: String(customerDetails?.mobile) || '',
        email: customerDetails?.email || '',
        pan: customerDetails?.pan || '',
        pin_code: customerDetails?.pin_code || '',
        request_id: 'test',
        terms: 'agree'
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
      axios
        .post(BASE_URL + CIBIL?.withoutotpcibil, params)
        .then((response) => {
          if (response?.data.data === 'consumer record not found') {
            setShowLoader(false)
            setOtpOpen(false)
            toast.success('Cibil Record not found!')
            setCallApi(false)
          } else {
            setCallApi(false)
            setFlow(response?.data?.data?.flow)
            setShowLoader(false)
            setTransactionId(response?.data?.data?.transaction_id)
            setAuthType(response?.data?.data?.type)
            setTempOtp(response?.data?.data.is_temp_otp)
            toast.success(ApiMessage?.otpsentsuccessfully)
            setOtpOpen(true)
            setResendOtp(false)
            setTime(60)
            localStorage?.removeItem('otpnumber')
          }
        })
        .catch((error) => {
          setCallApi(false)
          setOtpOpen(false)
          setShowLoader(false)
          if (error?.response?.data?.message === 'failed') {
            toast.error(error?.response?.data?.reason)
          } else if (error?.response?.status === 422) {
            toast.error(error?.message)
          }
        })
    }
  }
  // verify otp api call

  const VerifyOtpCall = (otp) => {
    setShowLoader(true)
    let params = {
      flow: flow,
      pan: customerDetails?.pan || '',
      mobile_no: String(customerDetails?.mobile),
      full_name: customerDetails?.name || '',
      pin_code: customerDetails?.pin_code || '',
      email: customerDetails?.email || '',
      terms: 'agree',
      request_id: ' test ',
      auth_otp: otp,
      transaction_id: transactionId,
      auth_type: authType,
      is_temp_otp: tempOtp
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
    axios
      .post(BASE_URL + CIBIL?.cibilvalidateotp, params)
      .then((response) => {
        setShowLoader(false)
        setOtpOpen(false)
        setCallApi(false)
        if (response?.data?.message === 'success') {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
          }
          toast.success(ApiMessage?.verifyotp)
          router?.push({ pathname: '/my-profile' })
        }
      })
      .catch((error) => {
        setCallApi(false)
        setOtpOpen(false)
        setShowLoader(false)
        if (error?.response?.data?.message === 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 422) {
          toast.error(error?.message)
        }
      })
  }

  useEffect(() => {
    if (callApi) {
      getOtpApiCall()
    }
  }, [callApi])

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [time])

  useEffect(() => {
    if (time === 0) {
      setResendOtp(true)
    }
  }, [time])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (otpOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
    }
  }, [otpOpen])

  return (
    <>
      <div>{showLoader && <LoaderComponent />}</div>
      {otpOpen && (
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
          <div className=''>
            <div
              className={`bg-white w-[38vw] h-[380px] p-[20px] rounded-[16px] ${
                size?.width === 768 && '!w-[48vw] !left-[26%]'
              } ${isDesktop || size?.width >= 768 ? ' otpClassB2b' : 'w-[90vw] h-[297px] otpClassB2bMobile'}`}>
              {/* OTP MODAL */}
              <div className=''>
                <Image
                  src={closeIcon}
                  width={20}
                  height={20}
                  priority={true}
                  className='cursor-pointer relative xl:left-[109%] lg:left-[90%] max-[768px]:left-[90%] bottom-[10%] top-[30px]'
                  onClick={() => setOtpOpen(false)}
                  alt='close'
                />
                <div className='sm:flex sm:items-center  w-full'>
                  <div className=' sm:mt-0'>
                    <h3
                      className='text-[36px] max-[834px]:text-[32px]  max-sm:text-[18px]  py-2 font-semibold text-[#212529] text-center max-sm:p-0'
                      id='modal-title'>
                      Enter OTP
                    </h3>
                    <p className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center'>
                      A 4-digit code has been sent to your number
                    </p>
                    <span className=' py-1 text-center text-[15px] max-[479px]:text-[13px] text-[#212529] '>
                      +91 {customerDetails?.mobile}
                    </span>
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
                      name='Resend'
                      onClick={getOtpApiCall}
                      className={`head-text font-medium font-[faktum] w-[25vw] h-[50px] text-center bg-[#49D49D] !text-[#212529] rounded-lg text-[15px]  mx-auto flex items-center justify-center gap-4 relative bottom-[16px] ${
                        resendOtp ? '' : 'disableClassBtn'
                      }`}
                    />
                  ) : (
                    <SubmitFormBtn
                      name='Verify'
                      onClick={() => {}}
                      className={`head-text font-medium font-[faktum] w-[25vw] h-[50px] text-center bg-[#49D49D] !text-[#212529] rounded-lg text-[15px]  mx-auto flex items-center justify-center gap-4 relative bottom-[16px] ${
                        otpdata?.length === 4 ? '' : 'disableClassBtn'
                      }`}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CommonOtpComponent
