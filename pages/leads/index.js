import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, COMMON, FAQAPI, PRODUCTSAPI } from '@/utils/alljsonfile/service'

import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { MainContext } from '@/core/component/Leads/MainContext.js'

import { useRouter } from 'next/router'

const MobileFooter = dynamic(() => import('../../core/component/common/MobileFooter'), {
  ssr: false
})

const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const LeadsArea = dynamic(() => import('@/core/component/Leads'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('@/core/component/Layout/creditCardList/CreditBeginnerCard'), {
  ssr: false
})

export default function Leads(productData, referer, leadsField, faqData, longFormData) {

  const router = useRouter()

  useEffect(() => {
    router.push('/404')
  }, [])
  
  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader />
        </div>

        {productData != undefined ? (
          <>
            <MainContext.Provider value={productData}>
              <div className='bg-[#F4F8FB]'>
                <LeadsArea referer={referer} leadsField={leadsField} />
              </div>
            </MainContext.Provider>
          </>
        ) : (
          <>Loading...</>
        )}
      </section>
      <div className='bg-[#F4F8FB] h-auto'>
        <CreditBeginnerCard longTerm={longFormData} />
      </div>

      <div className='bg-[#F4F8FB] h-auto'>
        <FAQ faqdata={faqData} />
      </div>

      <div className='bg-[#F4F8FB]'>
        <MobileFooter />
      </div>
      <DynamicFooter />

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const { req } = context

    const productSlug = context?.resolvedUrl
    const h = context?.query?.h || ''
    const url_slug = query ? resolvedUrl?.split('?')?.[0]?.replace('/', '') : resolvedUrl?.split('/')?.pop()

    const req1 = {
      lang_id: 1,
      url_slug: productSlug
    }
    const req2 = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }
    const faqParams = {
      lang_id: lang_id,
      url_slug: url_slug
    }

    const productData = await Axios.post(BASE_URL + PRODUCTSAPI.getProductDetails, req1)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        console.log(err)
        return null
      })

    const longForm = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req2)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    //FaQ api
    const faqData = await Axios.post(BASE_URL + FAQAPI.productFaq, faqParams)
      .then((res) => {
        return res?.data
      })
      .catch((err) => {
        return null
      })

    if (productData?.data == false) {
      return {
        redirect: {
          destination: '/401',
          permanent: false
        }
      }
    }
    return {
      props: {
        productData: productData.data,
        referer: ref,
        leadsField: {},
        h: h,
        faqData: faqData || {},
        longFormData: longForm || {}
      }
    }
  } catch (error) {
    let productSlug =
      context?.resolvedUrl && context?.resolvedUrl.split('/')[context?.resolvedUrl.split('/').length - 1]
    return {
      props: {
        notFound: false
      }
    }
  }
}
