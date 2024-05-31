import dynamic from 'next/dynamic'
import React from 'react'

const DisclaimerHeaderText = dynamic(() => import('../DisclaimerHeaderText'), {
  ssr: false
})

function Index() {
  return (
    <>
      <div>
        <div className=' container mx-auto py-5 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          <DisclaimerHeaderText title="Disclaimer"/>
        </div>
      </div>
    </>
  )
}

export default Index
