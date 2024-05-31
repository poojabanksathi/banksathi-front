import {
  BASE_URL,
  BUSINESSCATEGORY,
  FAQAPI,
  PRODUCTSAPI,
  BrowseServices,
  multipleSlug,
  BLOG
} from '@/utils/alljsonfile/service'
import { capitalizeFirstLetter, getDeviceIdCookie } from '@/utils/util'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ScrollToTop from 'react-scroll-to-top'

const CreditNewsDetails = dynamic(
  () => import('@/core/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails'),
  { ssr: false }
)
const SavingAccountsDetails = dynamic(
  () => import('@/core/component/Layout/savingAccountList/SavingAccountsDetails/SavingAccountsDetails'),
  {
    ssr: false
  }
)

const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
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
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})

export const getServerSideProps = async (context) => {
  try {
    const lang_id = 1
    const referer = context?.req?.headers?.referer || ''
    const url_slug = context?.params?.['bank-accounts-details'] || context?.resolvedUrl?.split('/')?.pop() || ''
    const categoryUrl = context?.params?.['bank-accounts-category'] || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }
    const offset = 0
    const limitdata = 5
    const sort_type = 'updated_at'
    const sort_order = 'asc'

    const cookies = context?.req?.headers?.cookie?.split(';')
    const device_id = getDeviceIdCookie(cookies)

    const reqParams = {
      lang_id: lang_id
    }
    const req1 = {
      lang_id: lang_id
    }
    const metaReq = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const faqParams = {
      lang_id: lang_id,
      url_slug: url_slug
    }
    const pdpParams = {
      lang_id: lang_id,
      url_slug: url_slug,
      device_id: device_id
    }
    const params = {
      lang_id: lang_id,
      url_slug: url_slug
    }
    const reviewsParams = {
      product_url_slug: url_slug,
      sort_type: sort_type,
      sort_order: sort_order,
      lang_id: lang_id,
      offset: offset,
      limit: limitdata
    }
    const overallRatingParams = {
      product_url_slug: url_slug,
      lang_id: lang_id
    }

    const serviceTabsParams = {
      lang_id: 1,
      business_category_url_slug: ''
    }
    const cons_pros_params = {
      lang_id: 1,
      url_slug: url_slug
    }
    const newsDetailsReq = {
      blog_url_slug: url_slug
    }
    const newsListReq = {
      blog_url_slug: categoryUrl,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    // META
    const metaResponse = await axios
      .post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, metaReq)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('error', err)
        return { data: null }
      })
    // FAQ
    const faqData = await axios
      .post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('Error', error)
        return { data: null }
      })
    // BUSINESS CATEGORY
    const businessCategorydata = await axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, reqParams)
      .then((res) => {
        return res
      })
      .catch((error) => {
        console.log('err', error)
        return { data: null }
      })
    // TOPMENU
    const topMenuData = await axios
      .post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => {
        return res
      })
      .catch((error) => {
        console.log('err', error)
        return { data: null }
      })

    //PRODUCT DETAILS
    const productDetailsData = await axios
      .post(BASE_URL + multipleSlug.productAllDetails, pdpParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })
    // LONG FORM
    const longFormData = await axios
      .post(BASE_URL + PRODUCTSAPI.productformLongcontent, params)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })
    // RELATED ACCOUNTS
    const relatedAccountsData = await axios
      .post(BASE_URL + PRODUCTSAPI.getAlternateProduct, params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })
    // ALL REVIEWS
    const reviewsData = await axios
      .post(BASE_URL + PRODUCTSAPI.getAllReview, reviewsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })

    // OVERALL RATING
    const overallRatingData = await axios
      .post(BASE_URL + PRODUCTSAPI.getOverallRating, overallRatingParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })
    //PRODUCT CONS PROS REVIEW
    const CONS_PROS = await axios
      .post(BASE_URL + BrowseServices.consProsOfProduct, cons_pros_params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })
    //BROWSE SERVICE TABS
    const serviceTabs = await axios
      .post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })

    const newsListData = await axios
      .post(BASE_URL + BLOG.newsList, newsListReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('Error while fetching news list data', error)
      })

    const newsDetailsData = await axios
      .post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })
    return {
      props: {
        businessCategorydata: businessCategorydata?.data,
        businessmetaheadtag: metaResponse?.h1_paragraph || productDetailsData?.product_details || null,
        faqData: faqData || null,
        referer: referer,
        productDetailsData: productDetailsData || null,
        pdpUrl: url_slug || '',
        categoryUrl: categoryUrl,
        longFormData: longFormData || null,
        relatedAccountsData: relatedAccountsData || null,
        reviewsData: reviewsData || null,
        overallRatingData: overallRatingData || null,
        serviceTabs: serviceTabs || null,
        CONS_PROS: CONS_PROS || null,
        leadsParams: leadsParams,
        newsDetailsData: newsDetailsData || null,
        newsListData: newsListData || null
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
const SavingsAccountsDetails = ({
  businessmetaheadtag,
  businessCategorydata,
  faqData,
  productDetailsData,
  pdpUrl,
  categoryUrl,
  longFormData,
  relatedAccountsData,
  reviewsData,
  overallRatingData,
  serviceTabs,
  CONS_PROS,
  newsListData,
  newsDetailsData
}) => {
  const router = useRouter()
  const isInfoPage = categoryUrl === 'i'

  //product json ld schema
  const addProductJsonLd = () => {
    const reviewCount = overallRatingData?.data?.total_reviews > 0 ? overallRatingData?.data?.total_reviews : 1
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
    if (!isInfoPage) {
      if (!productDetailsData?.product_details) {
        router?.push('/404')
      }
    }
  }, [productDetailsData, router, isInfoPage])

  return (
    <div>
      {productDetailsData?.product_details && (
        <Head>
          <script type='application/ld+json' key='app-ld-json' dangerouslySetInnerHTML={productDetailJson} />
        </Head>
      )}
      <>
        <div>
          <section>
            <div className='bg-[#844FCF]'>
              <DynamicHeader businessCategorydata={businessCategorydata} />
            </div>
          </section>
          <div className='bg-[#F4F8FB]'>
            {isInfoPage ? (
              <>
                <CommonBreadCrumbComponent
                  link1={'/bank-accounts'}
                  link1Name='Bank Accounts'
                  link2={`/bank-accounts/${categoryUrl}`}
                  link2Name='Info'
                  link3Name={capitalizeFirstLetter(pdpUrl)?.split('-')?.join(' ')}
                  isDetailsPage={true}
                />
                <CreditNewsDetails
                  blogUrl={pdpUrl}
                  newsDetailsData={newsDetailsData}
                  newsListData={newsListData}
                  bankPage={true}
                />
              </>
            ) : (
              <>
                <CommonBreadCrumbComponent
                  link1={'/bank-accounts'}
                  link1Name='Bank Accounts'
                  link2={`/bank-accounts/${categoryUrl}`}
                  link2Name={capitalizeFirstLetter(categoryUrl)?.split('-')?.join(' ')}
                  link3Name={capitalizeFirstLetter(pdpUrl)?.split('-')?.join(' ')}
                  isDetailsPage={true}
                />
                {productDetailsData?.product_details && (
                  <SavingAccountsDetails
                    productDetailsData={productDetailsData}
                    longFormData={longFormData}
                    relatedAccountsData={relatedAccountsData}
                    reviewsData={reviewsData?.all_review}
                    overallRatingData={overallRatingData?.data}
                    serviceTabs={serviceTabs}
                    CONS_PROS={CONS_PROS}
                    url_slug={pdpUrl}
                  />
                )}
              </>
            )}
          </div>
          <div className='bg-[#F4F8FB]'>
            <FAQ faqdata={faqData} />
          </div>
          <DynamicFooter businessCategorydata={businessCategorydata} />
          <div className='scroll-top'>
            <ScrollToTop smooth color='#000' />
          </div>
        </div>
      </>
    </div>
  )
}

export default SavingsAccountsDetails
