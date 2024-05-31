/* eslint-disable react-hooks/exhaustive-deps */
import TwoStepFormIcons from '@/core/component/common/CommonList/TwoStepFormIcons/TwoStepFormIcons'
import ProfessionalFormSection from '@/core/component/Layout/PersonalLoan/PersonalLoanEligibility/ProfessionalFormSection/ProfessionalFormSection'
import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useEffect, useRef, useState } from 'react'
import PersonalForm from './PersonalForm/PersonalForm'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import { emailRegex, mobileNumberRegex } from '@/utils/util'
import axios from 'axios'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import toast from 'react-hot-toast'

const LoanEligibilityForm = ({ formStepper, setFormStepper }) => {
  const size = useWindowSize()
  const mobileView = size?.width <= 576
  const topRef = useRef(null)
  const nameRef = useRef(null)
  const data = { ref: topRef || nameRef, isMobile: mobileView }

  const value = typeof window !== 'undefined' ? localStorage.getItem('userData') : null
  const localUserData = value ? JSON.parse(value) : null

  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')

  const [userInformation, setUserInformation] = useState(localUserData ? localUserData : { occupation: 'Salaried' })
  const [panCardError, setPanCardError] = useState(true)
  const [panValidation, setPanValidation] = useState('')
  const [errorNameLast, setErrorNameLast] = useState(false)
  const [mobileNumber, setMobileNumber] = useState(null)
  const [errMsg, setErrorMsg] = useState(false)
  const [checkAgree, setCheckAgree] = useState(true)
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [showLoader, setShowLoader] = useState(false)
  const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
  const [emailValid, setEmailValid] = useState(true)

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const handleInputChange = (event) => {
    if (event?.target?.name === 'email') {
      const isValidEmail = emailRegex.test(event.target.value)
      if (!isValidEmail) setEmailValid(false)
      else setEmailValid(true)
      setUserInformation({ ...userInformation, email: event?.target?.value })
    }
    if (event?.target?.name === 'pan_no') {
      const inputValue = event.target.value.toUpperCase()
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/
      const isValidInput = panPattern.test(inputValue)
      setPanCardError(isValidInput)
      setUserInformation({ ...userInformation, pan_no: inputValue })
    } else setUserInformation({ ...userInformation, [event?.target?.name]: event?.target?.value })
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
    if (isAllZero) setZeroNumberValidation(true)
    else setZeroNumberValidation(false)
  }

  const getUserProfile = () => {
    if (leadId) {
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
            }
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message == 'failed') {
            toast.error(error?.response?.data?.reason)
          }
        })
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <>
      {showLoader && <LoaderComponent />}
      <div className='h-auto bg-white rounded-3xl flex flex-col items-center justify-center  p-4 xl:px-[60px] xl:py-[40px]'>
        <h3 className='text-[24px] leading-[30px] max-sm:leading-[25px]  max-[834px]:text-[20px] text-center font-medium max-[479px]:text-[18px] py-2 text-[#212529]'>
          Best Personal Loan in a few clicks
        </h3>
        {/* <TwoStepFormIcons
          stepperData={{
            firstTtitle: 'Personal Info',
            secondTitle: 'Professional Info',
            modalStepper: formStepper
          }}
        /> */}
        <div className='mt-[28px] grid grid-cols-1 w-full'>
          {formStepper === 0 && (
            <PersonalForm
              topRef={topRef}
              panCardError={panCardError}
              panValidation={panValidation}
              userInformation={userInformation}
              setFormStepper={setFormStepper}
              errorNameLast={errorNameLast}
              zeroNumberValidation={zeroNumberValidation}
              errMsg={errMsg}
              emailValid={emailValid}
              handleValidation={handleValidation}
              handleInputChange={handleInputChange}
              handleNumberChange={handleNumberChange}
              setUserInformation={setUserInformation}
            />
          )}
          {formStepper === 1 && (
            <ProfessionalFormSection
              userInformation={userInformation}
              checkAgree={checkAgree}
              handleInputChange={handleInputChange}
              setDateOfBirth={setDateOfBirth}
              setUserInformation={setUserInformation}
              setShowLoader={setShowLoader}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default LoanEligibilityForm
