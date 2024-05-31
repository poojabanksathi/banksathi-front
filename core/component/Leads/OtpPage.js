import React, { useState } from 'react'
import Image from 'next/image'
import otpImage from '../../../public/assets/otp.svg'
import leadStyle from './css/leadStyle.module.css'
import dynamic from 'next/dynamic'
import OTPInput from 'react-otp-input'
import axios from 'axios'
import { AUTHUSER, BASE_URL, BASE_URL_TRYACT, LEADAPPAPI } from '@/utils/alljsonfile/service'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import Link from 'next/link'
import Loader from './common/Loader'
import LoaderLogo from '../../../public/assets/logo-loader.gif'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getHash } from '@/utils/util'
import Cookies from 'js-cookie'


const LeadStepperButton = dynamic(() => import('@/core/component/Leads/LeadStepperButton'), {
  ssr: false
})

export default function Otp(props) {
  const [otpdata, setOtpdata] = useState([])
  const [errOtp, setErrorOtp] = useState(false)
  const [isLoadingOtp, setLoadingOtp] = useState(false)
  const [transactionids, setTransactionId] = useState([])
  const [resendingOtp, setResendingOtp] = useState(false)
  const LeadMobile = localStorage.getItem('LeadMobile')
  const transactionid = localStorage.getItem('transaction_id')
  const messagetype = localStorage.getItem('auth_type')
  const istempotpData = localStorage.getItem('istempotp')
  const [dataOtp, setdataOtp] = useState([])
  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')
  const referer = props.referer
  const leadsField = props.leadsField
  const [fieldValue, setFieldValue] = useState()

  
  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
    
      const utm_details = refererUrl?.split('?')?.[1]

     
      setFieldValue(utm_details)
    }
  }, [])
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const LeadeVerifyOtp = (e) => {
    if (e.length == 4) {
      setLoadingOtp(true)
      axios
        .post(
          BASE_URL + AUTHUSER?.verifyUser,
          {
            transaction_id: transactionid,
            otp: e,
            mobile_no: LeadMobile,
            type: messagetype,
            is_temp_otp: istempotpData
          },
          { headers: headers }
        )
        .then((response) => {
          if (response?.data?.message == 'success') {
            setLoadingOtp(false)
            // props.data.page.handlePage('leads')
            // props.data.otp.handleOtpCheck(false)
            localStorage.setItem('token', response?.data?.data?.access_token)
            // LeadeAddGloble(response?.data?.data?.access_token)
            localStorage.setItem('leadprofileid', response?.data?.data?.lead_profile_id)
            localStorage.setItem('auth_Otp', e)
            localStorage.setItem('is_verify_lead', true)
            const userDataVerify = response?.data?.data
            setdataOtp(userDataVerify)
            toast.success(ApiMessage?.loginverify)
            if (response?.data?.data?.is_first_time_user === true) {
              router.push('/user/setprofile')
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

  const handleChangeOtp = (e) => {
    // setOtpdata(e)
    const valueotp = e
    const extractedOtp = valueotp.replace(/\D/g, '')
    setOtpdata(extractedOtp)
    if (extractedOtp?.length === 4) {
      LeadeVerifyOtp(valueotp)
      setErrorOtp(false)
    } else {
      setErrorOtp(true)
    }
  }
  const router = useRouter()
  const leadUrlSlug = router?.query['product-slug']
  const handleResendOtp = (e) => {
    e?.preventDefault()
    const requestData = {
      mobile_no: LeadMobile,
      type: messagetype,
      condition_accepted: true,
      device_id: ''
    }
    setResendingOtp(true)
    axios
      .post(BASE_URL + AUTHUSER?.initinatOtp, requestData, { headers: headers })
      .then((response) => {
        localStorage.setItem('transaction_id', response?.data?.transaction_id)
        setResendingOtp(false)
        toast.success('OTP has been resend successfully.')
      })
      .catch((error) => {
        setResendingOtp(false)
        toast.error('Failed to resend OTP. Please try again later.')
      })
  }
  const h = getHash()
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const LeadeAddGloble = (datas) => {
    let params = {
      lead_profile_id: leadId,
      url_slug: leadUrlSlug,
      gender: dataOtp?.gender ? dataOtp?.gender : props?.data?.formFields?.fieldData?.gender?.value,
      pan: dataOtp?.pan_no ? dataOtp?.pan_no : props?.data?.formFields?.fieldData?.pan_no?.value,
      full_name: dataOtp?.full_name ? dataOtp?.full_name : props?.data?.formFields?.fieldData?.full_name?.value,
      mobile_no: dataOtp?.mobile ? String(dataOtp?.mobile) : String(props?.data?.formFields?.fieldData?.mobile?.value),
      dob: dataOtp?.dob ? dataOtp?.dob : props?.data?.formFields?.fieldData?.date_of_birth?.value,
      email: dataOtp?.email ? dataOtp?.email : props?.data?.formFields?.fieldData?.email?.value,
      pin_code: dataOtp?.pin_code ? dataOtp?.pin_code : props?.data?.formFields?.fieldData?.pin_code?.value,
      occupation: dataOtp?.occupation?.toLowerCase()
        ? dataOtp?.occupation?.toLowerCase()
        : props?.data?.formFields?.fieldData?.occupation?.value?.toLowerCase(),
      company_name: dataOtp?.company_name
        ? dataOtp?.company_name
        : props?.data?.formFields?.fieldData?.company_name?.value,
      terms: props?.data?.formFields?.fieldData?.consent?.value ? 'agree' : 'not agree',
      device_id: '',
      request_id: '',
      monthly_salary: props?.data?.formFields?.fieldData?.monthly_salary?.value
        ? props?.data?.formFields?.fieldData?.monthly_salary?.value
        : dataOtp?.monthly_salary,
      lang_id: 1,
      itr_amount: props?.data?.formFields?.fieldData?.itr_amount?.value
        ? props?.data?.formFields?.fieldData?.itr_amount?.value
        : dataOtp?.itr_amount,
        referrer_url: refOutSide || ""
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
    if (h) {
      params = { ...params, h: h }
    }
    axios
      .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response?.data?.data?.url) {
          router.push(response?.data?.data?.url)
        }
        if (response?.data?.message == 'success') {
          if (token) {
            setFirstSuccess(true)
            props.data.page.handlePage('leads')
            props.data.otp.handleOtpCheck(false)
          }
        } else {
          toast.error(response?.data?.data)
        }
      })

      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.reason)
        } else if (error?.response?.status === 422) {
          toast.error(error?.response?.data?.detail[0]?.msg)
          if (error?.response?.data?.message?.fullName) {
            toast.error(error?.response?.data?.message?.fullName[0])
          }
          if (error?.response?.data?.message?.panNo) {
            toast.error(error?.response?.data?.message?.panNo[0])
          }
        } else if (error?.response?.status == 500) {
          toast.error(ApiMessage?.internalServerError)
        }
        setLoadingOtp(false)
      })
  }

  useEffect(() => {
    if (token) {
      LeadeAddGloble()
    }
  }, [token])

  return (
    <>
      <Toaster />
      {isLoadingOtp || isLoadingOtp ? (
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
      <div className=' w-full '>
        <div className='w-4/5 max-[320px]:w-full  mx-auto'>
          <div className='max-[576px]:text-center'>
            <h1 className='font-[faktum] 2xl:text-[30px] text-[26px] mb-2 2xl:mt-32 md:mt-20 mt-6 '>Enter OTP</h1>
            <p className=' 2xl:text-[16px] text-[14px]  font-[400]'>
              A 4-digit code has been sent to your number +91 {LeadMobile}
            </p>
            <div className='flex mt-8 max-[576px]:justify-center'>
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
            {/* <div className='text-center'>
              <p className='mb-8 2xl:text-[16px] mt-12 text-[14px] text-left max-[576px]:text-center'>
                Haven’t received the verification code ?{' '}
              </p>
              <Link href='' className='font-[faktum] mb-10 text-[15px]'>
                Resend OTP{' '}
              </Link>
            </div> */}

            <div className='text-center'>
              <p className='mb-8 2xl:text-[16px] mt-12 text-[14px] text-left max-[576px]:text-center'>
                Haven’t received the verification code?
              </p>
              <button
                onClick={handleResendOtp}
                className={`font-[faktum] text-blue-500 text-[15px]  ${resendingOtp ? 'cursor-not-allowed' : ''}`}
                disabled={resendingOtp}>
                Resend OTP
              </button>
            </div>
          </div>

          <div className='text-center'>
            <LeadStepperButton
              label={!isLoadingOtp ? 'Verify Otp' : <Loader />}
              disabled={otpdata.length < 4 || isLoadingOtp}
              type='next'
              onClick={(e) => {
                LeadeVerifyOtp(e)
              }}
              leadsField={leadsField}
              referer={referer}
            />
          </div>
        </div>
      </div>
    </>
  )
}
