import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

const CreditScore = dynamic(() => import('@/core/component/Layout/CreditScore/index_error'), {
  ssr: false
})

export default function Index({
  businessCategorydata,
  faqdata,
  businessmetaheadtag,
}) {
  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-white h-auto'>
          <CreditScore faqdata={faqdata} longTerm={businessmetaheadtag} metaData={businessmetaheadtag} />
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
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const url_slug = ''
    const context_params = context?.query?.h ? 'cibil-credit-score-check' : context?.resolvedUrl?.split('/')?.pop()
    const ref = context?.req?.headers?.referer || ''
    const h = context?.query?.h || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }

    const req3 = {
      lang_id: lang_id
    }
    const req2 = {
      lang_id: lang_id,
      url_slug: context_params
    }
    const req7 = {
      lang_id: lang_id,
      page_url_slug: context_params
    }
    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })

    const response2 = Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response4 = await Axios.post(BASE_URL + COMMON.metaDetailPage, req7).catch((error) => {
      return { data: null }
    })
    const [data1, data2, data4] = await Promise.all([response1, response2, response4]).then(
      (responses) => responses.map((response) => response.data)
    )
    return {
      props: {
        businessCategorydata: data1 || {},
        faqdata: data2 || null,
        businessmetaheadtag: data4?.data || {},
        referer: ref,
        h: h,
        leadsParams: leadsParams
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
