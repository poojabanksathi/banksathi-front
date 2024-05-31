/* eslint-disable react-hooks/exhaustive-deps */
import CommonNextButton from '@/core/component/common/CommonList/CommonNextButton/CommonNextButton'
import FirstAndSecondName from '@/core/component/common/CommonList/FirstAndSecondName/FirstAndSecondName'
import PersonalLoanProgressBar from '@/core/component/common/CommonList/PersonalLoanProgressBar/PersonalLoanProgressBar'
import { useWindowSize } from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import SelectionTabs from './SelectionTabs/SelectionTabs'
import {
  employmentOptions,
  incomeOptions,
  itrOptions,
  loanAmountsOptions,
  mockCreditScore,
  moneyUsageOptions
} from '@/utils/alljsonfile/personal-loan'
import CommonPicodeInput from '@/core/component/common/CommonList/CommonFieldComponent/Pincode'
import { BASE_URL, COMMON } from '@/utils/alljsonfile/service'
import axios from 'axios'
import BottomInfoComp from './BottomInfoComp/BottomInfoComp'
import CreditScoreDesktop from '@/core/component/common/CommonList/CreditScoreDesktop/CreditScoreDesktop'
import { isSalaried } from '@/utils/util'
import CreditScoreCard from '../../CreditNews/CreditScoreCard/CreditScoreCard'
import toast from 'react-hot-toast'

