/* eslint-disable react-hooks/exhaustive-deps */
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import TwoStepFormIcons from '@/core/component/common/CommonList/TwoStepFormIcons/TwoStepFormIcons'
import React, { useEffect, useRef, useState } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import ApplyPersonalForm from './ApplyPersonalForm/ApplyPersonalForm'
import ApplyProfessionalForm from './ApplyProfessionalForm/ApplyProfessionalForm'
import { BASE_URL, LEADAPPAPI } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { emailRegex, errorHandling, getHash, mobileNumberRegex, panRegex } from '@/utils/util'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'

const PersonalLoanApplicationForm = ({ productDetailsData, url_slug }) => {
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const data = { ref: topRef || nameRef, isMobile: mobileView }

  const value = typeof window !== 'undefined' ? localStorage.getItem('userData') : null
  const localUserData = value ? JSON.parse(value) : null

  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const refererUrl = typeof window !== 'undefined' && localStorage?.getItem('url')
  const utm_details = refererUrl ? refererUrl?.split('?')?.[1] : null
  const token = typeof window !== 'undefined' && localStorage?.getItem('token')

  const h = getHash()
  const router = useRouter()

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const [formStepper, setFormStepper] = useState(0)
  const [userInformation, setUserInformation] = useState(localUserData ? localUserData : { occupation: 'Salaried' })
  const [panCardError, setPanCardError] = useState(true)
  const [panValidation, setPanValidation] = useState('')
  const [errorNameLast, setErrorNameLast] = useState(false)
  const [mobileNumber, setMobileNumber] = useState(null)
  const [errMsg, setErrorMsg] = useState(false)
  const [checkAgree, setCheckAgree] = useState(true)
  const [errorHrefName, setErrorHrefName] = useState(false)
  const [errHrefCompany, setErrHrefCompany] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [showLoader, setShowLoader] = useState(false)
  const [pinCodeError, setPinCodeError] = useState(false)
  const [emailValid, setEmailValid] = useState(true)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)

  const isSalaried = userInformation?.occupation === 'Salaried'
  const isSelfEmployed = userInformation?.occupation === 'Self-employed'

  const handleInputChange = (event) => {
    setErrorHrefName(false)
    if (event?.target?.name === 'company_name' || event?.target?.name === 'full_name') {
      const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
      if (hrefRegex.test(event.target.value)) {
        if (event?.target?.name === 'company_name') {
          setErrHrefCompany(true)
        } else if (event?.target?.name === 'full_name') {
          setErrorHrefName(true)
        }
      }
    }
    if (event?.target?.name === 'email') {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setEmailValid(false)
      else setEmailValid(true)
      setUserInformation({ ...userInformation, email: event?.target?.value })
    }
    if (event?.target?.name === 'pan_no') {
      const inputValue = event.target.value.toUpperCase()
      const isValidInput = panRegex.test(inputValue)
      setPanCardError(isValidInput)
      setUserInformation({ ...userInformation, pan_no: inputValue })
    } else {
      setUserInformation({ ...userInformation, [event?.target?.name]: event?.target?.value })
    }
  }

  const handleValidation = (e) => {
    const extractedName = userInformation?.lastname?.replace(/^[a-zA-Z]+$/, '')
    if (!extractedName) {
      setErrorNameLast(false)
    } else {
      setErrorNameLast(true)
    }
  }
  const handleNumberChange = (e) => {
    const inputValue = e.target.value
    const extractedNumber = inputValue.replace(/\D/g, '')
    const isAllZero = extractedNumber === '0000000000'
    if (extractedNumber?.length === 10) {
      setMobileNumber(extractedNumber)
      setErrorMsg(false)
      const isValid = mobileNumberRegex.test(inputValue)
      if (!isValid && !zeroNumberValidation && !isAllZero) setErrorMsg(true)
    } else if (extractedNumber?.length < 10) {
      setErrorMsg(true)
      setMobileNumber(extractedNumber)
    }
    if (extractedNumber == '0000000000') setZeroNumberValidation(true)
    else setZeroNumberValidation(false)
  }
  // ------------------------------ADD LEADS API CALL --------------------- //
  const callApplyNowApi = () => {
    setShowLoader(true)
    let params = {
      lead_profile_id: leadId,
      url_slug: url_slug, // M
      gender: userInformation?.gender, // M
      pan: userInformation?.pan_no, // M
      full_name: userInformation?.full_name, // M
      dob: userInformation?.dob, // M
      email: userInformation?.email, // M
      pin_code: userInformation?.pin_code, // M
      occupation: userInformation?.occupation?.toLowerCase(), // M
      terms: 'agree', // M
      company_name: userInformation?.company_name, // M
      request_id: '',
      lang_id: 1,
      referrer_url: refOutSide || '',
      category: 'Personal Loan'
    }
    if (userInformation?.mobile) params = { ...params, mobile_no: String(userInformation?.mobile) } // M
    if (userInformation?.mobile_no) params = { ...params, mobile_no: String(userInformation?.mobile_no) }
    if (isSalaried) params = { ...params, monthly_salary: userInformation?.monthly_salary } // M
    if (userInformation?.loan_amount) params = { ...params, loan_amount: userInformation?.loan_amount }
    if (isSelfEmployed) params = { ...params, itr_amount: userInformation?.itr_amount }
    if (refOutSide) params = { ...params, referrer_url: refOutSide }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (utm_details) params = { ...params, utm_details: utm_details }
    if (deviceId) params = { ...params, device_id: deviceId }
    if (h) params = { ...params, h: h }

    axios
      .post(BASE_URL + LEADAPPAPI.leadaddgloble, params, { headers: headersAuth })
      .then((response) => {
        setShowLoader(false)
        if (response?.data?.data?.url) {
          router.push(response?.data?.data?.url)
        }
        if (response?.data?.message === 'failed') {
          if (response?.data?.reason || response?.data?.data) {
            const message = response?.data?.reason || response?.data?.data
            toast.error(message)
            router.push(`/personal-loan/eligibility?eligible=${url_slug}`)
          }
        }
      })
      .catch((error) => {
        setShowLoader(false)
        errorHandling(error)
      })
  }

  const finalArray = localUserData?.eligible_product?.credit_cards
  const finalData = productDetailsData?.product_details?.url_slug.split('/').pop();
  const isEligible = finalArray?.includes(finalData);   

  return (
    <>
      <Toaster />
      {showLoader && <LoaderComponent />}
      <div className='h-auto bg-white rounded-3xl flex flex-col items-center justify-center  p-4 xl:px-[60px] xl:py-[40px]'>
        <h3 className='text-[24px] leading-[30px] max-sm:leading-[25px]  max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
          Apply Now
        </h3>
        <TwoStepFormIcons
          stepperData={{
            firstTtitle: 'Personal Info',
            secondTitle: 'Professional Info',
            modalStepper: formStepper
          }}
        />
        <div className='mt-[28px] grid grid-cols-1 w-full'>
          {formStepper === 0 && (
            <ApplyPersonalForm
              topRef={topRef}
              panCardError={panCardError}
              panValidation={panValidation}
              userInformation={userInformation}
              localUserData={localUserData}
              emailValid={emailValid}
              zeroNumberValidation={zeroNumberValidation}
              errMsg={errMsg}
              setFormStepper={setFormStepper}
              handleValidation={handleValidation}
              handleInputChange={handleInputChange}
              handleNumberChange={handleNumberChange}
              setUserInformation={setUserInformation}
              callApplyNowApi={callApplyNowApi}
            />
          )}
          {formStepper === 1 && (
            <ApplyProfessionalForm
              userInformation={userInformation}
              checkAgree={checkAgree}
              errorNameLast={errorNameLast}
              handleValidation={handleValidation}
              handleInputChange={handleInputChange}
              setDateOfBirth={setDateOfBirth}
              setUserInformation={setUserInformation}
              setShowLoader={setShowLoader}
              url_slug={url_slug}
              errorHrefName={errorHrefName}
              errHrefCompany={errHrefCompany}
              dateOfBirth={dateOfBirth}
              callApplyNowApi={callApplyNowApi}
              pinCodeError={pinCodeError}
              setPinCodeError={setPinCodeError}
              productDetailsData={productDetailsData}
              isEligible={isEligible}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PersonalLoanApplicationForm
