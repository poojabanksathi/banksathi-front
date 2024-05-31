import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const PrivacyPolicy = dynamic(() => import('@/core/component/Layout/PrivacyPolicy'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
export default function Index({ businessCategorydata,businessmetaheadtag  }) {
  
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
      </section>
      <div className='bg-[#F4F8FB]'>
        <PrivacyPolicy />
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
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
    const context_params = last_url?.[last_url?.length-1]
    const ref=context?.req?.headers?.referer || '';
    const req3 = {
      lang_id: lang_id
    }
    const req2 = {
      website_url: website_url,
      lang_id: lang_id
    }
    const req7 = {
      lang_id: lang_id,
      page_url_slug: context_params
    }
    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })
    const response6 = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req7).catch((error) => {
      return { data: null }
    })
    const [data1,data6] = await Promise.all([response1,response6]).then((responses) =>
      responses.map((response) => response.data)
    )
    return {
      props: {
        businessCategorydata: data1,
        businessmetaheadtag:data6?.data || null,
        referer:ref,
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