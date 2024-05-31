import React, { useRef } from 'react'
import ListingFilter from '../../../common/CommonList/ListingFilter'
import dynamic from 'next/dynamic'
import { useIsInViewport } from '@/hooks/useIsInViewport'

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('../CreditBeginnerCard'), {
  ssr: false
})
const CreditCardTrobleHaving = dynamic(() => import('../../compareCard/cardTrobleHaving/CreditCardTrobleHaving'), {
  ssr: false
})
const ServiceTabs = dynamic(() => import('../../../Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})
function RecommdationCategory({
  productlistdata,
  categorytopmenulist,
  faqdata,
  longTerm,
  businessmetaheadtag,
  moreleftmenucredit,
  url_slug,
  serviceTabs,
  contactUsRef,
  bottomRefs,
  mobileFooterRef
}) {
  const bottomCompRef = useRef(null)
  const isInViewPort = useIsInViewport(mobileFooterRef || contactUsRef || bottomCompRef || bottomRefs)

  return (
    <div className='bg-[#F4F8FB]'>
      {productlistdata && (
        <div className='container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pt-[50px] pb-[100px] max-[576px]:pb-[50px] max-[479px]:px-4 max-[479px]:530px] max-[375px]:px-4 max-[320px]:px-4'>
         
          <ListingFilter
            productlistdata={productlistdata}
            categorytopmenulist={categorytopmenulist}
            moreleftmenucredit={moreleftmenucredit}
            url_slug={url_slug}
            isInViewPort={isInViewPort}
          />
        </div>
      )}
      <div ref={bottomCompRef}>
        <VedioCheck productDetailsData={businessmetaheadtag?.h1_paragraph} />
       
        <CreditCardTrobleHaving position={'4'} />
        <CreditBeginnerCard longTerm={longTerm} />
        {serviceTabs && (
          <div className='max-sm:mx-0 container mx-auto'>
            <ServiceTabs serviceTabs={serviceTabs} position={'3'} />
          </div>
        )}
        <FAQ faqdata={faqdata} />
      </div>
    </div>
  )
}
export default RecommdationCategory
