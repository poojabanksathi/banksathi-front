import React from 'react'
import CreditScoreBanner from './CreditScoreBanner/CreditScoreBanner'
import CreditCibil from './CreditCibilScore/index'
// import KnowledgeBase from '../../common/CommonList/KnowledgeBase'
import FAQ from '../../common/FAQ/FAQ'
// import TrobleChoose from '../Home/troubleChoose/TrobleChoose'
import dynamic from 'next/dynamic'

const CalculatorBeginnerCard = dynamic(() => import('@/core/component/Layout/Calculator/CalculatorBeginnerCard'), {
    ssr: false
  })

const CreditScore = ({ faqdata, longTerm }) => {
  return (
    <>
      <CreditScoreBanner />
      <div className='bg-[#F4F8FB] w-full h-auto'>
        <CreditCibil />
        {/* <div className=" max-[576px]:container lg:px-20 max-[1024px]:px-8 mx-auto max-[991px]:max-w-full max-[479px]:px-2  max-[375px]:px-4 max-[320px]:px-4">
       <KnowledgeBase/>
       </div>  */}
    
        <CalculatorBeginnerCard longTerm={longTerm} />
        <FAQ faqdata={faqdata} />

      </div>

      {/* <TrobleChoose position={'4'}/> */}
    </>
  )
}

export default CreditScore
