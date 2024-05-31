import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import FAQ from '@/core/component/common/FAQ/FAQ'
import CommonRoundedBreadcrumb from '@/core/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const EligibilityCreditCard = dynamic(() => import('@/core/component/Layout/eligibilityCreditCard'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/core/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})

export default function Index({
  businessCategorydata,
  productList,
  businessmetaheadtag,
  faqdata,
}) {
  return (
    <>
      <div className='h-full bg-[#F4F8FB]  login-mobile-res'>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] '>
          <CommonRoundedBreadcrumb
            link1='/credit-cards'
            link1Name='Credit Cards'
            highlight2={true}
            link2='credit-cards/eligibility'
            link2Name='Eligibility'
          />
        </div>
        <EligibilityCreditCard productList={productList} metaResponseData={businessmetaheadtag} />
        <div className='bg-[#F4F8FB]'>
          <VedioCheck productDetailsData={businessmetaheadtag} />
        </div>
        <CreditBeginnerCard longTerm={businessmetaheadtag} />
        <FAQ faqdata={faqdata} />

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
    const context_params = context?.query?.h ? 'eligibility' : context?.resolvedUrl?.split('/')?.pop()
    const ref = context?.req?.headers?.referer || ''
    const { query, resolvedUrl, req } = context

    const new_url_slug = query && resolvedUrl?.split('?')?.[1]
    const req2 = {
      lang_id: lang_id
    }
    const req4 = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards'
    }
    const req7 = {
      lang_id: lang_id,
      page_url_slug: context_params
    }
    const req6 = {
      lang_id: lang_id,
      url_slug: context_params
    }
    const CategoryParams = {
      lang_id: lang_id,
      business_category_url_slug: new_url_slug
    }
    const response2 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2).catch((error) => {
      return { data: 'notFound' }
    })
    const response4 = Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req4).catch((error) => {
      return { data: 'notFound' }
    })
    const response5 = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req7).catch((error) => {
      return { data: null }
    })
    const response6 = Axios.post(BASE_URL + FAQAPI.productFaq, req6).catch((error) => {
      return { data: null }
    })
    const [data2, data4, data5, data6] = await Promise.all([
      response2,
      response4,
      response5,
      response6
    ]).then((responses) => responses.map((response) => response.data))
    const metaResponse = await Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, CategoryParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return {}
      })

    return {
      props: {
        businessCategorydata: data2,
        productList: data4,
        businessmetaheadtag: data5?.data || {},
        faqdata: data6,
        referer: ref,
        metaResponseData: { metaResponse }
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
