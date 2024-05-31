import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'

const NotAuthorized = dynamic(() => import('../../core/component/Layout/NotAuthorized'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

export default function Index({ businessCategorydata }) {
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const CDN_URL_http = CDN_URL?.replace('https', 'http')
  return (
    <>
      <div>
        <div className='bg-[#844FCF]'>
          <DynamicHeader />
        </div>
        <div className='bg-[#fff]'>
          <NotAuthorized />
          <MobileFooter />

          <DynamicFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}
