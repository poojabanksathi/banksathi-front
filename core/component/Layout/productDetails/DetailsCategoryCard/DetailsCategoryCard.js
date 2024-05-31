import React from 'react'
import dynamic from 'next/dynamic'
import { capitalizeFirstLetter } from '@/utils/util'

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})

const CardDetailsFilterBox = dynamic(() => import('@/core/component/common/CommonList/CardDetailsFilterBox'), {
  ssr: false
})
const CommonBreadCrumbComponent = dynamic(
  () => import('@/core/component/common/CommonList/CommonBreadCrumbComponent'),
  {
    ssr: false
  }
)
function DetailsCategoryCard({
  faqdata,
  productDetailsData,
  productLongformcon,
  alternetRelatedproduct,
  getallreview,
  getOverlallRating,
  categoryUrl,
  productDetailsUrl
}) {
  return (
    <div className='bg-[#F4F8FB]'>
      <CommonBreadCrumbComponent
        link1={'/credit-cards'}
        link1Name='Credit Cards'
        link2={`/credit-cards/${categoryUrl}`}
        link2Name={capitalizeFirstLetter(categoryUrl)?.split('-')?.join(' ')}
        link3Name={capitalizeFirstLetter(productDetailsUrl)?.split('-')?.join(' ')}
        isDetailsPage={true}
      />
      {productDetailsData?.product_details && (
        <div className='container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pt-[15px] max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          {/* <DetailBredcrumb productDetailsData={productDetailsData} /> */}
          <CardDetailsFilterBox
            productDetailsData={productDetailsData}
            getallreview={getallreview}
            getOverlallRating={getOverlallRating}
            alternetRelatedproduct={alternetRelatedproduct}
            productLongformcon={productLongformcon}
          />
          {/* <EligibilityCriteriaDetail productDetailsData={productDetailsData} />
          <VedioCheck productDetailsData={productDetailsData?.product_details} />
          <div className='container xl:px-8'>
            <DetailsFindTailor />
          </div>
          <DetailRelatedCards alternetRelatedproduct={alternetRelatedproduct} />
          <HowToApplyDetail productLongformcon={productLongformcon} /> */}
        </div>
      )}
      <FAQ faqdata={faqdata} />
    </div>
  )
}

export default DetailsCategoryCard
