// ------------------------------------------- OLDER VERSION OF HOMEPAGE -------------------------------------------- //

import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'

const HomePageV2 = dynamic(() => import('@/core/component/Layout/HomepageV2'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
export default function Index({ businessmetaheadtag, faqdata }) {
  return (
    <>
      <section>
        <HomePageV2 faqdata={faqdata} />
      </section>
      <div>
        <DynamicFooter />
      </div>
      <div>
        <MobileFooter />
      </div>
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const ref = context?.req?.headers?.referer || ''
  try {
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }
    const lang_id = 1
    const url_slug = context_params || 'advisor'
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL

    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req2 = {
      lang_id: lang_id,
      page_id: page_id
    }
    const req4 = {
      lang_id: lang_id
    }
    const metaReq = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req1).catch((error) => {
      return { data: null }
    })
    const response2 = Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1).catch((error) => {
      return { data: null }
    })
    const response3 = Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1).catch((error) => {
      return { data: null }
    })
    const response4 = Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response5 = Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1).catch((error) => {
      return { data: null }
    })
    const response7 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch((error) => {
      return { data: 'notFound' }
    })
    const response8 = Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const metaData = await Axios.post(BASE_URL + COMMON?.metaDetailPage, metaReq).catch((error) => {
      return { data: null }
    })
    const [data1, data2, data4, data5, data7, data8, metaResponse] = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response5,
      response7,
      response8,
      metaData
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        productlistdata: data1,
        categorytopmenulist: data2,
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        referer: ref,
        leadsParams: leadsParams,
        businessmetaheadtag: metaResponse?.data || null
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
