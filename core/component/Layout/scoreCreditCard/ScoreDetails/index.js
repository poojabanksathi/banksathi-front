import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { handleRemoveLocalstorage } from '@/utils/util'
import jwt from 'jwt-decode'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ScoreDetailBredcrumb = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/ScoreDetailBredcrumb'),
  {
    ssr: false
  }
)
const LoginPopUp = dynamic(() => import('@/core/component/common/LoginPopUp'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const KnowledgeBase = dynamic(() => import('@/core/component/common/CommonList/KnowledgeBase'), {
  ssr: false
})
const ScoreFilterData = dynamic(
  () => import('@/core/component/common/CommonList/ScoreDetailsComponent/ScoreFilterData'),
  {
    ssr: false
  }
)

function ScoreDetails({ faqdata, productList,bankAccountListing }) {
  const token = localStorage?.getItem('token')

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

  return (
    <>
      <Toaster />
      {token ? (
        <>
          <div className='container px-20 max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-0  mx-auto max-[991px]:max-w-full pt-[50px] max-[479px]:pt-[25px]'>
            {/* <ScoreDetailBredcrumb /> */}
            <ScoreFilterData productList={productList} bankAccountListing={bankAccountListing}/>
          </div>
          <div className='pb-10' />
          {/* <div className='px-20 max-[1024px]:px-8 max-[479px]:px-0'>
            <FAQ faqdata={faqdata} />
          </div> */}
        </>
      ) : (
        <LoginPopUp />
      )}
    </>
  )
}

export default ScoreDetails
