import SubmitFormBtn from '@/core/component/common/SubmitFormBtn'
import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { BASE_URL, CONTACTAUTH, USERSET } from '@/utils/alljsonfile/service'
import toast, { Toaster } from 'react-hot-toast'
import Thankyou from '../../../../../public/assets/thank-u.svg'
import Image from 'next/image'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import CommonEmailInput from '@/core/component/common/CommonList/CommonFieldComponent/EmailAdd'
import CommonNumberInput from '@/core/component/common/CommonList/CommonFieldComponent/MobileNumber'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage, removeNonAlphaNumeric } from '@/utils/util'
import Loader from '@/core/component/Leads/common/Loader'
import LoaderLogo from '../../../../../public/assets/logo-loader.gif'
import closeIcon from '../../../../../public/assets/closeIcon.svg'

function FormContent() {
  const [scrollY, setScrollY] = useState(0)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [thankModal, setThankModal] = useState(false)
  const [errMsg, setErrorMsg] = useState(false)
  const [mobile, SetMobile] = useState()
  const [responseData, setResponseData] = useState([])
  const [formData, setFormdata] = useState([])
  const [transactionid, setTransactionid] = useState([])
  const [otpdatacotact, setOtpdataContact] = useState([])
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [disbaled, setDisbaled] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)

  const [time, setTime] = useState(60)
  const [IstimeActive, setIsTimeActive] = useState(true)
  const [resendOtp, setResendOtp] = useState(false)
  const [errOtp, setErrorOtp] = useState(false)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [errorHref, setErrorHref] = useState(false)
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [errorHrefEmail, setErrorHrefEmail] = useState(false)

  const token = localStorage?.getItem('token')
  const leadId = localStorage.getItem('leadprofileid')

  const router = useRouter()

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

  const handleValidation = (e) => {
    const FirstNameCheck = formData?.full_name?.replace(/^[a-zA-Z a-zA-Z]+$/, '')
    if (!FirstNameCheck) {
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }
  }

  useEffect(() => {
    if (modalIsOpen || thankModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [modalIsOpen, thankModal])

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    const emailErr = event.target.value?.replace(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g, '')
    if (!emailErr) {
      setErrorEmail(false)
    } else {
      setErrorEmail(true)
    }
  }

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
        setFormdata({ ...formData, [event?.target?.name]: event.target.value })
      }
    } else {
      setFormdata({ ...formData, [event?.target?.name]: event.target.value })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('full_name', formData.full_name)
    bodyFormData.append('email', formData.email)
    bodyFormData.append('mobile', formData.mobile)
    bodyFormData.append('enquiry', formData.enquiry)
    bodyFormData.append('usertype', formData.usertype)
  }

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

  const handleChangeOtp = (e) => {
    const valueotp = e
    const extractedOtp = valueotp?.replace(/\D/g, '')
    setOtpdataContact(extractedOtp)

    if (extractedOtp?.length === 4) {
      ContactOtpVerify(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const ContactSendOtp = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post(
        BASE_URL + CONTACTAUTH?.contactsendotp,
        {
          mobile_no: formData?.mobile ? String(formData?.mobile) : String(mobile),
          condition_accepted: true,
          whatsaap_consent: false
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setResponseData(response?.data)
          setTransactionid(response?.data?.Recommended_Product?.transaction_id)
          toast.success(ApiMessage?.otpsentsuccessfully)
        }
        setIsOpen(true)
        setLoading(false)
        setIsTimeActive(true)
        setResendOtp(false)
        setTime(60)
        localStorage.removeItem('otpnumber')
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
          setLoading(false)
        } else if (error?.response?.status == 422) {
          toast.error(error?.message)
          setLoading(false)
        }
        setLoading(false)
      })
  }

  const ContactOtpVerify = (e) => {
    if (e.length === 4) {
      setLoadingOtp(true)

      axios
        .post(
          BASE_URL + CONTACTAUTH?.contactotpverify,
          {
            name: formData.full_name ? formData.full_name : '',
            email: formData.email ? formData.email : email,
            user_type: formData.usertype ? formData.usertype : '',
            message: formData?.enquiry ? formData?.enquiry : '',
            otp: e,
            transaction_id: transactionid,
            mobile_no: formData?.mobile ? formData?.mobile : mobile
          },
          { headers: headers }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            setResponseData(response?.data)
            setLoadingOtp(false)
            toast.success(ApiMessage?.verifyotp)
            setThankModal(true)
            setIsOpen(false)
            setFormdata({
              ...formData,
              email: '',
              name: '',
              phone: '',
              pancard: '',
              pincode: '',
              usertype: '',
              enquiry: ''
            })
            setIsTimeActive(false)
            setResendOtp(true)
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(ApiMessage?.validotpenter)
            setLoadingOtp(false)
          } else if (error?.response?.status === 403) {
            setLoadingOtp(false)
          }
          setLoadingOtp(false)
        })
    }
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
          setFormdata(response?.data?.data)
          const apiDob = response.data?.data?.dob
          setDate(new Date(apiDob))
          if (typeof window !== 'undefined') {
            localStorage.setItem('userData', JSON.stringify(response?.data?.data))
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status == 401) {
          router.push('/login')
          handleRemoveLocalstorage()
        } else if (error?.response?.status == 403) {
        }
      })
  }

  // const getUserData = JSON.parse(localStorage.getItem('get_user_data'));

  useEffect(() => {
    if (token) {
      GetUserSetUp()
      // setFormdata(getUserData)
    }
  }, [])

  useEffect(() => {
    if (
      formData.full_name &&
      formData.usertype &&
      formData.email &&
      formData.mobile &&
      formData.enquiry &&
      formData.length !== 0
    ) {
      setDisbaled(true)
    } else {
      setDisbaled(false)
    }
  }, [formData])

  const handleNumberEdit = () => {
    setIsOpen(false)
    setOtpdataContact([])
    setLoading(false)
    setLoadingOtp(false)
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

      <div className='bg-[#F4F8FB] text-[#212529] h-full write-form-sec'>
        <div className='container mx-auto max-[991px]:max-w-full 2xl:px-40 xl:py-30 xl:px-24 lg:px-20 md:px-16 sm:px-8'>
          <div
            className={` bg-[#fff] max-[479px]:gap-4 text-[#212529] relative bottom-20 max-sm:bottom-[20rem] h-auto items-center rounded-xl  max-[771px]:px-8 px-20 py-8 max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[479px]:py-6 max-[375px]:px-4 max-[479px]:mx-4 max-[320px]:px-4 z-[1] ${
              scrollY > 0 ? 'contact-banner-top' : 'contact-banner-bottom'
            }`}>
            <p className='head-text font-[faktum] story-text text-[#212529] pb-2 text-[24px] max-[320px]:text-[20px] mb-4 relative text-center'>
              Write us what you think!
            </p>

            <form method='post' id='enquiryForm' onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-0'>
                <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : 'mb-4'}>
                  <label className='text-[13px] font-normal text-[#212529]'>Full Name</label>
                  <input
                    type='text'
                    placeholder='Enter your full name'
                    name='full_name'
                    id='full_name'
                    pattern='[A-Za-z]+'
                    className='conformname !mb-0'
                    alt='img'
                    disabled={formData?.full_name?.length > 26 && token ? true : false}
                    required
                    value={formData.full_name}
                    onChange={(e) => {
                      handleChange(e)
                      handleValidation(e)
                    }}
                    onInput={(e) => {
                      e.target.value = removeNonAlphaNumeric(e)
                    }}
                  />
                  {errorHrefName && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}

                  {errorMessage && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.letterNameErr}</p>}
                </div>

                <CommonEmailInput
                  className='conformname !mb-0'
                  alt='img'
                  value={formData.email}
                  disabled={formData.email && token ? true : false}
                  handleChange={handleChange}
                  errorHrefEmail={errorHrefEmail}
                />
              </div>

              <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-sm:gap-0'>
                <div className='mb-[6%] max-[576px]:mb-4'>
                  <label className='text-[13px] font-normal text-[#212529]'>Mobile Number</label>
                  <div className={errMsg || zeroNumberValidation ? ' border-[#FF000F]  ' : ''}>
                    <CommonNumberInput
                      disabled={formData?.mobile && token ? true : false}
                      defaultValue={formData?.mobile ? formData?.mobile : mobile}
                      className='conformname !mb-2'
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
                  <label className='text-[13px] font-normal text-[#212529]'>Select User Type</label>
                  <select
                    name='usertype'
                    id='usertype'
                    value={formData?.usertype}
                    className='conformname focus:outline-none'
                    onChange={(e) => handleChange(e)}>
                    <option value='select' defaultValue='select' className='form-select '>
                      Select
                    </option>
                    <option value='admin' name='admin' onChange={(e) => handleChange(e)}>
                      admin
                    </option>
                    <option value='guest' name='guest' onChange={(e) => handleChange(e)}>
                      guest
                    </option>
                    <option value='owner' name='owner' onChange={(e) => handleChange(e)}>
                      owner
                    </option>
                    <option value='student' name='student' onChange={(e) => handleChange(e)}>
                      student
                    </option>
                  </select>
                </div>
              </div>
              <div className='mb-[4%]'>
                <label className='text-[13px] font-normal text-[#212529]'>Message</label>
                <textarea
                  className='conformtext'
                  name='enquiry'
                  id='enquiry'
                  required
                  placeholder='Your message here'
                  value={formData?.enquiry}
                  onChange={(e) => handleChange(e)}></textarea>
                {errorHref && <p className='text-[12px] text-[#FF000F] font-no  mt-2'>{ApiMessage?.linkError}</p>}
              </div>
              <div className='text-center'>
               
                <SubmitFormBtn
                  name={!isLoading ? 'Send OTP' : <Loader />}
                  disabled={!disbaled || isLoading}
                  onClick={ContactSendOtp}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-0 transition-opacity'></div>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg p-8 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <button
                    className='flex absolute cursor-pointer right-[5%] top-[3%]  px-2 py-1 z-[1] w-[26px]'
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
                        +91 {formData?.mobile ? formData?.mobile : mobile}
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
                        value={otpdatacotact}
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
                  <div className='text-center pt-4 cursor-pointer'>
                    {resendOtp ? (
                      <SubmitFormBtn
                        name={!isLoading ? 'Resend OTP' : <Loader />}
                        onClick={ContactSendOtp}
                        disabled={isLoading}
                      />
                    ) : (
                      <SubmitFormBtn
                        name={!isLoadingOtp ? 'Submit' : <Loader />}
                        disabled={otpdatacotact?.length < 4 || isLoadingOtp}
                        onClick={ContactOtpVerify}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {thankModal && (
        <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 '>
                      <Image src={Thankyou} width={100} height={100} className='m-auto' alt='image' />
                      <h3 className='text-2xl max-[479px]:text-[18px] text-center py-2 font-semibold text-[#212529]'>
                        Thank you!
                      </h3>
                      <p className='text-[15px] max-[479px]:text-[13px] text-[#000000] max-[479px]:px-[50px]'>
                        We&apos;ve submitted your request.Our customer relationship manager will contact you soon!
                      </p>
                    </div>
                  </div>
                </div>
                <div className='text-center p-10 max-[479px]:pt-5'>
                  <SubmitFormBtn
                    name={'Okay'}
                    onClick={() => {
                      setLoading(false)
                      setLoadingOtp(false)
                      setThankModal(false)
                      GetUserSetUp()
                      setOtpdataContact([])
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormContent
