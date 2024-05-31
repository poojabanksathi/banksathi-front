import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import {
  BASE_URL,
  BLOG,
  BUSINESSCATEGORY,
  BUSINESSSUBCATEGORY,
  BrowseServices,
  COMMON,
  FAQAPI
} from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import CommonBreadCrumbComponent from '@/core/component/common/CommonList/CommonBreadCrumbComponent'
import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from '@/utils/util'

const PersonalLoanApplication = dynamic(
  () => import('@/core/component/Layout/PersonalLoan/PersonalLoanApplication/PersonalLoanApplication'),
  { ssr: false }
)
const PersonalLoan = dynamic(() => import('@/core/component/Layout/PersonalLoan/PersonalLoan'), { ssr: false })
const CreditNews = dynamic(() => import('@/core/component/Layout/CreditNews/CreditNews'), {
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

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const url_slug = context?.params?.['personal-loan-category'] || context?.resolvedUrl?.split('/')?.pop()
    const referer = context?.req?.headers?.referer || null
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const h = context?.query?.h || ''
    const page = context?.query?.page ? context?.query?.page - 1 : 0
    const cat_url = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]

    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const fullListParams = {
      lang_id: lang_id,
      business_category_url_slug: cat_url,
      business_sub_category_url_slug: url_slug,
      offset: 0,
      limit: 200
    }
    const sub_cat_params = {
      lang_id: lang_id,
      business_category_url_slug: cat_url,
      business_sub_category_url_slug: url_slug,
      offset: page,
      limit: 20
    }
    const faqParams = {
      lang_id: lang_id,
      sub_cat_url_slug: url_slug
    }
    const langIdParam = {
      lang_id: lang_id
    }
    const serviceTabsParams = {
      lang_id: 1,
      business_category_url_slug: ''
    }
    const newsReq = {
      blog_url_slug: cat_url,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    const metaResponse = await Axios.post(BASE_URL + BUSINESSSUBCATEGORY.productListCatTags, req1)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return err
      })
    const faqData = await Axios.post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    const personalProducts = await Axios.post(BASE_URL + BUSINESSSUBCATEGORY?.productListCatSub, sub_cat_params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    const allPersonalProducts = await Axios.post(BASE_URL + BUSINESSSUBCATEGORY?.productListCatSub, fullListParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    const subCategoryTabs = await Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const longFormData = await Axios.post(BASE_URL + BUSINESSSUBCATEGORY.subCatformcontent, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const businessCategoryData = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const leftMenuFilterData = await Axios.post(BASE_URL + BUSINESSSUBCATEGORY.moreleftmenufilter, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const serviceTabs = await Axios.post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    // NEWS LIST
    const newsList = await Axios.post(BASE_URL + BLOG.newsList, newsReq)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    return {
      props: {
        referer: referer,
        businessmetaheadtag: metaResponse?.h1_paragraph || null,
        faqData: faqData || null,
        personalProducts: personalProducts || null,
        subCategoryTabs: subCategoryTabs || null,
        longFormData: longFormData || null,
        businessCategoryData: businessCategoryData || null,
        leftMenuFilterData: leftMenuFilterData || null,
        url_slug: url_slug || '',
        serviceTabs: serviceTabs || null,
        h: h,
        allPersonalProducts: allPersonalProducts || null,
        newsList: newsList
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

const PersonalLoanCategory = ({
  businessmetaheadtag,
  longFormData,
  personalProducts,
  faqData,
  businessCategoryData,
  subCategoryTabs,
  url_slug,
  serviceTabs,
  allPersonalProducts,
  newsList
}) => {
  const router = useRouter()
  const isInfoPage = router?.query?.['personal-loan-category'] === 'i'
  useEffect(() => {
    if (!isInfoPage) {
      if (url_slug !== 'leads') {
        if (!personalProducts || !personalProducts?.length <= 0) {
          router.push('/404')
        }
      }
    }
  }, [personalProducts, router, url_slug, isInfoPage])
  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategoryData} />
        </div>
      </section>
      <div className='bg-[#F4F8FB]'>
        {isInfoPage ? (
          <>
            <CommonBreadCrumbComponent
              link1={'/personal-loan'}
              link1Name='Personal Loan'
              link2={`/personal-loan/${url_slug}`}
              link2Name={'Information'}
            />
            <CreditNews CreditNewsList={newsList} pageTitle={'Personal Loan Information'} loanPage={true} />
          </>
        ) : (
          <>
            <CommonBreadCrumbComponent
              link1={'/personal-loan'}
              link1Name='Personal Loan'
              link2={`/personal-loan/${url_slug}`}
              link2Name={url_slug === 'leads' ? 'Leads' : capitalizeFirstLetter(url_slug)?.split('-')?.join(' ')}
            />
            {url_slug === 'leads' ? (
              <PersonalLoanApplication businessmetaheadtag={businessmetaheadtag} />
            ) : (
              <PersonalLoan
                businessmetaheadtag={businessmetaheadtag}
                personalProducts={personalProducts}
                longFormData={longFormData}
                allPersonalProducts={allPersonalProducts}
                subCategoryTabs={subCategoryTabs?.category_info}
                url_slug={url_slug}
                isSubCategoryFlow={true}
                serviceTabs={serviceTabs}
              />
            )}
          </>
        )}
      </div>
      <div className='bg-[#F4F8FB]'>
        <FAQ faqdata={faqData} />
      </div>
      <div>
        <MobileFooter businessCategorydata={businessCategoryData} />
      </div>
      <DynamicFooter />
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}
export default PersonalLoanCategory
