import { useWindowSize } from '@/hooks/useWindowSize'
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
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'

const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
const PersonalLoanApplication = dynamic(
  () => import('@/core/component/Layout/PersonalLoan/PersonalLoanApplication/PersonalLoanApplication'),
  { ssr: false }
)
const CreditNewsDetails = dynamic(
  () => import('@/core/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails'),
  { ssr: false }
)
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const PersonalLoanDetails = dynamic(
  () => import('@/core/component/Layout/PersonalLoan/PersonalLoanDetails/PersonalLoanDetails'),
  {
    ssr: false
  }
)
export const getServerSideProps = async (context) => {
  try {
    const lang_id = 1
    const referer = context?.req?.headers?.referer || ''
    const url_slug = context?.params?.['personal-loan-details'] || context?.resolvedUrl?.split('/')?.pop() || ''
    const categoryUrl = context?.params?.['personal-loan-category'] || ''

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
        return null
      })
    // FAQ
    const faqData = await axios
      .post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    // BUSINESS CATEGORY
    const businessCategorydata = await axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, reqParams)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return null
      })
    // TOPMENU
    const topMenuData = await axios
      .post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => {
        return res
      })
      .catch((error) => {
        return null
      })

    //PRODUCT DETAILS
    const productDetailsData = await axios
      .post(BASE_URL + multipleSlug.productAllDetails, pdpParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    // LONG FORM
    const longFormData = await axios
      .post(BASE_URL + PRODUCTSAPI.productformLongcontent, params)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    // RELATED ACCOUNTS
    const relatedAccountsData = await axios
      .post(BASE_URL + PRODUCTSAPI.getAlternateProduct, params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    // ALL REVIEWS
    const reviewsData = await axios
      .post(BASE_URL + PRODUCTSAPI.getAllReview, reviewsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    // OVERALL RATING
    const overallRatingData = await axios
      .post(BASE_URL + PRODUCTSAPI.getOverallRating, overallRatingParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    //PRODUCT CONS PROS REVIEW
    const CONS_PROS = await axios
      .post(BASE_URL + BrowseServices.consProsOfProduct, cons_pros_params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    //BROWSE SERVICE TABS
    const serviceTabs = await axios
      .post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
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
const PersonalLoanDetailsPage = ({
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
  newsDetailsData,
  newsListData
}) => {
  const router = useRouter()
  const size = useWindowSize()
  const mobileSize = size?.width <= 576
  const [showComponent, setShowComponent] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const hasLeads = categoryUrl === 'leads'
  const isInfoPage = router?.query?.['personal-loan-category'] === 'i'

  useEffect(() => {
    if (!isInfoPage) {
      if (!hasLeads) {
        if (!productDetailsData || !productDetailsData?.product_details?.length <= 0) {
          router.push('/404')
        }
      }
    }
  }, [productDetailsData, router, hasLeads, isInfoPage])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop && currentScrollTop > window.innerHeight / 1.2) {
        setShowComponent(true);
      } else if (currentScrollTop <= window.innerHeight / 1.2) {
        setShowComponent(false);
      }
      setLastScrollTop(currentScrollTop);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <>
      <div>
        <section>
          <div className='bg-[#844FCF]'>
            <DynamicHeader businessCategorydata={businessCategorydata} />
          </div>
        </section>
        <div className='bg-[#F4F8FB]'>
          {isInfoPage ? (
            <div className='bg-[#F4F8FB]'>
              <CommonBreadCrumbComponent
                link1={'/personal-loan'}
                link1Name='Personal Loan'
                link2={`/personal-loan/${categoryUrl}`}
                link2Name={capitalizeFirstLetter(categoryUrl)?.split('-')?.join(' ')}
              />
              <CreditNewsDetails
                blogUrl={pdpUrl}
                newsDetailsData={newsDetailsData}
                newsListData={newsListData}
                loanPage={true}
                pathRedirect='/personal-loan/eligibility'
                personalLoan={true}
              />
            </div>
          ) : hasLeads ? (
            <>
              <CommonBreadCrumbComponent
                link1={'/personal-loan'}
                link1Name='Personal Loan'
                link2={`/personal-loan/${categoryUrl}`}
                link2Name={'Leads'}
              />
              <PersonalLoanApplication
                businessmetaheadtag={businessmetaheadtag}
                productDetailsData={productDetailsData}
                url_slug={pdpUrl}
              />
            </>
          ) : (
            <div className='bg-[#F4F8FB]'>
              <CommonBreadCrumbComponent
                link1={'/personal-loan'}
                link1Name='Personal Loan'
                link3Name={
                  productDetailsData?.product_details?.card_name || capitalizeFirstLetter(pdpUrl)?.split('-')?.join(' ')
                }
                isDetailsPage={true}
              />
              {/* PERSONAL LOAN DETAILS PAGE */}
              <div className='mt-[28px]'>
                <PersonalLoanDetails
                  productDetailsData={productDetailsData}
                  longFormData={longFormData}
                  relatedAccountsData={relatedAccountsData}
                  reviewsData={reviewsData?.all_review}
                  overallRatingData={overallRatingData}
                  serviceTabs={serviceTabs}
                  CONS_PROS={CONS_PROS}
                  url_slug={pdpUrl}
                />
              </div>
              <FAQ faqdata={faqData} />
            </div>
          )}
        </div>
        <div>
          {/* <TrobleChoose position={'5'} /> */}
          <MobileFooter businessCategorydata={businessCategorydata} />
        </div>
        <DynamicFooter businessCategorydata={businessCategorydata} />
        {isInfoPage && mobileSize && showComponent && (
        <div className='fixed bottom-0 left-0 z-[999] h-[53px] w-full justify-between items-center'>
          <div className='text-center'>
                          <Link href='/personal-loan/eligibility'>
                            <button className='bg-[#49D49D] w-full py-[18px] lg:w-[240px]  max-[240px]:w-full  font-faktum font-semibold text-[14px] leading-[18px] tracking-wide text-[#212529]'>
                            Check Personal Loan Eligibility 
                            </button>
                          </Link>
                        </div>
        </div>
       )}
<div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
        </div>
      </div>
    </>
  )
}

export default PersonalLoanDetailsPage
