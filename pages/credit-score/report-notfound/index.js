import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'

const NoReportFound = dynamic(() => import('@/core/component/Layout/scoreCreditCard/NoReportFound'), {
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

export default function Index({ businessmetaheadtag,  businessCategorydata }) {
  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader
            businessCategorydata={businessCategorydata}
          />
        </div>
        <div className='bg-white'>
          <NoReportFound />
        </div>
      </section>
      <div>
        <MobileFooter businessCategorydata={businessCategorydata} />
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
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const lang_id = 1
    const url_slug = context_params
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref=context?.req?.headers?.referer || '';


    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req4 = {
      lang_id: lang_id
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1).catch((error) => {
      return { data: null }
    })

    const response3 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch((error) => {
      return { data: 'notFound' }
    })

    const [data1, data3] = await Promise.all([response1, response3]).then(
      (responses) => responses.map((response) => response.data)
    )

    return {
      props: {
        businessmetaheadtag: data1?.h1_paragraph || {},
        businessCategorydata: data3,
        referer:ref,
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
