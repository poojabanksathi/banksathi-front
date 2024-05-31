import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { handleRemoveLocalstorage } from '@/utils/util'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      if (isAuthenticated) {
        const decordtoken = jwt(isAuthenticated)

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
      if (typeof window !== 'undefined') {
        const token = window?.localStorage?.getItem('token')
        if (token) {
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      }
    }, [])

    return (
      <>
        <Toaster />
        {isAuthenticated ? <WrappedComponent {...props} /> : null}
      </>
    )
  }

  return Wrapper
}

export default withAuth
