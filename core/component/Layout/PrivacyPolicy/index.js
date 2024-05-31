import React from 'react'
import dynamic from 'next/dynamic'

const PolicyContent = dynamic(() => import('./PolicyContent'), {
  ssr: false
})
const PrivacyBanner = dynamic(() => import('./PrivacyBanner'), {
  ssr: false
})
const ContactCard =dynamic(()=>import('../../common/ContactCard'),{ssr:false})

const PrivacyPolicy = () => {
  return (
    <>
      <div className='bg-[#F3F8F9] text-[#000] '>
        <PrivacyBanner />
        <PolicyContent />
        <ContactCard/>
      </div>
    </>
  )
}

export default PrivacyPolicy