const PersonalLoanRecommendation = ({ topMenuCategories, personalLoanList }) => {
  const size = useWindowSize()
  const router = useRouter()

  const isDesktop = size?.width > 768
  const incomeRegex = /^\d+(\.\d+)?$/

  const userData = typeof window !== 'undefined' && localStorage.getItem('userData')
  const storedUserInfo = userData ? JSON.parse(userData) : null

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const buttonWidth = 'w-[200px] max-sm:w-[240px]'

  const [pinCode, setPinCode] = useState([])
  const [visible, setVisible] = useState(false)
  const [pinCodeError, setPinCodeError] = useState(false)
  const [stepper, setStepper] = useState(1)
  const [userInfo, setUserInfo] = useState(storedUserInfo || {})
  const [title, setTitle] = useState('')
  const [h1, setH1] = useState('')
  const [selectedLoanAmt, setSelectedLoanAmt] = useState(null)
  const [selectedOccupation, setSelectedOccupation] = useState(null)
  const [selectedIncome, setSelectedIncome] = useState('')
  const [selectedMoneyUsage, setSelectedMoneyUsage] = useState([])
  const [selectedScore, setSelectedScore] = useState(null)
  const [recommendationList, setRecommendationList] = useState([])

  const first = storedUserInfo?.full_name ? storedUserInfo?.full_name?.split(' ')?.[0] : null
  const lastOrMiddle = storedUserInfo?.full_name ? storedUserInfo?.full_name?.split(' ')?.pop() : null

  const userOccupationSalaried = userInfo?.occupation?.toLowerCase() === isSalaried

  const incomeValue =
    userInfo?.occupation?.toLowerCase() === isSalaried ? userInfo?.monthly_salary : userInfo?.itr_amount

  // DISABLE
  const nameDisable = (!userInfo?.firstName && !first) || (!userInfo?.lastName && !lastOrMiddle)
  const loanDisable = !selectedLoanAmt

  const moneyUsageDisable = !selectedMoneyUsage?.length > 0
  const creditScoreDisable = !selectedScore
  const pinDisable = !userInfo?.pin_code
  const employmentDisable = !selectedOccupation
  const incomeDisable = !selectedIncome

  const list = personalLoanList?.product_list

  const onBackBtn = () => {
    setStepper(stepper - 1)
  }

  const handleMoneyUsageSubmit = () => setStepper(4)
  const handlePincodeSubmit = () => setStepper(6)
  const handleEmploymentSubmit = () => setStepper(7)

  const handleNameSubmit = () => {
    if ((userInfo?.firstName || first) && (userInfo?.lastName || lastOrMiddle)) {
      setUserInfo({
        ...userInfo,
        firstName: userInfo?.firstName || first,
        lastName: userInfo?.lastName || lastOrMiddle
      })
      setStepper(2)
    }
  }
  const handleLoanSubmit = () => {
    if (list && list?.length > 0) {
      if (userInfo?.loanAmount) {
        const filter = list?.filter((ele) => ele?.loan_amount_max <= userInfo?.loanAmount)
        setRecommendationList(filter)
      }
    }
    setStepper(3)
  }

  const handleCreditRangeSubmit = () => {
    if (recommendationList && recommendationList?.length > 0) {
      if (userInfo?.creditScore) {
        const min = userInfo?.creditScore?.split('-')?.[0]
        const max = userInfo?.creditScore?.split('-')?.pop()
        const filter = recommendationList?.filter(
          (ele) => ele?.min_cibil_required >= min && ele?.min_cibil_required <= max
        )
        setRecommendationList(filter)
      }
    }
    setStepper(5)
  }
  // FINAL SUBMIT
  const handleIncomeSubmit = (item) => {
    if (recommendationList && recommendationList?.length > 0) {
      const filter = recommendationList?.filter((ele) => ele?.salary <= userInfo?.income)
      const listToStore = [
        {
          userInfo: userInfo,
          product_list: filter
        }
      ]
      setRecommendationList(filter)
      if (typeof window !== 'undefined') {
        localStorage.setItem('personalRecommendations', JSON.stringify(listToStore?.[0]))
        router.push('/personal-loan/recommendation/result')
      }
    } else {
      toast.error("Sorry! Couldn't find the result. Please Try again.")
    }
  }

  const handleCreditScoreClick = (item) => {
    setSelectedScore(item?.name)
    setUserInfo({ ...userInfo, creditScore: item?.name })
  }

  const handleEmploymentClick = (item) => {
    setSelectedOccupation(item?.name)
    setUserInfo({ ...userInfo, occupation: item?.name })
  }

  const handleLoanClick = (item) => {
    setSelectedLoanAmt(item?.name)
    setUserInfo({ ...userInfo, loanAmount: item?.valueToMatch })
  }

  const handleMoneyUsage = (item) => {
    if (selectedMoneyUsage?.includes(item?.name)) {
      setSelectedMoneyUsage(selectedMoneyUsage?.filter((ele) => ele !== item?.name))
    } else {
      setSelectedMoneyUsage((prev) => [...prev, item?.name])
    }
  }

  const handleIncomeClick = (item) => {
    setSelectedIncome(item?.name)
    setUserInfo({ ...userInfo, income: item?.valueToMatch })
  }

  const getPinCodes = async () => {
    const API_URL = BASE_URL + COMMON.pinCodeVerify
    await axios
      .post(
        API_URL,
        {
          pin_code: userInfo?.pin_code
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

  const handleInputChange = (event) => setUserInfo({ ...userInfo, [event?.target?.name]: event?.target?.value })
  const handlePincodeChange = () => setVisible(true)

  useEffect(() => {
    if (userInfo?.pin_code?.length === 6) {
      getPinCodes()
    }
  }, [userInfo?.pin_code?.length])

  useEffect(() => {
    if (stepper === 1) {
      setTitle('Just a few details, & your loan cuisine will be ready!')
      setH1('Personal Loan is Now Personalised')
    }
    if (stepper === 2) {
      setTitle('Required Loan Amount')
      setH1('Tell us the magic number For your dream loan amount!')
    }
    if (stepper === 3) {
      setTitle('How are you going to use the money?')
      setH1(' Share Your Needs For a Customized Experience!')
    }
    if (stepper === 4) {
      setTitle('What is your estimated credit score?')
      setH1("Your Financial DNA What's Your Credit Score Secret?")
    }
    if (stepper === 5) {
      setTitle('Your Pin Code')
      setH1('Your Pincode Opens  A World of Personalized Possibilities!')
    }
    if (stepper === 6) {
      setTitle('What’s your employment status?')
      setH1('Navigate Your Future by Sharing Your Employment Status!')
    }
    if (stepper === 7) {
      setTitle('Total monthly income')
      setH1(' Share the Chapter of Your Monthly Earnings for Unique suggestions!')
    }
  }, [stepper])

  useEffect(() => {
    const arr = []
    if (userInfo && Object.keys(userInfo)?.length > 0) {
      if (userInfo?.occupation) {
        if (userOccupationSalaried) {
          setSelectedOccupation('Salaried')
        } else {
          setSelectedOccupation('Self-employed')
        }
        const mapList = userOccupationSalaried ? incomeOptions : itrOptions
        mapList &&
          mapList?.map((item) => {
            if (item?.valueToMatch >= incomeValue) {
              arr.push(item)
              setSelectedIncome(arr?.[0]?.name)
              setUserInfo({ ...userInfo, income: arr?.[0]?.valueToMatch })
            }
          })
      }
    }
    if (localStorage.getItem('personalRecommendations')) {
      localStorage.removeItem('personalRecommendations')
    }
  }, [])
  return (
    <div className='bg-[#F4F8FB] container mx-auto px-14 max-[1024px]:px-8 max-sm:px-2 mt-6'>
      <div className='bg-[#FFFFFF] mt-[28px] h-auto w-full rounded-3xl'>
        <PersonalLoanProgressBar stepper={stepper} />
        <div className='flex flex-row items-center justify-center h-[40px] pt-[25px] max-sm:pt-2'>
          {stepper > 1 && (
            <div className='relative lg:right-[45%] right-[42%] cursor-pointer' onClick={() => onBackBtn()}>
              <Image src={'/assets/back-arrow.svg'} width={40} height={40} alt='back arrow' />
            </div>
          )}
        </div>
        <div className={`flex flex-col justify-center items-center gap-0 !gap-y-0 mb-0 pb-4`}>
          <h1
            className={`${
              stepper === 1 ? 'mt-[25px] max-sm:!mt-0' : ''
            } text-center text-neutral-800 text-[28px] max-sm:mt-2 font-semibold font-['Faktum'] leading-[43.20px] max-sm:text-[20px] max-sm:leading-[24px] max-sm:px-2`}>
            {h1}
          </h1>
          {stepper === 1 && (
            <h2 className="mt-[10px] text-center text-neutral-800 text-[15px] font-normal font-['Poppins'] leading-[18px]">
              Best Loan offers that align with your requirements
            </h2>
          )}
          <div className="mt-[20px] max-sm:mt-[30px] text-center text-neutral-800 text-[18px] font-medium font-['Poppins'] max-sm:text-[15px] max-sm:px-6">
            {title}
          </div>
          <div className='mt-[10px] py-4 flex flex-col items-center justify-center max-sm:px-4'>
            {stepper === 1 && (
              <>
                <FirstAndSecondName
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  first={first}
                  lastOrMiddle={lastOrMiddle}
                />
                <CommonNextButton
                  title='Next'
                  handleSubmit={handleNameSubmit}
                  disable={nameDisable}
                  width={buttonWidth}
                />
              </>
            )}
            {stepper === 2 && (
              <>
                <SelectionTabs
                  optionsToMap={loanAmountsOptions}
                  userInfo={userInfo}
                  handleTabClick={handleLoanClick}
                  gridCols={'grid-cols-3 max-sm:grid-cols-2'}
                  selectedOption={selectedLoanAmt}
                />
                <CommonNextButton
                  title='Next'
                  handleSubmit={handleLoanSubmit}
                  disable={loanDisable}
                  width={buttonWidth}
                />
              </>
            )}
            {stepper === 3 && (
              <>
                <SelectionTabs
                  optionsToMap={moneyUsageOptions}
                  userInfo={userInfo}
                  handleTabClick={handleMoneyUsage}
                  gridCols={'grid-cols-3 max-sm:grid-cols-2'}
                  isMoneyUsageScreen={true}
                  selectedOption={selectedMoneyUsage}
                />
                <CommonNextButton
                  title='Next'
                  handleSubmit={handleMoneyUsageSubmit}
                  disable={moneyUsageDisable}
                  width={buttonWidth}
                />
              </>
            )}
            {stepper === 4 && (
              <>
                <SelectionTabs
                  optionsToMap={mockCreditScore}
                  userInfo={userInfo}
                  handleTabClick={handleCreditScoreClick}
                  selectedOption={selectedScore}
                  gridCols={'grid-cols-4 max-sm:grid-cols-2'}
                />
                <CommonNextButton
                  title='Next'
                  handleSubmit={handleCreditRangeSubmit}
                  disable={creditScoreDisable}
                  width={buttonWidth}
                />
              </>
            )}
            {stepper === 5 && (
              <>
                <div className='lg:w-[35vw] w-full relative'>
                  <CommonPicodeInput
                    value={userInfo?.pin_code}
                    getData={getPinCodes}
                    handleChange={handleInputChange}
                    handlePincodeChange={handlePincodeChange}
                    pinCodeError={pinCodeError}
                    showPin={true}
                  />
                  {visible && (
                    <ul className='suggestions pin-suggestion top-[96%]'>
                      {pinCode?.map((i, v) => (
                        <li
                          className={''}
                          key={v}
                          onClick={() => {
                            setUserInfo({ ...userInfo, pin_code: i })
                            setVisible(!visible)
                          }}>
                          {i}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <CommonNextButton
                  title='Next'
                  handleSubmit={handlePincodeSubmit}
                  disable={pinDisable}
                  width={buttonWidth}
                />
              </>
            )}
            {stepper === 6 && (
              <>
                <SelectionTabs
                  optionsToMap={employmentOptions}
                  userInfo={userInfo}
                  handleTabClick={handleEmploymentClick}
                  gridCols={'grid-cols-2'}
                  selectedOption={selectedOccupation}
                />
                <CommonNextButton
                  title='Next'
                  handleSubmit={handleEmploymentSubmit}
                  disable={employmentDisable}
                  width={buttonWidth}
                />
              </>
            )}
            {stepper === 7 && (
              <>
                <SelectionTabs
                  optionsToMap={userOccupationSalaried ? incomeOptions : itrOptions}
                  userInfo={userInfo}
                  handleTabClick={handleIncomeClick}
                  gridCols={'grid-cols-4 max-sm:grid-cols-2'}
                  selectedOption={selectedIncome}
                />
                <CommonNextButton
                  title='Submit'
                  handleSubmit={handleIncomeSubmit}
                  disable={incomeDisable}
                  width={buttonWidth}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <BottomInfoComp />
      <div className='mt-[60px] mb-10 max-sm:hidden max-md:hidden'>
        <CreditScoreDesktop isCreditRange={false} />
      </div>
      <div className='mt-[80px] mb-10 lg:hidden'>
        <CreditScoreCard isCreditRange={false} />
      </div>
    </div>
  )
}

export default PersonalLoanRecommendation
