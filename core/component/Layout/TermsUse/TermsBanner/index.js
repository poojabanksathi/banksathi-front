import dynamic from 'next/dynamic'
import React from 'react'

const TermsHeaderText = dynamic(() => import('../TermsHeaderText'), {
  ssr: false
})

function Index() {
  return (
    <>
      <div className='bg-[#844FCF] '>
        <div className=' container mx-auto py-20 max-[1024px]:py-20 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          <TermsHeaderText title="TERMS OF USE"/>
        </div>
      </div>
    </>
  )
}

export default Index