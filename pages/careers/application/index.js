import React from 'react'
import ScrollToTop from 'react-scroll-to-top'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const JobApplication = dynamic(() => import('@/core/component/Layout/CareerPage/JobApplication/JobApplication'), {
  ssr: false
})

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const url_slug = ''
    const ref=context?.req?.headers?.referer || '';

    const req1 = {
      lang_id: lang_id
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req1).catch((error) => {
      return { data: 'notFound' }
    })

    const [data1] = await Promise.all([response1]).then((responses) =>
      responses.map((response) => response.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        referer:ref,
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
const index = ({ businessCategorydata }) => {
  return (
    <>
      <div>
        <section>
          <div className='bg-[#844FCF]'>
            <DynamicHeader
              businessCategorydata={businessCategorydata}
            />
          </div>
        </section>
        <div className='bg-[#F4F8FB] pb-[100px] max-sm:pb-[167px]'>
          <JobApplication />
        </div>
        <DynamicFooter businessCategorydata={businessCategorydata} />
        <div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
        </div>
      </div>
    </>
  )
}
export default index
