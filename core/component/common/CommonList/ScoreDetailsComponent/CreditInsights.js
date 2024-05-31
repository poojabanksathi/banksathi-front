/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import creditLimit from '../../../../../public/assets/creditLimit.svg'
import likeBg from '../../../../../public/assets/likethumb.svg'
import chevronDown from '../../../../../public/assets/chevronDown.svg'
import { useRouter } from 'next/router'
import { BASE_URL, RecommendNews, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import moment from 'moment'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import { formatInYearsAndMonths, formatUnixTimestamp, handleRemoveLocalstorage } from '@/utils/util'
import PaymentHistoryMonths from '../../PaymentHistoryMonths'
import ScoreExcellentGarph from './ScoreExcellentGarph'
import CreditEnquiriesTable from './CreditEnquiriesTable'
import dynamic from 'next/dynamic'
import experianImage from '../../../../../public/assets/experian-logo.svg'
import Cookies from 'js-cookie'
import PersonalisedCards from './PersonalisedCards'

const tabData = [
  { id: 1, title: 'Credit Dashboard' },
  { id: 2, title: 'Payment History' },
  { id: 3, title: 'Credit Utilisation' },
  { id: 4, title: 'Credit Age' },
  { id: 5, title: 'Total Account' },
  { id: 6, title: 'Credit Enquiries' }
]
const EligibileCards = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/EligibileProducts/EligibileProducts'),
  { ssr: false }
)

