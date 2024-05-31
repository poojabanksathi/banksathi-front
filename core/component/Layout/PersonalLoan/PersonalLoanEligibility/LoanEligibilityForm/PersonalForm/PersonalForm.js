import Input from '@/core/component/Leads/InputComponent/Input'
import SuccessIcon from '@/core/component/Leads/common/SuccessIcon'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import CheckAgree from '@/core/component/common/CommonList/CheckAgree/CheckAgree'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '@/core/component/common/CommonList/CommonFieldComponent/MobileNumber'
import CommonNextButton from '@/core/component/common/CommonList/CommonNextButton/CommonNextButton'
import GenderButtons from '@/core/component/common/CommonList/GenderButtons/GenderButtons'
import OtpModal from '@/core/component/common/CommonList/OtpModal/OtpModal'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { AUTHUSER, BASE_URL, COMMON } from '@/utils/alljsonfile/service'
import { errorHandling, headers, leadId, removeNonAlphaNumeric } from '@/utils/util'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const PersonalForm = ({
  topRef,
  panCardError,
  userInformation,
  panValidation,
  setFormStepper,
  errorNameLast,
  emailValid,
  handleInputChange,
  handleNumberChange,
  setUserInformation,
  handleValidation,
  zeroNumberValidation,
  errMsg
}) => {
  const token = typeof window !== 'undefined' && localStorage?.getItem('token')

  const [checkAgree, setCheckAgree] = useState(true)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [resendOtp, setResendOtp] = useState(false)
  const [messageType, setMessageType] = useState('')
  const [tempOtp, setTempOtp] = useState('')
  const [otp, setOtp] = useState([])
  const [time, setTime] = useState(10)

  const router = useRouter()

  const disable =
    !userInformation?.pan_no ||
    !userInformation?.gender ||
    !userInformation?.email ||
    (!userInformation?.mobile_no && !userInformation?.mobile) ||
    !userInformation?.full_name ||
    !checkAgree ||
    !panCardError ||
    zeroNumberValidation ||
    !emailValid ||
    errMsg

  // ----------------------------- VERIFY OTP ------------------- //
  const verifyOtpCall = (e) => {
    if (e?.length === 4) {
      setShowLoader(true)
      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionId,
            otp: e,
            mobile_no: String(userInformation?.mobile) || '',
            type: messageType || localStorage.getItem('auth_type'),
            is_temp_otp: tempOtp
          },
          { headers: headers }
        )
        .then((response) => {
          setShowOtpModal(false)
          if (response?.data?.message == 'success') {
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', response?.data?.data?.access_token)
              localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
              localStorage.setItem('auth_Otp', e)
              localStorage.setItem('userData', JSON.stringify(response?.data?.data))
              if (!response?.data?.data?.is_first_time_user)
                setUserInformation({ ...userInformation, ...response?.data?.data })
            }
            toast.success(ApiMessage?.loginverify)
            setShowLoader(false)
            setTime(0)
            setFormStepper(1)
          }
        })
        .catch((error) => {
          errorHandling(error)
          setShowLoader(false)
        })
    }
  }
  // -------------------------------------INITIATE OTP API -------------------------- //
  const callInitiateOtp = () => {
    axios
      .post(
        BASE_URL + AUTHUSER?.initinatOtp,
        {
          mobile_no: String(userInformation?.mobile) || '',
          device_id: '',
          condition_accepted: true,
          whatsaap_consent: false
        },
        { headers: headers }
      )
      .then((response) => {
        setShowOtpModal(true)
        setTransactionId(response?.data?.transaction_id)
        setMessageType(response?.data?.type)
        setTempOtp(response?.data?.is_temp_otp)
        setResendOtp(false)
        setTime(60)
        setShowLoader(false)
        if (typeof window !== 'undefined') {
          localStorage.setItem('transaction_id', response?.data?.transaction_id)
          localStorage.setItem('auth_type', response?.data?.type)
        }
        toast.success(ApiMessage?.otpsentsuccessfully)
      })
      .catch((error) => {
        errorHandling(error)
        setShowLoader(false)
        setShowOtpModal(false)
      })
  }

  // ----------------- MOBILE PAN RELATION API -------------------- //
  const mobilRelationApi = async () => {
    let params = {
      pan_no: userInformation?.pan_no
    }
    if (userInformation?.mobile) params = { ...params, mobile_no: String(userInformation?.mobile) }
    if (userInformation?.mobile_no) params = { ...params, mobile_no: String(userInformation?.mobile_no) }
    await axios
      .post(BASE_URL + COMMON.panMobValidation, params)
      .then((res) => {
        if (res?.data?.code === 0) {
          if (!token) {
            setShowOtpModal(true)
            callInitiateOtp()
          } else setFormStepper(1)
        } else if (res?.data?.code === 1) {
          toast.error(res?.data?.data)
        }
      })
      .catch((err) => {
        errorHandling(err)
      })
  }

  const handleForm1 = () => {
    if (!disable) {
      mobilRelationApi()
    }
  }

  useEffect(() => {
    if (showOtpModal) {
      if (time === 0) {
        setResendOtp(true)
      }
      if (time > 0) {
        const timer = setTimeout(() => {
          setTime(time - 1)
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [time, showOtpModal])

  return (
    <div>
      {showLoader && <LoaderComponent />}
      {showOtpModal && (
        <OtpModal
          showOtpModal={showOtpModal}
          time={time}
          otp={otp}
          setOtp={setOtp}
          setOtpModal={setShowOtpModal}
          resendOtp={resendOtp}
          mobile={userInformation?.mobile}
          callInitiateOtp={callInitiateOtp}
          verifyOtpCall={verifyOtpCall}
        />
      )}
      <div ref={topRef} className=''>
        <div className=''>
          <GenderButtons userInfo={userInformation} handleChange={handleInputChange} />
        </div>
        <label className='text-[13px] font-normal text-[#212529] ' htmlFor='email'>
          PAN Card
        </label>
        <Input
          className={`shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight border-[#C2CACF] focus:outline-none focus:shadow-outline mt-1 ${'border-[#C2CACF]'} ${
            !panCardError ? 'border-red-500' : 'border-[#C2CACF] '
          }`}
          id='pan_no'
          name='pan_no'
          maxLength={10}
          type='text'
          value={userInformation?.pan_no}
          onChange={(e) => handleInputChange(e)}
          placeholder='Enter your PAN card number'
        />
        {!panCardError && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>}
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
            handleInputChange(e)
            handleValidation(e)
          }}
          value={userInformation?.full_name}
          onInput={(e) => {
            e.target.value = removeNonAlphaNumeric(e)
          }}
          // onFocus={() => ScrollToTop(nameRef, mobileView)}
          placeholder='Enter your name according to pan'
        />
        {errorNameLast && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
      </div>
      <div className='mt-[20px]'>
        <CommonEmailInput value={userInformation?.email} handleChange={handleInputChange} />
      </div>
      <div className='mt-[21px]'>
        <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
          Mobile as per Aadhaar
        </label>
        <div>
          <CommonNumberInput
            defaultValue={userInformation?.mobile_no || userInformation?.mobile}
            handleChangeNumber={handleNumberChange}
            handleChange={handleInputChange}
          />
          {zeroNumberValidation && (
            <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
          )}
          {errMsg && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberError}</p>}
        </div>
      </div>
      <div className='mt-[5px]'>
        <CheckAgree checkAgree={checkAgree} setCheckAgree={setCheckAgree} />
      </div>
      <CommonNextButton title='Next' handleSubmit={handleForm1} disable={disable} />
    </div>
  )
}

export default PersonalForm
