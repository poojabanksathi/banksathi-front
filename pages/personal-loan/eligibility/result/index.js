import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, PRODUCTSAPI, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const LoanEligibilityResult = dynamic(
  () =>
    import('@/core/component/Layout/PersonalLoan/PersonalLoanEligibility/LoanEligibilityResult/LoanEligibilityResult'),
  { ssr: false }
)
export async function getServerSideProps(context) {
  try {
    const slug = context?.params?.index[0]
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''

    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''

    const leadsParams = { user_agent, ip }

    const bussinessCatParams = {
      lang_id: lang_id
    }

    const productDetailParam = {
      lang_id: 1,
      url_slug: slug
    }
    const req41 = {
      lang_id: lang_id,
      business_category_url_slug: 'personal-loan',
      offset: 0,
      limit: 200
    }
    const bussinessCatResponse = await Axios.post(
      BASE_URL + BUSINESSCATEGORY.productCategoryLanguage,
      bussinessCatParams
    )
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const alternateProductResponse = await Axios.post(BASE_URL + PRODUCTSAPI.getAlternateProduct, productDetailParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })
    const productListResponse = await Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req41)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return null
      })

    return {
      props: {
        businessCategorydata: bussinessCatResponse,
        eligibleSlug: alternateProductResponse,
        alternetRelatedproduct: alternateProductResponse,
        productList: productListResponse,
        referer: ref,
        leadsParams: leadsParams
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

const LoanEligibilityResultPage = ({
  businessCategorydata,
  alternetRelatedproduct,
  eligibleSlug,
  productList,
  leadsParams
}) => {
  useEffect(() => {
    if (leadsParams) {
      if (typeof window !== 'undefined') {
        sessionStorage?.setItem('leadsParams', JSON.stringify(leadsParams))
      }
    }
  }, [leadsParams])
  return (
    <>
      <div className='h-full bg-[#F4F8FB]'>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <LoanEligibilityResult
          eligibleSlug={eligibleSlug}
          alternetRelatedproduct={alternetRelatedproduct}
          productList={productList}
        />
        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}

export default LoanEligibilityResultPage
