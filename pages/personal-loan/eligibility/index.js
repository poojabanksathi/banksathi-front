import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import React from 'react'
import dynamic from 'next/dynamic'

const PersonalLoanEligibility = dynamic(
  () => import('@/core/component/Layout/PersonalLoan/PersonalLoanEligibility/PersonalLoanEligibility'),
  { ssr: false }
)
const CommonRoundedBreadcrumb = dynamic(
  () => import('@/core/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'),
  { ssr: false }
)
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
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
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL

    const { req } = context
    const ref = req?.headers?.referer || ''
    const categoryUrl = 'loan-eligibility'

    const req2 = {
      lang_id: lang_id
    }

    const req7 = {
      lang_id: lang_id,
      page_url_slug: categoryUrl
    }
    const req6 = {
      lang_id: lang_id,
      url_slug: categoryUrl
    }

    // bussinessCategory
    const bussinessCategoryData = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })

    // metaData- Pagedetails
    const metaData = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req7)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })
    // faqData
    const faqData = await Axios.post(BASE_URL + FAQAPI.productFaq, req6)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })
    return {
      props: {
        businessCategorydata: bussinessCategoryData,
        businessmetaheadtag: metaData?.data || null,
        faqdata: faqData,
        referer: ref
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
const index = ({ businessCategorydata, businessmetaheadtag, faqdata, metaResponseData }) => {
  return (
    <div>
      <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div>
      <div className='bg-[#F4F8FB] '>
        <CommonRoundedBreadcrumb
          link1='/personal-loan'
          link1Name='Personal Loan'
          highlight2={true}
          link2Name='Eligibility'
        />
        <PersonalLoanEligibility metaResponseData={metaResponseData} />
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
    </div>
  )
}

export default index
