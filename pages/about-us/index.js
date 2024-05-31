import dynamic from 'next/dynamic'
import React from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON} from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const OurPartner = dynamic(() => import('@/core/component/Layout/aboutUs/AboutOurPartner'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const AboutBanner = dynamic(() => import('@/core/component/Layout/aboutUs/AboutBanner'), {
  ssr: false
})
const AwardsAbout = dynamic(() => import('@/core/component/Layout/aboutUs/AwardsAbout'), {
  ssr: false
})
const AbooutContent = dynamic(() => import('@/core/component/Layout/aboutUs/AboutContent'), {
  ssr: false
})
const OurLeader = dynamic(() => import('@/core/component/Layout/aboutUs/OurLeader'), {
  ssr: false
})
const WhoWeAre = dynamic(() => import('@/core/component/Layout/aboutUs/WhoWeAre'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})


export default function Index({ businessCategorydata,businessmetaheadtag}) {
  return (
    <>
     
      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
          <AboutBanner />
        </div>
      </section>
      <div className='bg-[#F4F8FB]'>
        <AbooutContent />
        <WhoWeAre />
        <OurPartner />
        <OurLeader />
        <AwardsAbout />
        <VedioCheck productDetailsData={businessmetaheadtag}/>
        <MobileFooter businessCategorydata={businessCategorydata}/>
      </div>

      <DynamicFooter businessCategorydata={businessCategorydata} />

      <div className='scroll-top'>
        <ScrollToTop smooth color='#000' />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const website_url =  process.env.NEXT_PUBLIC_WEBSITE_URL
    const url_slug = ''
    const last_url = context?.resolvedUrl && context?.resolvedUrl.split('/')
    const context_params = last_url?.[last_url?.length-1]
    const ref=context?.req?.headers?.referer || '';
    const req1 = {
      lang_id: lang_id
    }

    const req2 = {
      website_url: website_url,
      lang_id: lang_id
    }

    const req3 = {
      search_string: url_slug,
      lang_id: lang_id
    }
    const req7 = {
      lang_id: lang_id,
      page_url_slug: context_params
    }
    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const response6 = await Axios.post(BASE_URL + COMMON?.metaDetailPage, req7).catch((error) => {
      return { data: null }
    })
    const [data1,data6] = await Promise.all([response1,response6 ]).then((responses) => responses.map((response) => response.data))

    return {
      props: {
        businessCategorydata: data1,
        businessmetaheadtag:data6?.data||{},
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
