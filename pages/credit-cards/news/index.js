import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import CommonBreadCrumbComponent from '@/core/component/common/CommonList/CommonBreadCrumbComponent'
import { useRouter } from 'next/router'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const DynamicMobileFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const CreditNews = dynamic(() => import('@/core/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})

export default function Index({ businessCategorydata, CreditNewsList }) {
  const router = useRouter()

  useEffect(() => {
    router.push('/credit-cards/i')
  }, [])

  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        {CreditNewsList && (
          <div className='bg-[#F4F8FB] h-auto'>
            <CommonBreadCrumbComponent
              link1={'/credit-cards'}
              link1Name='Credit Cards'
              link2={'/credit-cards/news'}
              link2Name='News'
              title={'Credit Cards News'}
            />
            <CreditNews CreditNewsList={CreditNewsList} pageTitle={'Credit Cards Latest News'} />
          </div>
        )}
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
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const url_slug = context?.resolvedUrl?.split('/')?.pop()
    const ref = context?.req?.headers?.referer || ''
    const blog_url_slug = context?.resolvedUrl?.split('/')?.[1]

    const req = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }
    const req3 = {
      lang_id: lang_id
    }
    const newsReq = {
      blog_url_slug: blog_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    const requestParams = {
      lang_id: lang_id,
      business_category_url_slug: blog_url_slug,
      offset: 0,
      limit: 10
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3).catch((error) => {
      return { data: 'notFound' }
    })
    const response5 = Axios.post(BASE_URL + COMMON?.metaDetailPage, req).catch((error) => {
      return { data: null }
    })
    const response7 = Axios.post(BASE_URL + BLOG.newsList, newsReq).catch((error) => {
      return { data: null }
    })

    const [data1, data7, metaTagsData] = await Promise.all([response1, response7, response5]).then(
      (responses) => responses.map((response) => response?.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        referer: ref,
        CreditNewsList: data7,
        initialOffSet: requestParams?.offset,
        businessmetaheadtag: metaTagsData?.data || null
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