export default function CreditInsights({
  SelectIndexCardScore,
  setSelectIndexCardScore,
  // enquiryDetails,
  creditInsightsTab,
  ScoreCurrent,
  GetScoreHistory,
  productList,
  bankAccountListing,
  bestFitCards
}) {
  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const token = typeof window !== 'undefined' && localStorage.getItem('token')

  const creditCards = 'Credit Cards'

  const [indexData, setIndexData] = useState(0)
  const [paymentHistory, setPaymentHistory] = useState([])
  const [creditAge, setCreditAge] = useState([])
  const [creditUtilisation, setCreditUtilisation] = useState([])
  const [totalAccount, setTotalAccount] = useState([])
  const [viewDetailsShow, setViewDetailsShow] = useState([])
  const [hSTotalAccount, setHsTotalAccount] = useState([])
  const [paymentViewDetails, setpaymentViewDetails] = useState(false)
  const [accountDetailActive, setAccountDetailActive] = useState(false)
  const [profileProductData, setProfileProductdata] = useState([])
  const [randomCreditCards, setRandomCreditCards] = useState([])
  const [profileformData, setProfileFormdata] = useState([])
  const [enquiryData, setEnquiryData] = useState([])
  const [sortedList, setSortedList] = useState([])
  const [sortedAccounts, setSortedAccounts] = useState([])
  const [sortedCreditAge, setSortedCreditAge] = useState([])
  const [sortedCreditUtilisation, setSortedCreditUtilisation] = useState([])
  const [totalSpendLimit, setTotalSpendLimit] = useState({ spendLimit: '', percentage: '' })
  const [totalCreditLimit, setTotalCreditLimit] = useState(null)

  const router = useRouter()

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
          setProfileProductdata(response?.data?.data)
          const apiDob = response.data?.data?.dob
          setDate(new Date(apiDob))
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(response?.data?.data))
        }
      })
      .catch((error) => {
        if (error?.response?.data?.data?.message == 'failed') {
        } else if (error?.response?.status == 401) {
          router.push('/login')
          toast.success(ApiMessage?.logoutmessage)
          handleRemoveLocalstorage()
        }
      })
  }

  useEffect(() => {
    if (token) {
      GetUserSetUp()
    }
  }, [])

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Filtered data for credit cards
  const filteredDataCard =
    productList?.product_list?.filter((obj) =>
      profileProductData?.eligible_product?.credit_cards?.includes(obj.url_slug.split('/').pop())
    ) || []

  const shuffledDataCard = shuffleArray([...filteredDataCard])

  const randomThreeCards = shuffledDataCard.slice(0, 3)

  // Filtered data for bank accounts
  const filteredBankAccountsData =
    bankAccountListing?.product_list?.filter((obj) =>
      profileProductData?.eligible_product?.bank_accounts?.includes(obj.url_slug.split('/').pop())
    ) || []

  const randomThreeAccounts = Array.isArray(filteredBankAccountsData)
    ? shuffleArray([...filteredBankAccountsData]).slice(0, 3)
    : []

  const handleClick = (index) => {
    setIndexData(index)
    setSelectIndexCardScore(index)
  }
  const paymentArray = Array.isArray(paymentHistory?.total_accounts_data)
  const UtilisationArray = Array.isArray(creditUtilisation?.credit_cards_data)
  const AgeCreditArray = Array.isArray(creditAge?.credit_account_datas)
  const TotalAccounttArray = Array.isArray(totalAccount?.total_accounts_data)

  const handleHideShow = (index) => {
    // setViewDetailsShow(index)
    setViewDetailsShow(viewDetailsShow === index ? null : index)
  }

  const handleHideShowAccount = (index) => {
    setHsTotalAccount(hSTotalAccount === index ? null : index)
  }

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  moment.updateLocale('en', {
    relativeTime: {
      M: '1 month',
      MM: '%d months'
    }
  })

  const getMonthData = (month) => {
    return ((month / 12) | 0) + ' years and ' + (month % 12) + ' months'
  }
  function statusCounter() {
    let counter = 0
    if (AgeCreditArray) {
      for (const input of creditAge?.credit_account_datas) {
        if (input?.status === 'Active') counter += 1
      }
    }
    return counter
  }

  const GetPaymentHistory = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.paymenthistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setPaymentHistory(response?.data?.payment_history_details)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        } else if (error?.response?.status == 500) {
        }
      })
  }

  const GetCreditAge = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.creditage,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setCreditAge(response?.data.credit_age)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        } else if (error?.response?.status == 500) {
        }
      })
  }

  const GetCreditUtilisation = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.creditutilisation,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setCreditUtilisation(response?.data?.credit_card_utilisation_details)
        }
      })
      .catch((error) => {
        console.log('error in fetching credit utilisation', error)
      })
  }

  const GetTotalAccount = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.totalaccount,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setTotalAccount(response?.data?.total_accounts_details)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        } else if (error?.response?.status == 500) {
        }
      })
  }

  // ------- ENQUIRY CIBIL API ----------- //
  const GetEnquiryCibil = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.enquirycibil,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setProfileFormdata(response?.data)
          setEnquiryData(response?.data?.data)
        }
      })
      .catch((error) => {
        console.log('error in enquiry cibil api', error)
      })
  }

  function formatDateObj(dateString) {
    if (dateString && dateString.length >= 8) {
      const year = dateString?.slice(0, 4)
      const month = dateString?.slice(4, 6)
      const day = dateString?.slice(6, 8)

      return `${day}-${month}-${year}`
    }
  }
  const getMissPayments = (item) => {
    if (item && item?.pay_history_month_wise) {
      const paymentObj = item?.pay_history_month_wise
      const missPaymentsArray = Object.values(paymentObj)?.filter(
        (element) =>
          element === 'No_60' ||
          element === 'No_90' ||
          element === 'No_120' ||
          element === 'No_150' ||
          element === 'No_180'
      )
      return missPaymentsArray?.length
    }
  }

  const dateStrObj = totalAccount?.total_accounts_data?.last_payment_date
  const formatDateLastPayObj = formatDateObj(dateStrObj?.toString())

  const dateformObj = moment(totalAccount?.total_accounts_data?.opened_date)
  const formatOpenDateObj = dateformObj?.format('DD-MM-YYYY')

  const getCreditCards = () => {
    if (randomThreeCards && randomThreeCards?.length > 0) {
      return randomThreeCards
    } else return randomCreditCards?.slice(0, 3)
  }

  const getBankAccounts = () => {
    if (randomThreeAccounts && randomThreeAccounts?.length > 0) {
      return randomThreeAccounts
    } else return bankAccountListing?.product_list?.slice(0, 3)
  }
  const fetchRecommendCardsData = (category) => {
    const requestParams = {
      category: category,
      lang_id: 1,
      device_id: deviceId,
      lead_profile_id: leadId
    }
    axios
      .post(BASE_URL + RecommendNews?.recommendNewsProducts, requestParams)
      .then((res) => {
        setRandomCreditCards(res?.data?.data)
      })
      .catch((err) => {
        console.log('error while fetching random list', err)
      })
  }

  useEffect(() => {
    setSelectIndexCardScore(creditInsightsTab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [creditInsightsTab])

  useEffect(() => {
    if (token) {
      const decordtoken = jwt(token)

      const timecurrrunt = Date.now()
      const timestampexp = decordtoken?.exp

      const CurruntTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(timecurrrunt)

      const formattedDateExp = formatUnixTimestamp(timestampexp)

      if (CurruntTime === formattedDateExp) {
        router.push('/login')
        toast.success(ApiMessage?.logoutmessage)
        handleRemoveLocalstorage()
      }
    }
  }, [])

  useEffect(() => {
    if (randomThreeCards && randomThreeCards?.length === 0) {
      fetchRecommendCardsData(creditCards)
    }
  }, [randomThreeCards?.length])

  useEffect(() => {
    if (token) {
      GetPaymentHistory()
      GetCreditAge()
      GetCreditUtilisation()
      GetTotalAccount()
      GetEnquiryCibil()
    }
  }, [])

  useEffect(() => {
    if (sortedCreditUtilisation?.length > 0) {
      const data = sortedCreditUtilisation?.filter((item) => item?.status === 'Active')
      const spendLimitArray = data && data?.length > 0 ? data?.map((element) => element?.limit_used) : []
      const limitArray = data && data?.length > 0 ? data?.map((element) => element?.credit_limit) : []

      const totalLimit = limitArray?.reduce((a, b) => a + b)
      const totalSpend = spendLimitArray?.reduce((a, b) => a + b)

      const percentage = Math.round((totalSpend / totalLimit) * 100)

      setTotalSpendLimit({ spendLimit: totalSpend, percentage: percentage })
      setTotalCreditLimit(totalLimit)
    }
  }, [sortedCreditUtilisation?.length])

  useEffect(() => {
    // PAYMENT HISTORY
    if (paymentHistory) {
      if (paymentHistory?.total_accounts_data) {
        const sorted = paymentHistory?.total_accounts_data?.sort(function (a, b) {
          const statusA = a?.status?.toUpperCase()
          const statusB = b?.status?.toUpperCase()
          return statusA?.localeCompare(statusB)
        })
        setSortedList(sorted)
      } else setSortedList([])
    }
    // TOTAL ACCOUNTS
    if (totalAccount) {
      if (totalAccount?.total_accounts_data) {
        const sorted = totalAccount?.total_accounts_data?.sort(function (a, b) {
          const statusA = a?.status?.toUpperCase()
          const statusB = b?.status?.toUpperCase()
          return statusA?.localeCompare(statusB)
        })
        setSortedAccounts(sorted)
      } else {
        setSortedAccounts([])
      }
    }
    // CREDIT AGE
    if (creditAge) {
      if (creditAge?.credit_account_datas) {
        const sorted = creditAge?.credit_account_datas?.sort((a, b) => {
          return a?.account_old_in_months - b?.account_old_in_months
        })
        setSortedCreditAge(sorted)
      } else {
        setSortedCreditAge([])
      }
    }
    // CREDIT UTILISATION
    if (creditUtilisation) {
      if (creditUtilisation?.credit_cards_data) {
        const sorted = creditUtilisation?.credit_cards_data?.sort((a, b) => {
          const statusA = a?.status?.toUpperCase()
          const statusB = b?.status?.toUpperCase()
          return statusA?.localeCompare(statusB)
        })
        setSortedCreditUtilisation(sorted)
      } else {
        setSortedCreditUtilisation([])
      }
    }
  }, [indexData])

  return (
    <>
      <Toaster />
      <div className='credit-insight font-[Poppins]'>
        {tabData?.length > 0 && (
          <>
            <div className='rounded-3xl bg-white   '>
              <div className='p-[30px] max-sm:p-[25px] flex justify-start gap-4 items-center'>
                <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Credit Report</p>
                <Image src={experianImage} alt='experianImage' width={''} height={''} className='h-auto w-auto bg-cover' />
              </div>
              <div className='border-b border-[#E6ECF1] list-none flex gap-8  max-[771px]:gap-8  max-[771px]:overflow-x-scroll max-[771px]:whitespace-nowrap !scrollbar-hide list-t max-[771px]:justify-start  w-full  px-[30px] max-[1440px]:px-12  max-[1200px]:px-8 max-[1024px]:px-8  max-[576px]:gap-8 tab-credit-box'>
                {tabData.map((insightData, index) => {
                  return (
                    <div key={index} className='relative'>
                      <div
                        className={
                          index === SelectIndexCardScore
                            ? 'pb-3 w-auto max-[1440px]:w-full  cursor-pointer border-b-2 border-[#844FCF]'
                            : 'pb-3 w-auto max-[1440px]:w-full  cursor-pointer text-[#212529]'
                        }
                        onClick={() => handleClick(index)}>
                        <p
                          className={
                            index === SelectIndexCardScore
                              ? 'font-[faktum] font-normal text-[15px] text-[#844FCF] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px]'
                              : 'font-[faktum] font-normal text-[15px] max-[1024px]:text-[16px]  max-[991px]:text-[15px] max-[479px]:text-[13px] text-[#212529]'
                          }>
                          {insightData.title}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* ==== credit dashboard ======= */}
              {SelectIndexCardScore === 0 && (
                <ScoreExcellentGarph
                  ScoreCurrent={ScoreCurrent}
                  GetScoreHistory={GetScoreHistory}
                  productList={productList}
                  bankAccountListing={bankAccountListing}
                />
              )}

              {/* ==== payment history ======= */}
              {SelectIndexCardScore === 1 && (
                <div className='p-[30px] max-[479px]:px-4'>
                  <div className='border border-[#E6ECF1] rounded-2xl p-5 relative'>
                    <div className='absolute top-[-15px] right-[15px]'>
                      <button className='bg-[#FFEEEF] cursor-pointer text-[#d90368] w-24 h-8 rounded-[20px] text-xs'>
                        High Impact
                      </button>
                    </div>
                    <div className='flex items-center gap-5'>
                      <Image
                        src='/assets/invest-price.svg'
                        alt='payment'
                        className='w-[46px] h-[46px]'
                        width={10}
                        height={10}
                      />
                      <p className='text-xl font-normal font-[Poppins] max-[479px]:text-[15px] text-[#212529]'>
                        {' '}
                        You have made{' '}
                        <span className='font-semibold text-[#212529]'>
                          {paymentHistory?.total_late_payment == 0 && '100%'}
                        </span>{' '}
                        of your payments on time
                      </p>
                    </div>
                    <div className='pl-6 pt-2 w-full max-[479px]:pl-0'>
                      <div className='flex justify-between mt-4 max-[576px]:flex-col'>
                        <div className='flex w-[45%] justify-between max-[479px]:w-[80%] max-[479px]:ml-auto max-[479px]:mb-5'>
                          <div>
                            {paymentHistory?.total_ontime_payment && (
                              <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] max-[375px]:text-[14px] text-[#212529]'>
                                {paymentHistory?.total_ontime_payment}
                              </span>
                            )}
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              On-Time Payments
                            </p>
                          </div>
                          <div>
                            {paymentHistory?.total_late_payment !== null && (
                              <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529]'>
                                {paymentHistory?.total_late_payment}
                              </span>
                            )}
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Late Payments
                            </p>
                          </div>
                        </div>
                        <div className='bg-[#E5FFF5] py-1.5 px-6 w-[400px] max-[425px]:w-auto'>
                          <div className='flex items-center'>
                            <Image src={likeBg} alt='img' className='mr-5' />
                            <p className='text-[15px] max-[479px]:text-[12px] text-[#212529]'>
                              Great! You haven't missed any due payments in the last 3 months.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!paymentArray ? (
                    <>
                      {paymentHistory?.total_accounts_data && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Your Accounts</p>

                          <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                            <div className='p-5 flex border-b border-[#E6ECF1]'>
                              <div className=' w-full flex  gap-2'>
                                <div className='pl-2 max-[479px]:pl-0 flex w-full  justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                  <div>
                                    <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                      {paymentHistory?.total_accounts_data?.bank_name}
                                    </span>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529] !capitalize'>
                                      {paymentHistory?.total_accounts_data?.account_type}
                                    </p>
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Account Number
                                    </p>
                                    {paymentHistory?.total_accounts_data?.account_no && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {paymentHistory?.total_accounts_data?.account_no}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      On-Time Payments
                                    </p>
                                    {paymentHistory?.total_accounts_data?.on_time_payment && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {paymentHistory?.total_accounts_data?.on_time_payment}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                        Status
                                      </p>
                                      {paymentHistory?.total_accounts_data?.status && (
                                        <span
                                          className={`font-poppins font-semibold text-[15px] leading-7  ${
                                            paymentHistory?.total_accounts_data?.status == 'Active'
                                              ? 'text-[#49D49D]'
                                              : 'text-[red]'
                                          }`}>
                                          {paymentHistory?.total_accounts_data?.status == 'Active'
                                            ? 'Active'
                                            : 'Closed'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {paymentViewDetails && <>{/* q */}</>}
                            <div className='p-3'>
                              <button
                                onClick={() => setpaymentViewDetails(!paymentViewDetails)}
                                className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                {paymentViewDetails ? 'Hide Details' : 'View Details'}

                                {paymentViewDetails ? (
                                  <Image src={chevronDown} alt='up' className='rotate-180  w-3 h-3 shrink-0' />
                                ) : (
                                  <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {paymentHistory?.total_accounts_data?.length > 0 && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Your Accounts</p>
                          {sortedList?.map((datapayment, index) => {
                            const missedPayment = getMissPayments(datapayment)
                            return (
                              <div key={index}>
                                <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                                  <div className='p-5 flex border-b border-[#E6ECF1]'>
                                    <div className=' w-full flex  gap-2'>
                                      <div className='pl-2 max-[479px]:pl-0 flex w-full  justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                        <div>
                                          <div className='font-poppins lg:w-[280px] font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                            {datapayment?.bank_name}
                                          </div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529] !capitalize'>
                                            {datapayment?.account_type}
                                          </p>
                                        </div>
                                        <div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            Account Number
                                          </p>
                                          {datapayment?.account_no && (
                                            <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                              {datapayment?.account_no}
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            On-Time Payments
                                          </p>
                                          {datapayment?.on_time_payment && (
                                            <div className='font-poppins font-semibold text-center text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                              {datapayment?.on_time_payment}
                                            </div>
                                          )}
                                        </div>
                                        {missedPayment > 0 && (
                                          <div>
                                            <p className='font-poppins font-normal text-xs leading-6 text-[red]'>
                                              Delayed Payments
                                            </p>
                                            <div className='font-poppins font-semibold text-[red] text-center text-[15px] leading-7 max-[479px]:leading-6'>
                                              {getMissPayments(datapayment)}
                                            </div>
                                          </div>
                                        )}
                                        <div>
                                          <div>
                                            <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                              Status
                                            </p>
                                            {datapayment?.status && (
                                              <span
                                                className={`font-poppins font-semibold text-[15px] leading-7  ${
                                                  datapayment?.status == 'Active' ? 'text-[#49D49D]' : 'text-[red]'
                                                }`}>
                                                {datapayment?.status == 'Active' ? 'Active' : 'Closed'}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {viewDetailsShow === index && (
                                    <>
                                      <PaymentHistoryMonths datapayment={datapayment} />
                                    </>
                                  )}

                                  <div className='p-3'>
                                    <button
                                      onClick={() => handleHideShow(index)}
                                      className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                      {viewDetailsShow === index ? 'Hide Details' : 'View Details'}

                                      {viewDetailsShow === index ? (
                                        <Image src={chevronDown} alt='up' className='rotate-180  w-3 h-3 shrink-0' />
                                      ) : (
                                        <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ==== credit Utilisation ==== */}
              {SelectIndexCardScore === 2 && (
                <div className='p-[30px]'>
                  <div className='border border-[#E6ECF1] rounded-2xl p-5 relative'>
                    <div className='absolute top-[-15px] right-[15px]'>
                      <button className='bg-[#FFEEEF] cursor-pointer text-[#d90368] w-24 h-8 rounded-[20px] text-xs'>
                        High Impact
                      </button>
                    </div>
                    <div className='flex items-center gap-5'>
                      <Image src={creditLimit} alt='creditLimit' className='w-[46px] h-[38px]' />
                      <p className='text-xl font-normal font-[Poppins] max-[479px]:text-[15px] text-[#212529]'>
                        You have utilised{' '}
                        <span className='font-semibold text-[#212529]'> {totalSpendLimit?.percentage}% </span> of your
                        total credit limit
                      </p>
                    </div>
                    <div className='pl-6 pt-2 w-full max-[479px]:pl-0'>
                      <div className='flex justify-between mt-4 max-[425px]:block'>
                        <div className='flex w-[45%] justify-between max-[479px]:w-[80%] max-[479px]:ml-auto max-[479px]:mb-5'>
                          <div>
                            {totalSpendLimit?.spendLimit && (
                              <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                                ₹ {totalSpendLimit?.spendLimit}
                              </span>
                            )}
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Total Spends
                            </p>
                          </div>
                          <div>
                            {totalCreditLimit && (
                              <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                                ₹ {totalCreditLimit}
                              </span>
                            )}
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Total Credit Limit
                            </p>
                          </div>
                        </div>
                        {/* <div className='bg-[#E5FFF5] py-1.5 px-6 w-[400px] max-[425px]:w-auto'>
                          <div className='flex items-center'>
                            <Image src={likeBg} alt='img' className='mr-5' />
                            <p className='text-[15px] max-[479px]:text-[12px] text-[#212529]'>
                              Great! you have a credit card utilisation of 6% for the last 3 months.
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {!UtilisationArray ? (
                    <>
                      {creditUtilisation?.credit_cards_data && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px]'>Your Accounts</p>

                          <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                            <div className='p-5 flex border-b border-[#E6ECF1]'>
                              <div className='w-full flex gap-2 '>
                                <div className='pl-2 max-[479px]:pl-0 flex justify-between w-full max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                  <div>
                                    <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                      {creditUtilisation?.credit_cards_data?.bank_name}
                                    </span>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Credit Card
                                    </p>
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Account Number
                                    </p>
                                    {creditUtilisation?.credit_cards_data?.account_no && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {creditUtilisation?.credit_cards_data?.account_no}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6'>Credit Limit</p>
                                    {creditUtilisation?.credit_cards_data?.credit_limit &&
                                      creditUtilisation?.credit_cards_data?.credit_limit !== null && (
                                        <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                          ₹{creditUtilisation?.credit_cards_data?.credit_limit}
                                        </span>
                                      )}
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6'>Limit Used</p>
                                    {creditUtilisation?.credit_cards_data?.limit_used && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        ₹{creditUtilisation?.credit_cards_data?.limit_used}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6'>Status</p>
                                      {creditUtilisation?.credit_cards_data?.status && (
                                        <span
                                          className={`font-poppins font-semibold text-[15px] leading-7  ${
                                            creditUtilisation?.credit_cards_data?.status == 'Active'
                                              ? 'text-[#49D49D]'
                                              : 'text-[red]'
                                          }`}>
                                          {creditUtilisation?.credit_cards_data?.status === 'Active'
                                            ? 'Active'
                                            : 'Closed'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className='p-3'>
                            <button className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                              View Details
                              <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                            </button>
                          </div> */}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className='mt-5'>
                        <p className='text-[18px] font-medium leading-[25px]'>Your Accounts</p>
                        {sortedCreditUtilisation?.map((data, i) => {
                          return (
                            <div className='border border-[#E6ECF1] rounded-2xl mt-3' key={i}>
                              <div className='p-5 flex border-b border-[#E6ECF1]'>
                                <div className='w-full flex gap-2 '>
                                  <div className='pl-2 max-[479px]:pl-0 flex justify-between w-full max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                    <div>
                                      <div className='font-poppins lg:w-[250px] font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {data?.bank_name}
                                      </div>
                                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                        Credit Card
                                      </p>
                                    </div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                        Account Number
                                      </p>
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {data?.account_no}
                                      </span>
                                    </div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6'>Credit Limit</p>
                                      {data?.credit_limit !== null && (
                                        <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                          ₹{data?.credit_limit}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6'>Limit Used</p>
                                      {data?.limit_used !== null && (
                                        <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                          {data?.limit_used === 0 ? data?.limit_used : `₹${data?.limit_used}`}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <div>
                                        <p className='font-poppins font-normal text-xs leading-6'>Status</p>
                                        {data?.status && (
                                          <span
                                            className={`font-poppins font-semibold text-[15px] leading-7  ${
                                              data?.status == 'Active' ? 'text-[#49D49D]' : 'text-[red]'
                                            }`}>
                                            {data?.status === 'Active' ? 'Active' : 'Closed'}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div className='p-3'>
                              <button className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                View Details
                                <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                              </button>
                            </div> */}
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ==== Credit Age ==== */}
              {SelectIndexCardScore === 3 && (
                <div className='p-[30px]'>
                  <div className='border border-[#E6ECF1] rounded-2xl p-5 relative'>
                    <div className='absolute top-[-15px] right-[15px]'>
                      <button className='bg-[#E8FFF7] cursor-pointer text-[#00AF73] w-[8rem] h-8 rounded-[20px] text-xs'>
                        Medium Impact
                      </button>
                    </div>
                    <div className='flex items-center gap-5'>
                      <Image
                        src='/assets/credit-age.svg'
                        alt='creditAge'
                        className='w-10 h-10'
                        width={10}
                        height={10}
                      />
                      <p className='text-xl font-normal font-[Poppins] max-[479px]:text-[15px] text-[#212529]'>
                        Your total credit history is{' '}
                        <span className='font-semibold text-[#212529]'>
                          {' '}
                          {getMonthData(creditAge?.max_age_of_account)}{' '}
                        </span>{' '}
                        old
                      </p>
                    </div>
                    <div className='pl-6 pt-2 w-full max-[479px]:pl-0'>
                      <div className='flex justify-between mt-4 max-[425px]:block'>
                        <div className='flex w-[45%] justify-between max-[479px]:w-[80%] max-[479px]:ml-auto max-[479px]:mb-5'>
                          <div>
                            <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px]'>
                              {statusCounter()}
                            </span>
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Total Active Accounts
                            </p>
                          </div>
                          <div>
                            <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                              {getMonthData(creditAge?.max_age_of_account)}
                            </span>
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Age of oldest Active Account
                            </p>
                          </div>
                        </div>
                        <div className='bg-[#E5FFF5] py-1.5 px-6 w-[400px] max-[425px]:w-auto'>
                          <div className='flex items-center'>
                            <Image src={likeBg} alt='img' className='mr-5' />
                            <p className='text-[15px] max-[479px]:text-[12px] text-[#212529]'>
                              A longer credit history is good for your credit score
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!AgeCreditArray ? (
                    <>
                      {creditAge?.credit_account_datas && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px]'>Your Accounts</p>

                          <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                            <div className='p-5 flex border-b border-[#E6ECF1]'>
                              <div className='flex gap-2 w-full'>
                                <div className='pl-2 max-[479px]:pl-0 flex w-full justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                  <div>
                                    <div className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                      {creditAge?.credit_account_datas?.bank_name}
                                    </div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      {creditAge?.credit_account_datas?.account_type}
                                    </p>
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Account Number
                                    </p>
                                    {creditAge?.credit_account_datas?.account_no && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {creditAge?.credit_account_datas?.account_no}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Age of Account
                                    </p>
                                    {creditAge?.credit_account_datas?.account_old_in_months && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {creditAge?.credit_account_datas?.account_old_in_months} months
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                        Status
                                      </p>
                                      {creditAge?.credit_account_datas?.status && (
                                        <span
                                          className={`font-poppins font-semibold text-[15px] leading-7  ${
                                            creditAge?.credit_account_datas?.status == 'Active'
                                              ? 'text-[#49D49D]'
                                              : 'text-[red]'
                                          }`}>
                                          {creditAge?.credit_account_datas?.status === 'Active' ? 'Active' : 'Closed'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className='p-3'>
                            <button className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                              View Details
                              <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                            </button>
                          </div> */}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {creditAge?.credit_account_datas?.length > 0 && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px]'>Your Accounts</p>
                          {sortedCreditAge?.map((crditagedata, index) => {
                            const accountAge = formatInYearsAndMonths(crditagedata?.account_old_in_months)
                            return (
                              <>
                                <div key={index}>
                                  <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                                    <div className='p-5 flex border-b border-[#E6ECF1]'>
                                      <div className='flex gap-2 w-full'>
                                        <div className='pl-2 max-[479px]:pl-0 flex w-full justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                          <div>
                                            <div className='font-poppins lg:w-[280px] font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                              {crditagedata?.bank_name}
                                            </div>
                                            <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                              {crditagedata?.account_type}
                                            </p>
                                          </div>
                                          <div>
                                            <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                              Account Number
                                            </p>
                                            <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                              {crditagedata?.account_no}
                                            </span>
                                          </div>
                                          <div>
                                            <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                              Age of Account
                                            </p>
                                            {crditagedata?.account_old_in_months && (
                                              <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                                {accountAge}
                                              </span>
                                            )}
                                          </div>
                                          <div>
                                            <div>
                                              <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                                Status
                                              </p>
                                              {crditagedata?.status && (
                                                <span
                                                  className={`font-poppins font-semibold text-[15px] leading-7  ${
                                                    crditagedata?.status == 'Active' ? 'text-[#49D49D]' : 'text-[red]'
                                                  }`}>
                                                  {crditagedata?.status === 'Active' ? 'Active' : 'Closed'}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className='p-3'>
                                    <button className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                      View Details
                                      <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                    </button>
                                  </div> */}
                                  </div>
                                </div>
                              </>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* === Total Account === */}
              {SelectIndexCardScore === 4 && (
                <div className='p-[30px]'>
                  <div className='border border-[#E6ECF1] rounded-2xl p-5 relative'>
                    <div className='absolute top-[-15px] right-[15px]'>
                      <button className='bg-[#FFECDD] cursor-pointer text-[#D26D20] w-24 h-8 rounded-[20px] text-xs '>
                        Low Impact
                      </button>
                    </div>
                    <div className='flex items-center gap-5'>
                      <Image
                        src='/assets/total-account.svg'
                        alt='creditAccount'
                        className='w-11 h-10'
                        width={10}
                        height={10}
                      />
                      <p className='text-xl font-normal font-[Poppins] max-[479px]:text-[15px] text-[#212529]'>
                        You have {totalAccount?.total_active_accounts} total accounts
                      </p>
                    </div>
                    <div className='pl-6 pt-2 w-full max-[479px]:pl-0'>
                      <div className='flex justify-between mt-4 max-[425px]:block'>
                        <div className='flex w-[45%] justify-between max-[479px]:w-[80%] max-[479px]:ml-auto max-[479px]:mb-5'>
                          <div>
                            {totalAccount?.total_active_accounts && (
                              <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                                {totalAccount?.total_active_accounts}
                              </span>
                            )}
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Active Accounts
                            </p>
                          </div>
                          <div>
                            {totalAccount?.total_inactive_accounts && (
                              <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                                {totalAccount?.total_inactive_accounts}
                              </span>
                            )}
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Closed Accounts
                            </p>
                          </div>
                        </div>
                        <div className='bg-[#E5FFF5] py-1.5 px-6 w-[400px] max-[425px]:w-auto'>
                          <div className='flex items-center'>
                            <Image src={likeBg} alt='img' className='mr-5' />
                            <p className='text-[15px] max-[479px]:text-[12px] text-[#212529]'>
                              You have {totalAccount?.total_active_credit_accounts} active credit cards and{' '}
                              {totalAccount?.total_active_loan_accounts} active loans
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!TotalAccounttArray ? (
                    <>
                      {totalAccount?.total_accounts_data && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Your Accounts</p>
                          <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                            <div className='p-5 flex border-b border-[#E6ECF1]'>
                              <div className='flex justify-between w-full gap-2 '>
                                <div className='pl-2 max-[479px]:pl-0 flex w-full justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                  <div>
                                    <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                      {totalAccount?.total_accounts_data?.bank_name}
                                    </span>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      {totalAccount?.total_accounts_data?.account_type}
                                    </p>
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Account Number
                                    </p>
                                    {totalAccount?.total_accounts_data?.account_no && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {totalAccount?.total_accounts_data?.account_no}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                      Credit Limit Amount
                                    </p>
                                    {totalAccount?.total_accounts_data?.credit_limit !== null && (
                                      <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                        {totalAccount?.total_accounts_data?.credit_limit === 0
                                          ? totalAccount?.total_accounts_data?.credit_limit
                                          : `₹${totalAccount?.total_accounts_data?.credit_limit}`}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div>
                                      <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                        Status
                                      </p>
                                      {totalAccount?.total_accounts_data?.status && (
                                        <span
                                          className={`font-poppins font-semibold text-[15px] leading-7  ${
                                            totalAccount?.total_accounts_data?.status == 'Active'
                                              ? 'text-[#49D49D]'
                                              : 'text-[red]'
                                          }`}>
                                          {totalAccount?.total_accounts_data?.status === 'Active' ? 'Active' : 'Closed'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {accountDetailActive && (
                              <>
                                <div className=' p-5 border-b border-[#E6ECF1]'>
                                  <div className='grid grid-cols-2 border-b border-[#E6ECF1] pb-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                    <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                      Account Number
                                    </p>
                                    {totalAccount?.total_accounts_data?.account_no && (
                                      <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                        {totalAccount?.total_accounts_data?.account_no}
                                      </p>
                                    )}
                                  </div>
                                  <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                    <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                      Opening Date
                                    </p>
                                    {totalAccount?.total_accounts_data?.date_reported && (
                                      <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                        {formatOpenDateObj}
                                      </p>
                                    )}
                                  </div>
                                  <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                    <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                      Account Holder Type
                                    </p>
                                    {totalAccount?.total_accounts_data?.account_holder_type && (
                                      <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                        {totalAccount?.total_accounts_data?.account_holder_type}
                                      </p>
                                    )}
                                  </div>
                                  <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                    <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                      Amount Remaining
                                    </p>
                                    {totalAccount?.total_accounts_data?.amount_remaining && (
                                      <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                        {totalAccount?.total_accounts_data?.amount_remaining}
                                      </p>
                                    )}
                                  </div>
                                  <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                    <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                      Last Payment Date
                                    </p>
                                    {totalAccount?.total_accounts_data?.last_payment_date && (
                                      <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                        {formatDateLastPayObj}
                                      </p>
                                    )}
                                  </div>
                                  <div className='grid grid-cols-2 pt-[15px] max-[320px]:grid-cols-1'>
                                    <p className='text-[15px] font-normal text-[#212529] leading-[21px] items-center'>
                                      Highest Credit
                                    </p>
                                    {totalAccount?.total_accounts_data?.limit_used && (
                                      <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                        ₹{totalAccount?.total_accounts_data?.limit_used}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}

                            <div className='p-3'>
                              <button
                                onClick={() => setAccountDetailActive(!accountDetailActive)}
                                className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                {accountDetailActive ? 'Hide Details' : 'View Details'}

                                {accountDetailActive ? (
                                  <Image src={chevronDown} alt='up' className='rotate-180 w-3 h-3 shrink-0' />
                                ) : (
                                  <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {totalAccount?.total_accounts_data?.length > 0 && (
                        <div className='mt-5'>
                          <p className='text-[18px] font-medium leading-[25px] text-[#212529]'>Your Accounts</p>
                          {sortedAccounts?.map((acoountdata, index) => {
                            const dateform = moment(acoountdata?.opened_date)
                            const formatOpenDate = dateform.format('DD-MM-YYYY')

                            const dateStr = acoountdata?.last_payment_date
                            const formatDateLastPay = formatDateObj(dateStr.toString())

                            return (
                              <div key={index}>
                                <div className='border border-[#E6ECF1] rounded-2xl mt-3'>
                                  <div className='p-5 flex border-b border-[#E6ECF1]'>
                                    <div className='flex justify-between w-full gap-2 '>
                                      <div className='pl-2 max-[479px]:pl-0 flex w-full justify-between max-[576px]:flex-wrap max-[576px]:gap-y-4 max-[576px]:gap-x-4'>
                                        <div>
                                          <div className='font-poppins lg:w-[280px] font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                            {acoountdata?.bank_name}
                                          </div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            {acoountdata?.account_type}
                                          </p>
                                        </div>
                                        <div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            Account Number
                                          </p>
                                          {acoountdata?.account_no && (
                                            <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                              {acoountdata?.account_no}
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                            Credit Limit Amount
                                          </p>
                                          {acoountdata?.credit_limit !== null && (
                                            <span className='font-poppins font-semibold text-[15px] leading-7 text-[#212529] max-[479px]:leading-6'>
                                              {acoountdata?.credit_limit === 0
                                                ? acoountdata?.credit_limit
                                                : `₹${acoountdata?.credit_limit}`}
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          <div>
                                            <p className='font-poppins font-normal text-xs leading-6 text-[#212529]'>
                                              Status
                                            </p>
                                            {acoountdata?.status && (
                                              <span
                                                className={`font-poppins font-semibold text-[15px] leading-7  ${
                                                  acoountdata?.status == 'Active' ? 'text-[#49D49D]' : 'text-[red]'
                                                }`}>
                                                {acoountdata?.status === 'Active' ? 'Active' : 'Closed'}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {hSTotalAccount === index && (
                                    <>
                                      <div className=' p-5 border-b border-[#E6ECF1]'>
                                        <div className='grid grid-cols-2 border-b border-[#E6ECF1] pb-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                          <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                            Account Number
                                          </p>
                                          {acoountdata?.account_no && (
                                            <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                              {acoountdata?.account_no}
                                            </p>
                                          )}
                                        </div>
                                        <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                          <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                            Opening Date
                                          </p>
                                          {acoountdata?.date_reported && (
                                            <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                              {formatOpenDate}
                                            </p>
                                          )}
                                        </div>
                                        <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                          <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                            Account Holder Type
                                          </p>
                                          {acoountdata?.account_holder_type && (
                                            <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                              {acoountdata?.account_holder_type}
                                            </p>
                                          )}
                                        </div>
                                        <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                          <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                            Amount Remaining
                                          </p>
                                          {acoountdata?.amount_remaining && (
                                            <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                              ₹{acoountdata?.amount_remaining}
                                            </p>
                                          )}
                                        </div>
                                        <div className='grid grid-cols-2 border-b border-[#E6ECF1] py-[15px] items-center max-[320px]:grid-cols-1 max-[479px]:gap-4'>
                                          <p className='text-[15px] font-normal text-[#212529] leading-[21px]'>
                                            Last Payment Date
                                          </p>
                                          {acoountdata?.last_payment_date && (
                                            <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                              {formatDateLastPay}
                                            </p>
                                          )}
                                        </div>
                                        <div className='grid grid-cols-2 pt-[15px] max-[320px]:grid-cols-1'>
                                          <p className='text-[15px] font-normal text-[#212529] leading-[21px] items-center'>
                                            Highest Credit
                                          </p>
                                          {acoountdata?.limit_used && (
                                            <p className='text-[15px] font-medium text-[#212529] leading-[21px] mt-0'>
                                              ₹{acoountdata?.limit_used}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}

                                  <div className='p-3'>
                                    <button
                                      onClick={() => handleHideShowAccount(index)}
                                      className='text-[#49D49D] cursor-pointer text-[13px] w-full font-semibold flex items-center gap-2 justify-center font-[Faktum]'>
                                      {hSTotalAccount === index ? 'Hide Details' : 'View Details'}

                                      {hSTotalAccount === index ? (
                                        <Image src={chevronDown} alt='up' className='rotate-180 w-3 h-3 shrink-0' />
                                      ) : (
                                        <Image src={chevronDown} alt='up' className=' w-3 h-3 shrink-0' />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {SelectIndexCardScore === 5 && (
                <div className='p-[30px]'>
                  <div className='border border-[#E6ECF1] rounded-2xl p-5 relative'>
                    <div className='absolute top-[-15px] right-[15px]'>
                      <button className='bg-[#FFECDD] cursor-pointer text-[#D26D20] w-24 h-8 rounded-[20px] text-xs'>
                        Low Impact
                      </button>
                    </div>
                    <div className='flex items-center gap-5'>
                      <Image
                        src='/assets/credit-inquery.svg'
                        alt='creditEnquiries'
                        className='w-[46px] h-11'
                        width={10}
                        height={10}
                      />
                      <p className='text-xl font-normal font-[Poppins] max-[479px]:text-[15px] text-[#212529]'>
                        You have {enquiryData?.enquiry_details?.length} new credit enquiries
                      </p>
                    </div>
                    <div className='pl-6 pt-2 w-full max-[479px]:pl-0'>
                      <div className='flex justify-between mt-4 max-[425px]:block'>
                        <div className='flex w-[45%] justify-between max-[479px]:w-[80%] max-[479px]:ml-auto max-[479px]:mb-5'>
                          <div>
                            <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                              {enquiryData?.no_of_enquiry?.loan_enquiry || '0'}
                            </span>
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Enquiries for loan
                            </p>
                          </div>
                          <div>
                            <span className='font-poppins font-semibold text-lg leading-7 max-[479px]:text-[15px] text-[#212529] max-[375px]:text-[14px]'>
                              {enquiryData?.no_of_enquiry?.credit_card_enquiry || '0'}
                            </span>
                            <p className='font-poppins font-normal text-base leading-6 max-[479px]:text-[12px] text-[#212529]'>
                              Enquiries for credit card
                            </p>
                          </div>
                        </div>
                        <div className='bg-[#E5FFF5] py-1.5 px-6 w-[400px] max-[425px]:w-auto flex items-center justify-center'>
                          <div className='flex items-center justify-center'>
                            <Image src={likeBg} alt='img' className='mr-5' />
                            <p className='text-[15px] max-[479px]:text-[12px] text-[#212529] text-center'>
                              {enquiryData?.enquiry_details?.length <= 0
                                ? 'You have not made any credit enquiries in last 3 months'
                                : `You have made ${enquiryData?.enquiry_details?.length} enquiry in last 3 months`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {enquiryData?.enquiry_details && enquiryData?.enquiry_details?.length > 0 && (
                    <div className='border border-[#E6ECF1] rounded-2xl p-5 relative my-5'>
                      <CreditEnquiriesTable enquiryData={enquiryData} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {SelectIndexCardScore === 0 && (
        <div className='rounded-3xl  pt-8 max-sm:pt-2'>
          <>
            <PersonalisedCards
              productList={productList}
              bankAccountListing={bankAccountListing}
              bestFitCards={bestFitCards?.length > 0 ? bestFitCards?.slice(0, 5) : []}
              hideCreditHeading={true}
            />
          </>
          {bestFitCards?.length > 5 ? (
            <>
              <div className='flex items-end justify-end pr-4'>
                <button
                  className='rounded-[5px] flex items-center justify-center text-[#212529] head-text text-[18px] font-[faktum] border border-[#212529] bg-transparent w-[180px] py-[10px] cursor-pointer hover:shadow-md'
                  onClick={() => router.push('/my-profile/my-offer')}>
                  View more
                </button>
              </div>
            </>
          ) : (
            ''
          )}
          {/* random 3 eligible cards */}
          {/* <>
          HIDE IT FOR
            {filteredDataCard?.length > 0 || randomCreditCards?.length > 0 ? (
              <div className=''>
                <div className=' eligible-products-slider relative max-sm:px-2'>
                  <EligibileCards
                    eligbileHeading={true}
                    filteredDataCard={getCreditCards()}
                    creditFirst={true}
                    filteredBankAccountsData={getBankAccounts()}
                  />
                </div>
              </div>
            ) : (
              <div className='h-full flex justify-center items-center'>
                <p className='align-item-center-p text-[20px] text-center max-[479px]:text-[18px] max-[479px]:px-4'>
                  No eligible product available Please click here to{' '}
                  <Link href='/credit-cards/eligibility'>check eligibility</Link>
                </p>
              </div>
            )}
          </> */}
        </div>
      )}
    </>
  )
}
