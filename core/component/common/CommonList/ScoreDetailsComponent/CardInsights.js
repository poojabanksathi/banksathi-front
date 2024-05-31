import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'

function CardInsights({ querySlugInsight, setCreditInsightsTab, ScoreCurrent }) {
  const [paymentHistory, setPaymentHistory] = useState([])
  const [creditAge, setCreditAge] = useState([])
  const [creditUtilisation, setCreditUtilisation] = useState([])
  const [totalAccount, setTotalAccount] = useState([])
  const leadId = localStorage.getItem('leadprofileid')
  const token = localStorage.getItem('token')

  const router = useRouter()

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

      function formatUnixTimestamp(timestampexp) {
        const dateObj = new Date(timestampexp * 1000)
        const month = dateObj.getMonth() + 1
        const day = dateObj.getDate()
        const year = dateObj.getFullYear()
        const hours = dateObj.getHours()
        const minutes = dateObj.getMinutes()
        const seconds = dateObj.getSeconds()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedDate = `${month}/${day}/${year}, ${formatTimeexp(hours)}:${formatTimeexp(
          minutes
        )}:${formatTimeexp(seconds)} ${ampm}`
        return formattedDate
      }

      function formatTimeexp(time) {
        return time < 10 ? '0' + time : time
      }

      const formattedDateExp = formatUnixTimestamp(timestampexp)

      if (CurruntTime === formattedDateExp) {
        router.push('/login')
        toast.success(ApiMessage?.logoutmessage)
        handleRemoveLocalstorage()
      }
    }
  }, [])

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
  const getMonthData = (month) => {
    return ((month / 12) | 0) + ' years and ' + (month % 12) + ' months'
  }
  function statusCounter() {
    let counter = 0
    for (const input of creditAge?.credit_account_datas) {
      if (input.status === 'Active') counter += 1
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
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        } else if (error?.response?.status == 500) {
        }
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

  useEffect(() => {
    if (token) {
      GetPaymentHistory()
      GetCreditAge()
      GetCreditUtilisation()
      GetTotalAccount()
    }
  }, [])
  return (
    <>
      <Toaster />
      {ScoreCurrent?.current_score !== 0 && (
        <div className='credit-insights'>
          <div className='pb-4 '>
            <p className='text-[#212529] head-text font-[faktum] xl:text-4xl lg:text-3xl md:text-2xl  max-[576px]:text-[28px] max-[479px]:text-[22px] font-semibold max-[479px]:text-center '>
              Credit Insights
            </p>
          </div>
          <div className='rounded-3xl bg-white card-insight max-[479px]:rounded-none'>
            <div className='flex px-6 justify-between gap-5 py-5 border-b'>
              <div className='flex items-center gap-5'>
                <div className='xl:w-[46px] md:w-[46px] '>
                  <Image
                    src='/assets/invest-price.svg'
                    alt='card image'
                    width={46}
                    height={46}
                    className='xl:w-full md:w-full max-[479px]:mx-auto'
                    unoptimized={true}
                  />
                </div>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] font-[Poppins] max-[479px]:text-[15px]'>
                    Payment History
                  </p>
                  <p className='text-[15px] text-[#212529] font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                    Impact - High
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div>
                  {paymentHistory?.total_late_payment == 0 && (
                    <p className='text-[18px] text-[#212529] font-medium leading-[25px] text-right font-[Poppins] max-[479px]:text-[15px]'>
                      {paymentHistory?.total_late_payment == 0 && '100%'}
                    </p>
                  )}
                  <p className='text-[15px] text-[#49D49D] font-normal leading-[21px] text-right font-[Poppins] max-[479px]:text-[12px]'>
                    Excellent
                  </p>
                </div>
                <Link href='/my-profile/credit-reports' prefetch={false}>
                  <div
                    className='w-[28px] h-[20px] max-[479px]:w-4 max-[479px]:h-3'
                    onClick={() => setCreditInsightsTab(1)}>
                    <Image
                      src='/assets/RightShortArrow.svg'
                      alt='card image'
                      width={28}
                      height={20}
                      className='xl:w-full md:w-full max-[479px]:mx-auto'
                      unoptimized={true}
                    />
                  </div>
                </Link>
              </div>
            </div>

            <div className='flex px-6 justify-between gap-5 py-5 border-b'>
              <div className='flex items-center gap-5'>
                <div className='xl:w-[46px] md:w-[46px] '>
                  <Image
                    src='/assets/credit-utilisation.svg'
                    alt='card image'
                    width={46}
                    height={46}
                    className='xl:w-full md:w-full max-[479px]:mx-auto'
                    unoptimized={true}
                  />
                </div>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] font-[Poppins] max-[479px]:text-[15px]'>
                    Credit Card Utilisation
                  </p>
                  <p className='text-[15px] text-[#212529] font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                    Impact - High
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div>
                  {paymentHistory.total_credit_limit === paymentHistory.total_spends ? (
                    <p className='text-[18px] text-[#212529] font-medium leading-[25px] text-right font-[Poppins] max-[479px]:text-[15px]'>
                      100%
                    </p>
                  ) : (
                    ''
                  )}
                  <p className='text-[15px] text-[#49D49D] font-normal leading-[21px] text-right font-[Poppins] max-[479px]:text-[12px]'>
                    Excellent
                  </p>
                </div>
                <Link href='/my-profile/credit-reports' prefetch={false}>
                  <div
                    className='w-[28px] h-[20px] max-[479px]:w-4 max-[479px]:h-3'
                    onClick={() => setCreditInsightsTab(2)}>
                    <Image
                      src='/assets/RightShortArrow.svg'
                      alt='card image'
                      width={28}
                      height={20}
                      className='xl:w-full md:w-full max-[479px]:mx-auto'
                      unoptimized={true}
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className='flex px-6 justify-between gap-5 py-5 border-b'>
              <div className='flex items-center gap-5'>
                <div className='xl:w-[46px] md:w-[46px] '>
                  <Image
                    src='/assets/total-account.svg'
                    alt='card image'
                    width={46}
                    height={46}
                    className='xl:w-full md:w-full max-[479px]:mx-auto'
                    unoptimized={true}
                  />
                </div>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] font-[Poppins] max-[479px]:text-[15px]'>
                    Credit Age
                  </p>
                  <p className='text-[15px] text-[#212529] font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                    Impact - Medium
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] text-right font-[Poppins] max-[479px]:text-[15px] totle-mont-respo'>
                    {getMonthData(creditAge?.max_age_of_account)}
                  </p>
                  <p className='text-[15px] text-[#49D49D] font-normal leading-[21px] text-right font-[Poppins] max-[479px]:text-[12px]'>
                    Excellent
                  </p>
                </div>
                <Link href='/my-profile/credit-reports' prefetch={false}>
                  <div
                    className='w-[28px] h-[20px] max-[479px]:w-4 max-[479px]:h-3'
                    onClick={() => setCreditInsightsTab(3)}>
                    <Image
                      src='/assets/RightShortArrow.svg'
                      alt='card image'
                      width={28}
                      height={20}
                      className='xl:w-full md:w-full max-[479px]:mx-auto'
                      unoptimized={true}
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className='flex px-6 justify-between gap-5 py-5 border-b'>
              <div className='flex items-center gap-5'>
                <div className='xl:w-[46px] md:w-[46px] '>
                  <Image
                    src='/assets/credit-inquery.svg'
                    alt='card image'
                    width={46}
                    height={46}
                    className='xl:w-full md:w-full max-[479px]:mx-auto'
                    unoptimized={true}
                  />
                </div>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] font-[Poppins] max-[479px]:text-[15px]'>
                    Total Account
                  </p>
                  <p className='text-[15px] text-[#212529] font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                    Impact - Low
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] text-right font-[Poppins] max-[479px]:text-[15px]'>
                    {parseInt(totalAccount?.total_active_accounts) + parseInt(totalAccount?.total_inactive_accounts)}
                  </p>
                  <p className='text-[15px] text-[#49D49D] font-normal leading-[21px] text-right font-[Poppins] max-[479px]:text-[12px]'>
                    Excellent
                  </p>
                </div>
                <Link href='/my-profile/credit-reports' prefetch={false}>
                  <div
                    className='w-[28px] h-[20px] max-[479px]:w-4 max-[479px]:h-3'
                    onClick={() => setCreditInsightsTab(4)}>
                    <Image
                      src='/assets/RightShortArrow.svg'
                      alt='card image'
                      width={28}
                      height={20}
                      className='xl:w-full md:w-full max-[479px]:mx-auto'
                      unoptimized={true}
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className='flex px-6 justify-between gap-5 py-5 border-b'>
              <div className='flex items-center gap-5'>
                <div className='xl:w-[46px] md:w-[46px] '>
                  <Image
                    src='/assets/invest-price.svg'
                    alt='card image'
                    width={46}
                    height={46}
                    className='xl:w-full md:w-full max-[479px]:mx-auto'
                    unoptimized={true}
                  />
                </div>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] font-[Poppins] max-[479px]:text-[15px]'>
                    Credit Inquiry
                  </p>
                  <p className='text-[15px] text-[#212529] font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px]'>
                    Impact - Low
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div>
                  <p className='text-[18px] text-[#212529] font-medium leading-[25px] text-right font-[Poppins] max-[479px]:text-[15px]'>
                    100%
                  </p>
                  <p className='text-[15px] text-[#49D49D] font-normal leading-[21px] text-right font-[Poppins] max-[479px]:text-[12px]'>
                    Excellent
                  </p>
                </div>
                <Link href='/my-profile/credit-reports' prefetch={false}>
                  <div
                    className='w-[28px] h-[20px] max-[479px]:w-4 max-[479px]:h-3'
                    onClick={() => setCreditInsightsTab(5)}>
                    <Image
                      src='/assets/RightShortArrow.svg'
                      alt='card image'
                      width={28}
                      height={20}
                      className='xl:w-full md:w-full max-[479px]:mx-auto'
                      unoptimized={true}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardInsights
