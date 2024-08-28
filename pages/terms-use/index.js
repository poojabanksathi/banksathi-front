import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const TermsUse = dynamic(() => import('@/core/component/Layout/TermsUse'), {
  ssr: false
})


export default function Index({ businessCategorydata, businessmetaheadtag }) {
  return (
    <>
      <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div>
      <div className='bg-[#F4F8FB]'>
        <TermsUse />
        <MobileFooter businessCategorydata={businessCategorydata} />
      </div>

    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
    const context_params = last_url?.[last_url?.length - 1]

    const ref = context?.req?.headers?.referer || ''

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
    const response3 = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req7).catch((error) => {
      return { data: null }
    })
    const [data1, data3] = await Promise.all([response1, response3]).then((responses) =>
      responses.map((response) => response.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        businessmetaheadtag: data3?.data || null,
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
