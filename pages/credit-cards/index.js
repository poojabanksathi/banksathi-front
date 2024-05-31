import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'

const RecommdationCategory = dynamic(() => import('@/core/component/Layout/creditCardList/RecommdationCategory'), {
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
const CreditListingBanner = dynamic(() => import('@/core/component/Layout/creditCardList/CreditListingBanner'), {
  ssr: false
})

const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
export default function Index({
  productlistdata,
  categorytopmenulist,
  businessmetaheadtag,
  faqdata,
  longTerm,
  businessCategorydata,
  moreleftmenucredit,
  leadsParams,
  url_slug,
  serviceTabs,
  h
}) {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL

  const contactUsRef = useRef(null)
  const bottomRefs = useRef(null)
  const mobileFooterRef = useRef(null)

  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
      }
    }
  }, [leadsParams])

  const router = useRouter()

  useEffect(() => {
    if (!productlistdata || productlistdata?.product_list?.length === 0) {
      router?.push('/404')
    }
  }, [productlistdata, router])

  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] pb-4'>
          <CommonBreadCrumbComponent link1={'/credit-cards'} link1Name='Credit Cards' />
        </div>
        <div className='bg-[#F4F8FB]'>
          <CreditListingBanner
            businessmetaheadtag={businessmetaheadtag}
            src={`${Img_URL}/${businessmetaheadtag?.product_image}`}
            linesToShow={2}
            paddingTop={true}
          />
        </div>
      </section>
      <div>
        <RecommdationCategory
          productlistdata={productlistdata}
          categorytopmenulist={categorytopmenulist}
          faqdata={faqdata}
          longTerm={longTerm}
          moreleftmenucredit={moreleftmenucredit}
          businessmetaheadtag={businessmetaheadtag}
          url_slug={url_slug}
          serviceTabs={serviceTabs}
          contactUsRef={contactUsRef}
          bottomRefs={bottomRefs}
          mobileFooterRef={mobileFooterRef}
        />
        <div ref={contactUsRef}>
        </div>
        <div ref={mobileFooterRef}>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <MobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      {/* ========= Footer ========= */}
      <div ref={bottomRefs}>
        <DynamicFooter businessCategorydata={businessCategorydata} />
        <div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    let queryParam1 = ''
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    if (context?.query?.page !== '') {
      queryParam1 = context?.resolvedUrl?.split('?')?.[0]
    }
    const lang_id = 1
    const url_slug = context?.query?.page === '' ? context_params : queryParam1?.split('/')?.[1]
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''
    const h = context?.query?.h || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }
    const page = context?.query?.page ? context?.query?.page - 1 : 0

    const requestParams = {
      lang_id: lang_id,
      business_category_url_slug: url_slug,
      offset: page,
      limit: 20
    }
    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req2 = {
      lang_id: lang_id,
      url_slug: url_slug
    }
    const req4 = {
      lang_id: lang_id
    }
    const serviceTabsParams = {
      lang_id: 1,
      business_category_url_slug: ''
    }
    const response1 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, requestParams).catch(
      (error) => {
        return { data: null }
      }
    )
    const response2 = await Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1).catch((error) => {
      return { data: null }
    })
    const response3 = await Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1).catch((error) => {
      return { data: null }
    })
    const response4 = await Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response5 = await Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1).catch((error) => {
      return { data: null }
    })
    const response7 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch((error) => {
      return { data: 'notFound' }
    })
    const response8 = await Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const serviceTabs = await Axios.post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams).catch((err) => {
      return { data: null }
    })

    const [data1, data2, data3, data4, data5, data7, data8, data10] = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response5,
      response7,
      response8,
      serviceTabs
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        productlistdata: data1 || null,
        categorytopmenulist: data2,
        businessmetaheadtag: data3?.h1_paragraph || null,
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        referer: ref,
        leadsParams: leadsParams,
        url_slug: url_slug,
        serviceTabs: data10,
        h: h
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
