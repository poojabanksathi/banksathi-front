import React from 'react'
import ScrollToTop from 'react-scroll-to-top'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import { BASE_URL, BUSINESSCATEGORY, COMMON } from '@/utils/alljsonfile/service'
import Axios from 'axios'

const DynamicHeader = dynamic(() => import('@/core/component/common/Header'), {
  ssr: false
})

const Partners = dynamic(() => import('@/core/component/Partners/PartnersMain/Partners'), {
  ssr: false
})

export async function getServerSideProps(context) {
  try {
    const lang_id = 1
    const ref = context?.req?.headers?.referer || ''
    const page_url_slug = context?.resolvedUrl?.split('/')?.pop() || 'partners'

    const req1 = {
      lang_id: lang_id
    }
    const metaReq = {
      lang_id: lang_id,
      page_url_slug: page_url_slug
    }
    const response1 = Axios.post(BASE_URL + BUSINESSCATEGORY.productCategoryLanguage, req1).catch((error) => {
      return { data: 'notFound' }
    })
    const metaData = await Axios.post(BASE_URL + COMMON?.metaDetailPage, metaReq).catch((error) => {
      return { data: null }
    })
    const [data1, metaResponse] = await Promise.all([response1, metaData]).then((responses) =>
      responses.map((response) => response.data)
    )

    return {
      props: {
        businessCategorydata: data1,
        referer: ref,
        businessmetaheadtag: metaResponse?.data || null
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
const PartnersPage = ({ businessCategorydata, businessmetaheadtag }) => {
  const size = useWindowSize()

  return (
    <>
      <div className={`w-fit ${size?.width > 1700 ? ' container mx-auto' : ''}`}>
        <div className='bg-[#844FCF]'>
          <DynamicHeader
            businessCategorydata={businessCategorydata}
            showFull={size?.width > 2440 ? false : true}
          />
        </div>
        <Partners />
     
      </div>
    </>
  )
}

export default PartnersPage
