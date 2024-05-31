/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import downLoadIcon from '../../../../../public/assets/download-icon.svg'
import QuetionIconError from '../../../../../public/assets/quetion-error-icon.svg'
import refreshIcon from '../../../../../public/assets/refresh.svg'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import Chart from '../../Chart/Chart'
import axios from 'axios'
import { BASE_URL, CIBIL, USERSET } from '@/utils/alljsonfile/service'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getFormattedDate, handleRemoveLocalstorage } from '@/utils/util'
import moment from 'moment'
import {
  badCreditScoreTitle,
  badScore,
  excellentScore,
  excellentScoreTitle,
  fairScore,
  fairScoreTitle,
  goodScore,
  goodScoreTitle,
  noCreditScore,
  noCreditScoreTitle
} from '@/utils/alljsonfile/cardinsightsjson'
import Cookies from 'js-cookie'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'
import { useWindowSize } from '@/hooks/useWindowSize'
import TagManager from 'react-gtm-module'

function ScoreExcellentGarph({ ScoreCurrent, GetScoreHistory }) {
  const [graph, setGraph] = useState(false)
  const [historyTime, setHistoryTime] = useState('')
  const [historyScore, setHistoryScore] = useState(0)
  const [profileformData, setProfileFormdata] = useState([])
  const [timeArray, setTimeArray] = useState([])
  const [creditScoreTooltip, setCreditScoreTooltip] = useState('')
  const [creditScoreTitle, setScoreTitle] = useState('')
  const [refreshDate, setRefreshDate] = useState(null)
  const [fieldValue, setFieldValue] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const size = useWindowSize();
  const mobileSize = size?.width <= 576;

  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const localUserData = typeof window !== 'undefined' && localStorage?.getItem('userData')
  const leadsParams = typeof window !== 'undefined' && sessionStorage?.getItem('leadsParams')

  const deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')

  const leadIPData = leadsParams && JSON?.parse(leadsParams)
  const userData = localUserData && JSON.parse(localUserData)

  const router = useRouter()

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
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
          setProfileFormdata(response?.data?.data?.eligible_product)
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(response?.data?.data))
        }
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          router.push('/login')
          toast.success(ApiMessage?.logoutmessage)
          handleRemoveLocalstorage()
        }
      })
  }

  // ----------CIBIL FROM EXPERIAN API ------------- //
  const getCibilFromExperian = (fromPan = false) => {
    setIsLoading(true)
    let params = {
      full_name: userData?.full_name,
      mobile_no: String(userData?.mobile) || '',
      gender: userData?.gender?.toLowerCase() || '',
      dob: userData?.dob || null,
      email: userData?.email ? userData?.email : 'abc@gmail.com',
      pan: userData?.pan_no && userData?.pan_no,
      pin_code: userData?.pin_code || null,
      request_id: '',
      terms: 'agree',
      lead_profile_id: leadId || ''
    }
    if (leadIPData?.user_agent) params = { ...params, user_agent: leadIPData?.user_agent }
    if (deviceId) params = { ...params, device_id: deviceId }
    if (leadIPData?.ip) params = { ...params, ip_address: leadIPData?.ip }
    if (fieldValue) params = { ...params, utm_details: fieldValue }

    axios
      .post(BASE_URL + CIBIL?.withoutotpcibil, params, { headers: headersAuth })
      .then((response) => {
        setIsLoading(false)
        if (response?.data?.message === 'success') {
          if (response?.data?.data?.info === 'Cibil  generated!!') {
            GetScoreHistory(true)
          }
        }
      })
      .catch((error) => {
        setIsLoading(false)
        // errorHandling()
      })
  }

  const handleChange = (e) => {
    getCibilFromExperian()
  }

  function isDateWithinLast30Days() {
    const oldDateStr = ScoreCurrent?.credit_history[0]?.time
    if (oldDateStr) {
      const targetDateParts = oldDateStr?.split('-')
      const targetYear = parseInt(targetDateParts[2], 10)
      const targetMonth = parseInt(targetDateParts[1], 10) - 1
      const targetDay = parseInt(targetDateParts[0], 10)
      const targetDate = new Date(targetYear, targetMonth, targetDay)
      const currentDate = new Date()
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(currentDate.getDate() - 30)
      return targetDate >= thirtyDaysAgo && targetDate <= currentDate
    } else {
      return false
    }
  }

  const handleClick = () => {
    if (graph) {
      setGraph(false)
    } else {
      setGraph(true)
    }
  }
  const chartData = {
    labels: timeArray,
    datasets: [
      {
        label: 'Score',
        fill: false,
        lineTension: 0,
        backgroundColor: '#A882DD',
        borderColor: '#844FCF',
        borderCapStyle: 'butt',
        pointBorderColor: '#844FCF',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 6,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: '#844FCF',
        pointHoverBorderColor: '#844FCF',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: ScoreCurrent?.credit_history.map((d) => d?.score)?.reverse()
      }
    ]
  }

  const options = {
    title: {
      display: true,
      text: 'Credit score history',
      fontSize: 25
    },
    scales: {
      y: {
        min: 300,
        max: 900,
        ticks: {
          stepSize: 100,
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Y-Axis Label'
        }
      }
    }
  }

  const getRefreshDate = () => {
    const timesList = ScoreCurrent?.credit_history?.map((item) => item?.time)?.reverse()
    if (timesList) {
      const lastPaymentDate = timesList?.[timesList?.length - 1]
      const numberOfDaysToAdd = 30
      if (lastPaymentDate) {
        const dateParts = lastPaymentDate.split('-')
        const targetDate = getFormattedDate(dateParts)
        // Add 30 days to the target date
        targetDate?.setDate(targetDate?.getDate() + numberOfDaysToAdd)
        const today = new Date()
        const differenceInMs = targetDate.getTime() - today.getTime()
        const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24))
        setRefreshDate(differenceInDays)
        return differenceInDays
      }
    }
  }

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

  useEffect(() => {
    if (ScoreCurrent?.current_score === 0) {
      router.push('/cibil-credit-score-check')
    }
    if (ScoreCurrent?.current_score === 0) {
      setScoreTitle(noCreditScoreTitle)
      setCreditScoreTooltip(noCreditScore)
    }
    if (ScoreCurrent?.current_score > 0 && ScoreCurrent?.current_score < 580) {
      setScoreTitle(badCreditScoreTitle)
      setCreditScoreTooltip(badScore)
    }
    if (ScoreCurrent?.current_score >= 580 && ScoreCurrent?.current_score < 670) {
      setScoreTitle(fairScoreTitle)
      setCreditScoreTooltip(fairScore)
    }
    if (ScoreCurrent?.current_score >= 670 && ScoreCurrent?.current_score < 740) {
      setScoreTitle(goodScoreTitle)
      setCreditScoreTooltip(goodScore)
    }
    if (ScoreCurrent?.current_score >= 740 && ScoreCurrent?.current_score <= 900) {
      setScoreTitle(excellentScoreTitle)
      setCreditScoreTooltip(excellentScore)
    }
    getRefreshDate()
  }, [ScoreCurrent?.current_score])

  useEffect(() => {
    if (token) {
      GetUserSetUp()
    }
  }, [])

  useEffect(() => {
    if (ScoreCurrent?.credit_history) {
      ScoreCurrent.credit_history.forEach((historyData, index) => {
        setHistoryScore(historyData?.score)
        setHistoryTime(historyData?.time)
      })
      const timesArray = ScoreCurrent?.credit_history?.map((item) => {
        return moment(getFormattedDate(item?.time?.split('-'))).format('MM/YY')
      })
      setTimeArray(timesArray?.reverse())
    }
  }, [ScoreCurrent?.credit_history])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      setFieldValue(utm_details)
    }
  }, [])

  const refreshDisable = isDateWithinLast30Days()

  const handleGTM = () => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
    if (historyScore < 0) {
      TagManager?.dataLayer({
        dataLayer: {
          event: 'credit_score_checked',
          credit_score: creditScoreTitle.split(' ')[0] || 'Na',
          date: formattedDate,
        },
      });
    } else {
      TagManager?.dataLayer({
        dataLayer: {
          event: 'credit_score',
          Source:  fieldValue || "",
          date: formattedDate,
        },
      });
    }
  };
  
  
