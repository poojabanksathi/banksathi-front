import React from 'react'
import dynamic from 'next/dynamic'

const DisclaimerContent = dynamic(() => import('./DisclaimerContent'), {
  ssr: false
})
const DisclaimerBanner = dynamic(() => import('./DisclaimerBanner'), {
  ssr: false
})
const ContactCard =dynamic(()=>import('../../common/ContactCard'),{ssr:false})

const PrivacyPolicy = () => {
  return (
    <>
      <div className='bg-[#F3F8F9] text-[#000] xl:px-[140px] max-sm:px-[33px] lg:px-[65px] md:px-[40px]'>
        <DisclaimerBanner />
        <DisclaimerContent />
        <ContactCard/>
      </div>
    </>
  )
}

export default PrivacyPolicy
