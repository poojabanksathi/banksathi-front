import React from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const SetUpProfile = dynamic(() => import('@/core/component/Layout/setUpProfile'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})

export default function Index({ businessCategorydata }) {
  return (
    <>
      <div className='h-auto bg-[#F4F8FB]'>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <SetUpProfile />
        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''

    const req1 = {
      website_url: website_url,
      lang_id: lang_id
    }
    const req2 = {
      lang_id: lang_id
    }

    const response2 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req2).catch((error) => {
      return { data: 'notFound' }
    })
    const [data2] = await Promise.all([response2]).then((responses) =>
      responses.map((response) => response.data)
    )

    return {
      props: {
        businessCategorydata: data2,
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
