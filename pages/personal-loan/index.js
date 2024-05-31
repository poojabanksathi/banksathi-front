import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { BASE_URL, BUSINESSCATEGORY, BrowseServices, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import CommonBreadCrumbComponent from '@/core/component/common/CommonList/CommonBreadCrumbComponent'
import { useRouter } from 'next/router'

const PersonalLoan = dynamic(() => import('@/core/component/Layout/PersonalLoan/PersonalLoan'), { ssr: false })

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
    const { query, resolvedUrl, req } = context
    const url_slug = query ? resolvedUrl?.split('?')?.[0]?.replace('/', '') : resolvedUrl?.split('/')?.pop()
    const referer = req?.headers?.referer || null
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const h = context?.query?.h || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }
    const page = context?.query?.page ? context?.query?.page - 1 : 0

    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const params = {
      lang_id: lang_id,
      business_category_url_slug: url_slug,
      offset: page,
      limit: 20
    }
    const fullListParams = {
      lang_id: lang_id,
      business_category_url_slug: url_slug,
      offset: 0,
      limit: 200
    }
    const serviceTabsParams = {
      lang_id: 1,
      business_category_url_slug: ''
    }
    const faqParams = {
      lang_id: lang_id,
      url_slug: url_slug
    }
    const langIdParam = {
      lang_id: lang_id
    }

    const metaResponse = await Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1)
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
    const personalProducts = await Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, params)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    const allPersonalProducts = await Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, fullListParams)
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
    const longFormData = await Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1)
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
    const leftMenuFilterData = await Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1)
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
        console.log('Error', err)
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
        leadsParams: leadsParams,
        allPersonalProducts: allPersonalProducts || null
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

const PersonalLoanPage = ({
  businessmetaheadtag,
  longFormData,
  personalProducts,
  faqData,
  businessCategoryData,
  subCategoryTabs,
  url_slug,
  serviceTabs,
  allPersonalProducts
}) => {
  const router = useRouter()

  useEffect(() => {
    if (!personalProducts || !personalProducts?.length <= 0) {
      router.push('/404')
    }
  }, [personalProducts, router])

  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategoryData} />
        </div>
      </section>
      <div className='bg-[#F4F8FB]'>
        <CommonBreadCrumbComponent link1={'/personal-loan'} link1Name='Personal Loan' />
        <PersonalLoan
          businessmetaheadtag={businessmetaheadtag}
          personalProducts={personalProducts}
          longFormData={longFormData}
          allPersonalProducts={allPersonalProducts}
          subCategoryTabs={subCategoryTabs?.category_info}
          url_slug={url_slug}
          isSubCategoryFlow={false}
          serviceTabs={serviceTabs}
        />
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
export default PersonalLoanPage
