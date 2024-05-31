import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'
import RecommendationResult from '@/core/component/Layout/RecommendationJourney/RecommendationResult/RecommendationResult'
import { useRouter } from 'next/router'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})
const MobileFooter = dynamic(() => import('@/core/component/common/MobileFooter'), {
  ssr: false
})
const DynamicFooter = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const { resolvedUrl, req } = context
    const url_slug = resolvedUrl?.split('/')?.pop()
    const referer = req?.headers?.referer || null
    const website_url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const h = context?.query?.h || ''
    const ip = context?.req?.headers?.['x-forwarded-for']?.split(',')?.[0] || ''
    const user_agent = context?.req?.headers?.['user-agent'] || ''
    const leadsParams = { user_agent, ip }

    const langIdParam = {
      lang_id: lang_id
    }
    // BUSINESS CATEGORY DATA
    const businessCategoryData = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })

    // left menu data for filters
    const filterParam = {
      lang_id: lang_id,
      business_category_url_slug: 'credit-cards'
    }
    const leftMenuFilterData = await Axios.post(BASE_URL + BUSINESSCATEGORY.moreleftmenufilter, filterParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: 'notFound' }
      })
    return {
      props: {
        referer: referer,
        businessCategoryData: businessCategoryData || null,
        url_slug: url_slug || '',
        h: h,
        leadsParams: leadsParams,
        leftMenuFilterData: leftMenuFilterData
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
const RecommendationResultIndex = ({ businessCategoryData, leftMenuFilterData }) => {
  const router = useRouter()

  const [filteredList, setFilteredList] = useState([])
  const [formInfo, setFormInfo] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const list = localStorage.getItem('listData') ? JSON.parse(localStorage.getItem('listData')) : {}
      if (list && Object.keys(list)?.length > 0) {
        const formData = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {}
        setFormInfo(formData)
        list && setFilteredList(list)
      } else {
        router?.push('/credit-cards/recommendation')
      }
    }
  }, [])

  return (
    <div>
      <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategoryData} />
      </div>
      <div className='bg-[#F4F8FB]'>
        <>
          <div className='container max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
            <CommonBreadCrumbComponent
              link1={'/credit-cards'}
              link1Name='Credit Cards'
              link2={'/credit-cards/recommendation'}
              link2Name='Recommendation'
              link3={`/credit-cards/recommendation/result`}
              link3Name='Result'
            />
          </div>
          <RecommendationResult
            formInfo={formInfo}
            filteredList={filteredList}
            leftMenuFilterData={leftMenuFilterData}
          />
        </>
        <div>
        </div>
        <div>
          <MobileFooter businessCategorydata={businessCategoryData} />
        </div>
      </div>
      <div>
        <DynamicFooter businessCategorydata={businessCategoryData} />
        <div className='scroll-top'>
          <ScrollToTop smooth color='#000' />
        </div>
      </div>
    </div>
  )
}

export default RecommendationResultIndex
