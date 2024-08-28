import React, { useRef, useCallback } from 'react'
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

const ServiceTabs = dynamic(() => import('../../../Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})

const RecommdationCategory = React.memo(({
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
}) => {
  const bottomCompRef = useRef(null)
  const isInViewPort = useIsInViewport(mobileFooterRef || contactUsRef || bottomCompRef || bottomRefs)

  const memoizedListingFilterProps = useCallback(() => ({
    productlistdata,
    categorytopmenulist,
    moreleftmenucredit,
    url_slug,
    isInViewPort
  }), [productlistdata, categorytopmenulist, moreleftmenucredit, url_slug, isInViewPort])

  const memoizedFAQProps = useCallback(() => ({
    faqdata
  }), [faqdata])

  const memoizedServiceTabsProps = useCallback(() => ({
    serviceTabs,
    position: '3'
  }), [serviceTabs])

  return (
    <div className='bg-[#F4F8FB]'>
      {productlistdata && (
        <div className='container min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pt-[50px] pb-[100px] max-[576px]:pb-[50px] max-[479px]:px-4 max-[479px]:530px] max-[375px]:px-4 max-[320px]:px-4'>
          <ListingFilter {...memoizedListingFilterProps()} />
        </div>
      )}
      <div ref={bottomCompRef}>
        <VedioCheck productDetailsData={businessmetaheadtag?.h1_paragraph} />
        {/* <CreditCardTrobleHaving position={'4'} /> */}
        <CreditBeginnerCard longTerm={longTerm} />
        {serviceTabs && (
          <div className='max-sm:mx-0 container mx-auto'>
            <ServiceTabs {...memoizedServiceTabsProps()} />
          </div>
        )}
        <FAQ {...memoizedFAQProps()} />
      </div>
    </div>
  )
})

export default RecommdationCategory
