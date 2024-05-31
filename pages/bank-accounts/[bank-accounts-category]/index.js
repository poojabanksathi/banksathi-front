import {
  BASE_URL,
  BLOG,
  BUSINESSCATEGORY,
  BUSINESSSUBCATEGORY,
  BrowseServices,
  COMMON,
  FAQAPI
} from '@/utils/alljsonfile/service'
import { capitalizeFirstLetter } from '@/utils/util'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ScrollToTop from 'react-scroll-to-top'

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
const SavingAccountList = dynamic(() => import('@/core/component/Layout/savingAccountList'), {
  ssr: false
})

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const url_slug = context?.params?.['bank-accounts-category'] || ''
    const referer = context?.req?.headers?.referer || null
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const h = context?.query?.h || ''
    const cat_url = context?.resolvedUrl ? context?.resolvedUrl.split('/')[1] : ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }
    const page = context?.query?.page ? context?.query?.page - 1 : 0

    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
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
    // META
    const metaResponse = await axios
      .post(BASE_URL + BUSINESSSUBCATEGORY.productListCatTags, req1)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return err
      })
    // FAQ
    const faqData = await axios
      .post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })
    // PRODUCTS
    const bankAccountsData = await axios
      .post(BASE_URL + BUSINESSSUBCATEGORY?.productListCatSub, sub_cat_params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    //SUBCATEGORY TABS
    const subCategoryTabs = await axios
      .post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })

    // LONG FORM CONTENT
    const longFormData = await axios
      .post(BASE_URL + BUSINESSSUBCATEGORY.subCatformcontent, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    // BUSINESS CATEGORY DATA
    const businessCategoryData = await axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    // LEFT MENU
    const leftMenuFilterData = await axios
      .post(BASE_URL + BUSINESSSUBCATEGORY.gettopmorewaydetails, req1)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
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

    // NEWS LIST
    const newsList = await axios
      .post(BASE_URL + BLOG.newsList, newsReq)
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
        bankAccountsData: bankAccountsData || null,
        subCategoryTabsData: subCategoryTabs || null,
        longFormData: longFormData?.product_list || null,
        businessCategoryData: businessCategoryData || null,
        leftMenuFilterData: leftMenuFilterData || null,
        url_slug: url_slug || '',
        serviceTabs: serviceTabs || null,
        h: h,
        leadsParams: leadsParams,
        sub_cat_params: sub_cat_params,
        newsList: newsList || null
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
const BankAccountsSubCategory = ({
  businessmetaheadtag,
  longFormData,
  bankAccountsData,
  faqData,
  businessCategoryData,
  leftMenuFilterData,
  subCategoryTabsData,
  url_slug,
  serviceTabs,
  sub_cat_params,
  newsList
}) => {
  const router = useRouter()

  const isInfoPage = url_slug === 'i'

  useEffect(() => {
    if (!isInfoPage) {
      if (!bankAccountsData || bankAccountsData?.product_list?.length === 0) {
        router?.push('/404')
      }
      if (!businessmetaheadtag) {
        router.push('/404')
      }
    }
  }, [bankAccountsData, businessmetaheadtag, router, isInfoPage])

  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategoryData} />
        </div>
      </section>
      {isInfoPage ? (
        <div className='bg-[#F4F8FB]'>
          <CommonBreadCrumbComponent
            link1={'/bank-accounts'}
            link1Name='Bank Accounts'
            link2={`/bank-accounts/${url_slug}`}
            link2Name='Info'
          />
          <CreditNews CreditNewsList={newsList} pageTitle={'Bank Accounts Information'} bankPage={true} />
        </div>
      ) : (
        <>
          <div className='bg-[#F4F8FB]'>
            <CommonBreadCrumbComponent
              link1={'/bank-accounts'}
              link1Name='Bank Accounts'
              link2={`/bank-accounts/${url_slug}`}
              link2Name={capitalizeFirstLetter(url_slug)?.split('-')?.join(' ')}
            />
            {bankAccountsData?.product_list && (
              <>
                <SavingAccountList
                  businessmetaheadtag={businessmetaheadtag}
                  longFormData={longFormData}
                  bankAccountsData={bankAccountsData?.product_list}
                  leftMenuFilterData={leftMenuFilterData}
                  faqdata={faqData}
                  subCategoryTabs={subCategoryTabsData}
                  url_slug={url_slug}
                  isSubCategoryFlow={true}
                  totalProducts={bankAccountsData?.total_count}
                  serviceTabs={serviceTabs}
                  sub_cat_image={true}
                  sub_cat_params={sub_cat_params}
                />
                <div className='bg-[#F4F8FB]'>
                  <FAQ faqdata={faqData} />
                </div>
              </>
            )}
          </div>
        </>
      )}

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

export default BankAccountsSubCategory