console.log(ScoreCurrent, "ScoreCurrentScoreCurrent");
useEffect(() => {
  if(historyScore){

    handleGTM()
  }
},[historyScore])

  return (
    <>
      {isLoading && <LoaderComponent />}
      <Toaster />
      <div className='credit-report'>
        <div className='rounded-3xl bg-white card-insight font-[Poppins] max-[479px]:rounded-none'>
          {graph ? (
            <div className='px-[30px] pt-[30px] border-b'>
              <p className='text-[18px] font-medium leading-[25px] font-[Poppins] text-[#212529]'>Credit History</p>
              <Line data={chartData} options={options} />
            </div>
          ) : (
            <>
              <div className='p-[30px] max-[479px]:p-4'>
                <p className='text-[18px] max-sm:text-[15px] font-normal leading-[25px] font-[Poppins] text-[#212529]'>
                  Hey <span className='font-medium text-[16px]'>{userData?.full_name},</span> here’s your score!
                </p>
              </div>
              <div className='grid grid-cols-2 justify-between gap-5 pb-6 px-[60px] max-[479px]:px-4 max-[771px]:px-[30px] items-center border-b max-[576px]:grid-cols-1 max-[479px]:flex-col cards-details-filter'>
                <div className='text-center'>
                  {historyScore > 0 ? (
                    <Chart ScoreCurrent={ScoreCurrent?.current_score} />
                  ) : (
                    <Link
                      href={`${'/cibil-credit-score-check'}`}
                      prefetch={false}
                      className='text-[#212529] hover:text-white '>
                      <button className='!text-[#212529] cursor-pointer hover:!text-[#212529] duration-300 hover:border-[#49d49d] mb-2 hover:bg-[#49d49d]  head-text font-[faktum] text-[18px] px-6 py-2  w-auto h-full font-semibold border rounded-lg border-[#212529]  '>
                        Check Now
                      </button>
                    </Link>
                  )}
                  <div
                    className={`flex  items-center gap-2 max-sm:text-[12px] max-sm:justify-center max-sm:ml-0 ml-[20px] ${
                      historyScore > 0 ? 'justify-start' : 'justify-center pt-3'
                    }`}>
                    <p className='text-[15px] font-medium font-[Poppins] text-[#212529]'>Excellent Credit Score</p>
                    <div className='tooltip'>
                      <Image src={QuetionIconError} alt='img' className='' />
                      <span className='tooltiptext'>{creditScoreTooltip} </span>
                    </div>
                  </div>
                  {!refreshDisable && (
                    <div className={` flex justify-start items-center sm:pl-[3rem] gap-2  max-sm:justify-center py-4 `}>
                      <div className='tooltip'>
                        <button
                          onClick={(e) => handleChange(e)}
                          className='  flex items-center justify-center gap-2.5 text-[13px] font-semibold font-[Faktum] text-[#212529] border-[1px] leading-[16.31px] w-[145px] h-[36px] max-[320px]:w-[130px]'>
                          <Image src={refreshIcon} alt='img' className='' />
                          Refresh Score
                        </button>
                        {refreshDate > 0 && <span className='tooltiptext'>Refresh after {refreshDate} days</span>}
                      </div>
                      {mobileSize &&
                      <div className='flex items-center gap-2 cursor-pointer'>
                    <Image src={downLoadIcon} className='' alt='download' />
                    <Link href='/my-profile/credit-score-pdf' target='_blank'>
                      <p className='text-[15px] max-[479px]:text-[13px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[11px]'>
                        View and Print Report
                      </p>
                    </Link>
                  </div>
                  }
                    </div>
                  )}
                </div>
                <div className='font-[Poppins] max-[479px]:pt-2 max-sm:hidden'>
                  <p className='text-[18px] text-[#212529] font-semibold leading-[33.6px]'>{creditScoreTitle}</p>
                  <p className='text-[15px] text-[#212529] font-normal leading-[21px]'>{creditScoreTooltip} </p>
                </div>
              </div>
            </>
          )}
          <div
            className={`flex items-center gap-5 pt-4 justify-end py-5 px-[30px] max-[479px]:px-4 max-sm:hidden ${
              graph ? 'max-[479px]:justify-center' : 'max-[479px]:justify-between'
            }`}>
            {graph
              ? ''
              : ScoreCurrent?.current_score > 0 && (
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <Image src={downLoadIcon} className='' alt='download' />
                    <Link href='/my-profile/credit-score-pdf' target='_blank'>
                      <p className='text-[15px] max-[479px]:text-[13px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[11px]'>
                        View and Print Report
                      </p>
                    </Link>
                  </div>
                )}
            <button
              className='text-[#212529] cursor-pointer max-[479px]:text-[13px] font-[faktum] py-2 px-4 w-auto rounded-lg border border-[#000] font-semibold text-[15px] max-[320px]:text-[11px] '
              onClick={handleClick}>
              {graph ? 'View Credit Score' : 'View Credit History'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScoreExcellentGarph
