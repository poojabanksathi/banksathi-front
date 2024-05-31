import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import withAuth from '@/core/component/common/PrivateRoute'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const ProductsScore = dynamic(() => import('@/core/component/Layout/scoreCreditCard/ProductsScore'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''

    const req3 = {
      lang_id: lang_id
    }
    const req2 = {
      lang_id: lang_id,
      page_id: page_id
    }
    const req41 = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards',
      offset: 0,
      limit: 200
    }
    const bankAccount = {
      lang_id: lang_id,
      business_category_url_slug: 'bank-accounts'
    }
    const metaParams = {
      lang_id: lang_id,
      page_url_slug: 'myprofile-my-offer'
    }
    const response1 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })

    const response2 = await Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response4 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req41).catch((error) => {
      return { data: null }
    })
    const bankAccountCards = await Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, bankAccount).catch(
      (error) => {
        return { data: null }
      }
    )
    const metaApiCall = await Axios.post(BASE_URL + COMMON?.metaDetailPage, metaParams).catch((error) => {
      return null
    })
    const [data1, data2, data4, bankAccountListing, data5] = await Promise.all([
      response1,
      response2,
      response4,
      bankAccountCards,
      metaApiCall
    ]).then((responses) => responses.map((response) => response?.data))

    return {
      props: {
        businessCategorydata: data1 || null,
        faqdata: data2 || null,
        productList: data4 || null,
        referer: ref || '',
        bankAccountListing: bankAccountListing || null,
        businessmetaheadtag: data5?.data || null
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

const MyOffer = ({
  businessCategorydata,
  faqdata,
  productList,
  bankAccountListing,
  businessmetaheadtag
}) => {
  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <ProductsScore faqdata={faqdata} productList={productList} bankAccountListing={bankAccountListing} />
        </div>

        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}
export default withAuth(MyOffer)
