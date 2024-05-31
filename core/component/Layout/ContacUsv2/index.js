import React from 'react'
import dynamic from 'next/dynamic'

const ContactUsV2Banner = dynamic(() => import('./ContactUsV2Banner'), {
  ssr: false
})
const FormContent = dynamic(() => import('./FormContent'), {
  ssr: false
})
const GetInThouch = dynamic(() => import('./GetInThouch'), {
  ssr: false
})

const ContacUsv2 = () => {
  return (
    <>
      <ContactUsV2Banner />
      <div className='bg-[#F4F8FB]'>
        <FormContent />
        <GetInThouch />
      </div>
    </>
  )
}

export default ContacUsv2
