import RecommendationJourney from '@/core/component/Layout/RecommendationJourney/RecommendationJourney'
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/core/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})
const ServiceTabs = dynamic(() => import('@/core/component/Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})
import CommonBreadCrumbComponent from '@/core/component/common/CommonList/CommonBreadCrumbComponent'
import TagManager from 'react-gtm-module'

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const { resolvedUrl, req } = context
    const url_slug = resolvedUrl?.split('/')?.pop()
    const referer = req?.headers?.referer || null
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const h = context?.query?.h || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }
    const categorySlug = resolvedUrl?.split('/')?.[1]

    const tabsParams = {
      lang_id: lang_id,
      business_category_url_slug: categorySlug
    }

    const faqParams = {
      lang_id: lang_id,
      url_slug: url_slug
    }
    const faqData = await Axios.post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    const subCategoryTabs = await Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, tabsParams)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })

    const req1 = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }
    const longFormData = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })

    const langIdParam = {
      lang_id: lang_id
    }
    const businessCategoryData = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })

    const serviceTabsParams = {
      lang_id: 1,
      business_category_url_slug: ''
    }
    const serviceTabs = await Axios.post(BASE_URL + BrowseServices.serviceTabs, serviceTabsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log('Error', err)
        return { data: null }
      })

    const topMenuCategories = await Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, tabsParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    const creditParams = {
      lang_id: lang_id,
      business_category_url_slug: categorySlug || 'credit-cards',
      offset: 0,
      limit: 200
    }

    const creditCardsList = await Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, creditParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    return {
      props: {
        referer: referer,
        faqData: faqData || null,
        subCategoryTabs: subCategoryTabs || null,
        businessmetaheadtag: longFormData?.data || null,
        businessCategoryData: businessCategoryData || null,
        url_slug: url_slug || '',
        serviceTabs: serviceTabs || null,
        h: h,
        leadsParams: leadsParams,
        topMenuCategories: topMenuCategories || null,
        creditCardsList: creditCardsList || null
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
const CreditCardsRecommendation = ({
  faqData,
  businessmetaheadtag,
  businessCategoryData,
  serviceTabs,
  topMenuCategories,
  creditCardsList
}) => {
  const [sourceUrl, setSourceUrl] = useState()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')
      const utm_details = refererUrl?.split('?')?.[1]
      setSourceUrl(utm_details)
    }
  }, [])

  const handleGTM = () => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
      TagManager?.dataLayer({
        dataLayer: {
          event: 'card_recommend',
          source: sourceUrl || "",
          date: formattedDate,
        },
      });
  }

  useEffect(() => {
    handleGTM();
  }, []);

  return (
    <div>
      <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div>
      <div className='bg-[#F4F8FB]'>
        <CommonBreadCrumbComponent
          link1={'/credit-cards'}
          link1Name='Credit Cards'
          link2={'/credit-cards/recommendation'}
          link2Name='Recommendation'
        />
        <RecommendationJourney
          topMenuCategories={topMenuCategories}
          serviceTabs={serviceTabs}
          longFormData={businessmetaheadtag}
          creditCardsList={creditCardsList}
        />
        <CreditBeginnerCard longTerm={businessmetaheadtag} />
        {serviceTabs && (
          <div className='max-sm:mx-0 container mx-auto'>
            <ServiceTabs serviceTabs={serviceTabs} position={'3'} />
          </div>
        )}
        <div className='bg-[#F4F8FB]'>
          <FAQ faqdata={faqData} />
        </div>
        <div></div>
        <div>
        </div>
        <div>
          <MobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <div>
        <DynamicFooter businessCategorydata={businessCategoryData} />
        <div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
        </div>
      </div>
    </div>
  )
}

export default CreditCardsRecommendation
