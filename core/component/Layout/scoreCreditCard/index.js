import React from 'react'
import dynamic from 'next/dynamic'

const ScoreBanner = dynamic(() => import('@/core/component/Layout/scoreCreditCard/ScoreBanner'), {
  ssr: false
})
const KeyFactore = dynamic(() => import('@/core/component/Layout/scoreCreditCard/KeyFactore'), {
  ssr: false
})
const EasyStepScore = dynamic(() => import('@/core/component/Layout/scoreCreditCard/EasyStepScore'), {
  ssr: false
})
const KnowledgeBase = dynamic(() => import('@/core/component/common/CommonList/KnowledgeBase'), {
  ssr: false
})
const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CalculatorBeginnerCard = dynamic(() => import('@/core/component/Layout/Calculator/CalculatorBeginnerCard'), {
  ssr: false
})

function ScoreCreditCards({ faqdata, longTerm, metaData }) {
  return (
    <>
      <div>
        <ScoreBanner metaData={metaData} />
        <EasyStepScore />
      </div>
      <div className='bg-[#fff] py-[80px] max-[771px]:py-[50px]'>
        <div className='container h-full  mx-auto max-[991px]:max-w-full  px-20 max-[1200px]:px-0 max-[1024px]:px-8 max-[479px]:px-4 max-[375px]:px-4 max-[320px]:px-4'>
          <KeyFactore />
        </div>
      </div>
      <div className='bg-[#F4F8FB]'>
        <div className='container h-full  mx-auto max-[991px]:max-w-full max-[1440px]:px-[35px]  max-[1024px]:px-8 max-[479px]:px-0'>
          {/* <KnowledgeBase /> */}
          <CalculatorBeginnerCard longTerm={longTerm} />
          <FAQ faqdata={faqdata} />
        </div>
      </div>
    </>
  )
}

export default ScoreCreditCards
