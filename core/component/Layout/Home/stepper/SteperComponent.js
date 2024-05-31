import Image from 'next/image'
import React from 'react'
import mainRound from '../../../../../public/assets/main-round.svg'
import rightArrow from '../../../../../public/assets/rightArrow.svg'
import dynamic from 'next/dynamic'

const CreditCardTrobleHaving = dynamic(() => import('../../compareCard/cardTrobleHaving/CreditCardTrobleHaving'), {
  ssr: false
})
const TopRecommendationSell = dynamic(() => import('../toprecommendationsell/TopRecommendationSell'), {
  ssr: false
})

function SteperComponent({ RecomendedTopselling }) {
  return (
    <div className='bg-white'>
      <div className=' container  min-h-[500px] max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[100px] max-[576px]:px-6 max-[479px]:px-4  max-[479px]:py-[30px] max-[375px]:px-4 max-[375px]:px-4 max-[320px]:px-4 step-sec-resolution'>
        <div className='pb-[50px] max-[479px]:pb-[50px] steper-resolution '>
          <div className='bg-white rounded-full mx-auto w-40 h-32 step-logo-bg mb-5 max-[479px]:mb-[30px] max-[479px]:w-24 max-[479px]:h-16 '>
            <Image src={mainRound} className='mx-auto max-[479px]:w-[100%] step-logo' alt='Logo' />
          </div>
          <h2 className='emproving-title head-text font-[faktum]  text-[46px] max-[1024px]:text-[42px] max-[771px]:text-[38px] max-[576px]:text-[34px] max-[479px]:text-[21px] max-[479px]:leading-[30.8px] max-[375px]:text-[21px] max-[320px]:text-[21px] leading-[64.4px] w-[65%] max-[1440px]:w-[78%]  max-[1200px]:w-[90%] max-[479px]:w-full font-semibold text-center mx-auto text-[#212529] max-[280px]:text-[20px]'>
            Get personalised product recommendations in 3 steps with {"BankSathi's"} smart algorithm.
          </h2>

          <div className='grid grid-cols-3 justify-around text-lg pt-[45px] pb-[50px] items-center mx-auto max-[1200px]:w-full max-[576px]:grid-cols-1 max-[576px]:gap-8 max-[479px]:py-[30px] personalised-product'>
            <div>
              <div className='step-one bg-[#DEF7ED] p-4 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-2'>
                <p className='head-text text-[#49D49D] text-[46px] font-semibold max-[479px]:text-[36px]'>01</p>
              </div>
              <p className='text-[#212529] font-[Poppins] text-[18px] font-medium w-[68%] max-[1440px]:w-[68%] max-[991px]:w-[80%] text-center mx-auto max-[375px]:text-[17px] pt-2 step-title max-[280px]:w-full max-[280px]:text-[16px]'>
                Help us understand your needs
              </p>
            </div>
            <div>
              <div className='step-two bg-[#DEF7ED] p-4 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-2'>
                <p className='head-text text-[#49D49D] text-[46px] font-semibold max-[479px]:text-[36px]'>02</p>
              </div>

              <p className='text-[#212529] font-[Poppins] text-[18px] font-medium w-[68%] max-[1440px]:w-[80%] max-[991px]:w-[92%] text-center mx-auto pt-2 step-title max-[280px]:w-full max-[280px]:text-[16px]'>
                BankSathi’s smart algorithm does the processing
              </p>
            </div>
            <div>
              <div className=' step-three bg-[#DEF7ED] p-4 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-2'>
                <p className='head-text text-[#49D49D] text-[46px] font-semibold max-[479px]:text-[36px]'>03</p>
              </div>

              <p className=' text-[#212529] font-[Poppins] text-[18px] font-medium w-[68%] max-[1440px]:w-[80%] max-[991px]:w-[92%] text-center mx-auto pt-2 step-title max-[280px]:w-full max-[280px]:text-[16px]'>
                Get the best product recommendation
              </p>
            </div>
          </div>
          <div className='head-text font-[faktum] text-center bg-[#49D49D] text-[#212529] py-2 pl-2 pr-2 rounded-lg text-lg w-[190px] h-[56px] mx-auto flex items-center justify-center gap-4'>
            <button className=' cursor-pointer'>Get Started</button>
            <Image src={rightArrow} alt='img' className='w-[34px] h-[30px]' height={40} width={50} />
          </div>
          <p className='text-[#212529] font-[Poppins] text-center  pt-[30px] w-[40%] mx-auto max-[1200px]:w-3/6 max-[771px]:4/5 max-[576px]:w-full nots-suggestion max-[479px]:text-[12px] max-[393px]:text-[11px] max-[479px]:leading-4 '>
            *Note: You will not be asked to provide your mobile number or any personal details to get product
            suggestions.
          </p>
        </div>

        {/* =========== Recommended ============ */}

        <TopRecommendationSell RecomendedTopselling={RecomendedTopselling} />

        {/* =========== trouble choosing  ============ */}

        <CreditCardTrobleHaving position={'3'}/>
      </div>
    </div>
  )
}

export default SteperComponent
