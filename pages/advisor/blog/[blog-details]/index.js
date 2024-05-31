import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
const CreditNewsDetails = dynamic(
  () => import('@/core/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails'),
  {
    ssr: false
  }
)

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''
    const blog_url_slug = context?.params?.['blog-details']
    const credit_url_slug = context?.resolvedUrl?.split('/')?.[1]

    const req3 = {
      lang_id: lang_id
    }
    const newsDetailsReq = {
      blog_url_slug: blog_url_slug
    }
    const newsListReq = {
      blog_url_slug: credit_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    const requestParams = {
      lang_id: lang_id,
      business_category_url_slug: 'advisor',
      offset: 0,
      limit: 10
    }

    const response1 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })

    const newsListData = await Axios.post(BASE_URL + BLOG.newsList, newsListReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('Error while fetching news list data', error)
      })

    const newsDetailsData = await Axios.post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })

    return {
      props: {
        businessCategorydata: response1 || null,
        newsDetailsData: newsDetailsData || null,
        newsListData: newsListData || null,
        referer: ref,
        blogUrl: blog_url_slug,
        initialOffSet: requestParams?.offset
      }
    }
  } catch (error) {
    return {
      props: {
        notFound: false
      }
    }
  }
}

const NewsDetails = ({
  businessCategorydata,
  newsDetailsData,
  blogUrl,
  newsListData,
  initialOffSet
}) => {
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const CDN_URL_http = CDN_URL.replace('https', 'http')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('newsCreditPageNo', initialOffSet)
    }
  }, [initialOffSet])

  return (
    <>
      <div>
        <Head>
          <title>{newsDetailsData?.data?.meta_title || metaInfo?.pageTitle}</title>
          <link rel='canonical' href={modifiedUrl} />
          <meta name='description' content={newsDetailsData?.data?.meta_description || metaInfo?.pageDescription} />
          {process.env.NEXT_PUBLIC_WEBSITE_URL === 'www.banksathi.com' ? (
            <meta name='robots' content='index,follow' />
          ) : (
            <meta name='robots' content='noindex,nofollow' />
          )}
          <meta name='og:title' content={newsDetailsData?.data?.og_title || metaInfo?.ogTitle} />
          <meta name='og:type' content={newsDetailsData?.data?.og_type || metaInfo?.ogType} />
          <meta name='og:url' content={getOgUrl} />
          <meta name='og:description' content={newsDetailsData?.data?.og_description || metaInfo?.ogDescription} />
          <meta
            name='og:image'
            content={
              newsDetailsData?.data?.og_image == null || undefined
                ? CDN_URL_http
                : CDN_URL_http + '/' + newsDetailsData?.data?.og_image
            }
          />
          <meta
            name='og:image:secure'
            content={
              newsDetailsData?.data?.og_image == null || undefined
                ? CDN_URL
                : CDN_URL + '/' + newsDetailsData?.data?.og_image
            }
          />
          <meta name='og:image:width' content='300' />
          <meta name='og:image:height' content='300' />
          <meta name='og:image:alt' content={newsDetailsData?.data?.og_image_alt || metaInfo?.ogImageAlt} />
          <meta name='og:image:type' content={newsDetailsData?.data?.og_image_type || metaInfo?.ogImageType} />
          <meta name='og:site_name' content={newsDetailsData?.data?.og_site_name || metaInfo?.ogSiteName} />
          <meta name='twitter:card' content={newsDetailsData?.data?.twitter_card || metaInfo?.twitterCard} />
          <meta name='twitter:site' content={newsDetailsData?.data?.twitter_site || metaInfo?.twitterSite} />
          <meta name='twitter:title' content={newsDetailsData?.data?.twitter_title || metaInfo?.twitterTitle} />
          <meta
            name='twitter:description'
            content={newsDetailsData?.data?.twitter_description || metaInfo?.twitterDes}
          />
          <meta
            name='twitter:image'
            content={
              newsDetailsData?.data?.twitter_image == null || undefined
                ? CDN_URL
                : CDN_URL + '/' + newsDetailsData?.data?.twitter_image
            }
          />
          <meta name='twitter:image:alt' content={newsDetailsData?.data?.twitter_img_alt || metaInfo?.ogSiteName} />
          <link rel='icon' sizes='192x192' href='/favicon.ico' prefetch={false} />
          <link rel='apple-touch-icon' href='/favicon.ico' prefetch={false}></link>
        </Head>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1={'/advisor'}
            link1Name='Advisor'
            link2={'/advisor/blog'}
            link2Name='Blog'
            link3={`/advisor/blog/${blogUrl}`}
            link3Name={blogUrl}
            title={'Advisor Blog Details'}
          />
          <CreditNewsDetails
            blogUrl={blogUrl}
            newsDetailsData={newsDetailsData}
            newsListData={newsListData}
            advisorPage={true}
          />
        </div>
        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}

export default NewsDetails
