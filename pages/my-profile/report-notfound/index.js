import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'

const NoReportFound = dynamic(() => import('@/core/component/Layout/scoreCreditCard/NoReportFound'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

export default function Index({ businessmetaheadtag,  businessCategorydata }) {
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const CDN_URL_http = CDN_URL?.replace('https', 'http')
  return (
    <>
      <Head>
        <title>{businessmetaheadtag?.h1_paragraph?.meta_title || metaInfo?.pageTitle }</title>
        <link rel='canonical' href={modifiedUrl} />
        <meta name='description' content={businessmetaheadtag?.h1_paragraph?.meta_description || metaInfo?.pageDescription} />
        {process.env.NEXT_PUBLIC_WEBSITE_URL == 'www.banksathi.com' ? (
          <meta name='robots' content='index,follow' />
        ) : (
          <meta name='robots' content='noindex,nofollow' />
        )}
        <meta name='og:title' content={businessmetaheadtag?.h1_paragraph?.og_title || metaInfo?.ogTitle} />
        <meta name='og:type' content={businessmetaheadtag?.h1_paragraph?.og_type || metaInfo?.ogType} />
        <meta name='og:url' content={getOgUrl} />
        <meta name='og:description' content={businessmetaheadtag?.h1_paragraph?.og_description || metaInfo?.ogDescription} />
        <meta
          name='og:image'
          content={
            businessmetaheadtag?.h1_paragraph?.og_image == null || undefined
              ? CDN_URL_http
              : CDN_URL_http + '/' + businessmetaheadtag?.h1_paragraph?.og_image
          }
        />
        <meta
          name='og:image:secure'
          content={
            businessmetaheadtag?.h1_paragraph?.og_image == null || undefined ? CDN_URL : CDN_URL + '/' + businessmetaheadtag?.h1_paragraph?.og_image
          }
        />

        <meta name='og:image:width' content='300' />
        <meta name='og:image:height' content='300' />
        <meta name='og:image:alt' content={businessmetaheadtag?.h1_paragraph?.og_image_alt || metaInfo?.ogImageAlt} />
        <meta name='og:image:type' content={businessmetaheadtag?.h1_paragraph?.og_image_type || metaInfo?.ogImageType} />
        <meta name='og:site_name' content={businessmetaheadtag?.h1_paragraph?.og_site_name || metaInfo?.ogSiteName} />
        <meta name='twitter:card' content={businessmetaheadtag?.h1_paragraph?.twitter_card || metaInfo?.twitterCard} />
        <meta name='twitter:site' content={businessmetaheadtag?.h1_paragraph?.twitter_sit || metaInfo?.twitterSite} />
        <meta name='twitter:title' content={businessmetaheadtag?.h1_paragraph?.twitter_title || metaInfo?.twitterTitle} />
        <meta name='twitter:description' content={businessmetaheadtag?.h1_paragraph?.twitter_description || metaInfo?.twitterDes} />
        <meta
          name='twitter:image'
          content={
            businessmetaheadtag?.h1_paragraph?.twitter_image == null || undefined
              ? CDN_URL
              : CDN_URL + '/' + businessmetaheadtag?.h1_paragraph?.twitter_image
          }
        />
        <meta name='twitter:image:alt' content={businessmetaheadtag?.h1_paragraph?.twitter_img_alt || metaInfo?.ogSiteName} />
        <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
        <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
      </Head>
      
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader
            businessCategorydata={businessCategorydata}
          />
        </div>
        <div className='bg-white'>
          <NoReportFound />
        </div>
      </section>
      <div>
        <MobileFooter businessCategorydata={businessCategorydata} />
      </div>

      <DynamicFooter businessCategorydata={businessCategorydata} />

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]

    const lang_id = 1
    const url_slug = context_params
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref=context?.req?.headers?.referer || '';


    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req4 = {
      lang_id: lang_id
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1).catch((error) => {
      return { data: null }
    })

    const response3 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch((error) => {
      return { data: 'notFound' }
    })

    const [data1,  data3] = await Promise.all([response1,  response3]).then(
      (responses) => responses.map((response) => response.data)
    )

    return {
      props: {
        businessmetaheadtag: data1?.h1_paragraph || null,
        businessCategorydata: data3,
        referer:ref,
      }
    }
  } catch (error) {
    // return {
    //   props: {
    //     notFound: false
    //   }
    // }
  }
}
