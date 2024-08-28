import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { BASE_URL, BUSINESSCATEGORY, COMMON, BLOG } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import Link from 'next/link'
import { useWindowSize } from '@/hooks/useWindowSize'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(() => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'), {
  ssr: false
})

const PanDetails = dynamic(() => import('@/core/component/Layout/PanDetails'), {
  ssr: false
})

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const CreditNews = dynamic(() => import('@/core/component/Layout/CreditNews/CreditNews'), {
  ssr: false
})
const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/core/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const url_slug = context?.resolvedUrl?.split('/')?.pop()
    const ref = context?.req?.headers?.referer || ''
    const blog_url_slug = context?.resolvedUrl?.split('/')?.[1]

    const metaDetailsParams = {
      lang_id: lang_id,
      page_url_slug: url_slug
    }
    const bussinessCatParam = {
      lang_id: lang_id
    }
    const newsReq = {
      blog_url_slug: blog_url_slug,
      identifier: 'category',
      offset: 0,
      limit: 10
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, bussinessCatParam).catch(
      (error) => {
        return null
      }
    )
    const response5 = Axios.post(BASE_URL + COMMON?.metaDetailPage, metaDetailsParams).catch((error) => {
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
const PanCardPage = ({ businessCategorydata, CreditNewsList }) => {
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
  const faqdata = {

    question_answer: [
        {
            question: "<p>How long does it take to receive a PAN card after applying?</p>",
            answer: "<p>Typically, it takes about 15-20 business days to receive a PAN card after the application has been successfully submitted and all documents have been verified.</p>",
            display_sequence: 1,
        },
        {
          question: "<p>Can I apply for a PAN card if I am not an Indian citizen?</p>",
          answer: "<p>Foreign nationals who wish to undertake financial transactions in India can apply for a PAN card using Form 49AA through NSDL or UTIITSL.</p>",
          display_sequence: 2,
        },
        {
          question: "<p>What should I do if there are errors on my PAN card?</p>",
          answer: "<p>Suppose there are errors or discrepancies on your PAN card. In that case, you should submit a 'Correction' application through the same portal where you applied (NSDL or UTIITSL) with the correct details and necessary supporting documents.</p>",
          display_sequence: 3,
        },
        {
          question: "<p>Is there a way to apply for a PAN card online without sending physical documents?</p>",
          answer: "<p>Now, applicants must post physical copies of their documents after completing the online application. However, for updates and possible changes to this process, check the official NSDL or UTIITSL websites.</p>",
          display_sequence: 4,
        },
        {
          question: "<p>How can I link my PAN with my Aadhaar card?</p>",
          answer: "<p>You can link your PAN with your Aadhaar by visiting the Income Tax e-filing portal, entering your PAN and Aadhaar numbers, and following the instructions to complete the linkage.</p>",
          display_sequence: 5,
        },
    ]
}

  return (
    <div className='bg-[#F3F8F9] text-[#000]'>
      <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div>
      {CreditNewsList && (
        <div className='bg-[#F4F8FB] h-auto'>
          <CommonBreadCrumbComponent
            link1='/aadhar-card'
            link1Name='Aadhar Card'
            link2Name='News'
            title='Aadhar Card Blogs'
          />
          <CreditNews CreditNewsList={CreditNewsList} pageTitle='Pan Card Blogs' panCardPage={true} />
        </div>
      )}
      <div className='bg-[#F4F8FB] pl-4'>
        <KnowledgebaseBreadcrumb />
      </div>
      <PanDetails/>
      <FAQ faqdata={faqdata} />
      <div className='bg-[#fff]'>
        <MobileFooter businessCategorydata={businessCategorydata} />
        <div className='reletive'>
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
    </div>
  )
}

export default PanCardPage
