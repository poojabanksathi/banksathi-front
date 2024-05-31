import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { BASE_URL, multipleSlug } from '@/utils/alljsonfile/service'

import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { MainContext } from '@/core/component/Leads/MainContext.js'

const MobileFooter = dynamic(() => import('../../../core/component/common/MobileFooter'), {
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


export default function Leads({ productData, referer, leadsField, h,}) {

  const [fieldValue, setFieldValue] = useState()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refererUrl = localStorage?.getItem('url')

      
      const utm_details = refererUrl?.split('?')?.[1]

      const updatedLeadsField = {
        ...leadsField,
        utm_details
      }
      setFieldValue(updatedLeadsField)

      // set H
      if (h) {
        sessionStorage.setItem('h', h)
      } else sessionStorage.removeItem('h')
    }
  }, [leadsField,h])

  useEffect(() => {
    if (productData?.product_details == null) {
      router.push('/401')
    }
  }, [productData?.product_details, router])

  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader />
        </div>
       
        {productData != undefined ? (
          <>
            <MainContext.Provider value={productData}>
              <div className='bg-[#F4F8FB] h-full'>
                <LeadsArea referer={referer} leadsField={fieldValue} />
              </div>
            </MainContext.Provider>
          </>
        ) : (
          <>Loading...</>
        )}
      </section>
      <div>
     
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
    const productSlug =
      context?.params?.['product-slug'] || (context?.resolvedUrl && context?.resolvedUrl.split('/')[2])
    const ref = context?.req?.headers?.referer || ''
    const h = context?.query?.h || ''

    const user_agent = context?.req?.headers['user-agent']
    const deviceId = user_agent?.match(/Android|BlackBerry|iPhone|Mac|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    const headers = context?.req?.headers
    const ip = headers?.['x-forwarded-for'] ? headers?.['x-forwarded-for']?.split(',')[0] : null
    const req = {
      lang_id: 1,
      url_slug: productSlug
    }


    const response = await Axios.post(BASE_URL + multipleSlug.productAllDetails, req).catch((error) => {
      return { data: false }
    })

    const productData = await Promise.resolve(response).then(response)

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
        productData: productData?.data,
        referer: ref,
        h: h,
        leadsField: { device_id: deviceId, user_agent: user_agent, ip_address: ip },
    
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
