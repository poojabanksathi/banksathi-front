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

const ScoreDetails = dynamic(() => import('@/core/component/Layout/scoreCreditCard/ScoreDetails'), {
  ssr: false
})

export default function Index({ businessCategorydata, faqdata, productList }) {
  const CDN_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  return (
    <>
      <div>
  
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <ScoreDetails faqdata={faqdata} productList={productList} />
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
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const url_slug = ''
    const ref=context?.req?.headers?.referer || '';
    const req3 = {
      lang_id: lang_id
    }
    const req2 = {
      lang_id: lang_id,
      page_id: page_id
    }
    const req6 = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards'
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })

    const response2 = Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response5 = Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req6).catch((error) => {
      return { data: null }
    })
    const [data1, data2, data5] = await Promise.all([response1, response2, response5]).then(
      (responses) => responses.map((response) => response.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        faqdata: data2,
        productList: data5,
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
