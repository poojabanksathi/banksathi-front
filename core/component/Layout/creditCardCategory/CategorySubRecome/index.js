import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useIsInViewport } from '@/hooks/useIsInViewport'

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const ListingFilterSubData = dynamic(() => import('../ListingFilterSubData'), {
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

const DetailBredcrumb = dynamic(() => import('@/core/component/common/CommonList/DetailBredcrumb'), {
  ssr: false
})
const ServiceTabs = dynamic(() => import('@/core/component/Layout/savingAccountList/ServiceTabs'), {
  ssr: false
})

function CategorySubRecome({
  productlistdataSub,
  categorytopmenulistsub,
  faqdata,
  longTermSub,
  businessmetaheadtag,
  morecategoryleftfilter,
  url_slug,
  credit_url_slug,
  serviceTabs,
  bottomRefs,
  sub_cat_url
}) {
  const [categoryactive, setrCategoryactive] = useState('All')
  const size = useWindowSize()
  const bottomCompRefs = useRef(null)
  const isInViewPort = useIsInViewport(bottomRefs || bottomCompRefs)

  return (
    <div className='bg-[#F4F8FB]'>
      {productlistdataSub && (
        <div className='container min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pt-[50px] pb-[100px] max-[479px]:px-4 max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4'>
          
          <ListingFilterSubData
            productlistdataSub={productlistdataSub}
            categorytopmenulistsub={categorytopmenulistsub}
            morecategoryleftfilter={morecategoryleftfilter}
            businessmetaheadtag={businessmetaheadtag}
            url_slug={url_slug}
            isInViewPort={isInViewPort}
            credit_url_slug={credit_url_slug}
            sub_cat_url={sub_cat_url}
          />
        </div>
      )}
      <div ref={bottomCompRefs}>
        <VedioCheck productDetailsData={businessmetaheadtag?.h1_paragraph} />
        <CreditCardTrobleHaving position={'3'} />
       
        <CreditBeginnerCard longTermSub={longTermSub} />
        {serviceTabs && (
          <div className='max-sm:mx-0 container mx-auto'>
            <ServiceTabs serviceTabs={serviceTabs} position={'4'} />
          </div>
        )}
        <FAQ faqdata={faqdata} />
      </div>
    </div>
  )
}

export default CategorySubRecome
