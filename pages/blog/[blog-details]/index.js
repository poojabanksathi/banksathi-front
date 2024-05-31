import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BLOG, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import Link from 'next/link'
import { useWindowSize } from '@/hooks/useWindowSize'

import  { useState, useEffect } from 'react';

const BlogDetails = dynamic(() => import('@/core/component/Layout/BlogDetails'), {
  ssr: false
})

const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/core/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

export default function Index({
  businessmetaheadtag,
  blogPostDetailData,
  businessCategorydata,
}) {
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
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB] pl-4'>
          <KnowledgebaseBreadcrumb />
        </div>
        <div className='bg-[#F4F8FB] '>
          <BlogDetails blogPostDetailData={blogPostDetailData?.data} />
        </div>
     
        <div className='bg-[#F4F8FB]'></div>
      </section>
      <div>
        <MobileFooter businessCategorydata={businessCategorydata} />
      </div>

      <div className='reletive'>     
         <DynamicFooter businessCategorydata={businessCategorydata} />

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
      <div className='scroll-top'> 
        <ScrollToTop smooth color='#000' />
      </div>
      </div>

    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const context_params_sub_cat = context?.params?.['blog-details']
    const ref = context?.req?.headers?.referer || ''

    const lang_id = 1
    const url_slug = context_params
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL

    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req2 = {
      lang_id: lang_id,
      page_id: page_id,
      url_slug: url_slug,
      sub_cat_url_slug: context_params_sub_cat
    }
    const req3 = {
      search_string: '',
      lang_id: lang_id
    }
    const req4 = {
      lang_id: lang_id
    }
    const req6 = {
      blog_url_slug: context_params_sub_cat
    }
    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productListCategory, req1).catch((error) => {
      return { data: null }
    })
    const response2 = Axios.post(BASE_URL + BUSINESSCATEGORY.categoryTopMenu, req1).catch((error) => {
      return { data: null }
    })
    const response3 = Axios.post(BASE_URL + BUSINESSCATEGORY.CategoryParagraphTag, req1).catch((error) => {
      return { data: null }
    })
    const response4 = Axios.post(BASE_URL + FAQAPI.productFaq, req2).catch((error) => {
      return { data: null }
    })
    const response5 = Axios.post(BASE_URL + BUSINESSCATEGORY.formLongcontent, req1).catch((error) => {
      return { data: null }
    })
    const response7 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req4).catch((error) => {
      return { data: 'notFound' }
    })
    const response8 = Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const response10 = await Axios.post(BASE_URL + BLOG.blogPostDetail, req6).catch((error) => {
      return { data: null }
    })
    const [data1, data2, data3, data4, data5, data7, data8, data10] = await Promise.all([
      response1,
      response2,
      response3,
      response4,
      response5,
      response7,
      response8,
      response10
    ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        productlistdata: data1,
        categorytopmenulist: data2,
        businessmetaheadtag: data3 || data10?.data || {},
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        blogPostDetailData: data10,
        referer: ref
      }
    }
  } catch (error) {
    
  }
}
