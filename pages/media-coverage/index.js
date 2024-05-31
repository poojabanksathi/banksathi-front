import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { BASE_URL, BUSINESSCATEGORY, COMMON, mediaCoverageApi } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import ScrollToTop from 'react-scroll-to-top'
import { useRouter } from 'next/router'

const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const FilterNotFound = dynamic(() => import('@/core/component/common/FilterNotFound'), {
  ssr: false
})
const MediaCoverageBanner = dynamic(() => import('@/core/component/Layout/MediaCoverage/MediaCoverageBanner'), {
  ssr: false
})
const MediaCoverageSlider = dynamic(() => import('@/core/component/Layout/MediaCoverage/MediaCoverageSlider'), {
  ssr: false
})
const MediaCoverageNews = dynamic(() => import('@/core/component/Layout/MediaCoverage/MediaCoverageNews'), {
  ssr: false
})

const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

const BredcrumbCalculator = dynamic(() => import('@/core/component/common/CalculatorCards/BredcrumbCalculator'), {
  ssr: false
})

export default function Index({ businessCategorydata, mediaCoverageData }) {
  const router = useRouter()
  useEffect(() => {
    if (mediaCoverageData?.data?.length === 0) {
      router.push('/404')
    }
  }, [mediaCoverageData?.data?.length, router])
 
  return (
    <>

      <section>
        <div className=' bg-[#844FCF]'>
          <DynamicHeader businessCategorydata={businessCategorydata} />
          <BredcrumbCalculator />
          <MediaCoverageBanner />
        </div>
      </section>

      {mediaCoverageData?.data?.length !== 0 && (
        <>
          <div className='bg-[#F4F8FB] '>
            <MediaCoverageSlider mediaCoverage={mediaCoverageData} />
          </div>
          <div className='bg-[#F4F8FB] '>
            <MediaCoverageNews mediaCoverage={mediaCoverageData} />
          </div>
        </>
      )}

      <div className='bg-[#F4F8FB]'>
        <MobileFooter businessCategorydata={businessCategorydata} />
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
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const ref=context?.req?.headers?.referer || '';

    const req1 = {
      lang_id: lang_id
    }

    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const response4 = await Axios.post(BASE_URL + mediaCoverageApi.mediaCoverage)

    const [data1] = await Promise.all([response1]).then((responses) =>
      responses?.map((response) => response?.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        mediaCoverageData: response4?.data,
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
