import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import '@/styles/style.css'
import 'react-datepicker/dist/react-datepicker.css'
import '@/styles/leadsStyle.css'
import { Poppins } from 'next/font/google'
import ErrorBoundary from '@/core/ErrorBoundary/ErrorBoundary'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { setHash } from '@/utils/util'
import { v4 as uuidv4 } from 'uuid'
import HeaderComp from '@/core/component/common/HeaderComp/HeaderComp'
import NextNProgress from 'nextjs-progressbar'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  const [value, setValue] = useState()
  const router = useRouter()

  const isLandingPage = router.asPath?.includes('landing')
  const tryFrontUrl = process.env.NEXT_PUBLIC_WEBSITE_URL

  const getDeviceId = () => {
    let deviceId = typeof window !== 'undefined' && Cookies.get('deviceId')
    if (!deviceId) {
      deviceId = uuidv4()
      if (typeof window !== 'undefined') {
        Cookies.set('deviceId', deviceId, {
          expires: 365, 
          secure: true
        })
      }
    }
    return deviceId
  }

  useEffect(() => {
    TagManager?.initialize({ gtmId: 'GTM-W9D3PRCF' })
    const h = router?.query?.h
    if (!h) {
      sessionStorage.removeItem('h')
    }
  }, [router?.query?.h])

  useEffect(() => {
    if (pageProps?.referer) {
      const refValue = pageProps?.referer?.split('/')?.[2]
      if (refValue !== tryFrontUrl && refValue !== 'www.banksathi.com') {
        sessionStorage.setItem('refererOutside', pageProps?.referer)
      }
    }
  }, [pageProps?.referer, tryFrontUrl])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setValue(sessionStorage?.getItem('refererOutside'))
    }
  }, [value])

  useEffect(() => {
    getDeviceId()
    if (router?.query?.utm_source) {
      if (typeof window !== 'undefined') {
        const pathname = window?.location?.href
        localStorage.setItem('url', pathname)
      }
    }
  }, [router?.query?.utm_source])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (router?.query?.h) {
        setHash(router?.query?.h)
        localStorage.setItem('h', router?.query?.h)
      }
    }
  }, [router?.query?.h])

  const handleGTM = () => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    const pageUrl = router?.asPath.split('?')[0];

    window.dataLayer.push({
      dataLayer: {
        event: 'page_view',
        page_url: pageUrl,
        date: formattedDate,
      },
    });
  };

  useEffect(() => {
    handleGTM();
  }, [router.asPath]);

  useEffect(() => {
    if (pageProps?.leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('leadsParams', JSON.stringify(pageProps?.leadsParams))
      }
    }
  }, [pageProps?.leadsParams])

  useEffect(() => {
    const disablePinchZoom = (event) => {
      if (event?.touches?.length > 1) {
        event.preventDefault()
      }
    }
    document.addEventListener('touchmove', disablePinchZoom, { passive: false })
    return () => {
      document.removeEventListener('touchmove', disablePinchZoom)
    }
  }, [])

  return (
    <>
      <ErrorBoundary>
        <main className={poppins.className}>
          {!isLandingPage && <HeaderComp metaData={pageProps?.businessmetaheadtag} />}
          <NextNProgress color='#49D49D' height={3} />
          <Component {...pageProps} />
        </main>
      </ErrorBoundary>
    </>
  )
}
