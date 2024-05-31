import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import CommonRoundedBreadcrumb from '@/core/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CalculatorCards = dynamic(() => import('@/core/component/common/CalculatorCards'), {
  ssr: false
})
const CalulatorBanner = dynamic(() => import('@/core/component/Layout/Calculator/CalulatorBanner'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

const CalculatorBeginnerCard = dynamic(() => import('@/core/component/Layout/Calculator/CalculatorBeginnerCard'), {
  ssr: false
})

export default function Index({
  businessCategorydata,
  businessmetaheadtag,
  faqdata,
}) {
  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB]'>
          <div className='px-2 pt-4'>
            <CommonRoundedBreadcrumb link1={'/calculators'} link1Name={'Calculators'} highlight1={true} />
          </div>
          <CalulatorBanner metaData={businessmetaheadtag} cal_head={true} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <CalculatorCards />
          <div className='container bg-[#F4F8FB] mx-auto max-[991px]:max-w-full max-md:px-8  max-[479px]:px-0  max-[375px]:px-0 max-[320px]:px-0 h-auto  pt-[20px] pb-[60px] justify-around max-[576px]:pt-[10px] max-[576px]:pb-[30px] max-[479px]:pt-4 max-[479px]:pb-10 max-[479px]:h-auto'>
            <CalculatorBeginnerCard longTerm={businessmetaheadtag} />
          </div>
          <FAQ faqdata={faqdata} />
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
    const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
    const context_params = last_url?.[last_url?.length - 1]
    const ref = context?.req?.headers?.referer || ''

    const req3 = {
      lang_id: lang_id
    }
    const req2 = {
      lang_id: lang_id,
      url_slug: context_params
    }
    const req6 = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards'
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
    const response5 = Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req6).catch((error) => {
      return { data: null }
    })
    const response6 = await Axios.post(BASE_URL + COMMON.metaDetailPage, req7).catch((error) => {
      return { data: null }
    })
    const [data1, data2, data5, data6] = await Promise.all([
      response1,
      response2,
      response5,
      response6
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        businessCategorydata: data1,
        faqdata: data2,
        productList: data5,
        businessmetaheadtag: data6?.data || null,
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
