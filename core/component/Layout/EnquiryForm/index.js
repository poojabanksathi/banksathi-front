import React from 'react'
import dynamic from 'next/dynamic'

const EnquiryContent = dynamic(() => import('../EnquiryForm/EnquiryContent'), {
  ssr: false
})
const EnquiryBanner = dynamic(() => import('./EnquiryBanner'), {
  ssr: false
})
const EnquiryFaq = dynamic(() => import('./EnquiryFaq'), {
  ssr: false
})
const EnquiryInfluence = dynamic(() => import('./EnquiryInfluence'), {
  ssr: false
})
const EnquiryTestimonials = dynamic(() => import('./EnquiryTestimonials'), {
  ssr: false
})
const EnquiryForm = ({businessmetaheadtag}) => {
  return (
    <>
      <div className='bg-[#F4F8FB]'>
        <EnquiryBanner businessmetaheadtag={businessmetaheadtag} />
        <EnquiryContent />
        <EnquiryInfluence/>
        <EnquiryTestimonials/>
        <EnquiryFaq/>
      </div>
    </>
  )
}

export default EnquiryForm
