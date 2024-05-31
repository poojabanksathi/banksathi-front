import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'
import CommonRoundedBreadcrumb from '@/core/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'

const ScoreCreditCards = dynamic(() => import('@/core/component/Layout/scoreCreditCard'), {
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

export default function Index({ businessmetaheadtag, faqdata, businessCategorydata }) {

  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB]'>
          <div className='ml-4'>
            <CommonRoundedBreadcrumb link1={'/credit-score'} link1Name={'Credit Score'} />
          </div>
          <ScoreCreditCards faqdata={faqdata} longTerm={businessmetaheadtag} metaData={businessmetaheadtag} />
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
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''

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
    const req6 = {
      lang_id: lang_id,
      page_url_slug: context_params
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req1).catch((error) => {
      return { data: null }
    })
    const response2 = Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1).catch((error) => {
      return { data: null }
    })
    const response3 = Axios.post(BASE_URL + COMMON.metaDetailPage, req6).catch((error) => {
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

    const [data1, data2, data3, data4, data5, data7, data8] = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response5,
      response7,
      response8,
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        productlistdata: data1,
        categorytopmenulist: data2,
        businessmetaheadtag: data3?.data,
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        referer: ref
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
