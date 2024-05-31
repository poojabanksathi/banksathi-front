import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import withAuth from '../../common/PrivateRoute'
import jwt from 'jwt-decode'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { handleRemoveLocalstorage } from '@/utils/util'

const ProfileSet = dynamic(() => import('@/core/component/common/ProfileSet'), {
  ssr: false
})

function SetUpProfile() {
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

  return (
    <>
      <Toaster />
      <div className='container mt-[30px] max-sm:mt-[10px] pb-[100px] flex flex-col items-center justify-center pb-22 mx-auto px-20 max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4  max-[375px]:px-4 max-[320px]:px-4 h-auto  max-[479px]:h-auto max-sm:pt-[24px]'>
        <div className="text-center text-neutral-800 xl:text-3xl text-[21px] leading-[28.8px] font-semibold font-['Faktum'] xl:leading-[50.40px]">
          Login: your key to Financial world
        </div>
        <div className='mt-[25px] md:w-[585px] w-full bg-white rounded-[14px] shadow-lg max-[576px]:shadow-none  pt-[40px] px-[60px] pb-[40px] max-[1024px]:px-[50px] max-[834px]:p-[30px] max-[479px]:py-[20px] max-sm:px-[20px]'>
          <ProfileSet leadId={leadId} token={token} />
        </div>
      </div>
    </>
  )
}

export default withAuth(SetUpProfile)
