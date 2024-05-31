import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'
import React from 'react'

const HeaderComp = ({ metaData, isLandingPage }) => {
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const CDN_URL_http = CDN_URL?.replace('https', 'http')

  const ogSiteName = metaData?.og_site_name === 'banksathi' ? 'BankSathi' : metaData?.og_site_name

  return (
    <Head>
      <title>{metaData?.meta_title || metaInfo?.pageTitle}</title>
      <link rel='canonical' href={modifiedUrl} />
      <link rel="dns-prefetch" href={ CDN_URL }/>
      <link rel="dns-prefetch" href="https://media.banksathi.com"/>
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
      <meta name='description' content={metaData?.meta_description || metaInfo?.pageDescription} />
      {
        process.env.NEXT_PUBLIC_WEBSITE_URL === 'www.banksathi.com' && isLandingPage ? (
          <meta name='robots' content='noindex,nofollow' />
        ) : process.env.NEXT_PUBLIC_WEBSITE_URL === 'www.banksathi.com' ? (
          <meta name='robots' content='index,follow' />
        ) : (
          <meta name='robots' content='noindex,nofollow' />
        )
      }
      <meta name='og:title' content={metaData?.og_title || metaInfo?.ogTitle} />
      <meta name='og:type' content={metaData?.og_type || metaInfo?.ogType} />
      <meta name='og:url' content={getOgUrl} />
      <meta name='og:description' content={metaData?.og_description || metaInfo?.ogDescription} />
      <meta
        name='og:image'
        content={metaData?.og_image == null || undefined ? CDN_URL_http : CDN_URL_http + '/' + metaData?.og_image}
      />
      <meta
        name='og:image:secure'
        content={metaData?.og_image == null || undefined ? CDN_URL : CDN_URL + '/' + metaData?.og_image}
      />
      {/* <meta name='og:image:width' content='300' />
      <meta name='og:image:height' content='300' /> */}
      <meta name='og:image:alt' content={metaData?.og_image_alt || metaInfo?.ogImageAlt} />
      <meta name='og:image:type' content={metaData?.og_image_type || metaInfo?.ogImageType} />
      <meta name='og:site_name' content={ogSiteName || metaInfo?.ogSiteName} />
      <meta name='twitter:card' content={metaData?.twitter_card || metaInfo?.twitterCard} />
      <meta name='twitter:site' content={metaData?.twitter_sit || metaInfo?.twitterSite} />
      <meta name='twitter:title' content={metaData?.twitter_title || metaInfo?.twitterTitle} />
      <meta name='twitter:description' content={metaData?.twitter_description || metaInfo?.twitterDes} />
      <meta
        name='twitter:image'
        content={metaData?.twitter_image == null || undefined ? CDN_URL : CDN_URL + '/' + metaData?.twitter_image}
      />
      <meta name='twitter:image:alt' content={metaData?.twitter_img_alt || metaInfo?.ogSiteName} />
      <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
      <link rel='icon' sizes='16x16' href='/favicon-16x16.png' prefetch={false} />
      <link rel='icon' sizes='32x32' href='/favicon-32x32.png' prefetch={false} />
      <link rel='icon' sizes='96x96' href='/favicon-96x96.png' prefetch={false} />
      <link rel='ms-icon' sizes='144x144' href='/ms-icon-144x144.png' prefetch={false} />
      <link rel='ms-icon' sizes='70x70' href='/ms-icon-70x70.png' prefetch={false} />
      <link rel='ms-icon' sizes='150x150' href='/ms-icon-150x150.png' prefetch={false} />
      <link rel='ms-icon' sizes='310x310' href='/ms-icon-310x310.png' prefetch={false} />
      <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
      <link rel='android-icon' sizes='36x36' href='/android-icon-36x36.png' prefetch={false}></link>
      <link rel='android-icon' sizes='48x48' href='/android-icon-48x48.png' prefetch={false}></link>
      <link rel='android-icon' sizes='72x72' href='/android-icon-72x72.png' prefetch={false}></link>
      <link rel='android-icon' sizes='96x96' href='/android-icon-96x96.png' prefetch={false}></link>
      <link rel='android-icon' sizes='144x144' href='/android-icon-144x144.png' prefetch={false}></link>
      <link rel='android-icon' sizes='192x192' href='/android-icon-192x192.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='57x57' href='/apple-icon-57x57.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='60x60' href='/apple-icon-60x60.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='72x72' href='/apple-icon-72x72.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='76x76' href='/apple-icon-76x76.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='114x114' href='/apple-icon-114x114.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='120x120' href='/apple-icon-120x120.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='144x144' href='/apple-icon-144x144.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='152x152' href='/apple-icon-152x152.png' prefetch={false}></link>
      <link rel='apple-icon' sizes='180x180' href='/apple-icon-180x180.png' prefetch={false}></link>
    </Head>
  )
}

export default HeaderComp
