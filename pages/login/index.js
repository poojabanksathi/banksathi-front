import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const Loginpage = dynamic(() => import('@/core/component/common/Login'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

export default function Index({
  businessCategorydata,
  lastPageVisited,
  businessmetaheadtag
}) {

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token') && localStorage.getItem('userData') && localStorage.getItem('leadprofileid')) {
        toast.success('Already logged in!')
        router?.push('/')
      }
    }
  }, [router])

  return (
    <>
      <div className='h-full bg-[#F4F8FB] login-mobile-res '>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <Loginpage lastPageVisited={lastPageVisited} />
        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL

    const url_slug = ''
    const ref = context?.req?.headers?.referer || ''
    const h = context?.query?.h || null
    const page_url_slug = context?.resolvedUrl?.split('/')?.pop() || 'login'

    const req2 = {
      lang_id: lang_id
    }
    const metaReq = {
      lang_id: lang_id,
      page_url_slug: page_url_slug
    }
    const response2 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2).catch((error) => {
      return { data: 'notFound' }
    })
    const metaData = await Axios.post(BASE_URL + COMMON?.metaDetailPage, metaReq).catch((error) => {
      return { data: null }
    })
    const [data2, metaResponse] = await Promise.all([response2, metaData]).then((responses) =>
      responses.map((response) => response.data)
    )
    const lastPageVisited = context?.req?.headers?.referer || ''

    return {
      props: {
        businessCategorydata: data2,
        lastPageVisited: lastPageVisited,
        referer: ref,
        h: h,
        businessmetaheadtag: metaResponse?.data || null
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
