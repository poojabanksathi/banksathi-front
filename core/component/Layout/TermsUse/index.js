import React from 'react'
import dynamic from 'next/dynamic'

const TermsContent = dynamic(() => import('./TermsContent'), {
  ssr: false
})
const TermsBanner = dynamic(() => import('./TermsBanner'), {
  ssr: false
})
const ContactCard = dynamic(() => import('../../common/ContactCard'), { ssr: false })

const TermsPolicy = () => {
  return (
    <>
      <div className='bg-[#F3F8F9] text-[#000] '>
        <TermsBanner />
        <TermsContent />
        <ContactCard/>
      </div>
    </>
  )
}

export default TermsPolicy
