import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
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

const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
const CreditNewsDetails = dynamic(
  () => import('@/core/component/Layout/CreditNews/CreditNewsDetails/CreditNewsDetails'),
  {
    ssr: false
  }
)

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref = context?.req?.headers?.referer || ''
    const blog_url_slug = context?.params?.['news-details']
    const credit_url_slug = context?.resolvedUrl?.split('/')?.[1]

    const req3 = {
      lang_id: lang_id
    }
    const newsDetailsReq = {
      blog_url_slug: blog_url_slug
    }
    const newsListReq = {
      blog_url_slug: credit_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }
    const requestParams = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards',
      offset: 0,
      limit: 10
    }
    const response1 = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req3)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })

    const newsListData = await Axios.post(BASE_URL + BLOG.newsList, newsListReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('Error while fetching news list data', error)
      })

    const newsDetailsData = await Axios.post(BASE_URL + BLOG?.blogPostDetail, newsDetailsReq)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        console.log('error while fetching data', error)
      })

    return {
      props: {
        businessCategorydata: response1 || null,
        newsDetailsData: newsDetailsData || null,
        newsListData: newsListData || null,
        referer: ref,
        blogUrl: blog_url_slug,
        initialOffSet: requestParams?.offset,
        businessmetaheadtag: newsDetailsData?.data
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

const NewsDetails = ({ businessCategorydata, newsDetailsData, blogUrl, newsListData }) => {
  const router = useRouter()

  useEffect(() => {
    if (blogUrl) {
      router.push(`/credit-cards/i/${blogUrl}`)
    } else router.push('/credit-cards/i')
  }, [blogUrl, router])

  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1={'/credit-cards'}
            link1Name='Credit Cards'
            link2={'/credit-cards/news'}
            link2Name='News'
            link3={`/credit-cards/news/${blogUrl}`}
            link3Name={blogUrl}
            title={'Credit Cards News Details'}
          />
          <CreditNewsDetails blogUrl={blogUrl} newsDetailsData={newsDetailsData} newsListData={newsListData} />
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

export default NewsDetails
