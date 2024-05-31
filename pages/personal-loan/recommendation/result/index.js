import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'
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
const LoanRecommendationResult = dynamic(
  () =>
    import(
      '@/core/component/Layout/PersonalLoan/PersonalLoanRecommendation/LoanRecommendationResult/LoanRecommendationResult'
    ),
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

    const langIdParam = {
      lang_id: lang_id
    }
    const businessCategoryData = await Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, langIdParam)
      .then((res) => {
        return res?.data
      })
      .catch((error) => {
        return { data: null }
      })

    const filterParam = {
      lang_id: lang_id,
      business_category_url_slug: 'personal-loan'
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
const LoanRecommendationResultIndex = ({ businessCategoryData, leftMenuFilterData }) => {
  const router = useRouter()
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const list = localStorage.getItem('personalRecommendations')
        ? JSON.parse(localStorage.getItem('personalRecommendations'))
        : {}
      if (list && Object.keys(list)?.length > 0) {
        list && setFilteredList(list)
      } else {
        router?.push('/personal-loan/recommendation')
      }
    }
  }, [router])

  return (
    <div>
      <div className=' bg-[#844FCF]'>
        <DynamicHeader businessCategorydata={businessCategorydata} />
      </div>
      <div className='bg-[#F4F8FB]'>
        <>
          <div className='container max-[1200px]:px-0 max-[1024px]:px-0 mx-auto max-[991px]:max-w-full'>
            <CommonBreadCrumbComponent
              link1={'/personal-loan'}
              link1Name='Personal Loan'
              link2={'/personal-loan/recommendation'}
              link2Name='Recommendation'
              link3={`/personal-loan/recommendation/result`}
              link3Name='Result'
            />
          </div>
          <LoanRecommendationResult filteredList={filteredList} leftMenuFilterData={leftMenuFilterData} />
        </>
        <div>
        </div>
        <div>
          <MobileFooter businessCategorydata={businessCategorydata} />
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

export default LoanRecommendationResultIndex
