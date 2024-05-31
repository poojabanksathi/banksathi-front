import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import dynamic from 'next/dynamic'
import React from 'react'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'

const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)

const MobileFooter = dynamic(() => import('../../../core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const PersonalLoanCompare = dynamic(
  () => import('@/core/component/Layout/PersonalLoan/PersonalLoanCompare/PersonalLoanCompare'),
  {
    ssr: false
  }
)
const LoanComparePdf = dynamic(
  () => import('@/core/component/Layout/PersonalLoan/PersonalLoanCompare/LoanComparePdf/LoanComparePdf'),
  {
    ssr: false
  }
)
export async function getServerSideProps(context) {
  try {
    const { personal_loan_slug } = context.params
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const lang_id = 1
    const url_slug = ''
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''

    const req1 = {
      lang_id: lang_id,
      url_slug: url_slug
    }

    const slugOne = {
      lang_id: 1,
      url_slug: personal_loan_slug?.[0]
    }
    const slugTwo = {
      lang_id: lang_id,
      url_slug: personal_loan_slug?.[1]
    }
    const slugThree = {
      lang_id: lang_id,
      url_slug: personal_loan_slug?.[2]
    }

    const req4 = {
      lang_id: lang_id,
      business_category_url_slug: context_params
    }

    const faqData = await Axios.post(BASE_URL + FAQAPI.productFaq, req1)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return null
      })
    const slug1Data = await Axios.post(BASE_URL + multipleSlug.productAllDetails, slugOne)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const slug2Data = await Axios.post(BASE_URL + multipleSlug.productAllDetails, slugTwo)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const slug3Data = await Axios.post(BASE_URL + multipleSlug.productAllDetails, slugThree)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const response6 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const productListData = await Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req4)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })

    return {
      props: {
        faqdata: faqData || null,
        slug1Data: slug1Data,
        slug2Data: slug2Data,
        slug3Data: slug3Data,
        businessCategorydata: response6,
        productcomparedata: productListData,
        referer: ref
      }
    }
  } catch (error) {
    return null
  }
}
const PersonalLoanComparePage = ({
  faqdata,
  slug1Data,
  slug2Data,
  slug3Data,
  businessCategorydata,
  productcomparedata,
}) => {
  const router = useRouter()
  const isPdfPage = router?.asPath?.split('/').pop() === 'pdf'

  return isPdfPage ? (
    <LoanComparePdf
      slug1={slug1Data}
      slug2={slug2Data}
      slug3={slug3Data}
      productcomparedata={productcomparedata}
      link={`/credit-cards`}
      title='Compare Personal Loans'
    />
  ) : (
    <div>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader
            businessCategorydata={businessCategorydata}
            showCreditScore={false}
            slug1={slug1Data}
            slug2={slug2Data}
            slug3={slug3Data}
          />
        </div>
      </section>
      <div className='pb-4 bg-[#F4F8FB]'>
        <CommonBreadCrumbComponent
          link1={'/personal-loan'}
          link1Name='Personal Loan'
          link2Name={'Compare'}
          link2={router?.asPath}
          title={'Personal Loan'}
        />
      </div>
      <div>
        <PersonalLoanCompare
          slug1Data={slug1Data}
          slug2Data={slug2Data}
          slug3Data={slug3Data}
          productcomparedata={productcomparedata}
          faqdata={faqdata}
        />
        <MobileFooter />
      </div>
      <DynamicFooter />
      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </div>
  )
}

export default PersonalLoanComparePage
