import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI, PRODUCTSAPI, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'
import { metaInfo } from '@/utils/metaInfo'
import Head from 'next/head'
import { getDeviceIdCookie } from '@/utils/util'


const DetailsCategoryCard = dynamic(
  () => import('@/core/component/Layout/productDetails/DetailsCategoryCard/DetailsCategoryCard'),
  {
    ssr: false
  }
)

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

export default function Index({
  faqdata,
  businessCategorydata,
  productDetailsData,
  productLongformcon,
  alternetRelatedproduct,
  getallreview,
  getOverlallRating,
  leadsParams,
  categoryUrl,
  productDetailsUrl
}) {
  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
      }
    }
  }, [leadsParams])
  const router = useRouter()

  const reviewCount = getOverlallRating?.data?.total_reviews > 0 ? getOverlallRating?.data?.total_reviews : 1

  //product json ld schema
  const addProductJsonLd = () => {

    const productSchemaJson = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: productDetailsData?.product_details?.card_name || '',
      description: productDetailsData?.product_details?.card_name || '',
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: productDetailsData?.product_details?.rating || '5',
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: productDetailsData?.product_details?.publisher_name || ''
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: productDetailsData?.product_details?.rating || '5',
        reviewCount: reviewCount
      }
    }
    const jsonFAQString = JSON.stringify(productSchemaJson)

    return {
      __html: jsonFAQString
    }
  }
  const productDetailJson = addProductJsonLd()

  useEffect(() => {
    if (!productDetailsData?.product_details) {
      router?.push('/404')
    }
  }, [productDetailsData, router])

  return (
    <>
      {productDetailsData?.product_details && (
        <Head>
          <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={productDetailJson} />
        </Head>
      )}
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
      </section>
      <div>
        <DetailsCategoryCard
          faqdata={faqdata}
          productDetailsData={productDetailsData}
          productLongformcon={productLongformcon}
          alternetRelatedproduct={alternetRelatedproduct}
          getallreview={getallreview}
          getOverlallRating={getOverlallRating}
          categoryUrl={categoryUrl}
          productDetailsUrl={productDetailsUrl}
        />

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
    const productDetails = context?.params?.['cards-details']

    const catgeory_slug = 'credit-cards'
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[3]
    const cleanUrlContext = context_params.split('?')[0]

    const lang_id = 1
    const offset = 0
    const limitdata = 5
    const url_slug = cleanUrlContext
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const categoryUrl = context?.params?.['category-name'] || ''

    const cookies = context?.req?.headers?.cookie?.split(';')
    const device_id = getDeviceIdCookie(cookies)
    const leadsParams = { user_agent, ip }

    const sort_type = 'updated_at'
    const sort_order = 'asc'

    const req1 = {
      lang_id: lang_id,
      url_slug: url_slug
    }
    const req3 = {
      lang_id: lang_id
    }
    const req5 = {
      lang_id: lang_id,
      category_slug: catgeory_slug
    }
    const req4 = {
      lang_id: lang_id,
      url_slug: productDetails
    }

    const req7 = {
      product_url_slug: productDetails,
      sort_type: sort_type,
      sort_order: sort_order,
      lang_id: lang_id,
      offset: offset,
      limit: limitdata
    }
    const req8 = {
      product_url_slug: productDetails,
      lang_id: lang_id
    }
    const pdpParams = {
      lang_id: lang_id,
      url_slug: productDetails,
      device_id: device_id
    }

    const response1 = Axios.post(BASE_URL + FAQAPI.productFaq, req1).catch((error) => {
      return { data: null }
    })
    const response3 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })
    const response4 = await Axios.post(BASE_URL + multipleSlug.productAllDetails, pdpParams).catch((error) => {
      return { data: null }
    })
    const response5 = Axios.post(BASE_URL + PRODUCTSAPI.TrendingProductCategory, req5).catch((error) => {
      return { data: null }
    })
    const response6 = Axios.post(BASE_URL + PRODUCTSAPI.productformLongcontent, req4).catch((error) => {
      return { data: null }
    })
    const response7 = Axios.post(BASE_URL + PRODUCTSAPI.getAlternateProduct, req4).catch((error) => {
      return { data: null }
    })
    const response9 = await Axios.post(BASE_URL + PRODUCTSAPI.getAllReview, req7).catch((error) => {
      return { data: null }
    })
    const response10 = await Axios.post(BASE_URL + PRODUCTSAPI.getOverallRating, req8).catch((error) => {
      return { data: null }
    })

    const [data1, data3, data4, data5, data6, data7, data9, data10] = await Promise.all([
      response1,
      response3,
      response4,
      response5,
      response6,
      response7,
      response9,
      response10
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        faqdata: data1,
        businessCategorydata: data3,
        productDetailsData: data4,
        RecomendedTopselling: data5,
        productLongformcon: data6,
        alternetRelatedproduct: data7,
        getallreview: data9,
        getOverlallRating: data10,
        referer: ref,
        leadsParams: leadsParams,
        businessmetaheadtag: data4?.product_details,
        categoryUrl: categoryUrl,
        productDetailsUrl: productDetails
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
