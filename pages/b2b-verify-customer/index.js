import React from 'react'
import ScrollToTop from 'react-scroll-to-top'
import dynamic from 'next/dynamic'
import { B2B, BASE_URL, BUSINESSCATEGORY } from '@/utils/alljsonfile/service'
import axios from 'axios'


const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const B2bVerifyCustomer = dynamic(() => import('@/core/component/Layout/B2bVerifyCustomer/B2bVerifyCustomer'), {
  ssr: false
})

export const getServerSideProps = async (context) => {
  try {
    const lang_id = 1
    const queryString = context?.query?.h?.replace(' ', '+')
    const customerId = queryString || ""

    const params = {
      encoded_data: customerId
    }
    const referer = context?.req?.headers?.referer || ''

    const reqParams = {
      lang_id: lang_id
    }
    const req1 = {
      lang_id: lang_id
    }

    const customerDetailsData = await axios
      .post(BASE_URL + B2B?.b2bCustomerDetails, params)
      .then((response) => {
        return response
      })
      .catch((err) => {
        console.log('error while fetching customer details', err)
      })

    const businessCategorydata = await axios
      .post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, reqParams)
      .then((res) => {
        return res
      })
      .catch((error) => console.log('err', error))

    const topMenuData = await axios
      .post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1)
      .then((res) => {
        return res
      })
      .catch((error) => console.log('err', error))

    return {
      props: {
        businessCategorydata: businessCategorydata?.data || [],
        customerDetails: customerDetailsData?.data || [],
        referer: referer
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
const Index = ({ customerDetails, businessCategorydata }) => {
  return (
    <>
      <div>
     
        <section>
          <div className='bg-[#844FCF]'>
            <DynamicHeader businessCategorydata={businessCategorydata} />
          </div>
        </section>
        <div className='bg-[#F4F8FB]'>
          {customerDetails?.data && <B2bVerifyCustomer customerDetails={customerDetails?.data} />}
        </div>
        <DynamicFooter businessCategorydata={businessCategorydata} />

        <div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
        </div>
      </div>
    </>
  )
}

export default Index
