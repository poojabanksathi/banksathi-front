import React, { useEffect, useState } from 'react'

import bannerhomeBg from '../../public/assets/banner-bg-home.svg'
import bannerUBg from '../../public/assets/banner-bg-u.svg'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI, PRODUCTSAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useRouter } from 'next/router'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const HomeBanner = dynamic(() => import('@/core/component/Layout/Home/HomeBanner/index'), {
  ssr: false
})
const DynamicHomePage = dynamic(() => import('@/core/component/Layout/Home/index'), {
  ssr: false
})

export default function Home({
  businessCategorydata,
  faqdata,
  RecomendedTopselling,
  longTermData,
  registerdevicedata,
}) {
  const style = {
    backgroundImage: `url(${bannerhomeBg.src})`,
    width: '100%',
    backgroundPosition: 'right'
  }

  const stylemobile = {
    backgroundImage: `url(${bannerUBg.src})`,
    width: '100%',
    backgroundPosition: 'right'
  }

  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()
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

  const size = useWindowSize()
  useEffect(() => {
    if (businessCategorydata?.productInfo?.length === 0) {
      router.push('/maintenance')
    }
  }, [businessCategorydata?.productInfo?.length, router])
  const getOgUrl = typeof window !== 'undefined' && window?.location?.href
  const modifiedUrl = typeof window !== 'undefined' && window.location.origin + window.location.pathname
  return (
    <>
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
      <section className=''>
        <div
          style={size.width >= 576 ? style : stylemobile}
          className={`bg-[#844FCF] w-full bg-no-repeat min-h-screen xl:min-h-[500px] lg:min-h-[750px] max-[576px]:min-h-full relative ${
            scrollY > 0 ? 'bannerhome-respo-scroll' : ' bannerhome-respo'
          }`}>
          <DynamicHeader businessCategorydata={businessCategorydata} />
          <HomeBanner registerdevicedata={registerdevicedata} />
        </div>
      </section>

      <div className='bg-[#F4F8FB]'>
        <DynamicHomePage
          businessCategorydata={businessCategorydata}
          faqdata={faqdata}
          RecomendedTopselling={RecomendedTopselling}
          longTermData={longTermData}
          registerdevicedata={registerdevicedata}
        />
        <div className='bg-[#F3F8F9]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>

      {/* ========= Footer ========= */}
      <DynamicFooter businessCategorydata={businessCategorydata} />
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const url_slug = ''
    const page_id = 1
    const catgeory_slug = 'credit-cards'
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const device_expiry = '24 hours'
    const ref = context?.req?.headers?.referer || ''

    const { req } = context
    const ip = req.headers['x-forwarded-for'].split(',')[0]
    const user_agent = req.headers['user-agent']

    const deviceId = user_agent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)

    const req1 = {
      lang_id: lang_id
    }

    const req2 = {
      lang_id: lang_id,
      page_id: page_id
    }

    const req3 = {
      lang_id: 1,
      category_slug: catgeory_slug
    }

    const req4 = {
      lang_id: lang_id
    }
    const req6 = {
      website_url: website_url,
      lang_id: lang_id
    }
    const req7 = {
      device_id: deviceId,
      ip_address: ip,
      user_agent: user_agent,
      device_expiry: device_expiry
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const response2 = Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })

    const response3 = Axios.post(BASE_URL + PRODUCTSAPI.TrendingProductCategory, req3).catch((error) => {
      return { data: null }
    })
    const response4 = Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req4).catch((error) => {
      return { data: null }
    })
    const response7 = await Axios.post(BASE_URL + COMMON.registerDevice, req7).catch((error) => {
      return { data: null }
    })

    const [data1, data2, data3, data4, data7] = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response7
    ]).then((responses) => responses.map((response) => response.data))
    return {
      props: {
        businessCategorydata: data1,
        faqdata: data2,
        RecomendedTopselling: data3,
        longTermData: data4,
        registerdevicedata: data7,
        referer: ref
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
