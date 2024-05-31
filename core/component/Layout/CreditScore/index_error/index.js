import React from 'react'
import CreditScoreBanner from '../CreditScoreBanner/CreditScoreBanner'
// import KnowledgeBase from '../../common/CommonList/KnowledgeBase'
import FAQ from '../../../common/FAQ/FAQ'
// import TrobleChoose from '../../Home/troubleChoose/TrobleChoose'
import dynamic from 'next/dynamic'
import CommonRoundedBreadcrumb from '@/core/component/common/CommonRoundedBreadcrumb/CommonRoundedBreadcrumb'

const CalculatorBeginnerCard = dynamic(() => import('@/core/component/Layout/Calculator/CalculatorBeginnerCard'), {
  ssr: false
})
const KnowledgebaseBreadcrumb = dynamic(
  () => import('@/core/component/Layout/knowledgeBaseDetail/KnowledgebreadCrumb/KnowledgebreadCrumb'),
  {
    ssr: false
  }
)
const VedioCheck = dynamic(() => import('@/core/component/common/VedioCheck'), {
  ssr: false
})
const CreditScore = ({ faqdata, longTerm, metaData }) => {
  return (
    <>
      <div className='bg-[#F4F8FB] w-full h-auto'>
        <CommonRoundedBreadcrumb link1={'/credit-score'} link1Name={'Credit Score'} highlight1={true} />
        <CreditScoreBanner metaData={metaData} />
        {/* <CreditCibil /> */}
        {/* <div className=" max-[576px]:container lg:px-20 max-[1024px]:px-8 mx-auto max-[991px]:max-w-full max-[479px]:px-2  max-[375px]:px-4 max-[320px]:px-4">
       <KnowledgeBase/>
       </div>  */}
        <VedioCheck productDetailsData={longTerm} title={'Know Everything About Credit Score'} />
        <div className='container bg-[#F4F8FB] mx-auto max-[991px]:max-w-full h-auto justify-around '>
          <CalculatorBeginnerCard longTerm={longTerm} />
        </div>
        <FAQ faqdata={faqdata} />
      </div>
      {/* <TrobleChoose position={'6'} /> */}
    </>
  )
}

export default CreditScore
