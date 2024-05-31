import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const SimpleSavingTellUs = dynamic(() => import('@/core/component/common/CalculatorCards/SimpleSavingTellus'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

const CommonRoundedBreadcrumb = dynamic(
  () => import('@/core/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'),
  {
    ssr: false
  }
)
const CreditBeginnerCard = dynamic(() => import('@/core/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})
export default function Index({
  businessmetaheadtag,
  businessCategorydata,
  faqdata,
  recommendProductList,
}) {
  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonRoundedBreadcrumb
            link1={'/credit-cards'}
            link1Name={'Credit Cards'}
            link2={'/credit-cards/saving-calculator'}
            link2Name='saving-calculator'
            highlight2={true}
          />
        </div>

        <div className='bg-[#F4F8FB] h-auto'>
          <SimpleSavingTellUs recommendProductList={recommendProductList} metaData={businessmetaheadtag} />
          <VedioCheck productDetailsData={businessmetaheadtag} />

          <CreditBeginnerCard longTerm={businessmetaheadtag} saving={true} />

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
    const ref = context?.req?.headers?.referer || ''
    const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
    const faqUrl = last_url?.[last_url?.length - 1]
    const context_params = context?.query ? 'saving-calculator' : context?.resolvedUrl?.split('/')?.pop()

    const req3 = {
      lang_id: lang_id
    }
    const req2 = {
      lang_id: lang_id,
      url_slug: faqUrl
    }
    const req6 = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards'
    }
    const req7 = {
      online_shopping: 87888,
      dining: 45454,
      travel: 3434,
      fuel: 3434,

      entertainment: 3434,

      international: 3434
    }
    const req1 = {
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
    const response6 = Axios.post(BASE_URL + COMMON?.recommendProductSavingCal, req7).catch((error) => {
      return { data: null }
    })
    // LONG FORM CONTENT
    const longForm = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req1).catch((error) => {
      return { data: null }
    })
    const [data1, data2, data5, data6, data8] = await Promise.all([
      response1,
      response2,
      response5,
      response6,
      longForm
    ]).then((responses) => responses.map((response) => response.data))
    return {
      props: {
        businessCategorydata: data1,
        faqdata: data2,
        productList: data5,
        recommendProductList: data6,
        referer: ref,
        businessmetaheadtag: data8?.data || null
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
