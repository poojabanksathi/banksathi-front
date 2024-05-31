import Input from '@/core/component/Leads/InputComponent/Input'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import CheckAgree from '@/core/component/common/CommonList/CheckAgree/CheckAgree'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '@/core/component/common/CommonList/CommonFieldComponent/MobileNumber'
import CommonNextButton from '@/core/component/common/CommonList/CommonNextButton/CommonNextButton'
import GenderButtons from '@/core/component/common/CommonList/GenderButtons/GenderButtons'
import OtpModal from '@/core/component/common/CommonList/OtpModal/OtpModal'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { loanAmountsOptions } from '@/utils/alljsonfile/personal-loan'
import { AUTHUSER, BASE_URL, COMMON } from '@/utils/alljsonfile/service'
import { errorHandling, headers } from '@/utils/util'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ApplyPersonalForm = ({
  topRef,
  panCardError,
  userInformation,
  setFormStepper,
  handleInputChange,
  handleNumberChange,
  setUserInformation,
  callApplyNowApi,
  localUserData,
  emailValid,
  zeroNumberValidation,
  errMsg
}) => {
  const [checkAgree, setCheckAgree] = useState(true)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [resendOtp, setResendOtp] = useState(false)
  const [messageType, setMessageType] = useState('')
  const [tempOtp, setTempOtp] = useState('')
  const [otp, setOtp] = useState([])
  const [time, setTime] = useState(60)
  const [openSortBy, setOpenSortBy] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('Select')

  const isSalaried = userInformation?.occupation === 'Salaried'
  const incomeValue = isSalaried ? userInformation?.monthly_salary : userInformation?.itr_amount
  const token = typeof window !== 'undefined' && localStorage?.getItem('token')

  const disable =
    !userInformation?.pan_no ||
    !userInformation?.email ||
    (!userInformation?.mobile_no && !userInformation?.mobile) ||
    !userInformation?.loan_amount ||
    !checkAgree ||
    !userInformation?.gender ||
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

  const checkSecondStepperFields = () => {
    if (
      !userInformation?.occupation ||
      !incomeValue ||
      !userInformation?.dob ||
      !userInformation?.pin_code ||
      !userInformation?.company_name ||
      !userInformation?.full_name
    )
      return false
    else return true
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
          } else {
            const secondStepperFields = checkSecondStepperFields()
            if (secondStepperFields) callApplyNowApi()
            else setFormStepper(1)
          }
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
  const getLoanValue = (val) => {
    const split = val?.split(' ')
    const reqLength = Number(split?.length - 2)
    let value = split?.[reqLength] + '00000'
    if (value === '10+00000') {
      value = value?.split('+')?.[0] + '000001'
    }
    return value
  }
  const handleLoanAmountClick = (name, valueMatch) => {
    setSelectedAmount(name)
    setOpenSortBy(false)
    const value = getLoanValue(name)
    setUserInformation({ ...userInformation, loan_amount: value })
    if (typeof window !== 'undefined') {
      localStorage.setItem('loanAmount', valueMatch)
    }
  }

  const isPanDisabled = () => {
    if (localUserData?.pan_no) return true
    else return false
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

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('loanAmount')) {
      const amount = localStorage.getItem('loanAmount')
      const filter = loanAmountsOptions?.filter((item) => item?.valueToMatch === amount)
      if (filter) {
        setSelectedAmount(filter?.[0]?.name)
        setUserInformation({ ...userInformation, loan_amount: filter?.[0]?.valueToMatch })
      }
    }
  }, [])

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
        <GenderButtons userInfo={userInformation} handleChange={handleInputChange} />
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
          disabled={isPanDisabled()}
        />
        {!panCardError && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.pancardValidError}</p>}
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
        <div className='mt-[21px]'>
          <label className='text-[13px] font-normal text-[#212529]  max-[768px]:text-[12px]' htmlFor='name'>
            Required Loan Amount
          </label>
          <div className='flex flex-col items-center justify-center md:gap-0 relative'>
            <div
              className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              onClick={() => setOpenSortBy(!openSortBy)}>
              <div className='flex items-center justify-between'>
                <div>{selectedAmount}</div>
                <Image
                  src='/assets/accordion-down.svg'
                  alt='arrow'
                  width={17}
                  height={17}
                  className={openSortBy ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
                />
              </div>
            </div>
            {openSortBy && (
              <div className='w-full auto shadow-md rounded-md absolute top-[3.5rem] bg-white z-[999]'>
                <div className='flex flex-col items-start justify-center gap-y-[10px] px-4 my-4'>
                  {loanAmountsOptions?.map((item) => {
                    return (
                      <p
                        className='cursor-pointer text-[#212529] hover:text-[#844FCF]'
                        key={item?.id}
                        onClick={() => handleLoanAmountClick(item?.name, item?.valueToMatch)}>
                        {item?.name}
                      </p>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mt-[5px]'>
        <CheckAgree checkAgree={checkAgree} setCheckAgree={setCheckAgree} />
      </div>
      <CommonNextButton title='Next' handleSubmit={handleForm1} disable={disable} />
    </div>
  )
}

export default ApplyPersonalForm
