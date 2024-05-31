import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SubmitFormBtn from '../SubmitFormBtn'
import OTPInput from 'react-otp-input'
import { BASE_URL, USERSET, AUTHUSER } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import Loader from '../../Leads/common/Loader'
import logo from '../../../../public/assets/mainLogo.svg'

import LoaderComponent from '../../Partners/LoaderComponent/LoaderComponent'
import IsThatYouComp from '../CommonList/IsThatYouComp/IsThatYouComp'
import CheckAgree from '../CommonList/CheckAgree/CheckAgree'
import TagManager from 'react-gtm-module'

const Loginpage = ({ lastPageVisited, metaData }) => {
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const userData = localUserData && JSON.parse(localUserData)
  const leadprofileid = localStorage?.getItem('leadprofileid')
  
  const [modalIsOpen, setIsOpen] = useState(0)

  const [otpdata, setOtpdata] = useState([])
  const [errMsg, setErrorMsg] = useState(false)
  const [errOtp, setErrorOtp] = useState(false)
  const [mobile, setMobile] = useState(userData?.mobile)
  const [responseData, setResponseData] = useState([])
  const [transactionid, setTransactionId] = useState([])
  const [otpmessage, setotpMessage] = useState([])
  const [messagetype, setMessageType] = useState([])
  const [istempotp, setTempOtp] = useState([])
  const [tokentype, setTokenType] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)
  const [termsModal, setTermsModal] = useState(false)
  const [checkAgree, setCheckAgree] = useState(true)

  const [scrollY, setScrollY] = useState(0)
  const [time, setTime] = useState(60)
  const [IstimeActive, setIsTimeActive] = useState(true)
  const [resendOtp, setResendOtp] = useState(false)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [modalStepper, setModalStepper] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleChange = (e) => {
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
      setMobile(extractedNumber)
      setErrorMsg(false)
    }
    if (extractedNumber?.length < 10) {
      setErrorMsg(true)
      setMobile(extractedNumber)
    }
    if (extractedNumber == '0000000000') {
      setZeroNumberValidation(true)
    }
    if (extractedNumber !== '0000000000') {
      setZeroNumberValidation(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const router = useRouter()

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
        customer_mobile_no : mobile,
      },
    });
  }

  const LoginOtp = (e) => {
    e?.preventDefault()
    setLoading(true)
    setModalStepper(1)
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
          localStorage.setItem('transaction_id', response?.data?.transaction_id)
          localStorage.setItem('auth_type', response?.data?.type)
          setotpMessage(response?.data?.message)
          setMessageType(response?.data?.type)
          setTempOtp(response?.data?.is_temp_otp)
          toast.success(ApiMessage?.otpsentsuccessfully)
          setIsOpen(1)
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
  const getUserProfileData = (token, leadId) => {
    const headersAuth = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    }
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
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(response?.data?.data))
            localStorage.setItem('eligibleProducts', response?.data?.data?.eligible_product)
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        }
      })
  }
  const LoginVerify = (e) => {
    // e?.preventDefault()
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
            is_temp_otp: istempotp
          },
          { headers: headers }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            setResponseData(response?.data)
            setLoadingOtp(false)
            setTokenType(response?.data?.data?.token_type)
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', response?.data?.data?.access_token)
              localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
              localStorage.setItem('auth_Otp', e)
              localStorage.setItem('userData', JSON.stringify(response?.data?.data))
            }
            getUserProfileData(response?.data?.data?.access_token, response?.data?.data?.lead_profile_id)
            toast.success(ApiMessage?.loginverify)
            handleGTM(response?.data?.data?.lead_profile_id)
            if (response?.data?.data?.is_first_time_user) {
              setModalStepper(2)
            } else {
              router.push({ pathname: lastPageVisited || '/' })
            }
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

  //yes
  const handleYes = () => {
    setModalStepper(0)
    router.push('/user/setprofile')
  }
  // no
  const handleNo = () => {
    setModalStepper(0)
    router?.push({ pathname: lastPageVisited || '/' })
  }

  const handleNumberEdit = () => {
    setIsOpen(0)
    setModalStepper(0)
    setOtpdata([])
    setLoading(false)
    setLoadingOtp(false)
  }
  const getMobileComponent = () => (
    <div className='container mx-auto flex flex-col items-center justify-center max-sm:px-[32px]'>
      <div className='mt-[40px] max-sm:mt-[22px]'>
        <Image src={logo} height={91} width={95} alt='logo' />
      </div>
      <div className="text-center text-neutral-800 xl:text-[20px] md:text-[16px] font-medium font-['Poppins'] md:leading-[32px] max-sm:text-[15px] max-sm:leading-[30px]">
        A few steps towards creating magic with Finance
      </div>
      <div className="text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] mt-[10px] max-sm:text-[13px]">
        Your key to Financial world!
      </div>
      <div className='mt-[30px] w-[430px] max-sm:w-[300px]'>
        <form onSubmit={handleSubmit}>
          <div className=''>
            <div className="text-neutral-800 text-[13px] font-normal font-['Poppins']">Mobile Number</div>
            <div
              className={
                errMsg || zeroNumberValidation
                  ? 'flex items-center gap-[18px] h-[48px] bg-white rounded-lg border border-[#FF000F] mt-1'
                  : 'flex items-center gap-[18px] h-[48px] bg-white rounded-lg border border-neutral-300 mt-1'
              }>
              <div>
                <p className='pl-[20px] text-[15px] text-[#212529]'>+91</p>
              </div>
              <input
                type='tel'
                name='phone'
                id='phone'
                className='text-[#212529] border-none  outline-none '
                placeholder='Enter Your Number'
                onChange={(e) => handleChangeNumber(e)}
                value={mobile}
                required
                maxLength={10}
              />
            </div>
            {errMsg && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberError}</p>}
            {zeroNumberValidation && (
              <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
            )}
            <CheckAgree checkAgree={checkAgree} setCheckAgree={setCheckAgree} setTermsModal={setTermsModal} />
            <div className='mt-[30px] flex items-center justify-center'>
              <SubmitFormBtn
                name={!isLoading ? 'Send OTP' : <Loader />}
                className={
                  mobile?.length < 10 || mobile === undefined || mobile === '0000000000' || isLoading || !checkAgree
                    ? 'bg-[#E6ECF1] w-[200px] h-[48px]  px-8 text-[#212529]  text-[16px] rounded-lg hover:bg-[#E6ECF1] hover:border-[#E6ECF1]  hover:border border hover:text-white font-[600] duration-300'
                    : 'bg-[#49D49D]  w-[200px] h-[48px]  px-8 text-[#212529]  text-[16px] rounded-lg hover:bg-white hover:border-[#49d49d]  hover:border border hover:text-[#212529] font-[600] duration-300'
                }
                disabled={
                  mobile?.length < 10 ||
                  mobile === undefined ||
                  mobile === '0000000000' ||
                  isLoading ||
                  checkAgree === false ||
                  checkAgree === null ||
                  checkAgree === undefined
                }
                onClick={LoginOtp}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  const getOtpModal = () => {
    return (
      <div className='flex flex-col items-center justify-center w-[420px] max-sm:w-auto max-sm:px-[32px] mx-auto mt-[60px]'>
        <div className='flex items-center flex-col m:mt-0'>
          <div className=" text-center text-neutral-800 text-2xl font-medium font-['Poppins']">OTP Sent!</div>
          <p className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] max-[479px]:text-center pt-[10px]'>
            {ApiMessage?.otpContent}
          </p>
          <div className='text-center'>
            <span className=' py-1 text-[15px] max-[479px]:text-[13px] text-[#212529] '>+91 {mobile}</span>{' '}
            <button
              onClick={handleNumberEdit}
              className='text-[#49D49D] cursor-pointer ps-2 text-[15px] max-[479px]:text-[13px]'>
              Edit Number
            </button>
          </div>
        </div>
        <form>
          <div className='flex my-[30px] justify-center '>
            <div className='space-x-2 otp-data-box text-[#212529]'>
              <OTPInput
                value={otpdata}
                inputType='tel'
                onChange={(e) => handleChange(e)}
                numInputs={4}
                autocomplete='one-time-code'
                name='otp'
                renderInput={(props) => <input {...props} className='text-[#212529]' />}
              />
              {errOtp && <p className='text-[12px] text-[#FF000F] font-no mt-2'>{ApiMessage?.otpValidError}</p>}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='font-normal max-[479px]:text-center text-[#212529]'>
              Resend OTP in 00:{formatTime(time)} Sec
            </p>
            <div className=' pt-[30px] text-center'>
              {resendOtp ? (
                <SubmitFormBtn name={!isLoading ? 'Resend OTP' : <Loader />} onClick={LoginOtp} disabled={isLoading} />
              ) : (
                <SubmitFormBtn
                  name={!isLoadingOtp ? 'Submit' : <Loader />}
                  disabled={otpdata.length < 4 || isLoadingOtp}
                  onClick={LoginVerify}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }

  useEffect(() => {
    if (modalStepper === 2) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [modalStepper])

  useEffect(() => {
    if (modalIsOpen === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [modalIsOpen])

  return (
    <>
      <Toaster />

      {isLoading || isLoadingOtp ? <LoaderComponent /> : ''}
      <div className='container pb-[300px] mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 pt-[30px] max-sm:pt-0 justify-around  max-[479px]:h-auto'>
        {modalStepper === 0 && getMobileComponent()}
        {modalStepper === 1 && getOtpModal()}
        {modalStepper === 2 && (
          <div>
            <IsThatYouComp
              handleYes={handleYes}
              handleNo={handleNo}
              question='Do you want to set your profile first?'
              noText='Not Now'
              yesText='Yes'
              isFromLogin={true}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Loginpage
