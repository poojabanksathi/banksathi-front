import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'
import {
  BASE_URL,
  BUSINESSCATEGORY,
  BUSINESSSUBCATEGORY,
  BrowseServices,
  COMMON,
  FAQAPI
} from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from '@/utils/util'


const CategorySubRecome = dynamic(() => import('@/core/component/Layout/creditCardCategory/CategorySubRecome'), {
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
  productlistdataSub,
  businessmetaheadtag,
  faqdata,
  longTermSub,
  businessCategorydata,
  morecategoryleftfilter,
  categorytopmenulistsub,
  url_slug,
  leadsParams,
  credit_url_slug,
  serviceTabs,
  sub_cat_url
}) {
  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const bottomRefs = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
      }
    }
  }, [leadsParams])

  useEffect(() => {
    if (!productlistdataSub || productlistdataSub?.product_list?.length === 0) {
      router?.push('/404')
    }
  }, [productlistdataSub, router])

  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB]'>
          <div className='min-[768px]:pb-4 pb-6'>
            <CommonBreadCrumbComponent
              link1={'/credit-cards'}
              link1Name='Credit Cards'
              link2={`/credit-cards/${url_slug}`}
              link2Name={capitalizeFirstLetter(url_slug)?.split('-')?.join(' ')}
            />
          </div>
          <div className='container px-20  max-[1024px]:px-8 max-[576px]:px-4 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          </div>
          <CreditListingBanner
            businessmetaheadtag={businessmetaheadtag}
            src={`${Img_URL}/${businessmetaheadtag?.sub_category_image}`}
            linesToShow={2}
            paddingTop={true}
          />
        </div>
      </section>
      <div>
        <CategorySubRecome
          productlistdataSub={productlistdataSub}
          faqdata={faqdata}
          longTermSub={longTermSub}
          businessmetaheadtag={businessmetaheadtag}
          morecategoryleftfilter={morecategoryleftfilter}
          categorytopmenulistsub={categorytopmenulistsub}
          url_slug={url_slug}
          credit_url_slug={credit_url_slug}
          serviceTabs={serviceTabs}
          bottomRefs={bottomRefs}
          sub_cat_url={sub_cat_url}
        />
        <div ref={bottomRefs}>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicFooter businessCategorydata={businessCategorydata} />
          <div className='scroll-top'>
            <ScrollToTop smooth color='#000' />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const paramsData = context.params['category-name']
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const context_params_sub =
      context?.resolvedUrl &&
      (context?.query ? context?.resolvedUrl.split('/')[2]?.split('?')?.[0] : context?.resolvedUrl.split('/')[2])

    const lang_id = 1
    const url_slug = context_params
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''

    const leadsParams = { user_agent, ip }
    const page = context?.query?.page ? context?.query?.page - 1 : 0

    const metaReq = {
      lang_id: lang_id,
      business_category_url_slug: paramsData
    }
    const req3 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug,
      business_sub_category_url_slug: paramsData,
      offset: page,
      limit: 20
    }

    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req2 = {
      lang_id: lang_id,
      sub_cat_url_slug: context_params_sub
    }
    const req5 = {
      lang_id: lang_id
    }
    const serviceTabsParams = {
      lang_id: 1,
      business_category_url_slug: ''
    }
    const response1 = Axios.post(BASE_URL + BUSINESSSUBCATEGORY.productListCatSub, req3).catch((error) => {
      return { data: null }
    })
    const response2 = Axios.post(BASE_URL + BUSINESSSUBCATEGORY.productListCatTags, metaReq).catch((error) => {
      return { data: null }
    })
    const response3 = Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response4 = Axios.post(BASE_URL + BUSINESSSUBCATEGORY.subCatformcontent, metaReq).catch((error) => {
      return { data: null }
    })
    const response6 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req5).catch((error) => {
      return { data: 'notFound' }
    })
    const response7 = Axios.post(BASE_URL + BUSINESSSUBCATEGORY.gettopmorewaydetails, metaReq).catch((error) => {
      return { data: 'notFound' }
    })
    const response8 = Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1).catch((error) => {
      return { data: null }
    })
    const serviceTabs = await Axios.post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams).catch((err) => {
      return { data: null }
    })

    const [data1, data2, data3, data4, data6, data7, data8, data10] = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response6,
      response7,
      response8,
      serviceTabs
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        productlistdataSub: data1 || null,
        businessmetaheadtag: data2?.h1_paragraph || {},
        faqdata: data3,
        longTermSub: data4,
        businessCategorydata: data6,
        morecategoryleftfilter: data7,
        categorytopmenulistsub: data8,
        referer: ref,
        url_slug: context_params_sub,
        leadsParams: leadsParams,
        credit_url_slug: url_slug,
        serviceTabs: data10,
        sub_cat_url: paramsData
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
