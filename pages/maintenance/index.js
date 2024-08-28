import React from 'react'
import dynamic from 'next/dynamic'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'


const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

const DynamicErrorModal = dynamic(() => import('../../core/component/common/ApiErrorModal'), {
  ssr: false
})

export default function Index({ businessCategorydata }) {
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  return (
    <>
      <div>
      <Head>
          <title>{metaInfo?.pageTitle}</title>
          <link rel='canonical' href={modifiedUrl} />
          <meta name='description' content={metaInfo?.pageDescription} />
          {process.env.NEXT_PUBLIC_WEBSITE_URL == 'www.banksathi.com' ? (
            <meta name='robots' content='index,follow' />
          ) : (
            <meta name='robots' content='noindex,nofollow' />
          )}
          <meta name='og:title' content={metaInfo?.ogTitle} />
          <meta name='og:type' content={metaInfo?.ogType} />
          <meta name='og:url' content={getOgUrl} />
          <meta name='og:description' content={metaInfo?.ogDescription} />
          <meta name='og:image' content={metaInfo?.ogImage} />
          <meta name='og:image:secure' content={metaInfo?.ogImage} />

          <meta name='og:image:width' content='300' />
          <meta name='og:image:height' content='300' />
          <meta name='og:image:alt' content={metaInfo?.ogImageAlt} />
          <meta name='og:image:type' content={metaInfo?.ogImageType} />
          <meta name='og:site_name' content={metaInfo?.ogSiteName} />
          <meta name='twitter:card' content={metaInfo?.twitterCard} />
          <meta name='twitter:site' content={metaInfo?.twitterSite} />
          <meta name='twitter:title' content={metaInfo?.twitterTitle} />
          <meta name='twitter:description' content={metaInfo?.twitterDes} />
          <meta name='twitter:image' content={metaInfo?.twitterImage} />
          <meta name='twitter:image:alt' content={metaInfo?.ogSiteName} />
          <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
          <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
        </Head>
        <div className='bg-[#844FCF]'>
          <DynamicHeader />
        </div>
        <div className='bg-[#fff]'>
          <DynamicErrorModal />
          <MobileFooter />
     
        </div>
      </div>

    </>
  )
}
