import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ScrollToTop from 'react-scroll-to-top'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import { getBlogDetailsBreadCrumb } from '@/utils/util'
import { useWindowSize } from '@/hooks/useWindowSize'
import Link from 'next/link'

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
    const blog_url_slug = context?.params?.['personal-finance-details']
    const personalFinance = 'personal-finance'

    const req3 = {
      lang_id: lang_id
    }
    const newsDetailsReq = {
      blog_url_slug: blog_url_slug
    }
    const newsListReq = {
      blog_url_slug: personalFinance,
      identifier: 'category',
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
        businessmetaheadtag: newsDetailsData?.data || null
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
const Index = ({ businessCategorydata, newsDetailsData, blogUrl, newsListData }) => {
  const breadCrumSlug = getBlogDetailsBreadCrumb(blogUrl)
  const size = useWindowSize()
  const mobileSize = size?.width <= 576
  const [showComponent, setShowComponent] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop && currentScrollTop > window.innerHeight / 1.2) {
        setShowComponent(true);
      } else if (currentScrollTop <= window.innerHeight / 1.2) {
        setShowComponent(false);
      }
      setLastScrollTop(currentScrollTop);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);
  return (
    <>
      <div>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1='/personal-finance'
            link1Name='Personal Finance Blog'
            link2Name={breadCrumSlug}
            title='Personal Finance Blog Details'
          />
          <CreditNewsDetails
            blogUrl={blogUrl}
            newsDetailsData={newsDetailsData}
            newsListData={newsListData}
            infoPage={true}
            personalFinancePage={true}
          />
        </div>
        <div className='bg-[#fff]'>
          <MobileFooter businessCategorydata={businessCategorydata} />
          <DynamicMobileFooter businessCategorydata={businessCategorydata} />
          {mobileSize && showComponent && (
        <div className='fixed bottom-0 left-0 z-[999] h-[53px] w-full justify-between items-center'>
          <div className='text-center'>
                          <Link href='/credit-cards/eligibility' prefetch={false}>
                            <button className='bg-[#49D49D] w-full py-[18px] lg:w-[240px]  max-[240px]:w-full  font-faktum font-semibold text-[14px] leading-[18px] tracking-wide text-[#212529]'>
                            Check Credit Card Eligibility 
                            </button>
                          </Link>
                        </div>
        </div>
       )}
        </div>
      </div>
      <ScrollToTop smooth color='#000' />
    </>
  )
}

export default Index
