import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import scoreCredit from '../../../../../public/assets/score-credit-banner.svg'
import Link from 'next/link'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import jwt from 'jwt-decode'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'
import CreditListingBanner from '../../creditCardList/CreditListingBanner'

function KnowledgeCard({ metaData }) {
  const [scoreData, setScoreData] = useState()
  const token = localStorage.getItem('token')
  const leadId = localStorage.getItem('leadprofileid')

  const router = useRouter()

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

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
  const GetScoreHistory = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.creditscorehistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setScoreData(response?.data?.current_score)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        }
      })
  }

  useEffect(() => {
    if (token) {
      GetScoreHistory()
    }
  }, [])

  return (
    <>
      <Toaster />
      <div
        className={`container h-full mx-auto max-[991px]:max-w-full pt-[20px] pb-[150px] max-sm:pt-[10px] max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4
        }`}>
        <CreditListingBanner
          businessmetaheadtag={metaData}
          src={metaData?.h1_paragraph?.product_image ? `${Img_URL}/${metaData?.h1_paragraph?.product_image}` : null}
          linesToShow={2}
          paddingTop={true}
        />
        <div className='flex items-center justify-start px-14 mt-[30px] max-sm:px-4 max-sm:mt-[20px]'>
          <div className='flex flex-col gap-5 text-center max-[576px]:text-center'>
            <Link
              href={`${scoreData > 0 ? '/my-profile/credit-reports' : '/cibil-credit-score-check'}`}
              prefetch={false}
              className='text-[#212529] hover:text-white'>
              <button className=' w-[200px] head-text cursor-pointer font-[faktum] max-[576px]:mx-auto py-4 px-6 border text-[16px] border-white bg-[#49D49D] rounded-lg text-[#212529]  hover:bg-[#844FCF] hover:text-[#212529] duration-200 font-semibold '>
                Check Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default KnowledgeCard
