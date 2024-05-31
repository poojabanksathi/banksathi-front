import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, PRODUCTSAPI, multipleSlug } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const EligibilityCreditCardTwo = dynamic(() => import('@/core/component/Layout/eligibilityCreditCardTwo'), {
  ssr: false
})
const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

export default function Index({
  businessCategorydata,
  eligibleSlug,
  productList,
  leadsParams
}) {
  
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
        <EligibilityCreditCardTwo eligibleSlug={eligibleSlug} alternetRelatedproduct={productList} />
        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const slug = context?.params?.index[0]

    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''

    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''

    const leadsParams = { user_agent, ip }
    const req2 = {
      lang_id: lang_id
    }

    const req4 = {
      lang_id: 1,
      url_slug: slug
    }
    const req41 = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards',
      offset: 0,
      limit: 200
    }
    const response2 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2).catch((error) => {
      return { data: 'notFound' }
    })

    const response4 = await Axios.post(BASE_URL + multipleSlug.productAllDetails, req4).catch((error) => {
      return { data: null }
    })
    const response5 = Axios.post(BASE_URL + PRODUCTSAPI.getAlternateProduct, req4).catch((error) => {
      return { data: null }
    })
    const response6 = Axios.post(BASE_URL + BUSINESSCATEGORY?.productListCategory, req41).catch((error) => {
      return { data: 'notFound' }
    })
    const [data2, data4, data5, data6] = await Promise.all([
      response2,
      response4,
      response5,
      response6
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        businessCategorydata: data2,
        eligibleSlug: data4,
        alternetRelatedproduct: data5,
        productList: data6,
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
