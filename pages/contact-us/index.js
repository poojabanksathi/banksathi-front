import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const ContacUsv2 = dynamic(() => import('@/core/component/Layout/ContacUsv2'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})

export default function Index({ businessCategorydata ,businessmetaheadtag}) {
  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
          <ContacUsv2 />
        </div>
        <div></div>
        <div className='bg-[#F4F8FB]'>
        <VedioCheck productDetailsData={businessmetaheadtag}/>
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

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const url_slug = ''
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
    const context_params = last_url?.[last_url?.length-1]
    const ref=context?.req?.headers?.referer || '';

    const req3 = {
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
    const [data1, data6] = await Promise.all([response1 , response6]).then((responses) =>
      responses.map((response) => response.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        businessmetaheadtag:data6?.data||{},
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
