import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BLOG, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'
import Head from 'next/head'

const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const NewHomePage = dynamic(() => import('@/core/component/Layout/NewHomePage/NewHomePage'), { ssr: false })

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
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
    const metaParam = {
      lang_id: lang_id,
      page_url_slug: 'home'
    }
    const blogParams = { offset: 0, limit: 6 }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const response7 = await Axios.post(BASE_URL + COMMON.registerDevice, req7).catch((error) => {
      return { data: null }
    })
    const blogsResponseData = Axios.post(BASE_URL + BLOG.blogList, blogParams).catch((error) => {
      return { data: null }
    })
    const metaDetailsResponse = await Axios.post(BASE_URL + COMMON?.metaDetailPage, metaParam).catch((error) => {
      return { data: null }
    })

    const [data1, data7, blogData, metaData] = await Promise.all([
      response1,
      response7,
      blogsResponseData,
      metaDetailsResponse
    ]).then((responses) => responses.map((response) => response.data))
    return {
      props: {
        businessCategorydata: data1,
        registerdevicedata: data7,
        referer: ref,
        blogData: blogData,
        businessmetaheadtag: metaData?.data || null
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

export default function Home({
  businessCategorydata,
  registerdevicedata,
  blogData,
  businessmetaheadtag,
}) {
 
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

  useEffect(() => {
    if (businessCategorydata?.productInfo?.length === 0) {
      router.push('/maintenance')
    }
  }, [businessCategorydata?.productInfo?.length, router])
  
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(function (OneSignal) {
      OneSignal.init({
        appId: "12ebd861-92be-4b68-b8be-0a138021c887",
      });
    });
  }, []);

  return (
    <>
      <Head>
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
      </Head>
      <section className=''>
        <div
          className={`bg-[#844FCF] w-full  xl:min-h-[500px] lg:min-h-[750px] max-[576px]:min-h-full relative`}>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
      </section>

      <div className='bg-[#F4F8FB]'>
        <NewHomePage
          businessCategorydata={businessCategorydata}
          registerdevicedata={registerdevicedata}
          blogData={blogData}
        />
      </div>

      <DynamicFooter businessCategorydata={businessCategorydata} />
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}
