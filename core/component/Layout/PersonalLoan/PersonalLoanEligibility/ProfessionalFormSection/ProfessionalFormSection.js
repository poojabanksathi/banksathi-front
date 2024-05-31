/* eslint-disable react-hooks/exhaustive-deps */
import { incomeOptions, loanAmountsOptions } from '@/utils/alljsonfile/personal-loan'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CommonPicodeInput from '../../../../common/CommonList/CommonFieldComponent/Pincode'
import axios from 'axios'
import { BASE_URL, COMMON, ELIGIBILITY } from '@/utils/alljsonfile/service'
import { errorHandling, headers } from '@/utils/util'
import CommonNextButton from '../../../../common/CommonList/CommonNextButton/CommonNextButton'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const ProfessionalFormSection = ({
  checkAgree,
  setDateOfBirth,
  handleInputChange,
  userInformation,
  setUserInformation,
  setShowLoader
}) => {
  const isSalaried = userInformation?.occupation === 'Salaried'
  const isSelfEmployed = userInformation?.occupation === 'Self-employed'
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')

  const refOutSide = typeof window !== 'undefined' && sessionStorage?.getItem('refererOutside')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const token = typeof window !== 'undefined' && localStorage?.getItem('token')

  const leadIPData = leadsParams && JSON?.parse(leadsParams)

  const refererUrl = localStorage?.getItem('url')
  const utm_details = refererUrl?.split('?')?.[1]

  const [openSortBy, setOpenSortBy] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('Select')
  const [selectedItr, setSelectedItr] = useState('Select')
  const [selectedIncome, setSelectedIncome] = useState('Select')
  const [openIncomeOptions, setOpenIncomeOptions] = useState(false)
  const [openItrOptions, setOpenItrOptions] = useState(false)
  const [pinCode, setPinCode] = useState([])
  const [visible, setVisible] = useState(false)
  const [pinCodeError, setPinCodeError] = useState(false)

  const router = useRouter()

  const incomeValue = isSalaried ? userInformation?.monthly_salary : userInformation?.itr_amount
  const disable =
    !userInformation?.loan_amount ||
    !userInformation?.occupation ||
    !incomeValue ||
    !userInformation?.dob ||
    !userInformation?.pin_code ||
    pinCodeError

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const getLoanValueToSend = (val) => {
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
    const value = getLoanValueToSend(name)
    setUserInformation({ ...userInformation, loan_amount: value })
    if (typeof window !== 'undefined') {
      localStorage.setItem('loanAmountEligibility', valueMatch)
    }
  }

  const handleIncomeClick = (income, type) => {
    const split = income?.split(' ')
    const length = split?.length
    let value = split?.[length - 1]?.replace('K', '000')
    if (value === '100000+') {
      value = value?.split('+')?.[0] + 1
    }
    if (type === 'itr') {
      setSelectedItr(income)
      setUserInformation({ ...userInformation, itr_amount: value })
      setOpenItrOptions(false)
    } else {
      setSelectedIncome(income)
      setUserInformation({ ...userInformation, monthly_salary: value })
      setOpenIncomeOptions(false)
    }
  }

  const handlePincodeChange = () => setVisible(true)

  const getData = async () => {
    const url = BASE_URL + COMMON.pinCodeVerify
    await axios
      .post(
        url,
        {
          pin_code: userInformation?.pin_code
        },
        { headers: headers }
      )
      .then((response) => {
        if (response?.data?.data?.pincode_data?.pincodes?.length <= 0) {
          setPinCode([])
          setVisible(false)
          setPinCodeError(true)
        } else {
          setPinCodeError(false)
          setPinCode(response.data.data.pincode_data?.pincodes)
        }
      })
      .catch((error) => {
        console.error(error)
        setPinCode([])
      })
  }
  // ------------------------------ELIGIBILITY API CALL --------------------- //
  const callEligibilityApi = () => {
    setShowLoader(true)
    let params = {
      pan_no: userInformation?.pan_no,
      full_name: userInformation?.full_name,
      pin_code: userInformation?.pin_code || '',
      email: userInformation?.email,
      occupation: userInformation?.occupation?.toLowerCase(),
      dob: userInformation?.dob,
      terms: checkAgree ? 'agree' : 'not agree',
      device_id: deviceId,
      request_id: '',
      url_slug: router?.query?.eligible ? router?.query?.eligible : null,
      lang_id: 1,
      lead_profile_id: leadId || null,
      category: 'Personal Loan'
    }
    if (userInformation?.mobile) params = { ...params, mobile_no: String(userInformation?.mobile) }
    if (userInformation?.mobile_no) params = { ...params, mobile_no: String(userInformation?.mobile_no) }
    if (isSalaried) params = { ...params, monthly_salary: userInformation?.monthly_salary }
    if (userInformation?.loan_amount) params = { ...params, loan_amount: userInformation?.loan_amount }
    if (isSelfEmployed) params = { ...params, itr_amount: userInformation?.itr_amount }
    if (refOutSide) params = { ...params, referrer_url: refOutSide }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (utm_details) params = { ...params, utm_details: utm_details }
    axios
      .post(BASE_URL + ELIGIBILITY?.eligibilityRegister, params, { headers: headersAuth })
      .then((response) => {
        setShowLoader(false)
        if (response?.data?.message === 'success') {
          const alternateProducts = response?.data?.data?.alternate_product
            ? JSON.stringify(response?.data?.data?.alternate_product)
            : ''
          if (typeof window !== 'undefined') {
            localStorage.setItem('loan-alternate-products', alternateProducts)
            localStorage.setItem('loan-eligible-product', JSON.stringify(response?.data?.data?.eligible_product))
            localStorage.setItem('loan-input-slug', response?.data?.data?.input_slug)
          }
          router.push('/personal-loan/eligibility/result')
        }
        if (response?.data?.message === 'failed') {
          setShowLoader(false)
          toast.error(response?.data?.data)
        }
        setShowLoader(false)
      })
      .catch((error) => {
        errorHandling(error)
        setShowLoader(false)
      })
  }

  useEffect(() => {
    if (userInformation?.pin_code?.length === 6) {
      getData()
    }
  }, [userInformation?.pin_code?.length])

  useEffect(() => {
    if (incomeValue && incomeValue !== '0') {
      incomeOptions?.forEach((item) => {
        if (isSalaried) {
          if (item?.valueToMatch === userInformation?.monthly_salary) setSelectedIncome(item?.name)
        } else {
          if (userInformation?.itr_amount && userInformation?.itr_amount !== '0') {
            if (item?.valueToMatch === userInformation?.itr_amount) setSelectedItr(item?.name)
            else setSelectedAmount('Select')
          }
        }
      })
    }
    if (typeof window !== 'undefined' && localStorage.getItem('loanAmountEligibility')) {
      const amount = localStorage.getItem('loanAmountEligibility')
      const filter = loanAmountsOptions?.filter((item) => item?.valueToMatch === amount)
      if (filter) {
        setSelectedAmount(filter?.[0]?.name)
        const value = getLoanValueToSend(filter?.[0]?.name)
        setUserInformation({ ...userInformation, loan_amount: value })
      }
    }
    if (userInformation?.loan_amount && userInformation?.loan_amount !== '0') {
      loanAmountsOptions?.forEach((item) => {
        if (item?.valueToMatch === userInformation?.loan_amount) setSelectedAmount(item?.name)
      })
    }
  }, [])

  return (
    <>
      <div className=''>
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
      <div className='mt-[21px]'>
        <p className='text-[13px] font-normal text-[#212529]'>Empoyment Type</p>
        <div className='flex pt-[10px] gap-4 max-[576px]:gap-2'>
          <div>
            <label
              htmlFor='gender'
              className={`form-redio flex gap-2 items-center ${isSalaried ? 'text-[#212529]' : 'text-[#808080]'}`}>
              <input
                type='radio'
                id='occupation'
                checked={isSalaried}
                name='occupation'
                value='Salaried'
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
              Salaried
            </label>
          </div>
          <div>
            <label
              htmlFor='occupation'
              className={`form-redio flex gap-2 items-center  ${isSelfEmployed ? 'text-[#212529]' : 'text-[#808080]'}`}>
              <input
                type='radio'
                name='occupation'
                value='Self-employed'
                checked={isSelfEmployed}
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
              Self-Employed
            </label>
          </div>
        </div>
      </div>
      <div className='mt-[20px]'>
        <div className='grid grid-cols-1 gap-4 max-[1200px]:!grid-cols-1 max-[1024px]:grid-cols-1 '>
          {isSalaried && (
            <div className=''>
              <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                Total Monthly Income
              </label>
              <div className='flex flex-col items-center justify-center md:gap-0 relative'>
                <div
                  className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
                  onClick={() => setOpenIncomeOptions(!openIncomeOptions)}>
                  <div className='flex items-center justify-between'>
                    <div>{selectedIncome}</div>
                    <Image
                      src='/assets/accordion-down.svg'
                      alt='arrow'
                      width={17}
                      height={17}
                      className={openIncomeOptions ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
                    />
                  </div>
                </div>
                {openIncomeOptions && (
                  <div className='w-full auto shadow-md rounded-md absolute top-[3.5rem] bg-white z-[999]'>
                    <div className='flex flex-col items-start justify-center gap-y-[10px] px-4 my-4'>
                      {incomeOptions?.map((item) => {
                        return (
                          <p
                            className='cursor-pointer text-[#212529] hover:text-[#844FCF]'
                            key={item?.id}
                            onClick={() => handleIncomeClick(item?.name, 'income')}>
                            {item?.name}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {isSelfEmployed && (
            <div className=''>
              <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                ITR (amount)
              </label>
              <div className='flex flex-col items-center justify-center md:gap-0 relative'>
                <div className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'>
                  <div className='flex items-center justify-between' onClick={() => setOpenItrOptions(!openItrOptions)}>
                    <div>{selectedItr}</div>
                    <Image
                      src='/assets/accordion-down.svg'
                      alt='arrow'
                      width={17}
                      height={17}
                      className={openItrOptions ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
                    />
                  </div>
                </div>
                {openItrOptions && (
                  <div className='w-full auto shadow-md rounded-md absolute top-[3.5rem] bg-white z-[999]'>
                    <div className='flex flex-col items-start justify-center gap-y-[10px] px-4 my-4'>
                      {incomeOptions?.map((item) => {
                        return (
                          <p
                            className='cursor-pointer text-[#212529] hover:text-[#844FCF]'
                            key={item?.id}
                            onClick={() => handleIncomeClick(item?.name, 'itr')}>
                            {item?.name}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-x-[20px]'>
        <div className='datepicker mt-[20px]'>
          <label className='text-[13px] font-normal text-[#212529] ' htmlFor='birthDate'>
            Date of Birth
          </label>
          <div className='datepicker'>
            <input
              type='date'
              showYearDropdown
              dropdownMode='select'
              dateFormat='dd-MM-yyyy'
              name='dob'
              id='dob'
              className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
              onChange={(e) => {
                setDateOfBirth(e)
                handleInputChange(e)
              }}
              value={userInformation?.dob}
              max={new Date().toISOString().split('T')[0]}
              required
              defaultValue={userInformation?.dob}
              todayButton={'Today'}
            />
          </div>
        </div>
        <div className='relative my-[20px] '>
          <CommonPicodeInput
            value={userInformation?.pin_code}
            getData={getData}
            handleChange={handleInputChange}
            handlePincodeChange={handlePincodeChange}
            pinCodeError={pinCodeError}
          />
          {visible && (
            <ul className='suggestions pin-suggestion top-[97%]'>
              {pinCode?.map((i, v) => (
                <li
                  className={''}
                  key={v}
                  onClick={() => {
                    setUserInformation({ ...userInformation, pin_code: i })
                    setVisible(!visible)
                  }}>
                  {i}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <CommonNextButton title='Submit' handleSubmit={callEligibilityApi} disable={disable} />
    </>
  )
}

export default ProfessionalFormSection
