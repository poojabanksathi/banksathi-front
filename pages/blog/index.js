import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BLOG, BUSINESSCATEGORY, COMMON, FAQAPI } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'

const KnowledgeBaseDetail = dynamic(() => import('@/core/component/Layout/knowledgeBaseDetail'), {
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



export default function Index({ businessmetaheadtag, faqdata, businessCategorydata, getAllBlog }) {
  return (
    <>
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
        </div>
        <div className='bg-[#F4F8FB]'>
          <KnowledgebaseBreadcrumb />
        </div>
        <div className='bg-[#F4F8FB]'>
          <KnowledgeBaseDetail faqdata={faqdata} getAllBlog={getAllBlog} />
        </div>
      </section>
      <div>
        <MobileFooter businessCategorydata={businessCategorydata} />
      </div>

      {/* ========= Footer ========= */}
      <DynamicFooter businessCategorydata={businessCategorydata} />

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const context_params = context?.resolvedUrl && context?.resolvedUrl.split('/')[1]
    const ref=context?.req?.headers?.referer || '';

    const lang_id = 1
    const url_slug = context_params
    const page_id = 1
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
        const pagedata = {
      offset: 0,
      limit: 9
    }
    const req1 = {
      lang_id: lang_id,
      business_category_url_slug: url_slug
    }
    const req2 = {
      lang_id: lang_id,
      url_slug: url_slug,
      page_id: page_id
    }
    const req4 = {
      lang_id: lang_id
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
    const response10 = await Axios.post(BASE_URL + BLOG.blogList, pagedata).catch((error) => {
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
        businessmetaheadtag: data3?.h1_paragraph || {},
        faqdata: data4,
        longTerm: data5,
        businessCategorydata: data7,
        moreleftmenucredit: data8,
        getAllBlog: data10,
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
