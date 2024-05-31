import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import { handleRemoveLocalstorage } from '@/utils/util'
import axios from 'axios'
import jwt from 'jwt-decode'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import TagManager from 'react-gtm-module'
import toast, { Toaster } from 'react-hot-toast'

function LoginModalProfile() {
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()
  const logoutPathname = router?.asPath
  const leadprofileid = localStorage?.getItem('leadprofileid')
  const userData = localStorage?.getItem('userData')

  const handleLogout = () => {
    handleRemoveLocalstorage()
    router.reload()

    toast.success(ApiMessage?.logoutmessage)
    TagManager?.dataLayer({
      dataLayer: {
        event: 'user_logout',
        lead_profile_id: leadprofileid,
        name: userData?.full_name
      },
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const [scoreData, setScoreData] = useState()
  const token = localStorage.getItem('token')
  const leadId = localStorage.getItem('leadprofileid')

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

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Toaster />

      <div className='drop-menu-list'>
        <ul
          className={`absolute z-[1000] float-left m-0 min-w-max top-[3.9rem] max-[771px]:top-[3.5rem] max-[576px]:top-[3.5rem] max-[479px]:top-[3.8rem] max-[479px]:-right-2  right-0 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 w-[15%] max-[1024px]:w-[24%] max-[576px]:w-[30%] max-[479px]:[35%] account-popup`}>
          <li>
            <Link
              className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#212529] hover:!text-[#212529] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 max-[479px]:text-[13px]'
              href={{
                pathname: '/my-profile/profile'
              }}
              prefetch={false}
              data-te-dropdown-item-ref>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#212529] hover:!text-[#212529] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 max-[479px]:text-[13px]'
              href={token ? '/my-profile/my-offer' : '/my-profile/my-products'}
              prefetch={false}
              data-te-dropdown-item-ref>
              My Offer
            </Link>
          </li>
          <li className=''>
            <Link
              className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#212529] hover:!text-[#212529] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 max-[479px]:text-[13px]'
              href={{
                pathname: `${scoreData > 0 ? '/my-profile/credit-reports' : '/cibil-credit-score-check'}`
              }}
              prefetch={false}
              data-te-dropdown-item-ref>
              My Cibil Report
            </Link>
          </li>
          <li className='border-b'>
            <Link
              className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#212529] hover:!text-[#212529] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 max-[479px]:text-[13px]'
              href={{
                pathname: '/my-profile/my-applications'
              }}
              prefetch={false}
              data-te-dropdown-item-ref>
              My Application
            </Link>
          </li>
          <li onClick={() => handleLogout()}>
            <Link
              className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-[#212529] hover:!text-[#212529] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 max-[479px]:text-[13px]'
              href={logoutPathname}
              prefetch={false}
              data-te-dropdown-item-ref>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default LoginModalProfile
